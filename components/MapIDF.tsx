'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { createClient, type Event } from '@/lib/supabase'
import { DEPARTEMENTS_IDF } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import 'leaflet/dist/leaflet.css'
import type { Icon as LeafletIcon } from 'leaflet'

const MapContainer = dynamic(() => import('react-leaflet').then((m) => m.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then((m) => m.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then((m) => m.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then((m) => m.Popup), { ssr: false })

// Icônes initialisées dans le composant via useEffect

// Coordonnées approximatives pour les villes brocantes_agenda
const COORDS_BY_VILLE: Record<string, [number, number]> = {
  // Paris — format "Xe" (données originales)
  'Paris 1er': [48.8601, 2.3477], 'Paris 2e':  [48.8671, 2.3477],
  'Paris 3e':  [48.8637, 2.3590], 'Paris 4e':  [48.8540, 2.3534],
  'Paris 5e':  [48.8476, 2.3511], 'Paris 6e':  [48.8499, 2.3347],
  'Paris 7e':  [48.8566, 2.3130], 'Paris 8e':  [48.8742, 2.3070],
  'Paris 9e':  [48.8780, 2.3390], 'Paris 10e': [48.8752, 2.3592],
  'Paris 11e': [48.8589, 2.3764], 'Paris 12e': [48.8436, 2.3895],
  'Paris 13e': [48.8322, 2.3561], 'Paris 14e': [48.8284, 2.3259],
  'Paris 15e': [48.8418, 2.2989], 'Paris 16e': [48.8666, 2.2854],
  'Paris 17e': [48.8880, 2.3130], 'Paris 18e': [48.8922, 2.3452],
  'Paris 19e': [48.8836, 2.3914], 'Paris 20e': [48.8636, 2.4014],
  // Paris — format "0X" / "X" (données scraper)
  'Paris 01': [48.8601, 2.3477], 'Paris 02': [48.8671, 2.3477],
  'Paris 03': [48.8637, 2.3590], 'Paris 04': [48.8540, 2.3534],
  'Paris 05': [48.8476, 2.3511], 'Paris 06': [48.8499, 2.3347],
  'Paris 07': [48.8566, 2.3130], 'Paris 08': [48.8742, 2.3070],
  'Paris 09': [48.8780, 2.3390], 'Paris 10': [48.8752, 2.3592],
  'Paris 11': [48.8589, 2.3764], 'Paris 12': [48.8436, 2.3895],
  'Paris 13': [48.8322, 2.3561], 'Paris 14': [48.8284, 2.3259],
  'Paris 15': [48.8418, 2.2989], 'Paris 16': [48.8666, 2.2854],
  'Paris 17': [48.8880, 2.3130], 'Paris 18': [48.8922, 2.3452],
  'Paris 19': [48.8836, 2.3914], 'Paris 20': [48.8636, 2.4014],
  // Villes IDF
  'Noisy-le-Grand':           [48.8484, 2.5505],
  'Brunoy':                   [48.6963, 2.5033],
  'La Garenne-Colombes':      [48.9053, 2.2479],
  'Nointel':                  [49.1561, 2.3022],
  'Ermont':                   [48.9997, 2.3610],
  'Choisy-le-Roi':            [48.7643, 2.4139],
  'Maisons-Alfort':           [48.8057, 2.4378],
  'Asnières-sur-Seine':       [48.9174, 2.2856],
  'Asnieres-sur-Seine':       [48.9174, 2.2856],
  'Champigny-sur-Marne':      [48.8172, 2.5152],
  'Athis-Mons':               [48.7082, 2.4012],
  'Coulommiers':              [48.8138, 3.0766],
  'Fontaine-le-Port':         [48.4833, 2.8667],
  'Égly':                     [48.5523, 2.2477],
  'Barbizon':                 [48.4456, 2.6033],
  'Boissy-le-Châtel':         [48.7500, 3.0167],
  'Bouqueval':                [49.0133, 2.4833],
  'Chevru':                   [48.6833, 3.1500],
  'Eaubonne':                 [48.9972, 2.2778],
  'Fresnes-sur-Marne':        [48.9333, 2.8167],
  'Hermé':                    [48.4167, 3.1167],
  'Meaux':                    [48.9600, 2.8800],
  'Mézières-sur-Seine':       [48.9500, 1.8000],
  'Montlignon':               [49.0167, 2.2833],
  'Nanteuil-sur-Marne':       [48.9667, 3.1667],
  'Nemours':                  [48.2667, 2.6833],
  'Saint-Clair-sur-Epte':     [49.2333, 1.6667],
  'Saint-Denis':              [48.9356, 2.3539],
  'Sainte-Colombe':           [48.6667, 3.1167],
  'Sevran':                   [48.9500, 2.5333],
  'Vétheuil':                 [49.0750, 1.7917],
  'Vieux-Champagne':          [48.6167, 3.2667],
  'Bobigny':                  [48.9100, 2.4406],
  'Étampes':                  [48.4344, 2.1606],
  'Évry':                     [48.6219, 2.4472],
  'Évry-Courcouronnes':       [48.6219, 2.4472],
  'Milly-la-Forêt':           [48.4017, 2.4697],
  'Perdreauville':            [48.9500, 1.7167],
  'Saint-Pierre-lès-Nemours': [48.2583, 2.6917],
  'Seine-Port':               [48.5167, 2.5833],
  'Villeneuve-Saint-Georges': [48.7333, 2.4500],
  'Fontainebleau':            [48.4044, 2.7019],
  'Guérard':                  [48.8167, 3.0167],
  'Montereau-Fault-Yonne':    [48.3833, 2.9500],
  'Marolles-en-Brie':         [48.7333, 2.6167],
  'Versailles':               [48.8014, 2.1301],
  'Argenteuil':               [48.9472, 2.2467],
  'Montreuil':                [48.8636, 2.4483],
  'Vincennes':                [48.8478, 2.4392],
  'Saint-Maur-des-Fossés':    [48.7997, 2.4875],
  'Créteil':                  [48.7811, 2.4572],
  'Vitry-sur-Seine':          [48.7875, 2.4028],
  'Ivry-sur-Seine':           [48.8139, 2.3839],
  'Aubervilliers':            [48.9142, 2.3836],
  'Pantin':                   [48.8978, 2.4039],
  'Saint-Ouen':               [48.9083, 2.3342],
  'Clichy':                   [48.9047, 2.3058],
  'Nanterre':                 [48.8922, 2.2067],
  'Courbevoie':               [48.8975, 2.2536],
  'Levallois-Perret':         [48.8953, 2.2878],
  'Boulogne-Billancourt':     [48.8353, 2.2408],
  'Issy-les-Moulineaux':      [48.8233, 2.2728],
  'Clamart':                  [48.8008, 2.2633],
  'Massy':                    [48.7253, 2.2567],
  'Palaiseau':                [48.7153, 2.2453],
  'Corbeil-Essonnes':         [48.6133, 2.4806],
  'Dammarie-les-Lys':         [48.5167, 2.6500],
  'Melun':                    [48.5394, 2.6594],
  'Chelles':                  [48.8819, 2.5961],
  'Lagny-sur-Marne':          [48.8667, 2.7167],
  'Provins':                  [48.5597, 3.2992],
  'Torcy':                    [48.8500, 2.6500],
  'Cergy':                    [49.0361, 2.0631],
  'Pontoise':                 [49.0506, 2.1006],
  'Garges-lès-Gonesse':       [48.9697, 2.4044],
  'Sarcelles':                [48.9972, 2.3806],
  'Enghien-les-Bains':        [48.9700, 2.3083],
  'Saint-Leu-la-Forêt':       [49.0167, 2.2500],
  'Montlhéry':                [48.6353, 2.2764],
  'Gif-sur-Yvette':           [48.6853, 2.1350],
  'Rambouillet':              [48.6447, 1.8311],
  'Épinay-sur-Seine':         [48.9528, 2.3119],
  'Stains':                   [48.9542, 2.3833],
  'Blanc-Mesnil':             [48.9397, 2.4611],
  'Drancy':                   [48.9250, 2.4519],
  'Villepinte':               [48.9594, 2.5453],
  'Tremblay-en-France':       [48.9653, 2.5639],
  'Pontault-Combault':        [48.7967, 2.6039],
  'Roissy-en-Brie':           [48.7917, 2.6436],
  'Ozoir-la-Ferrière':        [48.7667, 2.6667],
  'Brie-Comte-Robert':        [48.6919, 2.6150],
  'Gretz-Armainvilliers':     [48.7333, 2.7333],
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
  const [orangeIcon, setOrangeIcon] = useState<LeafletIcon | null>(null)
  const [blueIcon, setBlueIcon] = useState<LeafletIcon | null>(null)

  // Initialisation icônes Leaflet côté client uniquement
  useEffect(() => {
    const L = require('leaflet')
    const shadow = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
    const base = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img'
    setOrangeIcon(L.icon({
      iconUrl: `${base}/marker-icon-2x-orange.png`,
      shadowUrl: shadow,
      iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
    }))
    setBlueIcon(L.icon({
      iconUrl: `${base}/marker-icon-2x-blue.png`,
      shadowUrl: shadow,
      iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
    }))
  }, [])

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
              <Marker key={`agenda-${b.id}`} position={b.coords!} icon={orangeIcon ?? undefined}>
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
                <Marker key={event.id} position={[event.lat, event.lng]} icon={blueIcon ?? undefined}>
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
              <Marker position={userPos} icon={blueIcon ?? undefined}>
                <Popup>📍 Vous êtes ici</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>
    </section>
  )
}
