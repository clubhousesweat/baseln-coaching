# BASELN coaching website

React/TypeScript and Tailwind frontend built with Vite, served by an Express backend. The application endpoint stores enquiries in MySQL. Media is included in `public/media`.

## Local development

Use the pinned pnpm version in `package.json` and install dependencies with `pnpm install --frozen-lockfile`.

- `pnpm dev`: frontend on port 3000, with `/api` proxied to port 3001.
- `pnpm dev:api`: API on port 3001.
- `pnpm build`: TypeScript checks and production assets in `dist/`.
- `pnpm start`: production server; run the build first.
- `pnpm test:application`: application source regression checks. This is not a browser or database persistence test.
- `pnpm test:social`: local HTTP tests for Instagram redirects and page metadata.

The existing Dockerfile provides a production container build.

## Runtime configuration

Supply these through your host's environment settings, never through committed files:

| Variable | Purpose |
| --- | --- |
| `PORT` | HTTP listener; defaults to 3000. |
| `DATABASE_URL` | MySQL connection URL for the lead database. The server requires a trusted TLS certificate and creates `coaching_leads` if needed. |
| `MANUS_API_URL`, `MANUS_API_KEY` | Optional Manus owner-notification integration. If absent, no owner notification is sent. Database lead storage is separate. |
| `VITE_API_TARGET` | Optional development API target; defaults to `http://127.0.0.1:3001`. |

Without `DATABASE_URL`, the site can serve pages, but readiness and application submission return 503. The application must never report a successful receipt unless the server confirms persistence.

## Takeover status

- The member and coach portal screens do not implement authentication. They now state their availability honestly instead of simulating email delivery or security checks.
- `/training-room` is a public, illustrative preview. It does not store client training, check-ins, messages or health records.
- The application has a server-side MySQL implementation. Its current production database, backups and notification destination must be verified with the existing host before migration.
- The repository's previous deployment reports are historical claims, not evidence that this checkout has been deployed.
- The public origin is currently fixed to `https://baseln.co` in the server metadata and redirect logic. Check it before configuring a different deployment.

## Remaining launch work

1. Review the application layout at desktop and mobile widths, and test keyboard navigation and browser back/forward behaviour.
2. Confirm the intended client coaching platform. Either connect its real login or implement authenticated client/coach features before advertising those as available here.
3. Provision or retain the live database and verify its backups; submit a clearly marked QA application and confirm its stored record and owner notification.
4. Arrange notifications independently of Manus if migrating away from its runtime.
5. Deploy the reviewed source to the selected host and verify routes, receipts and domain configuration before switching live traffic.

Do not copy secrets or real client records into this repository.
