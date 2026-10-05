

## 25. Social-to-Application Attribution Pass — 6 October 2026

**Conversion destination:** `https://baseln-swpjc9hq.manus.space/apply` remains the single social conversion destination and **Apply for coaching** remains the dominant public CTA. No page is re-designed as part of this pass.

### Attribution and lead fields
The application captures `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` and `utm_term`, along with the first external referrer, first landing page and first-touch timestamp. The first-touch attribution is preserved through the visitor journey. A later tagged visit does not overwrite it; instead, the most recent non-direct campaign touch is retained in the assist fields: `last_non_direct_source`, `last_non_direct_medium`, `last_non_direct_campaign`, `last_non_direct_content` and `last_non_direct_at`. When attribution is absent or ambiguous (direct/generic referral only), the application renders a voluntary, non-marketing “How did you hear about BASELN?” field.

The lead payload holds contact and qualification data, explicit privacy/health acknowledgement, `marketingOptIn: false`, full first-touch attribution, last non-direct assist attribution and the submission timestamp. The static frontend has no configured backend CRM endpoint, database or automation credential; the payload is currently stored locally for resilience and emitted as analytics events. A first-party durable CRM hand-off requires the owner to choose and authorise a backend/database or specific CRM/webhook destination.

### Event conventions
The public application now emits `apply_page_view` on loading `/apply`, `application_start` at the first form interaction, and `application_complete` after successful form validation and acknowledgement. Supporting event hooks exist for `consultation_booking`, `email_click`, `call_click` and `checkout_handoff`; no paid-conversion event can be triggered while payment remains on hold.

### Compliance and commercial hold
The required application acknowledgement explicitly names the Privacy Notice and Health & Training Disclaimer and states that an enquiry does not subscribe the applicant to marketing communications. The dormant FastSpring test panel and public `?fastspring=test` checkout route are removed from the public bundle. No A$249 price, buy-now action, FastSpring CTA or public checkout path is exposed until the eligibility, AUD and fulfilment holds are formally cleared.
