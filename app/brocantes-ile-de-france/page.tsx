import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MapIDF from '@/components/MapIDF'
import UpcomingBrocantes from '@/components/UpcomingBrocantes'
import Link from 'next/link'
import { Search, ArrowRight } from 'lucide-react'
import { DEPARTEMENTS_IDF } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Brocantes et vide-greniers en Île-de-France 2026',
  description:
    'Toutes les brocantes et vide-greniers en Île-de-France. Trouvez les stands et les objets que vous cherchez grâce à Brocante Radar — le GPS des chineurs.',
  openGraph: {
    title: 'Brocantes en Île-de-France — Brocante Radar',
    description: 'Le GPS des chineurs. Trouvez les objets que vous cherchez avant même d\'arriver à la brocante.',
    type: 'website',
  },
  alternates: {
    canonical: '/brocantes-ile-de-france',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Brocantes et vide-greniers en Île-de-France',
  description: 'Toutes les brocantes référencées par Brocante Radar en Île-de-France.',
  url: 'https://brocanteradar.fr/brocantes-ile-de-france',
}

export default function BrocantesIdfPage() {
  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1">

        {/* ─── HERO — bleu sombre ─── */}
        <section className="bg-[#0D1B4B] py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 border border-blue-600 bg-blue-900/50 text-blue-300 text-xs font-semibold px-4 py-2 rounded-full mb-6 uppercase tracking-wide">
              <span className="w-1.5 h-1.5 bg-[#E8651A] rounded-full animate-pulse" />
              Île-de-France · Mis à jour chaque semaine
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white mb-5 tracking-tight leading-tight">
              Brocantes en{' '}
              <span className="text-[#E8651A]">Île-de-France</span>
            </h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed mb-3">
              50+ brocantes référencées à venir — recherchez les objets que vous cherchez avant d&apos;arriver.
            </p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 bg-[#E8651A] hover:bg-[#d4581a] text-white font-semibold px-7 py-4 rounded-2xl text-base transition-colors mt-4"
            >
              <Search className="w-5 h-5" />
              Rechercher un objet
            </Link>
          </div>
        </section>

        {/* ─── BROCANTES AGENDA ─── */}
        <UpcomingBrocantes />

        {/* ─── CARTE ─── */}
        <MapIDF />

        {/* ─── DÉPARTEMENTS — bleu clair ─── */}
        <section className="bg-[#EEF4FF] py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D1B4B] mb-8 text-center">Par département</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {DEPARTEMENTS_IDF.map((d) => (
                <Link
                  key={d.code}
                  href={`/brocante-${d.slug}`}
                  className="group bg-white hover:bg-[#0D1B4B] border border-blue-100 hover:border-[#0D1B4B] rounded-2xl p-4 text-center transition-all"
                >
                  <div className="font-black text-lg text-[#E8651A] group-hover:text-[#E8651A] mb-1">{d.code}</div>
                  <div className="text-sm text-[#4A5680] group-hover:text-blue-200 transition-colors">{d.nom}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TEXTE SEO ─── */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto text-[#4A5680] leading-relaxed space-y-4">
            <h2 className="text-2xl font-black text-[#0D1B4B]">Le guide des brocantes en Île-de-France</h2>
            <p>
              L&apos;Île-de-France est l&apos;une des régions les plus dynamiques de France en matière de brocantes et de vide-greniers.
              De Paris à la Seine-et-Marne, en passant par les Yvelines, l&apos;Essonne et le Val-de-Marne, des centaines d&apos;événements
              rassemblent chaque année collectionneurs, chineurs et amateurs de bonnes affaires.
            </p>
            <p>
              Brocante Radar référence en temps réel tous les stands et les objets présents lors de ces événements.
              Grâce à notre système de mots-clés, les exposants publient leur inventaire depuis leur smartphone le matin même,
              et les visiteurs peuvent rechercher n&apos;importe quel objet — et savoir exactement à quel stand se rendre.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/search" className="flex-1 inline-flex items-center justify-center gap-2 bg-[#E8651A] hover:bg-[#d4581a] text-white font-semibold px-6 py-4 rounded-2xl transition-colors">
                <Search className="w-5 h-5" /> Rechercher un objet
              </Link>
              <Link href="/contact-organisateur" className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-[#0D1B4B] text-[#0D1B4B] hover:bg-[#0D1B4B] hover:text-white font-semibold px-6 py-4 rounded-2xl transition-colors">
                Organisateur — demander un QR code <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
