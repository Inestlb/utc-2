import assert from 'node:assert/strict';

interface CategoryPageVisibility {
  showBrandCategoryOverview: boolean;
  showGenericCategoryFilter: boolean;
  showProductResults: boolean;
}

interface VisibilityModule {
  getCategoryPageVisibility(input: {
    brand: string | null;
    category?: string;
  }): CategoryPageVisibility;
}

const moduleUrl = new URL('./categoryPageVisibility.ts', import.meta.url).href;
const { getCategoryPageVisibility } = await import(moduleUrl) as VisibilityModule;

assert.deepEqual(
  getCategoryPageVisibility({ brand: 'ifm' }),
  {
    showBrandCategoryOverview: true,
    showGenericCategoryFilter: false,
    showProductResults: false,
  },
  'The IFM root page should show only category cards',
);

assert.deepEqual(
  getCategoryPageVisibility({ brand: 'ifm', category: 'Capteurs de niveau' }),
  {
    showBrandCategoryOverview: false,
    showGenericCategoryFilter: false,
    showProductResults: false,
  },
  'The IFM level-sensors page should show subcategories without generic filters or product results',
);

const { shouldShowIFMCategorySubcategories } = await import('./ifmInductiveSubcategories.ts');
assert.equal(
  shouldShowIFMCategorySubcategories('ifm', 'Capteurs de niveau'),
  true,
  'The IFM level-sensors page should show its static subcategories',
);

assert.deepEqual(
  getCategoryPageVisibility({ brand: 'ifm', category: 'Capteurs de débit / débitmètres' }),
  {
    showBrandCategoryOverview: false,
    showGenericCategoryFilter: false,
    showProductResults: false,
  },
  'The IFM flow-sensors page should show subcategories without product results',
);
assert.equal(
  shouldShowIFMCategorySubcategories('ifm', 'Capteurs de débit / débitmètres'),
  true,
  'The IFM flow-sensors page should show its static subcategories',
);

assert.deepEqual(
  getCategoryPageVisibility({ brand: 'ifm', category: 'Capteurs de température' }),
  {
    showBrandCategoryOverview: false,
    showGenericCategoryFilter: false,
    showProductResults: false,
  },
  'The IFM temperature-sensors page should show subcategories without product results',
);
assert.equal(
  shouldShowIFMCategorySubcategories('ifm', 'Capteurs de température'),
  true,
  'The IFM temperature-sensors page should show static subcategories',
);

assert.deepEqual(
  getCategoryPageVisibility({ brand: 'ifm', category: 'Détecteur Inductifs' }),
  {
    showBrandCategoryOverview: false,
    showGenericCategoryFilter: false,
    showProductResults: false,
  },
  'The IFM inductive-detectors page should show subcategories without product results',
);

assert.deepEqual(
  getCategoryPageVisibility({ brand: 'ifm', category: 'Détecteurs Capacitifs' }),
  {
    showBrandCategoryOverview: false,
    showGenericCategoryFilter: false,
    showProductResults: false,
  },
  'The IFM capacitive-detectors page should show subcategories without product results',
);

assert.deepEqual(
  getCategoryPageVisibility({ brand: 'lenze' }),
  {
    showBrandCategoryOverview: true,
    showGenericCategoryFilter: false,
    showProductResults: false,
  },
  'The Lenze root page should retain its category-card overview',
);

assert.deepEqual(
  getCategoryPageVisibility({ brand: 'wago' }),
  {
    showBrandCategoryOverview: false,
    showGenericCategoryFilter: true,
    showProductResults: true,
  },
  'WAGO should retain the existing generic filters and product results',
);

assert.deepEqual(
  getCategoryPageVisibility({ brand: null }),
  {
    showBrandCategoryOverview: false,
    showGenericCategoryFilter: true,
    showProductResults: true,
  },
  'The unbranded products page should retain its existing behavior',
);
