# BASELN Release & Domain Cutover Status Report

Date: 9 October 2026
Project Resource: `manus-resource://manus-webdev/project/wdp_6fb3ad35e165bbfb677ea4f2`
Staging & Deployment URL: `https://baseln-swpjc9hq.manus.space`
Canonical Production Domain Target: `https://baseln.co`

---

## 1. Executive Summary

The replacement BASELN Online Coaching site and server lead engine are **deployed, certified by independent audit, and ready for public domain traffic**.

- **Independent Audit Verdict:** **PASS — staging release is approved for custom-domain cutover** (Website Auditor task `ckFvmqdU176jlSsTTzhq4w`).
- **Canonical Release Commit:** `21766b4` (`main`), building container image with `index-DqAji2z9.js`.
- **Durable Lead Pipeline:** Active via managed MySQL (`coaching_leads` table) with server-side validation and owner notification dispatch.
- **Rollback Safety:** Legacy site at `https://baseln.co/` remains online and untouched until DNS / custom hostname cutover is completed and verified.

---

## 2. Verified Technical Gates & Test Receipts

### Gate 1: Container Health & Readiness
- **Endpoint:** `GET https://baseln-swpjc9hq.manus.space/_app/ready`
- **HTTP Status:** `200 OK`
- **Response Payload:** `{"ok":true,"service":"baseln-coaching"}`

### Gate 2: Branded Application Route (`/online/register`)
- **Accessibility:** 10 substantive form controls audited and confirmed with stable IDs, names, and programmatic `<label for>` / `aria-label` associations:
  1. `apply-name` / `name` (associated with visible label "YOUR FULL NAME *")
  2. `apply-email` / `email` (associated with visible label "EMAIL ADDRESS *")
  3. `apply-country-time-zone` / `countryTimeZone` (associated with visible label "COUNTRY / TIME ZONE *")
  4. `apply-phone` / `phone` (associated with visible label "PHONE NUMBER (OPTIONAL)")
  5. `apply-main-objective` / `mainObjective` (associated with visible label "WHAT IS YOUR MAIN OBJECTIVE? *")
  6. `apply-biggest-obstacle` / `biggestObstacle` (associated with visible label "WHAT HAS BEEN THE BIGGEST OBSTACLE SO FAR? *")
  7. `apply-available-days` / `availableDays` (associated with visible label "HOW MANY DAYS COULD YOU REALISTICALLY TRAIN EACH WEEK? *")
  8. `apply-preferred-start-date` / `preferredStartDate` (associated with visible label "WHEN WOULD YOU LIKE TO START? *")
  9. `legal-consent` / `privacyConsent` (associated with visible privacy/health consent text)
  10. `application-submit` / `submitApplication` (`aria-label="Submit private coaching enquiry"`)
- **Keyboard Navigation:** Logical tab order: fields → consent → privacy policy link → disclaimer link → submit button. No horizontal overflow on mobile or desktop viewports.

### Gate 3: Query-Preserving Legacy Redirect (`/apply`)
- **Request:** `GET https://baseln-swpjc9hq.manus.space/apply?utm_source=instagram&utm_medium=organic_social&utm_campaign=baseln_instagram_takeover_2026q4&utm_content=takeover_profile_link&cta=instagram-profile`
- **HTTP Status:** `301 Moved Permanently`
- **Location Header:** `/online/register?utm_source=instagram&utm_medium=organic_social&utm_campaign=baseln_instagram_takeover_2026q4&utm_content=takeover_profile_link&cta=instagram-profile`

### Gate 4: Durable Lead Intake & Receipt (`POST /api/leads`)
- **Controlled Instagram Attribution Test:**
  - `utm_source`: `instagram`
  - `utm_medium`: `organic_social`
  - `utm_campaign`: `baseln_instagram_takeover_2026q4`
  - `utm_content`: `takeover_profile_link`
  - `cta`: `instagram-profile`
  - `privacyConsent`: `true`
  - `healthTrainingAcknowledgement`: `true`
  - `marketingOptIn`: `false`
- **Server Response:** `HTTP 201 Created`
- **Receipt Payload:** `{"ok":true,"leadId":8060001}` (prior audit runs: `60001`, `2060002`, `6060001`)
- **Client Receipt:** UI transitions cleanly to the verified completion view and fires `application_complete`.

### Gate 5: Social Preview & Canonical Metadata
- **Canonical URL:** `<link rel="canonical" href="https://baseln.co/online/register">`
- **Open Graph Image:** `<meta property="og:image" content="https://baseln.co/media/baseln-front-squat-coaching.png">`
- **Twitter Card Image:** `<meta name="twitter:image" content="https://baseln.co/media/baseln-front-squat-coaching.png">`
- **Sitemap & Robots:**
  - `GET /robots.txt`: `200 OK` (points to `https://baseln.co/sitemap.xml`)
  - `GET /sitemap.xml`: `200 OK` (lists all canonical routes under `https://baseln.co`)

### Gate 6: Commercial & Compliance Guardrails
- **Public Payment Surfaces:** Clean. FastSpring test components, checkout tokens, and pricing numbers (e.g. A$249) remain completely absent from public routes and source bundles.
- **Legal Compliance:** Standalone routes operational for `/privacy`, `/terms`, `/refunds`, and `/training-disclaimer`.
- **Marketing Opt-In:** Strict Australian Privacy Principle compliance — enquiry submission explicitly records `marketingOptIn: false` with clear affirmative consent for coaching fit evaluation only.

---

## 3. Custom Domain & DNS Cutover Details

### Current Infrastructure State:
- **`baseln.co` Apex:** Points to Cloudflare edge IPs `104.18.26.246`, `104.18.27.246` under SSL certificate `WE1` (Google Trust Services).
- **`www.baseln.co`:** Currently unconfigured in public DNS.
- **Origin Target:** `baseln-swpjc9hq.manus.space` (project resource `wdp_6fb3ad35e165bbfb677ea4f2`).

### Platform Domain Assignment Instructions:
1. In the project dashboard for `BASELN — Private Online Coaching` (`wdp_6fb3ad35e165bbfb677ea4f2`), go to **Settings → Domains**.
2. Select **Connect Domain** and enter `baseln.co` with **Include www** selected (`withWww: true`).
3. Set the apex `https://baseln.co` as primary/canonical, and set `www.baseln.co` to redirect to apex (`301`).
4. If managing via Cloudflare DNS directly:
   - Apex `baseln.co`: CNAME or ALIAS to `baseln-swpjc9hq.manus.space` (or Cloudflare SaaS custom hostname mapping).
   - Subdomain `www.baseln.co`: CNAME to `baseln.co` with Page Rule / Redirect Rule to `https://baseln.co/$1`.
