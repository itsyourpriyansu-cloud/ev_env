// CSS custom properties the original sets from JS on <html>:
// --s-vp-height-js, --h-header, --h-footer, --h-announcement(-dynamic)
const root = document.documentElement;

export function initVars() {
  let lastWidth = 0;
  const setViewport = () => {
    // only on width change, so mobile URL-bar show/hide doesn't jump layouts
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    root.style.setProperty('--s-vp-height-js', `${window.innerHeight}px`);
  };
  root.style.setProperty('--h-announcement', '0px');
  root.style.setProperty('--h-announcement-dynamic', '0px');
  setViewport();

  const header = document.getElementById('site-header');
  const setHeader = () => root.style.setProperty('--h-header', `${header?.offsetHeight || 0}px`);
  setHeader();

  const footer = document.querySelector('[data-footer]');
  const setFooter = () => footer && root.style.setProperty('--h-footer', `${footer.offsetHeight}px`);
  setFooter();
  if (footer) new ResizeObserver(setFooter).observe(footer);

  window.addEventListener('resize', () => {
    setViewport();
    setHeader();
  });
}
