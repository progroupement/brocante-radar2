import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CountdownBanner from '@/components/CountdownBanner'
import CounterSection from '@/components/CounterSection'
import MapIDF from '@/components/MapIDF'
import { Search, QrCode, MapPin, ArrowRight, CheckCircle } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* ─── HERO ─────────────────────────────────────────────────── */}
        <section className="relative bg-white overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-50 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-50 rounded-full blur-3xl opacity-40 -translate-x-1/3 translate-y-1/3" />
          </div>

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-28 sm:pt-32 sm:pb-36">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-orange-200 bg-orange-50 text-[#E8651A] text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-wide uppercase">
              <span className="w-1.5 h-1.5 bg-[#E8651A] rounded-full animate-pulse" />
              Île-de-France · Lancement juillet 2026
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-[#0F0F0F] leading-[1.05] tracking-tight mb-8 max-w-4xl">
              Trouvez l&apos;objet{' '}
              <span className="text-[#E8651A]">avant</span>{' '}
              d&apos;arpenter la brocante.
            </h1>

            <p className="text-lg sm:text-xl text-[#6B6B6B] max-w-xl mb-10 leading-relaxed">
              Brocante Radar connecte organisateurs, exposants et chineurs en temps réel. Fini de tourner en rond !
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-14">
              <Link href="/search" className="inline-flex items-center justify-center gap-2 bg-[#0F0F0F] hover:bg-[#2a2a2a] text-white font-semibold px-7 py-4 rounded-2xl text-base transition-colors">
                <Search className="w-5 h-5" />
                Rechercher un objet
              </Link>
              <Link href="/organizer" className="inline-flex items-center justify-center gap-2 bg-[#E8651A] hover:bg-[#d4581a] text-white font-semibold px-7 py-4 rounded-2xl text-base transition-colors">
                <QrCode className="w-5 h-5" />
                Organiser ma brocante
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-[#6B6B6B]">
              {[
                '✓ Gratuit pour les organisateurs',
                '✓ QR code en 2 minutes',
                '✓ Aucune app à installer',
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5">{item}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── COMMENT ÇA MARCHE ─────────────────────────────────────── */}
        <section className="py-24 bg-[#F8F7F5]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <p className="text-xs font-bold text-[#E8651A] uppercase tracking-widest mb-3">Comment ça marche</p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0F0F0F] tracking-tight">3 rôles, 1 plateforme</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  number: '01',
                  icon: '📋',
                  color: 'bg-blue-50',
                  iconColor: 'text-blue-600',
                  title: "L'organisateur inscrit sa brocante",
                  desc: "Il reçoit un QR code unique à afficher à l'entrée. Gratuit, en 2 minutes.",
                  cta: 'Je suis organisateur',
                  href: '/organizer',
                },
                {
                  number: '02',
                  icon: '📱',
                  color: 'bg-orange-50',
                  iconColor: 'text-[#E8651A]',
                  title: "L'exposant publie son stand",
                  desc: "Il scanne le QR code et liste ses objets avec photos depuis son téléphone.",
                  cta: null,
                  href: null,
                },
                {
                  number: '03',
                  icon: '🔍',
                  color: 'bg-green-50',
                  iconColor: 'text-green-600',
                  title: "Le chineur trouve en secondes",
                  desc: "Il recherche un objet et localise précisément le stand qui le vend.",
                  cta: 'Je suis chineur',
                  href: '/search',
                },
              ].map((item) => (
                <div key={item.number} className="bg-white rounded-3xl p-8 border border-gray-100 flex flex-col gap-5 hover:shadow-lg hover:shadow-gray-100 transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center text-2xl`}>
                      {item.icon}
                    </div>
                    <span className="text-5xl font-black text-gray-100 leading-none">{item.number}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F0F0F] text-lg mb-2 leading-snug">{item.title}</h3>
                    <p className="text-[#6B6B6B] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  {item.cta && item.href && (
                    <Link href={item.href} className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[#E8651A] hover:gap-2 transition-all">
                      {item.cta} <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── AVANTAGES ─────────────────────────────────────────────── */}
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs font-bold text-[#E8651A] uppercase tracking-widest mb-3">Pourquoi Brocante Radar</p>
                <h2 className="text-3xl sm:text-4xl font-black text-[#0F0F0F] tracking-tight mb-8 leading-tight">
                  La brocante intelligente est enfin là.
                </h2>
                <div className="space-y-5">
                  {[
                    { title: 'Recherche en temps réel', desc: "Les stands sont visibles dès que l'exposant publie." },
                    { title: 'Géolocalisation du stand', desc: 'Trouvez le bon stand instantanément sur place.' },
                    { title: 'QR code imprimable', desc: "PDF A4 professionnel prêt à afficher à l'entrée." },
                    { title: '100% gratuit pour les organisateurs', desc: 'Aucun abonnement, aucun frais cachés.' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <CheckCircle className="w-5 h-5 text-[#E8651A] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-[#0F0F0F] text-sm">{item.title}</p>
                        <p className="text-[#6B6B6B] text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual card */}
              <div className="bg-[#F8F7F5] rounded-3xl p-8 border border-gray-100">
                <div className="space-y-4">
                  {[
                    { label: 'Brocante de Vincennes', date: '22 juin 2026', stands: 84, status: 'En cours' },
                    { label: 'Marché aux puces de Montreuil', date: '29 juin 2026', stands: 120, status: 'À venir' },
                    { label: 'Vide-grenier de Versailles', date: '6 juil. 2026', stands: 56, status: 'À venir' },
                  ].map((evt) => (
                    <div key={evt.label} className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-sm text-[#0F0F0F]">{evt.label}</p>
                        <p className="text-xs text-[#6B6B6B] mt-0.5">{evt.date} · {evt.stands} stands</p>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 ${
                        evt.status === 'En cours' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {evt.status}
                      </span>
                    </div>
                  ))}
                  <div className="text-center pt-2">
                    <Link href="/brocantes-ile-de-france" className="text-xs text-[#E8651A] font-semibold hover:underline">
                      Voir toutes les brocantes →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── COUNTDOWN ─────────────────────────────────────────────── */}
        <CountdownBanner />

        {/* ─── CARTE ─────────────────────────────────────────────────── */}
        <section className="bg-[#F8F7F5] py-6 pb-0">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <p className="text-xs font-bold text-[#E8651A] uppercase tracking-widest mb-3">Carte interactive</p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0F0F0F] tracking-tight">
                Brocantes en Île-de-France
              </h2>
            </div>
          </div>
          <MapIDF />
        </section>

        {/* ─── COMPTEURS ─────────────────────────────────────────────── */}
        <CounterSection />

        {/* ─── DEPARTEMENTS ──────────────────────────────────────────── */}
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <p className="text-xs font-bold text-[#E8651A] uppercase tracking-widest mb-3">Par département</p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0F0F0F] tracking-tight">
                Trouvez une brocante près de chez vous
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { nom: 'Paris', slug: 'brocante-paris', code: '75', emoji: '🗼' },
                { nom: 'Hauts-de-Seine', slug: 'brocante-hauts-de-seine', code: '92', emoji: '🏙️' },
                { nom: 'Seine-Saint-Denis', slug: 'brocante-seine-saint-denis', code: '93', emoji: '🏗️' },
                { nom: 'Val-de-Marne', slug: 'brocante-val-de-marne', code: '94', emoji: '🌳' },
                { nom: 'Essonne', slug: 'brocante-essonne', code: '91', emoji: '🌾' },
                { nom: 'Yvelines', slug: 'brocante-yvelines', code: '78', emoji: '🏰' },
                { nom: 'Val-d\'Oise', slug: 'brocante-val-d-oise', code: '95', emoji: '🌿' },
                { nom: 'Seine-et-Marne', slug: 'brocante-seine-et-marne', code: '77', emoji: '🌻' },
              ].map((dept) => (
                <Link
                  key={dept.code}
                  href={`/${dept.slug}`}
                  className="group bg-[#F8F7F5] hover:bg-[#E8651A] rounded-2xl p-5 border border-gray-100 hover:border-[#E8651A] transition-all text-center"
                >
                  <div className="text-2xl mb-2">{dept.emoji}</div>
                  <p className="text-xs text-[#6B6B6B] group-hover:text-orange-100 mb-1 transition-colors">{dept.code}</p>
                  <p className="font-bold text-sm text-[#0F0F0F] group-hover:text-white transition-colors">{dept.nom}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA FINAL ─────────────────────────────────────────────── */}
        <section className="py-24 bg-[#0F0F0F]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="w-14 h-14 bg-[#E8651A] rounded-2xl flex items-center justify-center mx-auto mb-8">
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Prêt pour votre prochaine brocante ?
            </h2>
            <p className="text-gray-400 mb-10 text-lg leading-relaxed">
              Organisateur ou chineur, Brocante Radar rend l&apos;expérience brocante plus intelligente pour tout le monde.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/organizer" className="inline-flex items-center justify-center gap-2 bg-[#E8651A] hover:bg-[#d4581a] text-white font-semibold px-8 py-4 rounded-2xl text-base transition-colors">
                Inscrire ma brocante gratuitement
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/guide-chineur" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-2xl text-base transition-colors">
                Lire le guide du chineur
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
