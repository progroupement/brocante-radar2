import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { articlesOrganisateur } from '@/lib/articles-organisateur'
import { Clock, ArrowRight, Tag } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog de l\'Organisateur — Conseils pour réussir vos brocantes en IDF',
  description: 'Guides, conseils et stratégies pour organiser des brocantes réussies en Île-de-France : autorisations, logistique, communication, numérique.',
  keywords: ['blog organisateur brocante', 'conseils organisateur brocante', 'guide organiser brocante idf'],
  alternates: { canonical: 'https://brocanteradar.fr/blog-organisateur' },
  openGraph: {
    title: 'Blog de l\'Organisateur — Brocante Radar',
    description: 'Tous les conseils pour organiser des brocantes réussies en Île-de-France.',
    url: 'https://brocanteradar.fr/blog-organisateur',
    type: 'website',
  },
}

const categoryColors: Record<string, string> = {
  'Organisation': 'bg-blue-100 text-blue-800',
  'Réglementation': 'bg-orange-100 text-orange-800',
  'Stratégie': 'bg-purple-100 text-purple-800',
  'Gestion': 'bg-green-100 text-green-800',
  'Numérique': 'bg-indigo-100 text-indigo-800',
  'Communication': 'bg-pink-100 text-pink-800',
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogOrganisateurPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">

        <section className="bg-[#0D1B4B] py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 border border-blue-600 bg-blue-900/50 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wide">
              <span className="w-1.5 h-1.5 bg-[#E8651A] rounded-full" />
              Ressources professionnelles
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Le blog de l&apos;organisateur
            </h1>
            <p className="text-blue-300 text-lg max-w-2xl">
              Guides, conseils et stratégies pour organiser des brocantes et vide-greniers réussis en Île-de-France.
            </p>
          </div>
        </section>

        <section className="py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articlesOrganisateur.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog-organisateur/${article.slug}`}
                  className="group bg-white border border-blue-100 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-blue-100 hover:border-blue-200 transition-all flex flex-col"
                >
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[article.category] ?? 'bg-gray-100 text-gray-700'}`}>
                        {article.category}
                      </span>
                    </div>
                    <h2 className="font-black text-[#0D1B4B] text-base leading-snug group-hover:text-[#E8651A] transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-[#4A5680] text-sm leading-relaxed flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-blue-50 text-xs text-[#4A5680]">
                      <span>{formatDate(article.date)}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {article.readTime} min
                      </span>
                    </div>
                  </div>
                  <div className="px-6 pb-5">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#E8651A] group-hover:gap-2 transition-all">
                      Lire l&apos;article <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-[#0D1B4B] px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-black text-white mb-3">Vous organisez une brocante en IDF ?</h2>
            <p className="text-blue-300 mb-6 text-sm leading-relaxed">
              Brocante Radar crée un QR code personnalisé pour votre manifestation. Vos exposants publient leurs stands, vos visiteurs trouvent ce qu&apos;ils cherchent.
            </p>
            <Link href="/contact-organisateur" className="inline-flex items-center gap-2 bg-[#E8651A] hover:bg-[#d4581a] text-white font-semibold px-6 py-3 rounded-2xl text-sm transition-colors">
              Demander mon QR code <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
