import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import InscriptionChineurForm from '@/components/InscriptionChineurForm'
import { Search, MapPin, CheckCircle, ArrowRight, Star, Clock, Lightbulb, ShoppingBag } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Je cherche la perle rare — Brocante Radar Île-de-France',
  description: 'Créez votre profil chineur et trouvez l\'objet de vos rêves dans les brocantes d\'Île-de-France. Conseils, astuces et outils pour les vrais chineurs.',
  keywords: ['chercher objet brocante', 'chineur perle rare', 'trouver objet vintage', 'brocante île-de-france', 'chineur profil'],
  openGraph: {
    title: 'Je cherche la perle rare — Brocante Radar',
    description: 'Trouvez l\'objet de vos rêves dans les brocantes d\'Île-de-France.',
    url: 'https://brocanteradar.fr/je-cherche',
  },
}

const conseils = [
  {
    icon: '⏰',
    title: 'Arrivez avant tout le monde',
    desc: "Les meilleures pièces partent dans la première heure. Soyez là 30 minutes avant l'ouverture. Les exposants installent leurs stands dès l'aube.",
    color: 'bg-blue-50 text-blue-700',
  },
  {
    icon: '💶',
    title: 'Emportez du liquide',
    desc: "La majorité des exposants n'acceptent pas la carte bancaire. Billets de 5, 10 et 20€ — indispensables pour négocier sans friction.",
    color: 'bg-green-50 text-green-700',
  },
  {
    icon: '🔦',
    title: 'Le kit du chineur avisé',
    desc: 'Cabas solide, lampe de poche, mètre ruban, gants fins. Et votre smartphone avec Brocante Radar pour repérer les stands avant même d\'arriver.',
    color: 'bg-orange-50 text-orange-700',
  },
  {
    icon: '🤝',
    title: 'Négociez avec le sourire',
    desc: "Un bonjour sincère ouvre plus de portes que toute technique. Proposez 20-30% de moins. \"Je prends les deux, vous me faites un prix ?\" fonctionne toujours.",
    color: 'bg-purple-50 text-purple-700',
  },
  {
    icon: '🔍',
    title: 'Repérez les bonnes affaires',
    desc: 'Linges brodés, livres anciens, Lego complets, vinyles, appareils photo vintage, vaisselle de marque. Ces objets sont souvent sous-estimés.',
    color: 'bg-yellow-50 text-yellow-700',
  },
  {
    icon: '📱',
    title: 'Vérifiez la valeur en temps réel',
    desc: 'Avant d\'acheter, cherchez l\'objet en ligne. Regardez les ventes similaires terminées pour connaître le vrai prix de marché.',
    color: 'bg-teal-50 text-teal-700',
  },
]

const etapes = [
  {
    num: '01',
    title: 'Inscrivez-vous gratuitement',
    desc: 'Créez votre profil chineur en 30 secondes. Aucun abonnement, aucune app à installer.',
    icon: Star,
  },
  {
    num: '02',
    title: 'Recherchez votre objet',
    desc: 'Tapez le nom de l\'objet recherché. Brocante Radar scanne tous les stands des brocantes IDF en temps réel.',
    icon: Search,
  },
  {
    num: '03',
    title: 'Repérez le bon stand',
    desc: 'On vous dit exactement où se trouve l\'objet : quelle brocante, quel stand, quelle adresse.',
    icon: MapPin,
  },
  {
    num: '04',
    title: 'Arrivez en premier',
    desc: 'Consultez les nouveautés le matin même avant de partir. Ne ratez plus jamais la bonne affaire.',
    icon: Clock,
  },
]

export default function JeCherchePerleRarePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* ─── HERO ─── */}
        <section className="relative bg-[#0D1B4B] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-800 rounded-full blur-3xl opacity-30 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#E8651A] rounded-full blur-3xl opacity-10 -translate-x-1/3 translate-y-1/3" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 border border-blue-600 bg-blue-900/50 text-blue-300 text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-wide uppercase">
                  <span className="w-1.5 h-1.5 bg-[#E8651A] rounded-full animate-pulse" />
                  Pour les vrais chineurs
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                  Je cherche{' '}
                  <span className="text-[#E8651A]">la perle rare.</span>
                </h1>
                <p className="text-lg sm:text-xl text-blue-200 mb-10 leading-relaxed">
                  Créez votre profil chineur gratuit. Recherchez n&apos;importe quel objet dans toutes les brocantes d&apos;Île-de-France — et trouvez-le avant tout le monde.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/search"
                    className="inline-flex items-center justify-center gap-2 bg-[#E8651A] hover:bg-[#d4581a] text-white font-semibold px-7 py-4 rounded-2xl text-base transition-colors"
                  >
                    <Search className="w-5 h-5" />
                    Rechercher un objet maintenant
                  </Link>
                  <a
                    href="#creer-compte"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-7 py-4 rounded-2xl text-base transition-colors"
                  >
                    Créer mon profil gratuit
                  </a>
                </div>
                <div className="flex flex-wrap items-center gap-5 text-sm text-blue-300 mt-8">
                  {['✓ 100% gratuit', '✓ Sans app à installer', '✓ Mis à jour chaque semaine'].map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>

              <div className="hidden lg:block relative h-[460px] rounded-3xl overflow-hidden shadow-2xl shadow-black/40">
                <Image
                  src="https://images.unsplash.com/photo-1663366936874-e0cf8ad40d81?auto=format&fit=crop&w=900&q=80"
                  alt="Chineur cherchant la perle rare à la brocante"
                  fill className="object-cover" priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B4B]/60 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 inline-flex items-center gap-3">
                    <Star className="w-4 h-4 text-[#E8651A] flex-shrink-0" />
                    <span className="text-sm font-semibold text-[#0D1B4B]">La chine intelligente</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── COMMENT ÇA MARCHE — bleu clair ─── */}
        <section className="py-24 bg-[#EEF4FF]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <p className="text-xs font-bold text-[#E8651A] uppercase tracking-widest mb-3">Comment ça marche</p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0D1B4B] tracking-tight">
                Trouvez votre objet en 4 étapes
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {etapes.map((e) => (
                <div key={e.num} className="bg-white rounded-2xl p-6 border border-blue-100 hover:shadow-lg hover:shadow-blue-100 transition-shadow">
                  <div className="text-4xl font-black text-blue-100 leading-none mb-4">{e.num}</div>
                  <e.icon className="w-6 h-6 text-[#E8651A] mb-3" />
                  <h3 className="font-bold text-[#0D1B4B] text-base mb-2">{e.title}</h3>
                  <p className="text-[#4A5680] text-sm leading-relaxed">{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CRÉER COMPTE — blanc ─── */}
        <section id="creer-compte" className="py-24 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <p className="text-xs font-bold text-[#E8651A] uppercase tracking-widest mb-3">Gratuit · Sans engagement</p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0D1B4B] tracking-tight mb-4">
                Créez votre profil chineur
              </h2>
              <p className="text-[#4A5680] leading-relaxed">
                Rejoignez la communauté des chineurs connectés. Recevez les nouvelles brocantes chaque semaine, et retrouvez votre historique de recherche.
              </p>
            </div>
            <InscriptionChineurForm />
          </div>
        </section>

        {/* ─── CONSEILS — bleu sombre ─── */}
        <section className="py-24 bg-[#0D1B4B]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <p className="text-xs font-bold text-[#E8651A] uppercase tracking-widest mb-3">Les astuces des pros</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Chinez comme un expert
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {conseils.map((c) => (
                <div key={c.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-xl mb-4 ${c.color}`}>
                    {c.icon}
                  </div>
                  <h3 className="font-bold text-white mb-2">{c.title}</h3>
                  <p className="text-blue-200 text-sm leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-14">
              <Link href="/guide-chineur" className="inline-flex items-center gap-2 text-[#E8651A] font-semibold hover:gap-3 transition-all text-base">
                Lire le guide complet du chineur <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── PHOTO — pleine largeur ─── */}
        <section className="relative h-80 sm:h-96">
          <Image
            src="https://images.unsplash.com/photo-1488841714725-bb4c32d1ac94?auto=format&fit=crop&w=1600&q=80"
            alt="Objets vintage et vinyles à la brocante"
            fill className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B4B]/80 via-[#0D1B4B]/50 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight max-w-lg">
                Des milliers d&apos;objets<br />vous attendent.
              </h2>
              <Link href="/search" className="mt-6 inline-flex items-center gap-2 bg-[#E8651A] text-white font-semibold px-6 py-3 rounded-2xl text-sm hover:bg-[#d4581a] transition-colors">
                <Search className="w-4 h-4" />
                Rechercher maintenant
              </Link>
            </div>
          </div>
        </section>

        {/* ─── CHECKLIST — bleu clair ─── */}
        <section className="py-24 bg-[#EEF4FF]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <p className="text-xs font-bold text-[#E8651A] uppercase tracking-widest mb-3">Avant de partir</p>
              <h2 className="text-3xl font-black text-[#0D1B4B] tracking-tight">
                La checklist du parfait chineur
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  title: 'Dans le sac',
                  icon: ShoppingBag,
                  items: ['Espèces — billets et pièces', 'Cabas ou tote bag solide', 'Lampe de poche', 'Mètre ruban', 'Gants fins', 'Eau et en-cas'],
                },
                {
                  title: 'Avant de partir',
                  icon: Lightbulb,
                  items: ['Consulter Brocante Radar', 'Liste de vos objets recherchés', 'Horaires vérifiés', 'Stationnement planifié', 'Budget maximum défini'],
                },
                {
                  title: 'Sur place',
                  icon: MapPin,
                  items: ['Tour rapide complet d\'abord', 'Repérer les stands intéressants', 'Revenir négocier', 'Photographier avant d\'acheter', '20% du budget gardé en fin de journée'],
                },
              ].map((cat) => (
                <div key={cat.title} className="bg-white rounded-2xl p-6 border border-blue-100">
                  <div className="flex items-center gap-3 mb-5">
                    <cat.icon className="w-5 h-5 text-[#E8651A]" />
                    <h3 className="font-bold text-[#0D1B4B]">{cat.title}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#4A5680]">
                        <CheckCircle className="w-4 h-4 text-[#E8651A] flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA FINAL — bleu sombre ─── */}
        <section className="py-24 bg-[#0D1B4B]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="w-14 h-14 bg-[#E8651A] rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Search className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Votre perle rare vous attend.
            </h2>
            <p className="text-blue-300 mb-10 text-lg leading-relaxed">
              Ne ratez plus jamais la bonne affaire. Brocante Radar, le GPS des chineurs d&apos;Île-de-France.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/search" className="inline-flex items-center justify-center gap-2 bg-[#E8651A] hover:bg-[#d4581a] text-white font-semibold px-8 py-4 rounded-2xl text-base transition-colors">
                Rechercher un objet <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/brocantes-ile-de-france" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-2xl text-base transition-colors">
                Voir les brocantes IDF
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
