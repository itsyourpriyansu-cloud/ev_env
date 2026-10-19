// Renders favicons (32/180/512) and the 1200x630 OG share image from the traced logo SVGs.
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const u = (p) => 'file:///' + path.resolve(p).split(path.sep).join('/');
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });

for (const size of [32, 180, 512]) {
  const pad = Math.round(size * 0.08);
  fs.writeFileSync('reference/_fav.html', `<body style="margin:0;background:transparent"><div style="width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;background:${size > 32 ? '#063d25' : 'transparent'};border-radius:${size > 32 ? size * 0.22 : 0}px"><img src="${u('assets/brand/logo-mark.svg')}" style="width:${size - pad * 2}px"></div>`);
  const p = await b.newPage({ viewport: { width: size, height: size } });
  await p.goto(u('reference/_fav.html'));
  await p.screenshot({ path: `assets/brand/favicon-${size}.png`, omitBackground: true });
  await p.close();
}

fs.writeFileSync('reference/_og.html', `<body style="margin:0"><div style="width:1200px;height:630px;background:linear-gradient(135deg,#063d25 0%,#07683a 60%,#0f8a45 100%);display:flex;flex-direction:column;justify-content:center;padding:0 96px;box-sizing:border-box;font-family:Arial">
<img src="${u('assets/brand/logo-full-white.svg')}" style="width:560px">
<div style="margin-top:48px;color:#d6f1db;font-size:40px;font-weight:300;letter-spacing:-0.5px">EV Charging Solutions, End to End.</div></div>`);
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.goto(u('reference/_og.html'));
await p.screenshot({ path: 'assets/brand/og.jpg', type: 'jpeg', quality: 88 });
await b.close();
fs.rmSync('reference/_fav.html'); fs.rmSync('reference/_og.html');
console.log('brand images rendered');
