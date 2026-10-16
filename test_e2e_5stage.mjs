import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const projectRoot = path.resolve('/home/ubuntu/baseln');
const applySource = readFileSync(path.join(projectRoot, 'src/pages/ApplyPage.tsx'), 'utf8');
const appSource = readFileSync(path.join(projectRoot, 'src/App.tsx'), 'utf8');
const serverSource = readFileSync(path.join(projectRoot, 'server/server.mjs'), 'utf8');

const mustContain = (source, phrase, message) => assert.ok(source.includes(phrase), message);

console.log('=== Test 1: Editorial application composition ===');
[
  'BASELN / APPLICATION',
  'GOOD TRAINING STARTS HERE.',
  'Tell us where you want to go. We’ll work out the best way to get you there.',
  'STRENGTH. CONDITIONING. BODY COMPOSITION.',
  '2–3 MIN',
  'max-w-[1280px]',
  'lg:grid-cols-[minmax(360px,0.86fr)_minmax(0,1.14fr)]',
  'bg-[#15362D]',
  'bg-[#E9E0D3]',
  'bg-[#76352F]',
].forEach((phrase) => mustContain(applySource, phrase, `Missing editorial composition token: ${phrase}`));
assert.ok(!applySource.includes('bg-smoke-'), 'Application must not use the superseded smoke-blue palette.');
assert.ok(!applySource.includes('bg-charcoal-'), 'Application must not retain the superseded black/graphite form treatment.');

console.log('=== Test 2: Five-stage form and accessible controls ===');
[
  'Lose body fat',
  'Build muscle',
  'Get stronger',
  'Improve conditioning',
  'Prepare for an event',
  'stage-goal-detail',
  'stage-current-training',
  'stage-training-history',
  'stage-barrier',
  'stage-previous-attempts',
  'stage-why-now',
  'stage-coaching-value',
  'stage-name',
  'stage-email',
  'stage-timezone',
  'stage-phone',
  'stage-age',
  'stage-privacy-ack',
  'aria-pressed={isSelected}',
  'role="progressbar"',
  'Please select at least one primary goal to continue.',
  'Submit application',
].forEach((phrase) => mustContain(applySource, phrase, `Missing stage/control contract: ${phrase}`));

console.log('=== Test 3: Route-specific application chrome ===');
mustContain(appSource, 'const isApplicationRoute = currentPath === CANONICAL_APPLICATION_PATH;', 'Application route must be distinguished from ordinary site routes.');
mustContain(appSource, '{!isApplicationRoute && <Header', 'Regular promotional header must be removed for the application route.');
mustContain(appSource, '{!isApplicationRoute && <Footer', 'Regular promotional footer must be removed for the application route.');

console.log('=== Test 4: Durable application contract ===');
[
  "fetch('/api/public/coaching-application'",
  'setSubmitted(true)',
  'application_complete',
  'privacy_ack: true',
  'attribution: currentAttr',
  'Aian will personally review your application and respond within one business day.',
].forEach((phrase) => mustContain(applySource, phrase, `Missing client delivery contract: ${phrase}`));
[
  "app.post('/api/leads', handleCoachingApplication);",
  "app.post('/api/public/coaching-application', handleCoachingApplication);",
  "app.get('/apply',",
  "response.redirect(301, appendQuery(request, '/online/register'))",
  'goalsArray',
  'hasConsent',
  'sendOwnerNotification',
  'return response.status(201).json({ ok: true, leadId });',
].forEach((phrase) => mustContain(serverSource, phrase, `Missing server delivery contract: ${phrase}`));

console.log('\n✅ BASELN editorial application regression checks passed.\n');
