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


## 6. Information Architecture Refinement — 30 September 2026
This pass makes each public page responsible for a distinct buyer question while preserving the approved dark editorial direction, responsive behaviour, static serving contract and authentic supplied imagery.

### Homepage
The first screen remains unchanged. The existing service grid and separate goals section are replaced by one full-width service section titled **“Train for what matters to you.”** It introduces the goal range once, presents the six objectives as a compact band and states that they are starting points rather than separate programmes. A fine divider then separates the eight definitive private-coaching inclusions: Training built for you; Aian, directly; Technique coaching; Food guidance for real life; Accountability with follow-through; Training that can adapt; Progress reviews; and Your private Training Room. BASELN / 6 follows as a short starting-period and week-six review teaser with no repeated inclusion list. The Aian section uses a concise, verifiable The Clubhouse and coaching background statement. The final section offers one direct application action only.

### Coaching page
The page removes duplicate goal cards and inclusions. Its role becomes a serious buyer’s explanation of delivery: the private offer; what happens before the first session; the six-week working rhythm; an explicitly illustrative Training Room glimpse linked to the public preview; the week-six review and continuation choice; commercial clarity; FAQs; and application. A short goal-range sentence near the hero keeps orientation without repeating the homepage grid.

### Supporting pages
How It Works retains two clearly hypothetical decision examples and a short technique-feedback explanation, but removes service-list and six-week selling repetition. About replaces self-certifying or broad, unsubstantiated claims with plain, supportable background details. Field Notes adopts a reader-first introduction and moves its scale-stall topic away from How It Works to a practical food-consistency topic.

### Verification
The TypeScript/Vite build, registered diagnostics, targeted desktop/mobile screenshot review (explicitly requested through feedback about formatting) and one independent read-only validator establish the refinement outcome before checkpoint and publication.


## 7. Proof and Conversion Refinement — 30 September 2026
This refinement keeps the existing structure but gives the homepage service section more visual hierarchy and shifts the Coaching page to the practical question a serious buyer asks after applying.

### Homepage
The goal range changes from button-like pills to an editorial typographic grid with no implied filter behaviour. The supporting line becomes: **“Your goals can overlap. Aian decides what needs attention first and builds from there.”** The first three buying reasons—Training built for you, Aian directly, and Accountability with follow-through—receive a visually prominent three-card treatment. The remaining five inclusions become quieter supporting rows. A clearly labelled illustrative feedback pattern may remain until a supplied, permissioned Aian coaching cue, missed-week response or anonymised Training Room block can replace it; no fictional proof will be presented as genuine.

### Coaching
The hero leads with **“Your first six weeks, properly coached.”** Its opening explains the practical sequence: application, fit conversation, assessment, first training block, communication and review. The communication section moves the existing personal 24–48-business-hour response expectation beside questions and footage. The exact structured review cadence is not invented; it will be stated once the owner supplies the genuine operating standard. Likewise, the bottom-of-page price presentation will move from opaque wording to the supplied fixed price, starting price/range, or a transparent scope-based explanation.

### Verification and constraints
The refinement uses only authenticated project material and existing response-expectation copy. It needs owner-supplied facts before the final public release: review cadence, communication channel/process, price presentation and any permissioned proof artifact. No price, cadence or client outcome may be guessed.


## 8. Confirmed Coaching Operating Model — 30 September 2026
The owner has supplied the factual standard for the public Coaching page. During BASELN / 6, every client receives a **structured weekly review** alongside communication throughout the week. Aian reviews training records, questions and relevant footage as the work happens; coaching is not confined to the weekly review. The opening block closes with a fuller six-week assessment and recommendation.

The private BASELN Training Room is the home for the programme, session records, progress and coaching feedback. Clients communicate directly with Aian there and use **WhatsApp** for timely questions and updates. Scheduled **Zoom** conversations are used for dedicated one-to-one discussion and deeper reviews. Technique footage can be submitted via the Training Room or WhatsApp according to portal capability at launch.

No price is being inferred. The approved public wording is: **“The six-week investment and ongoing coaching terms are explained before you decide to begin. Sending an enquiry does not commit you or take payment.”** No real client proof asset is approved; feedback examples remain explicitly illustrative and must not be framed as a conversation, result or testimonial.


## 9. Mobile Hero Visibility Correction — 30 September 2026
The hero MP4 is confirmed healthy: H.264/AVC, yuv420p, 1280×720, a 24 fps rate, `moov` atom at the start of the file (fast start), served as `video/mp4` over HTTPS. It therefore has no delivery or iPhone codec defect. The weak mobile appearance was created by the visual stack: video opacity at 65%, a 95% charcoal side gradient, and a 75% top gradient compounded over the same footage.

The correction preserves the desktop treatment and applies a distinct mobile treatment: full-opacity video positioned for the athlete within a narrow portrait crop; a lighter vertical overlay for content legibility; and a dark lower fade only where it protects CTA reading. The original static poster remains the fallback for autoplay-constrained conditions. The video already carries `autoplay`, `muted`, `loop`, and `playsinline`; `preload="auto"` is added as a low-cost extra reliability hint for the 1.8 MB asset.


## 10. Goal Image Carousel — 2 October 2026
The static six-goal typography grid on the homepage will be replaced by a visual, non-salesy goal carousel informed by the supplied One Coach references but designed for BASELN’s dark editorial identity. It preserves the six existing labels exactly: Lose body fat; Build muscle; Get stronger; Improve fitness; Prepare for an event; Return to training.

Six original 2:3 photographic assets will be generated as an aligned campaign set: real-feeling training environments, athletic adult subjects, charcoal/graphite colour treatment, restrained slate-blue accents and cinematic but credible lighting. Each image contains no generated text, logo or watermark. The website supplies the exact goal text as a high-contrast overlay, plus a small supporting editorial line.

The component is a responsive horizontal scroll-snap carousel: approximately three vertical cards visible at desktop, one focused card on mobile, touch/trackpad scrolling, compact previous/next controls and accessible numbered slide controls. It has no dead “filter” interaction and does not imply that the six goals are isolated packages. The existing overlap statement remains below the carousel. The primary-coaching-inclusions hierarchy below the goal block remains unchanged.


## 11. Coaching Page Offer-First Redesign — 2 October 2026
The Coaching page moves from an onboarding-process explanation to a premium explanation of what working with Aian delivers. It retains only factual operating details already confirmed: weekly structured reviews, Training Room programme and records, WhatsApp for timely questions and updates, Zoom for scheduled one-to-one discussion, and the existing no-commitment investment wording.

### New page sequence
1. **Complete offer hero:** a roughly equal desktop split between copy and the supplied genuine coaching photograph. Headline: **“Private coaching. The full experience.”** followed by the approved offer sentence, four concise inclusions and one consistent CTA: **“Apply to work with Aian.”** Mobile places the copy and CTA before a restrained landscape image crop.
2. **Four substantial benefits:** visible, asymmetric panels—not accordions—with the supplied detail under Training Design, Direct Access, Accountability and Nutrition. Smoke-blue is reserved for Direct Access to commercially emphasise Aian’s personal involvement. No invented training prescription, demonstration or client evidence is shown.
3. **Guidance in practice:** replaces the long duplicate communication section and removes the text-only Training Room sample. It uses the approved heading **“Train with guidance. Keep learning as you go.”**, direct explanation, three compact rows for Training Room/WhatsApp/Zoom and the supplied weekly-review sentence.
4. **How you start:** compact explanation of coaching conversation, assessment, six-week opening block, review and continuation, followed by only Speak with Aian → Get your programme → Begin coaching.
5. **Reassurance and invitation:** FAQs are renamed **“A few things you might want to know”**, limited to the supplied practical questions; response timeframe moves to the application close. The final CTA is consistently **“Apply to work with Aian.”**

### Layout and responsive rules
The existing dark BASELN direction remains, with fewer hard borders and labels, larger readable body copy (16–18px on mobile), 24–28px panel headings, approximately 20–24px mobile side gutters and content-led card height. The page follows a varied rhythm of photograph/headline → benefits → working-with-Aian explanation → compact start → FAQs and application.


## 12. Homepage Inclusion Section Redesign — 2 October 2026
The standalone **“Work directly with Aian”** profile section is removed from the homepage. Its supplied coaching photograph is repurposed as credible, monochrome visual proof within the new private-coaching inclusion section—not as a second biography or a competing conversion point.

The goal carousel remains in place. The numbered cards, giant figures, individual boxes and explanatory inclusion paragraphs are replaced with a lighter-charcoal, photograph-led inclusion area titled **“Private coaching. The full experience.”** A small smoke-blue label reads **“What’s included”** beneath the heading.

Desktop uses an approximately 35% left column for the heading and tightly cropped monochrome coaching image, and a 65% right column for the scannable list. The inclusion list is organised in two generous columns, with three light group labels: Training; Food & Lifestyle; Coaching & Support. Individual items use small smoke-blue ticks and warm-white sans-serif text. Coaching & Support spans the second row of the right-side layout while retaining two columns for fast scanning.

Mobile presents the heading first, then all three text groups in a single column, followed by a shallow landscape crop of the photograph. It keeps 16–18px checklist text, 12px list spacing, 28–32px inter-group spacing, 20–24px side gutters and no fixed-height empty panels. A fine rule beneath the heading, generous outer space and one **“Explore private coaching”** link finish the section.


## 13. Concise Coaching Page Simplification — 2 October 2026
The Coaching page is simplified to four parts to prevent repetition of the same benefits in panels, communication explanations and process components. The supplied BASELN team photograph replaces the prior boxing image in the hero.

1. **Short opening:** retained heading **“Private coaching. The full experience.”**, one exact sentence—**“Individually designed training, practical nutrition guidance and direct support from Aian McLennan.”**—and **“Apply to work with Aian”**. No extra benefit line.
2. **One What’s Included checklist:** flat, open checklist using the existing approved inclusion wording from the homepage. It contains no categories, numbered cards, coloured boxes, descriptions or additional photo. It is two columns on desktop and one on mobile, with small smoke-blue ticks, one clean text style and the exact delivery line: **“Stay in contact through your private Training Room, WhatsApp and scheduled Zoom conversations.”**
3. **Compact BASELN / 6 explanation:** one fine rule and short passage under **“How you start”** only; removes giant /6, process boxes and repeated paragraphs. Exact approved copy: **“Begin with a conversation and assessment, then start your individual training programme. Your first coaching block runs for six weeks, with regular feedback and reviews. At the end, you and Aian review your progress and discuss the next block.”**
4. **Questions and application:** heading **“Questions?”**, no introductory paragraph, retained accordion and one immediate **“Apply to work with Aian”** button. The former long closing section is removed.

The page uses one consistent content width, serif headings, clean sans-serif checklists and explanations, 40–48px mobile section padding and 64–80px desktop section padding. Visual rhythm comes from the supplied image and typography, not more card components.


## 14. Editorial Coaching Map — 2 October 2026
The homepage inclusion section is no longer treated as a safe left-image/right-list grid. It becomes a custom **Editorial Coaching Map**: an asymmetric, magazine-style composition showing how the three parts of private coaching work together across a client’s week.

### Design direction
- **Layout paradigm:** a wide desktop canvas, not repeated horizontal bands. The heading enters as a masthead; Training, Food & Lifestyle, and Coaching & Support become three deliberately offset information zones connected by a subtle smoke-blue route line. Authentic BASELN training photographs crop into the map as physical evidence, rather than sitting below text as decoration.
- **Signature elements:** sequential editorial markers (`01 / 02 / 03`), a thin continuous route line with smoke-blue waypoints, and tall/landscape monochrome photo cut-outs with restrained overlap.
- **Typography and hierarchy:** the serif is reserved for the masthead and compact supporting phrase. The group titles, item lists and CTA use the clean sans-serif/micro-mono system. Individual inclusions remain unchanged and are fast to scan with smoke-blue ticks.
- **Interactivity:** each desktop zone gains a quiet background lift and image brightness increase on hover; the section stays fully useful without hover or motion. `prefers-reduced-motion` remains respected by the current global motion approach.
- **Responsive behaviour:** desktop is intentionally non-linear across a fixed visual canvas; at mobile/tablet widths it resolves into a clear vertical editorial sequence—masthead, Training, Food & Lifestyle, Coaching & Support—interrupted by two shallow authentic photo bands. This avoids overlap, preserves content order and stays purposeful rather than attempting to miniaturise the desktop composition.

The same approved inclusion text and one **“Explore private coaching”** action remain. The former left-column boxing image / right-side three-group grid is removed. The supplied authentic bent-over-row, front-squat and gym-floor images are added to project media and used only in this section.


## 15. BASELN Design Constitution and How It Works Rebuild — 2 October 2026
The supplied **BASELN Online Training — Complete Website Direction** is now the definitive creative and commercial standard for all future public-page changes. BASELN will be designed as a dark, tactile private-performance-coaching campaign—not a generic premium fitness site, an exercise library or an app demonstration. Each section must work as a distinct scene, editorial spread or campaign frame with one clear conversion decision; photography is evidence, never filler.

### Permanent design rules
The palette remains near-black/charcoal with bone/off-white type and smoke blue used only as an editorial signal. Playfair carries major statements, Newsreader italic is rare and expressive rather than a repeated heading formula, Inter carries practical copy and IBM Plex Mono carries short technical labels and section indices. Fine rules, field marks, coordinates and a bespoke directional line are punctuation, not decoration. Pages will vary density and composition, use deliberate asymmetry within a shared content rail, avoid generic card grids, avoid repeated image-left/text-right layouts, assign each primary photograph to one public-page role, and recompose—not merely compress—on mobile.

### How It Works: new job and structure
`/how-it-works` is rebuilt around the client question **“I like this. What happens if I sign up?”** It removes all hypothetical examples, methodology disclaimers, illustrative technique critique and defensive research-paper language. It becomes an eight-scene journey: (1) BASELN / 6 hero, (2) baseline before Week 01, (3) prescription, (4) six-week timeline, (5) coaching throughout the block, (6) practical nutrition, (7) review and the phase after six weeks, and (8) concrete value plus application.

The page begins with **“START WITH SIX WEEKS. SEE WHAT WE CAN CHANGE.”**, introduces BASELN / 6 precisely, and carries the approved statement **“SIX WEEKS IS THE TIMEFRAME. NOT THE TEMPLATE.”** Its centrepiece is a six-part editorial journey rail: Establish, Refine, Progress, Develop, Advance and Review. Desktop uses an alternating route through the page instead of six SaaS cards; mobile resolves into a readable, in-flow numbered rail.

The existing genuine dedication photograph becomes the sole large documentary break for this page—captioned **“COACHING / NOT CONTENT”**—and is removed from About so that primary public imagery is not reused. About receives the unused authentic boxing-coaching photograph as its smaller evidence image. Each major section uses only factual coaching capabilities already confirmed: individual assessment, training/nutrition prescription, weekly reviews, direct Training Room and WhatsApp communication, scheduled Zoom conversations, relevant technique footage, six-week review and optional continuation.

### Verification
Validate the complete route in desktop and 375px mobile compositions. Confirm the timeline’s reading order, text contrast, layout responsiveness, CTA navigation, no horizontal overflow, no remaining hypothetical/fictional claims and no duplicate primary image assignment across About and How It Works. Preserve static Vite/React serving and current routes.

## 16. Homepage and Footer Compaction — 3 October 2026
The homepage now keeps the cinematic hero, the goal carousel and authentic coaching imagery while removing duplicated explanation. The hero uses the approved short proposition, retains only **Explore private coaching**, and relies on the persistent header **Apply** action rather than a second hero link. The goal carousel keeps its heading and imagery but loses the redundant introductory paragraph. The standalone **“Private coaching starts here”** BASELN / 6 explanation is removed entirely because six-week detail now belongs only on How It Works. The final invitation becomes **“READY TO GET STARTED?”** with its approved two-sentence invitation and one application CTA; surrounding vertical space and the secondary process label are removed.

The global footer is a compact shared utility strip on every page: wordmark left; shorter Coaching, About Aian and Field Notes utilities together with Member Login and email right; legal links in a lean bottom row. Repeated service copy, the repeated slogan, the large application button, redundant Training Room link and excess vertical padding are removed.
