// Captures the image slots (station detail card + charger range) at desktop and phone widths.
// Requires the dev server. usage: node tools/shoot-images.mjs
import { chromium } from 'playwright-core';

const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(3500);
  // station card: open the first station's detail
  await p.locator('#stations').scrollIntoViewIfNeeded();
  await p.waitForTimeout(800);
  await p.locator('#stations .ev-card').first().click();
  await p.waitForTimeout(1200);
  await p.locator('#stations').screenshot({ path: `reference/qa/img-stations-${w}.png` });
  // charger range: default tab and the 240 kW tab
  const ch = p.locator('#chargers');
  await ch.scrollIntoViewIfNeeded();
  await p.waitForTimeout(1500);
  await ch.screenshot({ path: `reference/qa/img-chargers-${w}.png` });
  const tabs = ch.locator('[role="tab"], button');
  const n = await tabs.count();
  for (let i = 0; i < n; i++) {
    if (/240/.test(await tabs.nth(i).innerText().catch(() => ''))) { await tabs.nth(i).click(); break; }
  }
  await p.waitForTimeout(1500);
  await ch.screenshot({ path: `reference/qa/img-chargers240-${w}.png` });
  await p.close();
}
await b.close();
console.log('ok');
