import { randomBytes, createHash, createHmac, timingSafeEqual } from 'node:crypto';

export const STAGES = ['New', 'Qualified', 'Consultation Booked', 'Consultation Completed', 'Offer Sent', 'Enrolled', 'Follow Up Later', 'Not Proceeding'];
const sha = value => createHash('sha256').update(value).digest('hex');
const equal = (a, b) => { const x = Buffer.from(String(a)); const y = Buffer.from(String(b)); return x.length === y.length && timingSafeEqual(x, y); };
export const sessionToken = (claims, secret, now = Date.now()) => {
  const value = Buffer.from(JSON.stringify({ ...claims, expires: now + 2 * 60 * 60 * 1000 })).toString('base64url');
  return `${value}.${createHmac('sha256', secret).update(value).digest('base64url')}`;
};
export const verifySession = (token, secret, now = Date.now()) => {
  try {
    const [value, signature, extra] = String(token).split('.');
    if (extra || !secret || !equal(signature, createHmac('sha256', secret).update(value).digest('base64url'))) return null;
    const claims = JSON.parse(Buffer.from(value, 'base64url').toString());
    return claims.expires > now ? claims : null;
  } catch { return null; }
};
export const nextBusinessDay = (now = new Date()) => {
  // BASELN's review day follows Perth time (UTC+8), Monday to Friday.
  const local = new Date(now.getTime() + 8 * 3600000);
  do { local.setUTCDate(local.getUTCDate() + 1); } while ([0, 6].includes(local.getUTCDay()));
  return new Date(local.getTime() - 8 * 3600000);
};
export const transition = (current, action, body = {}) => {
  const rules = {
    invite: [['New', 'Follow Up Later'], 'Qualified'],
    booked: [['Qualified'], 'Consultation Booked'],
    completed: [['Consultation Booked'], 'Consultation Completed'],
    offer: [['Consultation Completed'], 'Offer Sent'],
    enrol: [['Offer Sent'], 'Enrolled'],
    follow_up_later: [STAGES.filter(x => !['Enrolled', 'Not Proceeding'].includes(x)), 'Follow Up Later'],
    not_proceeding: [STAGES.filter(x => x !== 'Enrolled'), 'Not Proceeding'],
  };
  if (!rules[action] || !rules[action][0].includes(current)) throw new Error('This action is not available at the current stage.');
  if (action === 'enrol' && (!body.paymentReference?.trim() || !body.termsReference?.trim())) throw new Error('Verify payment and accepted terms before enrolment.');
  return rules[action][1];
};

export async function initialiseWorkflow(pool) {
  await pool.query(`CREATE TABLE IF NOT EXISTS application_workflow (
    lead_id BIGINT UNSIGNED PRIMARY KEY, stage VARCHAR(40) NOT NULL DEFAULT 'New',
    review_due_at DATETIME NOT NULL, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    invited_at DATETIME NULL, booking_url VARCHAR(1000) NULL, contact_stopped BOOLEAN DEFAULT FALSE,
    payment_reference VARCHAR(240) NULL, terms_reference VARCHAR(240) NULL,
    assessment_json JSON NULL, assessment_submitted_at DATETIME NULL, assessment_reviewed_at DATETIME NULL,
    coaching_started_at DATETIME NULL, access_token_hash VARCHAR(64) NULL, access_expires_at DATETIME NULL,
    FOREIGN KEY (lead_id) REFERENCES coaching_leads(id) ON DELETE CASCADE
  ) ENGINE=InnoDB`);
  // Import existing prospects without sending retrospective acknowledgement emails.
  await pool.query(`INSERT IGNORE INTO application_workflow (lead_id,stage,review_due_at)
    SELECT id, CASE WHEN lead_stage IN ('New','Qualified','Consultation Booked','Consultation Completed','Offer Sent','Enrolled','Follow Up Later','Not Proceeding') THEN lead_stage ELSE 'New' END,
    DATE_ADD(created_at,INTERVAL CASE DAYOFWEEK(DATE_ADD(created_at,INTERVAL 8 HOUR)) WHEN 6 THEN 3 WHEN 7 THEN 2 ELSE 1 END DAY)
    FROM coaching_leads`);
  await pool.query(`CREATE TABLE IF NOT EXISTS application_events (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, lead_id BIGINT UNSIGNED NOT NULL,
    action VARCHAR(64) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lead_id) REFERENCES coaching_leads(id) ON DELETE CASCADE
  ) ENGINE=InnoDB`);
  await pool.query(`CREATE TABLE IF NOT EXISTS application_outbox (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, lead_id BIGINT UNSIGNED NOT NULL,
    kind VARCHAR(32) NOT NULL, state VARCHAR(16) NOT NULL DEFAULT 'pending',
    due_at DATETIME NOT NULL, attempts INT NOT NULL DEFAULT 0, provider_id VARCHAR(200) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY lead_message (lead_id,kind),
    FOREIGN KEY (lead_id) REFERENCES coaching_leads(id) ON DELETE CASCADE
  ) ENGINE=InnoDB`);
}

export async function recordApplicationWorkflow(connection, leadId) {
  await connection.execute('INSERT INTO application_workflow (lead_id,review_due_at) VALUES (?,?)', [leadId, nextBusinessDay()]);
  await connection.execute("INSERT INTO application_events (lead_id,action) VALUES (?,'application_received')", [leadId]);
  for (const kind of ['acknowledgement', 'owner']) {
    await connection.execute('INSERT INTO application_outbox (lead_id,kind,due_at) VALUES (?,?,?)', [leadId, kind, new Date()]);
  }
}

const cookieName = 'baseln_session';
const parseCookie = req => (req.headers.cookie || '').split('; ').find(v => v.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1);
const cookieOptions = { httpOnly: true, sameSite: 'strict', secure: true, path: '/', maxAge: 2 * 60 * 60 * 1000 };
const jsonValue = value => typeof value === 'string' ? JSON.parse(value) : value;
const safeHttps = value => { try { const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password; } catch { return false; } };

export function mountWorkflow(app, getPool) {
  const secret = () => process.env.COACH_ACCESS_KEY?.length >= 32 ? process.env.COACH_ACCESS_KEY : null;
  const guard = role => (req, res, next) => {
    const claims = verifySession(parseCookie(req), secret());
    if (!claims || claims.role !== role) return res.status(401).json({ error: 'Please sign in again.' });
    req.session = claims;
    res.set('Cache-Control', 'no-store');
    return next();
  };
  app.use(['/api/coach', '/api/onboarding', '/api/session'], (req, res, next) => {
    res.set('Cache-Control', 'no-store');
    if (req.method !== 'GET' && req.headers.origin !== (process.env.PUBLIC_ORIGIN || 'https://baseln.co')) return res.status(403).json({ error: 'Request origin is not allowed.' });
    if (!getPool()) return res.status(503).json({ error: 'The coaching service is not configured.' });
    next();
  });
  app.post('/api/session/coach', (req, res) => {
    if (!secret()) return res.status(503).json({ error: 'Coach access needs to be configured by the site owner.' });
    if (typeof req.body?.key !== 'string' || !equal(req.body.key, secret())) return res.status(401).json({ error: 'The access key was not recognised.' });
    res.cookie(cookieName, sessionToken({ role: 'coach' }, secret()), cookieOptions);
    res.json({ ok: true });
  });
  app.post('/api/session/logout', (_req, res) => { res.clearCookie(cookieName, cookieOptions); res.json({ ok: true }); });
  app.get('/api/coach/applications', guard('coach'), async (_req, res) => {
    const [rows] = await getPool().query(`SELECT l.id,l.created_at,l.full_name,l.email,l.main_objective,w.stage,w.review_due_at,w.contact_stopped FROM coaching_leads l JOIN application_workflow w ON w.lead_id=l.id ORDER BY l.created_at DESC LIMIT 200`);
    res.json({ applications: rows, stages: STAGES });
  });
  app.get('/api/coach/applications/:id', guard('coach'), async (req, res) => {
    const [rows] = await getPool().execute(`SELECT l.*,w.* FROM coaching_leads l JOIN application_workflow w ON w.lead_id=l.id WHERE l.id=?`, [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Application not found.' });
    const row = rows[0]; delete row.access_token_hash;
    const [events] = await getPool().execute('SELECT action,created_at FROM application_events WHERE lead_id=? ORDER BY id', [req.params.id]);
    const [emails] = await getPool().execute('SELECT kind,state,attempts,due_at FROM application_outbox WHERE lead_id=? ORDER BY id', [req.params.id]);
    res.json({ application: row, events, emails });
  });
  app.post('/api/coach/applications/:id/action', guard('coach'), async (req, res) => {
    const pool = getPool(); const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      const [rows] = await connection.execute('SELECT * FROM application_workflow WHERE lead_id=? FOR UPDATE', [req.params.id]);
      if (!rows.length) { await connection.rollback(); return res.status(404).json({ error: 'Application not found.' }); }
      const row = rows[0]; const { action } = req.body;
      if (action === 'stop_contact') {
        await connection.execute('UPDATE application_workflow SET contact_stopped=TRUE WHERE lead_id=?', [req.params.id]);
      } else if (action === 'send_access_link') {
        if (row.stage !== 'Enrolled' || !secret()) throw new Error('Private access is available to enrolled clients only.');
        await connection.execute('INSERT INTO application_outbox (lead_id,kind,due_at) VALUES (?,?,NOW())', [req.params.id, `access_${randomBytes(6).toString('hex')}`]);
      } else if (action === 'review_assessment') {
        if (!row.assessment_submitted_at) throw new Error('The assessment has not been submitted.');
        await connection.execute('UPDATE application_workflow SET assessment_reviewed_at=NOW() WHERE lead_id=?', [req.params.id]);
      } else if (action === 'start_coaching') {
        if (!row.assessment_reviewed_at || row.stage !== 'Enrolled') throw new Error('Review the completed assessment before starting coaching.');
        await connection.execute('UPDATE application_workflow SET coaching_started_at=NOW() WHERE lead_id=?', [req.params.id]);
      } else {
        const stage = transition(row.stage, action, req.body);
        if (action === 'invite') {
          if (row.contact_stopped) throw new Error('This applicant has asked to stop contact.');
          const bookingUrl = req.body.bookingUrl || process.env.CONSULTATION_BOOKING_URL;
          if (!safeHttps(bookingUrl)) throw new Error('Provide the real HTTPS consultation booking link.');
          await connection.execute('UPDATE application_workflow SET invited_at=NOW(),booking_url=? WHERE lead_id=?', [bookingUrl, req.params.id]);
          for (const [kind, delay] of [['invitation', 0], ['followup', 3 * 86400000]]) {
            await connection.execute('INSERT INTO application_outbox (lead_id,kind,due_at) VALUES (?,?,?) ON DUPLICATE KEY UPDATE due_at=VALUES(due_at),state=IF(state=\'sent\',state,\'pending\')', [req.params.id, kind, new Date(Date.now() + delay)]);
          }
        }
        if (action === 'enrol') {
          if (!secret()) throw new Error('Configure secure portal access before enrolling clients.');
          await connection.execute('UPDATE application_workflow SET payment_reference=?,terms_reference=? WHERE lead_id=?', [req.body.paymentReference.trim().slice(0,240), req.body.termsReference.trim().slice(0,240), req.params.id]);
          await connection.execute("INSERT INTO application_outbox (lead_id,kind,due_at) VALUES (?,'welcome',NOW())", [req.params.id]);
        }
        await connection.execute('UPDATE application_workflow SET stage=? WHERE lead_id=?', [stage, req.params.id]);
        await connection.execute('UPDATE coaching_leads SET lead_stage=? WHERE id=?', [stage, req.params.id]);
      }
      await connection.execute('INSERT INTO application_events (lead_id,action) VALUES (?,?)', [req.params.id, action]);
      await connection.commit(); res.json({ ok: true });
    } catch (error) { await connection.rollback(); res.status(400).json({ error: error.message }); }
    finally { connection.release(); }
  });
  app.post('/api/session/onboarding', async (req, res) => {
    if (!secret()) return res.status(503).json({ error: 'Private onboarding is not configured.' });
    const token = req.body?.token;
    if (typeof token !== 'string' || !/^[a-f0-9]{64}$/.test(token)) return res.status(401).json({ error: 'This access link is invalid or expired. Contact Aian for a new link.' });
    const connection = await getPool().getConnection();
    try {
      await connection.beginTransaction();
      const [rows] = await connection.execute("SELECT lead_id FROM application_workflow WHERE access_token_hash=? AND access_expires_at>NOW() AND stage='Enrolled' FOR UPDATE", [sha(token)]);
      if (!rows.length) { await connection.rollback(); return res.status(401).json({ error: 'This access link is invalid or expired. Contact Aian for a new link.' }); }
      await connection.execute('UPDATE application_workflow SET access_token_hash=NULL WHERE lead_id=?', [rows[0].lead_id]);
      await connection.commit();
      res.cookie(cookieName, sessionToken({ role: 'client', leadId: rows[0].lead_id }, secret()), cookieOptions);
      res.json({ ok: true });
    } catch { await connection.rollback(); res.status(500).json({ error: 'Access could not be verified. Please try again.' }); }
    finally { connection.release(); }
  });
  app.get('/api/onboarding', guard('client'), async (req, res) => {
    const [rows] = await getPool().execute("SELECT l.full_name,l.main_objective,l.available_days,l.attribution_json,w.assessment_json,w.assessment_submitted_at FROM application_workflow w JOIN coaching_leads l ON l.id=w.lead_id WHERE w.lead_id=? AND w.stage='Enrolled'", [req.session.leadId]);
    if (!rows.length) return res.status(403).json({ error: 'Onboarding opens after enrolment.' });
    const row = rows[0]; row.application = jsonValue(row.attribution_json); delete row.attribution_json;
    row.assessment = jsonValue(row.assessment_json) || {}; delete row.assessment_json;
    res.json(row);
  });
  app.put('/api/onboarding', guard('client'), async (req, res) => {
    const fields = ['goals', 'history', 'equipment', 'schedule', 'injuries', 'nutrition', 'sleep', 'stress', 'measurements', 'preferences'];
    const assessment = {};
    for (const field of fields) {
      if (req.body?.assessment?.[field] !== undefined && typeof req.body.assessment[field] !== 'string') return res.status(400).json({ error: 'Please use text for assessment answers.' });
      assessment[field] = (req.body?.assessment?.[field] || '').trim().slice(0,4000);
    }
    const complete = req.body?.submit === true;
    if (complete && (fields.some(field => !assessment[field]) || req.body.healthConsent !== true)) return res.status(400).json({ error: 'Complete each section (write none or not sure where appropriate) and confirm consent.' });
    const [result] = await getPool().execute("UPDATE application_workflow SET assessment_json=?,assessment_submitted_at=? WHERE lead_id=? AND stage='Enrolled' AND assessment_submitted_at IS NULL", [JSON.stringify({ ...assessment, healthConsent: complete, consentAt: complete ? new Date().toISOString() : null }), complete ? new Date() : null, req.session.leadId]);
    if (!result.affectedRows) return res.status(409).json({ error: 'This assessment is already submitted or access is no longer available.' });
    res.json({ ok: true, submitted: complete });
  });
}

export function messageFor(kind, lead, origin) {
  const first = lead.full_name.split(/\s+/)[0];
  const end = '\n\nAian\nBASELN\nStrength. Conditioning. Body composition.\nReply directly if you have a question.';
  if (kind === 'owner') return { to: process.env.COACH_NOTIFICATION_EMAIL || 'aian@baseln.co', subject: `New BASELN application #${lead.lead_id}`, text: `A new application is awaiting personal review within one business day.\n\nOpen the private application pipeline: ${origin}/coach\n\nReference #${lead.lead_id}. Full answers are available after signing in.` };
  if (kind === 'acknowledgement') return { to: lead.email, subject: 'BASELN — Application received', text: `Hi ${first},\n\nThanks for applying for private coaching with BASELN. Your application has been received.\n\nAian will review it and respond within one business day. Suitable applicants will be invited to a short conversation about their goals and how coaching would work.\n\nThere is nothing else you need to do for now.${end}` };
  if (kind === 'invitation') return { to: lead.email, subject: 'BASELN — Let’s discuss your coaching', text: `Hi ${first},\n\nThanks for applying. Following a review of your application, I would like to arrange a short conversation about your training and whether BASELN is the right fit.\n\nChoose a time for a 15–20-minute consultation:\n${lead.booking_url}${end}` };
  if (kind === 'followup') return { to: lead.email, subject: 'Following up — BASELN coaching', text: `Hi ${first},\n\nFollowing up on your coaching application. If you are still interested in a conversation, you can choose a time here:\n${lead.booking_url}\n\nIf you are no longer looking for coaching, reply and let me know.${end}` };
  return { to: lead.email, subject: 'Welcome to BASELN — Your starting assessment', text: `Hi ${first},\n\nWelcome to BASELN. Your enrolment is confirmed and BASELN / 6 is the beginning of your ongoing private coaching.\n\nYour next step is a detailed private assessment. Your original application answers are included, so you do not need to start from scratch.\n\nOpen your private assessment using the single-use link below. The link expires in 7 days. Once signed in, you can save your answers and return during that session. If you need a new link, reply to this email.\n${origin}/onboarding#${lead.accessToken}\n\nAian will review your assessment and clarify anything needed before delivering your initial training, nutrition guidance and review arrangements.${end}` };
}

export async function processOutbox(pool, send, origin) {
  // A database advisory lock prevents concurrent workers sending the same queue item.
  const connection = await pool.getConnection();
  try {
    const [[lock]] = await connection.query("SELECT GET_LOCK('baseln-application-outbox',0) AS acquired");
    if (!lock.acquired) return;
    const [jobs] = await connection.query("SELECT * FROM application_outbox WHERE state='pending' AND due_at<=NOW() AND attempts<6 ORDER BY id LIMIT 20");
    for (const job of jobs) {
      const [rows] = await connection.execute('SELECT l.full_name,l.email,w.* FROM application_workflow w JOIN coaching_leads l ON l.id=w.lead_id WHERE w.lead_id=?', [job.lead_id]);
      const lead = rows[0];
      if (!lead || ((job.kind === 'followup' || job.kind === 'invitation') && (lead.stage !== 'Qualified' || lead.contact_stopped))) {
        await connection.execute("UPDATE application_outbox SET state='cancelled' WHERE id=?", [job.id]); continue;
      }
      if (job.kind === 'followup') {
        const [invites] = await connection.execute("SELECT state FROM application_outbox WHERE lead_id=? AND kind='invitation'", [job.lead_id]);
        if (invites[0]?.state !== 'sent') continue;
      }
      if (job.kind === 'welcome' || job.kind.startsWith('access_')) {
        if (lead.stage !== 'Enrolled' || !lead.payment_reference || !lead.terms_reference) continue;
        // Deterministic per-message token means provider retries have the identical payload.
        lead.accessToken = createHmac('sha256', process.env.COACH_ACCESS_KEY).update(`onboarding:${job.id}:${job.created_at.toISOString()}`).digest('hex');
        await connection.execute('UPDATE application_workflow SET access_token_hash=?,access_expires_at=? WHERE lead_id=?', [sha(lead.accessToken), new Date(job.created_at.getTime()+7*86400000), job.lead_id]);
      }
      try {
        const sent = await send(messageFor(job.kind, lead, origin), `baseln-application-${job.id}`);
        await connection.execute("UPDATE application_outbox SET state='sent',provider_id=? WHERE id=?", [sent.id, job.id]);
        if (job.kind === 'invitation') await connection.execute("UPDATE application_outbox SET due_at=DATE_ADD(NOW(),INTERVAL 3 DAY) WHERE lead_id=? AND kind='followup' AND state='pending'", [job.lead_id]);
      } catch {
        await connection.execute('UPDATE application_outbox SET attempts=attempts+1,due_at=? WHERE id=?', [new Date(Date.now()+ Math.min(3600000, 60000 * 2**job.attempts)),job.id]);
      }
    }
  } finally {
    await connection.query("SELECT RELEASE_LOCK('baseln-application-outbox')"); connection.release();
  }
}

export async function sendTransactionalEmail(message, idempotencyKey) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST', signal: AbortSignal.timeout(15000),
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
    body: JSON.stringify({ from: process.env.TRANSACTIONAL_FROM, reply_to: process.env.COACH_REPLY_TO || 'aian@baseln.co', to: [message.to], subject: message.subject, text: message.text }),
  });
  if (!response.ok) throw new Error('Transactional delivery failed.');
  const result = await response.json(); if (!result.id) throw new Error('Delivery was not accepted.'); return result;
}
