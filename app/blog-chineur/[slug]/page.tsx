import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ArticleIllustration from '@/components/ArticleIllustration'
import { articlesChineur, getArticleChineur } from '@/lib/articles-chineur'
import { Clock, ArrowLeft, ArrowRight, Tag } from 'lucide-react'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return articlesChineur.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleChineur(slug)
  if (!article) return {}
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: article.keywords,
    alternates: { canonical: `https://brocanteradar.fr/blog-chineur/${slug}` },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url: `https://brocanteradar.fr/blog-chineur/${slug}`,
      type: 'article',
      publishedTime: article.date,
    },
  }
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function ArticleChineurPage({ params }: Props) {
  const { slug } = await params
  const article = getArticleChineur(slug)
  if (!article) notFound()

  const others = articlesChineur.filter((a) => a.slug !== slug).slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.metaTitle,
    description: article.metaDescription,
    datePublished: article.date,
    author: { '@type': 'Organization', name: 'Brocante Radar' },
    publisher: { '@type': 'Organization', name: 'Brocante Radar', url: 'https://brocanteradar.fr' },
    url: `https://brocanteradar.fr/blog-chineur/${slug}`,
    keywords: article.keywords.join(', '),
  }

  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1 bg-white">

        <section className="bg-[#0D1B4B] py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <Link href="/blog-chineur" className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Blog du chineur
            </Link>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0">
                <div className="w-14 h-14">
                  <ArticleIllustration illustration={article.illustration} />
                </div>
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E8651A]/20 text-orange-300 mb-2">
                  <Tag className="w-3 h-3" /> {article.category}
                </div>
                <div className="flex items-center gap-3 text-sm text-blue-400">
                  <span>{formatDate(article.date)}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTime} min</span>
                </div>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
              {article.title}
            </h1>
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
            <h2 className="text-xl font-black text-[#0D1B4B] mb-6">Autres conseils pour les chineurs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {others.map((a) => (
                <Link key={a.slug} href={`/blog-chineur/${a.slug}`} className="group bg-white rounded-2xl overflow-hidden border border-blue-100 hover:border-[#E8651A] transition-all">
                  <div className="bg-[#EEF4FF] py-4 flex items-center justify-center">
                    <div className="w-16 h-16">
                      <ArticleIllustration illustration={a.illustration} />
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-bold text-[#0D1B4B] text-sm leading-snug group-hover:text-[#E8651A] transition-colors mb-2">{a.title}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#E8651A]">
                      Lire <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
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
