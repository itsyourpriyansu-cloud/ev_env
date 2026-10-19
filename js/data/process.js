// "How it works" step diagrams for the process carousel.
// Same contract as the original infographics: { svg, sequence } played by js/sequence.js
// (data-initial = start state, sequence = Motion-style [selector, values, transition]).
// Illustrative only: no figures, outcomes or performance claims (blueprint §0 rule 14).
const DARK = '#183028', LINE = '#dadada', CHIP = '#e8e8e8', BRAND = '#16b14c', LIME = '#71bf45', SOFT = '#eef4ef';
const init = (o) => `data-initial='${JSON.stringify(o)}'`;
const FADE_UP = init({ opacity: 0, y: 10 });
const POP = init({ opacity: 0, scale: 0.5 });

const chip = (x, y, w, label, extra = '') =>
  `<g class="animated-text-block" ${FADE_UP}${extra}><rect x="${x}" y="${y}" width="${w}" height="48" rx="8" fill="#fff" stroke="${CHIP}"/>` +
  `<text x="${x + w / 2}" y="${y + 25}" dominant-baseline="middle" text-anchor="middle" fill="${DARK}" font-size="18" font-weight="500">${label}</text></g>`;

const svg = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1072 630">${inner}</svg>`;

// 01 · Consult — a conversation that turns into a plan
const consult = svg(`
<g class="animated-bubble-a" ${FADE_UP}>
  <rect x="150" y="150" width="380" height="160" rx="28" fill="#fff" stroke="${CHIP}" stroke-width="1.5"/>
  <rect class="animated-line origin-left!" ${init({ scaleX: 0 })} x="186" y="196" width="250" height="14" rx="7" fill="${SOFT}"/>
  <rect class="animated-line origin-left!" ${init({ scaleX: 0 })} x="186" y="226" width="300" height="14" rx="7" fill="${SOFT}"/>
  <rect class="animated-line origin-left!" ${init({ scaleX: 0 })} x="186" y="256" width="180" height="14" rx="7" fill="${SOFT}"/>
</g>
<path class="animated-path" ${init({ pathLength: 0 })} d="M340 310 C340 420 470 418 600 418" stroke="${BRAND}" stroke-width="2"/>
<circle class="animated-node" ${POP} cx="340" cy="312" r="9" fill="${BRAND}" stroke="#fff" stroke-width="3"/>
<circle class="animated-node" ${POP} cx="600" cy="418" r="9" fill="${BRAND}" stroke="#fff" stroke-width="3"/>
<g class="animated-bubble-b" ${FADE_UP}>
  <rect x="600" y="340" width="330" height="160" rx="28" fill="${DARK}"/>
  <rect class="animated-line origin-left!" ${init({ scaleX: 0 })} x="636" y="386" width="200" height="14" rx="7" fill="${LIME}"/>
  <rect class="animated-line origin-left!" ${init({ scaleX: 0 })} x="636" y="416" width="250" height="14" rx="7" fill="#fff" fill-opacity=".25"/>
  <rect class="animated-line origin-left!" ${init({ scaleX: 0 })} x="636" y="446" width="150" height="14" rx="7" fill="#fff" fill-opacity=".25"/>
</g>
${chip(640, 150, 300, 'Your site · vehicles · goals')}`);

// 02 · Site feasibility — supply, bays and expected load
const bays = [0, 1, 2, 3, 4, 5].map((i) => {
  const x = 330 + i * 110;
  const hl = i >= 3;
  return `<rect class="animated-bay" ${FADE_UP} x="${x}" y="400" width="92" height="150" rx="10" fill="${hl ? SOFT : '#fff'}" stroke="${hl ? BRAND : LINE}" stroke-width="${hl ? 2 : 1.5}"/>` +
    (hl ? `<path class="animated-node" ${POP} d="M${x + 50} 450l-12 22h12l-10 20" stroke="${BRAND}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>` : '');
}).join('');
const feasibility = svg(`
<g class="animated-supply" ${FADE_UP}>
  <rect x="110" y="300" width="150" height="250" rx="16" fill="${DARK}"/>
  <path d="M190 360l-22 40h22l-18 36" stroke="${LIME}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="140" y="470" width="90" height="10" rx="5" fill="#fff" fill-opacity=".25"/>
  <rect x="140" y="494" width="60" height="10" rx="5" fill="#fff" fill-opacity=".25"/>
</g>
${bays}
<path class="animated-path" ${init({ pathLength: 0 })} d="M260 380 H700 V400" stroke="${BRAND}" stroke-width="2"/>
<path class="animated-path" ${init({ pathLength: 0 })} d="M700 380 H920 V400" stroke="${BRAND}" stroke-width="2"/>
<g class="animated-gauge" ${FADE_UP}>
  <path d="M640 250 a120 120 0 0 1 240 0" stroke="${CHIP}" stroke-width="18" stroke-linecap="round"/>
  <path class="animated-arc" ${init({ pathLength: 0 })} d="M640 250 a120 120 0 0 1 200 -85" stroke="${BRAND}" stroke-width="18" stroke-linecap="round"/>
</g>
${chip(170, 170, 300, 'Power · Parking · Load')}`);

// 03 · Charger selection — three power classes, one recommendation
const bars = [
  { x: 250, h: 150, label: '60 kW' },
  { x: 476, h: 260, label: '120 kW', pick: true },
  { x: 702, h: 400, label: '240 kW' },
].map((b) => {
  const y = 540 - b.h;
  return `<rect class="animated-bar origin-bottom!" ${init({ scaleY: 0 })} x="${b.x}" y="${y}" width="120" height="${b.h}" rx="16" fill="${b.pick ? BRAND : DARK}"/>` +
    `<g class="animated-text-block" ${FADE_UP}><rect x="${b.x - 4}" y="${y - 66}" width="128" height="48" rx="8" fill="#fff" stroke="${b.pick ? BRAND : CHIP}"/>` +
    `<text x="${b.x + 60}" y="${y - 41}" dominant-baseline="middle" text-anchor="middle" fill="${DARK}" font-size="18" font-weight="500">${b.label}</text></g>`;
}).join('');
const selection = svg(`
<path d="M180 541H900" stroke="${LINE}" stroke-width="1.5"/>
${bars}
<rect class="animated-ring" ${init({ pathLength: 0 })} x="462" y="200" width="148" height="354" rx="24" stroke="${LIME}" stroke-width="2"/>`);

// 04 · Installation & commissioning — the delivery checklist
const steps = ['Civil & electrical works', 'Charger installation', 'Testing & safety checks', 'Handover & training'];
const rows = steps.map((label, i) => {
  const y = 190 + i * 82;
  return `<g class="animated-row" ${FADE_UP}><circle cx="330" cy="${y}" r="20" fill="${SOFT}" stroke="${BRAND}" stroke-width="1.5"/>` +
    `<text x="374" y="${y + 1}" dominant-baseline="middle" fill="${DARK}" font-size="20" font-weight="500">${label}</text>` +
    `<path d="M374 ${y + 30}H740" stroke="${CHIP}"/></g>` +
    `<path class="animated-check" ${init({ pathLength: 0 })} d="M320 ${y}l7 7 13-14" stroke="${BRAND}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
}).join('');
const installation = svg(`
<rect x="270" y="120" width="532" height="430" rx="24" fill="#fff" stroke="${CHIP}" stroke-width="1.5"/>
${rows}
<rect x="310" y="500" width="452" height="12" rx="6" fill="${SOFT}"/>
<rect class="animated-progress origin-left!" ${init({ scaleX: 0 })} x="310" y="500" width="452" height="12" rx="6" fill="${BRAND}"/>`);

// 05 · Monitoring & support — ongoing health checks (no values shown)
const monitoring = svg(`
<rect x="190" y="130" width="692" height="400" rx="24" fill="#fff" stroke="${CHIP}" stroke-width="1.5"/>
<path d="M240 230H832M240 310H832M240 390H832M240 470H832" stroke="${SOFT}" stroke-width="1.5"/>
<path class="animated-path" ${init({ pathLength: 0 })} d="M240 420 C300 420 320 330 380 330 S470 400 530 380 S620 250 690 270 S780 330 832 300" stroke="${BRAND}" stroke-width="3" stroke-linecap="round"/>
<circle class="animated-node" ${POP} cx="380" cy="330" r="9" fill="#fff" stroke="${BRAND}" stroke-width="3"/>
<circle class="animated-node" ${POP} cx="530" cy="380" r="9" fill="#fff" stroke="${BRAND}" stroke-width="3"/>
<circle class="animated-node" ${POP} cx="690" cy="270" r="9" fill="#fff" stroke="${BRAND}" stroke-width="3"/>
<g class="animated-text-block" ${FADE_UP}>
  <circle cx="246" cy="178" r="7" fill="${BRAND}"/><circle cx="270" cy="178" r="7" fill="${BRAND}"/><circle cx="294" cy="178" r="7" fill="${LIME}"/>
</g>
${chip(560, 154, 290, 'Health checks · Service')}`);

export const PROCESS_DIAGRAMS = {
  consult: {
    svg: consult,
    sequence: [
      ['.animated-bubble-a', { opacity: 1, y: 0 }, { duration: 0.6 }],
      ['.animated-bubble-a .animated-line', { scaleX: 1 }, { duration: 0.6, ease: 'circOut', delay: { __stagger: 0.1 }, at: '-0.3' }],
      ['.animated-path', { pathLength: 1 }, { duration: 1, ease: 'easeInOut', at: '-0.2' }],
      ['.animated-node', { opacity: 1, scale: 1 }, { type: 'spring', duration: 0.3, delay: { __stagger: 0.6 }, at: '<' }],
      ['.animated-bubble-b', { opacity: 1, y: 0 }, { duration: 0.6, at: '-0.3' }],
      ['.animated-bubble-b .animated-line', { scaleX: 1 }, { duration: 0.6, ease: 'circOut', delay: { __stagger: 0.1 }, at: '-0.3' }],
      ['.animated-text-block', { opacity: 1, y: 0 }, { duration: 0.6, at: '-0.4' }],
    ],
  },
  feasibility: {
    svg: feasibility,
    sequence: [
      ['.animated-supply', { opacity: 1, y: 0 }, { duration: 0.6 }],
      ['.animated-bay', { opacity: 1, y: 0 }, { duration: 0.5, delay: { __stagger: 0.08 }, at: '-0.3' }],
      ['.animated-path', { pathLength: 1 }, { duration: 1, ease: 'easeInOut', delay: { __stagger: 0.4 }, at: '-0.2' }],
      ['.animated-node', { opacity: 1, scale: 1 }, { type: 'spring', duration: 0.3, delay: { __stagger: 0.12 }, at: '-0.3' }],
      ['.animated-gauge', { opacity: 1, y: 0 }, { duration: 0.5, at: '-0.4' }],
      ['.animated-arc', { pathLength: 1 }, { duration: 1.2, ease: 'circInOut', at: '-0.2' }],
      ['.animated-text-block', { opacity: 1, y: 0 }, { duration: 0.6, at: '-0.8' }],
    ],
  },
  selection: {
    svg: selection,
    sequence: [
      ['.animated-bar', { scaleY: 1 }, { duration: 1.2, ease: 'circInOut', delay: { __stagger: 0.15 } }],
      ['.animated-text-block', { opacity: 1, y: 0 }, { duration: 0.6, delay: { __stagger: 0.15 }, at: '-0.5' }],
      ['.animated-ring', { pathLength: 1 }, { duration: 1, ease: 'easeInOut', at: '-0.2' }],
    ],
  },
  installation: {
    svg: installation,
    sequence: [
      ['.animated-row', { opacity: 1, y: 0 }, { duration: 0.5, delay: { __stagger: 0.12 } }],
      ['.animated-check', { pathLength: 1 }, { duration: 0.35, ease: 'easeOut', delay: { __stagger: 0.3 }, at: '-0.2' }],
      ['.animated-progress', { scaleX: 1 }, { duration: 1.4, ease: 'circInOut', at: '<' }],
    ],
  },
  monitoring: {
    svg: monitoring,
    sequence: [
      ['.animated-path', { pathLength: 1 }, { duration: 1.5, ease: 'easeInOut' }],
      ['.animated-node', { opacity: 1, scale: 1 }, { type: 'spring', duration: 0.3, delay: { __stagger: 0.25 }, at: 0.4 }],
      ['.animated-text-block', { opacity: 1, y: 0 }, { duration: 0.6, delay: { __stagger: 0.2 }, at: '-0.6' }],
    ],
  },
};
