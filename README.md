# BASELN coaching website

React/TypeScript/Tailwind frontend with Vite, Express and MySQL. The existing Manus repository is retained; changes are developed on the draft takeover branch.

## Run and check

Install the pinned pnpm version in `package.json`, then run `pnpm install --frozen-lockfile`.

- `pnpm dev`: frontend on port 3000, API proxy to port 3001.
- `pnpm dev:api`: API on port 3001.
- `pnpm build`: TypeScript checks and production build.
- `pnpm start`: production server; build first.
- `pnpm test:application`: existing application source regression checks, not a database/browser end-to-end test.
- `pnpm test:social`: local HTTP redirects and metadata tests.
- `pnpm test:workflow`: stage-transition, session, role/origin guard and email-policy tests. Database worker policy tests use a test double, not a live MySQL service.

## Application and onboarding process

1. The existing five-stage application posts to `/api/public/coaching-application`. `/apply` continues to redirect to `/online/register`, preserving campaign parameters.
2. A transaction stores the lead, workflow record, next-business-day review deadline and two durable email jobs (applicant acknowledgement and internal notification). Receipt success requires a committed lead ID. A submission key prevents duplicate records when a client retries an ambiguous network failure.
3. `/application-received` explains personal review, consultation, enrolment and the later assessment. It does not book a consultation or claim the applicant has been accepted.
4. The authenticated `/coach` pipeline supports New, Qualified, Consultation Booked, Consultation Completed, Offer Sent, Enrolled, Follow Up Later and Not Proceeding. The coach must explicitly review and invite an applicant.
5. An invitation uses the supplied real consultation URL. An application-related follow-up becomes due three days after the invitation is accepted by the email provider. It only sends while the application is Qualified and contact has not been stopped. **Booking/decline/stop requests must be recorded in the coach pipeline**; a provider-specific booking webhook is not connected.
6. Enrolment is gated by a completed consultation, offer, verified payment reference and accepted-terms reference. These references are manually verified by the coach. This is not automatic payment verification or a checkout implementation.
7. The welcome email contains a single-use, seven-day private assessment access link. The token is passed in the fragment and removed from the address bar before exchange; only its hash is stored. Successful exchange creates a secure HttpOnly session lasting two hours. A coach can send a fresh link for a later session.
8. The assessment prefills original goals/history/equipment/availability, supports save and resume during the session, and records explicit health-information consent on submission. It includes training, injuries, nutrition, sleep, stress, schedule and starting markers. The coach reviews it and confirms programme delivery before marking coaching started.

Assessment access is separate from the training-delivery product. The Training Room remains an illustrative preview; ongoing workout delivery, messaging and media uploads are not implemented here.

## Runtime configuration

Keep credentials in the host's secret settings. Do not commit `.env` files or secrets.

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Existing MySQL service, with trusted TLS. On startup the server creates additive workflow, email-job, audit and submission-reference tables; existing leads are imported without retrospective emails. |
| `COACH_ACCESS_KEY` | At least 32 random characters. Required for coach sign-in, signing private sessions and private onboarding. Rotate to invalidate sessions. Share only with authorised operators. |
| `RESEND_API_KEY` | Transactional email adapter. No account is created or charge incurred by this code. Supply only after choosing/configuring this provider. |
| `TRANSACTIONAL_FROM` | Verified business sender, e.g. `BASELN <aian@baseln.co>`. |
| `COACH_REPLY_TO` | Monitored reply mailbox; defaults to `aian@baseln.co`. |
| `COACH_NOTIFICATION_EMAIL` | Internal recipient; defaults to `aian@baseln.co`. Internal emails contain a record reference and secure portal link, not medical/free-text answers. |
| `CONSULTATION_BOOKING_URL` | Real HTTPS booking URL; can also be supplied when approving an invitation. |
| `PUBLIC_ORIGIN` | Exact HTTPS site origin for session origin checks and email links; defaults to `https://baseln.co`. Existing canonical metadata is also fixed to baseln.co. |
| `TRUST_PROXY_HOPS` | Set to the verified number of trusted reverse-proxy hops (1–3) only if required by the host; defaults to no proxy trust. Used for per-client API/login rate limiting. |
| `PORT` | HTTP port; defaults to 3000. |
| `VITE_API_TARGET` | Optional development API target; defaults to `http://127.0.0.1:3001`. |

Email jobs remain pending when the sender or API key is missing. The worker retries failures up to six times with bounded backoff and uses stable provider idempotency keys. A `sent` state means accepted by the provider, not confirmed inbox delivery. Inspect failures in the private pipeline and verify real delivery before launch. The old Manus notification function has been replaced by the queue.

Use HTTPS for authenticated pages; session cookies are always Secure. No secret or application record is written to local browser storage; only the public receipt reference is cached. Application answers remain in React state on a failed submission.

## Design review

`/application-concepts` presents three distinct desktop/mobile concepts using an existing coaching photograph:

- Minimal Athletic Editorial
- Modern Heritage Training Club
- Contemporary Premium Coaching

The latest shared-chat brief asks for a selected direction before rebuilding the final application presentation. These previews submit nothing. The current application styling is retained while the underlying process is implemented.

## Not deployed / launch dependencies

This source has not been deployed to Manus or baseln.co. Production database credentials, a verified transactional sender, the actual booking URL, payment-provider choice and deployment access are not in the repository. Do not copy existing client data or secrets into GitHub.

Before live deployment: back up the existing database, run migrations and transaction/duplicate/concurrency checks against a staging MySQL instance, complete desktop/mobile and keyboard QA, verify role isolation and single-use assessment access, verify applicant/internal/welcome emails in real inboxes, test stop/booking events and retries, agree retention/deletion handling, then verify the exact build on the chosen host. Historical reports in this repository are not proof of deployment of this revision.
