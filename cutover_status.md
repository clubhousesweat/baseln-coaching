# BASELN Live Domain Cutover & Post-Launch Verification Report

**Date:** 10 October 2026 (AWST)  
**Canonical Production Domain:** `https://baseln.co`  
**Webdev Project Resource:** `wdp_6fb3ad35e165bbfb677ea4f2` (BASELN — Private Online Coaching)  
**Deployed Release Checkpoint:** `c5bff9912d72f29c60f80e2574fae65981e0dda1`  
**Active Production Bundle:** `/assets/index-Crdft6V-.js`  
**Deployment Infrastructure:** Routed Server Container (`routed-server/1`) + Managed MySQL (`coaching_leads`)  

---

## 1. Executive Summary

The custom domain cutover of **`baseln.co` to the new audited BASELN Online Coaching server deployment has been executed and verified live.**

The legacy site previously served at `baseln.co` (transparent proxy, old bundle `/assets/index-DXoQaEYl.js`, unapproved A$199/month pricing claims, and broken `/apply` 404) has been completely replaced. The live apex domain is now serving the clean, accessible, conversion-optimised BASELN Online Coaching platform directly from the verified container release.

### Core Cutover Achievements:
- **Live Apex Replacement Confirmed:** `https://baseln.co/` renders the approved editorial coaching layout, genuine media, and modern typography. Headers confirm `x-manus-proxy-mode: routed-server/1`.
- **Durable Lead Submission Verified:** Controlled mobile form POST to `https://baseln.co/api/leads` with the complete Instagram takeover UTM payload succeeded with `HTTP 201 Created` (`leadId: 12060001`) and persisted to the managed database.
- **Canonical Routing & 301 Redirects:** Legacy `/apply` with query parameters returns an immediate `HTTP 301 Moved Permanently` to `/online/register`, preserving 100% of the query string.
- **Complete Commercial Compliance:** Zero prohibited commercial terms (A$199, A$249, month-to-month, subscription, FastSpring, PayPal, Buy now, checkout) detected across all 13 crawled public routes.
- **Contact & Legal Coverage:** Dedicated `/contact`, `/terms`, `/privacy`, `/refund-policy`, and `/training-disclaimer` all return `HTTP 200 OK` with neutral pre-agreement language.
- **`www` Subdomain DNS Resolution:** The server container includes host-level 301 redirect logic for `www.baseln.co` to `https://baseln.co`. To activate this, a single CNAME record for host `www` pointing to `@` (or `baseln.co`) is required at GoDaddy DNS (`ns75.domaincontrol.com` / `ns76.domaincontrol.com`).

---

## 2. Branded Edge Verification Matrix (`https://baseln.co`)

| Test / Gate | Target URL | Expected | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Apex Health** | `GET /_app/ready` | `200 OK` JSON | `HTTP 200 OK` `{"ok":true,"service":"baseln-coaching"}` | **PASS** |
| **Apex Root** | `GET /` | `200 OK` HTML | `HTTP 200 OK` (`routed-server/1`, bundle `index-Crdft6V-.js`) | **PASS** |
| **Query Redirect** | `GET /apply?utm_source=instagram&...` | `301` to `/online/register?...` | `HTTP 301` `Location: /online/register?utm_source=...` (query intact) | **PASS** |
| **Application Form** | `GET /online/register` | `200 OK` HTML | `HTTP 200 OK` (All 10 accessible form controls active) | **PASS** |
| **Durable Lead POST** | `POST /api/leads` | `201 Created` JSON | `HTTP 201 Created` `{"ok":true,"leadId":12060001}` | **PASS** |
| **Contact Route** | `GET /contact` | `200 OK` HTML | `HTTP 200 OK` (Application-first CTA + direct coach email) | **PASS** |
| **Coaching Route** | `GET /coaching` | `200 OK` HTML | `HTTP 200 OK` (Editorial layout, FAQ accordion, zero price) | **PASS** |
| **Terms of Service** | `GET /terms` | `200 OK` HTML | `HTTP 200 OK` (Neutral pre-agreement terms, zero price) | **PASS** |
| **Privacy Policy** | `GET /privacy` | `200 OK` HTML | `HTTP 200 OK` (Australian Privacy Principles compliant) | **PASS** |
| **Refund Information** | `GET /refund-policy` | `200 OK` HTML | `HTTP 200 OK` (Statutory guarantees & fit assessment) | **PASS** |
| **Training Disclaimer** | `GET /training-disclaimer` | `200 OK` HTML | `HTTP 200 OK` (Health & physical readiness terms) | **PASS** |
| **Sitemap** | `GET /sitemap.xml` | `200 OK` XML | `HTTP 200 OK` (Canonical URLs under `https://baseln.co`) | **PASS** |
| **Robots Rules** | `GET /robots.txt` | `200 OK` Text | `HTTP 200 OK` (Allows public routes, points to sitemap) | **PASS** |
| **Route Manifest** | `GET /manus-routes.json` | `200 OK` JSON | `HTTP 200 OK` (Enumerates complete declared routes) | **PASS** |

---

## 3. Durable Lead Pipeline Verification (`POST /api/leads`)

A live test lead was submitted to the production endpoint `https://baseln.co/api/leads`:

```json
{
  "name": "Live Branded QA Lead",
  "email": "live-branded-audit-check@baseln.co",
  "phone": "+61400000000",
  "countryTimeZone": "Australia/Perth",
  "mainObjective": "Strength, athletic performance, body composition",
  "biggestObstacle": "Live branded-domain post-cutover verification lead.",
  "availableDays": "4 days per week",
  "preferredStartDate": "Next Monday",
  "referralSource": "Instagram takeover profile link",
  "privacyConsent": true,
  "marketingOptIn": false,
  "cta": "instagram-story",
  "attribution": {
    "utm_source": "instagram",
    "utm_medium": "organic_social",
    "utm_campaign": "baseln_instagram_takeover_2026q4",
    "utm_content": "story_day_1",
    "utm_term": "",
    "first_landing_page": "/online/register",
    "referrer": "https://instagram.com/",
    "first_touch_at": "2026-10-10T00:00:00Z",
    "last_non_direct_source": "instagram",
    "last_non_direct_medium": "organic_social",
    "last_non_direct_campaign": "baseln_instagram_takeover_2026q4",
    "last_non_direct_content": "story_day_1",
    "last_non_direct_at": "2026-10-10T00:19:30Z",
    "last_touch_page": "/online/register",
    "last_touch_at": "2026-10-10T00:20:00Z"
  }
}
```

**Production Response:**
```http
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{"ok":true,"leadId":12060001}
```

**Result:** Lead record `#12060001` is durably stored in the managed MySQL `coaching_leads` database table, preserving full first-touch and last-assist Instagram attribution.

---

## 4. Commercial Consistency Negative Scan

An automated crawler inspected all 13 declared and linked public routes on `https://baseln.co/` for prohibited commercial text strings:
- Prohibited tokens scanned: `A$199`, `$199`, `199 per month`, `199/month`, `A$249`, `$249`, `249`, `month-to-month`, `FastSpring`, `PayPal`, `Buy now`, `buy now`, `checkout`, `subscription`.
- **Outcome:** **0 occurrences found across all 13 routes.** The public site adheres strictly to the approved application-first positioning.

---

## 5. Subdomain DNS Item (`www.baseln.co`)

- **Current State:** `www.baseln.co` has no DNS record configured at GoDaddy (`ns75.domaincontrol.com` / `ns76.domaincontrol.com`), resulting in `NXDOMAIN`.
- **Server Capability:** The production server (`server/server.mjs`) already includes host-level 301 redirect logic that catches requests to `www.baseln.co` and permanently redirects them to `https://baseln.co`, preserving path and query parameters:
  ```javascript
  app.use((request, response, next) => {
    const host = (request.headers.host || '').split(':')[0].toLowerCase();
    if (host === 'www.baseln.co') {
      return response.redirect(301, `${publicOrigin}${request.originalUrl}`);
    }
    next();
  });
  ```
- **Action Required at Domain Registrar (GoDaddy):**
  Add a CNAME record:
  - **Type:** `CNAME`
  - **Name / Host:** `www`
  - **Value / Points to:** `@` (or `baseln.co`)
  - **TTL:** 1 Hour (or Default)

---

## 6. Conclusion & Handoff

The core launch objective has succeeded: **`baseln.co` is live with the new audited BASELN Online Coaching website.** 

The Website Auditor task (`ckFvmqdU176jlSsTTzhq4w`) and Start-Up Boss task (`7Q153AB2ChCVBmmH8o2jGk`) have been notified with the live empirical test receipts for final sign-off.
