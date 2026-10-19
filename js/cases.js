// Case-study stack: sticky panels (top = header + section-title height + 20px),
// each panel dims (bg-green-7 overlay opacity) as the next one scrolls over it
// (useScroll target=next, offset ["start end","start start"]), and the outline logo in
// the section title draws in reverse with scroll progress (DrawSVG, 0.2s catch-up tween).
import { gsap, ScrollTrigger, $, $$, reducedMotion } from './core.js';

export function initCases() {
  const section = $('[data-cases]');
  if (!section) return;
  const stack = $('[data-cases-stack]', section);
  const panels = $$('[data-case-panel]', stack);
  const titleBar = $(':scope > div.p-x-max', panels[0]);

  const layout = () => {
    const d = titleBar ? titleBar.offsetHeight : 0;
    panels.forEach((panel, i) => {
      panel.style.top = i === 0 ? 'calc(var(--h-header) + 20px)' : `calc(${d}px + var(--h-header) + 20px)`;
      const card = $(':scope > div.bg-white-2', panel);
      if (card) card.style.height = `Min(calc(var(--s-vp-height) - var(--h-header) - ${d}px - 20px), var(--h-vp-height-max))`;
    });
  };
  layout();
  window.addEventListener('resize', () => { layout(); ScrollTrigger.refresh(); });

  // overlays
  panels.forEach((panel, i) => {
    const next = panels[i + 1];
    const overlay = $('[data-case-overlay]', panel);
    if (!next || !overlay) return;
    ScrollTrigger.create({
      trigger: next,
      start: 'top bottom',
      end: 'top top',
      onUpdate: (self) => {
        overlay.style.opacity = String(self.progress);
        if (self.progress > 0) panel.setAttribute('aria-hidden', 'true');
        else panel.removeAttribute('aria-hidden');
      },
    });
  });

  // BrandLogoProgress (reverse): drawSVG `${100 - 100p}% 100%`, offset ["start start","end end"]
  const draw = $('[data-logo-progress] [data-draw]', section);
  if (draw) {
    draw.setAttribute('stroke', 'var(--color-green-5)');
    gsap.set(draw, { drawSVG: '100% 100%' });
    ScrollTrigger.create({
      trigger: stack,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const p = self.progress;
        gsap.to(draw, { drawSVG: `${100 - 100 * p}% 100%`, duration: reducedMotion ? 0 : 0.2, overwrite: true });
      },
    });
  }
}
