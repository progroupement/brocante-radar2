import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { articlesOrganisateur, getArticleOrganisateur } from '@/lib/articles-organisateur'
import { Clock, ArrowLeft, ArrowRight, Tag } from 'lucide-react'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return articlesOrganisateur.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleOrganisateur(slug)
  if (!article) return {}
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: article.keywords,
    alternates: { canonical: `https://brocanteradar.fr/blog-organisateur/${slug}` },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url: `https://brocanteradar.fr/blog-organisateur/${slug}`,
      type: 'article',
      publishedTime: article.date,
    },
  }
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function ArticleOrganisateurPage({ params }: Props) {
  const { slug } = await params
  const article = getArticleOrganisateur(slug)
  if (!article) notFound()

  const others = articlesOrganisateur.filter((a) => a.slug !== slug).slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.metaTitle,
    description: article.metaDescription,
    datePublished: article.date,
    author: { '@type': 'Organization', name: 'Brocante Radar' },
    publisher: { '@type': 'Organization', name: 'Brocante Radar', url: 'https://brocanteradar.fr' },
    url: `https://brocanteradar.fr/blog-organisateur/${slug}`,
    keywords: article.keywords.join(', '),
  }

  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1 bg-white">

        <section className="bg-[#0D1B4B] py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <Link href="/blog-organisateur" className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Blog de l&apos;organisateur
            </Link>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E8651A]/20 text-orange-300 mb-4">
              <Tag className="w-3 h-3" /> {article.category}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-blue-400">
              <span>{formatDate(article.date)}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTime} min de lecture</span>
            </div>
          </div>
        </section>

        <article className="py-12 px-4">
          <div
            className="max-w-3xl mx-auto article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>

        <section className="py-10 px-4 bg-[#EEF4FF] border-t border-blue-100">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-black text-[#0D1B4B] mb-6">Autres articles pour les organisateurs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {others.map((a) => (
                <Link key={a.slug} href={`/blog-organisateur/${a.slug}`} className="group bg-white rounded-2xl p-5 border border-blue-100 hover:border-[#E8651A] transition-all">
                  <p className="font-bold text-[#0D1B4B] text-sm leading-snug group-hover:text-[#E8651A] transition-colors mb-2">{a.title}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#E8651A]">
                    Lire <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
