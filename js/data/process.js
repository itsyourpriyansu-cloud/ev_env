// "How it works" step diagrams for the process carousel.
// Same contract as the original infographics: { svg, sequence } played by js/sequence.js
// (data-initial = start state, sequence = Motion-style [selector, values, transition]).
// Each diagram shows what really happens in that step and ends on the deliverable it produces.
// Content rules (blueprint §0 rule 14): example inputs and industry standards only, no
// invented figures, outcomes or performance claims. Standards are tagged VERIFY in
// docs/content-register.md until confirmed per model.
// Layout: 1072×630 canvas on an 8px grid; type 12 (eyebrow) / 13 (meta) / 16 (value) / 18–20 (title).
const DARK = '#183028', MUTED = '#62736c', LINE = '#dadada', CHIP = '#e8e8e8', BRAND = '#16b14c', LIME = '#71bf45',
  SOFT = '#eef4ef', FAULT = '#d4574e', WHITE = '#fff';
const init = (o) => `data-initial='${JSON.stringify(o)}'`;
const FADE_UP = init({ opacity: 0, y: 10 });
const POP = init({ opacity: 0, scale: 0.5 });
const DRAW = init({ pathLength: 0 });
const GROW_X = init({ scaleX: 0 });

const svg = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1072 630">${inner}</svg>`;
const esc = (s) => s.replace(/&/g, '&amp;');
const text = (x, y, s, { size = 16, weight = 500, fill = DARK, anchor = 'start', spacing = 0 } = {}) =>
  `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"` +
  `${spacing ? ` letter-spacing="${spacing}"` : ''}>${esc(s)}</text>`;
const eyebrow = (x, y, s, fill = MUTED) => text(x, y, s.toUpperCase(), { size: 12, weight: 600, fill, spacing: 1.2 });
const panel = (x, y, w, h, extra = '') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" fill="${WHITE}" stroke="${CHIP}" stroke-width="1.5"${extra}/>`;
const check = (cx, cy, cls = 'animated-check') =>
  `<circle cx="${cx}" cy="${cy}" r="12" fill="${SOFT}" stroke="${BRAND}" stroke-width="1.5"/>` +
  `<path class="${cls}" ${DRAW} d="M${cx - 5} ${cy}l3.5 3.5 6.5-7" stroke="${BRAND}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`;
// light chip with a label (approximate text width: 7.4px per char at 14px)
const chip = (x, y, label, cls = 'animated-chip') => {
  const w = Math.round(label.length * 7.4 + 32);
  return `<g class="${cls}" ${FADE_UP}><rect x="${x}" y="${y}" width="${w}" height="40" rx="20" fill="${WHITE}" stroke="${CHIP}" stroke-width="1.5"/>` +
    `${text(x + 16, y + 25, label, { size: 14 })}</g>`;
};
// dark "deliverable" chip that closes every step
const output = (x, y, label) => {
  const w = Math.round(label.length * 8.8 + 124);
  return `<g class="animated-output" ${FADE_UP}><rect x="${x}" y="${y}" width="${w}" height="52" rx="12" fill="${DARK}"/>` +
    `<circle cx="${x + 24}" cy="${y + 26}" r="5" fill="${LIME}"/>` +
    `${text(x + 40, y + 31, 'OUTPUT', { size: 11, weight: 600, fill: LIME, spacing: 1.2 })}` +
    `${text(x + 100, y + 32, label, { size: 15, fill: WHITE })}</g>`;
};
const bolt = (x, y, s = 1, stroke = LIME) =>
  `<path d="M${x + 4 * s} ${y}l${-10 * s} ${18 * s}h${10 * s}l${-8 * s} ${16 * s}" stroke="${stroke}" stroke-width="${2.4}" stroke-linecap="round" stroke-linejoin="round"/>`;

// ---------------------------------------------------------------- 01 · Consult
// The brief we fill in together, then what happens next.
const brief = [
  ['Site type', 'Commercial · basement parking'],
  ['Vehicles & connector', 'Electric cars · CCS2'],
  ['Typical stay', '1–2 hours per visit'],
  ['Available supply', 'Sanctioned load, to confirm on site'],
  ['Goal', 'Public charging for visitors'],
];
const briefRows = brief.map(([label, value], i) => {
  const y = 216 + i * 64;
  return `<g class="animated-row" ${FADE_UP}>${text(168, y, label, { size: 13, weight: 400, fill: MUTED })}` +
    `${text(168, y + 24, value)}${i < brief.length - 1 ? `<path d="M168 ${y + 42}H544" stroke="${CHIP}"/>` : ''}</g>` +
    check(532, y + 12);
}).join('');
const next = [['Call with an Envizon engineer', 'We review the brief together'], ['Site visit scheduled', 'Survey of supply, bays and access']];
const consult = svg(`
<g class="animated-card" ${FADE_UP}>
  ${panel(136, 96, 440, 448)}
  ${eyebrow(168, 140, 'Project brief · example')}
  <path d="M168 164H544" stroke="${CHIP}"/>
</g>
${briefRows}
<path class="animated-path" ${DRAW} d="M576 320H616C640 320 648 298 672 298H688" stroke="${BRAND}" stroke-width="2"/>
<path d="M696 176V420" stroke="${CHIP}" stroke-width="2"/>
<path class="animated-path" ${DRAW} d="M696 176V420" stroke="${BRAND}" stroke-width="2"/>
${next.map(([t, sub], i) => {
    const y = 176 + i * 122;
    return `<circle class="animated-node" ${POP} cx="696" cy="${y}" r="8" fill="${BRAND}" stroke="${WHITE}" stroke-width="3"/>` +
      `<g class="animated-step" ${FADE_UP}>${text(720, y + 6, t, { size: 17 })}${text(720, y + 30, sub, { size: 13, weight: 400, fill: MUTED })}</g>`;
  }).join('')}
<circle class="animated-node" ${POP} cx="696" cy="420" r="8" fill="${LIME}" stroke="${WHITE}" stroke-width="3"/>
${output(720, 394, 'Scope agreed')}`);

// ---------------------------------------------------------------- 02 · Site feasibility
// Plan view (supply -> cable route -> EV bays), load headroom and the checks we run.
const bays = [0, 1, 2, 3].map((i) => {
  const x = 336 + i * 72;
  const ev = i >= 2;
  return `<g class="animated-bay" ${FADE_UP}><rect x="${x}" y="408" width="60" height="104" rx="8" fill="${ev ? SOFT : WHITE}" stroke="${ev ? BRAND : LINE}" stroke-width="${ev ? 2 : 1.5}"/>` +
    (ev ? `${bolt(x + 30, 436, 1, BRAND)}${text(x + 30, 496, 'EV', { size: 12, weight: 600, fill: BRAND, anchor: 'middle' })}` : '') + '</g>';
}).join('');
const checks = ['Supply & sanctioned load', 'Cable route & trenching', 'Bay layout & access', 'DISCOM load enhancement'];
const feasibility = svg(`
<g class="animated-card" ${FADE_UP}>
  ${panel(112, 96, 520, 448)}
  ${eyebrow(144, 140, 'Site plan · top view')}
</g>
<g class="animated-supply" ${FADE_UP}>
  <rect x="144" y="196" width="104" height="128" rx="12" fill="${DARK}"/>
  ${bolt(200, 226, 1.3)}
  <rect x="164" y="284" width="64" height="6" rx="3" fill="${WHITE}" fill-opacity=".25"/>
  <rect x="164" y="300" width="40" height="6" rx="3" fill="${WHITE}" fill-opacity=".25"/>
  ${text(196, 348, 'LT panel', { size: 13, weight: 500, anchor: 'middle' })}
</g>
${bays}
<path class="animated-path" ${DRAW} d="M248 248H296V376H510V408" stroke="${BRAND}" stroke-width="2.5" stroke-linejoin="round"/>
<path class="animated-path" ${DRAW} d="M510 376H582V408" stroke="${BRAND}" stroke-width="2.5" stroke-linejoin="round"/>
<g class="animated-chip" ${FADE_UP}><path d="M144 512h28" stroke="${BRAND}" stroke-width="2.5"/>${text(180, 517, 'Proposed cable route', { size: 13, weight: 400, fill: MUTED })}</g>
${output(336, 184, 'Feasibility report')}
<g class="animated-gauge" ${FADE_UP}>
  ${panel(664, 96, 296, 208)}
  ${eyebrow(696, 140, 'Load headroom')}
  <path d="M732 264a80 80 0 0 1 160 0" stroke="${CHIP}" stroke-width="16" stroke-linecap="round"/>
  <path class="animated-arc" ${DRAW} d="M732 264a80 80 0 0 1 40-69.3" stroke="${DARK}" stroke-width="16" stroke-linecap="round"/>
  <path class="animated-arc" ${DRAW} d="M772 194.7a80 80 0 0 1 89 6.2" stroke="${BRAND}" stroke-width="16" stroke-linecap="round"/>
  <path d="M884 224l14-8" stroke="${DARK}" stroke-width="2" stroke-linecap="round"/>
  <circle cx="700" cy="284" r="4" fill="${DARK}"/>${text(710, 288, 'Existing', { size: 12, weight: 400, fill: MUTED })}
  <circle cx="778" cy="284" r="4" fill="${BRAND}"/>${text(788, 288, 'Charging', { size: 12, weight: 400, fill: MUTED })}
  <path d="M854 284h10" stroke="${DARK}" stroke-width="2"/>${text(870, 288, 'Sanctioned', { size: 12, weight: 400, fill: MUTED })}
</g>
<g class="animated-gauge" ${FADE_UP}>
  ${panel(664, 320, 296, 224)}
  ${eyebrow(696, 362, 'Feasibility checks')}
</g>
${checks.map((c, i) => {
    const y = 404 + i * 40;
    return `<g class="animated-row" ${FADE_UP}>${text(728, y + 5, c, { size: 15 })}</g>` + check(706, y, 'animated-check');
  }).join('')}`);

// ---------------------------------------------------------------- 03 · Charger selection
// Power is matched to dwell time; bar length is proportional to rated power.
const classes = [
  { kw: '60 kW', stay: '1 hour or more', fit: 'Destinations · fleet bays', w: 50 },
  { kw: '120 kW', stay: 'Shorter stops', fit: 'Commercial · highway', w: 100, pick: true },
  { kw: '240 kW', stay: 'Quick turnarounds', fit: 'Corridors · depots', w: 200 },
];
const cols = classes.map((c, i) => {
  const x = 152 + i * 260;
  return `<g class="animated-col" ${FADE_UP}>
  <rect x="${x}" y="152" width="248" height="304" rx="16" fill="${c.pick ? SOFT : WHITE}" stroke="${c.pick ? BRAND : CHIP}" stroke-width="1.5"/>
  ${text(x + 24, 204, c.kw, { size: 30, weight: 300 })}
  ${text(x + 24, 228, 'DC fast charger', { size: 13, weight: 400, fill: MUTED })}
  <rect x="${x + 24}" y="252" width="200" height="8" rx="4" fill="${CHIP}"/>
  ${text(x + 24, 312, 'Typical stay', { size: 13, weight: 400, fill: MUTED })}
  ${text(x + 24, 336, c.stay)}
  <path d="M${x + 24} 360H${x + 224}" stroke="${c.pick ? '#d3e6d7' : CHIP}"/>
  ${text(x + 24, 392, 'Best for', { size: 13, weight: 400, fill: MUTED })}
  ${text(x + 24, 416, c.fit)}
</g>
<rect class="animated-bar origin-left!" ${GROW_X} x="${x + 24}" y="252" width="${c.w}" height="8" rx="4" fill="${c.pick ? BRAND : DARK}"/>`;
}).join('');
const selection = svg(`
${eyebrow(152, 124, 'Match charger power to how long vehicles stay')}
${cols}
<rect class="animated-ring" ${DRAW} x="404" y="144" width="264" height="320" rx="22" stroke="${LIME}" stroke-width="2"/>
<g class="animated-tag" ${FADE_UP}><rect x="544" y="166" width="104" height="26" rx="13" fill="${BRAND}"/>${text(596, 183, 'Example pick', { size: 12, weight: 600, fill: WHITE, anchor: 'middle' })}</g>
${chip(152, 492, 'Connector · CCS2 (IEC 62196-3)')}
${chip(424, 492, 'Backend · OCPP 1.6J')}
${output(616, 486, 'Configuration & quote')}`);

// ---------------------------------------------------------------- 04 · Installation & commissioning
const works = [
  ['Civil & cabling works', 'Trenching, cable laying, plinths'],
  ['Mounting & earthing', 'Charger fixing, earth pit, bonding'],
  ['Insulation & earth tests', 'Readings recorded for the handover'],
  ['Commissioning', 'Power-up, OCPP onboarding, test session'],
  ['Handover & training', 'Operator walkthrough and sign-off'],
];
const workRows = works.map(([t, sub], i) => {
  const y = 160 + i * 68;
  return `<g class="animated-row" ${FADE_UP}>${text(240, y - 2, t, { size: 18 })}${text(240, y + 20, sub, { size: 13, weight: 400, fill: MUTED })}` +
    `${i < works.length - 1 ? `<path d="M240 ${y + 38}H624" stroke="${CHIP}"/>` : ''}</g>` + check(208, y + 4);
}).join('');
const docs = ['As-built drawings', 'Test reports', 'O&M manual', 'Training record'];
const installation = svg(`
<g class="animated-card" ${FADE_UP}>
  ${panel(168, 80, 488, 472)}
  ${eyebrow(200, 120, 'Site works & commissioning')}
</g>
${workRows}
<rect x="200" y="508" width="424" height="10" rx="5" fill="${SOFT}"/>
<rect class="animated-progress origin-left!" ${GROW_X} x="200" y="508" width="424" height="10" rx="5" fill="${BRAND}"/>
<g class="animated-doc" ${FADE_UP}><rect x="724" y="136" width="216" height="280" rx="14" fill="${WHITE}" stroke="${CHIP}" stroke-width="1.5" transform="rotate(4 832 276)"/></g>
<g class="animated-doc" ${FADE_UP}><rect x="716" y="128" width="216" height="280" rx="14" fill="${WHITE}" stroke="${CHIP}" stroke-width="1.5" transform="rotate(-3 824 268)"/></g>
<g class="animated-doc" ${FADE_UP}>
  <rect x="708" y="120" width="216" height="280" rx="14" fill="${WHITE}" stroke="${LINE}" stroke-width="1.5"/>
  ${eyebrow(732, 160, 'Handover pack', BRAND)}
  <path d="M732 180H900" stroke="${CHIP}"/>
  ${docs.map((d, i) => {
    const y = 212 + i * 44;
    return `<rect x="732" y="${y - 14}" width="20" height="24" rx="3" stroke="${DARK}" stroke-width="1.5"/>` +
      `<path d="M737 ${y - 6}h10M737 ${y}h10M737 ${y + 6}h6" stroke="${DARK}" stroke-width="1.2" stroke-linecap="round"/>` +
      text(764, y + 4, d, { size: 15 });
  }).join('')}
</g>
${output(700, 436, 'Documented handover')}`);

// ---------------------------------------------------------------- 05 · Monitoring & support
// Live status per charger (example site, no counts) and the service loop for a fault.
const pill = (x, y, label, color, cls, initial = FADE_UP) => {
  const w = Math.round(label.length * 7.2 + 40);
  return `<g class="${cls}" ${initial}><rect x="${x - w}" y="${y - 15}" width="${w}" height="30" rx="15" fill="${color}" fill-opacity=".12"/>` +
    `<circle cx="${x - w + 16}" cy="${y}" r="4.5" fill="${color}"/>${text(x - w + 28, y + 5, label, { size: 13, weight: 600, fill: color })}</g>`;
};
const chargers = [['Charger A', '120 kW · CCS2', 'Available', BRAND], ['Charger B', '60 kW · CCS2', 'Charging', LIME]];
const flow = [['Fault alert', 'Raised via OCPP'], ['Service ticket', 'Logged & assigned'], ['Technician fix', 'Remote or on-site'], ['Back online', 'Ticket closed']];
const monitoring = svg(`
<g class="animated-card" ${FADE_UP}>
  ${panel(112, 80, 568, 472)}
  ${eyebrow(144, 120, 'Site overview · example')}
  <path d="M144 140H648" stroke="${CHIP}"/>
</g>
${chargers.map(([n, spec, st, col], i) => {
    const y = 184 + i * 64;
    return `<g class="animated-row" ${FADE_UP}>${text(144, y, n, { size: 17 })}${text(144, y + 22, spec, { size: 13, weight: 400, fill: MUTED })}` +
      `<path d="M144 ${y + 40}H648" stroke="${CHIP}"/></g>${pill(648, y + 4, st, col, 'animated-status')}`;
  }).join('')}
<g class="animated-row" ${FADE_UP}>${text(144, 312, 'Charger C', { size: 17 })}${text(144, 334, '60 kW · CCS2', { size: 13, weight: 400, fill: MUTED })}</g>
${pill(648, 316, 'Fault', FAULT, 'animated-fault')}
${pill(648, 316, 'Available', BRAND, 'animated-fixed', init({ opacity: 0, scale: 0.9 }))}
<g class="animated-chart" ${FADE_UP}>
  ${eyebrow(144, 392, 'Charging sessions · today')}
  <path d="M144 420H648M144 460H648M144 500H648" stroke="${SOFT}" stroke-width="1.5"/>
</g>
<path class="animated-path" ${DRAW} d="M144 500C192 500 208 476 248 470S312 436 352 440S416 486 456 478S520 420 568 428S624 450 648 444" stroke="${BRAND}" stroke-width="2.5" stroke-linecap="round"/>
<g class="animated-card" ${FADE_UP}>
  ${panel(712, 80, 248, 472)}
  ${eyebrow(744, 120, 'Service loop')}
  <path d="M752 172V436" stroke="${CHIP}" stroke-width="2"/>
</g>
<path class="animated-line" ${DRAW} d="M752 172V436" stroke="${BRAND}" stroke-width="2"/>
${flow.map(([t, sub], i) => {
    const y = 172 + i * 88;
    const col = i === 0 ? FAULT : i === flow.length - 1 ? BRAND : DARK;
    return `<circle class="animated-node" ${POP} cx="752" cy="${y}" r="9" fill="${col}" stroke="${WHITE}" stroke-width="3"/>` +
      `<g class="animated-step" ${FADE_UP}>${text(776, y + 5, t, { size: 16 })}${text(776, y + 27, sub, { size: 13, weight: 400, fill: MUTED })}</g>`;
  }).join('')}
${chip(744, 492, 'Preventive maintenance')}`);

// Below lg the stage is too small for the full canvas (the template crops it there too):
// each diagram zooms to its main panel so labels stay readable.
export const MOBILE_VIEWBOX = {
  consult: '120 84 472 472',
  feasibility: '96 84 552 492',
  selection: '388 128 296 352',
  installation: '152 64 520 504',
  monitoring: '96 64 600 504',
};

export const PROCESS_DIAGRAMS = {
  consult: {
    svg: consult,
    sequence: [
      ['.animated-card', { opacity: 1, y: 0 }, { duration: 0.6 }],
      ['.animated-row', { opacity: 1, y: 0 }, { duration: 0.5, delay: { __stagger: 0.14 }, at: '-0.3' }],
      ['.animated-check', { pathLength: 1 }, { duration: 0.35, ease: 'easeOut', delay: { __stagger: 0.14 }, at: '<+0.3' }],
      ['.animated-path', { pathLength: 1 }, { duration: 0.9, ease: 'easeInOut', delay: { __stagger: 0.25 }, at: '-0.2' }],
      ['.animated-node', { opacity: 1, scale: 1 }, { type: 'spring', duration: 0.3, delay: { __stagger: 0.25 }, at: '<+0.3' }],
      ['.animated-step', { opacity: 1, y: 0 }, { duration: 0.5, delay: { __stagger: 0.25 }, at: '<' }],
      ['.animated-output', { opacity: 1, y: 0 }, { duration: 0.6, at: '-0.1' }],
    ],
  },
  feasibility: {
    svg: feasibility,
    sequence: [
      ['.animated-card', { opacity: 1, y: 0 }, { duration: 0.6 }],
      ['.animated-supply', { opacity: 1, y: 0 }, { duration: 0.5, at: '-0.3' }],
      ['.animated-bay', { opacity: 1, y: 0 }, { duration: 0.5, delay: { __stagger: 0.08 }, at: '-0.3' }],
      ['.animated-path', { pathLength: 1 }, { duration: 1, ease: 'easeInOut', delay: { __stagger: 0.5 }, at: '-0.2' }],
      ['.animated-chip', { opacity: 1, y: 0 }, { duration: 0.5, at: '-0.6' }],
      ['.animated-gauge', { opacity: 1, y: 0 }, { duration: 0.5, delay: { __stagger: 0.15 }, at: 0.5 }],
      ['.animated-arc', { pathLength: 1 }, { duration: 0.9, ease: 'circInOut', delay: { __stagger: 0.5 }, at: '-0.1' }],
      ['.animated-row', { opacity: 1, y: 0 }, { duration: 0.4, delay: { __stagger: 0.12 }, at: 1.1 }],
      ['.animated-check', { pathLength: 1 }, { duration: 0.35, ease: 'easeOut', delay: { __stagger: 0.12 }, at: '<+0.25' }],
      ['.animated-output', { opacity: 1, y: 0 }, { duration: 0.6, at: '-0.1' }],
    ],
  },
  selection: {
    svg: selection,
    sequence: [
      ['.animated-col', { opacity: 1, y: 0 }, { duration: 0.6, delay: { __stagger: 0.12 } }],
      ['.animated-bar', { scaleX: 1 }, { duration: 1, ease: 'circInOut', delay: { __stagger: 0.12 }, at: '-0.3' }],
      ['.animated-ring', { pathLength: 1 }, { duration: 1, ease: 'easeInOut', at: '-0.3' }],
      ['.animated-tag', { opacity: 1, y: 0 }, { duration: 0.4, at: '-0.3' }],
      ['.animated-chip', { opacity: 1, y: 0 }, { duration: 0.5, delay: { __stagger: 0.12 }, at: '-0.1' }],
      ['.animated-output', { opacity: 1, y: 0 }, { duration: 0.6, at: '-0.2' }],
    ],
  },
  installation: {
    svg: installation,
    sequence: [
      ['.animated-card', { opacity: 1, y: 0 }, { duration: 0.6 }],
      ['.animated-row', { opacity: 1, y: 0 }, { duration: 0.5, delay: { __stagger: 0.1 }, at: '-0.3' }],
      ['.animated-check', { pathLength: 1 }, { duration: 0.35, ease: 'easeOut', delay: { __stagger: 0.32 }, at: '-0.1' }],
      ['.animated-progress', { scaleX: 1 }, { duration: 1.6, ease: 'circInOut', at: '<' }],
      ['.animated-doc', { opacity: 1, y: 0 }, { duration: 0.5, delay: { __stagger: 0.12 }, at: '-0.5' }],
      ['.animated-output', { opacity: 1, y: 0 }, { duration: 0.6, at: '-0.2' }],
    ],
  },
  monitoring: {
    svg: monitoring,
    sequence: [
      ['.animated-card', { opacity: 1, y: 0 }, { duration: 0.6, delay: { __stagger: 0.12 } }],
      ['.animated-row', { opacity: 1, y: 0 }, { duration: 0.5, delay: { __stagger: 0.1 }, at: '-0.3' }],
      ['.animated-status', { opacity: 1, y: 0 }, { duration: 0.4, delay: { __stagger: 0.1 }, at: '-0.2' }],
      ['.animated-fault', { opacity: 1, y: 0 }, { duration: 0.4, at: '-0.1' }],
      ['.animated-chart', { opacity: 1, y: 0 }, { duration: 0.5, at: '<' }],
      ['.animated-path', { pathLength: 1 }, { duration: 1.4, ease: 'easeInOut', at: '-0.2' }],
      ['.animated-line', { pathLength: 1 }, { duration: 1.6, ease: 'easeInOut', at: 1 }],
      ['.animated-node', { opacity: 1, scale: 1 }, { type: 'spring', duration: 0.3, delay: { __stagger: 0.45 }, at: '<' }],
      ['.animated-step', { opacity: 1, y: 0 }, { duration: 0.5, delay: { __stagger: 0.45 }, at: '<' }],
      ['.animated-fault', { opacity: 0 }, { duration: 0.3, at: '-0.2' }],
      ['.animated-fixed', { opacity: 1, scale: 1 }, { type: 'spring', duration: 0.35, at: '-0.1' }],
      ['.animated-chip', { opacity: 1, y: 0 }, { duration: 0.5, at: '-0.2' }],
    ],
  },
};
