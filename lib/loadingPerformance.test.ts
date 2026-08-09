import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (...segments: string[]) =>
  fs.readFileSync(path.join(root, ...segments), 'utf8');

const layoutSource = read('app', 'layout.tsx');
const nextConfigSource = read('next.config.mjs');

assert.match(layoutSource, /import \{ Inter \} from "next\/font\/google";/);
assert.doesNotMatch(layoutSource, /Poppins|Playfair_Display|--font-poppins|--font-playfair-display/);
assert.doesNotMatch(layoutSource, /fonts\.googleapis\.com|fonts\.gstatic\.com/);
assert.doesNotMatch(layoutSource, /<link rel="preload" as="image" href="\/images\/LOGO-UTC\.svg"/);
assert.match(nextConfigSource, /minimumCacheTTL:\s*86400/);
