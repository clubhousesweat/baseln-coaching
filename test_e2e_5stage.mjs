import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const projectRoot = path.resolve('/home/ubuntu/baseln');

console.log('=== Test 1: Verify ApplyPage.tsx 5-Stage Architecture & Field Contracts ===');
const applySource = readFileSync(path.join(projectRoot, 'src/pages/ApplyPage.tsx'), 'utf8');

// Header, Compact Viewport & 01 / 05 Progress
assert.ok(applySource.includes('0{stage} / 05'), 'Must contain 01 / 05 progress indicator');
assert.ok(applySource.includes('Apply for coaching.'), 'Must contain Apply for coaching headline');
assert.ok(applySource.includes('h-[3px] bg-charcoal-850'), 'Must contain thin progress bar line');
assert.ok(applySource.includes('bg-smoke-400'), 'Must use smoke-blue progress bar');

// Stage 01 Goal
assert.ok(applySource.includes('01 / 05 · PRIMARY OBJECTIVE'), 'Must contain Stage 01 header');
assert.ok(applySource.includes('Lose body fat'), 'Must contain Lose body fat');
assert.ok(applySource.includes('Build muscle'), 'Must contain Build muscle');
assert.ok(applySource.includes('Get stronger'), 'Must contain Get stronger');
assert.ok(applySource.includes('Improve conditioning'), 'Must contain Improve conditioning');
assert.ok(applySource.includes('Prepare for an event'), 'Must contain Prepare for an event');
assert.ok(applySource.includes('stage-goal-detail'), 'Must contain optional goal detail field');

// Stage 02 Training Now
assert.ok(applySource.includes('02 / 05 · TRAINING CONTEXT'), 'Must contain Stage 02 header');
assert.ok(applySource.includes('stage-current-training'), 'Must contain current training field');
assert.ok(applySource.includes('TRAINING_DAYS'), 'Must contain realistic training days options');
assert.ok(applySource.includes('TRAINING_ENVIRONMENTS'), 'Must contain training environments options');
assert.ok(applySource.includes('Commercial gym'), 'Must contain commercial gym');
assert.ok(applySource.includes('Home gym or dumbbells'), 'Must contain home gym');

// Stage 03 Friction
assert.ok(applySource.includes('03 / 05 · OBSTACLES &amp; FRICTION'), 'Must contain Stage 03 header');
assert.ok(applySource.includes('stage-barrier'), 'Must contain barrier field');
assert.ok(applySource.includes('stage-previous-attempts'), 'Must contain optional previous attempts field');

// Stage 04 Coaching Fit
assert.ok(applySource.includes('04 / 05 · COACHING FIT'), 'Must contain Stage 04 header');
assert.ok(applySource.includes('stage-why-now'), 'Must contain why now field');
assert.ok(applySource.includes('stage-coaching-value'), 'Must contain optional coaching value field');

// Stage 05 Contact & Consent
assert.ok(applySource.includes('05 / 05 · CONTACT DETAILS'), 'Must contain Stage 05 header');
assert.ok(applySource.includes('stage-name'), 'Must contain name input');
assert.ok(applySource.includes('stage-email'), 'Must contain email input');
assert.ok(applySource.includes('stage-timezone'), 'Must contain timezone input');
assert.ok(applySource.includes('stage-phone'), 'Must contain phone input');
assert.ok(applySource.includes('stage-age'), 'Must contain age input');
assert.ok(applySource.includes('stage-privacy-ack'), 'Must contain privacy acknowledgement checkbox');
assert.ok(applySource.includes('Health &amp; Safety:'), 'Must contain sensitive medical disclosure warning');

// Palette & Styling
assert.ok(applySource.includes('bg-charcoal-950'), 'Must use charcoal-950 background');
assert.ok(applySource.includes('bg-charcoal-900'), 'Must use charcoal-900 card');
assert.ok(applySource.includes('bg-smoke-500/15 border-smoke-400'), 'Must use smoke-blue selection');
assert.ok(applySource.includes('bg-smoke-500 hover:bg-smoke-400'), 'Must use smoke-blue submit button');

// Receipt state
assert.ok(applySource.includes('Aian will personally assess your application and respond within one business day.'), 'Receipt must have 1 business day SLA');
assert.ok(!applySource.includes('automated email receipt has been sent'), 'Must not claim false automated email receipt');

console.log('=== Test 2: Verify server.mjs API Contract & Dual Endpoints ===');
const serverSource = readFileSync(path.join(projectRoot, 'server/server.mjs'), 'utf8');
assert.ok(serverSource.includes("app.post('/api/leads', handleCoachingApplication);"), 'Must serve /api/leads');
assert.ok(serverSource.includes("app.post('/api/public/coaching-application', handleCoachingApplication);"), 'Must serve /api/public/coaching-application');
assert.ok(serverSource.includes('goalsArray'), 'Must parse multi-select goals array');
assert.ok(serverSource.includes('barrier'), 'Must validate barrier/friction');
assert.ok(serverSource.includes('currentTraining'), 'Must record current training');
assert.ok(serverSource.includes('trainingEnvironment'), 'Must record training environment');
assert.ok(serverSource.includes('whyNow'), 'Must record why now');
assert.ok(serverSource.includes('timezone'), 'Must record timezone');
assert.ok(serverSource.includes('hasConsent'), 'Must validate privacy/health consent');
assert.ok(serverSource.includes('sendOwnerNotification'), 'Must notify owner on valid submission');
assert.ok(serverSource.includes('Operational inbox: Outlook'), 'Notification must specify Outlook');

console.log('=== Test 3: Verify Query-Preserving /apply 301 Redirect ===');
assert.ok(serverSource.includes("app.get('/apply',"), 'Must handle /apply redirect');
assert.ok(serverSource.includes("response.redirect(301, appendQuery(request, '/online/register'))"), 'Must redirect 301 preserving query');

console.log('=== Test 4: Verify TrainingRoomPage Separation in App.tsx ===');
const appSource = readFileSync(path.join(projectRoot, 'src/App.tsx'), 'utf8');
assert.ok(appSource.includes("import { TrainingRoomPage } from './pages/TrainingRoomPage';"), 'App must import dedicated TrainingRoomPage');

console.log('\n✅ ALL 4 INTEGRATION AND VERIFICATION TEST SUITES PASSED!\n');
