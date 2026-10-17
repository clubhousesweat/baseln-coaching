import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const port = 3187;
const baseUrl = `http://127.0.0.1:${port}`;

const serverSource = readFileSync(path.join(projectRoot, 'server/server.mjs'), 'utf8');
const appSource = readFileSync(path.join(projectRoot, 'src/App.tsx'), 'utf8');
const analyticsSource = readFileSync(path.join(projectRoot, 'src/utils/analytics.ts'), 'utf8');
const shellSource = readFileSync(path.join(projectRoot, 'index.html'), 'utf8');

assert.ok(serverSource.includes("app.get('/go/instagram'"), 'The Instagram bio route must be handled server-side.');
assert.ok(serverSource.includes('instagramTakeoverDefaults'), 'The server must provide the approved takeover defaults.');
assert.ok(serverSource.includes('BASELN Online Coaching | Training & Accountability'), 'The coaching page title must identify BASELN Online Coaching.');
assert.ok(appSource.includes('hasInstagramTakeoverAttribution'), 'The client must record a server-routed Instagram bio arrival.');
assert.ok(analyticsSource.includes("INSTAGRAM_BIO_PATH = '/go/instagram'"), 'The bio path must have one client-side constant.');
assert.ok(shellSource.includes('twitter:site" content="@baseln_fit"'), 'Social-card metadata must identify the active Instagram account.');

const startServer = () => new Promise((resolve, reject) => {
  const child = spawn(process.execPath, ['server/server.mjs'], {
    cwd: projectRoot,
    env: { ...process.env, PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  let output = '';
  const onOutput = (chunk) => {
    output += chunk.toString();
    if (output.includes('BASELN coaching server listening')) resolve(child);
  };

  child.stdout.on('data', onOutput);
  child.stderr.on('data', onOutput);
  child.once('error', reject);
  child.once('exit', (code) => reject(new Error(`Server exited before readiness (${code}): ${output}`)));
});

const server = await startServer();
try {
  const redirectResponse = await fetch(`${baseUrl}/go/instagram?utm_campaign=creator_collaboration&utm_content=profile_bio&ref=instagram`, {
    redirect: 'manual',
  });
  assert.equal(redirectResponse.status, 302, 'The profile-bio route must remain a mutable redirect.');

  const redirectTarget = new URL(redirectResponse.headers.get('location'), baseUrl);
  assert.equal(redirectTarget.pathname, '/online/register');
  assert.equal(redirectTarget.searchParams.get('cta'), 'instagram-profile');
  assert.equal(redirectTarget.searchParams.get('utm_source'), 'instagram');
  assert.equal(redirectTarget.searchParams.get('utm_medium'), 'organic_social');
  assert.equal(redirectTarget.searchParams.get('utm_campaign'), 'creator_collaboration', 'Explicit campaign values must win.');
  assert.equal(redirectTarget.searchParams.get('utm_content'), 'profile_bio', 'Explicit content values must win.');
  assert.equal(redirectTarget.searchParams.get('ref'), 'instagram', 'Non-attribution query values must survive the redirect.');

  const coachingResponse = await fetch(`${baseUrl}/coaching`);
  const coachingHtml = await coachingResponse.text();
  assert.equal(coachingResponse.status, 200);
  assert.match(coachingHtml, /<title>BASELN Online Coaching \| Training &amp; Accountability<\/title>/);
  assert.match(coachingHtml, /<meta property="og:title" content="BASELN Online Coaching \| Training &amp; Accountability" \/>/);
  assert.match(coachingHtml, /<meta name="twitter:title" content="BASELN Online Coaching \| Training &amp; Accountability" \/>/);

  console.log('Instagram takeover attribution and BASELN Online Coaching metadata checks passed.');
} finally {
  server.kill('SIGTERM');
}
