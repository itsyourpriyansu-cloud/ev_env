// Builds the EV-brand logo set for the section 3 marquee from the simple-icons package (CC0 path data;
// the marks themselves remain trademarks of their owners). Each SVG is cropped to its true bounds so the
// marquee can size logos optically, single-ink via currentColor, with a <title> for screen readers.
// Output: assets/logos/{slug}.svg   usage: node tools/build-logos.mjs
import { chromium } from 'playwright-core';
import fs from 'node:fs';

const BRANDS = JSON.parse(fs.readFileSync('content/homepage.json', 'utf8')).brands.items;

const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const p = await b.newPage();
fs.mkdirSync('assets/logos', { recursive: true });
for (const { slug, name } of BRANDS) {
  const src = fs.readFileSync(`node_modules/simple-icons/icons/${slug}.svg`, 'utf8');
  const d = src.match(/ d="([^"]+)"/)[1];
  const box = await p.evaluate((path) => {
    document.body.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="240" height="240"><path d="${path}"/></svg>`;
    const r = document.querySelector('path').getBBox();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  }, d);
  const vb = [box.x, box.y, box.w, box.h].map((n) => +n.toFixed(3)).join(' ');
  fs.writeFileSync(`assets/logos/${slug}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" fill="currentColor" role="img"><title>${name}</title><path d="${d}"/></svg>\n`);
  console.log(slug.padEnd(10), 'aspect', (box.w / box.h).toFixed(2));
}
await b.close();
