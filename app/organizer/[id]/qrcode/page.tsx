import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import QRCodeGenerator from '@/components/QRCodeGenerator'
import { formatDate } from '@/lib/utils'
import { CheckCircle, CalendarDays, MapPin, Users } from 'lucide-react'
import Link from 'next/link'

interface Props {
  params: Promise<{ id: string }>
}

export default async function QRCodePage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()

  if (!event) notFound()

  const standUrl = `${process.env.NEXT_PUBLIC_APP_URL}/stand/${event.qr_token}`

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#F8F5F0] min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success banner */}
          <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl p-4 mb-8">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
            <div>
              <p className="font-semibold text-green-800">Brocante inscrite avec succès !</p>
              <p className="text-sm text-green-600">Votre QR code est prêt à être distribué aux exposants.</p>
            </div>
          </div>

          {/* Infos événement */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h1 className="text-2xl font-bold text-[#1A1A1A] mb-4">{event.nom}</h1>
            <div className="flex flex-col gap-2 text-[#6B6B6B] text-sm">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-[#E8651A] flex-shrink-0" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E8651A] flex-shrink-0" />
                <span>{event.adresse}, {event.ville} ({event.code_postal})</span>
              </div>
              {event.nb_stands && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#E8651A] flex-shrink-0" />
                  <span>{event.nb_stands} stands prévus</span>
                </div>
              )}
            </div>
          </div>

          {/* QR Code */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-6">
            <h2 className="text-xl font-bold text-center mb-2">Votre QR Code exposant</h2>
            <p className="text-center text-[#6B6B6B] text-sm mb-8">
              Affichez ce QR code lors de votre brocante. Chaque exposant le scanne pour publier son stand.
            </p>
            <QRCodeGenerator
              url={standUrl}
              eventNom={event.nom}
              eventDate={event.date}
              eventAdresse={`${event.adresse}, ${event.ville}`}
              eventId={event.id}
            />
          </div>

          {/* Prochaines étapes */}
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
            <h3 className="font-semibold text-[#E8651A] mb-3">Prochaines étapes</h3>
            <ol className="space-y-2 text-sm text-[#1A1A1A]">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E8651A] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                Téléchargez et imprimez le PDF A4 ci-dessus
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E8651A] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                Affichez le QR code à l'entrée de votre brocante
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E8651A] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                Invitez vos exposants à scanner pour publier leurs stands
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E8651A] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                Les visiteurs pourront rechercher des objets en temps réel
              </li>
            </ol>
          </div>

          <div className="text-center mt-6">
            <Link href="/" className="text-sm text-[#6B6B6B] hover:text-[#E8651A] transition-colors">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
