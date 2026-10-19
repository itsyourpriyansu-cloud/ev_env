// Solution cards ("One partner from site survey to switch-on.").
// Hover card r: every card with index <= r lifts by (btn height + gap), the hovered card
// reveals its "Enquire" label, and a large hairline version of its Envizon icon fades in and
// draws itself behind the section (popLayout cross-fade on the spring .5s bounce 0).
import { gsap, $, $$, isTouch } from './core.js';
import { spring, EASE } from './lib/ease.js';
import icons from '../content/icons.json';

const LIFT = '-translate-y-[calc(var(--l-card-btn-h)+var(--l-card-btn-gap))]';
const ICON_HEIGHT = ['h-[150%]', 'h-[140%]', 'h-[150%]', 'h-[140%]'];

export function initSolutions() {
  const section = $('[data-solutions]');
  if (!section) return;
  const cards = $$('[data-solution-card]', section);
  const noise = section.firstElementChild;
  const sp = spring(0.5, 0);
  let current = null;
  let bgEl = null;

  const bigIcon = (i) => {
    const name = cards[i].dataset.icon;
    const wrap = document.createElement('div');
    wrap.className = 'text-green-4 pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden';
    wrap.style.opacity = '0';
    wrap.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" fill="none" stroke="currentColor" stroke-width=".12" stroke-linecap="round" stroke-linejoin="round" class="w-auto shrink-0 ${ICON_HEIGHT[i] || 'h-[150%]'}" aria-hidden="true">${icons.solution[name] || ''}</svg>`;
    // hairline draw-in of every stroke
    gsap.fromTo(wrap.querySelectorAll('path, circle, rect'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.4, ease: EASE.preloaderLogo, stagger: 0.06 });
    return wrap;
  };

  const setHovered = (idx) => {
    if (idx === current) return;
    const prevIcon = current !== null ? cards[current].querySelector('svg')?.outerHTML : null;
    current = idx;
    cards.forEach((card, r) => {
      const inner = card.children[0];
      const btn = card.children[1];
      inner.classList.toggle(LIFT, idx !== null && idx >= r);
      if (btn && btn.classList.contains('pointer-events-none')) {
        const on = idx === r;
        btn.classList.toggle('opacity-100', on);
        btn.classList.toggle('delay-50', on);
        btn.classList.toggle('duration-200', !on);
      }
    });

    // background icon (keyed by icon type, popLayout)
    const nextIcon = idx !== null ? cards[idx].querySelector('svg')?.outerHTML : null;
    if (nextIcon === prevIcon && bgEl) return;
    if (bgEl) {
      const old = bgEl;
      gsap.to(old, { opacity: 0, duration: sp.duration, ease: sp.ease, onComplete: () => old.remove() });
      bgEl = null;
    }
    if (idx !== null) {
      bgEl = bigIcon(idx);
      noise.after(bgEl);
      gsap.to(bgEl, { opacity: 1, duration: sp.duration, ease: sp.ease });
    }
  };

  if (isTouch) return;
  cards.forEach((card, i) => {
    card.addEventListener('mouseenter', () => setHovered(i));
    card.addEventListener('mouseleave', () => setHovered(null));
    card.addEventListener('focus', () => setHovered(i));
    card.addEventListener('blur', () => setHovered(null));
  });
}
