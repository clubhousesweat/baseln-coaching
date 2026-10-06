# BASELN Launch & Domain Cutover Status

## 1. Domain Ownership & Cutover Findings
- Outgoing live website: https://baseln.co (Cloudflare IPs: 104.18.26.246, 104.18.27.246).
- `www.baseln.co`: DNS lookup failed (`[Errno -2] Name or service not known`). No CNAME/A record is provisioned for www yet.
- Outgoing live application endpoint: `https://baseln.co/online/register` (demonstrates working server-side `onlineInterest.register` with `interestId: 90001` and durable submission).
- Current new site project: Webdev project `wdp_6fb3ad35e165bbfb677ea4f2` (live at `https://baseln-swpjc9hq.manus.space`).
- In `wdp_6fb3ad35e165bbfb677ea4f2`, the project was originally built as a static client-side Vite project (`server: false`, `database: false`). No custom-domain mapping surface is exposed to the local sandbox agent via `infra/overview` or local files; custom domain assignment for `baseln.co` is managed at the project/workspace dashboard or Cloudflare DNS control plane.

## 2. Server-Side Non-Regression Implementation
- Transformed the new codebase into a hybrid static + server architecture:
  - Added `server/index.ts` with Express and `mysql2/promise`.
  - Added dedicated endpoint `POST /api/leads` that validates contact, coaching objective, availability, readiness, `privacyConsent: true`, `healthTrainingAcknowledgement: true`, and `marketingOptIn: false`.
  - Persists full attribution data into the database table `baseln_coaching_leads`:
    - `cta`
    - `first_utm_source`, `first_utm_medium`, `first_utm_campaign`, `first_utm_content`, `first_utm_term`
    - `last_non_direct_source`, `last_non_direct_medium`, `last_non_direct_campaign`, `last_non_direct_content`
    - `first_landing_page`, `first_touch_at`
    - `last_touch_page`, `last_touch_at`
    - `referrer`
    - Complete raw JSON attribution string
  - Post-submission owner alert triggered via `MANUS_API_URL` Connect RPC (`SendNotification`) to notify Aian McLennan immediately.
  - Replaced browser-only storage acknowledgement on `/online/register`: success screen and `application_complete` analytics event are fired ONLY upon receiving a 201 response with server `leadId`.
  - Integrated server health check at `/_app/health`.
  - Dockerfile prepared for production container deployment (`node server-dist/index.js` on port 3000).

## 3. Canonical Application and Legacy 301 Redirect Matrix
- Canonical branded application route is now `/online/register`.
- All internal buttons and links throughout the site updated from `/apply` to `/online/register`.
- Query-preserving 301 redirects implemented:
  - `GET /apply` -> `/online/register` (preserves all UTM and CTA query parameters).
  - `GET /online` -> `/coaching`
  - `GET /the-package` -> `/coaching`
  - `GET /how-it-works` -> `/coaching`
  - `GET /online/engine-room` -> `/coaching`
  - `GET /online/field-notes` -> `/field-notes`
  - `GET /app` -> `/training-room`
  - `GET /member-login` -> `/training-room`
  - `GET /faq` -> `/coaching#questions`
- Host-level 301 redirect for `www.baseln.co` -> `https://baseln.co` implemented on server.
- Canonical metadata and OpenGraph URL tags updated to `https://baseln.co/__PATH__`.

## 4. Public Payment Hold
- Verified zero occurrences of `FastSpring`, `Buy now`, `checkout`, `A$249`, or `checkout_handoff` across all client, server, and public assets.
- Terms of Service and Privacy Notice updated to neutral approved payment provider wording.

## 5. Cutover Prerequisite & Handoff
- The outgoing live site at https://baseln.co has NOT been cut early or disrupted.
- To complete cutover to `wdp_6fb3ad35e165bbfb677ea4f2`:
  1. Complete Webdev project feature enablement (`features.server: true`, `features.database: true`).
  2. Point `baseln.co` and `www.baseln.co` (once CNAME is created) to the new project in the project dashboard / Cloudflare DNS.
  3. Run end-to-end audit verification on `https://baseln.co/online/register?cta=instagram-profile&utm_source=instagram&utm_medium=organic_social&utm_campaign=baseln_instagram_takeover_2026q4&utm_content=takeover_profile_link`.
