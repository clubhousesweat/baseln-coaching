# BASELN — Private Coaching 5-Stage Application & Coordinated Brand Styling Plan

## 1. Product Requirements & Source Directives

The user provided the definitive specification for the BASELN Private Coaching Application in `Pasted_content_68.txt`:
1. **Core Purpose:** A premium, mobile-first coaching application (not a lengthy fitness questionnaire), taking ~2–3 minutes to turn interested visitors into qualified coaching enquiries. Detailed training, nutrition, injury and lifestyle assessments take place during onboarding, not before.
2. **Unified Destination:** The exact same application serves both the website (`/online/register`) and Instagram bio/Story/Reel conversion (`/apply` 301 query-preserving redirect to `/online/register`).
3. **Five-Stage Structure:**
   - **Stage 01 / 05 — Your Goals (`APPLICATION / 01—05`):**
     - Header: "YOUR GOALS. OUR STARTING POINT."
     - Subhead: "A few quick questions to understand what you’re working towards and how we can help."
     - Question: "What would you like to achieve?"
     - Guidance: "Select everything that applies. You don’t need to have just one goal."
     - Multi-select options:
       - Lose body fat
       - Build muscle
       - Get stronger
       - Improve conditioning (and "Improve fitness and conditioning")
       - Prepare for an event (and "Train for an event")
       - Improve general health and fitness
   - **Stage 02 / 05 — Training Background & Experience:**
     - Training context, current frequency, and realistic weekly schedule (e.g. 1–2 days, 3 days, 4 days, 5+ days).
   - **Stage 03 / 05 — The Primary Challenge:**
     - The main obstacle or what needs the coach's attention (e.g. routine consistency, technique, nutrition structure, accountability).
   - **Stage 04 / 05 — Timelines & Logistics:**
     - Preferred start timeline, time zone / country, and preferred contact method (email, phone/WhatsApp).
   - **Stage 05 / 05 — Contact & Confirmation:**
     - Full name, email address, optional phone/WhatsApp number, explicit privacy/health consent acknowledgement (`marketingOptIn: false`), and referral source fallback if ambiguous.
4. **Post-Submission Experience:**
   - Client is redirected to the polished confirmation page (`/online/thank-you` or in-page receipt) with clear expectation: personal review by Aian within one business day, next step explanation, and subsequent consultation invitation.
5. **Form Styling & Brand Coordination:**
   - User directive: "change the colour on the forms to coordinate with our website colours please".
   - Coordinated brand colors:
     - Background: Deep Charcoal (`#07080A` charcoal-950 and `#0B0C0E` charcoal-900 / `#111317` charcoal-850)
     - Accents: Smoke-Blue (`#7C93A6` smoke-500, `#8AA3B6` smoke-400, `#A4B8C8` smoke-300)
     - Typography: Clean Warm Off-White (`#F4F4F2` paper-200, `#E4E5E2` paper-300, `#C8CCC9` paper-400)
     - Selection state: Pill/card tiles with subtle border transitions (`border-smoke-500/40`, active smoke-500 background `bg-smoke-500/15`, smoke-blue checkmark, warm-white text)
     - No harsh generic blue, purple or rainbow gradients.
6. **Social Media Coordination:**
   - Active flagship Instagram profile is `@baseln.fit` (formerly `@baseln_retreats`).
   - Profile link points to clean `https://baseln.co` or tracked `/online/register`.
   - All social UTM attribution, first-touch, and last-touch non-direct assists must be preserved through the 5 stages and submitted to `POST /api/leads`.

---

## 2. Architecture & Data Flow

- **Frontend Client (`src/pages/ApplyPage.tsx`):**
  - Stateful 5-stage progressive flow with clear back/continue controls, stage progress indicator (`APPLICATION / 01—05`), keyboard navigation, accessible labels (`<label htmlFor>`), and live error handling.
  - Interactive multi-select goal pill buttons coordinating with smoke-blue and charcoal.
  - Submits the consolidated payload to `/api/leads`.
  - On 201 receipt, stores reference in `sessionStorage` and renders receipt or transitions to `/online/thank-you`.
- **Backend API (`server/server.mjs`):**
  - Accepts both consolidated multi-goal arrays and legacy fields.
  - Saves all 5-stage fields, attribution JSON, UTM parameters, and consent flags into MySQL `coaching_leads`.
  - Dispatches owner notification to Outlook (`aian@baseln.co`).
- **Social Bio & Tracking:**
  - Tracked route `https://baseln.co/apply?cta=instagram-profile&utm_source=instagram&utm_medium=organic_social&utm_campaign=baseln_instagram_takeover_2026q4&utm_content=takeover_profile_link` 301 redirects to `/online/register` with complete query preservation.

---

## 3. Verification & Acceptance Spec

- Build check (`tsc && vite build`) passes cleanly.
- Unit/integration test verifies 5-stage form validation, stage transitions, multi-goal selection, and payload assembly.
- Local server test confirms `POST /api/leads` stores new multi-goal payload with 201 and durable lead ID.
- Live check on `https://baseln.co` after deployment confirms new 5-stage application is active, styling coordinates with smoke-blue/charcoal, and all routes remain functional.
