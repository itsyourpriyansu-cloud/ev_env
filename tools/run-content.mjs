// Cross-platform launcher for the content build (tools/brand_envizon.py) using the project venv.
// usage: node tools/run-content.mjs [--production]
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

const venvPy = process.platform === 'win32' ? path.join('.venv', 'Scripts', 'python.exe') : path.join('.venv', 'bin', 'python');
const python = existsSync(venvPy) ? venvPy : 'python';
const r = spawnSync(python, ['tools/brand_envizon.py', ...process.argv.slice(2)], { stdio: 'inherit' });
process.exit(r.status ?? 1);
