# BASELN Release & Application Tasks

- [x] **Durable lead delivery via managed server and database.** The `/online/register` application form submits contact, training objective, availability, consent and first/last-touch attribution fields to `POST /api/leads`. Browser acknowledgement requires a confirmed HTTP 201 receipt with server-generated lead ID.
- [x] **Owner-visible application queue.** Submitted applications are stored in the managed database (`coaching_leads` table) with full UTM first-touch and assist records, landing route, referrer, CTA and timestamp. Compact owner notification is sent to Outlook (`aian@baseln.co`).
- [x] **Approved canonical intake and legacy routing.** `/online/register` is the canonical application route across all site navigation. `/apply` returns a query-preserving 301 redirect to `/online/register`. Legacy site paths redirect cleanly.
- [x] **Container deployment contract and health readiness.** Production Dockerfile runs `node server/server.mjs`. Live probe responds at `/_app/live` and database readiness at `/_app/ready` and `/_app/health`.
- [x] **FastSpring and public payment hold.** Zero public checkout, Buy now, FastSpring, or price references exist on public routes.
- [x] **Published production verification and branded domain cutover.** Branded domain `https://baseln.co` is live and serving the production container.
- [ ] **Five-Stage Mobile-First Application.** Implement the exact 5-stage application specified in `Pasted_content_68.txt`:
  - Stage 1: Goals ("Lose body fat", "Build muscle", "Get stronger", "Improve conditioning", "Prepare for an event", "Improve general health and fitness") with multi-select capability.
  - Stage 2: Training background and weekly frequency ("1–2 days", "3 days", "4 days", "5+ days", "Variable").
  - Stage 3: Biggest obstacle / challenge so far.
  - Stage 4: Timeline and logistics (start date, country/time zone).
  - Stage 5: Contact details (name, email, phone/WhatsApp, privacy/health consent, referral fallback).
  - Form color coordination: strict use of BASELN smoke-blue (`#7C93A6`, `#8AA3B6`), charcoal (`#07080A`, `#0B0C0E`), and paper off-white (`#F4F4F2`).
- [ ] **Lead API & Attribution Integration.** Validate and persist the 5-stage application fields in `server/server.mjs`, preserving attribution and sending owner notification.
- [ ] **Verification, Build & Production Publication.** Test TypeScript build, verify end-to-end flow, push checkpoint, publish to `https://baseln.co`, and verify live edge.
