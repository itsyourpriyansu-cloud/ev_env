// Reference capture of the Statiq station-detail hero (UX reference only, nothing reused):
// screenshot + key computed styles of the map/search/list/detail panel.
import { chromium } from 'playwright-core';
import fs from 'node:fs';

const url = 'https://www.statiq.in/jai-balaji-motors-ev-charging-station-id-16155?longLat=79.551658,25.575322';
fs.mkdirSync('reference/statiq', { recursive: true });
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const reqs = new Set();
p.on('request', (r) => reqs.add(new URL(r.url()).hostname));
await p.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
await p.waitForTimeout(4000);
await p.screenshot({ path: 'reference/statiq/hero-1440.png' });
const info = await p.evaluate(() => {
  const pick = (el) => {
    if (!el) return null;
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return { tag: el.tagName, cls: String(el.className).slice(0, 120), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height),
      bg: s.backgroundColor, color: s.color, radius: s.borderRadius, shadow: s.boxShadow.slice(0, 80), font: s.fontFamily.slice(0, 50), fs: s.fontSize, fw: s.fontWeight, border: s.border.slice(0, 40) };
  };
  const byText = (t) => [...document.querySelectorAll('body *')].find((e) => e.children.length === 0 && e.textContent.trim() === t);
  const climb = (el, n) => { while (el && n--) el = el.parentElement; return el; };
  const input = document.querySelector('input');
  return {
    input: pick(input), inputBox: pick(climb(input, 2)),
    crumbs: pick(climb(byText('Home'), 2)),
    cardTitle: pick(byText('JAI BALAJI MOTORS')),
    directions: pick(climb(byText('Directions'), 1)),
    openNow: pick(byText('Open now')),
    dcBadge: pick(byText('DC')),
    titleChip: pick(climb(byText('EV Charging Stations'), 0)),
    price: pick(byText('₹ 14.0')),
    canvases: document.querySelectorAll('canvas').length,
    mapLike: [...document.querySelectorAll('[class*=map], [class*=Map], .gm-style, .maplibregl-map, .mapboxgl-map, .leaflet-container')].map((e) => String(e.className).slice(0, 60)).slice(0, 6),
    bodyFont: getComputedStyle(document.body).fontFamily,
  };
});
fs.writeFileSync('reference/statiq/info.json', JSON.stringify({ info, hosts: [...reqs] }, null, 2));
console.log(JSON.stringify(info, null, 1));
console.log('hosts', [...reqs].join(', '));
await b.close();
