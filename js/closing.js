// Closing CTA background: three stacked octagon outlines that shift horizontally in an
// endless loop once in view — x keyframes over 4s, each segment eased [.87,0,.13,1].
import { gsap, $, $$, inView, reducedMotion } from './core.js';
import { cubicBezier } from './lib/ease.js';

const KEYS = [
  ['0%', '0%', '60%', '0%'],
  ['0%', '30%', '60%', '0%'],
  ['0%', '60%', '60%', '0%'],
];
const h = cubicBezier(0.87, 0, 0.13, 1);

export function initClosing() {
  const wrap = $('[data-octagons]');
  if (!wrap || reducedMotion) return;
  const layers = $$(':scope > div', wrap);
  inView(wrap, () => {
    layers.forEach((layer, i) => {
      const k = KEYS[i];
      const tl = gsap.timeline({ repeat: -1 });
      for (let s = 1; s < k.length; s++) {
        tl.to(layer, { xPercent: parseFloat(k[s]), duration: 4 / 3, ease: h });
      }
    });
  }, { margin: '0px', once: true });
}
