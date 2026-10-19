// In-page navigation: smooth Lenis scroll to #section anchors, offset below the floating header.
// "#contact" is handled by the quote dialog (contact.js), so it's skipped here.
export function initAnchors({ lenis }) {
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented) return;
    const hash = a.getAttribute('href');
    if (hash === '#' || hash === '#contact') return;
    const target = hash === '#top' ? 0 : document.querySelector(hash);
    if (target === null) return;
    e.preventDefault();
    const header = document.getElementById('site-header');
    const offset = -((header?.offsetHeight || 0) + 20);
    lenis.scrollTo(target, { offset: target === 0 ? 0 : offset, force: true, duration: 1.2 });
    history.replaceState(null, '', hash === '#top' ? location.pathname + location.search : hash);
  });
}
