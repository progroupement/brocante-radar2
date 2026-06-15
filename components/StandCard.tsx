'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { MapPin, User, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const MapContainer = dynamic(() => import('react-leaflet').then((m) => m.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then((m) => m.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then((m) => m.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then((m) => m.Popup), { ssr: false })

interface StandCardProps {
  id: string
  nom_exposant?: string | null
  numero_stand: string
  photo_url?: string | null
  keywords: string[]
  event_nom?: string
  event_adresse?: string
  event_ville?: string
  event_date?: string
  event_lat?: number | null
  event_lng?: number | null
  searchTerm?: string
}

export default function StandCard({
  nom_exposant,
  numero_stand,
  photo_url,
  keywords,
  event_nom,
  event_adresse,
  event_ville,
  event_date,
  event_lat,
  event_lng,
  searchTerm,
}: StandCardProps) {
  const [showMap, setShowMap] = useState(false)

  return (
    <>
      <div className="border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 bg-white overflow-hidden">
        <div className="flex gap-0">
          {/* Photo */}
          {photo_url ? (
            <div className="relative w-28 sm:w-36 flex-shrink-0">
              <Image
                src={photo_url}
                alt={`Stand ${numero_stand}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 112px, 144px"
              />
            </div>
          ) : (
            <div className="w-28 sm:w-36 flex-shrink-0 bg-[#F8F5F0] flex items-center justify-center text-4xl">
              🛍️
            </div>
          )}

          {/* Contenu */}
          <div className="flex-1 p-4">
            {/* Numéro de stand — très visible */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <span className="text-xs font-medium text-[#6B6B6B] uppercase tracking-wide">Stand</span>
                <p className="text-2xl font-bold font-mono text-[#1A1A1A] leading-none">{numero_stand}</p>
              </div>
              {nom_exposant && (
                <div className="flex items-center gap-1 text-sm text-[#6B6B6B] bg-gray-50 rounded-full px-3 py-1">
                  <User className="w-3 h-3" />
                  {nom_exposant}
                </div>
              )}
            </div>

            {/* Mots-clés */}
            <div className="flex flex-wrap gap-1 mb-3">
              {keywords.map((kw) => {
                const isMatch = searchTerm
                  ? kw.toLowerCase().includes(searchTerm.toLowerCase())
                  : false
                return (
                  <span
                    key={kw}
                    className={`rounded-full text-xs px-2 py-0.5 font-medium ${
                      isMatch
                        ? 'bg-[#E8651A] text-white'
                        : 'bg-orange-100 text-orange-800'
                    }`}
                  >
                    {kw}
                  </span>
                )
              })}
            </div>

            {/* Infos événement */}
            <div className="text-xs text-[#6B6B6B] space-y-0.5">
              {event_nom && <p className="font-medium text-[#1A1A1A]">{event_nom}</p>}
              {event_date && <p>{formatDate(event_date)}</p>}
              {(event_adresse || event_ville) && (
                <p>{[event_adresse, event_ville].filter(Boolean).join(', ')}</p>
              )}
            </div>

            {/* Bouton carte */}
            {event_lat && event_lng && (
              <Button
                size="sm"
                variant="ghost"
                className="mt-3 h-8 text-xs gap-1.5 text-[#E8651A] hover:text-[#E8651A] hover:bg-orange-50 -ml-2"
                onClick={() => setShowMap(true)}
              >
                <MapPin className="w-3 h-3" />
                Voir sur la carte
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mini-carte modale */}
      {showMap && event_lat && event_lng && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setShowMap(false)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden w-full max-w-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div>
                <p className="font-bold">{event_nom}</p>
                <p className="text-sm text-[#6B6B6B]">Stand {numero_stand}</p>
              </div>
              <button
                onClick={() => setShowMap(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div style={{ height: '300px' }}>
              <MapContainer
                center={[event_lat, event_lng]}
                zoom={16}
                style={{ width: '100%', height: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[event_lat, event_lng]}>
                  <Popup>
                    <p className="font-bold">{event_nom}</p>
                    <p>Stand {numero_stand}{nom_exposant ? ` — ${nom_exposant}` : ''}</p>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
            <div className="p-4 text-sm text-[#6B6B6B]">
              <p><MapPin className="w-3 h-3 inline mr-1" />{event_adresse}, {event_ville}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
