// Logo marquee — vanilla port of react-fast-marquee (autoFill, speed px/s, direction left).
// Uses the library's own CSS (css/marquee.css): two .rfm-marquee tracks translating -100%.
import { $$ } from './core.js';

export function initMarquee() {
  $$('[data-marquee]').forEach((container) => {
    const speed = Number(container.dataset.marquee) || 50;
    const track = container.querySelector('.rfm-marquee');
    const initial = track.querySelector('.rfm-initial-child-container');
    const originals = Array.from(initial.children);

    const build = () => {
      // reset to one set of logos
      container.querySelectorAll('.rfm-marquee').forEach((m, i) => i > 0 && m.remove());
      Array.from(track.children).forEach((c) => c !== initial && c.remove());

      const containerWidth = container.getBoundingClientRect().width;
      const marqueeWidth = initial.getBoundingClientRect().width;
      const multiplier = marqueeWidth && marqueeWidth < containerWidth ? Math.ceil(containerWidth / marqueeWidth) : 1;

      for (let i = 1; i < multiplier; i++) {
        const copy = document.createElement('div');
        copy.className = 'rfm-initial-child-container';
        originals.forEach((o) => copy.appendChild(o.cloneNode(true)));
        copy.setAttribute('aria-hidden', 'true');
        track.appendChild(copy);
      }
      const duration = (marqueeWidth * multiplier) / speed;
      track.style.setProperty('--duration', `${duration}s`);
      track.style.setProperty('--min-width', 'auto');

      const clone = track.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      container.appendChild(clone);

      // restart both tracks together so they stay in phase
      const tracks = container.querySelectorAll('.rfm-marquee');
      tracks.forEach((t) => (t.style.animation = 'none'));
      void container.offsetWidth;
      tracks.forEach((t) => (t.style.animation = ''));
    };

    const imgs = $$('img', initial);
    Promise.all(imgs.map((img) => (img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; })))).then(build);
    let w = window.innerWidth;
    window.addEventListener('resize', () => {
      if (window.innerWidth !== w) { w = window.innerWidth; build(); }
    });
  });
}
