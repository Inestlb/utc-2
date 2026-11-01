export interface ProductNavigationChanges {
  brand?: string;
  category?: string;
  subcategory?: string;
  search?: string;
  page?: number;
}

export function buildProductsUrl(
  current: URLSearchParams,
  changes: ProductNavigationChanges,
): string {
  const next = new URLSearchParams();
  const allowedParameters = new Set(['brand', 'category', 'subcategory', 'q', 'page']);
  current.forEach((value, key) => {
    if (allowedParameters.has(key)) next.append(key, value);
  });
  const hasFilterChange = Object.keys(changes).some((key) => key !== 'page');

  if ('brand' in changes) {
    changes.brand ? next.set('brand', changes.brand) : next.delete('brand');
    next.delete('category');
    next.delete('subcategory');
  }
  if ('category' in changes) {
    changes.category ? next.set('category', changes.category) : next.delete('category');
    next.delete('subcategory');
  }
  if ('subcategory' in changes) {
    changes.subcategory ? next.set('subcategory', changes.subcategory) : next.delete('subcategory');
  }
  if ('search' in changes) {
    changes.search?.trim() ? next.set('q', changes.search.trim()) : next.delete('q');
  }

  if (hasFilterChange) {
    next.delete('page');
    next.set('page', '1');
  }
  else if ('page' in changes) next.set('page', String(changes.page ?? 1));

  const query = next.toString();
  return query ? `/products?${query}` : '/products';
}

export function resetProductsUrl() {
  return '/products';
}
