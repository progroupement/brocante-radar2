import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ArticleIllustration from '@/components/ArticleIllustration'
import { articlesChineur } from '@/lib/articles-chineur'
import { Clock, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog du Chineur — Conseils et astuces pour bien chiner en Île-de-France',
  description: 'Préparer sa visite, négocier, reconnaître les bonnes affaires : tous les conseils pratiques pour les chineurs des brocantes d\'Île-de-France.',
  keywords: ['blog chineur brocante', 'conseils chinage brocante idf', 'astuces chineur brocante paris'],
  alternates: { canonical: 'https://brocanteradar.fr/blog-chineur' },
  openGraph: {
    title: 'Blog du Chineur — Brocante Radar',
    description: 'Les meilleurs conseils pratiques pour bien chiner en Île-de-France.',
    url: 'https://brocanteradar.fr/blog-chineur',
    type: 'website',
  },
}

const categoryColors: Record<string, string> = {
  'Conseils pratiques': 'bg-orange-100 text-orange-800',
  'Techniques': 'bg-blue-100 text-blue-800',
  'Guide': 'bg-green-100 text-green-800',
  'Stratégie': 'bg-purple-100 text-purple-800',
  'Mode & Textile': 'bg-pink-100 text-pink-800',
  'Expertise': 'bg-indigo-100 text-indigo-800',
  'Agenda & Lieux': 'bg-teal-100 text-teal-800',
  'Partage & Style': 'bg-yellow-100 text-yellow-800',
  'Entretien': 'bg-gray-100 text-gray-800',
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogChineurPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">

        <section className="bg-[#0D1B4B] py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 border border-blue-600 bg-blue-900/50 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wide">
              <span className="w-1.5 h-1.5 bg-[#E8651A] rounded-full" />
              Pour les chineurs
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Le blog du chineur
            </h1>
            <p className="text-blue-300 text-lg max-w-2xl">
              Préparer sa visite, négocier, repérer les bonnes affaires, entretenir ses trouvailles : tous les conseils pratiques pour chiner comme un pro en Île-de-France.
            </p>
          </div>
        </section>

        <section className="py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articlesChineur.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog-chineur/${article.slug}`}
                  className="group bg-white border border-blue-100 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-blue-100 hover:border-blue-200 transition-all flex flex-col"
                >
                  <div className="bg-[#EEF4FF] py-6 flex items-center justify-center">
                    <div className="w-24 h-24">
                      <ArticleIllustration illustration={article.illustration} />
                    </div>
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
            <h2 className="text-2xl font-black text-[#0D1B4B] mb-3">Soyez alerté avant les autres</h2>
            <p className="text-[#4A5680] mb-6 text-sm leading-relaxed">
              Créez votre profil chineur et recevez une alerte dès qu&apos;un exposant propose l&apos;objet que vous cherchez.
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
