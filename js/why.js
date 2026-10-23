// Why Envizon stacked cards (the /solutions card stack of the template family), kept light:
// cards are sticky from md up; as the next card slides over, the covered one dims through an
// opacity-only overlay (compositor work, no restyle of the card's text). Divider rules draw in
// once (scaleX). Nothing loops. Low-power devices and reduced motion skip the dimming entirely.
import { gsap, ScrollTrigger, $, $$, isMobile, lowPower, reducedMotion } from './core.js';
import { EASE } from './lib/ease.js';

const MAX_DIM = 0.8; // covered card keeps 20% of its contrast

export function initWhy() {
  const section = $('[data-why]');
  if (!section) return;
  const cards = $$('[data-why-card]', section);
  if (!cards.length) return;

  const rules = (card) => $$('[data-why-rule]', card);
  if (reducedMotion || lowPower) {
    cards.forEach((card) => gsap.set(rules(card), { scaleX: 1 }));
    return;
  }

  cards.forEach((card, i) => {
    // divider rules: lineDrawAnim, staggered left to right, once
    ScrollTrigger.create({
      trigger: card, start: 'top 70%', once: true,
      onEnter: () => gsap.to(rules(card), { scaleX: 1, duration: 1.2, ease: EASE.circInOut, stagger: 0.08 }),
    });

    // dim the covered card (cards only stack, i.e. are sticky, from md up)
    const next = cards[i + 1];
    const dim = $('[data-why-dim]', card);
    if (!next || !dim || isMobile()) return;
    const setDim = gsap.quickSetter(dim, 'opacity');
    ScrollTrigger.create({
      trigger: next, start: 'top 60%', end: 'top top',
      onUpdate: (self) => {
        setDim(self.progress * MAX_DIM);
        if (self.progress > 0.5) card.setAttribute('aria-hidden', 'true');
        else card.removeAttribute('aria-hidden');
      },
    });
  });
}
