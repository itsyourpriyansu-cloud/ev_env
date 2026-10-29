// Solution cards ("One partner from site survey to switch-on.").
// Hover card r: the hovered card reveals its "Enquire" label inside the card (cards don't move), and a large hairline version of its Envizon icon fades in and
// draws itself behind the section (popLayout cross-fade on the spring .5s bounce 0).
import { gsap, $, $$, isTouch, inView } from './core.js';
import { spring, EASE } from './lib/ease.js';
import icons from '../content/icons.json';

const ICON_HEIGHT = ['h-[150%]', 'h-[140%]', 'h-[150%]', 'h-[140%]'];

export function initSolutions() {
  const section = $('[data-solutions]');
  if (!section) return;
  const cards = $$('[data-solution-card]', section);
  const noise = section.firstElementChild;
  const sp = spring(0.5, 0);
  // desktop: the icon lives in the sticky right-hand panel; smaller screens hide the panel (display:none)
  const panel = $('[data-solutions-icon] .ev-solutions-icon__inner', section);
  const usePanel = () => !!panel && panel.parentElement.offsetParent !== null;
  let current = null;
  let iconIdx = null;
  let bgEl = null;

  const bigIcon = (i, inPanel) => {
    const name = cards[i].dataset.icon;
    const wrap = document.createElement('div');
    wrap.className = 'text-green-4 pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden';
    wrap.style.opacity = '0';
    if (inPanel) wrap.style.color = 'var(--color-green-3)';   // brand green reads on the dark panel
    const size = inPanel ? 'h-[82%]' : ICON_HEIGHT[i] || 'h-[150%]';
    const stroke = inPanel ? '.6' : '.12';
    wrap.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" class="w-auto shrink-0 ${size}" aria-hidden="true">${icons.solution[name] || ''}</svg>`;
    // hairline draw-in of every stroke
    gsap.fromTo(wrap.querySelectorAll('path, circle, rect'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.4, ease: EASE.preloaderLogo, stagger: 0.06 });
    return wrap;
  };

  // cross-fade to card idx's icon (null clears it); popLayout on the same spring as the cards
  const showIcon = (idx) => {
    if (idx === iconIdx) return;
    iconIdx = idx;
    if (bgEl) {
      const old = bgEl;
      gsap.to(old, { opacity: 0, duration: sp.duration, ease: sp.ease, onComplete: () => old.remove() });
      bgEl = null;
    }
    if (idx === null) return;
    const inPanel = usePanel();
    bgEl = bigIcon(idx, inPanel);
    if (inPanel) panel.appendChild(bgEl);
    else noise.after(bgEl);
    gsap.to(bgEl, { opacity: 1, duration: sp.duration, ease: sp.ease });
  };

  const setHovered = (idx) => {
    if (idx === current) return;
    current = idx;
    cards.forEach((card, r) => {
      const btn = card.children[1];
      if (btn && btn.classList.contains('pointer-events-none')) {
        const on = idx === r;
        btn.classList.toggle('opacity-100', on);
        btn.classList.toggle('delay-50', on);
        btn.classList.toggle('duration-200', !on);
      }
    });

    // the panel keeps the last icon on mouse-leave so it never sits empty
    showIcon(idx !== null ? idx : usePanel() ? iconIdx ?? 0 : null);
  };

  // desktop panel: draw the first solution's icon as the section comes into view
  if (panel) inView(section, () => { if (usePanel() && iconIdx === null) showIcon(0); }, { once: true });

  if (isTouch) return;
  cards.forEach((card, i) => {
    card.addEventListener('mouseenter', () => setHovered(i));
    card.addEventListener('mouseleave', () => setHovered(null));
    card.addEventListener('focus', () => setHovered(i));
    card.addEventListener('blur', () => setHovered(null));
  });
}
