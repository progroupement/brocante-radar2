'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { createClient, type Event } from '@/lib/supabase'
import { DEPARTEMENTS_IDF } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import 'leaflet/dist/leaflet.css'

const MapContainer = dynamic(() => import('react-leaflet').then((m) => m.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then((m) => m.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then((m) => m.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then((m) => m.Popup), { ssr: false })

// Coordonnées approximatives pour les villes brocantes_agenda
const COORDS_BY_VILLE: Record<string, [number, number]> = {
  'Paris 14e':           [48.8281, 2.3239],
  'Paris 18e':           [48.8894, 2.3364],
  'Paris 16e':           [48.8666, 2.2854],
  'Paris 15e':           [48.8468, 2.3148],
  'Paris 6e':            [48.8531, 2.3387],
  'Noisy-le-Grand':      [48.8484, 2.5505],
  'Brunoy':              [48.6963, 2.5033],
  'La Garenne-Colombes': [48.9053, 2.2479],
  'Nointel':             [49.1561, 2.3022],
  'Ermont':              [48.9997, 2.3610],
  'Choisy-le-Roi':       [48.7643, 2.4139],
  'Maisons-Alfort':      [48.8057, 2.4378],
  'Asnières-sur-Seine':  [48.9174, 2.2856],
  'Champigny-sur-Marne': [48.8172, 2.5152],
  'Athis-Mons':          [48.7082, 2.4012],
  'Coulommiers':         [48.8138, 3.0766],
  'Fontaine-le-Port':    [48.4833, 2.8667],
}

type BrocanteAgenda = {
  id: string
  nom: string
  date_debut: string
  date_fin: string
  ville: string
  dept: string
  adresse: string | null
  type: string
}

function formatDateFr(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long' })
}

export default function MapIDF() {
  const [events, setEvents] = useState<Event[]>([])
  const [brocantes, setBrocantes] = useState<BrocanteAgenda[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [deptFilter, setDeptFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [userPos, setUserPos] = useState<[number, number] | null>(null)

  useEffect(() => {
    const supabase = createClient()

    supabase
      .from('events')
      .select('*')
      .eq('statut', 'validé')
      .not('lat', 'is', null)
      .then(({ data }) => {
        if (data) { setEvents(data as Event[]); setFilteredEvents(data as Event[]) }
      })

    const today = new Date().toISOString().split('T')[0]
    supabase
      .from('brocantes_agenda')
      .select('*')
      .gte('date_fin', today)
      .order('date_debut', { ascending: true })
      .limit(30)
      .then(({ data }) => {
        if (data) setBrocantes(data as BrocanteAgenda[])
      })
  }, [])

  useEffect(() => {
    let filtered = events
    if (deptFilter) filtered = filtered.filter((e) => e.departement === deptFilter)
    if (dateFilter) filtered = filtered.filter((e) => e.date === dateFilter)
    setFilteredEvents(filtered)
  }, [deptFilter, dateFilter, events])

  function locateUser() {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserPos([pos.coords.latitude, pos.coords.longitude]),
      () => alert("Impossible d'accéder à votre position")
    )
  }

  const brocantesAvecCoords = brocantes
    .map((b) => ({ ...b, coords: COORDS_BY_VILLE[b.ville] }))
    .filter((b) => !!b.coords)

  const totalMarkers = filteredEvents.length + brocantesAvecCoords.length

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2 text-center text-[#0D1B4B]">Brocantes en Île-de-France</h2>
        <p className="text-[#4A5680] text-center mb-8">
          {totalMarkers} brocante{totalMarkers > 1 ? 's' : ''} sur la carte · Cliquez pour s&apos;inscrire
        </p>

        {/* Filtres */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="border border-blue-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8651A] bg-white"
          >
            <option value="">Tous les départements</option>
            {DEPARTEMENTS_IDF.map((d) => (
              <option key={d.code} value={d.code}>{d.code} — {d.nom}</option>
            ))}
          </select>

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border border-blue-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8651A] bg-white"
          />

          <button
            onClick={locateUser}
            className="flex items-center gap-2 border border-blue-200 rounded-xl px-4 py-2 text-sm hover:bg-[#EEF4FF] transition-colors bg-white"
          >
            📍 Me localiser
          </button>

          {(deptFilter || dateFilter) && (
            <button
              onClick={() => { setDeptFilter(''); setDateFilter('') }}
              className="text-[#E8651A] text-sm hover:underline px-2"
            >
              Effacer les filtres
            </button>
          )}
        </div>

        {/* Légende */}
        <div className="flex flex-wrap gap-5 justify-center mb-5 text-xs text-[#4A5680]">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#E8651A] inline-block" /> Brocante à venir
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#0D1B4B] inline-block" /> Stand publié
          </span>
        </div>

        {/* Carte */}
        <div className="rounded-2xl border border-blue-100 shadow-sm" style={{ height: '520px', position: 'relative' }}>
          <MapContainer
            center={[48.8499, 2.637]}
            zoom={9}
            style={{ width: '100%', height: '100%', borderRadius: '1rem' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Brocantes agenda — marqueurs orange */}
            {brocantesAvecCoords.map((b) => (
              <Marker key={`agenda-${b.id}`} position={b.coords!}>
                <Popup>
                  <div className="text-sm min-w-[210px]">
                    <p className="font-bold text-base mb-1 text-[#0D1B4B]">{b.nom}</p>
                    <p className="text-[#E8651A] font-semibold text-xs mb-1">{b.type}</p>
                    <p className="text-gray-600 text-xs">📅 {formatDateFr(b.date_debut)}{b.date_debut !== b.date_fin ? ` → ${formatDateFr(b.date_fin)}` : ''}</p>
                    {b.adresse
                      ? <p className="text-gray-600 text-xs mt-1">📍 {b.adresse}, {b.ville}</p>
                      : <p className="text-gray-600 text-xs mt-1">📍 {b.ville}</p>
                    }
                    <a
                      href={`/brocante/${b.id}`}
                      className="mt-3 block text-center bg-[#E8651A] text-white text-xs font-semibold py-2 px-3 rounded-lg hover:bg-[#d4581a]"
                    >
                      S&apos;inscrire →
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Stands publiés — marqueurs bleu */}
            {filteredEvents.map((event) =>
              event.lat && event.lng ? (
                <Marker key={event.id} position={[event.lat, event.lng]}>
                  <Popup>
                    <div className="text-sm min-w-[180px]">
                      <p className="font-bold text-base mb-1">{event.nom}</p>
                      <p className="text-gray-600">{formatDate(event.date)}</p>
                      <p className="text-gray-600">{event.adresse}, {event.ville}</p>
                      {event.nb_stands && (
                        <p className="mt-1 text-[#E8651A] font-medium">{event.nb_stands} stands</p>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ) : null
            )}

            {userPos && (
              <Marker position={userPos}>
                <Popup>📍 Vous êtes ici</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>
    </section>
  )
}
