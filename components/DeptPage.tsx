import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MapIDF from '@/components/MapIDF'
import UpcomingBrocantes from '@/components/UpcomingBrocantes'
import Link from 'next/link'
import { Search, ArrowRight } from 'lucide-react'

interface DeptConfig {
  code: string
  nom: string
  slug: string
  description: string
}

interface Props {
  config: DeptConfig
}

// JSON-LD statique (pas besoin de fetch pour le schema)
function jsonLd(config: DeptConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Brocantes en ${config.nom}`,
    description: config.description,
  }
}

export default function DeptPage({ config }: Props) {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(config)) }}
      />
      <main className="flex-1">

        {/* ─── HERO — bleu sombre ──────────────────────────────── */}
        <section className="bg-[#0D1B4B] py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 border border-blue-600 bg-blue-900/50 text-blue-300 text-xs font-semibold px-4 py-2 rounded-full mb-6 uppercase tracking-wide">
              <span className="w-1.5 h-1.5 bg-[#E8651A] rounded-full" />
              Île-de-France · {config.code}
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white mb-5 tracking-tight leading-tight">
              Brocantes en{' '}
              <span className="text-[#E8651A]">{config.nom}</span>
            </h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              Trouvez les brocantes à venir dans le {config.code}, repérez les stands et recherchez vos objets avant d&apos;arriver.
            </p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 bg-[#E8651A] hover:bg-[#d4581a] text-white font-semibold px-7 py-4 rounded-2xl text-base transition-colors"
            >
              <Search className="w-5 h-5" />
              Rechercher un objet
            </Link>
          </div>
        </section>

        {/* ─── BROCANTES DU DÉPARTEMENT — même composant que homepage ── */}
        <UpcomingBrocantes dept={config.code} />

        {/* ─── CARTE ───────────────────────────────────────────── */}
        <MapIDF />

        {/* ─── TEXTE SEO — bleu clair ──────────────────────────── */}
        <section className="bg-[#EEF4FF] py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D1B4B] mb-6">
              Brocantes en {config.nom} — Guide du chineur
            </h2>
            <div className="space-y-4 text-[#4A5680] leading-relaxed text-lg">
              <p>{config.description}</p>
              <p>
                Brocante Radar vous permet de préparer votre visite avant même d&apos;arriver sur les lieux.
                Chaque exposant liste ses objets avec des mots-clés et des photos depuis son téléphone —
                vinyles, meubles vintage, livres, Playmobil, électronique — plus besoin de parcourir tous
                les stands pour trouver ce qui vous intéresse.
              </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/search"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#E8651A] hover:bg-[#d4581a] text-white font-semibold px-6 py-4 rounded-2xl text-base transition-colors"
              >
                <Search className="w-5 h-5" />
                Rechercher un objet
              </Link>
              <Link
                href="/contact-organisateur"
                className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-[#0D1B4B] text-[#0D1B4B] hover:bg-[#0D1B4B] hover:text-white font-semibold px-6 py-4 rounded-2xl text-base transition-colors"
              >
                Organisateur — demander un QR code
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
