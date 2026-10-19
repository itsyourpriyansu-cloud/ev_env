// Pixel-diff live reference shots (reference/shots) vs clone shots (reference/clone-shots).
// Writes red-highlighted diff images to reference/diff and prints % of differing pixels.
// usage: node tools/diff.mjs [width]
import fs from 'node:fs';
import path from 'node:path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const width = process.argv[2];
const A = 'reference/shots', B = 'reference/clone-shots', OUT = 'reference/diff';
fs.mkdirSync(OUT, { recursive: true });
const files = fs.readdirSync(B).filter((f) => /^\d+-\d+\.png$/.test(f) && (!width || f.startsWith(width + '-'))).sort();
for (const f of files) {
  if (!fs.existsSync(path.join(A, f))) { console.log(f, 'no live counterpart'); continue; }
  const a = PNG.sync.read(fs.readFileSync(path.join(A, f)));
  const b = PNG.sync.read(fs.readFileSync(path.join(B, f)));
  if (a.width !== b.width || a.height !== b.height) { console.log(f, 'size mismatch', a.width, a.height, b.width, b.height); continue; }
  const diff = new PNG({ width: a.width, height: a.height });
  const n = pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: 0.15 });
  fs.writeFileSync(path.join(OUT, f), PNG.sync.write(diff));
  console.log(f.padEnd(14), ((n / (a.width * a.height)) * 100).toFixed(2) + '%');
}
