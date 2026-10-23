// Fade-in for lazy images: the template CSS keeps img[loading=lazy] at opacity 0 until it has
// .lazyloaded (opacity transition 1s). Add the class once each image is decoded, so it eases in
// rather than popping; images already in the cache resolve immediately.
import { $$ } from './core.js';

export function initLazyFade() {
  $$('img[loading="lazy"]:not(.lazyloaded)').forEach((img) => {
    const show = () => img.classList.add('lazyloaded');
    if (img.complete && img.naturalWidth) return show();
    img.addEventListener('load', () => (img.decode ? img.decode().catch(() => {}).then(show) : show()), { once: true });
    img.addEventListener('error', show, { once: true }); // never leave an invisible broken box
  });
}
