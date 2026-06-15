'use client'

import { Suspense, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import SearchBar from '@/components/SearchBar'
import StandCard from '@/components/StandCard'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Radar, Loader2, Calendar } from 'lucide-react'
import { createClient, type Event } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'

interface SearchResult {
  id: string
  nom_exposant?: string
  numero_stand: string
  photo_url?: string
  keywords: string[]
  event_id?: string
  event_nom?: string
  event_adresse?: string
  event_ville?: string
  event_date?: string
  event_lat?: number
  event_lng?: number
}

const POPULAR = ['Playmobil', 'Vinyles', 'Lego', 'Livres', 'Nintendo', 'Vêtements', 'Déco', 'Outils']

function SearchContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQ = searchParams.get('q') ?? ''

  const [query, setQuery] = useState(initialQ)
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [scope, setScope] = useState<'today' | 'week' | 'all'>('today')
  const [eventId, setEventId] = useState('')
  const [todayEvents, setTodayEvents] = useState<Pick<Event, 'id' | 'nom' | 'date' | 'ville'>[]>([])

  useEffect(() => {
    const supabase = createClient()
    const today = new Date().toISOString().split('T')[0]
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    supabase
      .from('events')
      .select('id, nom, date, ville')
      .eq('statut', 'validé')
      .gte('date', today)
      .lte('date', nextWeek)
      .order('date')
      .limit(30)
      .then(({ data }) => { if (data) setTodayEvents(data as Pick<Event, 'id' | 'nom' | 'date' | 'ville'>[]) })
  }, [])

  const doSearch = useCallback(async (q: string) => {
    if (!q || q.trim().length < 2) return
    setLoading(true)
    setSearched(true)

    try {
      const params = new URLSearchParams({ q: q.trim(), scope })
      if (eventId) params.set('event_id', eventId)

      const res = await fetch(`/api/search?${params}`)
      const data = await res.json()
      setResults(data.results ?? [])

      router.replace(`/search?q=${encodeURIComponent(q.trim())}`, { scroll: false })
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [scope, eventId, router])

  useEffect(() => {
    if (query) doSearch(query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scope, eventId])

  useEffect(() => {
    if (initialQ) doSearch(initialQ)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const hasResults = results.length > 0
  const isEmpty = searched && !loading && !hasResults

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-screen">
        <div className="bg-white border-b border-gray-100 px-4 py-8 sm:py-12">
          <div className="max-w-2xl mx-auto">
            <Link href="/" className="flex items-center justify-center gap-2 mb-8 group">
              <div className="w-9 h-9 bg-[#E8651A] rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                <Radar className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                BROCANTE <span className="text-[#E8651A]">RADAR</span>
              </span>
            </Link>

            <SearchBar value={query} onChange={setQuery} onSearch={doSearch} autoFocus />

            <div className="flex flex-wrap gap-3 mt-4">
              <div className="flex rounded-xl overflow-hidden border border-gray-200 text-sm">
                {([
                  { key: 'today', label: "Aujourd'hui" },
                  { key: 'week', label: 'Cette semaine' },
                  { key: 'all', label: 'Toutes dates' },
                ] as const).map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setScope(key)}
                    className={`px-4 py-2 transition-colors ${
                      scope === key ? 'bg-[#E8651A] text-white font-medium' : 'bg-white text-[#6B6B6B] hover:bg-gray-50'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {todayEvents.length > 0 && (
                <select
                  value={eventId}
                  onChange={(e) => setEventId(e.target.value)}
                  className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8651A] bg-white text-[#6B6B6B]"
                >
                  <option value="">Toutes les brocantes</option>
                  {todayEvents.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.nom} — {formatDate(e.date)}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-6">
          {loading && (
            <div className="flex items-center justify-center py-16 gap-3 text-[#6B6B6B]">
              <Loader2 className="w-5 h-5 animate-spin text-[#E8651A]" />
              <span>Recherche en cours...</span>
            </div>
          )}

          {!loading && hasResults && (
            <>
              <p className="text-sm text-[#6B6B6B] mb-4">
                <span className="font-semibold text-[#1A1A1A]">{results.length}</span> stand{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''} pour{' '}
                <span className="text-[#E8651A] font-medium">« {query} »</span>
              </p>
              <div className="flex flex-col gap-4">
                {results.map((result) => (
                  <StandCard key={result.id} {...result} searchTerm={query} />
                ))}
              </div>
            </>
          )}

          {isEmpty && (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <h2 className="text-xl font-bold mb-2">Aucun stand trouvé</h2>
              <p className="text-[#6B6B6B] mb-8 max-w-sm mx-auto">
                Aucun exposant ne vend <strong>« {query} »</strong> dans les brocantes {
                  scope === 'today' ? "d'aujourd'hui" : scope === 'week' ? 'de la semaine' : ''
                }.
              </p>
              <div>
                <p className="text-sm font-medium text-[#6B6B6B] mb-3">Essayez ces recherches populaires :</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {POPULAR.map((term) => (
                    <button
                      key={term}
                      onClick={() => { setQuery(term); doSearch(term) }}
                      className="bg-orange-100 text-orange-800 rounded-full px-3 py-1.5 text-sm font-medium hover:bg-orange-200 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!searched && !loading && (
            <div className="text-center py-12">
              <p className="text-[#6B6B6B] mb-6 text-lg">Recherches populaires :</p>
              <div className="flex flex-wrap justify-center gap-2 mb-10">
                {POPULAR.map((term) => (
                  <button
                    key={term}
                    onClick={() => { setQuery(term); doSearch(term) }}
                    className="bg-orange-100 text-orange-800 rounded-full px-4 py-2 text-sm font-medium hover:bg-orange-200 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>

              {todayEvents.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-[#1A1A1A] mb-3 flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4 text-[#E8651A]" />
                    Brocantes actives cette semaine
                  </p>
                  <div className="flex flex-col gap-2 max-w-sm mx-auto text-left">
                    {todayEvents.slice(0, 5).map((e) => (
                      <button
                        key={e.id}
                        onClick={() => setEventId(e.id)}
                        className={`border rounded-xl px-4 py-2 text-sm text-left transition-all ${
                          eventId === e.id ? 'border-[#E8651A] bg-orange-50' : 'border-gray-200 hover:border-orange-200 bg-white'
                        }`}
                      >
                        <span className="font-medium">{e.nom}</span>
                        <span className="text-[#6B6B6B] ml-2">{formatDate(e.date)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-[#E8651A]" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
