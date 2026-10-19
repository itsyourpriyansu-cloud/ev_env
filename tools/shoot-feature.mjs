// Screenshots the Results carousel stage for each slide (after its animation settles)
// on any URL — used to compare live vs clone infographics.
// usage: node tools/shoot-feature.mjs <url> <prefix>
import { chromium } from 'playwright-core';

const [url, prefix = 'x'] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.route(/enzuzo|googletagmanager|google-analytics|cloudflareinsights|cdn-cgi\/rum/, (r) => r.abort());
const p = await ctx.newPage();
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForTimeout(5000);
const stage = p.locator('section.bg-white-2').first();
await stage.scrollIntoViewIfNeeded();
await p.waitForTimeout(1500);
for (let i = 0; i < 4; i++) {
  // jump straight to slide i via its dot, then grab mid-animation and settled frames
  const target = (i + 1) % 4; // move away first so the slide re-mounts
  await p.locator(`button[aria-label="Navigate to slide ${target}"]`).first().click();
  await p.waitForTimeout(600);
  await p.locator(`button[aria-label="Navigate to slide ${i}"]`).first().click();
  await p.waitForTimeout(700);
  await stage.screenshot({ path: `reference/feature/${prefix}-${i}-mid.png` });
  await p.waitForTimeout(2000);
  await stage.screenshot({ path: `reference/feature/${prefix}-${i}-end.png` });
}
await b.close();
