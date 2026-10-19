// Opens the mobile menu (and the Resources accordion) and screenshots it.
// usage: node tools/mobile-menu.mjs <url> <name>
import { chromium } from 'playwright-core';
import fs from 'node:fs';

const [url, name] = process.argv.slice(2);
fs.mkdirSync('reference/interactions', { recursive: true });
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
await ctx.route(/enzuzo|googletagmanager|google-analytics|cloudflareinsights|cdn-cgi\/rum/, (r) => r.abort());
const p = await ctx.newPage();
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForTimeout(5500);
const t = await p.locator('button[data-slot="dropdown-menu-trigger"]').first().boundingBox();
await p.mouse.click(t.x + t.width / 2, t.y + t.height / 2);
await p.waitForTimeout(800);
await p.screenshot({ path: `reference/interactions/${name}-menu-open.png` });
const r = await p.locator('[data-slot="dropdown-menu-content"] button[data-slot="accordion-trigger"]').nth(2).boundingBox();
if (r) await p.mouse.click(r.x + r.width - 20, r.y + r.height / 2);
await p.waitForTimeout(800);
await p.screenshot({ path: `reference/interactions/${name}-menu-accordion.png` });
await b.close();
