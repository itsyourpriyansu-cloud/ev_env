// Captures section 3 (EV-brand marquee) and checks it is moving. Requires the dev server.
import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  const errors = [];
  p.on('pageerror', (e) => errors.push(e.message));
  p.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await p.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(3500);
  const sec = p.locator('#brands');
  await sec.scrollIntoViewIfNeeded();
  await p.waitForTimeout(1500);
  const x = () => p.evaluate(() => document.querySelector('#brands .rfm-marquee').getBoundingClientRect().x);
  const x0 = await x(); await p.waitForTimeout(1000); const x1 = await x();
  await sec.screenshot({ path: `reference/qa/brands-${w}.png` });
  console.log(w, 'moved px/s:', (x0 - x1).toFixed(1), '| logos:', await p.locator('#brands .ev-brand__logo').count(),
    '| stations in DOM:', await p.locator('#stations').count(), '| errors:', errors.length ? errors : 'none');
  await p.close();
}
await b.close();
