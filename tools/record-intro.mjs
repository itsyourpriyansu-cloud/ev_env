// Records the first seconds of page load (preloader + hero intro) as video, then
// extracts frames at fixed times with ffmpeg for side-by-side comparison.
// usage: node tools/record-intro.mjs <url> <name>
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const [url, name] = process.argv.slice(2);
const dir = `reference/intro-video/${name}`;
fs.rmSync(dir, { recursive: true, force: true });
fs.mkdirSync(dir, { recursive: true });
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, recordVideo: { dir, size: { width: 1440, height: 900 } } });
await ctx.route(/enzuzo|googletagmanager|google-analytics|cloudflareinsights|cdn-cgi\/rum/, (r) => r.abort());
const p = await ctx.newPage();
const t0 = Date.now();
await p.goto(url, { waitUntil: 'commit' });
// mark when DOMContentLoaded happens so frames can be aligned to the app's mount time
const dcl = await p.evaluate(() => new Promise((r) => (document.readyState !== 'loading' ? r(performance.now()) : document.addEventListener('DOMContentLoaded', () => r(performance.now())))));
await p.waitForTimeout(7000);
await ctx.close();
await b.close();
const video = fs.readdirSync(dir).find((f) => f.endsWith('.webm'));
fs.renameSync(`${dir}/${video}`, `${dir}/intro.webm`);
// one frame every 250ms
execFileSync('ffmpeg', ['-v', 'error', '-i', `${dir}/intro.webm`, '-vf', 'fps=4,scale=480:-1', `${dir}/f_%03d.png`]);
console.log(name, 'frames:', fs.readdirSync(dir).filter((f) => f.startsWith('f_')).length, 'dcl(ms):', Math.round(dcl), 'elapsed', Date.now() - t0);
