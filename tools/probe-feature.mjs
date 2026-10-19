// Measures infographic element boxes mid-animation on live vs clone.
// usage: node tools/probe-feature.mjs <url> <slideIndex> <selector> [delayMs]
import { chromium } from 'playwright-core';

const [url, idx, sel, delay = '700'] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.route(/enzuzo|googletagmanager|google-analytics|cloudflareinsights|cdn-cgi\/rum/, (r) => r.abort());
const p = await ctx.newPage();
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForTimeout(5000);
await p.locator('section.bg-white-2').first().scrollIntoViewIfNeeded();
await p.waitForTimeout(1000);
await p.locator(`button[aria-label="Navigate to slide ${(Number(idx) + 1) % 4}"]`).first().click();
await p.waitForTimeout(600);
await p.locator(`button[aria-label="Navigate to slide ${idx}"]`).first().click();
const samples = [];
for (const t of [100, Number(delay), 1400]) {
  await p.waitForTimeout(t - (samples.length ? [100, Number(delay), 1400][samples.length - 1] : 0));
  samples.push(await p.evaluate((sel) => [...document.querySelectorAll(sel)].map((el) => {
    const r = el.getBoundingClientRect();
    return { x: Math.round(r.x), w: Math.round(r.width), y: Math.round(r.y), h: Math.round(r.height), t: el.getAttribute('transform'), st: el.getAttribute('style') };
  }), sel));
}
console.log(JSON.stringify(samples, null, 0));
await b.close();
