# BASELN Social Conversion Specification (October 2026)

## 1. Primary Route & Attribution Rules
- Primary Social Destination: `https://baseln-swpjc9hq.manus.space/apply`
- Primary CTA: **Apply for coaching**
- URL Attribution Parameters:
  - `utm_source`
  - `utm_medium`
  - `utm_campaign`
  - `utm_content`
  - `utm_term`
- Persistence Rules:
  - First-touch UTMs, first landing page, first touch timestamp, and first external referrer are strictly preserved across session and local storage.
  - Last non-direct touch parameters (`last_non_direct_source`, `last_non_direct_medium`, `last_non_direct_campaign`, `last_non_direct_content`, `last_non_direct_at`) are captured as assist signals if the visitor returns or navigates through subsequent non-direct campaign touches.
  - Fallback: Non-marketing self-reported "How did you hear about BASELN?" field is rendered only when `utm_source` is absent or ambiguous (direct or generic referral).

## 2. Event Specification
1. `apply_page_view`: Fired immediately when `/apply` loads, including landing page URL and initial UTM tags.
2. `application_start`: Fired on the first input/focus interaction within the coaching application form.
3. `application_complete`: Fired upon successful validation and submission, transmitting the complete payload (contact, goals, availability, consent, first-touch attribution, assist attribution, and submission timestamp).
4. Secondary tracking: `consultation_booking`, `email_click`, `call_click`, `checkout_handoff`.

## 3. Compliance & Governance
- Privacy & Training Consent: Explicit checkbox requiring agreement to the Privacy Notice and Health & Training Disclaimer.
- Marketing Opt-in: Explicitly false (`marketingOptIn: false`). No implied marketing subscription or newsletter opt-in.
- Commercial Route: No public A$249 pricing, Buy Now or direct checkout routes. FastSpring remains on hold.
