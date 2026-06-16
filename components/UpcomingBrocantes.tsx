'use client'

import { useEffect, useState } from 'react'
import { MapPin, CalendarDays, ArrowRight, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'

type BrocanteAgenda = {
  id: string
  nom: string
  date_debut: string
  date_fin: string
  ville: string
  dept: string
  adresse: string | null
  type: string
  recurrente: boolean
}

const DEPT_LABELS: Record<string, string> = {
  '75': 'Paris',
  '77': 'Seine-et-Marne',
  '78': 'Yvelines',
  '91': 'Essonne',
  '92': 'Hauts-de-Seine',
  '93': 'Seine-Saint-Denis',
  '94': 'Val-de-Marne',
  '95': "Val-d'Oise",
}

const DEPT_COLORS: Record<string, string> = {
  '75': 'bg-blue-100 text-blue-700',
  '77': 'bg-green-100 text-green-700',
  '78': 'bg-purple-100 text-purple-700',
  '91': 'bg-yellow-100 text-yellow-700',
  '92': 'bg-pink-100 text-pink-700',
  '93': 'bg-red-100 text-red-700',
  '94': 'bg-orange-100 text-orange-700',
  '95': 'bg-teal-100 text-teal-700',
}

function formatDateFr(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long' })
}

function formatDateRange(debut: string, fin: string) {
  if (debut === fin) return formatDateFr(debut)
  const d1 = new Date(debut + 'T00:00:00')
  const d2 = new Date(fin + 'T00:00:00')
  const day1 = d1.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' })
  const day2 = d2.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long' })
  return `${day1} → ${day2}`
}

function groupByWeekend(brocantes: BrocanteAgenda[]) {
  const groups: Record<string, BrocanteAgenda[]> = {}
  brocantes.forEach((b) => {
    const d = new Date(b.date_debut + 'T00:00:00')
    const day = d.getDay()
    const diffToSat = (6 - day + 7) % 7
    const sat = new Date(d)
    sat.setDate(d.getDate() + diffToSat)
    const key = sat.toISOString().split('T')[0]
    if (!groups[key]) groups[key] = []
    groups[key].push(b)
  })
  return groups
}

export default function UpcomingBrocantes({ dept }: { dept?: string }) {
  const [brocantes, setBrocantes] = useState<BrocanteAgenda[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    const supabase = createClient()
    let query = supabase
      .from('brocantes_agenda')
      .select('*')
      .gte('date_fin', today)
      .order('date_debut', { ascending: true })
      .limit(30)
    if (dept) query = query.eq('dept', dept)
    query.then(({ data }) => {
      if (data) setBrocantes(data as BrocanteAgenda[])
      setLoading(false)
    })
  }, [dept])

  const groups = groupByWeekend(brocantes)
  const weekendKeys = Object.keys(groups).sort()

  return (
    <section className="py-24 bg-[#EEF4FF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-bold text-[#E8651A] uppercase tracking-widest mb-3">Agenda brocante</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0D1B4B] tracking-tight leading-tight">
              Prochaines brocantes<br />
              <span className="text-[#E8651A]">en Île-de-France</span>
            </h2>
            <p className="text-[#4A5680] text-sm mt-3">
              Uniquement des brocantes professionnelles · Cliquez pour vous inscrire
            </p>
          </div>
          <Link
            href="/brocantes-ile-de-france"
            className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-[#E8651A] hover:gap-3 transition-all"
          >
            Toutes les brocantes IDF <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Chargement */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white/60 rounded-2xl p-5 h-36 animate-pulse" />
            ))}
          </div>
        )}

        {/* Aucune brocante */}
        {!loading && brocantes.length === 0 && (
          <div className="text-center py-16 text-[#4A5680]">
            <p className="text-4xl mb-4">🔍</p>
            <p className="font-semibold text-[#0D1B4B] mb-1">Aucune brocante à venir pour l&apos;instant</p>
            <p className="text-sm">Revenez bientôt, le calendrier est mis à jour chaque semaine.</p>
          </div>
        )}

        {/* Liste par week-end */}
        {!loading && weekendKeys.length > 0 && (
          <div className="space-y-12">
            {weekendKeys.map((satKey) => {
              const items = groups[satKey]
              const satDate = new Date(satKey + 'T00:00:00')
              const sunDate = new Date(satDate)
              sunDate.setDate(satDate.getDate() + 1)
              const labelSat = satDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
              const labelSun = sunDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })

              return (
                <div key={satKey}>
                  {/* Label week-end */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <CalendarDays className="w-4 h-4 text-[#E8651A]" />
                      <span className="text-xs font-bold text-[#0D1B4B] uppercase tracking-widest">
                        Week-end {labelSat} – {labelSun}
                      </span>
                    </div>
                    <div className="flex-1 h-px bg-blue-200" />
                    <span className="text-xs text-[#4A5680] flex-shrink-0">
                      {items.length} brocante{items.length > 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Cards cliquables */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((b) => (
                      <Link
                        key={b.id}
                        href={`/brocante/${b.id}`}
                        className="group bg-white border border-blue-100 rounded-2xl p-5 flex flex-col gap-3 hover:shadow-lg hover:shadow-blue-100 hover:border-[#E8651A] transition-all cursor-pointer"
                      >
                        {/* Badges */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${DEPT_COLORS[b.dept] ?? 'bg-gray-100 text-gray-600'}`}>
                            {b.dept} · {DEPT_LABELS[b.dept] ?? b.dept}
                          </span>
                          {b.recurrente && (
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-700">
                              Récurrente
                            </span>
                          )}
                        </div>

                        {/* Infos */}
                        <div className="flex-1">
                          <h3 className="font-bold text-[#0D1B4B] text-sm leading-snug mb-1 group-hover:text-[#E8651A] transition-colors">{b.nom}</h3>
                          <p className="text-xs text-[#E8651A] font-semibold mb-2">{b.type}</p>
                          {b.adresse && (
                            <div className="flex items-start gap-1.5 text-xs text-[#4A5680]">
                              <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5" />
                              <span>{b.adresse}, {b.ville}</span>
                            </div>
                          )}
                        </div>

                        {/* Date + CTA */}
                        <div className="flex items-center justify-between pt-2 border-t border-blue-100">
                          <span className="text-xs text-[#4A5680] font-medium">
                            📅 {formatDateRange(b.date_debut, b.date_fin)}
                          </span>
                          <span className="text-xs font-semibold text-[#E8651A] flex items-center gap-0.5 group-hover:gap-1 transition-all">
                            S&apos;inscrire <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
