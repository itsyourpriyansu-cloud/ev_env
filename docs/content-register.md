# Envizon EV homepage: content & approval register

**Source of truth:** all homepage copy lives in `content/homepage.json`, and the icon set in `content/icons.json`.

**Statuses:**
- `APPROVED`: the client has signed off.
- `PROPOSED`: a draft, shown in dev/staging only.
- `BLOCKED`: never rendered.

**Review mode:** open `http://localhost:5173/?review` to outline every `PROPOSED` block on the page. Production builds (`npm run build`) strip the status markers.

**Current state:** nothing is `APPROVED` yet. Everything visible is `PROPOSED`, pending client sign-off (blueprint §0 rule 13).

## Sections

| Section | Status | What the client must confirm |
|---|---|---|
| Meta (title, description, OG) | PROPOSED | Brand line and description |
| Navigation | PROPOSED | Labels; whether a Chargers dropdown is wanted before product pages exist |
| Hero | PROPOSED | Headline/subline; **hero video is the original template footage** (kept by request): confirm usage rights or replace before public launch |
| EV-brand logo strip (#brands, section 3) | PROPOSED | Logo marquee of EV makers (Tata, MG, Mahindra, Hyundai, Kia, Citroën, BMW, Mercedes-Benz, Volvo, Audi) under "Built for the CCS2 electric cars on Indian roads." Marks from the `simple-icons` package (CC0 path data), built by `node tools/build-logos.mjs`; **they remain trademarks of their owners**. An on-page disclaimer states compatibility only, not endorsement. Before launch: legal sign-off on nominative trademark use, and verify CCS2 DC charging per model (some city EVs are AC-only) |
| Solutions (4 cards) | PROPOSED | Which of the four services Envizon actually offers |
| Charger range 60 / 120 / 240 kW | PROPOSED | Power classes from the Envizon deck; **images are 3D renders** in a dusk-garage setting art-directed from `assets/demo/ev_charger_demo.png` (labelled "3D render" in alt text), not photos of the actual hardware |
| Process (5 steps) | PROPOSED | Step 05 "Monitoring & Support" needs the CMS/support scope confirmed (`PROPOSED_NEEDS_SCOPE`) |
| Why Envizon (4 cards) | PROPOSED | Card 3 needs OCPP verified (`VERIFY_OCPP`); card 4 needs coverage/SLA wording (`VERIFY_COVERAGE`) |
| Partner CTA | PROPOSED | Programme type (site host / business partner / franchise) |
| FAQ (6) | PROPOSED | Answers 3 (`VERIFY_SCOPE`), 4 (`VERIFY_DATASHEET`) and 5 (`VERIFY_OPS`) need sign-off |
| Station locator (#stations) | DEMO · **HIDDEN** | Commented out of the page by request (2026-10-22); restore with `"enabled": true` under `locator` in `content/homepage.json`. | **Mock Hyderabad stations** (`js/data/stations.js`) and simulated availability; map rendered from OpenStreetMap (attribution shown). Replace with a licensed, verified station feed before public launch (blueprint §2 Pillar B) |
| Footer | PROPOSED | Legal name for the © line; Privacy/Terms pages (`PAGE_PENDING`) |
| Quote dialog | PROPOSED | Field set, consent wording; **submission is mocked** |

## Blocked (deliberately not on the page)

| Item | Unblock with | Blueprint |
|---|---|---|
| Charger model names (e.g. "Atom DC"), currents, efficiency, IP/IK, warranty | Signed manufacturer datasheets per SKU | §1.2, §15.4 |
| Prices (deck candidates ₹6–13.5 lakh) | All price-guard fields + commercial approval | §8.6 |
| 360 kW / 480 kW | Approved, orderable SKU | §1.4 |
| Phone / WhatsApp / email / social links | Client verification of ownership | §1.2 |
| Franchise brochure download | Rights- and currency-checked brochure | §1.2, §5.5 |
| Client logos, stats, testimonials, case studies | Written permission + evidence | §0 rule 14 |
| Station locator / "Find a Charger" | Licensed, verified station data | §2 Pillar B |
| Live lead submission | Durable lead endpoint (`POST /api/v1/leads`) + consent record | §9.4 |

## Placeholders to replace

Specs, look and shot list for every replacement asset: `docs/image-art-direction.md`.

| Placeholder | File | Replace with |
|---|---|---|
| Hero video (template footage) | `assets/video/hero-1920.mp4`, `hero-960.mp4`, `assets/img/hero-poster.webp` | Envizon footage if usage rights for the current video aren't confirmed (keep file names to swap in place) |
| Partner CTA background video (#partners) | `assets/video/partners-1920.mp4` (3.6 MB), `partners-960.mp4` (0.9 MB), `assets/img/partners-poster.webp`: 16 s seamless loop edited from Pexels stock under the free Pexels licence (commercial use, no attribution required): 8964771 Mikael Blomkvist, 13919860 Daniel Andraski, 8487074 Kindel Media, 6685058 Gustavo Fring. Originals and master in `reference/stock/` | Envizon site or team footage when available (same file names to swap in place) |
| Charger images + station-card banners | `assets/img/charger-{60,120,240}.webp` (2400×1350), `charger-{kw}-banner.webp` (2400×900), rendered by `npm run brand:art` (needs `npm run dev` running) | Real product photography of the actual units when available (same names/sizes; see `docs/image-art-direction.md` §3.2–3.3) |
| Logo set | `assets/brand/*.svg` (traced from the JPG) | Official vector logo when supplied (re-run `npm run brand:logo`) |
