// Captures the partner CTA (#partners) with its background loop and checks the video plays. Requires the dev server.
import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', args: ['--autoplay-policy=no-user-gesture-required'] });
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  const errors = [];
  p.on('pageerror', (e) => errors.push(e.message));
  p.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await p.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(3000);
  const sec = p.locator('#partners');
  await sec.scrollIntoViewIfNeeded();
  await p.waitForTimeout(4000);
  const state = await p.evaluate(() => {
    const v = document.querySelector('[data-partners-video]');
    return { src: v.currentSrc.split('/').pop(), t: +v.currentTime.toFixed(2), paused: v.paused, ready: v.readyState };
  });
  await sec.screenshot({ path: `reference/qa/partners-${w}.png` });
  console.log(w, JSON.stringify(state), '| errors:', errors.length ? errors : 'none');
  await p.close();
}
await b.close();
