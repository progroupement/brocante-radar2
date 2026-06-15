import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CountdownBanner from '@/components/CountdownBanner'
import CounterSection from '@/components/CounterSection'
import MapIDF from '@/components/MapIDF'
import { Button } from '@/components/ui/button'
import { Search, QrCode, MapPin, Star } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* ─── HERO ─────────────────────────────────────────────── */}
        <section className="relative bg-white overflow-hidden">
          {/* Déco background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(232,101,26,0.08)_0%,_transparent_60%)] pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 pt-20 pb-24 sm:pt-28 sm:pb-32 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-50 text-[#E8651A] text-sm font-semibold px-4 py-2 rounded-full mb-8 border border-orange-100">
              <MapPin className="w-4 h-4" />
              Île-de-France — Lancement juillet 2026
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-tight tracking-tight mb-6">
              Trouvez les objets que vous cherchez{' '}
              <span className="text-[#E8651A]">avant même</span>{' '}
              de parcourir la brocante.
            </h1>

            <p className="text-lg sm:text-xl text-[#6B6B6B] max-w-2xl mx-auto mb-10 leading-relaxed">
              Brocante Radar référence les stands et les objets présents dans les brocantes d'Île-de-France.
              Scannez, publiez, trouvez — en temps réel.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/organizer">
                <Button size="lg" className="w-full sm:w-auto gap-2 text-base shadow-lg shadow-orange-200">
                  <QrCode className="w-5 h-5" />
                  Organiser ma brocante
                </Button>
              </Link>
              <Link href="/search">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 text-base">
                  <Search className="w-5 h-5" />
                  Je suis chineur
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── COMMENT ÇA MARCHE ────────────────────────────────── */}
        <section className="py-20 bg-[#F8F5F0]">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Comment ça marche ?</h2>
            <p className="text-center text-[#6B6B6B] mb-12">En 3 étapes, des stands visibles par tous les visiteurs</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                {
                  emoji: '📋',
                  step: '1',
                  title: "L'organisateur s'inscrit",
                  desc: "Il déclare sa brocante et reçoit un QR code unique à afficher sur place.",
                },
                {
                  emoji: '📱',
                  step: '2',
                  title: "Les exposants scannent",
                  desc: "Depuis leur smartphone, ils publient leur stand et listent les objets qu'ils vendent.",
                },
                {
                  emoji: '🔍',
                  step: '3',
                  title: "Les chineurs trouvent",
                  desc: "En quelques secondes, ils localisent le stand exact qui vend l'objet recherché.",
                },
              ].map((item) => (
                <div key={item.step} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                  <div className="text-4xl mb-4">{item.emoji}</div>
                  <div className="inline-block bg-[#E8651A] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── COUNTDOWN BANNER ─────────────────────────────────── */}
        <CountdownBanner />

        {/* ─── CARTE OPENSTREETMAP ──────────────────────────────── */}
        <MapIDF />

        {/* ─── COMPTEURS ────────────────────────────────────────── */}
        <CounterSection />

        {/* ─── CTA FINAL ────────────────────────────────────────── */}
        <section className="py-20 bg-white text-center">
          <div className="max-w-2xl mx-auto px-4">
            <Star className="w-10 h-10 text-[#E8651A] mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Prêt à révolutionner vos brocantes ?</h2>
            <p className="text-[#6B6B6B] mb-8">
              Que vous soyez organisateur, exposant ou chineur — Brocante Radar simplifie l'expérience pour tout le monde.
            </p>
            <Link href="/organizer">
              <Button size="lg" className="shadow-lg shadow-orange-200 text-base">
                Inscrire ma brocante gratuitement →
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
