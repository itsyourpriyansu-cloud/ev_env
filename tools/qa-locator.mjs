import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = []; p.on('pageerror', (e) => errs.push(e.message));
await p.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
await p.waitForTimeout(5000);
await p.evaluate(() => { const el = document.getElementById('stations'); window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY); });
await p.waitForTimeout(2000);
const pinXY = (id) => p.evaluate((id) => { const i = [...document.querySelectorAll('.ev-card')].findIndex(c => c.dataset.id === id); const pin = document.querySelectorAll('.ev-pin')[['HYD-1042','HYD-1057','HYD-1063','HYD-1071','HYD-1088','HYD-1094','HYD-1102','HYD-1117','HYD-1125','HYD-1133','HYD-1146','HYD-1158'].indexOf(id)]; const r = pin.getBoundingClientRect(); return [Math.round(r.x + r.width/2), Math.round(r.y + r.height)]; }, id);
// search
await p.fill('[data-station-search]', 'banjara');
await p.waitForTimeout(300);
console.log('search results:', await p.$$eval('.ev-card', (c) => c.map((x) => x.dataset.id)));
await p.click('.ev-card[data-id="HYD-1094"]');
await p.waitForTimeout(1500);
console.log('detail:', await p.textContent('.ev-detail__name'), '| pin at', await pinXY('HYD-1094'));
await p.screenshot({ path: 'reference/qa/stations-select.png' });
await p.fill('[data-station-search]', '');
// zoom
const s0 = await p.evaluate(() => getComputedStyle(document.querySelector('[data-map-layer]')).transform);
await p.click('[data-zoom-in]'); await p.waitForTimeout(700);
const s1 = await p.evaluate(() => getComputedStyle(document.querySelector('[data-map-layer]')).transform);
console.log('zoom changed:', s0 !== s1, s1.slice(0, 40));
// drag pan
const box = await p.locator('[data-map]').boundingBox();
await p.mouse.move(box.x + 700, box.y + 500); await p.mouse.down(); await p.mouse.move(box.x + 520, box.y + 420, { steps: 8 }); await p.mouse.up();
console.log('after drag:', (await p.evaluate(() => getComputedStyle(document.querySelector('[data-map-layer]')).transform)).slice(0, 60));
// live update
const freeSum = () => p.$$eval('.ev-status__count', (els) => els.map((e) => e.textContent.trim()).join(' '));
const before = await freeSum();
await p.waitForTimeout(16000);
const after = await freeSum();
console.log('live feed changed availability:', before !== after);
// close
await p.click('[data-detail-close]'); await p.waitForTimeout(300);
console.log('detail hidden:', await p.evaluate(() => document.querySelector('[data-station-detail]').hidden));
console.log('errors', errs.length ? errs : 'none');
await b.close();
