// Renders the traced logo set next to the original JPG for visual QA.
import { chromium } from 'playwright-core';
import path from 'node:path';
import fs from 'node:fs';

const u = (p) => 'file:///' + path.resolve(p).split(path.sep).join('/');
fs.writeFileSync('reference/logo-preview.html', `<style>body{margin:0;font:12px Arial}.r{display:flex;gap:24px;align-items:center;padding:16px}</style>
<div class=r style="background:#fff"><img src="${u('Envizon_EV_Logo_Final.jpg')}" style="height:120px"><img src="${u('assets/brand/logo-full.svg')}" style="height:110px"></div>
<div class=r style="background:#183028"><img src="${u('assets/brand/logo-full-white.svg')}" style="height:110px"><img src="${u('assets/brand/logo-mark.svg')}" style="height:80px"><img src="${u('assets/brand/logo-full.svg')}" style="height:24px;background:#fff;padding:9px 12px;border-radius:6px"></div>
<div class=r style="background:#fafafa;color:#183028"><img src="${u('assets/brand/logo-mark-outline.svg')}" style="height:80px"><img src="${u('assets/brand/logo-full.svg')}" style="height:22px"><img src="${u('assets/brand/logo-mark.svg')}" style="height:22px"></div>`);
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const p = await b.newPage({ viewport: { width: 1100, height: 520 } });
await p.goto(u('reference/logo-preview.html'));
await p.waitForTimeout(500);
await p.screenshot({ path: 'reference/logo-preview.png', fullPage: true });
await b.close();
