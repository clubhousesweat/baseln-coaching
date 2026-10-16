# Implementation Plan — BASELN Editorial Application Redesign

**Authoritative project:** `wdp_6fb3ad35e165bbfb677ea4f2` in `/home/ubuntu/baseln`
**Authoritative origin:** `https://baseln-swpjc9hq.manus.space`
**Required public domain:** `https://baseln.co` after this exact project is deployed and bound.

## Scope

Replace the existing visual layer of `/online/register` with a quiet, in-site **five-stage editorial application**. This is a front-end redesign only. It must preserve the current five stages, question names, browser validation, API request shape, `POST /api/public/coaching-application` durable persistence, attribution capture, consent handling, server-confirmed receipt and query-preserving permanent `/apply` redirect.

No DNS, payment, public-price, CRM/database schema or application-routing changes are permitted as part of this release.

## Design direction

- **Design movement:** restrained editorial intake — contemporary private-coaching hospitality rather than a SaaS form or campaign landing page.
- **Brand essence:** a considered private-coaching application for people who value capable, sustainable training; **assured, practical, selective**.
- **Layout paradigm:** at desktop, a content-driven 1200–1280px two-column composition. The left brand panel frames the decision; the right panel contains the compact working form. At tablet/mobile, it becomes one column with a short brand introduction followed immediately by the form.
- **Colour philosophy:** use the existing BASELN dark system only: canvas `#07080a`; charcoal panel/surface `#0b0c0e` and `#111317`; primary paper `#f9f9f8`/`#f4f4f2`; secondary paper `#c8ccc9`; smoke-blue `#a4b8c8`, `#8aa3b6` and `#7c93a6` for selected/focus/progress; and `#C7D5D7` with charcoal text for the primary action. Rules remain low-opacity white. No cream, forest green, oxblood, stock, synthetic or composited imagery.
- **Typography system:** supplied BASELN serif wordmark only; one dominant serif display line in the left panel; compact serif stage titles and clean sans/mono interface labels on the right.
- **Signature elements:** thin five-part progress rule; full-card answer controls; quiet legal and return-home utility row.
- **Interaction:** every answer card is fully clickable with visible hover, focus, selected, disabled and accessible error states. Selection is communicated by the complete card treatment, not just an icon.
- **Animation:** only brief, reduced-motion-safe stage transitions; no hero, parallax or decorative motion.

## Required composition

### Shell

- Remove the regular promotional header, Apply CTA/floating CTA and standard promotional footer from `/online/register` only.
- Retain the supplied BASELN wordmark, a visible return-home action, browser navigation, legal links and accessible skip navigation.
- Do not create a standalone campaign site: the route remains part of the existing website and retains its current server/API contract.

### Desktop

- Use a broad `max-w-[1280px]` two-column editorial composition with content-driven height and no empty billboard area.
- Left panel copy exactly:
  - `BASELN / APPLICATION`
  - `GOOD TRAINING STARTS HERE.`
- `Tell us where you want to go. We’ll work out the best way to get you there.`
- `STRENGTH. CONDITIONING. BODY COMPOSITION.`
- Do not introduce an image unless it is a confirmed real, approved BASELN asset; use the BASELN charcoal colour field by default.
- Right panel presents the dynamic `01 / 05 — [STAGE]` label, `2–3 MIN`, segmented progress, stage prompt, answer group and a full-width primary action as one connected working group.

### Mobile/tablet

- One column, 20–24px side padding, short intro and immediate form access.
- No fixed height, overflow traps or excess vacant space.
- Maintain large touch targets and simple content-driven vertical rhythm (20–28px).

## Functional invariants

1. Five stages and all current question names/options remain unchanged.
2. Existing state transitions, validation, accessibility labels, consent, attribution, durable same-origin API request and server-confirmed receipt remain unchanged.
3. `/apply` continues to 301 to `/online/register` with the complete query string preserved.
4. Public application remains price-free and checkout-free.
5. The lead owner response commitment remains one business day.

## Project structure

- `src/pages/ApplyPage.tsx` — five-stage form state, existing submission contract and redesigned route-specific interface.
- `src/App.tsx` — route-aware application shell that removes regular promotional chrome only for `/online/register`.
- `server/server.mjs` — unchanged durable lead and redirect contract.
- `TODO.md` — implementation outcomes and completion evidence.
