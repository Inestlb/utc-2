import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const source = fs.readFileSync(
  path.join(process.cwd(), 'data', 'products.ts'),
  'utf8',
);

assert.match(source, /export async function getProductCatalog/);
assert.match(source, /paginateProducts\(filteredProducts, options\?\.page\)/);
assert.match(source, /PRODUCTS_PER_PAGE/);
assert.doesNotMatch(source, /ITEMS_PER_PAGE = 8/);
assert.match(source, /getProductCategories\(brand\?: string/);
