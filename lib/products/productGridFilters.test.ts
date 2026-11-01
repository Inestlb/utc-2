import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const filterSource = fs.readFileSync(path.join(process.cwd(), 'components', 'products', 'ProductFilter.tsx'), 'utf8');
const gridSource = fs.readFileSync(path.join(process.cwd(), 'components', 'products', 'ProductGrid.tsx'), 'utf8');
const searchSource = fs.readFileSync(path.join(process.cwd(), 'components', 'products', 'SearchBar.tsx'), 'utf8');

assert.match(filterSource, /Tous les produits/);
assert.match(filterSource, /Lenze/);
assert.match(filterSource, /IFM/);
assert.match(filterSource, /WAGO/);
assert.match(filterSource, /Catégories/);
assert.match(filterSource, /hover:bg-\[#0b2f4f\]/);
assert.match(gridSource, /buildProductsUrl/);
assert.match(gridSource, /totalProducts/);
assert.match(searchSource, /useSearchParams/);
