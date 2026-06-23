'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  Store, CalendarDays, MapPin, LogOut, Plus, CheckCircle,
  ArrowRight, Loader2, Search, Camera,
} from 'lucide-react'

const SUPABASE_URL = 'https://amnwcgdqrgmsdgfekrry.supabase.co'
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtbndjZ2Rxcmdtc2RnZmVrcnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1MjUyODMsImV4cCI6MjA5NzEwMTI4M30.Zodk0XBNeOBgiYWrzWXkR6qsdYpgxdUbK-1-etMFiJQ'

type Profile = { id: string; nom: string; telephone: string | null }

type Inscription = {
  id: string
  brocante_id: string
  statut: string
  created_at: string
  brocante: {
    id: string
    nom: string
    date_debut: string
    date_fin: string
    ville: string
    adresse: string | null
    dept: string
  }
  has_stand: boolean
}

type BrocanteAgenda = {
  id: string
  nom: string
  date_debut: string
  date_fin: string
  ville: string
  dept: string
  adresse: string | null
}

function formatDateFr(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

function isToday(dateStr: string) {
  return new Date().toISOString().split('T')[0] === dateStr
}

function isFuture(dateStr: string) {
  return dateStr >= new Date().toISOString().split('T')[0]
}

export default function MonEspacePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const bienvenue = searchParams.get('bienvenue') === '1'

  const [profile, setProfile] = useState<Profile | null>(null)
  const [inscriptions, setInscriptions] = useState<Inscription[]>([])
  const [loading, setLoading] = useState(true)
  const [authChecked, setAuthChecked] = useState(false)

  // Recherche brocante pour s'inscrire
  const [showSearch, setShowSearch] = useState(false)
  const [searchQ, setSearchQ] = useState('')
  const [searchResults, setSearchResults] = useState<BrocanteAgenda[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [inscribing, setInscribing] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        router.push('/exposant/connexion')
        return
      }
      setAuthChecked(true)

      // Charger profil
      const { data: prof } = await supabase
        .from('exposant_profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      setProfile(prof)

      // Charger inscriptions avec brocantes
      const { data: inscs } = await supabase
        .from('inscriptions_brocante')
        .select(`
          id, brocante_id, statut, created_at,
          brocante:brocantes_agenda(id, nom, date_debut, date_fin, ville, adresse, dept)
        `)
        .eq('exposant_id', user.id)
        .order('created_at', { ascending: false })

      if (inscs) {
        // Vérifier si chaque inscription a un stand
        const inscIds = inscs.map(i => i.id)
        const { data: stands } = await supabase
          .from('agenda_stands')
          .select('inscription_id')
          .in('inscription_id', inscIds)

        const standSet = new Set(stands?.map(s => s.inscription_id) ?? [])

        setInscriptions(inscs.map(i => ({
          ...i,
          brocante: Array.isArray(i.brocante) ? i.brocante[0] : i.brocante,
          has_stand: standSet.has(i.id),
        })))
      }

      setLoading(false)
    })
  }, [router])

  async function searchBrocantes(q: string) {
    if (q.length < 2) { setSearchResults([]); return }
    setSearchLoading(true)
    const today = new Date().toISOString().split('T')[0]
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/brocantes_agenda?or=(nom.ilike.*${encodeURIComponent(q)}*,ville.ilike.*${encodeURIComponent(q)}*)&date_debut=gte.${today}&order=date_debut.asc&limit=10`,
      { headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` } }
    )
    const data = await res.json()
    setSearchResults(Array.isArray(data) ? data : [])
    setSearchLoading(false)
  }

  async function sInscrire(brocante: BrocanteAgenda) {
    setInscribing(brocante.id)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('inscriptions_brocante')
      .insert({ exposant_id: user.id, brocante_id: brocante.id })
      .select()
      .single()

    if (!error && data) {
      setInscriptions(prev => [{
        id: data.id,
        brocante_id: brocante.id,
        statut: 'inscrit',
        created_at: data.created_at,
        brocante,
        has_stand: false,
      }, ...prev])
      setShowSearch(false)
      setSearchQ('')
      setSearchResults([])
    }
    setInscribing(null)
  }

  async function logout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/exposant/connexion')
  }

  if (!authChecked || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#E8651A]" />
      </div>
    )
  }

  const upcoming = inscriptions.filter(i => isFuture(i.brocante?.date_debut))
  const past = inscriptions.filter(i => !isFuture(i.brocante?.date_debut))

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#EEF4FF] min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-bold text-[#E8651A] uppercase tracking-widest mb-1">Mon espace</p>
              <h1 className="text-2xl font-black text-[#0D1B4B]">
                Bonjour, {profile?.nom?.split(' ')[0]} 👋
              </h1>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-sm text-[#4A5680] hover:text-[#0D1B4B] transition-colors"
            >
              <LogOut className="w-4 h-4" /> Déconnexion
            </button>
          </div>

          {bienvenue && (
            <div className="bg-green-50 border border-green-200 rounded-2xl px-5 py-4 flex items-center gap-3 mb-6">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <p className="text-green-800 text-sm font-medium">
                Compte créé ! Inscrivez-vous à une brocante pour publier votre stand le jour J.
              </p>
            </div>
          )}

          {/* Bouton s'inscrire */}
          <button
            onClick={() => setShowSearch(v => !v)}
            className="w-full flex items-center justify-center gap-2 bg-[#E8651A] hover:bg-[#d4581a] text-white font-bold px-6 py-4 rounded-2xl transition-colors mb-6"
          >
            <Plus className="w-5 h-5" />
            S&apos;inscrire à une brocante
          </button>

          {/* Recherche brocante */}
          {showSearch && (
            <div className="bg-white rounded-2xl border border-blue-100 p-5 mb-6">
              <h2 className="font-black text-[#0D1B4B] mb-3">Trouver une brocante</h2>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A5680]" />
                <input
                  type="text"
                  value={searchQ}
                  onChange={e => {
                    setSearchQ(e.target.value)
                    searchBrocantes(e.target.value)
                  }}
                  placeholder="Nom ou ville de la brocante…"
                  className="w-full border border-blue-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8651A]"
                />
              </div>

              {searchLoading && (
                <div className="flex justify-center py-4">
                  <Loader2 className="w-5 h-5 animate-spin text-[#E8651A]" />
                </div>
              )}

              {searchResults.map(b => {
                const alreadyIn = inscriptions.some(i => i.brocante_id === b.id)
                return (
                  <div key={b.id} className="flex items-center justify-between py-3 border-b border-blue-50 last:border-0">
                    <div>
                      <p className="font-semibold text-[#0D1B4B] text-sm">{b.nom}</p>
                      <p className="text-xs text-[#4A5680] mt-0.5">
                        <CalendarDays className="w-3 h-3 inline mr-1" />{formatDateFr(b.date_debut)}
                        {' · '}
                        <MapPin className="w-3 h-3 inline mr-1" />{b.ville}
                      </p>
                    </div>
                    {alreadyIn ? (
                      <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Inscrit
                      </span>
                    ) : (
                      <button
                        onClick={() => sInscrire(b)}
                        disabled={inscribing === b.id}
                        className="text-xs bg-[#E8651A] text-white font-bold px-3 py-1.5 rounded-lg hover:bg-[#d4581a] disabled:opacity-50 flex items-center gap-1"
                      >
                        {inscribing === b.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                        S&apos;inscrire
                      </button>
                    )}
                  </div>
                )
              })}

              {searchQ.length >= 2 && !searchLoading && searchResults.length === 0 && (
                <p className="text-sm text-[#4A5680] text-center py-4">Aucune brocante trouvée pour « {searchQ} »</p>
              )}
            </div>
          )}

          {/* Brocantes à venir */}
          {upcoming.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-black text-[#0D1B4B] mb-4">Mes brocantes à venir</h2>
              <div className="space-y-3">
                {upcoming.map(i => {
                  const b = i.brocante
                  if (!b) return null
                  const today = isToday(b.date_debut)

                  return (
                    <div
                      key={i.id}
                      className={`bg-white rounded-2xl border p-5 ${today ? 'border-[#E8651A] shadow-orange-50 shadow-md' : 'border-blue-100'}`}
                    >
                      {today && (
                        <div className="inline-flex items-center gap-1.5 bg-[#E8651A] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                          <Store className="w-3 h-3" /> C&apos;est aujourd&apos;hui !
                        </div>
                      )}
                      <h3 className="font-black text-[#0D1B4B]">{b.nom}</h3>
                      <div className="flex flex-wrap gap-3 text-xs text-[#4A5680] mt-1.5">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="w-3 h-3" />
                          {b.date_debut === b.date_fin
                            ? formatDateFr(b.date_debut)
                            : `${formatDateFr(b.date_debut)} → ${formatDateFr(b.date_fin)}`}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {b.adresse ? `${b.adresse}, ` : ''}{b.ville}
                        </span>
                      </div>

                      {today && (
                        <Link
                          href={`/exposant/mon-stand/${b.id}`}
                          className="mt-4 flex items-center justify-center gap-2 bg-[#E8651A] hover:bg-[#d4581a] text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors"
                        >
                          <Camera className="w-4 h-4" />
                          {i.has_stand ? 'Mettre à jour mon stand' : 'Publier mon stand maintenant'}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}

                      {!today && i.has_stand && (
                        <p className="text-xs text-green-600 font-semibold mt-3 flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Stand publié
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {/* Brocantes passées */}
          {past.length > 0 && (
            <section>
              <h2 className="text-lg font-black text-[#0D1B4B] mb-4 opacity-60">Brocantes passées</h2>
              <div className="space-y-2">
                {past.map(i => {
                  const b = i.brocante
                  if (!b) return null
                  return (
                    <div key={i.id} className="bg-white/60 rounded-xl border border-blue-50 px-5 py-3 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-[#0D1B4B] text-sm">{b.nom}</p>
                        <p className="text-xs text-[#4A5680]">{formatDateFr(b.date_debut)} · {b.ville}</p>
                      </div>
                      {i.has_stand && (
                        <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Stand publié
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {inscriptions.length === 0 && !showSearch && (
            <div className="text-center py-16 text-[#4A5680]">
              <Store className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-semibold">Aucune brocante pour l&apos;instant</p>
              <p className="text-sm mt-1">Cliquez sur « S&apos;inscrire à une brocante » pour commencer.</p>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}
