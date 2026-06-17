'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { QrCode, Search, MapPin, ArrowRight, CheckCircle, Smartphone, Camera, Tag } from 'lucide-react'

const etapes = [
  {
    num: '01',
    icon: QrCode,
    title: 'Scannez le QR code',
    desc: "À votre arrivée à la brocante, scannez le QR code affiché à l'entrée. Il est unique à chaque brocante.",
  },
  {
    num: '02',
    icon: Camera,
    title: 'Photographiez vos objets',
    desc: "Prenez en photo vos plus belles pièces. Les chineurs voient vos objets avant même d'arriver à votre stand.",
  },
  {
    num: '03',
    icon: Tag,
    title: 'Ajoutez des mots-clés',
    desc: 'Décrivez vos objets avec des mots simples : "vinyles", "Lego", "argenterie"... Les chineurs vous trouvent.',
  },
  {
    num: '04',
    icon: Search,
    title: 'Les chineurs arrivent',
    desc: "Brocante Radar indique aux chineurs votre numéro de stand. Plus besoin d'attendre qu'ils passent devant vous.",
  },
]

export default function ExposantPage() {
  const router = useRouter()
  const [token, setToken] = useState('')

  function handleToken(e: React.FormEvent) {
    e.preventDefault()
    const t = token.trim()
    if (t) router.push(`/stand/${t}`)
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* ─── HERO ─── */}
        <section className="relative bg-[#0D1B4B] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-800 rounded-full blur-3xl opacity-30 translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 border border-blue-600 bg-blue-900/50 text-blue-300 text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-wide uppercase">
                  <span className="w-1.5 h-1.5 bg-[#E8651A] rounded-full" />
                  Pour les exposants
                </div>
                <h1 className="text-4xl sm:text-5xl font-black text-white leading-[1.05] tracking-tight mb-6">
                  Publiez votre stand.<br />
                  <span className="text-[#E8651A]">Les chineurs viennent à vous.</span>
                </h1>
                <p className="text-lg text-blue-200 mb-10 leading-relaxed">
                  Listez vos objets avec photos depuis votre téléphone. Les chineurs voient votre stand avant même d&apos;arriver à la brocante.
                </p>
                <div className="flex flex-wrap items-center gap-5 text-sm text-blue-300">
                  {['✓ 100% gratuit', '✓ 2 minutes pour publier', '✓ Aucune app à installer'].map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>

              <div className="hidden lg:block relative h-[420px] rounded-3xl overflow-hidden shadow-2xl shadow-black/40">
                <Image
                  src="https://images.unsplash.com/photo-1670092485050-2022fbd6e88e?auto=format&fit=crop&w=900&q=80"
                  alt="Exposant à son stand de brocante"
                  fill className="object-cover" priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B4B]/60 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* ─── ACCÈS RAPIDE TOKEN — bleu clair ─── */}
        <section className="py-16 bg-[#EEF4FF]">
          <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
            <div className="w-14 h-14 bg-[#0D1B4B] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <QrCode className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-black text-[#0D1B4B] mb-3">Vous avez un code d&apos;accès ?</h2>
            <p className="text-[#4A5680] text-sm mb-8">
              Si l&apos;organisateur de votre brocante vous a donné un code ou un lien, entrez-le ici pour accéder à votre espace stand.
            </p>
            <form onSubmit={handleToken} className="flex gap-3">
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Entrez votre code d'accès"
                className="flex-1 border border-blue-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#E8651A] bg-white"
              />
              <button
                type="submit"
                disabled={!token.trim()}
                className="bg-[#E8651A] hover:bg-[#d4581a] disabled:opacity-40 text-white font-semibold px-5 py-3 rounded-xl transition-colors flex items-center gap-2"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
            <p className="text-xs text-[#4A5680] mt-4">
              Pas de code ? L&apos;organisateur de la brocante doit en faire la demande.{' '}
              <Link href="/contact-organisateur" className="text-[#E8651A] hover:underline">En savoir plus</Link>
            </p>
          </div>
        </section>

        {/* ─── COMMENT ÇA MARCHE — blanc ─── */}
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <p className="text-xs font-bold text-[#E8651A] uppercase tracking-widest mb-3">Simple et rapide</p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0D1B4B] tracking-tight">
                Publiez votre stand en 4 étapes
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {etapes.map((e) => (
                <div key={e.num} className="bg-[#EEF4FF] rounded-2xl p-6 border border-blue-100">
                  <div className="text-4xl font-black text-blue-200 leading-none mb-4">{e.num}</div>
                  <e.icon className="w-6 h-6 text-[#E8651A] mb-3" />
                  <h3 className="font-bold text-[#0D1B4B] text-base mb-2">{e.title}</h3>
                  <p className="text-[#4A5680] text-sm leading-relaxed">{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── AVANTAGES — bleu sombre ─── */}
        <section className="py-24 bg-[#0D1B4B]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <p className="text-xs font-bold text-[#E8651A] uppercase tracking-widest mb-3">Pourquoi l&apos;utiliser</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Vendez plus, sans effort supplémentaire
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { icon: Smartphone, title: 'Depuis votre téléphone', desc: "Aucune app à télécharger. Tout se fait depuis le navigateur de votre téléphone en 2 minutes." },
                { icon: MapPin, title: 'Votre stand sur la carte', desc: "Les chineurs voient votre stand sur la carte de la brocante. Ils savent exactement où vous trouver." },
                { icon: Search, title: 'Trouvé par les bons acheteurs', desc: "Un chineur cherche \"vinyles\" ? Il tombe sur votre stand directement, même avant d'entrer dans la brocante." },
                { icon: CheckCircle, title: 'Entièrement gratuit', desc: "Brocante Radar est 100% gratuit pour les exposants. Pas d'abonnement, pas de commission sur vos ventes." },
              ].map((item) => (
                <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-4">
                  <item.icon className="w-6 h-6 text-[#E8651A] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-blue-200 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ORGANISATEUR — bleu clair ─── */}
        <section className="py-20 bg-[#EEF4FF]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl font-black text-[#0D1B4B] mb-4">Vous organisez la brocante ?</h2>
            <p className="text-[#4A5680] mb-8 leading-relaxed">
              Contactez-nous pour obtenir votre QR code. Vos exposants pourront publier leurs stands en le scannant à leur arrivée.
            </p>
            <Link
              href="/contact-organisateur"
              className="inline-flex items-center gap-2 bg-[#0D1B4B] hover:bg-[#162254] text-white font-semibold px-7 py-4 rounded-2xl text-base transition-colors"
            >
              Demander un QR code organisateur
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
