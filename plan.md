# Implementation Plan — Seamless 5-Stage Private Coaching Application

**Site destination:** `https://baseln-swpjc9hq.manus.space` (BASELN Online Coaching, directory `/home/ubuntu/baseln`, resource `wdp_6fb3ad35e165bbfb677ea4f2`).  
**Design direction:** Seamless in-site application. Retains the existing site header, footer, navigation, supplied BASELN serif wordmark, dark video hero, and the black/graphite/white/silver-grey visual language with smoke-blue accents (`smoke-400`/`smoke-500`). No synthetic images, no cream/forest/oxblood palette, no standalone microsite.

## 1. Scope & Acceptance Requirements

### Design & Layout
- Keep the real site header, footer, navigation, and mobile menu completely intact.
- Route remains `/online/register`. Compact intro: the first question appears above the fold on desktop and within the first normal mobile phone viewport without long scrolling.
- Contained 5-stage progressive flow with a quiet indicator: small `01 / 05` label, thin smoke-blue progress line, and in-flow Back / Continue controls.
- Clean black/graphite/silver-grey palette: `bg-charcoal-950` page, `bg-charcoal-900` card, `border-white/10`, white typography, `text-paper-300`/`text-paper-400` descriptions, and subtle smoke-blue interaction highlights (`bg-smoke-500/15`, `border-smoke-400`, `text-smoke-300`).
- Visible, programmatically associated `<label for>` attributes on every control.
- Clear error summary per step with no jumping or floating buttons.

### 5-Stage Form Structure & Backend Field Contract
Support both `/api/public/coaching-application` and `/api/leads` on the server:

- **Stage 01 — Goal**:
  - `goals`: string array (e.g. `Lose body fat`, `Build muscle`, `Get stronger`, `Improve conditioning`, `Prepare for an event`, `Improve general health and fitness`).
  - `goal_detail`: optional string for specific detail or nuances.
- **Stage 02 — Training Now**:
  - `current_training`: string (what the applicant is doing right now).
  - `training_days`: string (`1–2 days`, `3 days`, `4 days`, `5+ days`, `Variable`).
  - `training_environment`: string (`Commercial gym`, `Home setup / dumbbells`, `Bodyweight / outdoors`, `Mix of gym and travel`).
  - `training_history`: string / select (context of prior structured training).
- **Stage 03 — Friction**:
  - `barrier`: required string (what has been the main obstacle or friction).
  - `previous_attempts`: optional string (what was tried previously and why it stalled).
- **Stage 04 — Coaching Fit**:
  - `coaching_value`: optional string (what they value most in a coach: direct technique feedback, weekly accountability, structured planning).
  - `why_now`: required string (why starting coaching right now matters).
- **Stage 05 — Contact & Consent**:
  - `name`: required string.
  - `email`: required valid email string.
  - `phone`: optional string (WhatsApp/mobile for timely coordination).
  - `timezone`: required string (country / time zone).
  - `age`: optional string.
  - `privacy_ack`: required boolean (privacy notice & health training acknowledgement).
  - Explicit warning: no sensitive medical/injury records submitted through the public form.

### Submission & Receipt Contract
- Client POSTs JSON payload containing both legacy keys (`countryTimeZone`, `availableDays`, `biggestObstacle`, `preferredStartDate`) and explicit 5-stage keys (`goals`, `goal_detail`, `current_training`, `training_days`, `training_environment`, `training_history`, `barrier`, `previous_attempts`, `coaching_value`, `why_now`, `name`, `email`, `phone`, `timezone`, `age`, `privacy_ack`, `attribution`).
- Server verifies database connectivity and required fields, inserts into `coaching_leads` (storing rich fields in `attribution_json`), and returns `201 { ok: true, leadId }`.
- Success state displays only after confirmed server persistence.
- Confirmation states: "Received. Aian will personally review your application and respond within one business day." No false claim of an automated email receipt.
- Query-preserving permanent 301 redirect: `/apply` → `/online/register`.
- No changes to DNS, payments, or public pricing.

---

## 2. Implementation Steps

1. **Server API (`server/server.mjs`)**:
   - Add alias endpoint `POST /api/public/coaching-application` with the same robust database insertion and validation logic as `POST /api/leads`.
   - Update validation to accept all 5-stage fields (`goals`, `goal_detail`, `current_training`, `training_days`, `training_environment`, `training_history`, `barrier`, `previous_attempts`, `coaching_value`, `why_now`, `name`, `email`, `phone`, `timezone`, `privacy_ack`).
   - Store full 5-stage metadata durably in `attribution_json`.
2. **Client Application Form (`src/pages/ApplyPage.tsx`)**:
   - Refactor into the 5-stage progressive layout.
   - Maintain the compact, above-the-fold layout with the `01 / 05` progress indicator and in-flow navigation.
   - Keep inputs keyboard-accessible with visible labels and clear validation states.
3. **Build & Automated Verification**:
   - Run unit/integration tests with `pnpm run build` and a local Node server script.
   - Verify server POST persistence and valid response codes.
4. **Git Checkpoint & Production Deployment**:
   - Push commit to `origin/main` to trigger platform auto-publish for `https://baseln-swpjc9hq.manus.space`.
   - Verify live endpoints: `/online/register`, `/_app/ready`, and test submission.
