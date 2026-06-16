import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ArrowRight, Search, MapPin, Clock, Star, ShoppingBag, Lightbulb, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Guide du Chineur — Conseils pour réussir vos brocantes en Île-de-France',
  description: 'Découvrez tous nos conseils pour chineur comme un pro : quoi apporter, comment négocier, les meilleures brocantes IDF, et comment utiliser Brocante Radar pour trouver vos objets.',
  keywords: ['guide chineur', 'conseils brocante', 'astuces vide-grenier', 'brocante île-de-france', 'comment négocier brocante', 'trouver objets brocante'],
  openGraph: {
    title: 'Guide du Chineur — Brocante Radar',
    description: 'Tous les conseils pour chineur comme un pro en Île-de-France.',
    url: 'https://brocanteradar.fr/guide-chineur',
  },
}

const sections = [
  {
    id: 'preparer',
    icon: '🎒',
    title: 'Bien préparer sa sortie brocante',
    color: 'bg-blue-50 text-blue-700',
    tips: [
      {
        title: 'Arrivez tôt — très tôt',
        content: "Les meilleures pièces partent dans la première heure. Idéalement, soyez sur place 30 minutes avant l'ouverture officielle. Les exposants installent leurs stands dès l'aube et certains vendeurs acceptent de négocier avant même le début officiel."
      },
      {
        title: 'Apportez du liquide',
        content: "La grande majorité des exposants de brocante n'acceptent pas la carte bancaire. Prévoyez des billets de 5, 10 et 20 euros pour faciliter les négociations et ne pas être bloqué pour un petit achat."
      },
      {
        title: 'Le kit indispensable du chineur',
        content: "Cabas ou tote bag solide, lampe de poche (pour inspecter dessous les meubles), mètre ruban, gants fins, votre liste d'objets recherchés, et bien sûr votre smartphone avec Brocante Radar !"
      },
      {
        title: 'Consultez Brocante Radar avant de partir',
        content: "Avec Brocante Radar, vous pouvez rechercher les objets disponibles dans les brocantes du week-end avant même de sortir de chez vous. Gagnez un temps précieux en ciblant les stands qui vendent ce que vous cherchez."
      },
    ]
  },
  {
    id: 'negocier',
    icon: '🤝',
    title: 'L\'art de la négociation',
    color: 'bg-orange-50 text-orange-700',
    tips: [
      {
        title: 'Soyez respectueux et souriant',
        content: "La négociation en brocante est un art social avant tout. Un bonjour chaleureux et un sourire sincère vous ouvriront plus de portes que toute technique de négociation. Les exposants sont souvent passionnés par leurs objets — montrez de l'intérêt."
      },
      {
        title: 'La règle des 30%',
        content: "En général, vous pouvez proposer 20 à 30% de moins que le prix affiché. Sur un objet à 50€, proposez 35€. Sur un objet à 10€, proposez 7€. Ne commencez jamais trop bas — cela vexe le vendeur et ferme la négociation."
      },
      {
        title: 'Achetez plusieurs objets ensemble',
        content: "\"Je prends les deux, vous me faites un prix ?\" — c'est la phrase magique. Les exposants préfèrent souvent vendre plusieurs objets d'un coup plutôt que de remballer. Regroupez vos achats chez un même vendeur pour obtenir un meilleur tarif global."
      },
      {
        title: 'Sachez quand laisser tomber',
        content: "Si le vendeur ne bouge pas sur son prix et que vous pensez que l'objet ne vaut pas ce prix, tournez les talons poliment. Revenez en fin de journée — beaucoup d'exposants préfèrent vendre moins cher que de remballer."
      },
    ]
  },
  {
    id: 'identifier',
    icon: '🔍',
    title: 'Identifier les bonnes affaires',
    color: 'bg-green-50 text-green-700',
    tips: [
      {
        title: 'Apprenez à reconnaître le vrai du faux',
        content: "Pour les meubles : retournez-les, vérifiez les assemblages. Pour la porcelaine : tapotez doucement, un son clair indique l'absence de fêlures. Pour les objets en argent : cherchez les poinçons. Pour les vêtements vintage : inspectez coutures et étiquettes."
      },
      {
        title: 'Recherchez sur Internet en temps réel',
        content: "N'hésitez pas à sortir votre téléphone pour vérifier la valeur d'un objet sur eBay ou LeBonCoin. Cherchez les ventes similaires terminées pour avoir une idée du prix de marché réel."
      },
      {
        title: 'Les objets souvent sous-estimés',
        content: "Linges anciens et nappes brodées, livres anciens et illustrés, appareils photo vintage, jouets des années 70-80 (Lego, Playmobil), vaisselle dépareillée de marque, outils anciens, flacons de parfum vides."
      },
      {
        title: 'Méfiez-vous des reproductions',
        content: "Le marché de l'antiquité regorge de reproductions présentées comme authentiques. Pour les pièces importantes, demandez toujours une attestation ou prenez le temps de vous renseigner avant d'acheter."
      },
    ]
  },
  {
    id: 'brocantes-idf',
    icon: '🗺️',
    title: 'Les meilleures brocantes d\'Île-de-France',
    color: 'bg-purple-50 text-purple-700',
    tips: [
      {
        title: 'Marché aux Puces de Saint-Ouen (93)',
        content: "Le plus grand marché aux puces du monde avec plus de 2 000 marchands. Incontournable mais prévoir budget et temps. Le samedi et dimanche sont les meilleurs jours. Marché Vernaison pour les petits objets, Marché Paul-Bert pour le mobilier haut de gamme."
      },
      {
        title: 'Vide-greniers de quartier parisien',
        content: "Chaque arrondissement organise ses vide-greniers le week-end. Plus accessibles que Saint-Ouen, avec de vraies trouvailles à prix doux. Les arrondissements populaires (11e, 18e, 20e) offrent souvent les meilleures affaires."
      },
      {
        title: 'Brocantes de banlieue — les pépites',
        content: "Les brocantes en grande banlieue (Essonne, Seine-et-Marne, Yvelines) sont souvent moins fréquentées et offrent de meilleures opportunités de négociation. Moins de concurrence, des vendeurs plus détendus, et parfois des trésors cachés."
      },
      {
        title: 'Calendrier des grandes brocantes IDF',
        content: "Les grandes brocantes ont lieu de mars à octobre. Le printemps (avril-mai) et la rentrée (septembre) sont les meilleures saisons. En hiver, les marchés sont plus rares mais les vendeurs sont souvent plus enclins à négocier."
      },
    ]
  },
]

const faqs = [
  {
    q: 'Quelle est la différence entre une brocante et un vide-grenier ?',
    a: "Un vide-grenier est réservé aux particuliers qui vident leurs affaires personnelles — pas de professionnels autorisés. Une brocante mélange particuliers et professionnels (antiquaires, brocanteurs). Le vide-grenier offre souvent de meilleures affaires car les vendeurs ne connaissent pas toujours la valeur de leurs objets."
  },
  {
    q: 'À quelle heure arriver pour avoir les meilleures affaires ?',
    a: "Idéalement dès l'ouverture, voire 15-30 minutes avant. Les \"pros\" (revendeurs) arrivent très tôt pour sécuriser les bonnes pièces. Si vous ne pouvez pas arriver tôt, venez en fin de journée (1h avant la fermeture) : les vendeurs préfèrent vendre moins cher que remballer."
  },
  {
    q: 'Comment utiliser Brocante Radar pour trouver des objets ?',
    a: "Rendez-vous sur brocanteradar.fr/search, tapez le nom de l'objet que vous cherchez (ex: \"Lego\", \"Playmobil\", \"vinyles\"), et Brocante Radar vous montre tous les stands qui vendent cet objet dans les brocantes du jour ou de la semaine en Île-de-France."
  },
  {
    q: 'Peut-on négocier à toutes les brocantes ?',
    a: "Presque toujours ! La négociation est une tradition dans le monde de la brocante. Les seuls cas où c'est difficile : les grandes enseignes d'antiquaires, les objets avec prix fixes clairement affichés, et en début de journée quand les vendeurs espèrent encore leur prix. Soyez toujours respectueux dans votre approche."
  },
  {
    q: 'Comment connaître la valeur d\'un objet avant de l\'acheter ?',
    a: "Recherchez des ventes similaires sur eBay (filtrez sur \"objets vendus\"), Selency, ou LeBonCoin. Pour les objets d'art et l'argenterie, des applications comme Google Lens peuvent aider à identifier l'objet. Pour les pièces importantes, n'hésitez pas à consulter un expert."
  },
  {
    q: 'Quels sont les objets les plus rentables à revendre ?',
    a: "Lego (surtout les vieux sets complets), vinyles en bon état, appareils photo argentiques, vaisselle de marque (Villeroy & Boch, Limoges), jouets vintage des années 70-90, livres illustrés anciens, objets publicitaires (plaques émaillées, affiches). Toujours vérifier la cote avant d'acheter pour revendre."
  },
]

export default function GuideChiineurPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">

        {/* Hero */}
        <section className="bg-[#F8F7F5] border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
            <div className="flex items-center gap-2 text-xs font-bold text-[#E8651A] uppercase tracking-widest mb-6">
              <Link href="/" className="hover:underline text-gray-400">Accueil</Link>
              <span className="text-gray-300">/</span>
              <span>Guide du chineur</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#E8651A]/10 text-[#E8651A] text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
              <Star className="w-3.5 h-3.5" />
              Guide complet 2026
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F0F0F] leading-tight tracking-tight mb-6">
              Le Guide du Chineur<br />
              <span className="text-[#E8651A]">Île-de-France</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#6B6B6B] leading-relaxed max-w-2xl mb-10">
              Tout ce qu&apos;il faut savoir pour trouver les meilleures affaires dans les brocantes et vide-greniers d&apos;Île-de-France : préparation, négociation, identification des pépites et utilisation de Brocante Radar.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/search" className="inline-flex items-center gap-2 bg-[#E8651A] hover:bg-[#d4581a] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
                <Search className="w-4 h-4" />
                Rechercher un objet maintenant
              </Link>
              <Link href="/brocantes-ile-de-france" className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-gray-300 text-[#0F0F0F] font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
                <MapPin className="w-4 h-4" />
                Voir les brocantes IDF
              </Link>
            </div>
          </div>

          {/* Photo marché */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-10 pt-4">
            <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1516382461343-35e1ba016e01?auto=format&fit=crop&w=1200&q=80"
                alt="Ambiance marché brocante en Île-de-France"
                fill className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B4B]/40 to-transparent" />
              <div className="absolute bottom-5 left-6">
                <span className="bg-[#E8651A] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">Guide 2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* Sommaire rapide */}
        <section className="border-b border-gray-100 bg-white sticky top-16 z-40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex gap-1 overflow-x-auto py-4 no-scrollbar">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="flex-shrink-0 text-xs font-semibold text-[#6B6B6B] hover:text-[#E8651A] px-4 py-2 rounded-xl hover:bg-orange-50 transition-colors whitespace-nowrap"
                >
                  {s.icon} {s.title.split(' ').slice(0, 3).join(' ')}...
                </a>
              ))}
              <a href="#faq" className="flex-shrink-0 text-xs font-semibold text-[#6B6B6B] hover:text-[#E8651A] px-4 py-2 rounded-xl hover:bg-orange-50 transition-colors whitespace-nowrap">
                ❓ FAQ
              </a>
            </div>
          </div>
        </section>

        {/* Sections de conseils */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-20">
          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              <div className="flex items-center gap-4 mb-10">
                <div className={`w-12 h-12 ${section.color} rounded-2xl flex items-center justify-center text-2xl flex-shrink-0`}>
                  {section.icon}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0F0F0F] tracking-tight">
                  {section.title}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {section.tips.map((tip) => (
                  <div key={tip.title} className="bg-[#F8F7F5] rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-start gap-3 mb-3">
                      <CheckCircle className="w-5 h-5 text-[#E8651A] flex-shrink-0 mt-0.5" />
                      <h3 className="font-bold text-[#0F0F0F] text-base">{tip.title}</h3>
                    </div>
                    <p className="text-[#6B6B6B] text-sm leading-relaxed pl-8">{tip.content}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* CTA intermédiaire */}
          <div className="bg-[#0F0F0F] rounded-3xl p-10 text-center overflow-hidden relative">
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <Image
                src="https://images.unsplash.com/photo-1663366936874-e0cf8ad40d81?auto=format&fit=crop&w=1200&q=70"
                alt="Chineur à la brocante"
                fill className="object-cover opacity-10"
              />
            </div>
            <div className="w-12 h-12 bg-[#E8651A] rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-black text-white mb-3 relative z-10">
              Trouvez vos objets avant d&apos;arriver
            </h3>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto text-sm leading-relaxed relative z-10">
              Avec Brocante Radar, recherchez un objet précis et découvrez dans quel stand et quelle brocante il est disponible — avant même de sortir de chez vous.
            </p>
            <Link href="/search" className="inline-flex items-center gap-2 bg-[#E8651A] hover:bg-[#d4581a] text-white font-semibold px-8 py-4 rounded-2xl transition-colors relative z-10">
              Essayer la recherche
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Checklist du chineur */}
          <section id="checklist">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                📋
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F0F0F] tracking-tight">
                La checklist du parfait chineur
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  title: 'Dans le sac',
                  icon: ShoppingBag,
                  items: ['Espèces (billets + pièces)', 'Cabas ou tote bag solide', 'Lampe de poche', 'Mètre ruban', 'Gants fins', 'Eau et en-cas', 'Smartphone chargé'],
                },
                {
                  title: 'Avant de partir',
                  icon: Lightbulb,
                  items: ['Consulter Brocante Radar', 'Faire la liste de vos objets recherchés', 'Vérifier les horaires', 'Prévoir le stationnement', 'Étudier le plan du marché', 'Budget maximum défini'],
                },
                {
                  title: 'Sur place',
                  icon: MapPin,
                  items: ['Premier tour rapide complet', 'Repérer les stands intéressants', 'Revenir négocier', 'Photographier avant d\'acheter', 'Tester l\'état des objets', 'Garder 20% budget fin de journée'],
                },
              ].map((cat) => (
                <div key={cat.title} className="bg-[#F8F7F5] rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-5">
                    <cat.icon className="w-5 h-5 text-[#E8651A]" />
                    <h3 className="font-bold text-[#0F0F0F]">{cat.title}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-[#6B6B6B]">
                        <span className="w-1.5 h-1.5 bg-[#E8651A] rounded-full flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section id="faq">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                ❓
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F0F0F] tracking-tight">
                Questions fréquentes
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="border border-gray-200 rounded-2xl p-6 hover:border-orange-200 transition-colors">
                  <h3 className="font-bold text-[#0F0F0F] mb-3 flex items-start gap-3">
                    <span className="text-[#E8651A] flex-shrink-0">Q.</span>
                    {faq.q}
                  </h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed pl-6">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Liens internes SEO */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                🗺️
              </div>
              <h2 className="text-2xl font-black text-[#0F0F0F] tracking-tight">
                Brocantes par département
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { nom: 'Paris (75)', href: '/brocante-paris' },
                { nom: 'Hauts-de-Seine (92)', href: '/brocante-hauts-de-seine' },
                { nom: 'Seine-Saint-Denis (93)', href: '/brocante-seine-saint-denis' },
                { nom: 'Val-de-Marne (94)', href: '/brocante-val-de-marne' },
                { nom: 'Essonne (91)', href: '/brocante-essonne' },
                { nom: 'Yvelines (78)', href: '/brocante-yvelines' },
                { nom: 'Val-d\'Oise (95)', href: '/brocante-val-d-oise' },
                { nom: 'Seine-et-Marne (77)', href: '/brocante-seine-et-marne' },
              ].map((dept) => (
                <Link key={dept.href} href={dept.href} className="bg-[#F8F7F5] hover:bg-orange-50 border border-gray-100 hover:border-orange-200 rounded-xl p-4 text-sm font-semibold text-[#0F0F0F] hover:text-[#E8651A] transition-all flex items-center justify-between gap-2">
                  {dept.nom}
                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* CTA final */}
        <section className="bg-[#F8F7F5] border-t border-gray-100 py-20">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <Clock className="w-10 h-10 text-[#E8651A] mx-auto mb-6" />
            <h2 className="text-3xl font-black text-[#0F0F0F] mb-4 tracking-tight">
              Prêt pour votre prochaine sortie ?
            </h2>
            <p className="text-[#6B6B6B] mb-8">
              Utilisez Brocante Radar pour repérer les objets disponibles dans les brocantes d&apos;Île-de-France ce week-end.
            </p>
            <Link href="/search" className="inline-flex items-center gap-2 bg-[#E8651A] hover:bg-[#d4581a] text-white font-semibold px-8 py-4 rounded-2xl transition-colors">
              Rechercher un objet
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
