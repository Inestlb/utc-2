"use client";

import { cn } from '@/lib/utils';

interface ProductFilterProps {
  categories: string[];
  selectedBrand?: string | null;
  onBrandChange: (brand?: string) => void;
  selectedCategory?: string;
  onCategoryChange: (category?: string) => void;
}

const brands: Array<{ value?: string; label: string }> = [
  { value: undefined, label: 'Tous les produits' },
  { value: 'lenze', label: 'Lenze' },
  { value: 'ifm', label: 'IFM' },
  { value: 'wago', label: 'WAGO' },
];

function FilterButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-none border px-5 py-2.5 text-[13px] font-medium transition-colors',
        selected
          ? 'border-[#e47925] bg-[#e47925] text-white'
          : 'border-[#cacdcf] bg-white text-[#34383c] hover:border-[#0b2f4f] hover:bg-[#0b2f4f] hover:text-white',
      )}
    >
      {label}
    </button>
  );
}

export default function ProductFilter({
  categories,
  selectedBrand,
  onBrandChange,
  selectedCategory,
  onCategoryChange,
}: ProductFilterProps) {
  return (
    <div className="w-full space-y-6">
      <section>
        <div className="mb-4 flex items-center gap-3">
          <h2 className="text-base font-semibold text-[#0b2f4f]">Marques</h2>
          <div className="h-px flex-1 bg-[#0b2f4f] opacity-20" />
        </div>
        <div className="flex flex-wrap gap-2">
          {brands.map((brand) => (
            <FilterButton
              key={brand.label}
              label={brand.label}
              selected={(brand.value ?? undefined) === (selectedBrand ?? undefined)}
              onClick={() => onBrandChange(brand.value)}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center gap-3">
          <h2 className="text-base font-semibold text-[#0b2f4f]">Catégories</h2>
          <div className="h-px flex-1 bg-[#0b2f4f] opacity-20" />
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterButton
            label="Tous les produits"
            selected={!selectedCategory}
            onClick={() => onCategoryChange(undefined)}
          />
          {categories.map((category) => (
            <FilterButton
              key={category}
              label={category}
              selected={category === selectedCategory}
              onClick={() => onCategoryChange(category)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
