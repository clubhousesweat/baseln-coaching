import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const projectRoot = path.resolve('/home/ubuntu/baseln');

console.log('=== Test 1: Verify sixth goal card image in built code & source ===');
const goalCarouselSource = readFileSync(path.join(projectRoot, 'src/components/GoalCarousel.tsx'), 'utf8');
assert.ok(goalCarouselSource.includes('/media/goals/return-to-training.jpg'), 'GoalCarousel must reference /media/goals/return-to-training.jpg');
assert.ok(!goalCarouselSource.includes('BwTrBneUyjiDdjad92TgMr'), 'GoalCarousel must not reference the dead async-image');

console.log('=== Test 2: Verify server metadata & route definitions ===');
const serverSource = readFileSync(path.join(projectRoot, 'server/server.mjs'), 'utf8');
const requiredRoutes = [
  '/',
  '/coaching',
  '/online/register',
  '/online/thank-you',
  '/member-login',
  '/training-room',
  '/app',
  '/coach',
  '/contact',
  '/privacy',
  '/terms',
  '/refund-policy',
  '/training-disclaimer'
];
for (const r of requiredRoutes) {
  assert.ok(serverSource.includes(`'${r}'`), `server.mjs must contain route ${r}`);
}
assert.ok(serverSource.includes("Operational inbox: Outlook"), 'server.mjs notification must document Outlook as operational inbox');
assert.ok(!serverSource.includes('gmail'), 'server.mjs must not introduce Gmail dependency');

console.log('=== Test 3: Verify client route definitions in App.tsx ===');
const appSource = readFileSync(path.join(projectRoot, 'src/App.tsx'), 'utf8');
for (const r of ['/online/thank-you', '/member-login', '/app', '/coach']) {
  assert.ok(appSource.includes(`'${r}'`), `App.tsx must include route ${r}`);
}
assert.ok(appSource.includes('Skip to main content'), 'App.tsx must include skip link');
assert.ok(appSource.includes('id="main-content"'), 'App.tsx must include main-content id');

console.log('=== Test 4: Verify navigation links to /member-login ===');
const navSource = readFileSync(path.join(projectRoot, 'src/components/Navigation.tsx'), 'utf8');
assert.ok(navSource.includes("handleNav('/member-login')"), 'Header desktop and mobile must navigate to /member-login');
assert.ok(navSource.includes("navigate('/member-login')"), 'Footer must navigate to /member-login');
assert.ok(!navSource.includes("handleNav('/training-room')"), 'Header must not route Member Login to /training-room');
assert.ok(navSource.includes('min-h-[44px]'), 'Footer links must have accessible touch target sizing');

console.log('=== Test 5: Verify CoachingPage FAQ disclosure attributes ===');
const coachingSource = readFileSync(path.join(projectRoot, 'src/pages/CoachingPage.tsx'), 'utf8');
assert.ok(coachingSource.includes('aria-expanded={isOpen}'), 'CoachingPage FAQ must have aria-expanded');
assert.ok(coachingSource.includes('aria-controls={contentId}'), 'CoachingPage FAQ must have aria-controls');
assert.ok(coachingSource.includes('role="region"'), 'CoachingPage FAQ content must have role="region"');
assert.ok(coachingSource.includes('The six-week investment and ongoing coaching terms are explained before you decide to begin.'), 'Cost FAQ text must match neutral policy');

console.log('=== Test 6: Verify robots.txt and manus-routes.json ===');
const robots = readFileSync(path.join(projectRoot, 'public/robots.txt'), 'utf8');
assert.ok(robots.includes('Disallow: /online/thank-you'), 'robots.txt must disallow /online/thank-you');
assert.ok(robots.includes('Disallow: /member-login'), 'robots.txt must disallow /member-login');
assert.ok(robots.includes('Disallow: /coach'), 'robots.txt must disallow /coach');

const routesManifest = JSON.parse(readFileSync(path.join(projectRoot, 'public/manus-routes.json'), 'utf8'));
const manifestPaths = routesManifest.routes.map(r => r.path);
assert.ok(manifestPaths.includes('/online/thank-you'), 'manus-routes.json must include /online/thank-you');
assert.ok(manifestPaths.includes('/member-login'), 'manus-routes.json must include /member-login');

console.log('=== ALL TESTS PASSED! ===');
