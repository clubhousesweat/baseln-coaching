import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const projectRoot = path.resolve('/home/ubuntu/baseln');

console.log('=== Test 1: Verify 5-stage application structure in ApplyPage.tsx ===');
const applySource = readFileSync(path.join(projectRoot, 'src/pages/ApplyPage.tsx'), 'utf8');

// Check Stage 1 Header and Goals
assert.ok(applySource.includes('APPLICATION / 0'), 'Must contain stage counter indicator');
assert.ok(applySource.includes('YOUR GOALS.'), 'Must contain Stage 1 title');
assert.ok(applySource.includes('OUR STARTING POINT.'), 'Must contain Stage 1 title subhead');
assert.ok(applySource.includes('Lose body fat'), 'Must contain Lose body fat');
assert.ok(applySource.includes('Build muscle'), 'Must contain Build muscle');
assert.ok(applySource.includes('Get stronger'), 'Must contain Get stronger');
assert.ok(applySource.includes('Improve conditioning'), 'Must contain Improve conditioning');
assert.ok(applySource.includes('Prepare for an event'), 'Must contain Prepare for an event');
assert.ok(applySource.includes('Improve general health and fitness'), 'Must contain Improve general health and fitness');

// Check Form Colours Coordinated with Smoke-Blue
assert.ok(applySource.includes('bg-smoke-500/15 border-smoke-400'), 'Must use smoke-blue active selection state');
assert.ok(applySource.includes('bg-smoke-400 text-charcoal-950'), 'Must use smoke-blue checkbox indicator');
assert.ok(applySource.includes('bg-smoke-500 hover:bg-smoke-400'), 'Must use smoke-blue submit button');

// Check Stage 2, 3, 4, 5
assert.ok(applySource.includes('STAGE 2 / 5'), 'Must contain Stage 2');
assert.ok(applySource.includes('STAGE 3 / 5'), 'Must contain Stage 3');
assert.ok(applySource.includes('STAGE 4 / 5'), 'Must contain Stage 4');
assert.ok(applySource.includes('STAGE 5 / 5'), 'Must contain Stage 5');

console.log('=== Test 2: Verify server.mjs supports multi-goal payload ===');
const serverSource = readFileSync(path.join(projectRoot, 'server/server.mjs'), 'utf8');
assert.ok(serverSource.includes('Array.isArray(payload.goals)'), 'Server must handle goals array');
assert.ok(serverSource.includes('sendOwnerNotification'), 'Server must send owner notification');
assert.ok(serverSource.includes('Operational inbox: Outlook'), 'Server notification must note Outlook inbox');

console.log('=== ALL 5-STAGE APPLICATION INTEGRATION TESTS PASSED! ===');
