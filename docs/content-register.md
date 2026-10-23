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
| Hero | PROPOSED | Headline/subline. **Hero video is a Pexels placeholder** (EV-charging montage, see Placeholders); replace with Envizon footage before launch |
| EV-brand logo strip (#brands, section 3) | PROPOSED | Logo marquee of EV makers (Tata, MG, Mahindra, Hyundai, Kia, Citroën, BMW, Mercedes-Benz, Volvo, Audi) under "Built for the CCS2 electric cars on Indian roads." Marks from the `simple-icons` package (CC0 path data), built by `node tools/build-logos.mjs`; **they remain trademarks of their owners**. An on-page disclaimer states compatibility only, not endorsement. Before launch: legal sign-off on nominative trademark use, and verify CCS2 DC charging per model (some city EVs are AC-only) |
| Solutions (4 cards) | PROPOSED | Which of the four services Envizon actually offers |
| Charger range 60 / 120 / 240 kW | PROPOSED | Power classes from the Envizon deck; **images are client-supplied renders** (Oct 2026): 60 kW in a basement car park, 120 kW at a highway plaza, 240 kW at a bus depot. Alt text labels them as illustrative renders. The on-unit details (dual guns, screens, "60/120/240 kW" plates) are artwork, not verified hardware specs |
| Process (5 steps) | PROPOSED | Step 05 "Monitoring & Support" needs the CMS/support scope confirmed (`PROPOSED_NEEDS_SCOPE`). The step diagrams (`js/data/process.js`) show **example** inputs and industry references that need confirming per model (`VERIFY`): CCS2 to IEC 62196-3, OCPP 1.6J onboarding, DISCOM load enhancement, insulation and earth-resistance tests, and handover-pack contents (as-built drawings, test reports, O&M manual, training record) |
| Why Envizon (4 stacked cards) | PROPOSED | Each card now has a headline, body, 5 bullets and a CTA. Card 1 needs the delivery scope confirmed, including DISCOM paperwork support and SLD (`VERIFY_SCOPE`). Card 3 needs OCPP 1.6J and IEC 62196-3 verified per model (`VERIFY_OCPP`). Card 4 needs coverage, preventive-maintenance and ticketing wording confirmed (`VERIFY_COVERAGE`) |
| Partner CTA | PROPOSED | Programme type (site host / business partner / franchise) |
| FAQ (6) | PROPOSED | Answers 3 (`VERIFY_SCOPE`), 4 (`VERIFY_DATASHEET`) and 5 (`VERIFY_OPS`) need sign-off. New intro line and the "Still have questions?" CTA panel copy |
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

Specs, look and shot list for every replacement asset: `docs/image-art-direction.md`. For the three charger images specifically (audit, context per power class, prompts and render brief), see `docs/charger-imagery-guide.md`.

| Placeholder | File | Replace with |
|---|---|---|
| Hero video | `assets/video/hero-1920.mp4` (1920×1080, 20.6 s seamless loop, 5.5 MB), `hero-960.mp4` (vertical 720×1280 cut for phones, 20.2 s, 2.0 MB), `assets/img/hero-poster.webp`. Edited from Pexels clips by **Kindel Media** under the free Pexels licence (commercial use, no attribution required). Desktop: 9790189 (aerial), 9788684 (solar charging canopy), 9790137 (charger post), 9790139 (plug-in), 9790138 (connector close-up). Phones: 9790203, 9790214, 9790209, 9790212, 9790211. Masters in `reference/stock/`. Note: US location, AC/J1772-style hardware and a Tesla in one shot, so not Envizon hardware or Indian context | Envizon footage per `docs/image-art-direction.md` §3.1 (same file names to swap in place) |
| Partner CTA background video (#partners) | `assets/video/partners-1920.mp4` (3.6 MB), `partners-960.mp4` (0.9 MB), `assets/img/partners-poster.webp`: 16 s seamless loop edited from Pexels stock under the free Pexels licence (commercial use, no attribution required): 8964771 Mikael Blomkvist, 13919860 Daniel Andraski, 8487074 Kindel Media, 6685058 Gustavo Fring. Originals and master in `reference/stock/` | Envizon site or team footage when available (same file names to swap in place) |
| FAQ "Still have questions?" panel photo | `assets/img/faq-cta.webp` (1600×750), cropped from Pexels **8867220** "Man and Woman Having a Conversation" by Yan Krukau, under the free Pexels licence (commercial use, no attribution required). Original in `reference/stock/8867220-conversation.jpg` | An Envizon support or site-team photo when available (same file name) |
| Footer brand-banner video | `assets/video/footer-ev.mp4` (720×720, 9 s seamless loop, 0.36 MB) + `assets/img/footer-ev-poster.webp`, cut from Pexels **4817951** "Charging An Electric Car" by Gustavo Fring, under the free Pexels licence. Master in `reference/stock/4817951-ev-charging.mp4` | Envizon footage of a CCS2 plug-in at an Envizon charger (the stock clip shows a non-Envizon AC connector) |
| Charger images + station-card banners | `assets/img/charger-{60,120,240}.webp` (1672×941) and `charger-{kw}-banner.webp` (1672×627), converted from the client-supplied `assets/img/{60,120,240} kw.png` (originals kept). `npm run brand:art` would overwrite them with the old generated renders, so don't run it | Real product photography of the actual units when available (same names/sizes; see `docs/image-art-direction.md` §3.2–3.3) |
| Logo set | `assets/brand/*.svg` (traced from the JPG) | Official vector logo when supplied (re-run `npm run brand:logo`) |
