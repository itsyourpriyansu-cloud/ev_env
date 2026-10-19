# Envizon EV — Homepage UX & Content Plan

**Scope:** homepage only (`/`), built on the current template (layout, components and motion system).
**Sources:** `ENVIZON_EV_CLAUDE_MASTER_BLUEPRINT.md` §2, §4.2, §5.1, §6, §15, §16 and `Envizon_EV_Logo_Final.jpg`.
**Status of all copy below:** `PROPOSED`. Nothing ships publicly until the client approves it (blueprint §0 rules 3, 13, 14).

---

## 1. Principles

1. **Keep the design system, replace the story.** Every section reuses an existing component and its animations. Only two sections are new (Why Envizon, FAQ), and both are built from existing card and accordion styles.
2. **One job per section, one primary action per section.** The page funnels to two conversions:
   - **Get a Quote / Talk to an Expert** (the `#contact` dialog)
   - **Explore Chargers** (the `#chargers` section)
3. **No invented proof.** There are no client logos, stats, testimonials, prices, ROI figures, 360/480 kW products or station map until each is approved. The template's "results" numbers and logo marquee are re-purposed, not re-skinned.
4. **Clear levels.** Every section follows the same hierarchy: eyebrow (label) → headline → supporting line → content → CTA (see §5).

---

## 2. Brand application

### 2.1 Logo files to produce
The supplied logo is a 2475×688 JPG, so vector versions are needed. The client should supply the official SVG (blueprint §21.1 P0). Until then, rebuild clean SVGs from the JPG geometry.

| File | Contents | Used on |
|---|---|---|
| `logo-full.svg` | Black "envizon" + gradient "ev" pill + "SOLUTIONS" | Header (light pill), contact dialog |
| `logo-full-white.svg` | White wordmark + gradient pill | Footer, any dark or green surface |
| `logo-mark.svg` | "ev" pill only (gradient) | Hero mark, favicon, preloader end-state, footer copyright |
| `logo-mark-outline.svg` | "ev" pill as a single stroke path | Scroll-drawn mark in the charger section header (replaces the old drawn logo) |
| `favicon.png`, `og.jpg` | Pill mark at 32/180/512 px; 1200×630 share image | `<head>` |

### 2.2 Where the logo goes
- **Header:** the logo pill switches to a white background with the full-colour logo (about 24 px high, about 86 px wide), matching the white nav pill. The mobile header is the same.
- **Preloader:** the old line animation is replaced by an Envizon mark animation. The pill outline draws, then the gradient fills, then the "ev" letters stroke in. The curtain timing (3.2 s) is unchanged.
- **Hero:** the old mark beside the H1 becomes `logo-mark.svg`, with the same scale-in (backOut).
- **Charger range section header:** the scroll-drawn outline uses `logo-mark-outline.svg`.
- **Footer:** the large wordmark becomes `logo-full-white.svg`, and the copyright line gets the small `logo-mark.svg`.
- **Contact dialog:** the left panel's large mark becomes `logo-full.svg` plus an oversized outline pill.
- **Never:** recoloured, stretched, on busy video without a backing pill, or the "SOLUTIONS" line below about 16 px wordmark height (drop it to a mark-only version).

### 2.3 Colour mapping
These are sampled from the logo and override the template tokens in one new `css/brand.css` layer, so `cofactr.css` stays untouched.

| Template token | Now | Envizon value | Role |
|---|---|---|---|
| `--color-green-3` (primary CTA, progress bars) | `#38d059` | **`#00A650`** | Primary button, active dots, curtain fill |
| new `--color-lime` | — | **`#71BF45`** | Gradient end, sparse accent (blueprint: use sparingly) |
| `--color-blue` (preloader, footer brand panel) | `#0041db` | **`#063D25`** to `#00A650` gradient | Brand panels |
| `--color-orange` (infographic accent) | `#fe4b25` | **`#71BF45`** | Diagram highlight lines |
| `--color-green-5/6/7` (dark sections) | `#183028`… | keep (deep forest, matches the blueprint `brand-900`) | Dark sections, text |
| `--color-white-*` | keep | keep | Light sections |

Brand gradient: `linear-gradient(110deg, #00A650 0%, #16B14C 45%, #71BF45 100%)`. Use it only on the logo pill, the footer brand panel and the preloader fill.

### 2.4 Typography
Keep the current pairing: Inter for body, and the tuned thin heading face for headlines. Its geometric, light character pairs well with the rounded Envizon wordmark, and the metrics are already tuned.
- Optional swap: the blueprint suggests Manrope or DM Sans. Decide before content entry, because a swap changes line breaks.

---

## 3. Homepage structure at a glance

| # | Section (anchor) | Built from (existing component) | Blueprint §5.1 item | Launch status |
|---|---|---|---|---|
| 0 | Preloader | Preloader curtain | — | Ready after logo SVG |
| 1 | Header + mobile menu | Header pills + dropdown + accordion menu | Navigation §4.2 | Ready |
| 2 | Hero `#top` | Video hero, split H1/H2, 3 descriptors, CTA | 2 · Hero | Needs approved hero footage/photo |
| 3 | Where we charge `#applications` | Logo marquee, as text + icon chips | 3 · Proof strip *(replaced, no logos)* + 9 · Applications | Ready |
| 4 | Solutions `#solutions` | Dark hover-card stack (3 → **4** cards) | 4 · Solutions selector | Ready (copy approval) |
| 5 | Charger range `#chargers` | Sticky case-study stack | 5 · Charger range | **Blocked** on signed datasheets and images |
| 6 | How it works `#process` | Results carousel + animated diagrams | 6 · How a project works (+ 8 · Monitoring as the last step) | Ready (service scope approval) |
| 7 | Why Envizon `#why` | **New:** white card grid on dotted background (carousel card style) | 7 · Why Envizon | Needs client differentiators |
| 8 | Partner CTA `#partners` | Closing octagon CTA (2 buttons) | 12 · Partner/franchise CTA | Ready; brochure button hidden |
| 9 | FAQ `#faq` | **New:** two-column, accordion from the mobile-menu component | 13 · FAQ | Needs verified answers |
| 10 | Footer + lead CTA | Footer (menus, solutions rotator, brand panel, CTA) | 14 · Lead CTA/footer | Needs verified contact details |
| — | Get a Quote dialog `#contact` | Contact dialog | Lead funnel §9.4 | Needs a real lead endpoint before launch |

**Omitted until approved** (blueprint items 1, 8 demo, 10, 11):
- announcement bar
- stats/"results" numbers and client logos
- testimonials and case studies
- CMS dashboard demo
- network teaser / Find a Charger
- app downloads
- prices
- 360/480 kW cards

### User flow

```
Hero ──► Explore Chargers ──► #chargers (Request Quote ─► #contact, type = Charger quote, model pre-filled)
  └────► Talk to an Expert ─► #contact (type = General)
Applications ─► Solutions card ─► #contact (type = matching solution)
How it works ─► Book a Site Assessment ─► #contact (type = Site assessment)
Partner CTA ─► Become a Partner ─► #contact (type = Partnership)
FAQ ─► Still have questions? ─► #contact
Header "Get a Quote" / footer "Get Started" ─► #contact
```

Solution, partner and about pages don't exist yet (homepage only). Nav items therefore scroll to sections on this page. When those pages ship, the links switch to `/solutions/...` and similar routes.

---

## 4. Section-by-section content

Levels: **E** = eyebrow/label, **H** = heading, **S** = supporting line, **B** = body, **C** = CTA.

### 0. Preloader
- Deep-forest background with grain, plus the Envizon mark animation (§2.2). The curtain opens onto the hero with the green (#00A650) fill. Timings are unchanged; it shows once per session.

### 1. Header
| Slot | Content |
|---|---|
| Logo pill | `logo-full.svg` on a white pill, links to the top |
| Nav pill | **Chargers ▾** (DC Fast Chargers · 60 kW · 120 kW · 240 kW). These anchor into `#chargers`; hide the dropdown until the range is approved. |
| | **Solutions ▾** (Commercial Charging · Residential Communities · Fleet Charging · Charging Infrastructure). These link to the `#solutions` cards. |
| | **Partners** (`#partners`) · **About** (`#why`) · **FAQ** (`#faq`) |
| CTA | **Get a Quote** (green pill), opens `#contact` |
| Mobile | Same items in the accordion menu, with Get a Quote kept visible in the header bar |

No "Find a Charger", app links or login until those exist (§4.2).

### 2. Hero — "who we are, in one screen"
| Level | Content (PROPOSED) |
|---|---|
| Mark | `logo-mark.svg` |
| **H1** (left) | From Site to Charge. |
| **H2** (right) | EV Charging Solutions, End to End. |
| Divider | Horizontal line draw (kept) |
| **E** (left) | Charge Forward |
| **S** (centre) | DC fast chargers, site planning, installation and support for businesses, communities and fleets. |
| **C** | **Explore Chargers** (primary, white) · **Talk to an Expert** (secondary text-arrow) |
| **B** (right) | Built for sites that need dependable, professionally installed EV charging. |
| Media | Authentic Envizon charger footage or photo, darkened 40% (the existing `darkenMedia`). A poster image is required. Video only after a rights and performance check. |

Motion is unchanged (staggered title rise, line draw, descriptor drop, CTA pop). The text is readable with animation off.

### 3. Where we charge — applications strip (replaces the client-logo marquee)
| Level | Content |
|---|---|
| **H** | EV charging, planned for the places people park. |
| Marquee items (icon + label) | Apartments & Societies · Hotels & Resorts · Malls & Retail · Offices & Campuses · Highway Stops · Fleet Depots |

The marquee speed, gradient edges and auto-fill are kept. Icons are thin line icons in the existing stroke style. These are **application types, not claims of existing deployments** (blueprint §5.1 item 9). Swap in real partner or certification logos later only if they're approved.

### 4. Solutions — "find your fit"
| Level | Content |
|---|---|
| **H** | One partner from site survey to switch-on. |
| Card 01 · Commercial Charging | S: Fast charging for malls, hotels, offices and retail destinations. |
| Card 02 · Residential Communities | S: Shared charging planned around your society's power and parking. |
| Card 03 · Fleet Charging | S: Depot charging sized for high-utilisation vehicles. |
| Card 04 · Charging Infrastructure | S: Site feasibility, electrical planning, installation and commissioning. |
| **C** (hover) | "Enquire" → `#contact` with the matching enquiry type |

- The fourth card fits the existing stack: hover lift, reveal label and large animated outline icon all work for four.
- Icon tiles use the Envizon greens (`#00A650`, `#16B14C`, `#71BF45`, `#D6F1DB`).
- Icons are drawn in the existing outline style (building + bolt, home, truck, plug/grid), with matching large animated versions.

### 5. Charger range — sticky stack `#chargers`
| Level | Content |
|---|---|
| **H** (sticky bar) | The Envizon DC Charger Range · scroll-drawn `logo-mark-outline.svg` |
| Panel 01 | E: `01` · H: **60 kW** · S: DC Fast Charger · Label "IDEAL FOR:" + chips (Commercial · Fleet) · B: one-line positioning · C: **Request a Quote** |
| Panel 02 | `02` · **120 kW** · DC Fast Charger · chips (Highway · Commercial · Fleet) · Request a Quote |
| Panel 03 | `03` · **240 kW** · DC Fast Charger · chips (Highway · Fleet Depots) · Request a Quote |
| Spec line (only when signed) | Connector · Output range · Protocol, e.g. "CCS2 · OCPP 1.6J". Otherwise show "Specifications on request". |
| Media | Approved product photo or render per model (left 70%) |

- **Blocked:** model names (Atom DC…), currents, efficiency, IP/IK, warranty and prices stay hidden until signed datasheets arrive (§1.2, §8.6).
- Price is always "Request a Quote" unless the price guard (§8.6) is met.
- 360/480 kW are hidden.
- "View Specifications" appears once product pages exist.

### 6. How it works — process carousel `#process`
| Level | Content |
|---|---|
| **H** (left column) | From first call to first charge. |
| **C** | **Book a Site Assessment** → `#contact` (Site assessment) |
| Slide 01 · Consult | Tell us about your site, vehicles and charging goals. |
| Slide 02 · Site Feasibility | We assess power availability, parking layout and expected load. |
| Slide 03 · Charger Selection | Match charger power and connectors to how your site will be used. |
| Slide 04 · Installation & Commissioning | Professional installation, testing and handover. |
| Slide 05 · Monitoring & Support | Ongoing monitoring and service support. *(Only if the CMS and support offer is confirmed. Otherwise end at slide 04.)* |

- **Keep:** autoplay with progress dots, the 01–05 counter, click zones, and the animated diagram per slide with the same line-draw, node-pop and label-rise motion vocabulary.
- **New:** five step diagrams, authored as SVG and sequenced with the existing `sequence.js`. They are illustrative, with no numbers, using lime as the highlight colour instead of orange:
  - 01 conversation nodes
  - 02 site grid + load meter
  - 03 power bars 60/120/240
  - 04 install checklist line
  - 05 uptime line chart (no values)

### 7. Why Envizon — new section `#why`
| Level | Content |
|---|---|
| **E** | Why Envizon |
| **H** | Built to be the only call you need. |
| 4 cards (icon tile · title · one line) | End-to-end delivery: one team from feasibility to commissioning. |
| | DC fast-charging focus: hardware chosen for commercial and fleet duty cycles. |
| | Standards-based hardware: open protocols so your site isn't locked in *(verify OCPP before using)*. |
| | Local installation & support: on-ground teams for setup and service *(verify coverage and SLA wording)*. |
| **C** | Talk to an Expert |

- Layout: light background (`bg-white-2`) with the dotted grid, and four white bordered cards. These are the carousel card style, so no new visual language.
- Motion: stagger fade-move plus word reveal on the heading.
- All four statements need client confirmation. They are differentiators, not numbers.

### 8. Partner CTA — closing block `#partners`
| Level | Content |
|---|---|
| **H** | Host, operate or partner in EV charging with Envizon. |
| **S** | Explore site-host and business partnership options with our team. |
| **C** | **Become a Partner** → `#contact` (Partnership) · **Download Brochure** (hidden until the brochure is rights-checked) |

- The looping octagon backdrop stays.
- There are no ROI, income or "franchise opportunity" claims (blueprint §5.5, §15.4).

### 9. FAQ — new section `#faq`
| Level | Content |
|---|---|
| Left column | **H:** Questions, answered. · **S:** Can't find what you need? · **C:** Talk to an Expert |
| Right column (accordion) | 1. What does Envizon EV offer? |
| | 2. Which charger power is right for my site? |
| | 3. Do you handle site assessment and installation? |
| | 4. Which vehicles and connectors are supported? *(verified answer only)* |
| | 5. How long does a typical project take? *(ops input)* |
| | 6. Do you offer partnership programmes? |

- Built from the mobile-menu accordion component (same open/close animation).
- `FAQPage` schema is added only once the answers are approved.

### 10. Footer
| Block | Content |
|---|---|
| Menu 1 "Discover Envizon" | Home · Chargers · Solutions · Partners · Why Envizon · FAQ · Contact |
| Menu 2 "Connect" | Verified phone · WhatsApp · email · LinkedIn · Instagram *(publish only after verification, §1.2)* |
| "Our Solutions" rotator | The 4 solutions (icon + title + one-liner), 5 s autoplay (kept) |
| Brand panel (was blue) | Envizon gradient panel; rotating taglines: *Charge forward.* · *Plan your site.* · *Power your fleet.* · *Charge your community.* · *From survey to switch-on.*; animated Envizon mark in place of the old line animation |
| CTA block | E: Get Started with Us · H: Let's plan your EV charging site. · C: Get a Quote |
| Legal row | Privacy Policy · Terms of Use *(pages required before launch)* |
| Footnote | `logo-full-white.svg` (large) · small mark + "© 2026 Envizon EV Solutions. All rights reserved." *(legal name pending)* |

### 11. Get a Quote dialog `#contact`
| Area | Content |
|---|---|
| Left panel | `logo-full.svg` · H: Talk to an Expert · S: Tell us about your site and we'll recommend the right charging setup. · verified contact line |
| Fields (blueprint §9.4) | Enquiry type* (Charger quote · Site assessment · Fleet charging · Partnership · General). Pre-filled from whichever CTA opened it. |
| | Full name* · Mobile* (`+91`, `inputmode="tel"`) · Email · Company / Society · City* · Charger interest (60 · 120 · 240 kW · Not sure) · Requirement message |
| | Consent to be contacted* (versioned text) · Marketing updates (optional, unticked) |
| States | Inline errors (existing tooltip pattern), loading, success with reference ID, failure + retry |

- **Launch gate:** submit must reach a real, durable lead endpoint. The current mock is dev-only (§0 rule 12).

---

## 5. Content hierarchy rules (applies everywhere)

| Level | Class (existing) | Desktop / mobile | Use |
|---|---|---|---|
| Display H1/H2 (hero only) | `t-h-1` | 48 / 24 px, thin | Hero titles |
| Section heading (H2) | `t-h-2 md:t-h-3` / `t-h-1` (sticky bars) | 40→24 px | One per section, max ~12 words |
| Card / item title (H3) | `t-h-3` | 24→16 px | Card, panel, FAQ question |
| Eyebrow / label | `t-l-1` (12 px, caps for chips) | — | Section label, "IDEAL FOR:", numbers |
| Index numbers | `t-l-2` | 13–16 px | 01/02/03, counters |
| Body | `t-b-1` 16 px / `t-b-2` 14 px | — | Max 2 lines in cards, 3 in hero |
| CTA | Existing button variants (green filled / white / arrow-text) | — | One primary per section |

**Writing rules**
- Headings are statements, not slogans with numbers.
- Supporting lines are at most about 20 words.
- Units are written as **kW** with a space ("120 kW").
- Use British/Indian spelling (programme, utilisation).
- No superlatives ("best", "fastest", "#1") without proof.

---

## 6. Assets & decisions needed from the client

| Item | Needed for | Blueprint ref |
|---|---|---|
| Official vector logo (SVG/AI) + usage rules | §2.1 (temporary rebuilt SVG until then) | §21.1 |
| Hero footage or photo of an Envizon charger/site, with rights | Hero | §5.1.2 |
| Product photos/renders for 60/120/240 kW + signed datasheets | Charger range | §1.2, §1.4 |
| Confirmed service scope (installation, CMS monitoring, support hours) | Process slide 05, Why cards, FAQ | §1.2, §5.4 |
| 4 approved differentiators | Why Envizon | §5.1.7 |
| Verified phone / WhatsApp / email / social / address, legal entity name | Header utility, footer, dialog | §1.2, §15.3 |
| Partner programme definition + approved brochure | Partner CTA | §5.5 |
| FAQ answers (ops/sales sign-off) | FAQ | §5.1.13 |
| Privacy Policy & Terms | Footer, consent text | §15.3 |
| Lead destination (CRM/email/DB) | Contact dialog | §9.4 |
| Typography decision (keep current vs Manrope/DM Sans) | Global | §6.1 |

---

## 7. Phased delivery

Rule for every phase: **change content and brand, never the layout system.**
- The same components, classes, motion timings and breakpoints are kept.
- Each phase ends with a feedback gate:
  - `tools/shoot.mjs` at 1440/1024/768/390
  - a comparison against `reference/baseline/` (the pre-rebrand build)
  - a console-error and external-request check
  - a visual review
- Only content-driven differences are allowed through the gate.

| Phase | Scope | Exit check (feedback gate) |
|---|---|---|
| **P1 · Brand foundation** | Vector logo set traced from the official JPG (full, white, mark, outline), favicon/OG, `css/brand.css` token overrides, page meta/title, reproducible build pipeline (`build_html.py` → `brand_envizon.py`) | Logo renders crisp at 24 px and 220 px; colours match the logo samples; no layout shift vs baseline |
| **P2 · Shell** | Preloader mark animation, header (logo pill, nav anchors, Get a Quote), mobile menu, footer (menus, solutions rotator, gradient brand panel, taglines, CTA, legal, wordmark) | Header and footer screenshots match baseline geometry; nav/menu keyboard pass |
| **P3 · Hero + applications** | Hero copy, mark, secondary CTA, media placeholder; marquee converted to application chips | Hero LCP poster loads; marquee speed unchanged |
| **P4 · Solutions** | 4 cards, new icon set + animated large icons, Enquire routing | Hover lift/icon/label works for 4 cards; reduced-motion OK |
| **P5 · Charger range** | 60/120/240 kW panels, chips, Request-a-Quote, "Specifications on request", outline mark draw | Sticky stack and dimming unchanged; no blocked data in the DOM |
| **P6 · Process** | 5-step carousel copy + 5 new step diagrams (sequence engine), Book a Site Assessment | Autoplay/dots/counter work for 5 slides; diagrams animate |
| **P7 · Why Envizon + Partner + FAQ** | New card grid section, partner CTA copy, FAQ accordion | New sections follow the hierarchy (§5); reveals and accordion keyboard OK |
| **P8 · Quote dialog** | Envizon field set, enquiry-type pre-fill from every CTA, +91 validation, consent | All CTAs open the dialog with the right type; validation states |
| **P9 · QA & handover** | 320–1440 sweep, a11y/keyboard, reduced motion, Lighthouse, build, content-status register, README | Gate checks pass; open client items listed |

### Delivery status (19 Oct 2026)

| Phase | Status | Gate result |
|---|---|---|
| P1 Brand foundation | ✅ Done | Logo traced to vector (full / compact / white / mark / outline), favicons, OG, `brand.css` tokens, meta |
| P2 Shell | ✅ Done | Preloader mark animation, header, mobile menu, footer; geometry unchanged vs baseline |
| P3 Hero + applications | ✅ Done | Branded media placeholder with drawn mark; marquee timing unchanged |
| P4 Solutions | ✅ Done | 4 cards, Envizon icon set, hover draw-in |
| P5 Charger range | ✅ Done | Sticky stack and dimming intact; no blocked data in the build |
| P6 Process | ✅ Done | 5 slides, new diagrams, autoplay/dots/counter OK |
| P7 Why / Partner / FAQ | ✅ Done | New sections on template primitives; accordion and reveals OK |
| P8 Quote dialog | ✅ Done | Pre-fill from CTAs, +91 validation, consent; submission mocked |
| P9 QA & handover | ✅ Done | 1440→320: no overflow, errors or external requests; reduced motion OK; production build clean |

Remaining work is client input; see `docs/content-register.md`.

Copy status is tracked in `docs/content-register.md`:
- `PROPOSED` items ship to dev and staging.
- `BLOCKED` items are not in the markup.

## 7a. Implementation steps (detail)

1. **Brand layer:**
   - Create the SVG logo set (§2.1), favicon and OG image.
   - Add `css/brand.css` with the token overrides (§2.3), loaded after `cofactr.css`.
2. **Content source:**
   - Add `js/data/content.js`: one object holding all homepage copy, links and enquiry types, each with a `status` (`PROPOSED`, `APPROVED` or `BLOCKED`).
   - Blocked items render hidden; in dev builds they show a visible `NOT APPROVED` badge.
3. **Markup:**
   - Edit `index.html` section by section in the order of §3.
   - `index.html` becomes hand-maintained from here: retire `tools/build_html.py`, which regenerates the Cofactr DOM.
   - Remove Cofactr links, meta, title, `noindex` decisions and the `README` references.
4. **Section changes:**
   - Header and nav anchors.
   - Hero copy plus the secondary CTA.
   - Marquee as text and icons.
   - Fourth solution card plus the new icon set.
   - Charger stack copy, chips and placeholders.
   - Process carousel with 5 slides and the new diagrams.
   - Partner CTA.
   - Footer content plus the gradient brand panel.
5. **New sections:** Why Envizon (card grid) and FAQ (accordion), wired into the existing reveal, scroll-text and accordion code.
6. **Preloader and footer mark:** an Envizon mark animation (SVG + GSAP; no Lottie needed).
7. **Dialog:** the new field set, CTA-based pre-fill (`#contact?type=...` handled in `contact.js`), Indian mobile validation and the consent copy.
8. **QA:**
   - `tools/shoot.mjs` at 1440/1024/768/390/320.
   - Keyboard and focus pass, reduced motion, no console errors, no external requests.
   - Check that every CTA target is real.

## 8. Verification
- Visual check at all breakpoints. There are no layout regressions against the current build, because the same components are used.
- Every CTA opens the correct section or dialog with the right enquiry type.
- Blocked content is absent from the production build (search `dist/` for prices, "Atom", "360 kW", "480 kW" and brochure URLs).
- Lighthouse: accessibility ≥ 95, LCP ≤ 2.5 s on the hero poster, CLS ≤ 0.1.
