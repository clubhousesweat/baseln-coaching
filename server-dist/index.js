import crypto from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import mysql from 'mysql2/promise';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT || 3000);
const distDirectory = path.resolve(__dirname, '..', 'dist');
const publicOrigin = 'https://baseln.co';
const databaseUrl = process.env.DATABASE_URL;
const database = databaseUrl ? mysql.createPool(databaseUrl) : null;
let databaseReady = false;
let renderedIndex = null;
const legacyRedirects = {
    '/apply': '/online/register',
    '/online': '/coaching',
    '/the-package': '/coaching',
    '/how-it-works': '/coaching',
    '/online/engine-room': '/coaching',
    '/online/field-notes': '/field-notes',
    '/app': '/training-room',
    '/member-login': '/training-room',
    '/faq': '/coaching#questions',
};
const submissionBuckets = new Map();
const cleanString = (value, maximum, minimum = 0) => {
    if (typeof value !== 'string')
        return undefined;
    const cleaned = value.trim();
    if (cleaned.length < minimum || cleaned.length > maximum)
        return undefined;
    return cleaned;
};
const isRecord = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);
const optionalAttributionValue = (value, maximum) => {
    if (value === undefined || value === null || value === '')
        return undefined;
    return cleanString(value, maximum, 1);
};
const readAttribution = (value) => {
    if (!isRecord(value))
        return undefined;
    const referrer = cleanString(value.referrer, 2048, 1);
    const firstLandingPage = cleanString(value.first_landing_page, 2048, 1);
    const firstTouchAt = cleanString(value.first_touch_at, 64, 1);
    const lastTouchPage = cleanString(value.last_touch_page, 2048, 1);
    const lastTouchAt = cleanString(value.last_touch_at, 64, 1);
    if (!referrer || !firstLandingPage || !firstTouchAt || !lastTouchPage || !lastTouchAt)
        return undefined;
    return {
        cta: optionalAttributionValue(value.cta, 160),
        referrer,
        first_landing_page: firstLandingPage,
        first_touch_at: firstTouchAt,
        last_touch_page: lastTouchPage,
        last_touch_at: lastTouchAt,
        utm_source: optionalAttributionValue(value.utm_source, 100),
        utm_medium: optionalAttributionValue(value.utm_medium, 100),
        utm_campaign: optionalAttributionValue(value.utm_campaign, 150),
        utm_content: optionalAttributionValue(value.utm_content, 150),
        utm_term: optionalAttributionValue(value.utm_term, 150),
        last_non_direct_source: optionalAttributionValue(value.last_non_direct_source, 100),
        last_non_direct_medium: optionalAttributionValue(value.last_non_direct_medium, 100),
        last_non_direct_campaign: optionalAttributionValue(value.last_non_direct_campaign, 150),
        last_non_direct_content: optionalAttributionValue(value.last_non_direct_content, 150),
        last_non_direct_at: optionalAttributionValue(value.last_non_direct_at, 64),
    };
};
const validateLead = (body) => {
    if (!isRecord(body))
        return { error: 'Please submit the coaching enquiry again.' };
    // Honeypot is intentionally silent to avoid helping automated submitters tune their payload.
    if (typeof body.website === 'string' && body.website.trim())
        return { error: 'Your enquiry could not be accepted.' };
    const name = cleanString(body.name, 160, 2);
    const email = cleanString(body.email, 254, 3);
    const countryTimeZone = cleanString(body.countryTimeZone, 160, 2);
    const phone = body.phone ? cleanString(body.phone, 64, 2) : undefined;
    const mainObjective = cleanString(body.mainObjective, 160, 2);
    const biggestObstacle = cleanString(body.biggestObstacle, 3000, 5);
    const availableDays = cleanString(body.availableDays, 100, 2);
    const preferredStartDate = cleanString(body.preferredStartDate, 160, 2);
    const referralSource = body.referralSource ? cleanString(body.referralSource, 300, 2) : undefined;
    const attribution = readAttribution(body.attribution);
    if (!name || !email || !/^\S+@\S+\.\S+$/.test(email) || !countryTimeZone || !mainObjective || !biggestObstacle || !availableDays || !preferredStartDate || !attribution) {
        return { error: 'Please complete the required coaching and contact details, then try again.' };
    }
    if (body.privacyConsent !== true || body.healthTrainingAcknowledgement !== true) {
        return { error: 'Please confirm the privacy and health-training acknowledgement before submitting your enquiry.' };
    }
    return {
        lead: {
            name,
            email,
            countryTimeZone,
            phone,
            mainObjective,
            biggestObstacle,
            availableDays,
            preferredStartDate,
            referralSource,
            privacyConsent: true,
            healthTrainingAcknowledgement: true,
            attribution,
        },
    };
};
const initialiseDatabase = async () => {
    if (!database) {
        console.error('DATABASE_URL is not available; lead submissions are disabled.');
        return;
    }
    try {
        await database.execute(`
      CREATE TABLE IF NOT EXISTS baseln_coaching_leads (
        id CHAR(36) NOT NULL PRIMARY KEY,
        name VARCHAR(160) NOT NULL,
        email VARCHAR(254) NOT NULL,
        country_time_zone VARCHAR(160) NOT NULL,
        phone VARCHAR(64) NULL,
        main_objective VARCHAR(160) NOT NULL,
        biggest_obstacle TEXT NOT NULL,
        available_days VARCHAR(100) NOT NULL,
        preferred_start_date VARCHAR(160) NOT NULL,
        referral_source VARCHAR(300) NULL,
        privacy_consent TINYINT(1) NOT NULL,
        health_training_acknowledgement TINYINT(1) NOT NULL,
        marketing_opt_in TINYINT(1) NOT NULL DEFAULT 0,
        cta VARCHAR(160) NULL,
        first_utm_source VARCHAR(100) NULL,
        first_utm_medium VARCHAR(100) NULL,
        first_utm_campaign VARCHAR(150) NULL,
        first_utm_content VARCHAR(150) NULL,
        first_utm_term VARCHAR(150) NULL,
        last_non_direct_source VARCHAR(100) NULL,
        last_non_direct_medium VARCHAR(100) NULL,
        last_non_direct_campaign VARCHAR(150) NULL,
        last_non_direct_content VARCHAR(150) NULL,
        first_landing_page VARCHAR(2048) NOT NULL,
        first_touch_at VARCHAR(64) NOT NULL,
        last_touch_page VARCHAR(2048) NOT NULL,
        last_touch_at VARCHAR(64) NOT NULL,
        referrer VARCHAR(2048) NOT NULL,
        attribution_json LONGTEXT NOT NULL,
        created_at DATETIME(3) NOT NULL,
        INDEX idx_baseln_leads_created_at (created_at),
        INDEX idx_baseln_leads_email (email)
      )
    `);
        databaseReady = true;
        console.info('BASELN lead database ready.');
    }
    catch (error) {
        databaseReady = false;
        console.error('BASELN lead database initialisation failed.', error);
    }
};
const ownerNotification = async (lead, leadId) => {
    const apiUrl = process.env.MANUS_API_URL;
    const apiKey = process.env.MANUS_API_KEY;
    if (!apiUrl || !apiKey)
        return;
    const title = `New BASELN coaching enquiry — ${lead.mainObjective}`;
    const content = [
        `Lead ID: ${leadId}`,
        `Name: ${lead.name}`,
        `Email: ${lead.email}`,
        `Goal: ${lead.mainObjective}`,
        `Start: ${lead.preferredStartDate}`,
        `Source: ${lead.attribution.utm_source || lead.attribution.referrer || 'direct'}`,
        `Campaign: ${lead.attribution.utm_campaign || 'not set'}`,
    ].join('\n');
    try {
        const response = await fetch(`${apiUrl.replace(/\/$/, '')}/webdevtoken.v1.WebDevService/SendNotification`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'Connect-Protocol-Version': '1',
            },
            body: JSON.stringify({ title, content }),
        });
        if (!response.ok)
            console.error('BASELN owner notification was not accepted.', response.status);
    }
    catch (error) {
        console.error('BASELN owner notification failed.', error);
    }
};
const applyRateLimit = (req, res, next) => {
    const identity = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const current = submissionBuckets.get(identity);
    const bucket = !current || current.resetAt <= now ? { count: 0, resetAt: now + 15 * 60 * 1000 } : current;
    bucket.count += 1;
    submissionBuckets.set(identity, bucket);
    if (bucket.count > 5) {
        res.status(429).json({ error: 'Too many submission attempts. Please wait a few minutes before trying again.' });
        return;
    }
    next();
};
const appendQuery = (req, destination) => {
    const queryIndex = req.originalUrl.indexOf('?');
    if (queryIndex < 0)
        return destination;
    const [path, fragment] = destination.split('#', 2);
    return `${path}${req.originalUrl.slice(queryIndex)}${fragment ? `#${fragment}` : ''}`;
};
const renderedPage = (requestPath) => {
    if (!renderedIndex)
        renderedIndex = readFileSync(path.join(distDirectory, 'index.html'), 'utf8');
    return renderedIndex.replaceAll('__CANONICAL_URL__', `${publicOrigin}${requestPath}`);
};
app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(express.json({ limit: '32kb' }));
// Once the host has pointed www at this deployment, canonicalise it without requiring a second app.
app.use((req, res, next) => {
    const host = (req.headers.host || '').split(':')[0].toLowerCase();
    if (host === 'www.baseln.co') {
        res.redirect(301, `${publicOrigin}${req.originalUrl}`);
        return;
    }
    next();
});
app.get('/_app/health', (_req, res) => {
    res.status(databaseReady ? 200 : 503).json({ status: databaseReady ? 'ready' : 'initialising' });
});
app.post('/api/leads', applyRateLimit, async (req, res) => {
    if (!databaseReady || !database) {
        res.status(503).json({ error: 'The coaching enquiry service is preparing. Please try again in a moment.' });
        return;
    }
    const validation = validateLead(req.body);
    if (!validation.lead) {
        res.status(422).json({ error: validation.error });
        return;
    }
    const lead = validation.lead;
    const leadId = crypto.randomUUID();
    const createdAt = new Date();
    try {
        await database.execute(`INSERT INTO baseln_coaching_leads (
        id, name, email, country_time_zone, phone, main_objective, biggest_obstacle,
        available_days, preferred_start_date, referral_source, privacy_consent,
        health_training_acknowledgement, marketing_opt_in, cta, first_utm_source,
        first_utm_medium, first_utm_campaign, first_utm_content, first_utm_term,
        last_non_direct_source, last_non_direct_medium, last_non_direct_campaign,
        last_non_direct_content, first_landing_page, first_touch_at, last_touch_page,
        last_touch_at, referrer, attribution_json, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            leadId,
            lead.name,
            lead.email,
            lead.countryTimeZone,
            lead.phone || null,
            lead.mainObjective,
            lead.biggestObstacle,
            lead.availableDays,
            lead.preferredStartDate,
            lead.referralSource || null,
            1,
            1,
            0,
            lead.attribution.cta || null,
            lead.attribution.utm_source || null,
            lead.attribution.utm_medium || null,
            lead.attribution.utm_campaign || null,
            lead.attribution.utm_content || null,
            lead.attribution.utm_term || null,
            lead.attribution.last_non_direct_source || null,
            lead.attribution.last_non_direct_medium || null,
            lead.attribution.last_non_direct_campaign || null,
            lead.attribution.last_non_direct_content || null,
            lead.attribution.first_landing_page,
            lead.attribution.first_touch_at,
            lead.attribution.last_touch_page,
            lead.attribution.last_touch_at,
            lead.attribution.referrer,
            JSON.stringify(lead.attribution),
            createdAt,
        ]);
        void ownerNotification(lead, leadId);
        res.status(201).json({ leadId, receivedAt: createdAt.toISOString() });
    }
    catch (error) {
        console.error('BASELN lead insert failed.', error);
        res.status(500).json({ error: 'We could not receive your enquiry just now. Please try again shortly or email aian@baseln.co.' });
    }
});
for (const [legacyPath, destination] of Object.entries(legacyRedirects)) {
    app.get(legacyPath, (req, res) => res.redirect(301, appendQuery(req, destination)));
}
app.use(express.static(distDirectory, { index: false, maxAge: '90d', immutable: true }));
app.use((req, res) => {
    if (req.method === 'GET' || req.method === 'HEAD') {
        res.type('html').send(renderedPage(req.path));
        return;
    }
    res.status(404).json({ error: 'Not found' });
});
app.listen(port, '0.0.0.0', () => {
    console.info(`BASELN server listening on port ${port}.`);
    void initialiseDatabase();
});
