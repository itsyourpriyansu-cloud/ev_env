# Envizon EV: Charger Imagery Guide (60 / 120 / 240 kW)

**For:** the 3D artist, photographer or designer producing the three product images in the "Envizon DC Charger Range" section, and the client signing them off.
**Goal:** product images that look like real, installed Envizon hardware at real Indian sites. They should look like something you could drive to tomorrow, not a CG showroom.
**Companion doc:** `docs/image-art-direction.md` holds the site-wide look, colour grade and the "what to avoid" list. This guide covers only the three charger images and doesn't repeat that doc.

---

## 1. What's wrong with the current renders

The files are `assets/img/charger-60.webp`, `charger-120.webp` and `charger-240.webp`, at 2400×1350. They come from `npm run brand:art`.

| Issue | Why it breaks belief | Fix |
|---|---|---|
| **DC fast chargers in a private home garage** | 60–240 kW DC is commercial infrastructure. It needs an LT supply, a dedicated feeder and a plinth, and nobody installs one beside a house plant. A knowledgeable buyer spots this instantly. | Put each class where it's actually installed (§2). |
| **One identical room for all three** | The series reads as the same picture three times, and the product's purpose isn't shown. | Use one shared visual language, with a context that matches each power class. |
| **CG materials** | Perfectly clean, uniform powder-coat, glossy floor reflections everywhere, plastic-looking plant, cartoon houses outside. | Real material response: satin powder-coat with micro-scratches, polycarbonate screen glare, scuffed plinth edges, dust at floor level. |
| **Cables don't behave** | The cables float in clean arcs with no weight and no strain relief, and the 240 kW guns hang symmetrically like props. | Cables should sag under their own weight, coil on a hook or cable-management arm, and use holstered CCS2 guns with visible strain relief. |
| **Missing site infrastructure** | No bollards, wheel stops, bay markings, signage, earthing pit cover, cable trench or feeder pillar. | Add the §3 believability details. |
| **Illegible, generic screen and branding** | "envizon ev" floats on a lit top band, the UI text is blurred, and "60 KW" is the only readable spec. | Use the approved logo (`assets/brand/`) at a plausible size and a minimal, legible idle screen (§3). Don't print any spec that hasn't been approved. |
| **Scale is ambiguous** | Without a car, a person or a bay there's nothing to judge size against, so 60 kW and 240 kW feel the same. | Include a bay, a bollard and (for 120/240) a partially visible vehicle as scale cues. Keep the camera identical across the series. |
| **Lighting is too theatrical** | Warm cove light, a blue-hour window and a green glow look like a staged set. | Use the light of the real site: basement fluorescents, an overcast plaza, or depot floodlights at dusk. |

---

## 2. The map: one context per power class

The context comes from the product copy that's already on the site (`content/homepage.json` → `chargers.items[].description`). It doesn't add any new claims.

| | 60 kW | 120 kW | 240 kW |
|---|---|---|---|
| **Site copy says** | Destinations and fleet bays where vehicles stay an hour or more | Busy commercial sites and highway stops, shorter stays | High-throughput corridors and fleet depots |
| **Setting** | Covered **commercial basement car park** (mall, office or hotel). Concrete columns with painted numbers, fluorescent battens, epoxy floor. | **Highway / ORR charging plaza** under a steel canopy. Overcast daylight or early dusk, landscaped verge, plaza paving. | **Fleet or e-bus depot** yard. Open sky at dusk, depot sheds behind, tarmac with yellow lane markings. |
| **Unit** | Single-gun, compact cabinet | Dual-gun, standard cabinet | Larger cabinet or dispenser, dual gun |
| **Vehicle cue** | None, or a car's rear quarter out of focus in the next bay | One electric compact SUV, plugged in, badges turned away | The front of a fleet cab or e-bus, out of focus, badges turned away |
| **People** | None | Optional: one driver mid-task, back or side to camera | Optional: a technician in hi-vis, no face |
| **Time & light** | Neutral 4500–5000 K fluorescents, soft and even | Overcast daylight, 5500 K | Blue hour with depot floodlights, 4000 K |
| **Mood line** | "Charge while you shop." | "Back on the road quickly." | "Keeps the fleet moving." |

These are art direction only. Don't put the mood lines on the site without approval.

---

## 3. Believability checklist (every image)

**Install details**
- [ ] A concrete **plinth** with a chamfered edge, and the charger bolted to it.
- [ ] **Bollards** (yellow/black or galvanised) or a crash barrier on the vehicle side.
- [ ] **Wheel stop** and a painted **EV bay** marking (green bay or white EV pictogram).
- [ ] **Cable entry**: a trench cover or conduit at the plinth base, leading toward a **feeder pillar / LT panel** that's visible or implied in the background.
- [ ] An **earthing pit cover** near the plinth (small, square, flush with the floor).
- [ ] **Signage area**: a blank or "EV Charging" sign on a column or pole, with no third-party brands.

**Hardware details**
- [ ] **CCS2** guns in holsters, with cable management (a retractor arm or coil hook).
- [ ] Ventilation grilles and an IP-rated cabinet look: gasketed doors and a visible door lock.
- [ ] An **emergency stop** button and an RFID reader area. Only show these if they're on the real unit.
- [ ] A screen showing a minimal, legible idle state ("Ready to charge" plus the Envizon mark). No spec numbers, prices or claims.
- [ ] The Envizon logo comes from the official vector (`assets/brand/logo-*.svg`), sized like a real decal. It must not glow.

**Real-world texture**
- [ ] Dust and tyre marks at floor level, slightly scuffed plinth paint, and a fingerprint smudge on the screen bezel.
- [ ] Imperfect, bounced light. Not everything is sharp: use depth of field at f/4–f/5.6.
- [ ] An Indian context: left-hand traffic cues, Indian signage conventions, and number plates blurred or out of frame.

---

## 4. Consistency spec (so the three read as a series)

| Item | Value |
|---|---|
| Output | 2400×1350 WebP (16:9), sRGB, quality ≈ 82, with the file names unchanged |
| Safe area | Keep the charger inside the **centred 1500×1100** area, because the site crops to 3:2, 2.2:1 and 16:9 |
| Camera | 35–50 mm full-frame look, camera at the unit's mid-height (≈ 0.9–1.1 m), turned **15–25°** off-front. **Same distance for all three**, so the size difference is real. |
| Horizon | Level verticals (no keystone), and the horizon line at ≈ 45% of the height |
| Unit placement | Unit centre at ≈ 50% width, with its base at ≈ 78% of the height |
| Grade | Per `docs/image-art-direction.md` §1: 5200–5600 K, saturation −10 to −15%, shadows lifted toward `#0E1C18`, grain 2–4% |
| Green | Green appears only where it really exists: status light, bay paint, foliage. No green grading. |
| Labelling | Renders are labelled **"3D render"** in the alt text and the content register. A render is never presented as a photograph. |

---

## 5. Plan

| Phase | What | Who | Output | Gate |
|---|---|---|---|---|
| **0 · Inputs** | Get the manufacturer's CAD or STEP files, or reference photos of the actual units, with dimensions, gun count and colour. Confirm which unit is which power class. | Client | CAD and photos | The client confirms the hardware is Envizon's |
| **1 · Pre-viz** | Use the AI prompts in §6 to agree the context, camera and light for each class. These are **mood boards only, never published**. | Designer | 3 frames per class | The client picks one direction per class |
| **2 · Production renders** | Rebuild each scene in Blender or Unreal from the CAD, following the §7 brief, with the real geometry and logo. | 3D artist | 3 hero renders and 3 banner crops | QA against the §3 and §4 checklists |
| **3 · Drop-in** | Replace the files in place and run QA. | Web team | Updated `assets/img/*` | `npm run qa:shots` and `npm run build` |
| **4 · Photography (later)** | Once real installs exist, shoot the same three setups and replace the renders. | Photographer | Photos | Model and property releases |

---

## 6. AI pre-viz prompts (mood boards only)

These are for agreeing the direction. AI can't depict the real Envizon hardware, so nothing generated goes on the live site (`docs/image-art-direction.md` §4).

**Usage notes**
- **Midjourney:** append `--ar 16:9 --style raw --stylize 50`.
- **Flux / SDXL:** use 1344×768, CFG ≈ 4–5, and paste the negative prompt.

### Shared negative prompt
```
neon, glowing energy, lightning bolts, holograms, sci-fi, futuristic concept car, showroom, perfectly symmetrical, CGI look, plastic textures, oversaturated green, teal and orange grade, HDR halo, lens flare, warped text, gibberish text, extra connectors, cables floating, melted geometry, people looking at camera, smiling stock model, car logos, third-party charger brands, snow, western suburb, left-hand-drive, visible number plates, residential living room, house plants indoors
```

### 60 kW: commercial basement car park
```
Architectural photograph of a compact single-gun DC fast EV charger installed in a covered commercial basement car park in Hyderabad, India. Matte dark-green powder-coated cabinet on a chamfered concrete plinth, holstered CCS2 gun with a coiled cable on a hook, small minimal screen showing an idle "Ready to charge" state. Yellow-and-black bollards, rubber wheel stop, painted green EV parking bay, grey epoxy floor with faint tyre marks and dust, concrete column with stencilled bay number, conduit running from the plinth base toward a grey feeder pillar on the back wall. Even neutral fluorescent tube lighting, 4800K, soft shadows. 40mm lens, camera at mid-height of the charger, 20 degrees off-front, level verticals, shallow depth of field at f/5.6, subtle film grain, documentary realism, muted colours.
```

### 120 kW: highway / ORR charging plaza
```
Documentary photograph of a dual-gun DC fast EV charger at a highway charging plaza on the Outer Ring Road, Hyderabad, India, under a slim steel canopy. Dark-green and charcoal cabinet on a concrete plinth with galvanised bollards, two holstered CCS2 guns with cable management arms, one gun plugged into a white compact electric SUV parked in a marked bay, badges turned away and slightly out of focus. Interlocking paving, landscaped verge with dusty shrubs, blank "EV Charging" sign on a pole, traffic softly blurred in the far background. Overcast daylight, 5500K, soft even light, gentle reflections on the cabinet. 45mm lens, camera at charger mid-height, 18 degrees off-front, level horizon, f/5.6, subtle grain, realistic materials, muted natural colours.
```

### 240 kW: fleet / e-bus depot
```
Wide-medium photograph of a large high-power DC fast charging cabinet with dual CCS2 guns in an electric fleet depot yard in India at blue hour. Robust dark-green and charcoal enclosure on a raised concrete plinth with crash barrier and bollards, ventilation grilles, cable trench cover at the base, feeder pillar and depot shed with sodium and LED floodlights behind. The front of an electric bus or fleet taxi parked in a lane with yellow markings, out of focus, no branding. A technician in a hi-vis vest seen from behind checking the cabinet. Cool dusk sky, 4000K floodlight mix, wet-look tarmac patches, dust and tyre marks. 50mm lens, camera at cabinet mid-height, 22 degrees off-front, level verticals, f/4, subtle film grain, documentary realism.
```

### Variations to try per class
- **Light:** swap to "early morning, low soft sun behind camera" for 120 kW, or "clean white LED battens" for 60 kW.
- **Scale cue:** "a parked car's rear quarter in the neighbouring bay" (60 kW).
- **Crop safety:** add "generous empty space on both sides of the charger, subject centred" so the site's crops stay safe.

---

## 7. Production render brief (Blender / Unreal)

| Area | Spec |
|---|---|
| **Geometry** | Use the manufacturer's CAD with no simplification of the guns, holsters, vents or door seams. Bevel every hard edge 1–2 mm so highlights catch. |
| **Materials** | Satin powder-coat (roughness 0.45–0.55) with a micro-scratch normal map. Polycarbonate screen with real glare and a slight smudge. Rubberised cable (roughness 0.7). Concrete plinth with an AO-driven dirt mask. |
| **Cables** | Cloth or rope sim for natural sag and strain relief. They never pass through geometry or end in mid-air. |
| **Environment** | 60 kW: modelled basement bay plus a basement HDRI. 120 kW: canopy and plaza plus an overcast HDRI. 240 kW: depot yard plus a dusk HDRI with practical floodlights. Background props stay at real scale. |
| **Light rig** | The environment HDRI is the key. Add a large soft area light at 45° as fill, a subtle rim light to separate the cabinet edge, and practical lights where they really exist (screen, status LED). |
| **Camera** | The values in §4. Keep one camera preset and copy it to all three scenes, changing only the context. |
| **Render** | Cycles or Path Tracer at ≥ 512 samples with the denoiser on, rendered at 4800×2700 and downscaled to 2400×1350 for crispness. AgX or ACES view transform, then the grade from `docs/image-art-direction.md` §1. |
| **Banners** | `charger-{kw}-banner.webp` at 2400×900: the top half of the unit and its screen, centred, with clear space on the left for the logo. |

---

## 8. QA before swapping in

- [ ] Each image passes the §3 checklist.
- [ ] All three share the §4 camera, horizon and placement (overlay them at 50% opacity to check).
- [ ] The crop is safe at 1440 (3:2), 1920 (2.2:1) and 390 (16:9) on the live page.
- [ ] No unapproved spec, price or claim appears on the screen or the decals.
- [ ] The alt text says "3D render of …" until real photos replace the renders.
- [ ] The source and licence are recorded in `docs/content-register.md` (Placeholders table).

## 9. Hookup (no code change)

Replace `assets/img/charger-60.webp`, `charger-120.webp` and `charger-240.webp` (and the `-banner` versions) in place, keeping the same names and sizes. Then run:

```bash
npm run qa:shots   # with npm run dev running
npm run build
```
