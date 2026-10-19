// Interpreter for Motion `animate([...sequence])` arrays (as extracted from the live
// bundle) -> GSAP timeline. Implements Motion's sequence timing rules:
//   at: number = absolute | "<" = previous start | "<+n" | "+n"/"-n" relative to previous end
//   delay may be a stagger({ each, ease, from, startDelay })
//   type:"spring" transitions use the same duration/bounce spring solver.
import { gsap } from './core.js';
import { ease as resolveEase, spring } from './lib/ease.js';

const ORIGINS = [
  ['origin-top-left!', '0% 0%'],
  ['origin-bottom-right!', '100% 100%'],
  ['origin-left!', '0% 50%'],
  ['origin-right!', '100% 50%'],
  ['origin-bottom!', '50% 100%'],
];

function originFor(el) {
  const cls = el.getAttribute('class') || '';
  for (const [c, o] of ORIGINS) if (cls.split(/\s+/).includes(c)) return o;
  const style = el.getAttribute('style') || '';
  const m = style.match(/transform-origin:\s*(left|right)/);
  if (m) return m[1] === 'left' ? '0% 50%' : '100% 50%';
  return '50% 50%'; // Motion default for SVG: transform-box fill-box, origin center
}

/** Convert Motion values (pathLength, x:"-110%") to GSAP vars for an SVG element */
function toVars(el, values) {
  const v = {};
  for (const [k, val] of Object.entries(values)) {
    if (k === 'pathLength') v.drawSVG = `${val * 100}%`;
    else if ((k === 'x' || k === 'y') && typeof val === 'string' && val.endsWith('%')) {
      const box = el.getBBox ? el.getBBox() : { width: el.offsetWidth, height: el.offsetHeight };
      v[k] = (parseFloat(val) / 100) * (k === 'x' ? box.width : box.height);
    } else v[k] = val;
  }
  return v;
}

/** apply each element's Motion `initial` (data-initial) */
export function applyInitial(root) {
  root.querySelectorAll('[data-initial]').forEach((el) => {
    const init = JSON.parse(el.getAttribute('data-initial'));
    const origin = originFor(el);
    // GSAP bakes the origin into the SVG transform matrix; the Tailwind `origin-*!` classes
    // (with !important) would otherwise override GSAP's inline transform-origin and double it.
    ORIGINS.forEach(([c]) => el.classList.remove(c));
    gsap.set(el, { transformOrigin: origin, ...toVars(el, init) });
  });
}

function staggerDelay(def, i, total) {
  if (typeof def === 'number') return def;
  if (!def || def.__stagger === undefined) return 0;
  const each = def.__stagger;
  const from = typeof def.from === 'number' ? def.from : def.from === 'last' ? total - 1 : def.from === 'center' ? (total - 1) / 2 : 0;
  let d = each * Math.abs(from - i);
  if (def.ease) {
    const t = total * each;
    d = resolveEase(def.ease)(d / t) * t;
  }
  return (def.startDelay || 0) + d;
}

export function playSequence(root, sequence) {
  const tl = gsap.timeline();
  let prevStart = 0;
  let current = 0;
  for (const [selector, values, opts = {}] of sequence) {
    const { at, delay, ...transition } = opts;
    let start = current;
    if (typeof at === 'number') start = at;
    else if (typeof at === 'string') {
      if (at === '<') start = prevStart;
      else if (at.startsWith('<')) start = prevStart + parseFloat(at.slice(1));
      else if (at.startsWith('+') || at.startsWith('-')) start = Math.max(0, current + parseFloat(at));
    }
    const els = Array.from(root.querySelectorAll(selector));
    let duration, easeFn;
    if (transition.type === 'spring') {
      const s = spring(transition.duration ?? 0.3, transition.bounce ?? 0.3);
      duration = s.duration;
      easeFn = s.ease;
    } else {
      duration = transition.duration ?? 0.3;
      easeFn = resolveEase(transition.ease ?? 'easeOut');
    }
    let maxEnd = 0;
    els.forEach((el, i) => {
      const d = staggerDelay(delay, i, els.length);
      tl.to(el, { ...toVars(el, values), duration, ease: easeFn }, start + d);
      maxEnd = Math.max(maxEnd, d + duration);
    });
    prevStart = start;
    current = start + maxEnd;
  }
  return tl;
}
