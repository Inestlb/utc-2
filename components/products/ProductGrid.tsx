"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';
import LenzeCategoryCards from './LenzeCategoryCards';
import SubCategoryFilter from './SubCategoryFilter';
import { Button } from '@/components/ui/button';
import { Grid, List } from 'lucide-react';
import { Product, ProductFilterOptions } from '@/lib/types';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  categories?: string[];
  filterOptions?: ProductFilterOptions;
  onFilterChange?: (filters: Partial<ProductFilterOptions>) => void;
  totalPages?: number;
}

export default function ProductGrid({
  products,
  isLoading = false,
  categories = [],
  filterOptions = {},
  onFilterChange,
  totalPages = 1,
}: ProductGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const searchParams = useSearchParams();
  const router = useRouter();
  const brand = searchParams.get('brand');
  const [showFilters, setShowFilters] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | undefined>(
    filterOptions.subcategory || 
    (filterOptions.category === 'Variateurs et servovariateurs' ? 'Variateurs de vitesse' : 
     filterOptions.category === 'Motoréducteurs' ? 'Motoréducteurs triphasés' : 
     filterOptions.category === 'Moteurs' ? 'Moteurs triphasés' : undefined)
  );
  
  useEffect(() => {
    const isLenzeVariateursPage = brand === 'lenze' && filterOptions.category === 'Variateurs et servovariateurs';
    const isLenzeMotoreducteursPage = brand === 'lenze' && filterOptions.category === 'Motoréducteurs';
    const isLenzeMoteursPage = brand === 'lenze' && filterOptions.category === 'Moteurs';
    const isReducteurPage = brand === 'lenze' && filterOptions.category === 'Réducteurs';
    
    if (isLenzeVariateursPage && !selectedSubCategory) {
      const defaultSubcategory = 'Variateurs de vitesse';
      setSelectedSubCategory(defaultSubcategory);
      
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('subcategory', defaultSubcategory);
      router.push(`/products?${newParams.toString()}`);
    }
    else if (isLenzeMotoreducteursPage && !selectedSubCategory) {
      const defaultSubcategory = 'Motoréducteurs triphasés';
      setSelectedSubCategory(defaultSubcategory);
      
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('subcategory', defaultSubcategory);
      
      router.push(`/products?${newParams.toString()}`);
      
      if (onFilterChange) {
        onFilterChange({ 
          subcategory: defaultSubcategory
        });
      }
    }
    else if (isLenzeMoteursPage && !selectedSubCategory) {
      const defaultSubcategory = 'Moteurs triphasés';
      setSelectedSubCategory(defaultSubcategory);
      
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('subcategory', defaultSubcategory);
      
      router.push(`/products?${newParams.toString()}`);
      
      if (onFilterChange) {
        onFilterChange({ 
          subcategory: defaultSubcategory
        });
      }
    }
    else if (isReducteurPage && !selectedSubCategory) {
      const defaultSubcategory = 'Réducteurs';
      setSelectedSubCategory(defaultSubcategory);
      
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('subcategory', defaultSubcategory);
      
      router.push(`/products?${newParams.toString()}`);
      
      if (onFilterChange) {
        onFilterChange({ 
          subcategory: defaultSubcategory
        });
      }
    }
  }, [brand, filterOptions.category, searchParams, router, onFilterChange, selectedSubCategory]);
  
  useEffect(() => {
    if (brand === 'lenze' && !filterOptions.category) {
      setShowFilters(false);
    } else {
      setShowFilters(true);
    }
  }, [brand, filterOptions.category]);

  const handlePageChange = (page: number) => {
    if (onFilterChange) {
      onFilterChange({ page });
    }
  };
  
  const handleCategorySelect = (category: string) => {
    if (onFilterChange) {
      if (category === 'Variateurs et servovariateurs' && brand === 'lenze') {
        const defaultSubcategory = 'Variateurs de vitesse';
        setSelectedSubCategory(defaultSubcategory);
        onFilterChange({ 
          category, 
          subcategory: defaultSubcategory, 
          page: 1 
        });
      } else if (category === 'Motoréducteurs' && brand === 'lenze') {
        const defaultSubcategory = 'Motoréducteurs triphasés';
        setSelectedSubCategory(defaultSubcategory);
        onFilterChange({ 
          category, 
          subcategory: defaultSubcategory, 
          page: 1 
        });
      } else if (category === 'Moteurs' && brand === 'lenze') {
        const defaultSubcategory = 'Moteurs triphasés';
        setSelectedSubCategory(defaultSubcategory);
        onFilterChange({ 
          category, 
          subcategory: defaultSubcategory, 
          page: 1 
        });
      } else if (category === 'Réducteurs' && brand === 'lenze') {
        setSelectedSubCategory('Réducteurs');
        onFilterChange({ 
          category, 
          subcategory: 'Réducteurs', 
          page: 1 
        });
      } else {
        setSelectedSubCategory(undefined);
        onFilterChange({ 
          category, 
          subcategory: undefined, 
          page: 1 
        });
      }
      setShowFilters(true);
    }
  };
  
  const handleSubCategoryChange = (subCategory?: string) => {
    setSelectedSubCategory(subCategory);
    if (onFilterChange) {
      onFilterChange({ 
        subcategory: subCategory, 
        page: 1 
      });
      
      const newParams = new URLSearchParams(searchParams.toString());
      if (subCategory) {
        newParams.set('subcategory', subCategory);
      } else {
        newParams.delete('subcategory');
      }
      router.push(`/products?${newParams.toString()}`);
    }
  };

  const isVariateurPage = brand === 'lenze' && filterOptions.category === 'Variateurs et servovariateurs';
  const isMotoreducteurPage = brand === 'lenze' && filterOptions.category === 'Motoréducteurs';
  const isMoteursPage = brand === 'lenze' && filterOptions.category === 'Moteurs';
  const isReducteurPage = brand === 'lenze' && filterOptions.category === 'Réducteurs';
  const hasSubcategories = isVariateurPage || isMotoreducteurPage || isMoteursPage || isReducteurPage;

  useEffect(() => {
    const isMotoreducteursPage = filterOptions.category === 'Motoréducteurs';
    const isMoteursPage = filterOptions.category === 'Moteurs';
    const isReducteursPage = filterOptions.category === 'Réducteurs';

    if ((isMotoreducteursPage || isMoteursPage || isReducteursPage) && !selectedSubCategory) {
      setFilteredProducts(products);
      return;
    }
    
    if ((isMotoreducteursPage || isMoteursPage || isReducteursPage) && selectedSubCategory) {
      const filteredBySubcategory = products.filter(p => p.subcategory === selectedSubCategory);
      
      filteredBySubcategory.sort((a, b) => a.name.localeCompare(b.name));
      setFilteredProducts(filteredBySubcategory);
      return;
    }
    
    setFilteredProducts(products);
  }, [products, filterOptions.category, selectedSubCategory]);

  return (
    <div className="w-full">
      {!hasSubcategories && (
        <div className="w-full mb-10">
          {brand === 'lenze' && !showFilters ? (
            <LenzeCategoryCards
              categories={categories}
              selectedCategory={filterOptions.category}
              onCategorySelect={handleCategorySelect}
            />
          ) : (
            <ProductFilter
              categories={categories}
              selectedCategory={filterOptions.category}
              onCategoryChange={(category) => {
                if (category === 'Variateurs et servovariateurs' && brand === 'lenze') {
                  setSelectedSubCategory('Variateurs de vitesse');
                  onFilterChange?.({ 
                    category, 
                    subcategory: 'Variateurs de vitesse', 
                    page: 1 
                  });
                } else if (category === 'Motoréducteurs' && brand === 'lenze') {
                  setSelectedSubCategory('Motoréducteurs triphasés');
                  onFilterChange?.({ 
                    category, 
                    subcategory: 'Motoréducteurs triphasés', 
                    page: 1 
                  });
                } else if (category === 'Moteurs' && brand === 'lenze') {
                  setSelectedSubCategory('Moteurs triphasés');
                  onFilterChange?.({ 
                    category, 
                    subcategory: 'Moteurs triphasés', 
                    page: 1 
                  });
                } else if (category === 'Réducteurs' && brand === 'lenze') {
                  setSelectedSubCategory('Réducteurs');
                  onFilterChange?.({ 
                    category, 
                    subcategory: 'Réducteurs', 
                    page: 1 
                  });
                } else {
                  setSelectedSubCategory(undefined);
                  onFilterChange?.({ 
                    category, 
                    subcategory: undefined, 
                    page: 1 
                  });
                }
              }}
            />
          )}
        </div>
      )}
      
      {hasSubcategories && (
        <div className="px-6 md:px-12 mb-8">
          <SubCategoryFilter
            mainCategory={filterOptions.category || ''}
            selectedSubCategory={selectedSubCategory}
            onSubCategoryChange={handleSubCategoryChange}
          />
        </div>
      )}
      
      {showFilters && (
        <div className="flex justify-between items-center mb-8 px-6 md:px-12">
          <p className="text-[13px] text-[#0b2f4f] font-medium">
            {isLoading ? 'Chargement des produits...' : (
              <>
                Affichage de <span className="text-[#e47925]">{filteredProducts.length}</span> produits
              </>
            )}
          </p>
          <div className="flex space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
              aria-label="Vue en grille"
              className={`rounded-none ${
                viewMode === 'grid'
                  ? 'bg-[#e47925] text-white border-[#e47925]'
                  : 'bg-white border border-[#cacdcf] text-[#34383c] hover:border-[#e47925] hover:text-[#e47925]'
              }`}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
              aria-label="Vue en liste"
              className={`rounded-none ${
                viewMode === 'list'
                  ? 'bg-[#e47925] text-white border-[#e47925]'
                  : 'bg-white border border-[#cacdcf] text-[#34383c] hover:border-[#e47925] hover:text-[#e47925]'
              }`}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {showFilters && isLoading && (
        <div className="flex flex-col justify-center items-center py-16 px-6 md:px-12">
          <div className="w-6 h-6 border-2 border-[#cacdcf] border-t-[#e47925] animate-spin"></div>
          <p className="mt-4 text-[13px] text-[#6b7280]">Chargement des produits...</p>
        </div>
      )}

      {showFilters && !isLoading && filteredProducts.length === 0 && (
        <div className="text-center py-16 bg-[#f8f9fa] mx-6 md:mx-12">
          <h3 className="text-lg font-semibold text-[#34383c]">Aucun produit trouvé</h3>
          <p className="mt-3 text-[13px] text-[#6b7280]">
            Essayez d&apos;ajuster votre recherche ou vos filtres pour trouver ce que vous cherchez.
          </p>
          <Button
            className="mt-6 rounded-none text-[#e47925] text-[13px] py-2 px-4 border border-[#e47925] bg-white hover:bg-[#e47925] hover:text-white"
            onClick={() => {
              onFilterChange?.({ 
                category: undefined, 
                subcategory: undefined, 
                search: undefined, 
                page: 1 
              });
              if (brand === 'lenze') setShowFilters(false);
              setSelectedSubCategory(undefined);
            }}
          >
            Effacer les filtres
          </Button>
        </div>
      )}

      {showFilters && !isLoading && filteredProducts.length > 0 && (
        <div className="px-6 md:px-12">
          {hasSubcategories ? (
            <div className="space-y-10">
              {!selectedSubCategory && (
                <div className="mb-4 border-l-[3px] border-[#0b2f4f] pl-4">
                  <h2 className="text-lg font-semibold text-[#0b2f4f]">Nos {filterOptions.category} par catégorie</h2>
                  <p className="text-[13px] text-[#6b7280] mt-1">Sélectionnez une catégorie ci-dessus pour filtrer les produits</p>
                </div>
              )}
              
              {(selectedSubCategory ? [selectedSubCategory] : [...new Set(filteredProducts.map(p => p.subcategory))]).map(subcategory => {
                const subcategoryProducts = filteredProducts.filter(p => p.subcategory === subcategory);
                
                if (subcategoryProducts.length === 0) return null;
                
                return (
                  <div key={subcategory} className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className={`text-base font-semibold border-l-[3px] pl-3 py-0.5 ${
                        subcategory === selectedSubCategory
                          ? 'border-[#e47925] text-[#0b2f4f]'
                          : 'border-[#0b2f4f] text-[#0b2f4f]'
                      }`}>
                        {subcategory}
                      </h3>
                      <span className="text-[12px] text-[#e47925] font-medium bg-[#fef3e8] px-2 py-0.5">
                        {subcategoryProducts.length} produits
                      </span>
                    </div>
                    <div className={`${
                      viewMode === 'grid'
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                        : "space-y-4"
                    }`}>
                      {subcategoryProducts.map((product) => (
                        <div 
                          key={product.id} 
                        >
                          <ProductCard product={product} viewMode={viewMode} />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={`${
              viewMode === 'grid'
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                : "space-y-4"
            }`}>
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                >
                  <ProductCard product={product} viewMode={viewMode} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showFilters && totalPages > 1 && !hasSubcategories && (
        <div className="flex justify-center mt-12 px-6 md:px-12">
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === filterOptions.page ? 'default' : 'outline'}
                size="sm"
                onClick={() => handlePageChange(page)}
                className={`rounded-none py-2 px-4 text-[13px] ${
                  page === filterOptions.page 
                    ? "bg-[#e47925] text-white border-[#e47925]"
                    : "border border-[#cacdcf] text-[#34383c] hover:border-[#e47925] hover:text-[#e47925] bg-white"
                }`}
              >
                {page}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
