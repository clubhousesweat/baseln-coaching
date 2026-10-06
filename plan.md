# BASELN — Durable Intake and Domain Cutover Plan

## Decision

**baseln.co** is the canonical public domain for the launch-ready BASELN Online Coaching site in Webdev project `wdp_6fb3ad35e165bbfb677ea4f2`. The former site remains online until the new project has a durable, attributed server-side enquiry receipt and the domain cutover is verified. No public price, FastSpring checkout, Buy now flow or payment hand-off is added.

The current public CTA remains **Apply for coaching**. The canonical public application address after cutover is:

`https://baseln.co/online/register?cta=instagram-profile&utm_source=instagram&utm_medium=organic_social&utm_campaign=baseln_instagram_takeover_2026q4&utm_content=takeover_profile_link`

## Implementation approach

### Hybrid deployment and lead delivery

The existing Vite/React site will become a hybrid static-plus-server deployment. A Node/Express server will serve the built Vite output and expose a single private-write API, `POST /api/leads`. It will validate and persist consented coaching applications to the project-managed MySQL database, including first-touch UTM values, latest non-direct assist, landing route, referrer, timestamps, CTA/Instagram takeover context, service fields and `marketingOptIn: false`. A successful database insert is the condition for client success state and `application_complete`.

The server creates its additive lead table idempotently on startup, exposes `/_app/health` for deployment readiness, rate-limits public submission attempts in process, and sends a concise owner notification after persistence. Notification failure is non-blocking; database persistence and the returned receipt remain authoritative.

### Canonical application and legacy paths

The branded public intake will be `/online/register` and it will render the existing application experience. Every public Apply CTA will navigate there. `GET /apply` will return a **301** to `/online/register`, retaining all query parameters. The former site’s practical public routes will be moved as safe server redirects: `/online`, `/the-package`, `/how-it-works`, and `/online/engine-room` to `/coaching`; `/online/field-notes` to `/field-notes`; `/app` and `/member-login` to `/training-room`; and `/faq` to `/coaching#questions`. The homepage, `/coaching`, `/online/register`, `/privacy` and `/terms` are served by the new site.

The existing `POST /apply` path is never used by the new application; the old domain remains unchanged until domain reassignment occurs, avoiding any interruption to its currently proven lead receipt.

### Domain handoff sequence

1. Enable the project’s one-way managed server/database features and deploy the hybrid application.
2. Validate a real end-to-end lead receipt, database row and owner notification attempt using the exact Instagram takeover UTM payload. Verify the post-submit acknowledgement only follows server success.
3. Configure canonical metadata for `https://baseln.co`, publish query-preserving redirects, and verify the new Manus deployment at its project URL.
4. Use the domain control plane to reassign `baseln.co`; add `www.baseln.co` to the same new project if DNS is created, with canonical host handling. Do not destroy the old deployment.
5. Verify HTTPS/DNS, canonical headers/markup, 301 responses, mobile application layout, the complete four-parameter Instagram URL, legal pages and absence of payment/checkout UI on `baseln.co`.

## Constraints

- Managed server/database enablement is irreversible and required for durable lead storage.
- The current Webdev config must be read before each domain write. The custom-domain owner/control plane must supply the actual reassignment action and any DNS record values; no DNS target is guessed.
- The new server uses only first-party persistence and owner notifications. No invented CRM, marketing opt-in, test checkout or unsupported proof is introduced.
