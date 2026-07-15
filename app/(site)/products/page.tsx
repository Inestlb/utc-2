import { Suspense } from 'react';
import { getProducts, getProductCategories } from '@/data/products';
import ProductGrid from '@/components/products/ProductGrid';
import SearchBar from '@/components/products/SearchBar';
import { Loader2 } from 'lucide-react';

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    subcategory?: string;
    brand?: string;
    q?: string;
    page?: string;
  }>;
}

export const metadata = {
  title: 'Produits | Entreprise d\'Exportation Industrielle',
  description: 'Parcourez notre catalogue de produits industriels de haute qualité pour l\'exportation mondiale',
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams.category;
  const subcategory = resolvedSearchParams.subcategory;
  const brand = resolvedSearchParams.brand;
  const search = resolvedSearchParams.q;
  const page = resolvedSearchParams.page ? parseInt(resolvedSearchParams.page) : 1;

  const productsOptions: {
    category?: string;
    subcategory?: string;
    brand?: string;
    search?: string;
    page: number;
  } = {
    category,
    brand,
    search,
    page,
  };

  if (!(brand === 'lenze' && (category === 'Variateurs et servovariateurs' ||
                              category === 'Motoréducteurs' ||
                              category === 'Moteurs'))) {
    productsOptions.subcategory = subcategory;
  }

  const productsPromise = getProducts(productsOptions);
  const categoriesPromise = getProductCategories();
  const [products, categories] = await Promise.all([
    productsPromise,
    categoriesPromise,
  ]);

  const totalPages = Math.ceil(products.length / 4);

  let pageTitle = 'Nos Produits';
  if (brand === 'lenze') {
    pageTitle = 'Nos Produits Lenze';
    if (category === 'Variateurs et servovariateurs') {
      pageTitle = 'Variateurs et servovariateurs Lenze';
      if (subcategory) {
        pageTitle = `${subcategory} Lenze`;
      }
    }
  } else if (brand === 'ifm') {
    pageTitle = 'Nos Produits IFM';
  } else if (brand === 'wago') {
    pageTitle = 'Nos Produits WAGO';
  }

  return (
    <div className="bg-white">
      <div className="bg-[#0b2f4f]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-10 pb-8">
          <h1 className="text-2xl font-semibold text-white mb-6">{pageTitle}</h1>
          <SearchBar
            products={products}
            initialQuery={search || ''}
          />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-8 pb-12">
        <Suspense fallback={
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-[#e47925]" />
          </div>
        }>
          <ProductGrid
            products={products}
            categories={categories}
            filterOptions={{
              category,
              subcategory,
              brand,
              search,
              page,
            }}
            totalPages={totalPages}
          />
        </Suspense>
      </div>
    </div>
  );
}
