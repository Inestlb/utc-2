"use client";

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface LenzeCategoryCardsProps {
  categories?: string[];
  selectedCategory?: string;
  onCategorySelect?: (category: string) => void;
}

export default function LenzeCategoryCards(_props: LenzeCategoryCardsProps) {
  void _props;
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand');

  if (brand !== 'lenze') return null;

  const lenzeCategories = [
    'Variateurs et servovariateurs',
    'Moteurs',
    'Motoréducteurs',
    'Réducteurs',
    'Solutions et passerelles llot',
    'Accessoires',
    'Software'
  ];

  const categoryDescriptions: Record<string, string> = {
    'Variateurs et servovariateurs': 'Solutions de contrôle de vitesse et de position haute performance pour applications industrielles.',
    'Moteurs': 'Moteurs électriques fiables et efficaces pour diverses applications industrielles.',
    'Motoréducteurs': 'Combinaisons intégrées de moteurs et réducteurs pour un contrôle précis du mouvement.',
    'Réducteurs': 'Systèmes de transmission de puissance pour ajuster vitesse et couple dans les applications industrielles.',
    'Solutions et passerelles llot': 'Connexion et intégration intelligente des systèmes d\'entraînement au monde numérique.',
    'Accessoires': 'Composants complémentaires pour optimiser les performances de vos systèmes d\'entraînement.',
    'Software': 'Logiciels de configuration, optimisation et diagnostic pour systèmes d\'entraînement.'
  };

  return (
    <div className="w-full px-6 md:px-12">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-semibold text-[#0b2f4f]">Catégories de produits Lenze</h2>
        <div className="h-px flex-1 bg-[#e47925] opacity-40" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {lenzeCategories.map((category) => (
          <Link
            key={category}
            href={`/products?brand=lenze&category=${encodeURIComponent(category)}`}
            className="block hover:no-underline"
          >
            <div className="rounded-none bg-white border border-[#cacdcf] p-6 h-full flex flex-col group/card hover:border-[#0b2f4f]">
              <div className="aspect-video bg-[#0b2f4f] rounded-none flex items-center justify-center mb-5">
                <span className="text-5xl font-bold text-white/20 group-hover/card:text-[#e47925]/60">{category.charAt(0)}</span>
              </div>
              <h3 className="text-[15px] font-semibold text-[#0b2f4f] mb-2 line-clamp-1 group-hover/card:text-[#e47925]">{category}</h3>
              <p className="text-[13px] text-[#6b7280] line-clamp-2 mb-5">
                {categoryDescriptions[category]}
              </p>
              <div className="mt-auto">
                <span className="inline-flex items-center justify-center w-full rounded-none border border-[#0b2f4f] text-[13px] font-medium py-2.5 px-4 text-[#0b2f4f] group-hover/card:bg-[#e47925] group-hover/card:border-[#e47925] group-hover/card:text-white">
                  Voir les produits
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
