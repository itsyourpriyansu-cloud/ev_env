// Drives the main interactions on a URL and screenshots each state.
// usage: node tools/interactions.mjs <url> <name>
import { chromium } from 'playwright-core';
import fs from 'node:fs';

const [url, name] = process.argv.slice(2);
const dir = `reference/interactions/${name}`;
fs.mkdirSync(dir, { recursive: true });
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const block = (ctx) => ctx.route(/enzuzo|googletagmanager|google-analytics|cloudflareinsights|cdn-cgi\/rum/, (r) => r.abort());
const errors = [];

// desktop
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  await block(ctx);
  const p = await ctx.newPage();
  p.on('pageerror', (e) => errors.push(e.message));
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.waitForTimeout(5500);
  // nav dropdown
  await p.hover('nav[aria-label="Main navigation"] >> text=Resources');
  await p.waitForTimeout(600);
  await p.screenshot({ path: `${dir}/nav-hover.png`, clip: { x: 0, y: 0, width: 800, height: 200 } });
  await p.mouse.move(700, 600);
  // solution card hover
  const card = p.locator('main section:nth-of-type(3) a.group').nth(1);
  await card.scrollIntoViewIfNeeded();
  await p.waitForTimeout(2500);
  await card.hover();
  await p.waitForTimeout(1200);
  await p.screenshot({ path: `${dir}/card-hover.png` });
  // footer solutions hover
  const footerTitle = p.locator('footer >> text=Compliance and Traceability').last();
  await footerTitle.scrollIntoViewIfNeeded();
  await p.waitForTimeout(2500);
  await footerTitle.hover();
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `${dir}/footer-hover.png` });
  // contact dialog
  await p.locator('header a:has-text("Get Started")').click();
  await p.waitForTimeout(1200);
  await p.screenshot({ path: `${dir}/contact.png` });
  await p.locator('[role="dialog"] button[type="submit"]').click();
  await p.waitForTimeout(800);
  await p.locator('[role="dialog"] input[name="Email"]').fill('me@gmail.com');
  await p.locator('[role="dialog"] button[type="submit"]').click();
  await p.waitForTimeout(800);
  await p.locator('[role="dialog"] input[name="Email"]').focus();
  await p.waitForTimeout(500);
  await p.screenshot({ path: `${dir}/contact-errors.png` });
  await p.locator('[role="dialog"] button[role="combobox"]').click();
  await p.waitForTimeout(600);
  await p.screenshot({ path: `${dir}/contact-select.png` });
  await p.keyboard.press('Escape');
  await p.waitForTimeout(300);
  await p.keyboard.press('Escape');
  await p.waitForTimeout(600);
  console.log(name, 'after Esc hash =', await p.evaluate(() => location.hash), 'dialog visible =', await p.locator('[role="dialog"]').isVisible().catch(() => false));
  await ctx.close();
}
// mobile menu
{
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await block(ctx);
  const p = await ctx.newPage();
  p.on('pageerror', (e) => errors.push(e.message));
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.waitForTimeout(5500);
  await p.locator('button[data-slot="dropdown-menu-trigger"]').first().click();
  await p.waitForTimeout(800);
  await p.locator('[role="menu"] button:has-text("Resources")').first().click({ position: { x: 300, y: 10 }, force: true });
  await p.waitForTimeout(800);
  await p.screenshot({ path: `${dir}/mobile-menu.png` });
  await ctx.close();
}
console.log(name, 'errors:', errors.length ? errors : 'none');
await b.close();
