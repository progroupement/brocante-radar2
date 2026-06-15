import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { CalendarDays, MapPin, Users, QrCode, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  params: Promise<{ id: string }>
}

export default async function OrganizerDashboard({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: event } = await supabase
    .from('events')
    .select('*, organizers(*)')
    .eq('id', id)
    .single()

  if (!event) notFound()

  const { data: stands, count: standsCount } = await supabase
    .from('stands')
    .select('*, keywords(label)', { count: 'exact' })
    .eq('event_id', id)
    .order('created_at', { ascending: false })

  const totalKeywords = stands?.reduce((acc, s) => acc + (s.keywords?.length ?? 0), 0) ?? 0

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#F8F5F0] min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* En-tête */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-[#1A1A1A]">{event.nom}</h1>
              <div className="flex flex-wrap gap-3 mt-2 text-sm text-[#6B6B6B]">
                <span className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4 text-[#E8651A]" />
                  {formatDate(event.date)}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-[#E8651A]" />
                  {event.adresse}, {event.ville}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href={`/organizer/${id}/qrcode`}>
                <Button size="sm" className="gap-2">
                  <QrCode className="w-4 h-4" />
                  Mon QR code
                </Button>
              </Link>
            </div>
          </div>

          {/* Statut */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
            event.statut === 'validé' ? 'bg-green-100 text-green-800' :
            event.statut === 'annulé' ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              event.statut === 'validé' ? 'bg-green-500' :
              event.statut === 'annulé' ? 'bg-red-500' : 'bg-yellow-500'
            }`} />
            {event.statut === 'en_attente' ? 'En attente de validation' :
             event.statut === 'validé' ? 'Événement validé — visible sur la carte' :
             'Événement annulé'}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: Users, label: 'Stands inscrits', value: standsCount ?? 0, max: event.nb_stands },
              { icon: BarChart3, label: 'Mots-clés publiés', value: totalKeywords, max: null },
              { icon: QrCode, label: 'Stands prévus', value: event.nb_stands ?? '—', max: null },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100">
                <stat.icon className="w-5 h-5 text-[#E8651A] mb-2" />
                <div className="text-3xl font-bold text-[#1A1A1A]">{stat.value}</div>
                <div className="text-sm text-[#6B6B6B]">{stat.label}</div>
                {stat.max && (
                  <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-[#E8651A] h-1.5 rounded-full transition-all"
                      style={{ width: `${Math.min(((standsCount ?? 0) / stat.max) * 100, 100)}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Liste des stands */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-lg">Stands inscrits ({standsCount ?? 0})</h2>
            </div>

            {!stands || stands.length === 0 ? (
              <div className="p-8 text-center text-[#6B6B6B]">
                <p className="mb-2">Aucun exposant n&apos;a encore scanné votre QR code.</p>
                <Link href={`/organizer/${id}/qrcode`} className="text-[#E8651A] hover:underline text-sm">
                  Voir et télécharger mon QR code →
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {stands.map((stand) => (
                  <div key={stand.id} className="px-6 py-4 flex items-start gap-4">
                    {stand.photo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={stand.photo_url} alt={`Stand ${stand.numero_stand}`} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-12 h-12 bg-[#F8F5F0] rounded-lg flex items-center justify-center text-xl flex-shrink-0">🛍️</div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-lg">#{stand.numero_stand}</span>
                        {stand.nom_exposant && (
                          <span className="text-sm text-[#6B6B6B]">— {stand.nom_exposant}</span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {(stand.keywords as { label: string }[])?.map((k) => (
                          <span key={k.label} className="bg-orange-100 text-orange-800 rounded-full px-2 py-0.5 text-xs font-medium">
                            {k.label}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 flex-shrink-0">
                      {new Date(stand.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
