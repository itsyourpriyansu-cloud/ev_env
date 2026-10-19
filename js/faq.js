// FAQ accordion (single open, collapsible) — same animation as the mobile menu accordion
// (accordion-down/up keyframes driven by --radix-accordion-content-height).
import { $, $$ } from './core.js';

export function initFaq() {
  const items = $$('[data-faq-item]');
  if (!items.length) return;

  const set = (item, open) => {
    const btn = $('button', item);
    const region = $('[role="region"]', item);
    const state = open ? 'open' : 'closed';
    if ((item.dataset.state === 'open') === open) return;
    [item, btn, region].forEach((el) => (el.dataset.state = state));
    btn.setAttribute('aria-expanded', String(open));
    region.hidden = false;
    region.style.setProperty('--radix-accordion-content-height', `${region.scrollHeight}px`);
    if (!open) {
      region.addEventListener('animationend', () => { if (region.dataset.state === 'closed') region.hidden = true; }, { once: true });
    }
  };

  items.forEach((item) => {
    $('button', item).addEventListener('click', () => {
      const willOpen = item.dataset.state !== 'open';
      items.forEach((other) => set(other, other === item && willOpen));
    });
  });
}
