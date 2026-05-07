"use client";

import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

interface ProductFilterProps {
  categories: string[];
  selectedCategory?: string;
  onCategoryChange: (category?: string) => void;
}

export default function ProductFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: ProductFilterProps) {
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand');

  let displayCategories: string[] = [];
  
  if (brand === 'ifm') {
    const orderedCategories = [
      'Capteurs',
      'IO-Link',
      'Traitement d\'images',
      'Accessoires',
      'Technologies de sécurité',
      'Alimentation en tension',
      'Technologies de connexion',
      'Interface de câblage capteurs/actionneurs'
    ];
    displayCategories = orderedCategories;
  } else if (brand === 'lenze') {
    displayCategories = [
      'Variateurs et servovariateurs',
      'Moteurs',
      'Motoréducteurs',
      'Réducteurs',
      'Solutions et passerelles llot',
      'Accessoires',
      'Software'
    ];
  } else if (brand === 'wago') {
    displayCategories = [
      'Technologies de raccordement électriques',
      'Interfaces électroniques',
      'Techniques d\'automatisation'
    ];
  } else {
    displayCategories = categories;
  }

  const allCategories = ["All", ...displayCategories];

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-base font-semibold text-[#0b2f4f]">Catégories</h2>
        <div className="h-px flex-1 bg-[#0b2f4f] opacity-20" />
      </div>
      <div className="flex flex-wrap gap-2">
        {allCategories.map((category) => {
          const isSelected =
            (category === "All" && !selectedCategory) ||
            category === selectedCategory;

          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category === "All" ? undefined : category)}
              className={cn(
                "rounded-none px-5 py-2.5 text-[13px] font-medium",
                isSelected
                  ? "bg-[#e47925] text-white border border-[#e47925]"
                  : "bg-white border border-[#cacdcf] text-[#34383c] hover:border-[#e47925] hover:text-[#e47925]"
              )}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
