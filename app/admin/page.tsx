'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'
import { Loader2, CheckCircle, XCircle, Download, LogOut, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Stats {
  events: number
  organizers: number
  stands: number
  keywords: number
}

interface OrganizerRow {
  id: string
  nom: string
  email: string
  association?: string
  telephone?: string
  created_at: string
}

interface EventRow {
  id: string
  nom: string
  date: string
  ville: string
  departement: string
  statut: string
  nb_stands?: number
  organizer_id: string
}

interface KeywordCount {
  label: string
  count: number
}

export default function AdminPage() {
  const supabase = createClient()

  const [session, setSession] = useState<boolean | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const [stats, setStats] = useState<Stats>({ events: 0, organizers: 0, stands: 0, keywords: 0 })
  const [organizers, setOrganizers] = useState<OrganizerRow[]>([])
  const [events, setEvents] = useState<EventRow[]>([])
  const [topKeywords, setTopKeywords] = useState<KeywordCount[]>([])
  const [dataLoading, setDataLoading] = useState(false)

  // Vérifier la session
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(!!data.session)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(!!s)
    })
    return () => subscription.unsubscribe()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData = useCallback(async () => {
    setDataLoading(true)
    const [
      { count: evtCount },
      { count: orgCount },
      { count: stdCount },
      { count: kwCount },
      { data: orgs },
      { data: evts },
      { data: kws },
    ] = await Promise.all([
      supabase.from('events').select('*', { count: 'exact', head: true }),
      supabase.from('organizers').select('*', { count: 'exact', head: true }),
      supabase.from('stands').select('*', { count: 'exact', head: true }),
      supabase.from('keywords').select('*', { count: 'exact', head: true }),
      supabase.from('organizers').select('*').order('created_at', { ascending: false }).limit(50),
      supabase.from('events').select('*').order('date', { ascending: false }).limit(50),
      supabase.from('keywords').select('label').limit(1000),
    ])

    setStats({
      events: evtCount ?? 0,
      organizers: orgCount ?? 0,
      stands: stdCount ?? 0,
      keywords: kwCount ?? 0,
    })
    setOrganizers(orgs ?? [])
    setEvents(evts ?? [])

    // Compter les top keywords
    const kwMap: Record<string, number> = {}
    kws?.forEach((k) => { kwMap[k.label] = (kwMap[k.label] ?? 0) + 1 })
    const sorted = Object.entries(kwMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 20)
      .map(([label, count]) => ({ label, count }))
    setTopKeywords(sorted)
    setDataLoading(false)
  }, [supabase])

  useEffect(() => {
    if (session) fetchData()
  }, [session, fetchData])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setLoginError(error.message); setLoginLoading(false) }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  async function updateEventStatus(id: string, statut: string) {
    await supabase.from('events').update({ statut }).eq('id', id)
    fetchData()
  }

  function exportCSV() {
    const headers = ['Nom', 'Email', 'Association', 'Téléphone', 'Date inscription']
    const rows = organizers.map((o) => [
      o.nom, o.email, o.association ?? '', o.telephone ?? '',
      new Date(o.created_at).toLocaleDateString('fr-FR'),
    ])
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url
    a.download = `organisateurs_brocante_radar_${new Date().toISOString().split('T')[0]}.csv`
    a.click(); URL.revokeObjectURL(url)
  }

  // Chargement initial
  if (session === null) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-[#E8651A]" /></div>
  }

  // Login form
  if (!session) {
    return (
      <div className="min-h-screen bg-[#F8F5F0] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Admin</h1>
            <p className="text-[#6B6B6B] text-sm mt-1">Brocante Radar</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" required />
            </div>
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5" required />
            </div>
            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
            <Button type="submit" className="w-full" disabled={loginLoading}>
              {loginLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Connexion...</> : 'Se connecter'}
            </Button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#E8651A]" />
          <span className="font-bold text-lg">Dashboard Admin — Brocante Radar</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
          <LogOut className="w-4 h-4" />
          Déconnexion
        </Button>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Stats globales */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Événements', value: stats.events },
            { label: 'Organisateurs', value: stats.organizers },
            { label: 'Stands', value: stats.stands },
            { label: 'Mots-clés', value: stats.keywords },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 text-center">
              <div className="text-3xl font-bold text-[#E8651A]">{s.value.toLocaleString('fr-FR')}</div>
              <div className="text-sm text-[#6B6B6B] mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {dataLoading && (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-[#E8651A]" />
          </div>
        )}

        {/* Événements à valider */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-lg">Événements</h2>
            <span className="text-sm text-[#6B6B6B]">{events.length} au total</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#F8F5F0]">
                <tr>
                  <th className="text-left px-6 py-3 font-medium text-[#6B6B6B]">Nom</th>
                  <th className="text-left px-6 py-3 font-medium text-[#6B6B6B]">Date</th>
                  <th className="text-left px-6 py-3 font-medium text-[#6B6B6B]">Ville</th>
                  <th className="text-left px-6 py-3 font-medium text-[#6B6B6B]">Dept</th>
                  <th className="text-left px-6 py-3 font-medium text-[#6B6B6B]">Stands</th>
                  <th className="text-left px-6 py-3 font-medium text-[#6B6B6B]">Statut</th>
                  <th className="text-left px-6 py-3 font-medium text-[#6B6B6B]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {events.map((e) => (
                  <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3 font-medium">{e.nom}</td>
                    <td className="px-6 py-3 text-[#6B6B6B]">{formatDate(e.date)}</td>
                    <td className="px-6 py-3 text-[#6B6B6B]">{e.ville}</td>
                    <td className="px-6 py-3 text-[#6B6B6B]">{e.departement}</td>
                    <td className="px-6 py-3 text-[#6B6B6B]">{e.nb_stands ?? '—'}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        e.statut === 'validé' ? 'bg-green-100 text-green-800' :
                        e.statut === 'annulé' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {e.statut}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex gap-2">
                        {e.statut !== 'validé' && (
                          <button
                            onClick={() => updateEventStatus(e.id, 'validé')}
                            className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                            title="Valider"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {e.statut !== 'annulé' && (
                          <button
                            onClick={() => updateEventStatus(e.id, 'annulé')}
                            className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                            title="Refuser"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Organisateurs */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-lg">Organisateurs</h2>
            <Button size="sm" variant="secondary" onClick={exportCSV} className="gap-2">
              <Download className="w-4 h-4" />
              Exporter CSV
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#F8F5F0]">
                <tr>
                  <th className="text-left px-6 py-3 font-medium text-[#6B6B6B]">Nom</th>
                  <th className="text-left px-6 py-3 font-medium text-[#6B6B6B]">Email</th>
                  <th className="text-left px-6 py-3 font-medium text-[#6B6B6B]">Association</th>
                  <th className="text-left px-6 py-3 font-medium text-[#6B6B6B]">Tél.</th>
                  <th className="text-left px-6 py-3 font-medium text-[#6B6B6B]">Inscription</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {organizers.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3 font-medium">{o.nom}</td>
                    <td className="px-6 py-3 text-[#6B6B6B]">{o.email}</td>
                    <td className="px-6 py-3 text-[#6B6B6B]">{o.association ?? '—'}</td>
                    <td className="px-6 py-3 text-[#6B6B6B]">{o.telephone ?? '—'}</td>
                    <td className="px-6 py-3 text-[#6B6B6B]">{new Date(o.created_at).toLocaleDateString('fr-FR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top mots-clés */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-lg mb-4">Mots-clés les plus utilisés</h2>
          <div className="flex flex-wrap gap-2">
            {topKeywords.map((kw) => (
              <div key={kw.label} className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 rounded-full px-3 py-1">
                <span className="text-sm font-medium text-orange-800">{kw.label}</span>
                <span className="text-xs text-orange-500 font-bold">{kw.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
