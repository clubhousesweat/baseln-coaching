import express from 'express';
import mysql from 'mysql2/promise';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const publicBuildPath = path.join(projectRoot, 'dist');
const publicIndexPath = path.join(publicBuildPath, 'index.html');
const port = Number(process.env.PORT || 3000);
const publicOrigin = 'https://baseln.co';
const attributionQueryKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'cta'];
const instagramTakeoverDefaults = Object.freeze({
  cta: 'instagram-profile',
  utm_source: 'instagram',
  utm_medium: 'organic_social',
  utm_campaign: 'baseln_instagram_takeover_2026q4',
  utm_content: 'takeover_profile_link',
});

const publicMetadata = {
  '/': {
    title: 'BASELN Online Coaching | Private Coaching with Aian McLennan',
    description: 'Private online coaching with Aian McLennan. Custom training, thoughtful nutrition guidance and direct coach accountability from day one.',
  },
  '/coaching': {
    title: 'BASELN Online Coaching | Training & Accountability',
    description: 'Individual online coaching built around your actual week: tailored training, practical nutrition and direct feedback from Aian McLennan.',
  },
  '/about': {
    title: 'About Aian McLennan | BASELN Online Coaching',
    description: 'Meet the coach behind BASELN: practical, performance-led online coaching for people with demanding lives.',
  },
  '/field-notes': {
    title: 'Field Notes | BASELN Online Coaching',
    description: 'Practical coaching notes on strength, fitness, body composition and training that works in real life.',
  },
  '/online/register': {
    title: 'Apply for BASELN Online Coaching | Private Coaching',
    description: 'Apply for private online coaching with BASELN. Five short stages to understand your goals, training schedule and starting point.',
    noindex: true,
  },
  '/online/thank-you': {
    title: 'Application Received | BASELN Online Coaching',
    description: 'Confirmation receipt for your BASELN private online coaching application.',
    noindex: true,
  },
  '/training-room': {
    title: 'Training Room Preview | BASELN',
    description: 'Illustrative preview of the private BASELN Training Room workspace structure.',
    noindex: true,
  },
  '/member-login': {
    title: 'Client Portal Sign In | BASELN',
    description: 'Secure client authentication portal for active BASELN coaching clients.',
    noindex: true,
  },
  '/app': {
    title: 'Client Portal Sign In | BASELN',
    description: 'Secure client authentication portal for active BASELN coaching clients.',
    noindex: true,
  },
  '/coach': {
    title: 'Coach Portal | BASELN Operations',
    description: 'Protected operational portal for BASELN coaching staff.',
    noindex: true,
  },
  '/contact': {
    title: 'Contact BASELN Online Coaching | Aian McLennan',
    description: 'Contact BASELN about private online coaching, existing coaching support or another enquiry for Aian McLennan.',
  },
  '/privacy': { title: 'Privacy Notice | BASELN', description: 'How BASELN handles information submitted through coaching enquiries and services.', noindex: true },
  '/terms': { title: 'Coaching Terms | BASELN', description: 'Terms that apply to BASELN private online coaching.', noindex: true },
  '/refund-policy': { title: 'Refund and Cancellation Information | BASELN', description: 'How BASELN confirms cancellation arrangements and consumer rights before coaching begins.', noindex: true },
  '/training-disclaimer': { title: 'Health and Training Disclaimer | BASELN', description: 'Important exercise and training safety information from BASELN.', noindex: true },
};

const legacyRedirects = {
  '/online': '/coaching',
  '/the-package': '/coaching',
  '/how-it-works': '/coaching',
  '/online/engine-room': '/coaching',
  '/online/field-notes': '/field-notes',
  '/faq': '/coaching#questions',
};

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '64kb' }));

let databasePool = null;
let databaseReady = false;
let siteShell = '';

const optionalText = (value, maxLength) => {
  if (typeof value !== 'string') return null;
  const clean = value.trim();
  return clean ? clean.slice(0, maxLength) : null;
};

const requiredText = (value, maxLength, label, errors) => {
  const clean = optionalText(value, maxLength);
  if (!clean) errors.push(label);
  return clean;
};

const safePath = (value) => {
  const clean = optionalText(value, 2000);
  if (!clean) return '/';
  try {
    const url = new URL(clean, 'https://baseln.local');
    const search = new URLSearchParams();
    attributionQueryKeys.forEach((key) => {
      const candidate = url.searchParams.get(key);
      if (candidate) search.set(key, candidate.slice(0, 240));
    });
    const query = search.toString();
    return `${url.pathname || '/'}${query ? `?${query}` : ''}`.slice(0, 1000);
  } catch {
    return '/';
  }
};

const safeReferrer = (value) => {
  const clean = optionalText(value, 2000);
  if (!clean || clean === 'direct') return 'direct';
  try {
    const url = new URL(clean);
    return `${url.origin}${url.pathname}`.slice(0, 1000);
  } catch {
    return 'direct';
  }
};

const safeAttribution = (value) => {
  const input = value && typeof value === 'object' ? value : {};
  const text = (key, length = 1000) => optionalText(input[key], length);
  return {
    cta: text('cta', 120),
    utm_source: text('utm_source', 120),
    utm_medium: text('utm_medium', 120),
    utm_campaign: text('utm_campaign', 180),
    utm_content: text('utm_content', 240),
    utm_term: text('utm_term', 180),
    referrer: safeReferrer(input.referrer),
    first_landing_page: safePath(input.first_landing_page),
    first_touch_at: text('first_touch_at', 64) || new Date().toISOString(),
    last_non_direct_source: text('last_non_direct_source', 120),
    last_non_direct_medium: text('last_non_direct_medium', 120),
    last_non_direct_campaign: text('last_non_direct_campaign', 180),
    last_non_direct_content: text('last_non_direct_content', 240),
    last_non_direct_at: text('last_non_direct_at', 64),
    last_touch_page: safePath(input.last_touch_page),
    last_touch_at: text('last_touch_at', 64) || new Date().toISOString(),
  };
};

const databaseConfig = () => {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not configured.');
  const url = new URL(process.env.DATABASE_URL);
  return {
    host: url.hostname,
    port: Number(url.port || 3306),
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: decodeURIComponent(url.pathname.replace(/^\//, '')),
    waitForConnections: true,
    connectionLimit: 6,
    queueLimit: 0,
    enableKeepAlive: true,
    ssl: { rejectUnauthorized: true },
  };
};

const initialiseDatabase = async () => {
  if (!process.env.DATABASE_URL) {
    console.info('DATABASE_URL is not configured; running in fallback mode.');
    databaseReady = false;
    return;
  }
  databasePool = mysql.createPool(databaseConfig());
  await databasePool.query('SELECT 1');
  await databasePool.query(`
    CREATE TABLE IF NOT EXISTS coaching_leads (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      full_name VARCHAR(120) NOT NULL,
      email VARCHAR(254) NOT NULL,
      country_time_zone VARCHAR(160) NOT NULL,
      phone VARCHAR(64) NULL,
      main_objective VARCHAR(200) NOT NULL,
      biggest_obstacle TEXT NOT NULL,
      available_days VARCHAR(80) NOT NULL,
      preferred_start_date VARCHAR(160) NOT NULL,
      referral_source VARCHAR(240) NULL,
      privacy_consent BOOLEAN NOT NULL,
      marketing_opt_in BOOLEAN NOT NULL DEFAULT FALSE,
      lead_stage VARCHAR(64) NOT NULL DEFAULT 'New / untriaged',
      lead_owner VARCHAR(120) NOT NULL DEFAULT 'Aian McLennan',
      cta VARCHAR(120) NOT NULL DEFAULT 'site_apply',
      attribution_json JSON NOT NULL,
      first_utm_source VARCHAR(120) NULL,
      first_utm_medium VARCHAR(120) NULL,
      first_utm_campaign VARCHAR(180) NULL,
      first_utm_content VARCHAR(240) NULL,
      first_utm_term VARCHAR(180) NULL,
      first_landing_page VARCHAR(1000) NOT NULL,
      first_referrer VARCHAR(1000) NOT NULL,
      first_touch_at VARCHAR(64) NOT NULL,
      last_utm_source VARCHAR(120) NULL,
      last_utm_medium VARCHAR(120) NULL,
      last_utm_campaign VARCHAR(180) NULL,
      last_utm_content VARCHAR(240) NULL,
      last_utm_at VARCHAR(64) NULL,
      last_touch_page VARCHAR(1000) NOT NULL,
      last_touch_at VARCHAR(64) NOT NULL,
      PRIMARY KEY (id),
      INDEX coaching_leads_created_at_idx (created_at),
      INDEX coaching_leads_stage_idx (lead_stage)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  databaseReady = true;
};

const databaseIsReachable = async () => {
  if (!databaseReady || !databasePool) return false;
  try {
    await databasePool.query('SELECT 1');
    return true;
  } catch (error) {
    console.error('BASELN readiness database probe failed:', error.message);
    return false;
  }
};

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));

const renderedPageShell = (routePath) => {
  const metadata = publicMetadata[routePath] || publicMetadata['/'];
  const canonical = `${publicOrigin}${routePath}`;
  const canonicalOgImage = `${publicOrigin}/media/baseln-front-squat-coaching.png`;
  const title = escapeHtml(metadata.title);
  const description = escapeHtml(metadata.description);
  const robots = metadata.noindex ? '<meta name="robots" content="noindex,follow" />' : '';
  return siteShell
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${description}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta property="og:image" content="[^"]*"\s*\/>/, `<meta property="og:image" content="${canonicalOgImage}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${description}" />`)
    .replace(/<meta name="twitter:image" content="[^"]*"\s*\/>/, `<meta name="twitter:image" content="${canonicalOgImage}" />`)
    .replace('</head>', `  ${robots}\n  </head>`);
};

const sendOwnerNotification = async ({ leadId, email, objective }) => {
  if (!process.env.MANUS_API_URL || !process.env.MANUS_API_KEY) return;
  const response = await fetch(`${process.env.MANUS_API_URL}/webdevtoken.v1.WebDevService/SendNotification`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.MANUS_API_KEY}`,
      'Content-Type': 'application/json',
      'connect-protocol-version': '1',
    },
    body: JSON.stringify({
      title: `New BASELN 5-stage coaching application #${leadId}`,
      content: `A new coaching application has been received and is due for personal review within one business day. Applicant: ${email}. Primary goals: ${objective}. Review the durable BASELN lead queue for the complete application. Operational inbox: Outlook.`,
    }),
  });
  if (!response.ok) throw new Error(`Owner notification returned ${response.status}.`);
};

const appendQuery = (request, destination) => {
  const queryIndex = request.originalUrl.indexOf('?');
  if (queryIndex < 0) return destination;
  const [pathPart, fragment] = destination.split('#', 2);
  return `${pathPart}${request.originalUrl.slice(queryIndex)}${fragment ? `#${fragment}` : ''}`;
};

const instagramTakeoverDestination = (request) => {
  const params = new URL(request.originalUrl, publicOrigin).searchParams;
  for (const [key, value] of Object.entries(instagramTakeoverDefaults)) {
    if (!params.get(key)) params.set(key, value);
  }
  return `/online/register?${params.toString()}`;
};

// Canonicalise www.baseln.co to apex baseln.co
app.use((request, response, next) => {
  const host = (request.headers.host || '').split(':')[0].toLowerCase();
  if (host === 'www.baseln.co') {
    return response.redirect(301, `${publicOrigin}${request.originalUrl}`);
  }
  next();
});

app.get('/_app/live', (_request, response) => response.status(200).json({ ok: true, service: 'baseln-coaching' }));
app.get(['/_app/ready', '/_app/health'], async (_request, response) => {
  const ready = await databaseIsReachable();
  return response.status(ready ? 200 : 503).json({ ok: ready, service: 'baseln-coaching' });
});

// Approved canonical decision: /online/register is the intake; /apply must 301 to it with query string preserved.
app.get('/apply', (request, response) => {
  return response.redirect(301, appendQuery(request, '/online/register'));
});

// Profile-bio traffic is campaign-controlled, so retain a mutable redirect while
// guaranteeing the takeover attribution reaches the canonical application route.
app.get('/go/instagram', (request, response) => {
  return response.redirect(302, instagramTakeoverDestination(request));
});

// Legacy site route 301 redirects
for (const [legacyPath, destination] of Object.entries(legacyRedirects)) {
  app.get(legacyPath, (request, response) => response.redirect(301, appendQuery(request, destination)));
}

// Handler for both /api/leads and /api/public/coaching-application
const handleCoachingApplication = async (request, response) => {
  if (!databaseReady || !databasePool) {
    return response.status(503).json({ ok: false, error: 'The application service is not ready. Please try again shortly.' });
  }

  const errors = [];
  const payload = request.body && typeof request.body === 'object' ? request.body : {};

  // Support both 5-stage brief naming and legacy naming
  const fullName = requiredText(payload.name || payload.full_name, 120, 'name', errors);
  const email = requiredText(payload.email, 254, 'email', errors);
  const timezone = requiredText(payload.timezone || payload.countryTimeZone, 160, 'country / time zone', errors);

  // Stage 01 Goal
  let goalsArray = [];
  if (Array.isArray(payload.goals) && payload.goals.length > 0) {
    goalsArray = payload.goals.map((g) => String(g).trim()).filter(Boolean);
  } else if (typeof payload.mainObjective === 'string' && payload.mainObjective.trim()) {
    goalsArray = [payload.mainObjective.trim()];
  }
  const mainObjective = requiredText(goalsArray.join(', '), 200, 'goals / main objective', errors);

  // Stage 02 Training Now
  const trainingDays = optionalText(payload.training_days || payload.availableDays, 80) || 'Consistent';
  const currentTraining = optionalText(payload.current_training, 500) || 'Active';
  const trainingEnvironment = optionalText(payload.training_environment, 200) || 'Gym';
  const trainingHistory = optionalText(payload.training_history || payload.trainingExperience, 200) || 'General';

  // Stage 03 Friction
  const barrier = requiredText(payload.barrier || payload.biggestObstacle, 4000, 'main obstacle or friction', errors);
  const previousAttempts = optionalText(payload.previous_attempts, 2000);

  // Stage 04 Fit
  const coachingValue = optionalText(payload.coaching_value, 2000);
  const whyNow = optionalText(payload.why_now || payload.preferredStartDate, 2000) || 'Ready now';

  // Consent
  const hasConsent = payload.privacy_ack === true || payload.privacyConsent === true;
  if (!hasConsent) errors.push('privacy and health-training acknowledgement');

  if (!/^\S+@\S+\.\S+$/.test(email || '')) errors.push('valid email address');

  if (errors.length) {
    return response.status(400).json({ ok: false, error: `Please provide: ${[...new Set(errors)].join(', ')}.` });
  }

  const attribution = safeAttribution(payload.attribution);
  const enrichedAttribution = {
    ...attribution,
    goals: goalsArray,
    goal_detail: optionalText(payload.goal_detail, 2000),
    current_training: currentTraining,
    training_days: trainingDays,
    training_environment: trainingEnvironment,
    training_history: trainingHistory,
    barrier,
    previous_attempts: previousAttempts,
    coaching_value: coachingValue,
    why_now: whyNow,
    age: optionalText(payload.age, 32),
  };

  const values = [
    fullName,
    email.toLowerCase(),
    timezone,
    optionalText(payload.phone, 64),
    mainObjective,
    barrier,
    trainingDays,
    whyNow.slice(0, 160),
    optionalText(payload.referralSource || payload.referral_source, 240),
    true,
    false,
    optionalText(payload.cta, 120) || 'site_apply',
    JSON.stringify(enrichedAttribution),
    attribution.utm_source,
    attribution.utm_medium,
    attribution.utm_campaign,
    attribution.utm_content,
    attribution.utm_term,
    attribution.first_landing_page,
    attribution.referrer,
    attribution.first_touch_at,
    attribution.last_non_direct_source,
    attribution.last_non_direct_medium,
    attribution.last_non_direct_campaign,
    attribution.last_non_direct_content,
    attribution.last_non_direct_at,
    attribution.last_touch_page,
    attribution.last_touch_at,
  ];

  try {
    const [result] = await databasePool.execute(
      `INSERT INTO coaching_leads (
        full_name, email, country_time_zone, phone, main_objective, biggest_obstacle,
        available_days, preferred_start_date, referral_source, privacy_consent,
        marketing_opt_in, cta, attribution_json, first_utm_source, first_utm_medium,
        first_utm_campaign, first_utm_content, first_utm_term, first_landing_page,
        first_referrer, first_touch_at, last_utm_source, last_utm_medium,
        last_utm_campaign, last_utm_content, last_utm_at, last_touch_page, last_touch_at
      ) VALUES (${values.map(() => '?').join(', ')})`,
      values,
    );

    const leadId = Number(result.insertId);
    sendOwnerNotification({ leadId, email: email.toLowerCase(), objective: mainObjective }).catch((error) => {
      console.error(`Owner notification failed for lead ${leadId}:`, error.message);
    });
    console.info(`BASELN coaching application lead ${leadId} stored successfully.`);
    return response.status(201).json({ ok: true, leadId });
  } catch (error) {
    console.error('BASELN lead submission failed:', error.message);
    return response.status(500).json({ ok: false, error: 'We could not securely receive your enquiry. Please try again, or email aian@baseln.co.' });
  }
};

app.post('/api/leads', handleCoachingApplication);
app.post('/api/public/coaching-application', handleCoachingApplication);

app.use(express.static(publicBuildPath, { index: false, maxAge: '1h' }));
app.use((request, response, next) => {
  if (request.method === 'GET' && !request.path.startsWith('/api/')) {
    return response.type('html').send(renderedPageShell(request.path));
  }
  return next();
});

const start = async () => {
  await initialiseDatabase();
  siteShell = await readFile(publicIndexPath, 'utf8');
  app.listen(port, '0.0.0.0', () => {
    console.info(`BASELN coaching server listening on ${port}.`);
  });
};

start().catch((error) => {
  console.error('BASELN server startup failed:', error.message);
  process.exit(1);
});
