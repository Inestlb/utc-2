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

const motionProviderPath = path.join(root, 'components', 'home', 'HomeMotionProvider.tsx');
assert.equal(fs.existsSync(motionProviderPath), true, 'HomeMotionProvider should centralize Framer Motion features');

const homePageSource = read('app', 'page.tsx');
const motionProviderSource = fs.readFileSync(motionProviderPath, 'utf8');
const animatedHomeFiles = [
  'HeroSection.tsx',
  'SolutionsSection.tsx',
  'ExpertiseSection.tsx',
  'PartnersSection.tsx',
  'ValuePropositionSection.tsx',
  'CtaSection.tsx',
];

assert.match(motionProviderSource, /LazyMotion/);
assert.match(motionProviderSource, /features=\{domAnimation\}/);
assert.match(homePageSource, /<HomeMotionProvider>/);

for (const file of animatedHomeFiles) {
  const source = read('components', 'home', file);
  assert.match(source, /import \{ m \} from ["']framer-motion["'];/);
  assert.doesNotMatch(source, /\bmotion\./);
}
