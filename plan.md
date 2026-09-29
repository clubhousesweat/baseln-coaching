# BASELN Website Implementation Plan

## 1. Overview & Architecture
This project implements the complete, authoritative website for **BASELN Private Online Coaching** led by **Aian McLennan**, directly adhering to the **BASELN Website Blueprint (29 September 2026)** and capturing the clean, refined, editorial ease of **one.coach**.

The stack is a clean, modern, ultra-fast Vite + React + TypeScript + Tailwind CSS application served as high-performance static output with client-side routing, perfect responsive behaviour, semantic HTML5, accessible touch/keyboard controls, and rich interactions.

## 2. Page & Route Specifications
- **`/` — Home**:
  - Global navigation with wordmark, links, utility actions and accessible mobile menu drawer.
  - Video hero (`/media/OC_Header_Vid_homepage_720p_981b8c77ec_3de4323d.mp4`) with stable contrast zone. Mobile viewport presents Eyebrow, H1, offer sentence, and Primary CTA before the media crop.
  - Section 2: 6 concise benefit rows in a 2-column desktop / 1-column mobile grid.
  - Section 3: 3 paired goal objectives in editorial text pairing.
  - Section 4: BASELN / 6 teaser (six weeks properly coached, shared structure, individual prescription).
  - Section 5: Aian proof with real coaching photograph and verified background.
  - Section 6: Single clean close panel with "Apply for coaching" CTA.
- **`/coaching` — The Complete Offer**:
  - Chapter 1: Service Hero with direct application action.
  - Chapter 2: 6-category goal range with practical training demands.
  - Chapter 3: 8 exact inclusions (training written for you, direct access, active accountability, technique education, nutrition for real life, adaptive training, understandable progress, coaching at your level).
  - Chapter 4: 4-stage BASELN / 6 flow (Establish the brief, First sessions, During the block, End of week 6 review) alongside a realistic sample block card.
  - Chapter 5: Lived experience (dealing with disrupted weeks, nutrition without restriction, accountability terms).
  - Chapter 6: The next block and fit (review logic and continuation).
  - Chapter 7: Commercial terms summary, interactive accordion FAQ (8 detailed Q&As), and final CTA.
- **`/how-it-works` — Demonstrating Coaching Judgement**:
  - Hero establishing coaching after the plan is written.
  - Worked Example 1: Competing goals (fat loss, strength, 5km running).
  - Worked Example 2: Stalled progress (bodyweight vs strength trend analysis).
  - Technique Proof: Coaching video/visual breakdown showing movement cueing and rationale.
  - Close linking to Coaching.
- **`/about` — Credibility Without a CV Wall**:
  - First-person coaching philosophy.
  - Chronological verifiable experience (competitive sports, S&C coaching, The Clubhouse heritage, operational leadership).
  - Grounded athlete and everyday client positioning.
  - Direct coaching role statement.
- **`/field-notes` — Editorial Practical Articles**:
  - Three complete, highly practical articles:
    1. *You missed a week of training. What now?*
    2. *How much training can you actually use?*
    3. *When the scale stalls, what should you check first?*
  - Includes quick key takeaway callouts and natural transitions to coaching.
- **`/apply` — Short, Working First Contact**:
  - 11-field structured qualification form matching blueprint requirements.
  - Real-time client-side validation, error messages, and successful submission state.
  - Operational expectation ("Received. Aian will review your brief and contact you within 24-48 business hours").
- **`/training-room` — Member Environment Preview**:
  - Public member login interface with email/password and password reset flow.
  - Live interactive member workspace preview displaying Today's Session with exercise breakdown, Weekly Calendar, Check-in signals, Progress metrics, and Direct Coach messaging.
- **`/privacy` & `/terms`**:
  - Complete compliance documents covering personal training terms, health boundaries, data retention, and communication policies.

## 3. Visual System & Typography
- Fonts: `SuisseWorks` editorial serif for display headings, paired with high-clarity geometric sans-serif for body and controls.
- Responsive breakpoints tested: 320px, 375px, 390px, 430px, 768px, 1024px, 1440px.
- Reduced-motion accessibility, visible focus rings, ARIA dialog and accordion patterns.

## 4. Serving & Deployment Contracts
- Route manifest generated at `/public/manus-routes.json`.
- Static build output in `dist/`.
- Platform configuration: static build configured with `pnpm build` and output directory `dist`.


## 5. Launch Refinement Pass — 29 September 2026
The pre-launch review is accepted as the source of truth for this refinement. The static Vite/React architecture, route manifest and cache policy remain unchanged.

### Content and conversion
- **Homepage:** Use the approved shorter invitation in the first screen; remove the early BASELN / 6 explanation; bring the six coaching benefits immediately below; replace awkward language; remove unverifiable scarcity phrasing.
- **Coaching:** Reduce the page materially by retaining the offer, six plain-language goal categories, six core inclusions, a concise four-step BASELN / 6 explanation, commercial clarity and buyer FAQs. Move detailed decision logic to `How It Works`.
- **How It Works:** Keep all worked examples visibly hypothetical. Explain the decision a coach may make without invented outcomes, measurements, diagnoses or implied client case studies.
- **Commercial clarity:** Do not manufacture a price. State that the six-week investment and continuation options are confirmed after a short fit conversation, before the client decides, because coaching scope is matched to the client’s actual week.
- **Application:** Reduce the initial enquiry to contact details, main objective, biggest obstacle, realistic availability and preferred start. Start both menus with blank placeholder choices; defer equipment and detailed history to onboarding.
- **Evidence:** Continue using authentic supplied images, label all programme/workspace demonstrations as illustrative, and do not present generated sample client data or quotes as permissioned outcomes. Permissioned testimonials, actual client outcomes, or a real training-room screenshot can replace illustrative material only after supply and approval.

### Visual refinements
- Increase video presence and warmth in the homepage hero while maintaining a readable left-side contrast zone.
- Reduce oversized desktop headings and remove excessive technical or defensive sales language. Preserve the dark editorial BASELN direction but create more visual breathing room.

### Verification
- Rebuild TypeScript/Vite output, use targeted desktop and mobile screenshots because mobile layout sign-off is explicitly open, and run the required read-only independent validator before publishing.
