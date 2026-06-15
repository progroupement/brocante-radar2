import { createClient } from '@/lib/supabase-server'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MapIDF from '@/components/MapIDF'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { CalendarDays, MapPin, Users } from 'lucide-react'
import type { Event } from '@/lib/supabase'

interface DeptConfig {
  code: string
  nom: string
  slug: string
  description: string // texte SEO unique
}

interface Props {
  config: DeptConfig
}

export default async function DeptPage({ config }: Props) {
  const supabase = await createClient()
  const today = new Date().toISOString().split('T')[0]

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('departement', config.code)
    .eq('statut', 'validé')
    .gte('date', today)
    .order('date', { ascending: true })
    .limit(20)

  const upcomingEvents: Event[] = events ?? []

  // JSON-LD schema.org Events
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Brocantes et vide-greniers en ${config.nom}`,
    description: config.description,
    itemListElement: upcomingEvents.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Event',
        name: e.nom,
        startDate: e.date,
        location: {
          '@type': 'Place',
          name: e.adresse,
          address: {
            '@type': 'PostalAddress',
            streetAddress: e.adresse,
            addressLocality: e.ville,
            postalCode: e.code_postal,
            addressCountry: 'FR',
          },
          ...(e.lat && e.lng
            ? { geo: { '@type': 'GeoCoordinates', latitude: e.lat, longitude: e.lng } }
            : {}),
        },
        organizer: { '@type': 'Organization', name: 'Brocante Radar' },
        url: `${process.env.NEXT_PUBLIC_APP_URL}/brocante-${config.slug}`,
      },
    })),
  }

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-1">
        {/* Hero dept */}
        <section className="bg-[#F8F5F0] py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-orange-100 text-[#E8651A] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Île-de-France — {config.code}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">
              Brocantes et vide-greniers en {config.nom}
            </h1>
            <p className="text-[#6B6B6B] text-lg max-w-2xl mx-auto">
              {upcomingEvents.length > 0
                ? `${upcomingEvents.length} brocante${upcomingEvents.length > 1 ? 's' : ''} à venir dans le ${config.code}`
                : `Retrouvez toutes les brocantes et vide-greniers du ${config.nom}`}
            </p>
          </div>
        </section>

        {/* Liste des événements */}
        <section className="max-w-4xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold mb-6">
            Prochaines brocantes en {config.nom}
          </h2>

          {upcomingEvents.length === 0 ? (
            <div className="text-center py-12 bg-[#F8F5F0] rounded-2xl">
              <p className="text-[#6B6B6B] mb-4">Aucune brocante planifiée pour le moment.</p>
              <Link
                href="/organizer"
                className="inline-block bg-[#E8651A] text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors"
              >
                Ajouter votre brocante
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {upcomingEvents.map((event) => (
                <article
                  key={event.id}
                  className="border border-gray-200 rounded-2xl bg-white p-5 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-lg mb-2">{event.nom}</h3>
                  <div className="space-y-1.5 text-sm text-[#6B6B6B]">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="w-4 h-4 text-[#E8651A] flex-shrink-0" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#E8651A] flex-shrink-0" />
                      {event.adresse}, {event.ville}
                    </div>
                    {event.nb_stands && (
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-[#E8651A] flex-shrink-0" />
                        {event.nb_stands} stands prévus
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/search?q=&scope=today`}
                      className="text-xs bg-orange-100 text-orange-800 rounded-full px-3 py-1 hover:bg-orange-200 transition-colors font-medium"
                    >
                      Rechercher des objets
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Carte filtrée sur le département */}
        <MapIDF />

        {/* Texte SEO */}
        <section className="max-w-3xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold mb-4">
            Brocantes en {config.nom} — Guide du chineur
          </h2>
          <div className="prose prose-gray max-w-none text-[#6B6B6B] leading-relaxed space-y-4">
            <p>{config.description}</p>
            <p>
              Brocante Radar vous permet de préparer votre visite avant même d&apos;arriver sur les lieux.
              Grâce au système de mots-clés, chaque exposant liste les objets qu&apos;il vend : vinyles,
              Playmobil, meubles vintage, livres, électronique — plus besoin de parcourir tous les stands
              pour trouver ce qui vous intéresse.
            </p>
            <p>
              Les organisateurs de brocantes en {config.nom} peuvent inscrire gratuitement leur événement
              et recevoir un QR code à distribuer aux exposants. En quelques minutes, leur brocante est
              visible sur la carte et dans les résultats de recherche.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/search"
              className="flex-1 text-center bg-[#E8651A] text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors"
            >
              Rechercher un objet
            </Link>
            <Link
              href="/organizer"
              className="flex-1 text-center border-2 border-[#E8651A] text-[#E8651A] px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-colors"
            >
              Inscrire ma brocante
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
