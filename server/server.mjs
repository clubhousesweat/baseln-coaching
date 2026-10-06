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

const publicMetadata = {
  '/': {
    title: 'BASELN Online Coaching | Private Coaching with Aian McLennan',
    description: 'Private online coaching with Aian McLennan. Custom training, thoughtful nutrition guidance and direct coach accountability from day one.',
  },
  '/coaching': {
    title: 'Online Coaching | BASELN',
    description: 'Individual online coaching built around your actual week: tailored training, practical nutrition and direct feedback from Aian McLennan.',
  },
  '/about': {
    title: 'About Aian McLennan | BASELN',
    description: 'Meet the coach behind BASELN: practical, performance-led online coaching for people with demanding lives.',
  },
  '/field-notes': {
    title: 'Field Notes | BASELN Online Coaching',
    description: 'Practical coaching notes on strength, fitness, body composition and training that works in real life.',
  },
  '/online/register': {
    title: 'Apply for Coaching | BASELN',
    description: 'Apply for private online coaching with BASELN. Tell Aian about your goal, training week and the support you need.',
    noindex: true,
  },
  '/training-room': {
    title: 'Training Room Preview | BASELN',
    description: 'Preview the workspace structure for BASELN private coaching.',
    noindex: true,
  },
  '/privacy': { title: 'Privacy Notice | BASELN', description: 'How BASELN handles information submitted through coaching enquiries and services.', noindex: true },
  '/terms': { title: 'Coaching Terms | BASELN', description: 'Terms that apply to BASELN private online coaching.', noindex: true },
  '/refund-policy': { title: 'Refund and Cancellation Policy | BASELN', description: 'BASELN refund and cancellation policy.', noindex: true },
  '/training-disclaimer': { title: 'Health and Training Disclaimer | BASELN', description: 'Important exercise and training safety information from BASELN.', noindex: true },
};

const legacyRedirects = {
  '/online': '/coaching',
  '/the-package': '/coaching',
  '/how-it-works': '/coaching',
  '/online/engine-room': '/coaching',
  '/online/field-notes': '/field-notes',
  '/app': '/training-room',
  '/member-login': '/training-room',
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
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${description}" />`)
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
      title: `New BASELN coaching application #${leadId}`,
      content: `A new coaching application has been received and is due for personal review within one business day. Applicant: ${email}. Primary objective: ${objective}. Review the durable BASELN lead queue for the complete application.`,
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

// Legacy site route 301 redirects
for (const [legacyPath, destination] of Object.entries(legacyRedirects)) {
  app.get(legacyPath, (request, response) => response.redirect(301, appendQuery(request, destination)));
}

app.post('/api/leads', async (request, response) => {
  if (!databaseReady || !databasePool) {
    return response.status(503).json({ ok: false, error: 'The application service is not ready. Please try again shortly.' });
  }

  const errors = [];
  const payload = request.body && typeof request.body === 'object' ? request.body : {};
  const fullName = requiredText(payload.name, 120, 'name', errors);
  const email = requiredText(payload.email, 254, 'email', errors);
  const countryTimeZone = requiredText(payload.countryTimeZone, 160, 'country/time zone', errors);
  const mainObjective = requiredText(payload.mainObjective, 200, 'main objective', errors);
  const biggestObstacle = requiredText(payload.biggestObstacle, 4000, 'biggest obstacle', errors);
  const availableDays = requiredText(payload.availableDays, 80, 'available training days', errors);
  const preferredStartDate = requiredText(payload.preferredStartDate, 160, 'preferred start date', errors);

  if (!/^\S+@\S+\.\S+$/.test(email || '')) errors.push('valid email address');
  if (payload.privacyConsent !== true) errors.push('privacy and health-training acknowledgement');
  if (errors.length) {
    return response.status(400).json({ ok: false, error: `Please provide: ${[...new Set(errors)].join(', ')}.` });
  }

  const attribution = safeAttribution(payload.attribution);
  const values = [
    fullName, email.toLowerCase(), countryTimeZone, optionalText(payload.phone, 64), mainObjective,
    biggestObstacle, availableDays, preferredStartDate, optionalText(payload.referralSource, 240),
    true, false, optionalText(payload.cta, 120) || 'site_apply', JSON.stringify(attribution),
    attribution.utm_source, attribution.utm_medium, attribution.utm_campaign, attribution.utm_content,
    attribution.utm_term, attribution.first_landing_page, attribution.referrer, attribution.first_touch_at,
    attribution.last_non_direct_source, attribution.last_non_direct_medium, attribution.last_non_direct_campaign,
    attribution.last_non_direct_content, attribution.last_non_direct_at, attribution.last_touch_page,
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
    console.info(`BASELN lead ${leadId} stored successfully.`);
    return response.status(201).json({ ok: true, leadId });
  } catch (error) {
    console.error('BASELN lead submission failed:', error.message);
    return response.status(500).json({ ok: false, error: 'We could not securely receive your enquiry. Please try again, or email aian@baseln.co.' });
  }
});

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
