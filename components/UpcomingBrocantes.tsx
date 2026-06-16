'use client'

import Link from 'next/link'
import { MapPin, CalendarDays, ExternalLink, ArrowRight } from 'lucide-react'

// Données réelles issues de brocabrac.fr — brocantes IDF uniquement (pas de vide-greniers)
// Mises à jour : juin–juillet 2026
const BROCANTES = [
  // ── WEEK-END 20-21 JUIN ──
  {
    nom: 'Puces de la Porte de Vanves',
    date: '2026-06-20',
    dateFin: '2026-06-21',
    ville: 'Paris 14e',
    dept: '75',
    adresse: 'Av. Marc Sangnier & Georges Lafenestre',
    type: 'Brocante professionnelle',
    recurrente: true,
    source: 'https://brocabrac.fr/app.php/75/paris/1313437-puces-de-la-porte-de-vanves',
  },
  {
    nom: 'Brocante Rue Caulaincourt',
    date: '2026-06-20',
    dateFin: '2026-06-21',
    ville: 'Paris 18e',
    dept: '75',
    adresse: 'Rue Caulaincourt — Métro Lamarck-Caulaincourt',
    type: 'Brocante professionnelle',
    recurrente: false,
    source: 'https://brocabrac.fr/app.php/75/paris/1115988-brocante-rue-caulaincourt',
  },
  {
    nom: 'Brocante professionnelle Victor Hugo',
    date: '2026-06-19',
    dateFin: '2026-06-21',
    ville: 'Paris 16e',
    dept: '75',
    adresse: 'Place Victor Hugo',
    type: 'Brocante professionnelle',
    recurrente: false,
    source: 'https://brocabrac.fr/app.php/75/paris/1370542-brocante-professionnelle-victor-hugo',
  },
  {
    nom: 'Brocante collection',
    date: '2026-06-20',
    dateFin: '2026-06-20',
    ville: 'Noisy-le-Grand',
    dept: '93',
    adresse: 'Place du Marché',
    type: 'Brocante',
    recurrente: true,
    source: 'https://brocabrac.fr/app.php/93/noisy-le-grand/1344237-brocante-collection',
  },
  {
    nom: 'Brocante de l\'été',
    date: '2026-06-21',
    dateFin: '2026-06-21',
    ville: 'Brunoy',
    dept: '91',
    adresse: 'Rue de Mandres',
    type: 'Brocante',
    recurrente: false,
    source: 'https://brocabrac.fr/app.php/91/brunoy/1357495-brocante-de-l-ete',
  },
  {
    nom: 'Brocante — Place de la Liberté',
    date: '2026-06-21',
    dateFin: '2026-06-21',
    ville: 'La Garenne-Colombes',
    dept: '92',
    adresse: 'Place de la Liberté',
    type: 'Brocante',
    recurrente: false,
    source: 'https://brocabrac.fr/app.php/92/la-garenne-colombes/1380421-brocante-place-de-la-liberte',
  },
  {
    nom: '37ème Brocante de Nointel',
    date: '2026-06-21',
    dateFin: '2026-06-21',
    ville: 'Nointel',
    dept: '95',
    adresse: 'Place du Château',
    type: 'Brocante',
    recurrente: false,
    source: 'https://brocabrac.fr/app.php/95/nointel/1368463-37eme-brocante',
  },
  {
    nom: 'Brocante de l\'AS Ermont',
    date: '2026-06-21',
    dateFin: '2026-06-21',
    ville: 'Ermont',
    dept: '95',
    adresse: 'Complexe sportif Rebuffat',
    type: 'Brocante',
    recurrente: false,
    source: 'https://brocabrac.fr/app.php/95/ermont/1359794-brocante-de-l-as-ermont',
  },
  // ── WEEK-END 27-28 JUIN ──
  {
    nom: 'Brocante professionnelle Breteuil',
    date: '2026-06-26',
    dateFin: '2026-06-28',
    ville: 'Paris 15e',
    dept: '75',
    adresse: 'Avenue de Breteuil',
    type: 'Brocante professionnelle',
    recurrente: false,
    source: 'https://brocabrac.fr/app.php/75/paris/1370544-brocante-professionnelle-breteuil',
  },
  {
    nom: 'Brocante Rue de l\'Odéon',
    date: '2026-06-27',
    dateFin: '2026-06-28',
    ville: 'Paris 6e',
    dept: '75',
    adresse: 'Rue de l\'Odéon — Métro Odéon',
    type: 'Brocante professionnelle',
    recurrente: false,
    source: 'https://brocabrac.fr/app.php/75/paris/1363400-brocante-rue-de-l-odeon',
  },
  {
    nom: 'Brocante Quartier Saint-Louis',
    date: '2026-06-27',
    dateFin: '2026-06-27',
    ville: 'Choisy-le-Roi',
    dept: '94',
    adresse: 'Place de l\'église — Centre-ville',
    type: 'Brocante',
    recurrente: false,
    source: 'https://brocabrac.fr/app.php/94/choisy-le-roi/1373432-brocante-quartier-saint-louis',
  },
  {
    nom: 'Brocante du Rotary',
    date: '2026-06-28',
    dateFin: '2026-06-28',
    ville: 'Maisons-Alfort',
    dept: '94',
    adresse: 'Rue Pierre et Marie Curie',
    type: 'Brocante caritative',
    recurrente: false,
    source: 'https://brocabrac.fr/app.php/94/maisons-alfort/1357338-brocante-du-rotary',
  },
  {
    nom: 'Brocante Square Silvain',
    date: '2026-06-28',
    dateFin: '2026-06-28',
    ville: 'Asnières-sur-Seine',
    dept: '92',
    adresse: 'Square Silvain',
    type: 'Brocante',
    recurrente: false,
    source: 'https://brocabrac.fr/app.php/92/asnieres-sur-seine/1351702-brocante-square-silvain',
  },
  {
    nom: 'Nouvelle brocante',
    date: '2026-06-28',
    dateFin: '2026-06-28',
    ville: 'Champigny-sur-Marne',
    dept: '94',
    adresse: 'Centre commercial Leclerc',
    type: 'Brocante',
    recurrente: false,
    source: 'https://brocabrac.fr/app.php/94/champigny-sur-marne/1377680-nouvelle-brocante',
  },
  {
    nom: 'Brocante du Val',
    date: '2026-06-28',
    dateFin: '2026-06-28',
    ville: 'Athis-Mons',
    dept: '91',
    adresse: 'Place Jean Jaurès',
    type: 'Brocante',
    recurrente: false,
    source: 'https://brocabrac.fr/app.php/91/athis-mons/1354886-brocante-du-val',
  },
]

const DEPT_LABELS: Record<string, string> = {
  '75': 'Paris',
  '77': 'Seine-et-Marne',
  '78': 'Yvelines',
  '91': 'Essonne',
  '92': 'Hauts-de-Seine',
  '93': 'Seine-Saint-Denis',
  '94': 'Val-de-Marne',
  '95': 'Val-d\'Oise',
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

function groupByWeekend(brocantes: typeof BROCANTES) {
  const groups: Record<string, typeof BROCANTES> = {}
  brocantes.forEach((b) => {
    const d = new Date(b.date + 'T00:00:00')
    // Trouve le samedi de la semaine
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

export default function UpcomingBrocantes() {
  const today = new Date().toISOString().split('T')[0]
  const upcoming = BROCANTES
    .filter((b) => b.dateFin >= today)
    .sort((a, b) => a.date.localeCompare(b.date))

  const groups = groupByWeekend(upcoming)
  const weekendKeys = Object.keys(groups).sort()

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs font-bold text-[#E8651A] uppercase tracking-widest mb-3">Agenda brocante</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F0F0F] tracking-tight leading-tight">
              Prochaines brocantes<br />
              <span className="text-[#E8651A]">en Île-de-France</span>
            </h2>
            <p className="text-[#6B6B6B] text-sm mt-3">
              Source : <a href="https://brocabrac.fr" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#E8651A]">brocabrac.fr</a> · Uniquement des brocantes professionnelles, pas de vide-greniers
            </p>
          </div>
          <Link href="/brocantes-ile-de-france" className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-[#E8651A] hover:gap-3 transition-all">
            Toutes les brocantes IDF <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Liste par week-end */}
        <div className="space-y-10">
          {weekendKeys.map((satKey) => {
            const brocantes = groups[satKey]
            const satDate = new Date(satKey + 'T00:00:00')
            const sunDate = new Date(satDate)
            sunDate.setDate(satDate.getDate() + 1)

            const labelSat = satDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
            const labelSun = sunDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })

            return (
              <div key={satKey}>
                {/* Label week-end */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-[#E8651A]" />
                    <span className="text-xs font-bold text-[#0F0F0F] uppercase tracking-widest">
                      Week-end du {labelSat} – {labelSun}
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-xs text-[#6B6B6B] flex-shrink-0">{brocantes.length} brocante{brocantes.length > 1 ? 's' : ''}</span>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {brocantes.map((b, i) => (
                    <a
                      key={i}
                      href={b.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-[#F8F7F5] hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-md rounded-2xl p-5 transition-all flex flex-col gap-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${DEPT_COLORS[b.dept] ?? 'bg-gray-100 text-gray-600'}`}>
                            {b.dept} · {DEPT_LABELS[b.dept]}
                          </span>
                          {b.recurrente && (
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-700">
                              Récurrente
                            </span>
                          )}
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#E8651A] flex-shrink-0 mt-0.5 transition-colors" />
                      </div>

                      <div>
                        <h3 className="font-bold text-[#0F0F0F] text-sm leading-snug mb-1">{b.nom}</h3>
                        <p className="text-xs text-[#E8651A] font-semibold mb-2">{b.type}</p>
                        <div className="flex items-start gap-1.5 text-xs text-[#6B6B6B]">
                          <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5" />
                          <span>{b.adresse}, {b.ville}</span>
                        </div>
                      </div>

                      <div className="text-xs text-[#6B6B6B] font-medium pt-1 border-t border-gray-100">
                        📅 {formatDateRange(b.date, b.dateFin)}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[#6B6B6B] max-w-lg mx-auto leading-relaxed">
            Ces informations proviennent de brocabrac.fr. Vérifiez toujours la date et le lieu sur le site officiel avant de vous déplacer.
          </p>
          <a
            href="https://brocabrac.fr/app.php/ile-de-france/brocante/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-[#E8651A] hover:underline"
          >
            Voir plus sur brocabrac.fr <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
