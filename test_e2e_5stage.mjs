import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const applySource = readFileSync(path.join(projectRoot, 'src/pages/ApplyPage.tsx'), 'utf8');
const appSource = readFileSync(path.join(projectRoot, 'src/App.tsx'), 'utf8');
const serverSource = readFileSync(path.join(projectRoot, 'server/server.mjs'), 'utf8');

const mustContain = (source, phrase, message) => assert.ok(source.includes(phrase), message);

console.log('=== Test 1: Selected Contemporary Premium Coaching composition ===');
[
  'BASELN / APPLICATION',
  'START WITH A CONVERSATION.',
  'Tell us what you’re working towards. We’ll take it from there.',
  '/media/baseln-front-squat-coaching.png',
  '2–3 MINUTES · NO COMMITMENT',
  'max-w-[720px]',
  'id="application-stage"',
  'bg-[#0B0C0E]',
  'bg-[#07080A]',
  'bg-[#C7D5D7]',
  'bg-[#A4B8C8]/10',
  'text-[#F9F9F8]',
].forEach((phrase) => mustContain(applySource, phrase, `Missing editorial composition token: ${phrase}`));
[
  '#E9E0D3', '#F8F3EB', '#FCF8F0', '#FDF9F2', '#FFF8EE',
  '#15362D', '#6F312D', '#76352F', '#F5EDE3', '#F6E7D8', '#F7E9D8',
].forEach((token) => assert.ok(!applySource.includes(token), `Application retains superseded palette token: ${token}`));

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
mustContain(appSource, '{!isApplicationRoute && !isPrivateAssessment && <Header', 'Regular promotional header must be removed for the application route.');
mustContain(appSource, '{!isApplicationRoute && !isPrivateAssessment && <Footer', 'Regular promotional footer must be removed for the application route.');

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
  'recordApplicationWorkflow',
  'return response.status(201).json({ ok: true, leadId });',
].forEach((phrase) => mustContain(serverSource, phrase, `Missing server delivery contract: ${phrase}`));

console.log('\n✅ BASELN editorial application regression checks passed.\n');
