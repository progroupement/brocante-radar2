import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ArticleIllustration from '@/components/ArticleIllustration'
import { articlesActualites } from '@/lib/articles-actualites'
import { Clock, ArrowRight, Newspaper } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Actualités Brocante — Tendances, marché et nouveautés 2026 | Brocante Radar',
  description: 'Toutes les actualités du monde de la brocante en 2026 : tendances déco vintage, hausse des prix, nouvelles brocantes IDF, lois, génération Z et upcycling.',
  keywords: ['actualités brocante 2026', 'news brocante france', 'tendances brocante', 'marché brocante 2026'],
  alternates: { canonical: 'https://brocanteradar.fr/actualites' },
  openGraph: {
    title: 'Actualités Brocante 2026 — Brocante Radar',
    description: 'Tendances, prix, nouveaux marchés et actualités du monde de la brocante en Île-de-France.',
    url: 'https://brocanteradar.fr/actualites',
    type: 'website',
  },
}

const categoryColors: Record<string, string> = {
  'Tendances': 'bg-purple-100 text-purple-800',
  'Marché': 'bg-blue-100 text-blue-800',
  'Numérique': 'bg-cyan-100 text-cyan-800',
  'Vinyle & Musique': 'bg-pink-100 text-pink-800',
  'Société': 'bg-green-100 text-green-800',
  'Éco-responsable': 'bg-emerald-100 text-emerald-800',
  'Agenda': 'bg-orange-100 text-orange-800',
  'Réglementation': 'bg-red-100 text-red-800',
  'Lieux': 'bg-indigo-100 text-indigo-800',
  'Créativité': 'bg-yellow-100 text-yellow-800',
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function ActualitesPage() {
  const [featured, ...rest] = articlesActualites

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">

        <section className="bg-[#0D1B4B] py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 border border-blue-600 bg-blue-900/50 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wide">
              <Newspaper className="w-3.5 h-3.5" />
              Actualités
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Actualités brocante 2026
            </h1>
            <p className="text-blue-300 text-lg max-w-2xl">
              Tendances déco, hausse des prix, nouvelles réglementations, marchés qui ouvrent : suivez l&apos;actualité du monde de la brocante en France.
            </p>
          </div>
        </section>

        {/* Article à la une */}
        <section className="py-10 px-4 bg-[#EEF4FF] border-b border-blue-100">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold text-[#E8651A] uppercase tracking-widest mb-4">À la une</p>
            <Link
              href={`/actualites/${featured.slug}`}
              className="group flex flex-col sm:flex-row gap-6 bg-white rounded-3xl overflow-hidden border border-blue-100 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100 transition-all"
            >
              <div className="sm:w-56 flex-shrink-0 h-48 sm:h-auto overflow-hidden bg-[#EEF4FF]">
                <ArticleIllustration illustration={featured.illustration} alt={featured.title} />
              </div>
              <div className="p-6 flex flex-col justify-center gap-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full self-start ${categoryColors[featured.category] ?? 'bg-gray-100 text-gray-700'}`}>
                  {featured.category}
                </span>
                <h2 className="text-xl font-black text-[#0D1B4B] leading-snug group-hover:text-[#E8651A] transition-colors">
                  {featured.title}
                </h2>
                <p className="text-sm text-[#4A5680] leading-relaxed line-clamp-2">{featured.excerpt}</p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3 text-xs text-[#4A5680]">
                    <span>{formatDate(featured.date)}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.readTime} min</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#E8651A] group-hover:gap-2 transition-all">
                    Lire <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Grille articles */}
        <section className="py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((article) => (
                <Link
                  key={article.slug}
                  href={`/actualites/${article.slug}`}
                  className="group bg-white border border-blue-100 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-blue-100 hover:border-blue-200 transition-all flex flex-col"
                >
                  <div className="h-48 overflow-hidden bg-[#EEF4FF]">
                    <ArticleIllustration illustration={article.illustration} alt={article.title} />
                  </div>
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full self-start ${categoryColors[article.category] ?? 'bg-gray-100 text-gray-700'}`}>
                      {article.category}
                    </span>
                    <h2 className="font-black text-[#0D1B4B] text-sm leading-snug group-hover:text-[#E8651A] transition-colors flex-1">
                      {article.title}
                    </h2>
                    <div className="flex items-center justify-between pt-3 border-t border-blue-50 text-xs text-[#4A5680]">
                      <span>{formatDate(article.date)}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime} min</span>
                    </div>
                  </div>
                  <div className="px-5 pb-4">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#E8651A] group-hover:gap-2 transition-all">
                      Lire l&apos;article <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-[#EEF4FF] px-4 border-t border-blue-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-black text-[#0D1B4B] mb-3">Ne manquez aucune brocante</h2>
            <p className="text-[#4A5680] mb-6 text-sm leading-relaxed">
              Créez votre profil chineur et soyez alerté en temps réel quand un exposant propose l&apos;objet que vous cherchez.
            </p>
            <Link href="/je-cherche" className="inline-flex items-center gap-2 bg-[#E8651A] hover:bg-[#d4581a] text-white font-semibold px-6 py-3 rounded-2xl text-sm transition-colors">
              Créer mon profil chineur <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
