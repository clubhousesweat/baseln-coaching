# BASELN Design Brief & Specification

## Brand Essence & Voice
- **Brand**: BASELN
- **Service**: Private Coaching with Aian McLennan
- **Offer Structure**: BASELN / 6 (6-week coached starting phase) -> Ongoing Private Coaching
- **Core Promise**: Aian sets the priorities, builds the training, coaches its execution, helps with food and habits, and stays involved as the person progresses.
- **Brand statement**: NOT MADE FOR EVERYONE. Made for you.
- **Voice**: Assured, editorial, direct, grounded, energetic, human. No generic fitness clichés ("journey", "transformation", "unlock your potential", "no excuses").

## Aesthetic & Art Direction (Inspired by one.coach ease and cleanliness)
- **Palette**:
  - Background primary: `#0B0C0E` (deep washed charcoal)
  - Surface cards/elevations: `#131518`, `#191C21`
  - Text primary: `#F4F4F2` (soft off-white)
  - Text muted / secondary: `#A2A8B2`
  - Accent / highlight: `#7C93A6` (restrained smoke-blue / steel blue)
  - Subtle borders: `rgba(255, 255, 255, 0.08)`
- **Typography**:
  - Display / H1 / H2: Editorial serif (`SuisseWorks` / `Playfair Display` fallback with tight line-heights 0.98–1.08)
  - Body & UI / Controls / Eyebrows: Clean, legible modern sans-serif (`Inter` / system-ui, 16–19px with generous 1.55–1.65 line-height)
  - Micro-labels: 12–13px uppercase tracking with strong contrast
- **Layout & Structure**:
  - Container max-width: 1180px, prose measure: 640–720px
  - Clean gutters: desktop 32–48px, mobile 16–20px
  - Distinct vertical cadence with breathing room (no cramped cards)
  - Desktop split compositions collapse gracefully to single column
  - Mobile viewport priority: eyebrow, H1, concise value sentence, and direct primary CTA appear immediately before any large image/crop.

## Core Media Assets
- Video: `/media/OC_Header_Vid_homepage_720p_981b8c77ec_3de4323d.mp4` (hero background / ambient loop with fallback poster)
- Poster: `/media/Header_Banner_Background_c72ecdc900_c5b08867.jpg`
- Authentic Coaching Imagery:
  - `/media/aian-boxing-coaching_a6d265ac_1df786b5.png` (hands-on coaching interaction)
  - `/media/aian-dedication-portrait_35c1751c_c8fb4672.png` (Aian coaching portrait)
- Wordmark: `/media/baseln-wordmark_ce64ccd9.png`
- Dedicated App Icon / Web Logo: created and uploaded to satisfy project metadata.

## Route Architecture
1. `/` — Home (hero with video, 6 benefits preview, 3 paired goal objectives, BASELN / 6 teaser, Aian proof, single close)
2. `/coaching` — Coaching (7 chapters: service hero, 6-category goal range, 8 exact inclusions, how BASELN / 6 works 4-stage flow, lived coaching experience & nutrition, next block & fit, terms & comprehensive FAQ with interactive expanders)
3. `/how-it-works` — How It Works (4 compact sections demonstrating coaching judgement: competing goals worked example, stalled progress worked example, technique proof with movement coaching cue, reasoned decisions close)
4. `/about` — About Aian (credibility without a CV wall: first-person manifesto, chronological career & Clubhouse heritage, grounded athlete/parent statement, what he does now)
5. `/field-notes` — Field Notes (3 full practical finished articles with rich editorial layout: 1. Missed a week of training, 2. How much training can you actually use?, 3. When the scale stalls, what to check first)
6. `/apply` — Apply (accessible 11-field qualifying enquiry, real validation, country/time zone, clear confirmation with operational expectations)
7. `/training-room` — Training Room (browser-based member environment preview with working interactive preview tabs: Daily session with exercise canvas, Check-in signals, Progress metrics, Coach communication)
8. `/privacy` & `/terms` — Trust, privacy notice and coaching agreement terms
