import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CountdownBanner from '@/components/CountdownBanner'
import CounterSection from '@/components/CounterSection'
import MapIDF from '@/components/MapIDF'
import UpcomingBrocantes from '@/components/UpcomingBrocantes'
import { Search, MapPin, ArrowRight, CheckCircle, Phone } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* ─── HERO — bleu sombre ────────────────────────────────────── */}
        <section className="relative bg-[#0D1B4B] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-800 rounded-full blur-3xl opacity-30 translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E8651A] rounded-full blur-3xl opacity-10 -translate-x-1/3 translate-y-1/3" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 border border-blue-600 bg-blue-900/50 text-blue-300 text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-wide uppercase">
                  <span className="w-1.5 h-1.5 bg-[#E8651A] rounded-full animate-pulse" />
                  Île-de-France · Lancement juillet 2026
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-8">
                  Trouvez la{' '}
                  <span className="text-[#E8651A]">perle rare</span>{' '}
                  avant tout le monde.
                </h1>

                <p className="text-lg sm:text-xl text-blue-200 mb-10 leading-relaxed">
                  Brocante Radar, c&apos;est le GPS des chineurs. Recherchez un objet, repérez les stands, ne ratez plus jamais la bonne affaire en Île-de-France.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-10">
                  <Link href="/search" className="inline-flex items-center justify-center gap-2 bg-[#E8651A] hover:bg-[#d4581a] text-white font-semibold px-7 py-4 rounded-2xl text-base transition-colors">
                    <Search className="w-5 h-5" />
                    Chercher un objet
                  </Link>
                  <Link href="/brocantes-ile-de-france" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-7 py-4 rounded-2xl text-base transition-colors">
                    <MapPin className="w-5 h-5" />
                    Voir les brocantes IDF
                  </Link>
                </div>

                <div className="flex flex-wrap items-center gap-5 text-sm text-blue-300">
                  {['✓ 100% gratuit', '✓ Mis à jour chaque semaine', '✓ Aucune app à installer'].map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>

              <div className="hidden lg:block relative h-[460px] rounded-3xl overflow-hidden shadow-2xl shadow-black/40">
                <Image
                  src="https://images.unsplash.com/photo-1685883518161-63ccb05aef83?auto=format&fit=crop&w=900&q=80"
                  alt="Chineurs à la brocante"
                  fill className="object-cover" priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B4B]/60 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 inline-flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#E8651A] flex-shrink-0" />
                    <span className="text-sm font-semibold text-[#0D1B4B]">Brocantes en Île-de-France</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── POUR QUI — bleu clair ─────────────────────────────────── */}
        <section className="py-24 bg-[#EEF4FF]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <p className="text-xs font-bold text-[#E8651A] uppercase tracking-widest mb-3">Comment ça marche</p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0D1B4B] tracking-tight">Fait pour les vrais chineurs</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl overflow-hidden border border-blue-100 flex flex-col hover:shadow-lg hover:shadow-blue-100 transition-shadow">
                <div className="relative h-52 w-full">
                  <Image src="https://images.unsplash.com/photo-1663366936874-e0cf8ad40d81?auto=format&fit=crop&w=800&q=80" alt="Chineur fouillant à la brocante" fill className="object-cover" />
                </div>
                <div className="p-8 flex flex-col gap-4 flex-1">
                  <span className="text-5xl font-black text-blue-100 leading-none">01</span>
                  <div>
                    <h3 className="font-bold text-[#0D1B4B] text-lg mb-2">Tu cherches un objet ?</h3>
                    <p className="text-[#4A5680] text-sm leading-relaxed">Tape le nom de l&apos;objet que tu recherches. On localise le stand qui le vend, en temps réel, sur la brocante.</p>
                  </div>
                  <Link href="/search" className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[#E8651A] hover:gap-2 transition-all">
                    Rechercher un objet <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-3xl overflow-hidden border border-blue-100 flex flex-col hover:shadow-lg hover:shadow-blue-100 transition-shadow">
                <div className="relative h-52 w-full">
                  <Image src="https://images.unsplash.com/photo-1670092485050-2022fbd6e88e?auto=format&fit=crop&w=800&q=80" alt="Exposant à son stand de brocante" fill className="object-cover" />
                </div>
                <div className="p-8 flex flex-col gap-4 flex-1">
                  <span className="text-5xl font-black text-blue-100 leading-none">02</span>
                  <div>
                    <h3 className="font-bold text-[#0D1B4B] text-lg mb-2">Tu vends à la brocante ?</h3>
                    <p className="text-[#4A5680] text-sm leading-relaxed">Publie les objets de ton stand avec photos. Les chineurs te trouvent directement — plus besoin d&apos;attendre qu&apos;ils passent devant toi.</p>
                  </div>
                  <Link href="/exposant" className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[#E8651A] hover:gap-2 transition-all">
                    Publier mon stand <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── AVANTAGES — blanc ─────────────────────────────────────── */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs font-bold text-[#E8651A] uppercase tracking-widest mb-3">Pourquoi Brocante Radar</p>
                <h2 className="text-3xl sm:text-4xl font-black text-[#0D1B4B] tracking-tight mb-8 leading-tight">
                  La chine intelligente est enfin là.
                </h2>
                <div className="space-y-5">
                  {[
                    { title: 'Recherche en temps réel', desc: "Les stands sont visibles dès que l'exposant publie ses objets." },
                    { title: 'Géolocalisation du stand', desc: 'Trouvez le bon stand instantanément sur place. Fini de tourner en rond !' },
                    { title: 'Agenda complet IDF', desc: "Toutes les brocantes d'Île-de-France, mises à jour chaque semaine." },
                    { title: '100% gratuit pour les chineurs', desc: 'Aucun abonnement, aucun frais cachés.' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <CheckCircle className="w-5 h-5 text-[#E8651A] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-[#0D1B4B] text-sm">{item.title}</p>
                        <p className="text-[#4A5680] text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1488841714725-bb4c32d1ac94?auto=format&fit=crop&w=800&q=80"
                  alt="Vinyles et objets vintage à la brocante"
                  fill className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B4B]/50 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="bg-[#E8651A] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">Brocantes IDF</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── PROCHAINES BROCANTES — bleu clair ────────────────────── */}
        <UpcomingBrocantes />

        {/* ─── PHOTO MARCHÉ — pleine largeur ─────────────────────────── */}
        <section className="py-0">
          <div className="relative h-[400px] sm:h-[500px] w-full">
            <Image
              src="https://images.unsplash.com/photo-1516382461343-35e1ba016e01?auto=format&fit=crop&w=1600&q=80"
              alt="Ambiance brocante"
              fill className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B4B]/80 via-[#0D1B4B]/50 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
                <p className="text-xs font-bold text-orange-300 uppercase tracking-widest mb-3">L&apos;ambiance brocante</p>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-xl">
                  Des centaines de stands,<br />un seul radar.
                </h2>
                <Link href="/brocantes-ile-de-france" className="mt-8 inline-flex items-center gap-2 bg-white text-[#0D1B4B] font-semibold px-6 py-3 rounded-2xl text-sm hover:bg-orange-50 transition-colors">
                  Voir les brocantes <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── COUNTDOWN ─────────────────────────────────────────────── */}
        <CountdownBanner />

        {/* ─── CARTE — blanc ─────────────────────────────────────────── */}
        <MapIDF />

        {/* ─── COMPTEURS — bleu sombre ───────────────────────────────── */}
        <CounterSection />

        {/* ─── DEPARTEMENTS — bleu clair ─────────────────────────────── */}
        <section className="py-24 bg-[#EEF4FF]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <p className="text-xs font-bold text-[#E8651A] uppercase tracking-widest mb-3">Par département</p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0D1B4B] tracking-tight">
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
                { nom: "Val-d'Oise", slug: 'brocante-val-d-oise', code: '95', emoji: '🌿' },
                { nom: 'Seine-et-Marne', slug: 'brocante-seine-et-marne', code: '77', emoji: '🌻' },
              ].map((dept) => (
                <Link key={dept.code} href={`/${dept.slug}`}
                  className="group bg-white hover:bg-[#0D1B4B] rounded-2xl p-5 border border-blue-100 hover:border-[#0D1B4B] transition-all text-center">
                  <div className="text-2xl mb-2">{dept.emoji}</div>
                  <p className="text-xs text-[#4A5680] group-hover:text-blue-300 mb-1 transition-colors">{dept.code}</p>
                  <p className="font-bold text-sm text-[#0D1B4B] group-hover:text-white transition-colors">{dept.nom}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── BLOC ORGANISATEUR — blanc ─────────────────────────────── */}
        <section className="py-16 bg-white border-t border-blue-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="w-12 h-12 bg-[#0D1B4B] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-black text-[#0D1B4B] mb-3">Vous organisez une brocante ?</h2>
            <p className="text-[#4A5680] text-sm leading-relaxed mb-6">
              Contactez-nous et nous créons votre QR code personnalisé. Vos exposants pourront publier leurs stands, vos visiteurs trouveront tout en un scan.
            </p>
            <Link href="/contact-organisateur"
              className="inline-flex items-center gap-2 bg-[#0D1B4B] hover:bg-[#162254] text-white font-semibold px-6 py-3 rounded-2xl text-sm transition-colors">
              Demander mon QR code <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ─── CTA FINAL — bleu sombre ───────────────────────────────── */}
        <section className="py-24 bg-[#0D1B4B]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="w-14 h-14 bg-[#E8651A] rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Search className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Prêt pour votre prochaine chine ?
            </h2>
            <p className="text-blue-300 mb-10 text-lg leading-relaxed">
              Toutes les brocantes d&apos;Île-de-France, les stands en temps réel, les objets recherchables. Brocante Radar, le GPS des chineurs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/search" className="inline-flex items-center justify-center gap-2 bg-[#E8651A] hover:bg-[#d4581a] text-white font-semibold px-8 py-4 rounded-2xl text-base transition-colors">
                Rechercher un objet <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/guide-chineur" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-2xl text-base transition-colors">
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
