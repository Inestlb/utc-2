interface CategoryPageVisibilityInput {
  brand: string | null;
  category?: string;
}

export interface CategoryPageVisibility {
  showBrandCategoryOverview: boolean;
  showGenericCategoryFilter: boolean;
  showProductResults: boolean;
}

export function getCategoryPageVisibility({
  brand,
  category,
}: CategoryPageVisibilityInput): CategoryPageVisibility {
  const showBrandCategoryOverview =
    !category && (brand === 'lenze' || brand === 'ifm');

  return {
    showBrandCategoryOverview,
    showGenericCategoryFilter:
      !showBrandCategoryOverview && brand !== 'ifm',
    showProductResults: !showBrandCategoryOverview,
  };
}
