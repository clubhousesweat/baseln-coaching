# BASELN 5-Stage In-Site Application Redesign

- [x] **Server API Support**: Update `server/server.mjs` to add `POST /api/public/coaching-application` alias alongside `/api/leads`. Accept all 5-stage fields (`goals`, `goal_detail`, `current_training`, `training_days`, `training_environment`, `training_history`, `barrier`, `previous_attempts`, `coaching_value`, `why_now`, `name`, `email`, `phone`, `timezone`, `age`, `privacy_ack`), validate required fields, persist them durably to `coaching_leads`, and return `201 { ok: true, leadId }`.
- [x] **Frontend 5-Stage Form Implementation**: Update `src/pages/ApplyPage.tsx` with the clean 5-stage progressive layout matching the actual site's black/graphite/white/silver-grey palette:
  - Stage 01 Goal: `goals`, `goal_detail`
  - Stage 02 Training: `current_training`, `training_days`, `training_environment`, `training_history`
  - Stage 03 Friction: `barrier`, `previous_attempts`
  - Stage 04 Coaching Fit: `coaching_value`, `why_now`
  - Stage 05 Contact & Consent: `name`, `email`, `phone`, `timezone`, `age`, `privacy_ack`
  - First question visible without long scroll, small `01 / 05` progress indicator, in-flow navigation, no floating elements.
  - Server-confirmed receipt: "Received. Aian will personally review your application and respond within one business day."
- [x] **Automated Testing & Build**: Verify TypeScript compilation, Vite production build, and run an automated script testing both `/api/public/coaching-application` and `/api/leads` endpoints with full payload.
- [ ] **Deployment & Live Edge Verification**: Push commit to `origin/main` to trigger auto-publish on `https://baseln-swpjc9hq.manus.space`. Verify HTTP 200 on `/online/register`, query-preserving 301 on `/apply`, and successful test lead submission.
