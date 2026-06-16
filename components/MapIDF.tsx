'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { createClient, type Event } from '@/lib/supabase'
import { DEPARTEMENTS_IDF } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import 'leaflet/dist/leaflet.css'

// Leaflet doit être chargé côté client uniquement
const MapContainer = dynamic(
  () => import('react-leaflet').then((m) => m.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((m) => m.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((m) => m.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then((m) => m.Popup),
  { ssr: false }
)

export default function MapIDF() {
  const [events, setEvents] = useState<Event[]>([])
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
        if (data) {
          setEvents(data as Event[])
          setFilteredEvents(data as Event[])
        }
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

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2 text-center">Brocantes en Île-de-France</h2>
        <p className="text-[#6B6B6B] text-center mb-8">
          {filteredEvents.length} brocante{filteredEvents.length > 1 ? 's' : ''} trouvée{filteredEvents.length > 1 ? 's' : ''}
        </p>

        {/* Filtres */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8651A] bg-white"
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
            className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8651A] bg-white"
          />

          <button
            onClick={locateUser}
            className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2 text-sm hover:bg-gray-50 transition-colors bg-white"
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

        {/* Carte */}
        <div className="rounded-2xl border border-gray-200 shadow-sm" style={{ height: '520px', position: 'relative' }}>
          <MapContainer
            center={[48.8499, 2.637]}
            zoom={9}
            style={{ width: '100%', height: '100%', borderRadius: '1rem' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
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
