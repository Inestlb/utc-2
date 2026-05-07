import Image from 'next/image';

export const metadata = {
  title: 'Partenaires | UTC Industrie',
  description: 'Découvrez les partenaires industriels UTC Industrie : Lenze, WAGO et IFM.',
};

const partners = [
  {
    id: 'lenze',
    name: 'Lenze',
    logo: '/images/logo-Lenze.svg',
    width: 170,
    height: 52,
    description:
      'Spécialiste mondial des solutions d’entraînement et d’automatisation pour machines et équipements industriels.',
    specialties: ['Motorisation', 'Entraînements', 'Automatisation'],
  },
  {
    id: 'wago',
    name: 'WAGO',
    logo: '/images/logo-WAGO.svg',
    width: 174,
    height: 65,
    description:
      'Référence des technologies de connexion électrique, d’interfaces électroniques et d’automatisation industrielle.',
    specialties: ['Connectique', 'Interfaces', 'Contrôle'],
  },
  {
    id: 'ifm',
    name: 'IFM',
    logo: '/images/logo-ifm.svg',
    width: 132,
    height: 132,
    description:
      'Fabricant de capteurs, systèmes de contrôle et solutions de digitalisation pour des process industriels fiables.',
    specialties: ['Détection', 'Capteurs', 'Process'],
  },
];

export default function PartnersPage() {
  return (
    <main className="bg-[#f4f0e8] text-[#0b2f4f]">
      <section className="relative overflow-hidden bg-[#0b2f4f] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0b2f4f_0%,#0f3d64_58%,#082742_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-[#e47925]/50" />

        <div className="relative flex justify-center w-full">
          <div className="w-full max-w-[1600px] px-6 py-14 md:px-12 md:py-18">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-[#e47925] md:text-sm">
                Réseau UTC
              </p>
              <h1 className="text-[clamp(2.4rem,4.8vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.065em]">
                Partenaires
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#d7e2eb] md:text-lg">
                UTC Industrie travaille avec des fabricants reconnus pour proposer des composants fiables,
                disponibles et adaptés aux contraintes des environnements industriels.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex justify-center w-full py-20 md:py-28">
        <div className="w-full max-w-[1600px] px-6 md:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <aside className="lg:pt-2">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#e47925]">
                Réseau industriel
              </p>
              <h2 className="mt-5 max-w-md text-4xl font-semibold leading-[0.96] tracking-[-0.055em] md:text-6xl">
                Des marques solides pour des lignes plus fiables.
              </h2>
            </aside>

            <div className="space-y-5">
              {partners.map((partner) => (
                <article
                  key={partner.id}
                  className="grid gap-6 rounded-[1.5rem] border border-[#0b2f4f]/10 bg-white/70 p-6 md:grid-cols-[13rem_1fr] md:p-7"
                >
                  <div className="flex min-h-36 items-center justify-center rounded-[1.1rem] bg-[#f8f5ef] p-6">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={partner.width}
                      height={partner.height}
                      className="max-h-24 w-auto object-contain"
                    />
                  </div>

                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#0b2f4f]">
                      {partner.name}
                    </h3>
                    <p className="mt-3 max-w-2xl leading-relaxed text-[#39495a]">
                      {partner.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {partner.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="rounded-full border border-[#e47925]/25 bg-[#e47925]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#b85d18]"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
