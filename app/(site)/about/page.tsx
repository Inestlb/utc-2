export const metadata = {
  title: 'Société | UTC Industrie',
  description: 'Découvrez UTC Industrie, spécialiste des solutions industrielles en automatisme, motorisation et connectique depuis 2006.',
};

export default function AboutPage() {
  return (
    <main className="bg-[#f4f0e8] text-[#0b2f4f]">
      <section className="py-14 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 xl:gap-24">
            <header>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#a94c12]">
                Société
              </p>
              <h1 className="mt-4 max-w-[18ch] text-pretty text-4xl font-semibold leading-[1.04] tracking-[-0.055em] md:text-5xl xl:text-6xl">
                Une expertise industrielle construite dans la durée.
              </h1>
            </header>

            <div className="max-w-[66ch] space-y-5 text-base leading-relaxed text-[#39495a] md:text-lg lg:pt-1">
              <p>
                Fondée en 2006, UTC Industrie est une entreprise familiale qui s'est imposée comme
                un acteur national de référence dans la distribution de solutions
                industrielles en Algérie.
              </p>
              <p>
                Spécialisée dans l'automatisme, la motorisation et le process industriel, UTC Industrie
                collabore avec des partenaires de renom comme IFM Electronic, Lenze et WAGO afin de
                fournir aux industriels des équipements performants, disponibles et adaptés à leurs besoins.
              </p>
              <p>
                L'entreprise poursuit son développement avec une approche simple : comprendre les contraintes
                du terrain, proposer des composants fiables et accompagner les clients dans l'optimisation de
                leurs lignes de production.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
