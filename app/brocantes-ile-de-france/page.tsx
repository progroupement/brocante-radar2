import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase-server'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MapIDF from '@/components/MapIDF'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { CalendarDays, MapPin, Users } from 'lucide-react'
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

export default async function BrocantesIdfPage() {
  const supabase = await createClient()
  const today = new Date().toISOString().split('T')[0]

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('statut', 'validé')
    .gte('date', today)
    .order('date', { ascending: true })
    .limit(30)

  const upcomingEvents = events ?? []

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Brocantes et vide-greniers en Île-de-France',
    description: 'Toutes les brocantes référencées par Brocante Radar en Île-de-France.',
    url: `${process.env.NEXT_PUBLIC_APP_URL}/brocantes-ile-de-france`,
  }

  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1">
        <section className="bg-[#F8F5F0] py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">
              Brocantes et vide-greniers en Île-de-France
            </h1>
            <p className="text-[#6B6B6B] text-lg max-w-2xl mx-auto">
              {upcomingEvents.length} brocante{upcomingEvents.length > 1 ? 's' : ''} référencée{upcomingEvents.length > 1 ? 's' : ''} à venir — recherchez les objets que vous cherchez avant d&apos;arriver.
            </p>
          </div>
        </section>

        {/* Départements rapides */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <h2 className="text-xl font-bold mb-4">Par département</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {DEPARTEMENTS_IDF.map((d) => (
              <Link
                key={d.code}
                href={`/brocante-${d.slug}`}
                className="border border-gray-200 rounded-xl p-3 text-center hover:border-[#E8651A] hover:bg-orange-50 transition-all bg-white"
              >
                <div className="font-bold text-lg text-[#E8651A]">{d.code}</div>
                <div className="text-sm text-[#6B6B6B]">{d.nom}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Événements */}
        <section className="max-w-4xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold mb-6">Prochaines brocantes</h2>
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-12 bg-[#F8F5F0] rounded-2xl">
              <p className="text-[#6B6B6B] mb-4">Aucune brocante planifiée pour le moment.</p>
              <Link href="/organizer" className="inline-block bg-[#E8651A] text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors">
                Ajouter votre brocante
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {upcomingEvents.map((event) => (
                <article key={event.id} className="border border-gray-200 rounded-2xl bg-white p-5 hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-lg mb-2">{event.nom}</h3>
                  <div className="space-y-1.5 text-sm text-[#6B6B6B]">
                    <div className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4 text-[#E8651A]" />{formatDate(event.date)}</div>
                    <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#E8651A]" />{event.ville} ({event.departement})</div>
                    {event.nb_stands && <div className="flex items-center gap-1.5"><Users className="w-4 h-4 text-[#E8651A]" />{event.nb_stands} stands</div>}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <MapIDF />

        {/* Texte SEO */}
        <section className="max-w-3xl mx-auto px-4 py-10 text-[#6B6B6B] leading-relaxed space-y-4">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">Le guide des brocantes en Île-de-France</h2>
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
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/search" className="flex-1 text-center bg-[#E8651A] text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors">Rechercher un objet</Link>
            <Link href="/organizer" className="flex-1 text-center border-2 border-[#E8651A] text-[#E8651A] px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-colors">Inscrire ma brocante</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
