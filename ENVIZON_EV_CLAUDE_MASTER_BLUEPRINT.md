# ENVIZON EV SOLUTIONS — CLAUDE MASTER PRODUCT, WEBSITE & ENGINEERING BLUEPRINT

> **File:** `ENVIZON_EV_CLAUDE_MASTER_BLUEPRINT.md`  
> **Version:** 2.0 / 19 October 2026  
> **Purpose:** A self-contained source of truth for a Claude coding/design agent to plan, architect, implement, test and prepare Envizon EV's public website for launch.  
> **Status:** PROPOSED ENGINEERING BLUEPRINT, **NOT** a signed client specification. Approval gates are explicit throughout.  
> **Primary goal:** Premium original corporate site + EV equipment catalogue + B2B lead funnels, with a permissioned charging-station locator activated only when the underlying station data is available and verified.  
> **Human approvers:** Envizon EV business owner, product/design owner, engineering owner, station-data owner, and legal/compliance reviewer.

---

## 0. INSTRUCTIONS TO CLAUDE — READ BEFORE TOUCHING CODE

This document is an **execution specification and decision register**, not a request to hallucinate product data, reproduce another company's source, or deploy unverified claims. Read every relevant section before implementing a feature.

**Behavioral contract**

1. **Inspect the current repository first.** The earlier `ENVIZON_EV_PHASE1_IMPLEMENTATION.zip` already includes a Next.js directory starter, routes, a PostGIS repository adapter, publishing guards and docs. Preserve working code and routes. Do not regenerate the entire repo or overwrite files blindly.
2. Produce a **repository audit**: implemented, partial, missing, broken, unknown. Compare with this spec. Run checks before and after changes.
3. Keep `FACT`, `BROCHURE_CLAIM_UNVERIFIED`, `PROPOSED`, `APPROVED`, `NOT_AVAILABLE`, and `BLOCKED` distinct. Never turn a design graphic into a verified technical claim.
4. If a required decision is missing, choose the safe fallback specified here, document the assumption in `docs/decision-log.md`, and request approval before irreversible implementation or public publication.
5. **Build Phase 1 marketing/product/lead functionality independently of station operations**; directory routes may exist in staging, but no real public stations without approved, permissioned source records.
6. **Do not build charging control, live availability, payments, reservation or roaming by pretending brochure text is an API.** Such functionality requires a working CSMS/CPMS or agreed partner integration.
7. Use original UI and authorised Envizon assets. Statiq is a **functional information-architecture reference**, not a branding/image/code/data source. Do not scrape or republish its inventory, reviews or prices.
8. Frontend must be responsive, keyboard-accessible, SEO-capable and performant. Prefer functional clarity over excessive animation.
9. No static credentials, API tokens or production personal data in Git or client bundles. Do not log PII in analytics or server logs.
10. Never claim tests/builds passed without executing them. Report test commands, outcomes, failed checks and known blockers.
11. Work in small, reviewable milestones. For each: plan → edit → lint/typecheck/tests/build → summary → decision blockers.
12. Do not enable search indexing of demo or staging pages; do not enable submit actions that have no real backend recipient.
13. Client approval determines brand claims, prices, brochure ownership, official company name, case studies, support promises, certification claims and legal copy.
14. Do not make up statistics, client logos, testimonials, deployments, charging station coordinates, compatibility lists, business returns or franchise ROI figures.
15. Before using a new dependency, explain what it solves and why a built-in solution will not suffice. Pin tested compatible versions rather than copying example versions uncritically.
16. For source conflicts, represent the data as **pending verification**; do not silently choose whichever brochure looks better.

### Explicit source hierarchy

1. **Client-signed current specification and verified legal/technical records** (none supplied yet).
2. **Client-approved datasheets, catalogue/price sheet and live backend API documentation** (none supplied yet).
3. **Uploaded Envizon EV presentation** (real submitted design/content material, but its numbers are not independently verified).
4. **Other uploaded Axonify, Joulepoint and Thunder presentations** (comparative/reference material only; do NOT attribute their products to Envizon EV without explicit instruction).
5. **Statiq public site** (UX/content structure reference, not Envizon inventory or its internal stack).
6. **This blueprint** (proposed implementation decisions).

If levels conflict, do not infer that later filenames or more polished visuals make their data authoritative.

---

## 1. EVIDENCE REGISTER — WHAT THE FOUR UPLOADED PRESENTATIONS ACTUALLY SUPPORT

### 1.1 Inspected source assets

| Source document | Slides | What was observed | Allowed use | Caution |
|---|---:|---|---|---|
| `Envizon_EV_Solutions_Reordered_Full_Images.pptx` | 2 | Envizon EV Solutions identity; product detail visual for an advertised 120 kW charger; DC charger range table; installation, CMS, roaming, support and franchise claims; call/WhatsApp and brochure CTAs | Envizon content *candidates* and design inspiration | Product specifications and service assertions require confirmation before publication |
| `Axonify_EV_Charging.pptx` | 2 | Similar 120 kW product visual and 60/120/240/360/480 kW range, Axonify branding | Comparison of presentation patterns | Not proof of Envizon ownership or partner rights |
| `Joulepoint_EV_Charging.pptx` | 2 | Joulepoint-branded charging products, range and marketing illustration | Competitive/reference comparison | Separate brand; differing current and price values |
| `Thunder_EV_Chargers_Merged.pptx` | 4 | Structured Thunder Falcon 60 kW, Thunder Hulk 120 kW, Thunder Storm 240 kW specifications and a broader range poster | Product-specification UI patterns, component model examples | NOT Envizon product data |
| Public Statiq detail page | online | Unique ID, hours, charger and connectors, tariff-looking number, directions, nearby, reviews, access, FAQs | Directory UX and station-page structure | Some displayed station/connector counts and status disagree; independent source rights required |

**Identity candidate from Envizon deck:** `ENVIZON EV SOLUTIONS`, green-and-white electric-mobility theme. This is **not** evidence of the formal registered legal name, approved branding files, or permissible logo reuse beyond the project materials.

### 1.2 Envizon deck: claims requiring a product owner to verify

The Envizon slides visually present:

- Charger power classes: **60 kW, 120 kW, 240 kW, 360 kW, 480 kW**.
- Proposed model family labels: `Atom DC (111-2G07)` for 60/120 kW in the range table; `Atom DC (180–360 kW range)` for 240/360 kW; 480 kW model shown `NA`.
- Brochure price candidates: **60 kW ₹8.5 lakh; 120 kW ₹6 lakh; 240 kW ₹13.5 lakh; 360 kW `NA`; 480 kW `NA`**.
- A **120 kW** individual slide with an illustrative **₹6 lakh** price, **three-phase 400–460 V / 5-wire**, **200–1000 V DC**, **200 A per gun**, **5 m cable**, **CCS2** connector text, **OCPP 1.6J or higher**, **GSM/Wi-Fi**, **RFID**, **7-inch display**, **>95% efficiency**, **>0.99 power factor**, **IP55**, **IK10**, and **12-month warranty**.
- Claims illustrated or written: **smart CMS monitoring**, **EV roaming network**, **24/7 support**, **complete installation/commissioning**, **high returns potential**, and a **franchise brochure**.
- A displayed call/WhatsApp number and a Google Drive franchise brochure link; **do not publish either until client verifies company ownership, currentness and sharing permissions**.

**Inconsistencies in the uploaded Envizon deck itself:**

- An individual 120 kW overview says **200 A per gun**, but mentions another overview saying **125 A per gun**. The catalogue assigns **200 A per gun** to the 60 kW column, which deserves specific verification.
- The charger class, output configuration and pricing are not sufficiently corroborated by a manufacturer's certified datasheet; do not infer technical or electrical compliance from a marketing poster.
- The 120 kW product image displays CCS2/CHAdeMO connector illustrations, whereas the listed 120 kW table cell says CCS2. Exact ports and simultaneous delivery must be signed off.
- 240 kW/360 kW output and multi-gun configurations contain marketing references to third-party listings; no reliable configuration-by-SKU proof is present.
- A 480 kW graphic is present, but its model/specification/price are shown NA; DO NOT market it as an orderable certified product.
- Claimed 24/7 support, CMS, roaming and revenue opportunity are not independently verified. Avoid binding SLA, earnings and operational promises until signed.

### 1.3 Other brands: separation and comparison

The other presentations are reference materials, not a shared Envizon inventory:

- **Axonify:** also depicts 60/120/240/360/480 kW, and reuses very similar 120 kW Atom DC values. This increases—not reduces—the need to identify actual manufacturer models and source rights.
- **Joulepoint:** depicts a 120 kW model at ₹8 lakh with dual-gun and 240 A (single-gun), while its overview illustrates prices 60 kW ₹6 lakh, 120 kW ₹8 lakh, 240 kW ₹16.5 lakh, 480 kW ₹25 lakh. These figures MUST NOT be transferred into Envizon listings.
- **Thunder Plus:** separate products are Falcon 60 kW ₹8.5 lakh, Hulk 120 kW ₹13 lakh, Storm 240 kW ₹25 lakh in its slides. These have separate OCPP/display and current configurations; they are NOT Envizon SKUs.
- Similar diagrams, identical contact details or shared brochure URLs among different branded presentations may reflect template reuse; they do **not** establish ownership or commercial permissions.

### 1.4 Release-safe treatment of the catalogue

| Charger band | Envizon brochure evidence | Public status before verification | Suggested UX |
|---|---|---|---|
| 60 kW DC | Listed in range table, Atom DC family, ₹8.5 lakh candidate | `DRAFT_UNVERIFIED` | May be a private CMS product draft; no public price/order action |
| 120 kW DC | Individual visual and table; ₹6 lakh candidate | `DRAFT_UNVERIFIED` | Technical landing page may be designed; do not publish figures until signed |
| 240 kW DC | Listed with Atom DC range and ₹13.5 lakh candidate | `DRAFT_UNVERIFIED` | Draft card; require verified SKU spec |
| 360 kW DC | Listed, `NA` price and non-final configuration | `CONCEPT_OR_TBC` | Do not imply available to purchase |
| 480 kW DC | Visual only, model and price `NA` | `CONCEPT_OR_TBC` | Hide from live catalogue or clearly label upcoming **only if approved** |
| AC/home chargers | Public Statiq comparison; not substantiated as Envizon products in supplied Envizon slides | `NOT_VERIFIED_AS_OFFERED` | Do not create Envizon SKUs without client confirmation |

**Required product owner approval fields:** legal manufacturer, brand, product SKU, rated power, actual output per connector and simultaneous power, voltage/current range, protection/certification documents, dimensions, cooling, warranty and support exclusions, installation responsibility, inventory status, price, currency, tax basis, date and geographic applicability, original approved media.

---

## 2. WEBSITE STRATEGY — TWO CONNECTED BUSINESS PILLARS

### Pillar A — confirmed direction from supplied marketing material (first priority)

**Corporate authority + product lead generation.** Present Envizon EV Solutions as a professional EV charging solutions company, subject to identity approval. Site should enable potential site owners, residential communities, fleet operators and commercial partners to understand offerings, compare technically verified chargers, and request calls/quotes/installation consultations.

Primary visitor routes:

1. Commercial buyer → Home → Chargers → Filter DC class → Product detail → Request quotation → Thank-you/CRM.
2. Site owner → Home → Solutions → Commercial installation → Site assessment form → Sales follow-up.
3. Franchise/partner candidate → Partners → business overview + eligibility → Download permitted brochure or request consultation → CRM.
4. Enterprise/fleet prospect → Solutions for fleets → describe requirements → consultation form.
5. Curious/research user → About/FAQ/Articles → product/solution CTA.

### Pillar B — conditional network discovery (cannot activate from brochures alone)

**Searchable EV charging-station directory.** Only launch if client confirms there is a proprietary or licensed list of verified public stations. If not, keep the locator behind a feature flag, unpublished and `noindex`, with no deceptive station map.

Visitor routes after approval:

1. Driver → Find Charger → search city/nearby → results/list/map → station detail → navigation.
2. Driver → city SEO landing page → choose station → view access, charger specs, tariff disclosure → directions.
3. Operator/admin → approved CSV/API station intake → validate → review → publish → website.
4. Visitor → report incorrect detail → support/data steward reviews issue → update record.

**Critical rule:** a charger **product** and a charging **station** are different entities. A product describes hardware for sale; a station is a real geolocated site with installed charge points and possibly live operational status. Never derive public station inventory from product brochure renders.

### North-star metrics (proposals, not historical facts)

- Valid qualified B2B leads/week by service and city.
- Charger product detail → enquiry conversion; start-to-submit form completion.
- Station discovery → directions click **only after Pillar B activates**.
- Verified station content coverage, freshness, and issue-resolution time.
- Organic impressions/clicks on valid product, solution and city pages.
- Technical: no production fake data, accessibility success, Core Web Vitals, uptime and error rate.

### Strict phase boundaries

| Phase | Included | Excluded until separately approved |
|---|---|---|
| P0: Discovery | Brand, inventory, data sources, sitemap, content, legal, design approvals | New production claims |
| P1: Corporate/commercial | Home, product catalogue, product details, solutions, about, partners, enquiries, CMS, SEO | Native charging control or payment |
| P1b: Verified locator | Map, list, search, filters, city SEO, station pages, editorial status/freshness | Live status unless authorised integrated feed |
| P2: Operations integration | Permitted CSMS/OCPI status, telemetry adapter and monitoring | Charging transactions by default |
| P3: Charging commerce | User identity, booking (if available), start/stop, session history, payments, refunds | Only after independent specification and compliance signoff |

---

## 3. PRODUCT REQUIREMENTS / USER ROLES / HARD GUARDS

### 3.1 Roles

- **Anonymous visitor / B2B prospect:** browse pages, search products and permitted stations, submit enquiry, read policies.
- **Marketing editor:** CMS-managed public copy, images, legal-approved FAQ/blog, drafts.
- **Product catalogue editor:** create draft SKUs/specifications; cannot self-approve sensitive claims/prices if governance requires review.
- **Station data steward:** import, validate, inspect, correct and request publication for location records.
- **Publisher/approver:** final content publish approval and provenance checks.
- **Sales user:** authorised CRM lead queue and response notes only as needed.
- **Technical administrator:** deployment, secrets, access policy, audit and integration monitoring.
- **Optional future driver:** authentication, favourites/sessions; NOT required for public Phase 1.

### 3.2 Critical functional requirements (acceptance-oriented)

| ID | Requirement | Priority | Acceptance |
|---|---|---|---|
| FR-001 | Premium responsive corporate homepage | P0 | Clear CTA routes, no unapproved statistics/testimonials |
| FR-002 | Product catalogue with verified publish states | P0 | Only `PUBLISHED` approved products appear in live lists |
| FR-003 | Product detail route | P0 | Specs display source-backed attributes; unavailable fields absent/TBC |
| FR-004 | Solution detail pages | P0 | Each page has its target audience, benefits and scoped lead form |
| FR-005 | B2B lead submissions | P0 | Server validated; stored; confirmed delivery; spam defenses |
| FR-006 | CMS draft/publish content | P0 | Editors can edit approved content without code edits |
| FR-007 | Privacy, legal, consent | P0 | Approved notices and consent text appear where relevant |
| FR-008 | Analytics and event taxonomy | P1 | Opt-in-aware event tracking, no PII payloads |
| FR-009 | Product comparison | P1 | Side-by-side only verified comparable specs, unknowns shown |
| FR-010 | Brochure library | P1 | Documents rights-checked, URL valid, access mechanism recorded |
| FR-011 | Station locator search/list/map | P1b BLOCKED | Real licensed station dataset approved, map works, no demo on live |
| FR-012 | Station detail pages | P1b BLOCKED | Stable IDs, verified coordinates, meaningful charger/access data |
| FR-013 | City directory pages | P1b BLOCKED | Only cities with reviewed publishable stations indexed |
| FR-014 | Station status freshness & provenance | P1b/P2 | Unknown/stale not displayed as available |
| FR-015 | Nearby search & directions | P1b | Correct geospatial order, valid coordinate links |
| FR-016 | Content issue reporting | P1b | Verifiable support queue and retention policy |
| FR-017 | Live connector status | P2 BLOCKED | Authenticated licensed API, freshness SLA, stale transition tested |
| FR-018 | Booking/charging/payments | P3 BLOCKED | Independently approved backend contract and compliance |
| FR-019 | Admin audit record | P0/P1 | Who/what/when for edits, imports, approvals |
| FR-020 | Production SEO | P0 | Canonical, metadata, robots, sitemap only for published public routes |

### 3.3 Explicit non-functional requirements

- Mobile-first and responsive at 320px to large desktop.
- Critical content should not depend on JavaScript animation or geolocation permission.
- WCAG 2.2 AA **target**: keyboard support, semantic markup, focus, contrast, accessible input errors, reduced-motion.
- HTTPS, access control, rate limiting, CSRF defenses as applicable, strong input validation, anti-spam, security headers and secrets management.
- Core Web Vitals field targets: LCP ≤2.5s, CLS ≤0.1, INP ≤200ms at 75th percentile where feasible; verify with representative devices and actual assets.
- Graceful partial outages: CMS/media/map provider down should not corrupt product or station data; show an honest fallback.
- No accidental indexing or domain leaks from staging.
- Make common content edits and product publishing possible without developer intervention, with approval checks.

---

## 4. SITEMAP AND NAVIGATION — ORIGINAL ENVIZON IA

### 4.1 Proposed public route tree

```text
/
├── /chargers
│   ├── /chargers/dc
│   ├── /chargers/ac                 # only if Envizon confirms an AC range
│   └── /chargers/[productSlug]
├── /solutions
│   ├── /solutions/commercial-charging
│   ├── /solutions/residential-communities
│   ├── /solutions/fleet-charging
│   ├── /solutions/charging-infrastructure
│   └── /solutions/charging-management  # ONLY if CMS service is confirmed
├── /partners
│   └── /partners/apply
├── /about
├── /projects                      # only with approved projects/case studies
│   └── /projects/[slug]
├── /insights                      # optional; only if content owner exists
│   └── /insights/[slug]
├── /contact
├── /privacy
├── /terms
├── /thank-you                    # noindex, no form PII in URL
└── /stations                      # feature-flag gated until approved data
    ├── /[citySlug]                # SEO city collection
    └── /[citySlug]/[stationSlug]-[stationId]
```

### 4.2 Navigation

- **Desktop primary:** Logo / Solutions (mega-menu) / EV Chargers (product dropdown) / Find a Charger (only if active) / Partners / About / Contact / `Get a Quote` button.
- **Mobile:** menu button, functional navigation with keyboard focus, persistent `Get a Quote` access without obstructive sticky UI; conditionally show `Find Chargers`.
- **Utilities:** verified support phone/WhatsApp if authorised, social links, location, brochure download if valid, privacy/terms.
- **No fake app download CTA**: show app links only when actual, tested Android/iOS builds exist.

### 4.3 URL and canonical rules

- Clean lower-case kebab-case slugs; CMS redirects on slug changes.
- Product stable internal UUID + unique slug; station stable ID remains independent of slug.
- Station coordinates in WGS84; latitude [-90,90], longitude [-180,180]. MapLibre uses `[longitude, latitude]` order.
- Do not let `?longLat=...` or search/filter parameters create crawlable duplicates; page canonical is the base stable URL.
- Missing/unpublished content → meaningful 404; deliberately removed content → 410 if appropriate; moved routes → 301 redirects.
- Nothing private, unverified, draft, thin or demo goes in the sitemap.

---

## 5. PAGE-BY-PAGE UX / CONTENT BLUEPRINT

### 5.1 Homepage `/`

**Purpose:** explain who Envizon EV is, products and services, establish credibility without unsupported claims and drive qualified calls.

Suggested sections (in this exact narrative order, subject to approved copy):

1. **Announcement/utility:** optional verified contact and market coverage, not contrived counters.
2. **Hero:** large authentic charger photograph/render; concise approved promise; primary CTA `Explore Chargers`; secondary `Talk to an Expert`. Original premium green/white direction.
3. **Proof strip:** ONLY client-approved certifications, installation partners, completed projects or legitimate logos. Otherwise replace with tangible process advantages, no invented numbers.
4. **Solutions selector:** business, residential communities, fleet, property owners; cards link to correct solutions.
5. **Charger range:** verified charger cards with kW, product name, connector and `Explore`/`Request quote`, no unconfirmed price. Configurations unavailable should not be listed as orderable.
6. **How a project works:** Consult → Site feasibility → Charger selection → Installation/commissioning → Monitoring/support; only present offered services.
7. **Why Envizon:** real differentiators supported by operations and client approval; avoid generic quantified claims.
8. **Monitoring/CMS:** conditional on client confirmation; distinguish dashboard marketing from live operational demo.
9. **Applications:** apartment, hotel, mall, office, highway/fleet illustrations with appropriate CTAs (not claims of existing deployments).
10. **Network teaser:** only after Pillar B unlocks; preview verified stations/city links and charger-locator CTA.
11. **Case studies/testimonials:** only published with written permission; otherwise omit.
12. **Partner/franchise CTA:** qualification-oriented, not guaranteed ROI.
13. **FAQ:** clear verified commercial answers.
14. **Lead CTA/footer:** sales email/phone, inquiry form, company details, social, legal, links.

Hero UX: descriptive, meaningful content visible without animation; CTA keyboard-accessible. Video optional only after performance review, accessible fallback and proper rights.

### 5.2 Chargers listing `/chargers`

- Page introduction, DC/AC tabs conditioned by product existence, filter by power range, intended deployment, connector standard and install context; do not filter on unknown values as if known.
- Product cards: approved cover image, product class and model, rated power, supported output/connector variant, installation type, `View specifications`, `Request quote`.
- Comparison control (up to 3 verified products), linkable filtered state, meaningful empty results, mobile-friendly responsive layout.
- Sticky sub-navigation optional; never interfere with focus and small screens.
- Clearly label `Coming soon` only after business approval; missing inventory is not an implied preorder.

### 5.3 Product detail `/chargers/[productSlug]`

**Sections:** breadcrumb; product hero imagery; name/model/power; primary `Request Quote` and secondary `Download Verified Datasheet` (conditional); specs table; available connector configurations; power allocation per outlet vs rated aggregate output; use cases; install considerations; certified standards and warranty conditions (if proven); photo gallery; support/service scope; related chargers; FAQ; technical disclaimer; enquiry CTA.

**Data presentation constraints:** use data fields not free-form images for prices/current/output; display correct units (kW, kWh, V, A, m, INR). Price can be `Request a quote`, `Starting at ₹X` (only with legal price approval, tax/date terms) or hidden.

**Product comparisons** must not compare e.g. charging cabinet aggregate 240 kW against per-connector 240 kW as equivalent. Distinguish `rated_aggregate_power_kw`, `max_per_connector_kw`, `maximum_simultaneous_connectors`, and `power_sharing_mode`.

### 5.4 Solutions landing `/solutions`

Intro → solutions grid → segments/personas → what is included → process → applicable verified hardware → credibility → FAQs → CTA. Each solution must have one clear customer action.

**Commercial charging:** eligibility, site details, installation feasibility, hardware options, operational model, contact.

**Residential communities:** society/apartment needs, installation and shared infrastructure workflow (only approved details).

**Fleet:** high-utilisation requirements, depot power, uptime/service responsibilities, enquiry.

**Charging infrastructure:** engineering/siting/commissioning scope; clarify what service is actually provided.

**Charging management:** only if CMS provision/support is confirmed; describe actual supported capabilities, no fake dashboard or performance claims.

### 5.5 Partners `/partners`

- Define actual programme type: franchise, site host, installation partnership, dealership or revenue sharing — DO NOT blend without distinction.
- Document requirements, step-by-step application, review criteria, expected response window (only if operationally true), downloadable approved brochure, conditions/disclaimers.
- **Never promise investment returns, guaranteed monthly earnings or mandatory franchise availability based on the reference posters.**
- Forms capture: name, business, service type, city, contact, property category, available space (optional), electricity infrastructure (optional), message, clear consent.

### 5.6 About / projects / insights / contact

- About: verified story, leadership/team photos with permission, capabilities, values, approved operational footprint.
- Projects: proof-based case studies (challenge, site, equipment, outcome); avoid inventing customers and results.
- Insights: educational articles reviewed for technical accuracy, canonical, authors/updated date; do not auto-publish AI filler.
- Contact: structured enquiry options, current verified channels, location (if real), hours, validation, privacy notice, success/failure states; anti-spam; no decorative dead buttons.

### 5.7 Conditional station locator `/stations`

**Activation condition:** approved licensed list + owner + tested geodata + publishing governance.

Desktop: left search/filter/results panel (approximately 35–42% viewport) + map (remaining width); synchronized list and map hover/selection, list pagination, marker clusters, accessible alternative list. Mobile: search/top controls, filter bottom sheet, list/map view toggle, cards with clear directions.

Features:

- Search by city/area/pincode/landmark/station name; geocoding provider only after license/cost decision.
- Filters: AC/DC, connector standard, power bands, public/restricted, time of access, verified price data; `Available now` only for live feed with clear freshness rules.
- Location permission only on user action; denied location returns manual city search, never blocks service.
- Distance from coordinates with honest label: aerial distance from PostGIS or road distance only via routing provider.
- Station card: approved name, short address, charger power/connector summary, access/hours, data updated time and directions.
- Unknown availability visual = neutral `Status not verified`, never green.
- Failures: provider tile outage retains functional text list; search/API error offers retry; no results suggests clearing filters.

### 5.8 Conditional station detail `/stations/[citySlug]/[stationSlug]-[stationId]`

1. Breadcrumb; accurate name, immutable ID, public access condition, verification timestamp.
2. Summary: physical address, map pin, copy address/coordinates and external directions.
3. Charger cards: AC/DC, equipment and connector counts, output limits, port type, status *per connector* if sourced.
4. Tariff breakdown with **₹/kWh or other exact billing unit, tax status, effective date, responsible operator, potential parking/idle/other fees**; otherwise `Pricing not provided`.
5. Operating hours including date-specific closures if supported, and access restrictions.
6. Verified facilities/amenities; missing data = `Not listed`, never fabricated.
7. Images licensed by data owner; accessibility/entrance instructions.
8. Nearby verified sites from PostGIS geodistance; exclude unpublished/restricted sites unless clearly permitted.
9. Reviews only from verified owned/moderated data and permitted use; without reviews show no rating.
10. Fact-checked station-specific FAQs; report an issue; support contact if approved.
11. Canonical meta, meaningful H1, local structured data only where appropriate and accurate.

**Reference warning:** the supplied Statiq station page shows a charger block with 120 kW + two available connectors while an overview panel separately shows 0 DC chargers. Avoid reproducing contradictory aggregates; derive totals from the same stored connector/equipment records, with a clear data timestamp.

### 5.9 City pages `/stations/[citySlug]`

H1 with city name → concise unique editorial explanation → verified station counts (derived, not typed into copy) → matching station cards/map → supported filter view → FAQs with genuine area-specific data → adjacent cities only where records exist. Avoid programmatic thin/duplicate city pages.

---

## 6. VISUAL DESIGN SYSTEM — SPEC FOR FIGMA / CLAUDE / IMPLEMENTATION

The Envizon presentation is visually **green, white, technical, optimistic and equipment-oriented**. Use that direction while designing a distinctive website, not simply translating brochure tiles into full-screen sections.

### 6.1 Provisional tokens — must be approved against actual SVG logo

```css
:root {
  --color-brand-900: #063D25;   /* PROPOSED deep forest */
  --color-brand-700: #07683A;   /* PROPOSED Envizon green */
  --color-brand-500: #188B4D;   /* PROPOSED interactive emphasis */
  --color-accent-400: #B3DC60;  /* PROPOSED lime accent; use sparingly */
  --color-text: #17251E;
  --color-text-muted: #5D6D64;
  --color-bg: #FFFFFF;
  --color-bg-soft: #F4F7F2;
  --color-border: #DBE5DD;
  --color-danger: #B42318;
  --color-info: #2367A6;
  --radius-card: 20px;
  --radius-control: 12px;
  --radius-pill: 999px;
  --content-max: 1360px;
  --gutter-mobile: 20px;
  --gutter-desktop: 48px;
}
```

- **Typography proposals:** Manrope or DM Sans for readable interface; one strong display family max, subject to license and Indian language requirements. No more than two type families.
- **Type:** fluid hero 44–76 px on desktop, 32–44 px mobile; H2 32–52 px; body 16–18 px with ≥1.5 line-height. Ensure long product specs wrap.
- **Spacing:** 4/8 px base; section padding 80–140px desktop, 56–84px mobile; density reduced on station finder.
- **Buttons:** primary filled green, secondary border, tertiary text; 44px minimum touch targets, visible focus rings, disabled/loading states.
- **Cards:** soft borders, modest radius, emphasis on photography and technical clarity; avoid cartoonish decoration or repeated gradient/shadow clutter.
- **Icons:** consistent line-weight Lucide or custom authored set. Do not represent legal certification via made-up badge illustrations.
- **Images:** actual product photography where available; separate marketing scene renders from factual SKU photos. Alt text descriptive, source/license recorded.

### 6.2 Interaction and animation system

- Prefer CSS transitions and selective GSAP on marketing pages; on heavy landing sections use ScrollTrigger only where a measurable UX benefit exists.
- Hero entry: stagger text/CTA + soft image reveal; no scrolljacking.
- Cards: subtle hover elevation/scale no more than ~1.02, keyboard equivalents.
- Section reveals: short 250–600ms transitions, opacity and transform; honor `prefers-reduced-motion`.
- No long motion sequences for locator, forms, station info or safety details; map should be immediately usable.
- Avoid animating layout-affecting properties on scroll; pinning must not hide content at mobile heights.
- Test text readability with slow devices, background video disabled and fonts not yet loaded.

### 6.3 Responsive UX acceptance

- Desktop 1440 and 1280; tablet 1024/768; mobile 430/390/360/320 as target preview sizes.
- No horizontal overflow, hidden primary CTA, clipped spec values, input behind keyboard or map card overlay trap.
- Touch size ≥44×44px target where feasible, input autocomplete, `inputmode` for Indian mobile number, labels independent of placeholders.
- Accessible form error summary and field-level instructions, image alternatives, reduced motion, focus restoration when menus/dialogs close.

---

## 7. ARCHITECTURE — EV WEBSITE WITHOUT OVERBUILDING

### 7.1 Recommended technology decisions

| Layer | Default | Rationale | Alternative/decision |
|---|---|---|---|
| Web framework | Next.js App Router, TypeScript | SEO pages, SSR/SSG/ISR, routing, BFF, metadata | Existing Vite feasible only if separate SSR/static SEO pipeline is accepted |
| UI | React, Tailwind CSS, small component design system | Speed + consistent responsive styles | CSS modules valid if repo already uses them |
| Motion | GSAP selective, CSS first | Premium but restrained brand site | Framer Motion if repo already has it; avoid redundant animation libs |
| Content CMS | Strapi 5 self-hosted Community | Page/product draft/publish workflows | Sanity/Directus as separate reviewed decision |
| Station/geodata | PostgreSQL + PostGIS | Correct geospatial queries and relational integrity | Managed PG with PostGIS if hosting policy permits |
| Product content | Strapi collection and approved asset storage | Editorial workflow | Product database service only if actual commerce requires it |
| Map UI | MapLibre GL JS | Open-source map renderer | Not a free map tile service; licensed tiles required |
| Geocoding/route | Licensed provider TBD | Reliable lookup and road routing | Do not assume public OSM/Nominatim endpoints support production traffic |
| Lead backend | Next.js server handlers + PostgreSQL/approved CRM | Simple first-launch stack | FastAPI microservice only if company already uses one |
| Validation | Zod / server-side schema validators | Predictable inputs | Implemented equivalent if existing repo |
| Tests | Vitest or Node test, React Testing Library, Playwright | Unit/integration/E2E coverage | Repo standards govern |
| Logs/monitoring | structured logs + error tracking + uptime checks | Operational resilience | Use client-approved provider |
| Deploy | Docker Compose on adequately provisioned VPS + Nginx | Portable predictable environment | Managed Next.js/DB platform if chosen |
| Cache | built-in Next caching, HTTP/CDN | Simple for initial site | Redis only where feed throughput truly needs it |

**Architecture diagram**

```text
Users / Search engines
      |
DNS + TLS + Reverse proxy/CDN
      |
Next.js (App Router / SSR pages / UI / BFF endpoints)
   |               |                   |
   |               |                   +--> Validated lead endpoint -> PostgreSQL / approved CRM -> sales notifier
   |               |
   |               +--> Strapi CMS API (pages, products, brochure assets, approved copy)
   |
   +--> Station read repository -> PostgreSQL + PostGIS
                                  ^
                                  |
                      Staging review & publish pipeline
                                  ^
                                  |
                        CSV / authorised partner API
                                  |
                       Optional P2 CSMS/OCPI adapter

MapLibre client --> LICENSED map style/tile endpoint
         \-----> licensed geocoding / routing as needed
```

**Separation:** content authors edit CMS; station stewards manage verified station data; connector statuses come only from operational APIs; sales receives leads; nobody hardcodes pricing and station statuses inside React components.

### 7.2 Existing starter: non-destructive integration

Earlier starter package contains routes: `/`, `/stations`, `/stations/[city]`, `/stations/[city]/[station]`, `/solutions`, `/partners`, `/contact`, `/about`, privacy/terms, station API, `lib/repository/postgres.ts`, DB migrations and deployment templates. Claude should treat these as reusable baseline rather than assume the repo is empty. **Add product pages, richer marketing pages, CMS and lead backends via incremental commits.** If the starter is not actually present, scaffold it following this blueprint.

### 7.3 App responsibility boundaries

1. Server-side web layer: SEO content, page composition, RSC, metadata, safe public reads.
2. Content layer: Strapi owns mutable editorial product/solutions/blog content and approved media metadata.
3. Operational data layer: PostGIS owns station spatial records, chargers, connectors, prices and provenance; do not model live connector states in CMS as manually edited truth.
4. Integration jobs: scheduled import/normalisation, remote data refresh, contract verification and error reports.
5. Lead layer: immutable submitted forms + optional CRM sync, data retention and consent record.
6. Future charging controls: separate authenticated, auditable operations service; no direct hardware commands from browser.

---
## 8. DATA MODEL — PRODUCT / STATION / LEAD / CMS

**Cardinality matters:** a single *station* may contain multiple *charge points*, each point multiple *connectors*, and a *product model* may be deployed in many stations. No unverified cross-link automatically establishes model installed on-site.

### 8.1 Main logical entities

| Entity | Key fields (minimum) | Important constraints |
|---|---|---|
| `products` | id UUID, sku, slug, display_name, manufacturer, brand, family, category AC/DC, aggregate_power_kw, commercial_status, approval_status, published_at, created_at | SKU/slug unique; approved record before public publish |
| `product_variants` | id, product_id, model_code, max_output_kw, connectors_json or normalized association, config_notes, orderable | Variant-specific output/current; unknown is null |
| `product_specs` | product_variant_id, input_voltage_v_min/max, output_voltage_v_min/max, dc_current_a_max, efficiency_pct_min, power_factor_min, cable_length_m, ip_rating, ik_rating, ocpp_versions, mounting, cooling | Each spec has provenance and an optional verified-at timestamp |
| `product_prices` | variant_id, amount_minor_inr, taxable_basis, tax_included, valid_from/to, geography, approval_ref, display_permission | Never assume INR amount is GST-inclusive or current; no live display until approved |
| `product_assets` | asset_id, product_id, purpose, license_status, creator, rights_holder, approved_by, alt_text | Marketing render clearly distinguished from documentary product photo |
| `locations/stations` | id UUID, external_source_id, name, slug, city, state, country, formatted_address, geom/geography point, public_access, source_id, data_verified_at, approved_at, publish_state | PostGIS geometry WGS84; not-null verified address before publish |
| `station_access` | station_id, access_type, hours_json, restrictions_json, support_phone, approved_at | `open_now` independent of connector operational availability |
| `charge_points` | id, station_id, hardware_model_id nullable, rated_power_kw, charger_type, operational_id, published | Counts derive from real rows |
| `connectors` | id, charge_point_id, connector_standard, max_power_kw nullable, max_current_a nullable, simultaneous_group_id | Connectors count ≠ charger count; physical status per connector |
| `connector_status_events` | connector_id, normalized_status, source_status, source_observed_at, received_at, authority, raw_ref | Immutable events; derive current state by authority + recency |
| `tariffs` | station_id or charge_point_id, amount_minor_inr, billing_unit, parking_fee, idle_fee, taxes, tax_included, effective_at, source_id | No unlabeled `₹14` without unit and source |
| `station_amenities` | station_id, amenity_code, verification_status | Unknown facilities omitted or shown as not listed |
| `station_media` | station_id, asset_id, approved_for_publication | No automatically scraped pictures |
| `sources` | id, owner, license_scope, contract_ref, last_sync, refresh_sla, allowed_fields | Licence is part of publish decision |
| `import_batches` | id, source_id, checksum, received_at, dry_run_report, error_count, approved_by, deployed_at | Provenance, dedupe, rollback |
| `station_issues` | id, station_id, issue_type, submitter_optional, message, status, assigned_to, resolution_at | Moderation, abuse prevention, retention |
| `leads` | id, type, name, email, phone, company, city, optional_answers_json, consent_snapshot, source_url, created_at, status | Server-side validation, PII scope, anti-spam, access restricted |
| `lead_events` | id, lead_id, status_change, actor, timestamp, notes | Audit log without unnecessary copied PII |
| `cms_audit` | content_type, content_id, action, actor, timestamp, before_after_safe_summary | Role-limited; secrets and sensitive PII excluded |

### 8.2 Proposed TypeScript contract

```ts
// Conceptual contract; adjust to existing repository types, schema and validation.
type PublicationStatus = 'DRAFT' | 'IN_REVIEW' | 'APPROVED' | 'PUBLISHED' | 'ARCHIVED';
type DataConfidence = 'VERIFIED' | 'PARTIAL' | 'UNVERIFIED';
type Availability = 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'OUT_OF_SERVICE' | 'OFFLINE' | 'UNKNOWN';
type AccessType = 'PUBLIC' | 'RESTRICTED' | 'PRIVATE' | 'UNKNOWN';
type ConnectorType = 'CCS2' | 'TYPE2' | 'CHADEMO' | 'GB_T_DC' | 'OTHER' | 'UNKNOWN';

type ProductPublic = {
  id: string;
  slug: string;
  name: string;
  category: 'AC' | 'DC';
  ratedPowerKw: number | null;
  manufacturer: string | null;
  modelCode: string | null;
  connectorTypes: ConnectorType[];
  variants: Array<{ id: string; title: string; powerKw: number | null }>;
  media: Array<{ url: string; alt: string; type: 'PRODUCT_PHOTO' | 'RENDER' }>;
  price?: { amountMinor: number; currency: 'INR'; basis: string; taxIncluded: boolean | null };
};

type PublicConnector = {
  id: string;
  type: ConnectorType;
  maxPowerKw: number | null;
  status: Availability;
  statusAsOf: string | null;
  statusIsLive: boolean;
};

type PublicStation = {
  id: string;
  slug: string;
  citySlug: string;
  name: string;
  address: string;
  position: { lat: number; lng: number };
  access: AccessType;
  verifiedAt: string;
  openingHours: string | null;
  chargePoints: Array<{
    id: string; chargerType: 'AC' | 'DC'; ratedPowerKw: number | null;
    connectors: PublicConnector[];
  }>;
  tariffs: Array<{
    billingUnit: 'KWH' | 'MINUTE' | 'SESSION' | 'OTHER';
    amountMinor: number;
    taxIncluded: boolean | null;
    effectiveAt: string;
  }>;
  amenities: string[];
};
```

Never add a field such as `availableChargerCount` as a separately edited database truth if it can be consistently derived from approved child connector rows; if a materialised aggregate exists, it must be reproducible and tested.

### 8.3 Core SQL for PostGIS (illustrative migration, not an instruction to replace existing migration)

```sql
CREATE EXTENSION IF NOT EXISTS postgis;

-- Extend existing station schema instead of creating duplicate tables if already present.
CREATE TABLE IF NOT EXISTS station_sources (
  id UUID PRIMARY KEY,
  source_name TEXT NOT NULL,
  rights_approved BOOLEAN NOT NULL DEFAULT FALSE,
  rights_reference TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS station_locations (
  id UUID PRIMARY KEY,
  external_id TEXT,
  source_id UUID NOT NULL REFERENCES station_sources(id),
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  city_slug TEXT NOT NULL,
  state TEXT NOT NULL,
  address TEXT NOT NULL,
  position GEOGRAPHY(Point,4326) NOT NULL,
  access_type TEXT NOT NULL DEFAULT 'UNKNOWN',
  verified_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  publish_state TEXT NOT NULL DEFAULT 'DRAFT',
  CHECK (publish_state IN ('DRAFT','IN_REVIEW','APPROVED','PUBLISHED','ARCHIVED')),
  CHECK (publish_state <> 'PUBLISHED' OR (verified_at IS NOT NULL AND approved_at IS NOT NULL AND published_at IS NOT NULL)),
  UNIQUE(source_id, external_id)
);

CREATE INDEX IF NOT EXISTS idx_station_geo ON station_locations USING GIST(position);
CREATE INDEX IF NOT EXISTS idx_station_city_publish ON station_locations(city_slug, publish_state);
```

**Actual publication code** must additionally require `station_sources.rights_approved = true`; the SQL CHECK above alone does not enforce that cross-table rule. Add a transaction-safe application/service check or DB trigger if required by system design. Query published records with parametrised SQL and whitelist filter/sort fields. Do not concatenate raw user text into SQL identifiers.

**Geospatial query pattern:**

```sql
SELECT id, name, slug,
       ST_Distance(position, ST_SetSRID(ST_MakePoint($1, $2),4326)::geography) AS distance_meters
FROM station_locations
WHERE publish_state = 'PUBLISHED'
  AND ST_DWithin(position, ST_SetSRID(ST_MakePoint($1, $2),4326)::geography, $3)
ORDER BY distance_meters ASC, id ASC
LIMIT $4;
-- $1 longitude, $2 latitude, $3 radius in metres, $4 validated max page size
```

### 8.4 Publication state machine

```text
Imported raw record
  -> NORMALIZED
  -> VALIDATED (fields, coordinates, license, duplicates, tariff units)
  -> NEEDS_REVIEW
  -> APPROVED (responsible named human)
  -> PUBLISHED (public pages and sitemap eligible)
  -> ARCHIVED / WITHDRAWN (immediate unpublish or redirect process)

Invalid / missing permission -> QUARANTINED, never served publicly
```

- CSV imports are **dry-run by default**; produce row-level errors and diff previews.
- New station source must have rights metadata and approval before inclusion.
- Station phone numbers and images must be authorised for public display.
- Product technical field changes require re-verification; price update triggers separate commercial approval.
- Publish/withdraw operations have audit records and cache invalidation.

### 8.5 Status aggregation, recency and contradiction prevention

Keep three independent values:

1. **Opening/access:** `OPEN` / `CLOSED` / `UNKNOWN` based on locally configured hours and restrictions; does not imply connector availability.
2. **Connector operational status:** enum from source feed and timestamp, after mapping contract.
3. **Data confidence:** `VERIFIED` / `PARTIAL` / `UNKNOWN`, determined by source and freshness.

Proposed freshness thresholds are **not facts about the network**: set `STATUS_FRESHNESS_SECONDS` by actual vendor contract and approved SLA. If missing, exceeded, failed or status is contradictory, render `UNKNOWN` and last update if safe. A station-level `available` summary must be derived only if the connector-level feed is sufficiently fresh, accessible and internally consistent. Do not use CMS-edited manual status as fake live telemetry.

Power: `rated_output_kw` describes the charger aggregate or an explicitly identified port; output limits, electrical derating and shared load mean two plugs ≠ twice cabinet power. Maintain power-sharing metadata or omit simultaneous-output claim.

### 8.6 Product price display guard

A product price can appear publicly **only when all are present**:

- authorised seller / legal entity;
- product SKU and configuration;
- amount + currency + unit/basis;
- effective date and geography;
- tax inclusion/exclusion and any installation/shipping conditions;
- commercial approval (name/date/source);
- approved price visibility flag.

Otherwise the UI says **`Request a quote`** and never repeats brochure candidate numbers.

---

## 9. API CONTRACTS — CONSISTENT, SECURE, PAGINATED

Use `/api/v1` for public API surface if continuing existing starter. REST response bodies have a versioned, predictable envelope. Do not expose the CMS admin token to the browser.

### 9.1 Endpoints

| Method / Path | What it does | Auth | Precondition |
|---|---|---|---|
| `GET /api/v1/products` | Published product list/filter/pagination | public | approved product content |
| `GET /api/v1/products/:slug` | Approved product detail | public | product published |
| `POST /api/v1/leads` | Sales/partner/site leads | public + abuse controls | consent language and destination configured |
| `GET /api/v1/stations` | Verified station search / radius / bbox filters | public | station discovery enabled |
| `GET /api/v1/stations/:id` | Single published station with chargers | public | station discovery enabled |
| `GET /api/v1/stations/:id/nearby` | Nearby verified public stations | public | locator enabled |
| `POST /api/v1/station-issues` | Report incorrect detail | public + abuse controls | support workflow active |
| `POST /api/v1/admin/imports/stations/dry-run` | Preview CSV validation | authenticated steward | assigned role |
| `POST /api/v1/admin/imports/stations/:id/approve` | Approved publish pipeline | separate approver | rights/data checks |
| `POST /api/v1/internal/integrations/refresh` | Partner data refresh callback | signed service auth | formal integration |

Do not ship administrative APIs under public bearerless routes; internal endpoints use proper server access checks, not merely obscured paths. Prefer Strapi permission model for editorial collections; dedicated authenticated application admin for operational location data.

### 9.2 Query validation

`GET /api/v1/stations?city=hyderabad&lat=17.4&lng=78.4&radiusKm=20&connector=CCS2&limit=20&cursor=...`

- `lat` numeric [-90,90], `lng` [-180,180], `radiusKm` policy-bounded, `limit` max 50 or approved budget.
- Enforce bbox size, maximum response fields, request budget and stable cursor pagination.
- Escaped search terms, bounded string lengths, enum filters, input normalization, SQL parameters.
- Public responses include `data`, `pagination`, `generatedAt`, `dataStatus` where meaningful.
- Error pattern: `{ error: { code, message, requestId } }`; never include stack trace or underlying SQL to client.
- Unknown state is an explicit value, not `false` or `0` unless an actual verified zero count.
- External fetches: timeouts, retries with backoff, circuit breaker or safe stale cache, operation monitoring.

### 9.3 Example station JSON (schema demonstration ONLY — fictional non-publishable fixture)

```json
{
  "data": {
    "id": "fixture-station-001",
    "name": "EXAMPLE TEST STATION — NOT REAL",
    "citySlug": "example-city",
    "position": { "lat": 0, "lng": 0 },
    "access": "UNKNOWN",
    "verifiedAt": null,
    "publishState": "DRAFT",
    "chargePoints": [],
    "tariffs": [],
    "amenities": []
  },
  "dataStatus": "DEMO_ONLY"
}
```

Demo fixture should stay behind `ALLOW_DEMO_DATA=true` **only in development** and must never appear in production station API, public HTML, sitemap, search or social previews. In a missing-data environment, show no listing and say `Stations are not yet published` or hide the feature.

### 9.4 Leads: form handling and event flow

```text
User submits → client UX validation → server schema validation → CAPTCHA/honeypot/rate-limit
            → capture consent snapshot → insert lead transactionally
            → enqueue CRM/email delivery asynchronously
            → success response with reference ID
            → retry/reconciliation if outbound notification fails
```

Never use an email notification as the only record of a lead. Submission success should mean durable storage succeeded (or that an approved, durable CRM accepted it). Explicit failure feedback, retries and CSRF/cross-origin controls are required. Protect sensitive fields at rest and restrict sales access.

Proposed field schema:

```ts
const leadInput = {
  type: 'PRODUCT_QUOTE' | 'SITE_ASSESSMENT' | 'FLEET' | 'FRANCHISE' | 'GENERAL',
  fullName: 'required, length 2..100',
  email: 'optional only if phone supplied, RFC-style format',
  phone: 'E.164-normalised India or international if approved',
  organization: 'optional up to 150',
  city: 'optional up to 100',
  productId: 'optional valid UUID',
  requirementText: 'optional length capped and sanitised',
  consentToContact: 'explicit checkbox with versioned notice',
  marketingConsent: 'separate optional checkbox, not pre-ticked',
  sourcePage: 'server-verified internal attribution (not trusting arbitrary URLs)'
};
```

---

## 10. STRAPI CMS / EDITORIAL GOVERNANCE

### 10.1 Strapi content types and components

**Collection types** (create only if needed, not all at once):

- `product`: name, slug, category, synopsis, internal SKU, manufacturer, approval_status, publication_status, base_power_kw, intro, key benefits, relations, SEO.
- `product-variant`: code, product relation, per-output power/current/connector info, documentation links, approved spec source.
- `solution`: slug, persona, pain point, hero, feature blocks, process, FAQ relation, CTA config, SEO.
- `faq-item`: question, answer, category/context, verified_by, verified_on.
- `case-study`: real customer proof, approval/rights, outcome units and evidence, image, SEO.
- `article`: title, content, author/reviewer, updated date, tags, SEO, publish control.
- `asset-record`: approved upload metadata: owner, license, validity, credit, image type, alt text, allowed pages.
- `brochure`: document title, file, valid_from, access type, public sharing rights, signed content owner.
- `partner-program`: type, eligibility, services, terms, contact routing, approved CTA.

**Single types:** `global-settings`, `homepage`, `contact-details`, `navigation`, `footer`, `seo-defaults`, `legal-page-settings`.

**Components:** `seo-fields`, `hero-block`, `cta`, `image-with-rights`, `feature-grid`, `spec-row`, `comparison-fact`, `rich-section`, `faq-group`, `technical-disclaimer`, `download-link`.

**Do not** model real-time charge sessions, charger connector statuses or payments as editorial Strapi content. Station descriptions and editorial amenity text can be CMS-controlled, but geospatial operational records should remain in PostGIS.

### 10.2 CMS user policy

- Roles: contributor/editor, product verifier, publisher, admin. Apply least privilege.
- Draft & Publish enabled for public-facing content types; approval workflow can be additional application-level state if native capabilities in chosen edition are insufficient.
- Only verified product records may transition to published; editorial draft/publish does **not** substitute technical approval.
- Public API role may read only approved public data; never grant public write/list-all/upload admin actions.
- On publish: invalidate Next cache/tags for changed slugs, sitemap and listing pages; secure signed webhook with replay protection.
- Content-type/schema edits happen via development workflow and migrations, not untracked production admin experiments.

### 10.3 Data ownership and sync

If the same product spec exists in CMS, PDF and database, define one winner: ideally **signed technical datasheet → approved structured product spec**; PDF as downloadable evidence, not second editable numeric truth. Product publication record captures source, approval and revision. For a station, operational database + source provenance wins over marketing copy.

---

## 11. DATA INGESTION AND QUALITY ASSURANCE (STATION PILLAR)

### 11.1 Minimum client-supplied import schema

```csv
external_id,station_name,operator,source_name,rights_reference,address,city,state,postal_code,latitude,longitude,access_type,opening_hours,charger_id,charger_type,rated_power_kw,connector_id,connector_type,tariff_amount_inr,tariff_unit,tariff_tax_included,verified_at,photo_rights
```

Rules: do not treat a repeated station row per connector as multiple stations; group station/charger/connector IDs. Zero is not the same as missing. Prove coordinate order via map spot-check. Validate city/state against address. Reject out-of-range and non-numeric power, contradictory tariff billing units, unknown licence and duplicate conflicting charger IDs. Images require explicit permission.

### 11.2 Import pipeline steps

1. Input upload is never publicly addressable until malware/file-type/size checks and authorisation.
2. Validate schema, rows, encoding and canonical units (₹/kWh etc.).
3. Normalize provider status and timestamps; preserve raw source values separately.
4. Create dedupe candidates using stable provider IDs first, then geospatial/name matching with human review.
5. Generate dry-run report: valid rows, rejected rows, duplicates, changed tariffs, removed connectors, stale records.
6. Stage change set with diff review; require separate editor and publisher approval for sensitive changes.
7. Transactionally apply approved changes; maintain history and rollback plan.
8. Revalidate only affected station/city pages; refresh sitemap.
9. Monitor freshness, skipped imports and unexpected station count changes.

**Critical:** Do not remove stations automatically just because a feed temporarily omits them. Define source-specific tombstone/withdrawal rules and manual escalation.

### 11.3 Example publication validations

- `station.latitude` and `.longitude` within geographic bounds, confirmed in context.
- `rights_approved=true`; source contract permits public display of required fields and images.
- Verified physical location/operational or coming-soon classification; no conflation.
- `published` requires complete name, address, coordinates, stable ID and review timestamp.
- Tariffs only with currency, unit, source, tax flags, effective date, and review.
- Reviews only when permission and moderation support exist; ratings must have actual count.
- Aggregated charger counts computed by `COUNT(DISTINCT charge_point.id)` and connector counts separately.
- Unknown hours = `Hours not provided`, never `Open now`.
- Unknown status = `Availability not confirmed`, never green/available.

---

## 12. MONITORING, CHARGING BACKEND AND FUTURE INTEGRATIONS

### 12.1 OCPP and OCPI roles

- **OCPP** is used between a charger and a charging-management system (CSMS); OCPP branding on a brochure does not prove Envizon owns/operates a CSMS. Versions can be incompatible and implementation capabilities differ.
- **OCPI** may be used for network roaming/data exchange with partners; it is not automatically available just because a brochure claims roaming. Exact version, roles, endpoints, rights and test credentials must be negotiated.
- **The website** normally reads from a server-side aggregated data adapter. The browser must NOT speak directly to charge-point hardware, receive privileged CSMS API keys or issue unaudited remote start/stop commands.

### 12.2 Integration preflight checklist

- Operator and system vendor legal names; proof of right to integrate.
- Hardware make/model, OCPP version, supported profiles and connector model.
- API/OCPI documentation and sandbox or test station credentials.
- Expected refresh interval, state semantics, source clocks/time zones and uptime guarantees.
- Authentication type, IP allowlisting/webhooks, key rotation, rate limits.
- Reconciliation: station ID and connector IDs mapping to approved public records.
- Failure handling, stale timeout, disable live indicators, incident escalation.
- Data sharing/storage/resale contract and privacy review.
- User operations (book, start, stop, pay) separate scoped project with complete authorization and audit.

### 12.3 Optional maps / messaging / commerce

- MapLibre renderer requires a separate map-style/tiles provider; production tiles, hosting costs and attribution must be approved. No abuse of public demo tile servers.
- Nominatim-style public geocoding services must not be assumed unlimited/production-ready. Choose a permitted provider and usage cap.
- External directions link may use standard HTTPS map URL; native trip planning/ETA needs routing provider and explicit cost budget.
- WhatsApp messages require approved sending process/templates and consent. Do not treat a simple `wa.me` CTA as an enterprise messaging integration.
- CRM integrations require idempotent event delivery, retention controls and fields mapping.
- Future payment provider and tax treatment are distinct business/legal work streams; cannot be inferred from chargers' price brochures.

---

## 13. CONFIGURATION, SECRETS, FLAGS AND ENVIRONMENTS

### 13.1 Environment matrix

| Config | Local | Staging | Production |
|---|---|---|---|
| Demo fixtures | Allowed with visible `DEMO` label | Optional behind auth, `noindex` | Forbidden |
| Search indexing | Disabled | Disabled | Enabled only for approved routes |
| Station finder | Off unless testing | Off until approved dataset | On only after sign-off |
| Product price visibility | Disabled without approved source | Same | Same |
| Lead form | Test sink/DB | Staging CRM sandbox | Real client-owned CRM |
| CMS | Local dev | Separate staging data | Production locked roles |
| Logs | Verbose, scrubbed | Structured, scrubbed | Structured, minimum PII |
| Map tiles | Licensed/dev-tier | Licensed | Licensed with quotas |
| TLS | Dev optional | Required | Required |
| Backups | Optional local | Scheduled | Scheduled + restore drills |

### 13.2 `.env.example` starter contract (values are placeholders, not actual credentials)

```dotenv
# Application
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BRAND_NAME=Envizon EV Solutions
# Site URL always points to the environment where this deployment is running.

# Public feature flags: server-side gate ALWAYS precedes browser flags
NEXT_PUBLIC_ENABLE_STATION_FINDER=false
NEXT_PUBLIC_ENABLE_PRODUCT_COMPARISON=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false
# NEVER set ALLOW_DEMO_DATA=true on production
ALLOW_DEMO_DATA=true
ROBOTS_ALLOW_INDEXING=false

# PostgreSQL / PostGIS - SERVER ONLY
DATABASE_URL=postgresql://<user>:<password>@<host>:5432/<database>
DB_POOL_MAX=10

# Strapi - server-to-server only
STRAPI_URL=http://localhost:1337
STRAPI_READ_TOKEN=<server_only_token>
STRAPI_WEBHOOK_SECRET=<server_only_secret>

# Mapping provider; PUBLIC map style URL does not mean free unrestricted use
NEXT_PUBLIC_MAP_STYLE_URL=<licensed_map_style_url>
GEOCODING_API_KEY=<server_side_if_required>
ROUTING_API_KEY=<server_side_if_required>

# Lead delivery
LEADS_DESTINATION=database
CRM_API_URL=<if_approved>
CRM_API_TOKEN=<server_only_token>
LEAD_NOTIFICATION_FROM=<verified_sender>
LEAD_NOTIFICATION_TO=<verified_sales_inbox>
SMTP_URL=<if_approved>
ANTI_SPAM_SECRET=<if_applicable>

# Only required after live feed integration is contracted
ENABLE_LIVE_STATUS=false
CSMS_BASE_URL=<server_only_endpoint>
CSMS_API_TOKEN=<server_only_token>
STATUS_FRESHNESS_SECONDS=0

# Monitoring
ERROR_TRACKING_DSN=<optional>
```

Use `NEXT_PUBLIC_*` only for non-sensitive values intended for browsers. Enforce flags server-side; do not assume hiding a UI link secures an endpoint. Fail deployment if `NODE_ENV=production` and `ALLOW_DEMO_DATA=true` or site origin is localhost. Production must fail closed if indexing/publish policy conflicts with missing approved content.

### 13.3 Required operational configuration files

- `.env.example` (safe documented keys), `.gitignore` (exclude `.env.*`, except example), `README.md`.
- `next.config.ts`, `tsconfig.json`, `eslint.config.*`, Tailwind/PostCSS config, `package.json`, lockfile.
- `infra/Dockerfile`, `infra/docker-compose.yml`, environment override files, reverse-proxy/Nginx configuration, `.dockerignore`.
- Database migration scripts and seed scripts that refuse production/demo mixes.
- `docs/decision-log.md`, `docs/client-requirements.md`, `docs/release-plan.md`, `docs/data-provenance.md`, `docs/security.md`, `docs/rollback.md`.
- CI pipeline lint/typecheck/unit/build + dependency scans + smoke tests.
- Monitoring and backup configuration (do not keep backup archives in webroot).

---
## 14. EXACT REPOSITORY ARCHITECTURE AND BASE FILES

This tree is the target structure. **Adapt and merge** into the existing Phase-1 repo; avoid moving existing files without a migration need. Commented entries are deliverables, not proof they exist already.

```text
envizon-ev/
├── README.md
├── package.json / package-lock.json
├── .gitignore / .dockerignore / .env.example
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
├── app/
│   ├── layout.tsx                         # common metadata, font, global providers
│   ├── globals.css                        # tokens, base styles
│   ├── loading.tsx / not-found.tsx / error.tsx
│   ├── robots.ts / sitemap.ts
│   ├── icon.tsx / opengraph-image.tsx      # conditional asset creation
│   ├── page.tsx                           # homepage
│   ├── chargers/
│   │   ├── page.tsx                       # main charger collection
│   │   ├── dc/page.tsx
│   │   ├── ac/page.tsx                     # create/enable only if confirmed
│   │   └── [productSlug]/page.tsx
│   ├── solutions/
│   │   ├── page.tsx
│   │   ├── commercial-charging/page.tsx
│   │   ├── residential-communities/page.tsx
│   │   ├── fleet-charging/page.tsx
│   │   ├── charging-infrastructure/page.tsx
│   │   └── charging-management/page.tsx  # flag/gate if unconfirmed
│   ├── partners/page.tsx
│   ├── partners/apply/page.tsx
│   ├── about/page.tsx
│   ├── projects/page.tsx
│   ├── projects/[slug]/page.tsx
│   ├── insights/page.tsx
│   ├── insights/[slug]/page.tsx
│   ├── contact/page.tsx
│   ├── thank-you/page.tsx
│   ├── privacy/page.tsx / terms/page.tsx
│   ├── stations/
│   │   ├── page.tsx                       # feature-gated
│   │   ├── [citySlug]/page.tsx
│   │   └── [citySlug]/[station]/page.tsx  # canonical stable ID handling
│   └── api/
│       └── v1/
│           ├── products/route.ts
│           ├── products/[slug]/route.ts
│           ├── leads/route.ts
│           ├── stations/route.ts
│           ├── stations/[id]/route.ts
│           ├── stations/[id]/nearby/route.ts
│           ├── station-issues/route.ts
│           └── webhooks/cms/route.ts
├── components/
│   ├── ui/                                # button, input, dialog, accordion, etc.
│   ├── layout/                            # header, mobile-nav, footer, breadcrumbs
│   ├── marketing/                         # hero, solutions-grid, proof, process, CTA
│   ├── products/                          # product-card, specs, comparison, galleries
│   ├── leads/                             # lead-form, consent, success/error
│   ├── stations/                          # station-card, locator, status, chargers, tariffs
│   ├── map/                               # MapLibre dynamic client map, markers, filters
│   └── content/                           # CMS portable blocks
├── lib/
│   ├── config/                            # environment parsing, feature flags
│   ├── types/                             # products, leads, station, API schemas
│   ├── validators/                        # Zod input and publication validators
│   ├── repositories/                      # pure read/write interfaces
│   │   ├── products.ts
│   │   ├── stations.ts
│   │   └── leads.ts
│   ├── adapters/
│   │   ├── strapi.ts
│   │   ├── postgres.ts
│   │   ├── maps.ts
│   │   └── crm.ts
│   ├── services/
│   │   ├── lead-service.ts
│   │   ├── product-publication.ts
│   │   ├── station-publication.ts
│   │   ├── status-normalization.ts
│   │   ├── tariff-display.ts
│   │   └── geo-search.ts
│   ├── seo/                                # metadata builders, schema data, URLs
│   └── telemetry/                          # events, error/sensitive-field scrubbing
├── db/
│   ├── migrations/                         # append-only numbered migrations
│   └── seeds/                              # dev-only, cannot run in production
├── cms/                                    # Strapi application if monorepo agreed
│   ├── src/api/                            # generated content-type schemas
│   ├── src/components/
│   └── config/
├── scripts/
│   ├── validate-station-csv.ts or .py
│   ├── import-stations-dry-run.ts or .py
│   ├── assert-production-safe.ts
│   ├── smoke-test.ts
│   └── check-links.ts
├── tests/
│   ├── unit/                               # statuses, tariffs, params, product guards
│   ├── integration/                        # repository, lead submit, cms adapter
│   ├── e2e/                                # home, product, lead, optional stations
│   ├── accessibility/                      # automated audits + manual notes
│   └── fixtures/                           # clearly fictional and local-only
├── infra/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── docker-compose.staging.yml
│   ├── nginx/envizon.conf
│   ├── backup/                             # scripts not backup dump files
│   └── monitoring/
├── docs/
│   ├── decision-log.md
│   ├── approved-business-scope.md
│   ├── client-requirements.md
│   ├── product-spec-approval.md
│   ├── content-inventory.md
│   ├── brand-design.md
│   ├── sitemap-routes.md
│   ├── api-contract.md
│   ├── cms-model.md
│   ├── data-provenance.md
│   ├── station-csv-template.csv
│   ├── security.md
│   ├── SEO-and-schema.md
│   ├── testing-matrix.md
│   ├── deployment-runbook.md
│   ├── incident-and-rollback.md
│   └── launch-signoff.md
└── public/
    ├── brand/                              # verified logo only
    ├── products/                           # licensed optimised media only
    ├── illustration/                       # approved original graphics
    └── favicon assets
```

### 14.1 Configuration/engineering file completion criteria

| File group | Non-negotiable contents |
|---|---|
| `README.md` | prerequisites, local run, import/migrate, test, security caveats, data approvals, deployment |
| `package.json` | working scripts `dev`, `lint`, `typecheck`, `test`, `build`, `start`, `test:e2e`, compatibility noted |
| `lib/config/env.ts` | validates environment; rejects production demo fixture, missing site URL, bad secrets/flag combinations |
| `lib/config/feature-flags.ts` | `enableChargerLocator`, `enableProductCompare`, `enableLeadForms`, `enableLiveStatus`, scope and server validation |
| `lib/validators/*` | parse and constrain all incoming request/admin data |
| `lib/repositories/*` | interfaces that isolate data source; no hard-coded mock data in production paths |
| `lib/services/status-normalization.ts` | mapped raw statuses, timestamps, freshness thresholds, unknown fallback |
| `lib/services/product-publication.ts` | specs verification + rights + approval + publication guard |
| `lib/services/station-publication.ts` | proof of source rights, coordinates, approved fields, indexability |
| `app/sitemap.ts`/`robots.ts` | staging/demo index protection and per-record inclusion rules |
| `scripts/assert-production-safe.ts` | fail CI/deploy on unsafe config and unapproved fixtures |
| Dockerfiles | non-root runtime user, multi-stage production build, healthcheck, resource limits |
| Database migrations | versioned schema change, indexes, reversibility strategy, non-destructive updates |
| Test assets | only fictional data clearly marked; no real user contact data |

### 14.2 Local engineering commands (proposed, adjust to actual scripts)

```bash
npm ci
cp .env.example .env.local
# fill only local non-production values; start PostgreSQL/Strapi if enabled
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

On Windows Command Prompt use `copy .env.example .env.local`. Do not call a build successful if dependencies cannot install, DATABASE_URL is unavailable or test suite cannot start. Report blocked verification separately.

---

## 15. SECURITY, PRIVACY, INDIA-SPECIFIC CONTROLS

**This section is an implementation checklist, not legal advice.** Company counsel/compliance owner must confirm current applicable requirements, including India's data protection legislation/rules, telemarketing consent, consumer law, tax rules and EV infrastructure requirements.

### 15.1 Privacy/data handling

- Explain what form fields are collected, why they are needed, who receives them, retention and contact routes.
- Give an accurate, versioned privacy notice; contact consent and marketing consent should be distinguished where appropriate.
- Collect approximate/city location by default; device precise geolocation is opt-in browser permission and is not needed to browse manually.
- Avoid storing exact visitor coordinates unnecessarily. When location is needed for nearby search, minimize logging and retention.
- Provide request/contact process for data correction or deletion where applicable; legal reviewer defines obligations.
- Restrict logs and analytics: no raw phone, email, complete address, GPS coordinate, marketing consent payloads or API secrets in tracking events.
- Verify cookie/analytics rules, vendor DPAs, data residency obligations (if any) with client policy and legal team.

### 15.2 Security controls

- TLS everywhere; HSTS only after verifying subdomains and certificate path.
- Reverse-proxy request-size and timeout limits, rate limiting, bot protection and secure headers.
- Strong CMS/admin RBAC, MFA where supported, network restriction for database and admin interfaces.
- Rotate credentials; secret scanning; no shared developer superadmin account; audit privileged updates.
- Parameterized SQL, output encoding, safe HTML rendering, uploaded file scanning and media restrictions.
- Strict CORS for APIs; appropriate CSRF protection based on auth mode; signed CMS webhooks with timing-safe verification.
- Server-only integration calls, request timeouts, circuit breakers, minimal API scopes.
- Patch process for dependencies, OS, DB and CMS; security testing prior to go-live.
- Encrypted backups, defined recovery time and recovery-point targets, restore drill and incident contacts.
- Separate staging and production accounts, databases, CMS tokens and email/CRM targets.

### 15.3 Domain and legal content

Before publishing: registered business entity, address, legitimate support contacts, approved Terms and Privacy Policy, permitted intellectual property, sales/disclaimer wording, warranty/returns terms (if sales), tax disclosures, partner terms, financing/ROI disclaimers. Manufacturer certifications must be proven and accurately scoped to product/model/version.

### 15.4 Safety and regulated technical claims

- Product model spec, OCPP capability, standards like IEC, IP/IK ratings and electrical protection features require datasheet/certificate proof for exact SKU.
- Installation guidance is marketing summary, not a substitute for licensed qualified electrical design and safety assessment.
- Charging compatibility should not be promised across EV models without confirmed connector, voltage/current and protocol support.
- Investment returns and franchise income should never be calculated from creative marketing imagery.

---

## 16. SEO, STRUCTURED DATA AND CONTENT QUALITY

### 16.1 SEO acceptance

- Server-render public H1, title/meta description, canonical, OG metadata and indexable primary copy.
- Dynamic product/solution/city/station route metadata produced via approved content, never generic placeholder metadata.
- `robots.txt` disallows private/admin API routes as appropriate, but sensitive information is protected by authentication regardless of robots rules.
- Dynamic sitemap includes only public approved pages; no drafts, deleted resources, demo records, staging or duplicate filter URLs.
- Schema.org: use `Organization`, `WebSite`, `BreadcrumbList`, `Product` (only product details substantiated), `FAQPage` only where valid, and suitable place/charging-site schema only when fields are accurate and supported. No fake aggregate rating or non-existent offers.
- Product spec FAQ and city content must be original and accurate, not template-generated filler.
- Clean redirects for legacy site migrations and product slug changes; 404 and canonical tests.
- Images: descriptive names and alt, WebP/AVIF where viable, responsive sizes, right loading priority.
- Marketing content owners should sign off copy and SEO claims; implement editorial review before publishing.

### 16.2 Page content ownership matrix

| Page | Content owner | Engineering dependency | Indexability |
|---|---|---|---|
| Home | marketing + founder | approved brand/copy/assets | yes only when finished |
| Charger catalogue | product owner | verified SKU records | only published list |
| Product detail | product/technical owner | signed specifications | approved individual product only |
| Solutions | sales/operations | actual service scope | approved service only |
| Partners | business owner/legal | programme terms | only with approved program |
| Contact | sales/admin | live routing and privacy | yes |
| Stations/cities | station data owner | publication pipeline and source rights | approved records only |
| Articles/case studies | editorial/legal | proof and assets | per-entry approval |

### 16.3 Event analytics (names proposed)

`hero_primary_cta_click`, `charger_filter_applied`, `product_detail_view`, `product_compare_open`, `quote_form_start`, `quote_form_submit_success`, `quote_form_submit_failure`, `brochure_download`, `partner_form_start`, `partner_submit_success`, `locator_search`, `locator_filter`, `station_detail_view`, `station_directions_click`, `station_issue_submit`. Never send names, phone numbers, email or raw user GPS to analytics; attribution must respect consent settings.

---

## 17. QA TEST MATRIX AND FAIL-SAFE SCENARIOS

### 17.1 Required automation

**Unit**

- Env config refuses `ALLOW_DEMO_DATA=true` in production and refuses live status without adapter config.
- Price publication refuses missing tax/date/approval, and `Request a quote` fallback works.
- Connector vs charger aggregation yields correct distinct counts.
- Stale/unknown/contradictory statuses always normalize to `UNKNOWN`, not `AVAILABLE`.
- Position parsing proves `longitude,latitude` vs `latitude,longitude`; out-of-range fails.
- Tariff renderer never displays bare ₹ amounts without units and approval.
- Input sanitization and form validation handle bad length, invalid phone/email and unexpected fields.
- URL slug/canonical, sitemap filtering and non-public draft exclusions work.

**Integration**

- Strapi publish → correct page update, cache revalidation and draft non-exposure.
- Lead submit → DB persistence → notifier queued → retries do not create duplicates.
- CSV dry-run → correct row error report → admin approval → public read; rollback successful.
- Station radius/bbox filters and sorted pagination correct with PostGIS.
- Permission test: public request cannot access unpublished product, private lead or admin record.
- Map tile/provider outage leaves text alternative and station list usable.
- Invalid CMS webhook secret rejected; repeated accepted events idempotent.

**E2E**

1. Desktop: Home → product listing → product page → quote form → success state.
2. Mobile: open menu, navigate solutions, submit partner enquiry, keyboard/validation.
3. Compare two approved products; absent specs marked unknown, not `0`.
4. Production-like no dataset → stations link removed and endpoint protected/no demo content.
5. With staging approved fixture dataset only → station search → select → directions, city/detail links; no staging indexing.
6. Block unsupported `Start Charging`, `Reserve`, `Pay`, `Download App` buttons/routes.
7. Simulate upstream API unavailable and stale telemetry; availability is unknown.
8. Verify search works without geolocation permission.
9. Verify headings, keyboard navigation, focus, screen reader labels, touch targets, reduced-motion.
10. Verify `robots`, sitemap, canonical, OG/social preview in staging and launch config.

### 17.2 Browser/device matrix

Chrome desktop and Android, Safari on iOS and macOS (where accessible), Edge desktop, Firefox desktop. Test small viewport, low-end Android/network throttling, low-memory devices, text scaling to 200%, image failure, JS disabled for static marketing content, 3G/slow 4G, RTL only if future locale demands.

### 17.3 Performance and failure budgets

- Measure home, product listing, product detail, station search and station detail separately. Defer MapLibre bundle until locator route is visible/required, not on all pages.
- Prevent oversized carousel/video assets; fonts preloaded carefully with fallbacks, responsive images and lazy media.
- Database spatial indexes, bounded queries, cache published read endpoints and enforce cache invalidation on changes.
- Alert on elevated API error, lead delivery queue, CMS outage, prolonged feed staleness, station import errors and storage/backup failures.
- Never show unverified “operational” green badge in an API failure scenario.

---

## 18. DEPLOYMENT / LAUNCH RUNBOOK

### 18.1 Environment architecture

```text
Production HTTPS domain
  └─ nginx or CDN reverse proxy
       ├─ Next.js web container (read-only runtime where practical)
       ├─ Strapi content service (admin access restricted)
       └─ private network PostgreSQL/PostGIS database

Monitoring, backups, approved email/CRM, licensed tile provider

Separate STAGING DNS, DB, CMS, secrets, CRM and noindex settings
```

An ultra-cheap VPS might not comfortably host both Strapi and Next.js and PostGIS with backups. Size infrastructure from measured baseline CPU/RAM, image storage and traffic, not a promise that all services can run free. Managed DB/object storage may reduce maintenance but can incur subscription charges. Keep 20–30% contingency in resource planning; validate costs with providers at procurement time.

### 18.2 Staging deployment steps

1. Obtain deployment owner, DNS control, source-repo access and approved architecture.
2. Provision separate staging DNS/TLS, PostgreSQL/PostGIS and CMS; disable indexing and outbound production messaging.
3. Build Docker images, run migrations, apply secrets via deployment secret store.
4. Import only permitted test/development data and stage approved actual content separately.
5. Configure CSP/security headers, rate limits, logs, backups and storage retention.
6. Test all route categories, forms, map/list, CMS publishing/revalidation, product approvals.
7. Rehearse database/content backup restoration and rollback to prior image.
8. Hand staging acceptance checklist to client; record approvals and blockers.

### 18.3 Production go-live sequence

1. Freeze approved content and product prices/specs, stamp revision and approving persons.
2. Confirm domain, SSL, email sender, contact form recipient, privacy, terms and assets rights.
3. Run CI `lint`, `typecheck`, `test`, `build`, `e2e`, security checks; capture results.
4. Snapshot database and CMS assets. Run backward-compatible migration.
5. Deploy web/CMS; smoke-test health, home, products, forms, redirect, sitemap and robots.
6. Confirm PRODUCTION does not use mock station records; station flags remain off unless licensed network signed off.
7. Enable search indexing only for approved pages; submit sitemap to search tools.
8. Validate analytics without PII, real sales notification deliverability and error tracking.
9. Watch critical metrics, lead submissions, broken links and 5xx for launch period.
10. Publish launch report, known limitations, credentials ownership, rollback contact and maintenance schedule.

### 18.4 Rollback rules

Rollback frontend image and CMS content to a known revision if critical UX/legal/data error occurs. Prefer forward-fix for irreversible DB migrations; rehearse DB restoration before proceeding. If station data rights are revoked or status feed compromised, **disable locator/live status server-side immediately** and remove affected URLs from the published dataset/sitemap. Preserve compliant evidence logs privately.

---

## 19. PHASED TASK BREAKDOWN FOR CLAUDE (EXECUTE IN ORDER)

### PHASE 0 — AUDIT, DISCOVERY AND SIGN-OFF (do not skip)

- [ ] Inspect repo and package file tree; describe existing code and dependencies.
- [ ] Read this document fully; create `docs/decision-log.md` with `APPROVED`, `OPEN`, `BLOCKED` statuses.
- [ ] Create content/source provenance table; review four decks and separate Envizon from other brands.
- [ ] Client meeting: confirm business model, offers, product rights and priority pages.
- [ ] Confirm true official logo, color tokens and media usage rights; check brand claim wording.
- [ ] Confirm product list, SKU, technical data source and pricing approval.
- [ ] Confirm forms/CRM/email targets, privacy/terms owner, domain, hosting and support.
- [ ] Answer station-data/CSMS question: approved locator enabled **yes/no**.
- [ ] Produce final sitemap, page inventory, component inventory, database needs and acceptance criteria.

**Gate 0 success:** approved feature list, data rights, lead destination, contact/privacy content and delivery owner. If unresolved, create preview/prototype only, not production business claims.

### PHASE 1 — FOUNDATIONS / DESIGN SYSTEM

- [ ] Audit current Next.js starter and preserve existing working behavior.
- [ ] Configure typed environment schema and production safety guard script.
- [ ] Establish tokens, fonts, containers, buttons, inputs, accordions, modals, loading/error states.
- [ ] Build semantic desktop and mobile header/footer, nav, contact CTA, breadcrumbs and SEO defaults.
- [ ] Ensure responsive accessibility and reduced motion.
- [ ] Establish testing structure and CI quality gates.

**Gate 1:** shell responsive and keyboard functional, guard tests passing, staging noindex.

### PHASE 2 — CORPORATE PAGES / PREMIUM UX

- [ ] Build home sections in `§5.1` with approved copy/placeholders clearly tagged `NOT APPROVED` in dev.
- [ ] Build solutions landing and only approved solution details.
- [ ] Build about and contact pages; accessible form UX.
- [ ] Integrate original licensed charger imagery and optimize assets.
- [ ] Add subtle verified GSAP/CSS animations without harming usability.
- [ ] Implement mobile/tablet QA.

**Gate 2:** all public CTA destinations real and approved; no dummy proof/metrics.

### PHASE 3 — CHARGER PRODUCTS / CMS

- [ ] Set up Strapi with product/variant/spec/asset/approval collections.
- [ ] Implement draft SKU cards, catalogue filters, details and comparison.
- [ ] Create product spec approval fields and evidence storage.
- [ ] Build `Request a quote` lead journey; data persists and routes to approved recipient.
- [ ] Add technical datasheet/brochure downloads only with verified permissions.
- [ ] Test publication guards, missing-price fallback and invalid technical claims.

**Gate 3:** at least one *client-approved* SKU can be published accurately (or site transparently offers general charger consultation if none).

### PHASE 4 — B2B PARTNERS / LEAD AUTOMATION

- [ ] Build partner and site-assessment flows, conditional on actual programmes.
- [ ] Segment leads by interest and geography; add consent and abuse protection.
- [ ] Approved CRM/email delivery with retries, monitoring and role-based access.
- [ ] Instrument form funnel events without leaking identity.

**Gate 4:** end-to-end tested lead receipt and operational owner acknowledges response process.

### PHASE 5 — VERIFIED LOCATOR (CONDITIONAL)

- [ ] Confirm rights, actual station dataset and data steward; otherwise mark entire phase BLOCKED.
- [ ] Create/fix PostGIS schema, import dry-run, duplicate detection and approval flow.
- [ ] Implement station repository and public read contract; no production fixtures.
- [ ] Build MapLibre list/map, search, filters and linkable detail pages.
- [ ] Add city pages, nearby results, status freshness, accurate tariffs, issues and SEO.
- [ ] Test provider outages, browser geolocation denied, stale feed and count/status consistency.

**Gate 5:** signed station sample coverage, valid rights, correct data, approvals, no false real-time claims.

### PHASE 6 — SEO, SECURITY, PERF, LAUNCH

- [ ] Product/solution metadata, canonical, OG, sitemaps, structured data.
- [ ] Review privacy, policies, public technical claims, product prices and franchise content.
- [ ] Run device/accessibility/performance and vulnerability tests.
- [ ] Deploy staging, perform UAT, backup/restore, incident drill.
- [ ] Final production go/no-go check; monitor and hand over.

**Gate 6:** signed checklist; production success metrics and maintenance owners assigned.

### PHASE 7+ — OPTIONAL VERIFIED OPERATIONS

- [ ] API/CSMS/OCPI integrations under separate signed scope.
- [ ] Live status and SLA, registered users, booking and payments **only** with authentic backend and business process.
- [ ] Independent reconciliation/security/compliance tests prior to real charging session control.

---

## 20. TASK OUTPUT FORMAT CLAUDE MUST USE

For **every** implementation milestone, Claude responds with:

```text
TASK / MILESTONE:
DECISION STATUS: Approved | Proposed | Blocked
WHAT EXISTS IN REPO: [precise files/features]
WHAT CHANGED: [file paths + short descriptions]
CLIENT FACTS USED: [document and verified source]
OPEN QUESTIONS: [owner, why it blocks publication]
SECURITY / PRIVACY IMPLICATIONS:
TEST COMMANDS AND ACTUAL OUTCOMES:
ACCESSIBILITY / RESPONSIVE NOTES:
KNOWN LIMITATIONS:
NEXT SHORTEST SAFE STEP:
```

**Claude must not** claim a working CSMS connection or approved catalogue merely because a card renders, a seed row exists or a presentation says `OCPP 1.6J`.

### 20.1 Agent roles (logical workstreams, even if using one Claude session)

- `scope-auditor`: check materials, repo and unresolved commercial decisions.
- `ux-architect`: page structure, user journeys, responsive components and a11y.
- `brand-designer`: tokens, layout, motion and original assets.
- `fullstack-engineer`: Next.js, CMS, form API, DB and tests.
- `data-integrity-reviewer`: station/product sources, rights, price/status accuracy.
- `security-reviewer`: headers, auth, secret hygiene, privacy, deployment.
- `qa-release-manager`: automated/manual test matrix and go/no-go checklist.

Never let a creative UI agent mark its own generated product claims `APPROVED`.

### 20.2 Initial prompt to paste into Claude after attaching this file

> You are the principal product architect, designer, and lead full-stack engineer for Envizon EV Solutions. Read `ENVIZON_EV_CLAUDE_MASTER_BLUEPRINT.md` completely. First inspect the current repository. Do not change code yet. Produce (1) repository implementation gap audit vs the blueprint, (2) priority decision register with approval/blocker labels, (3) a precise target file tree based on the real repo, (4) a six-milestone execution plan with page-level and backend acceptance criteria, and (5) a list of client-supplied facts/assets required before publishing. Treat the Envizon PPTX material as unverified brochure data, not authoritative technical certification. Keep Axonify/Joulepoint/Thunder separate. Statiq is a functional reference only. Default the station finder to off until verified licensed station data exists. Once I approve the audit and scope, implement only milestone 1 with working tests; stop and report.

### 20.3 Follow-up prompt — Phase 1 shell

> Implement the approved Phase 1 design system and global site shell only, in the existing Next.js repo. Use original green/white Envizon direction and create complete desktop/tablet/mobile header, navigation, footer, page containers, design tokens, accessible components, environment guards and basic metadata. Do not publish unverified charger specs, station listings or fake testimonials. Run the actual lint, typecheck, test and build commands and report outcomes, touched files and screenshots/test notes. Stop after the shell is demonstrably correct.

### 20.4 Follow-up prompt — product and quote workflow

> Implement the approved charger collection and product detail pages with typed product contracts, publication approval status, brochure-safe specifications and server-side quote enquiry. If no signed product specs are supplied, render explicit dev fixtures in non-production environments only and require client approval for public publish. Integrate Strapi draft/publish content and route approved leads to the configured destination. Include mobile UX, validations, unit tests and form integration tests. Do not copy prices from the slides into production.

### 20.5 Follow-up prompt — conditional locator

> Do not begin until the decision register shows an approved, licensed station dataset. Implement the verified PostGIS station repository, dry-run importer, review/publish workflow, MapLibre map/list, city pages and detail pages. Do not use Statiq data. Explicitly distinguish station opening hours, connector status and data freshness. Public routes and sitemap must exclude all fixtures/unapproved records. Run geospatial, status, accessibility, mobile and end-to-end tests.

---

## 21. CLIENT DISCOVERY / DECISION REGISTER — BRIDGE TO 227-QUESTION LIST

The previous conversation contains a **227-question** detailed intake across 17 groups. The following matrix makes this blueprint traceable to those questions, preserves gating priorities and supplies the exact artefacts to request. Do not mark a group resolved because a brochure happens to mention a feature.

| Original questionnaire numbers | Topic | Approval artefact / answer required | Blocks |
|---|---|---|---|
| 1–12 | Business and operational identity | official company, owned services, measurable primary site goal, differentiators | sitemap/claims |
| 13–22 | Audience and journeys | persona priority, B2B/B2C, devices, registration, public station vs sales | homepage IA |
| 23–35 | Site hierarchy | signed page list and launch phase split | routes/UI |
| 36–50 | Station source rights/data | verified approved station file/feed, IDs, geo, media/publication permissions | all locator publication |
| 51–62 | Map/locator | map/list, filters, providers, geolocation consent, routing scope | locator UI/provider costs |
| 63–78 | Station details | required fields, ports, tariffs, amenities, reviews, support | station template |
| 79–92 | Real-time & charger connectivity | CSMS/OCPI agreements, live status semantics, timestamps, API creds | live status only |
| 93–105 | User identity/bookings | authentication, driver profile, reservations, sessions, app links | Phase 3 |
| 106–118 | Payments/tax/refunds | PSP, merchant of record, legal tax and settlement workflow | Phase 3 |
| 119–131 | Commercial/partners/leads | actual sales offers, funnel fields, routing owner, franchise rules | all B2B funnels |
| 132–145 | Brand/UI and assets | final official logo, colours, fonts, photo licenses, animation references | visual approval |
| 146–158 | CMS/admin | editors, roles, publication stages, lead handling, bulk intake | CMS design |
| 159–174 | APIs/hosting/ownership | domain, existing systems, access, budgets, vendor credentials | backend/deployment |
| 175–186 | Legal/privacy/security | approved notices, controller, rights, data handling and review | public launch |
| 187–200 | SEO/marketing | target markets, content owner, index scope, analytics | SEO and CMS |
| 201–215 | QA/go-live/maintenance | date, budget, supported devices, UAT approver, SLAs/owner | launch |
| 216–227 | Assets/access/signoff | logo, station data, brochure, API docs, credentials, policies, owner, exclusions | implementation kickoff |

### 21.1 Immediate P0 client decisions (ask BEFORE any final Figma/code)

- [ ] What is Envizon EV's exact legal and public business identity?
- [ ] Are its primary actual offers charger **sales**, **installation**, **franchise/partnership**, **station network**, **software CMS** or some combination?
- [ ] Who owns the chargers and which catalogue SKUs can legally be sold under Envizon branding?
- [ ] Is the green Envizon logo final, and can official vector/source files be supplied?
- [ ] Are 60/120/240/360/480 kW power classes approved products, prototype visuals or broad illustrative offerings?
- [ ] Obtain exact signed 60, 120 and 240 kW datasheets; resolve 120 kW vs 60 kW power/current contradictions.
- [ ] Confirm product prices, GST/tax inclusion, currency, installation costs, geography, issue date and permission to advertise, or use quote-only pricing.
- [ ] Are the advertised CMS, 24/7 technical support, roaming and warranty benefits contractually real for each product?
- [ ] Which audiences/products and conversion actions are the two most important?
- [ ] Does Envizon EV have public stations and publishable rights? If no: confirm station finder disabled at launch.
- [ ] Who owns B2B form submissions and what is the reachable verified sales contact?
- [ ] Are there customer projects, partnerships, ratings and testimonials with written permission?
- [ ] What does the actual franchise/partner programme offer and what brochure is current?
- [ ] Who owns legal policies, domain/hosting accounts, CRM and technical integrations?
- [ ] What is the launch deadline, budget and final sign-off chain?

### 21.2 Formal decision register record format

```md
| ID | Question / Decision | Status | Default | Owner | Evidence | Approval date | Affected features |
| D-001 | Does Envizon own a public station network? | OPEN | Locator OFF | Client operations | none | — | /stations* |
| D-002 | Can product prices be published? | OPEN | Quote-only | Client commercial | unverified brochure | — | /chargers* |
| D-003 | Is Envizon logo final? | OPEN | Provisional token design | Brand owner | slide imagery | — | all pages |
| D-004 | CRM destination and consent copy? | OPEN | Dev sink only | Sales+legal | none | — | forms |
| D-005 | Approved 120 kW technical datasheet? | OPEN | No numeric public specs | Technical owner | presentation only | — | product detail |
```

Every disputed specification must receive a record here before a developer turns it into production text or a database fact.

---

## 22. CLIENT ASSET / ACCESS HANDOVER CHECKLIST

**Brand and content**

- Official logos SVG/PNG, brand colours/typeface permissions, company mission/tagline; approved copy; images, licensed renders, videos; exact legal details and public contact channels; privacy/terms; authorisation for social logos and customer partners.

**Products and services**

- Product catalogue Excel (one row per SKU/variant), signed technical PDFs, certified standards statements, available connectors/output configurations, pricing policy, warranty/service agreement, installation scope, shipping/returns policy and product media rights; approved service descriptions.

**Partnerships and leads**

- Actual partner/franchise programme contract/summary, eligibility criteria, brochure permissioned assets, disclaimer, sales owner, email/CRM destination, customer acknowledgement and SLA; testing contacts.

**Station network if offered**

- Stations CSV/API contracts, licence to publish, stable IDs, address, lat/lng, access/hours, charger/connector specifications, current tariffs/tax units, amenities, photos and owner consent, verification schedule, issue handling contact. If live: CSMS/OCPI provider, API spec, sandbox, version mapping, freshness semantics and legal agreement.

**Infrastructure**

- Domain registrar and DNS access via secure delegation, hosting account, repository ownership, approved budget for VPS/db/map tiles/mail/monitoring, technical contact, company email sender, DNS records and previous site redirect list. Share credentials securely—not by pasting secrets into this Markdown file or chat.

---

## 23. COST SCOPE / DELIVERY ESTIMATES (PROVISIONAL, NOT CLIENT QUOTE)

Costs vary with creative asset production, content maturity, approval cycles and real integrations. Use a statement of work rather than treating dates as commitments.

| Workstream | Complexity | Dependencies | Commercial risk |
|---|---|---|---|
| Corporate website + responsive premium design | Medium | approved copy and assets | many review iterations |
| Product catalogue and details | Medium | signed SKUs and media | spec and pricing conflicts |
| B2B lead pipeline and CMS | Medium | CRM, admin roles, consent | deliverability, data privacy |
| Basic verified station locator | Medium–high | licensed station data, spatial DB, map provider | data quality and map usage costs |
| Live connector data | High | CSMS/OCPI contract and sandbox | device status semantics, outages |
| Reservation/session/payment | Very high | secure authenticated business operations | transactions, disputes, safety |

**Budget categories to request:** one-time design/build, professional copy/media, CMS/data ingestion, hosting/database/storage, map tiles/geocoding/routing, email/WhatsApp/CRM/API usage, monitoring, legal compliance, security testing, maintenance and contingency. Never promise zero map/hosting costs because MapLibre itself is open-source; tiles and infrastructure may cost money.

---

## 24. LAUNCH ACCEPTANCE — FORMAL GO / NO-GO

### GO if all critical checks are YES

- [ ] Signed Phase 1 deliverables and exclusions; domain and hosting ownership documented.
- [ ] Public business claims and logo approved; no non-Envizon materials used without rights.
- [ ] Every live product has verified SKU/specification; prices approved or replaced by `Request a quote`.
- [ ] Every live solution/franchise claim matches actual offered services and approved terms.
- [ ] All submitted forms persist, notify a real owner, use consent and abuse protection.
- [ ] No sample/random network statistics, made-up partner logos, testimonials, maps or station listings.
- [ ] Stations feature is OFF unless approved station records, source rights and QA exist.
- [ ] Live availability OFF unless a working, tested CSMS/partner data adapter exists.
- [ ] No operational `Book`, `Pay`, `Start charging` feature without separate approved system.
- [ ] Correct privacy/terms/legal documents and support contacts are published.
- [ ] Public routes load on supported devices and pass manual accessibility checks.
- [ ] SEO metadata/canonicals/sitemap/robots correct; staging and demo excluded.
- [ ] Dependency, security, form, geospatial and unit tests actually executed with evidence.
- [ ] Performance and monitoring reviewed, errors alert to named owners.
- [ ] Database/media backups, restoration and rollback rehearsed.
- [ ] Client UAT approved and post-launch maintenance responsibilities assigned.

### Automatic NO-GO triggers

- A mock record, map point, price or invented capability would become public fact.
- Product certification, support guarantee or franchise return is unapproved.
- Payment/session action exists without real backend validation and operational controls.
- User lead data is emailed/logged to an unverified recipient or not durably stored.
- Staging/demo URL is indexable or secrets are present in client JS/repo.
- Public station feed licence missing or source data is known contradictory.
- Domain/SSL/backup or security-critical deployment prerequisite fails.

---

## 25. SOURCES, EVIDENCE REVISIT LINKS AND TERMINOLOGY

### User-provided files (source material; do not rebrand non-Envizon assets)

1. `Envizon_EV_Solutions_Reordered_Full_Images.pptx` — two image-based slides; Envizon identity, 120 kW product poster and range/partner marketing poster.
2. `Axonify_EV_Charging.pptx` — two image-based Axonify comparison slides.
3. `Joulepoint_EV_Charging.pptx` — two image-based Joulepoint comparison slides.
4. `Thunder_EV_Chargers_Merged.pptx` — four slides: individual Thunder 60/120/240 kW spec cards and range poster.
5. The conversation's earlier 227-question client discovery list, master blueprint and Phase 1 starter deliverable. Treat the earlier documents as baseline guidance; **this v2 blueprint supersedes the earlier directory-first business priority unless the client confirms otherwise**.

### External reference and implementation documentation (checked October 2026)

- Statiq site: https://www.statiq.in/ — public IA for corporate solutions, products and app/partner CTAs.
- Statiq charger locator: https://www.statiq.in/ev-charging-station — map/list discovery and descriptive information.
- Statiq supplied station page: https://www.statiq.in/jai-balaji-motors-ev-charging-station-id-16155?longLat=79.551658,25.575322 — only functional reference; no content scraping/republication.
- Next.js App Router: https://nextjs.org/docs/app
- Next.js metadata: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Next.js sitemap: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- Next.js robots: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
- Next.js route handlers: https://nextjs.org/docs/app/getting-started/route-handlers
- Strapi Draft & Publish: https://docs.strapi.io/cms/features/draft-and-publish
- Strapi content types: https://docs.strapi.io/cms/features/content-type-builder
- MapLibre GL JS: https://maplibre.org/maplibre-gl-js/docs/
- Open Charge Alliance OCPP overview: https://openchargealliance.org/protocols/open-charge-point-protocol/
- OCPP versions/specs: https://openchargealliance.org/my-oca/ocpp/

### Glossary

- **CPO:** Charge Point Operator; operator of charging infrastructure.
- **eMSP:** E-mobility service provider; offers driver-facing access/services.
- **CSMS/CPMS:** charging management system; backend operational control platform.
- **OCPP:** charger↔CSMS communications protocol; not a consumer website payment API.
- **OCPI:** inter-provider data exchange/roaming protocol, subject to agreements.
- **AC/DC:** charger current types; not equivalent to station availability.
- **kW/kWh:** charging power versus delivered energy; never interchange in tariffs.
- **CCS2/Type 2/CHAdeMO:** connector types with differing capabilities.
- **PostGIS:** geospatial extension to PostgreSQL for efficient radius/distance queries.
- **CMS:** content-management system for editorial content, distinct from CSMS.
- **ISR/RSC:** Next.js revalidation/server component mechanisms, not a substitute for verified data.
- **Canonical:** authoritative search-indexable URL for a resource.
- **UAT:** user acceptance testing by the actual client.
- **P0/P1/P2/P3:** ordered development phases, not claims of completion.

---

## APPENDIX A — COMPLETE 227-QUESTION SELF-CONTAINED INTAKE


These questions reproduce the *coverage* of the earlier 227-point discovery process in shortened standalone wording. They are not verified answers. Record each response in the decision register with owner, evidence, approval date and build consequence.


### A. Company and business foundation (Q1–Q12)


1. What is the primary actual business model: operator, installer, OEM, software, aggregator or mixed?

2. Does Envizon own stations, operate third-party sites or only display directories?

3. What are the official legal and public brand names?

4. Which geographies are served today?

5. Is the business operating or preparing to launch?

6. Which products and services are currently offered?

7. Which services are planned in the next 6–12 months?

8. Who are the direct commercial competitors?

9. Which approved reference websites matter besides Statiq?

10. What is the provable differentiation?

11. What are the website's main business objectives?

12. What metric defines success at first launch?



### B. Target audience and journeys (Q13–Q22)


13. Who are the primary personas: drivers, property owners, fleet, businesses or government?

14. Will the site serve both B2C and B2B?

15. Are targets city-level, state-level, nationwide or international?

16. Which EV vehicle classes should be supported?

17. Must public visitors browse without sign-in?

18. Should visitors discover chargers or manage charging sessions?

19. Is navigation to a station a core conversion goal?

20. Will businesses enquire about installation?

21. Will site owners apply to host chargers?

22. Will fleet operators have a dedicated enquiry journey?



### C. Site map and page inventory (Q23–Q35)


23. Which pages are mandatory for launch?

24. Should the brand have a full corporate marketing homepage?

25. Is an interactive Find a Charger route required?

26. Does each verified station need a unique shareable page?

27. Are indexable city/state directory pages required?

28. Are charger equipment product detail pages required?

29. Are home, commercial, fleet and installation solution pages needed?

30. Are About, Careers, Blog, Contact and FAQ pages needed?

31. Are franchise, investment or site-host pages required?

32. Do calculators for charging savings, cost or ROI have approved inputs?

33. Should the site link to mobile apps, and are live app-store URLs available?

34. Which pages are deferred to Phase 2/3?

35. Who signs off the final sitemap?



### D. Station database, ownership and rights (Q36–Q50)


36. How many station records does Envizon own or have rights to publish?

37. How many real stations can be published at launch?

38. Which cities/states have verifiable active sites?

39. Is the source an approved Excel sheet, API, CSMS or database?

40. Can the client supply stable station IDs, full addresses and checked coordinates?

41. Who owns and maintains the station catalogue?

42. Are sites public, captive, restricted or private?

43. What are operating hours, holiday hours and access rules?

44. Which operators/partners own supplied data?

45. Can legal rights to publish photos, status, tariff and station info be proved?

46. How are newly installed sites introduced?

47. How are duplicate, inactive, relocated and closed sites handled?

48. Who verifies coordinates, hardware specifications and prices?

49. What update cadence can be guaranteed?

50. Does a named publisher approve every new station?



### E. Locator and map behaviour (Q51–Q62)


51. Should all permitted sites appear in an interactive map?

52. Can people search by name, city, postal code, area and landmarks?

53. Should the browser request geolocation on explicit user action?

54. What is the fallback after location permission is denied?

55. Should desktop show synced map and result list?

56. Which filters are mandatory: connector, AC/DC, power, price, access, status?

57. Which sort orders are desired: distance, power, status, rating?

58. Should markers communicate station/charger categories or operational status?

59. Should marker selection open a concise site preview?

60. Which external navigation apps or links should be supported?

61. Are straight-line and actual road distances clearly differentiated?

62. Is full route/trip planning in scope or deferred?



### F. Station detail pages (Q63–Q78)


63. What exact fields must every public station page display?

64. Should all sites have immutable IDs and stable canonical URLs?

65. Is verified map location/address and a directions CTA required?

66. Should each actual charger have a unique public identifier?

67. Should model, AC/DC, kW and connector type be shown separately?

68. Should station charger count, connector count and availability count be distinct?

69. Are tariffs charged per kWh, time, session or differently?

70. What tax, parking, idle and other fee disclosures are required?

71. Can entrance, station and parking photos be licensed for publication?

72. Which amenities and accessibility information can be confirmed?

73. What public/captive/access restrictions need to be visible?

74. What verified operating hours and support contact should be listed?

75. Should nearby stations be presented based on actual distance?

76. Are real moderated and licensed reviews available?

77. Should station-specific FAQs be manual, derived or omitted?

78. Can customers report incorrect or outdated station information?



### G. Charger telemetry and live status (Q79–Q92)


79. Is a real CSMS/CPMS operating today?

80. Which charger makes/models are installed?

81. What precise OCPP versions/profiles are implemented?

82. Is there an authorised status/telemetry API?

83. Is a contracted OCPI or roaming API available?

84. Does the backend provide trustworthy per-connector live status?

85. What refresh rate is permitted and affordable?

86. What raw and mapped status values exist?

87. What timestamp/freshness threshold makes data stale?

88. May the website show last updated time and confidence?

89. Can port-level output and simultaneous charging be verified?

90. How are outages and maintenance states sent or edited?

91. Should these details be public or internal only?

92. Who resolves discrepancies and operational incidents?



### H. Identity, booking, charging sessions (Q93–Q105)


93. Is user registration required at launch?

94. If yes, which verified authentication methods are allowed?

95. Can users save favourite stations?

96. Should customers save vehicle details?

97. Will compatibility data come from a confirmed source?

98. Are charging time-slot reservations operationally supported?

99. What are booking, cancellation and expiry policies?

100. Can web users start/stop real sessions through approved APIs?

101. Will power, energy, duration and cost be shown live?

102. Is driver charging history required?

103. Are customer invoices/receipts part of the website?

104. What messaging channels and opt-in are available for session alerts?

105. Which functions already exist in a real backend versus requiring greenfield work?



### I. Payments, tariffs and reconciliation (Q106–Q118)


106. Are charging payments on the website in launch scope?

107. Does a production payment platform already exist?

108. Which supported payment methods are required?

109. Which payment provider/contracts and test credentials are available?

110. Who sets tariffs by network/site/charger?

111. Are there parking, idle, minimum, reservation, subscription or discount charges?

112. Who is merchant of record for each sale or session?

113. What invoice/GST/legal-entity fields are mandatory?

114. How are stopped/failed sessions, incomplete transactions and refunds handled?

115. Are wallets, loyalty, enterprise billing or coupons needed?

116. How does the backend verify payment before a success state?

117. What settlement/reconciliation/reporting is needed?

118. Who owns payment disputes and support?



### J. Commercial, installation and partners (Q119–Q131)


119. Which verified premises/installation services are actually sold?

120. Which products/services need quote journeys?

121. Should leads request a feasibility visit?

122. What site/power/parking/budget details should applicants submit?

123. Is a legally defined franchise/revenue sharing programme active?

124. Can the company substantiate any investment/ROI calculator?

125. Is fleet/enterprise charging offered and under what scope?

126. Which approved PDFs/datasheets/brochures are downloadable?

127. Where should enquiries be sent and durably stored?

128. Which person/team owns follow-up?

129. Are lead categories, assignments and statuses required?

130. What follow-up reminders/SLA are expected?

131. What minimum data should forms request with appropriate notice?



### K. Brand, design and motion (Q132–Q145)


132. Is the supplied Envizon logo final and authorised?

133. What approved brand colours, fonts and design guidelines exist?

134. Should the visual direction feel premium, corporate, futuristic or utilitarian?

135. Which aspects of Statiq are functional inspiration versus excluded as visual copies?

136. Which other section references have client approval?

137. Should the primary UI be light, dark or hybrid?

138. What approved hero message and headline should lead the site?

139. Which authentic product/site/team images can be supplied?

140. Which approved renders, videos or 3D models exist?

141. Are hero video and scroll animation within desired scope?

142. What GSAP intensity is acceptable without harming task usability?

143. Should mobile driver discovery or mobile sales enquiries take priority?

144. What languages, accessibility and device support are required?

145. Who approves Figma UI, motion and responsive outcomes?



### L. CMS/admin and operations (Q146–Q158)


146. Does the client need non-developer station/product CMS editing?

147. Who will administrate daily content?

148. How many role tiers/staff accounts are expected?

149. Who can create/edit/deactivate/publish stations?

150. Which changes require independent approval?

151. Who maintains product power, connector, tariff and service metadata?

152. Are prices/statuses API-controlled rather than manually CMS-edited?

153. Can editors manage marketing pages, FAQs and articles?

154. Should staff see leads in an admin dashboard?

155. Is editor action history required?

156. Is self-hosted Strapi Community acceptable to the client?

157. Who maintains CMS upgrades, permissions, DB and backups?

158. Are bulk imports, exports and source sync required?



### M. Infrastructure, API and hosting (Q159–Q174)


159. Is the final domain owned and available?

160. Who controls registrar and DNS?

161. What existing website/app must be preserved or integrated?

162. Where are any current applications hosted?

163. Are real backend APIs already available?

164. Which existing databases must be reused?

165. Where are real charger/station records currently stored?

166. Can the client provide API specs, sandbox and integration ownership?

167. Are open-source/third-party hosting tools restricted by policy?

168. What cloud/VPS provider, region and cost budget are approved?

169. Which licensed map tile/geocoding/routing provider is selected?

170. Are required map/data usage fees approved?

171. Is mobile app integration a confirmed requirement?

172. Which email/SMS/WhatsApp/CRM/analytics/support services already exist?

173. What scale of stations, traffic and lead volume is expected?

174. Who funds and operates hosting, backups and technical maintenance?



### N. Privacy, legal and security (Q175–Q186)


175. Who is legal owner/controller for collected lead and site data?

176. Are approved privacy notice and terms documents available?

177. What personal information is collected, stored and used?

178. What consent/notice applies to forms, analytics, location and marketing?

179. Which legal/compliance contact reviews applicable India requirements?

180. Are all product images, brochures, partner logos and data licensed?

181. What retention, correction and deletion policies must be supported?

182. Which employee roles can view personal and privileged data?

183. Should administrators use MFA?

184. What is the breach/security incident procedure?

185. Do payment functions introduce extra restricted data-handling obligations?

186. Who signs off security and legal readiness before go-live?



### O. SEO/content and marketing (Q187–Q200)


187. Which product, solution and local keywords matter to the business?

188. What cities/services are first acquisition priorities?

189. Should only validated stations have indexable pages?

190. Which real city/solution landing pages are valuable?

191. Will unpublished, duplicated, thin or demo routes remain noindex?

192. Who writes and approves actual copy, FAQs and technical assertions?

193. What existing articles, cases and educational resources are licensed?

194. What site languages and regional adaptations are approved?

195. What structured data can be populated accurately?

196. Are Search Console and analytics accounts accessible?

197. Who approves SEO title, description, canonical, redirect and sitemap policy?

198. How often will campaigns/banner/article content change?

199. Which verified official social profiles should be linked?

200. What lead/traffic/conversion targets constitute launch success?



### P. Testing, rollout, maintenance (Q201–Q215)


201. What is target public launch date?

202. Is the date tied to a business event or partner announcement?

203. What one-time project budget is approved?

204. Does the budget include ongoing tools, tiles, CMS, messaging and support?

205. Which browser/device combinations are mandatory?

206. What performance, availability and accessibility thresholds apply?

207. Who verifies real station details during UAT?

208. Who signs off design and user acceptance?

209. Is there a separately hosted private staging environment?

210. What migrations and URL redirects are needed from an old website?

211. Who deploys DNS, SSL, production sender and analytics?

212. Who receives downtime and error alerts?

213. What support and maintenance contract exists post-launch?

214. How quickly must inaccurate pricing, station data and critical bugs be fixed?

215. Who formally approves all public facts and final launch?



### Q. Asset and account handover (Q216–Q227)


216. Can approved SVG logo and brand assets be supplied?

217. Can the latest signed brand guideline and fonts be supplied?

218. Can complete approved station records be provided?

219. Can verified charger model specifications, tariffs and operating instructions be provided?

220. Can original rights-cleared photos, renders and videos be provided?

221. Can current brochures, product sheets, company profile and actual cases be shared?

222. Can domain/infrastructure access be delegated securely?

223. Can real API documentation, non-production credentials and integration contacts be provided?

224. Can verified sales, technical support and emergency contacts be supplied?

225. Can approved legal policies, business registration and billing info be supplied?

226. Who is the one accountable decision-maker for design/tech/content/launch?

227. Which requested features are explicitly excluded from initial scope?



---

# FINAL DIRECTIVE TO CLAUDE

**Build the Envizon EV website that the company can actually operate, not the one that a reference screenshot makes look possible.** First deliver an original premium corporate/commercial presence supported by approved charger/product material and real enquiry workflows; expand to station discovery only with verified geodata and publication rights. Handle real-time charger operations and payments as separate gated projects. Preserve existing working code and produce traceable, tested, reversible implementation changes.

**On first run, output only an audit, a blocker/decision register and a proposed milestone plan. Wait for explicit approval before editing production-critical features or publishing unsupported facts.**

---
