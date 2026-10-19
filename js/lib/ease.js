// Motion (framer-motion) easing + spring equivalents for GSAP, so every tween uses
// the same curve the live site uses.
import { gsap } from 'gsap';

// --- cubic-bezier --------------------------------------------------------------
export function cubicBezier(x1, y1, x2, y2) {
  const ax = 3 * x1 - 3 * x2 + 1, bx = 3 * x2 - 6 * x1, cx = 3 * x1;
  const ay = 3 * y1 - 3 * y2 + 1, by = 3 * y2 - 6 * y1, cy = 3 * y1;
  const sx = (t) => ((ax * t + bx) * t + cx) * t;
  const sy = (t) => ((ay * t + by) * t + cy) * t;
  const dx = (t) => (3 * ax * t + 2 * bx) * t + cx;
  const solve = (x) => {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const e = sx(t) - x;
      if (Math.abs(e) < 1e-6) return t;
      const d = dx(t);
      if (Math.abs(d) < 1e-6) break;
      t -= e / d;
    }
    let lo = 0, hi = 1;
    t = x;
    while (lo < hi) {
      const v = sx(t);
      if (Math.abs(v - x) < 1e-6) return t;
      x > v ? (lo = t) : (hi = t);
      t = (lo + hi) / 2;
      if (hi - lo < 1e-7) break;
    }
    return t;
  };
  return (p) => (p <= 0 ? 0 : p >= 1 ? 1 : sy(solve(p)));
}

// Motion named easings
const NAMED = {
  linear: (p) => p,
  easeIn: cubicBezier(0.42, 0, 1, 1),
  easeOut: cubicBezier(0, 0, 0.58, 1),
  easeInOut: cubicBezier(0.42, 0, 0.58, 1),
  circIn: (p) => 1 - Math.sin(Math.acos(p)),
  circOut: (p) => Math.sin(Math.acos(p - 1)),
  // Motion: mirrorEasing(circIn)
  circInOut: (p) => (p <= 0.5 ? (1 - Math.sin(Math.acos(2 * p))) / 2 : (2 - (1 - Math.sin(Math.acos(2 * (1 - p))))) / 2),
  backOut: cubicBezier(0.33, 1.53, 0.69, 0.99),
  backIn: (p) => 1 - cubicBezier(0.33, 1.53, 0.69, 0.99)(1 - p),
};

/** Resolve a Motion ease definition ("easeOut" | [x1,y1,x2,y2]) to a GSAP ease fn */
export function ease(def) {
  if (!def) return NAMED.easeOut;
  if (typeof def === 'function') return def;
  if (Array.isArray(def)) return cubicBezier(...def);
  return NAMED[def] || gsap.parseEase(def);
}

// --- spring ---------------------------------------------------------------------
// Port of Motion's duration/bounce spring (findSpring + generator), returning an ease
// and the real settle duration so a GSAP tween reproduces the same motion.
const cache = new Map();
export function spring(duration = 0.3, bounce = 0.3) {
  const key = duration + '|' + bounce;
  if (cache.has(key)) return cache.get(key);
  const dampingRatio = Math.min(Math.max(1 - bounce, 0.05), 1);
  const d = Math.min(Math.max(duration, 0.01), 10);
  const safeMin = 0.001;
  let envelope;
  if (dampingRatio < 1) {
    envelope = (w) => {
      const decay = w * dampingRatio;
      const a = decay;
      const b = w * Math.sqrt(1 - dampingRatio * dampingRatio);
      return safeMin - (a / b) * Math.exp(-decay * d);
    };
  } else {
    envelope = (w) => -safeMin + Math.exp(-w * d) * (w * d + 1);
  }
  // Newton with numeric derivative (Motion uses 12 iterations of approximateRoot)
  let w = 5 / d;
  for (let i = 0; i < 12; i++) {
    const h = 1e-5;
    const der = (envelope(w + h) - envelope(w - h)) / (2 * h);
    if (!der) break;
    w -= envelope(w) / der;
  }
  const zeta = dampingRatio;
  const pos = zeta < 1
    ? (t) => {
        const wd = w * Math.sqrt(1 - zeta * zeta);
        return 1 - Math.exp(-zeta * w * t) * (Math.cos(wd * t) + ((zeta * w) / wd) * Math.sin(wd * t));
      }
    : (t) => 1 - Math.exp(-w * t) * (1 + w * t);
  // settle time (restDelta 0.01 / restSpeed ~0.01 for unit values)
  let settle = d;
  const step = 1 / 120;
  let last = 0;
  for (let t = 0; t < 10; t += step) {
    const v = pos(t);
    if (Math.abs(1 - v) < 0.005 && Math.abs(v - last) / step < 0.05) { settle = t; break; }
    last = v;
  }
  const out = { duration: settle, ease: (p) => (p >= 1 ? 1 : pos(p * settle)) };
  cache.set(key, out);
  return out;
}

/** Convert a Motion transition object to GSAP vars ({duration, ease, delay}) */
export function transition(t = {}) {
  if (t.type === 'spring') {
    const s = spring(t.duration ?? 0.3, t.bounce ?? 0.3);
    return { duration: s.duration, ease: s.ease };
  }
  return { duration: t.duration ?? 0.3, ease: ease(t.ease ?? 'easeOut') };
}

export const EASE = {
  fadeMove: cubicBezier(0.1, 0.1, 0.1, 1),
  reveal: cubicBezier(0.85, 0, 0.15, 1),
  preloaderLogo: cubicBezier(0.87, 0, 0.13, 1),
  preloaderCurtain: cubicBezier(0.5, 0, 0.05, 1),
  ...NAMED,
};
