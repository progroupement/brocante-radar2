import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { QrCode, ArrowLeft, CheckCircle, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Organisateur de brocante — Obtenez votre QR code | Brocante Radar',
  description:
    "Vous organisez une brocante en Île-de-France ? Contactez-nous pour obtenir votre QR code personnalisé. Vos exposants publient leurs stands, vos visiteurs trouvent tout en un scan.",
}

export default function ContactOrganisateurPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* ─── HERO ─────────────────────────────────────────────────── */}
        <section className="bg-[#F8F7F5] py-20 border-b border-gray-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[#6B6B6B] hover:text-[#0F0F0F] transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" /> Retour à l&apos;accueil
            </Link>

            <div className="w-16 h-16 bg-[#0F0F0F] rounded-3xl flex items-center justify-center mx-auto mb-8">
              <QrCode className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-[#0F0F0F] tracking-tight leading-tight mb-6">
              Votre brocante mérite<br />
              <span className="text-[#E8651A]">son propre QR code.</span>
            </h1>

            <p className="text-lg text-[#6B6B6B] leading-relaxed max-w-xl mx-auto">
              Contactez-nous et nous créons votre QR code personnalisé gratuitement. En 24h, vos exposants peuvent publier leurs stands et vos visiteurs les trouver en secondes.
            </p>
          </div>
        </section>

        {/* ─── COMMENT ÇA MARCHE ─────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-[#0F0F0F] text-center mb-12">Comment ça se passe ?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Vous nous contactez',
                  desc: 'Envoyez-nous un email avec le nom, la date et le lieu de votre brocante.',
                },
                {
                  step: '02',
                  title: 'On crée votre QR code',
                  desc: 'Nous générons un QR code unique lié à votre brocante. Prêt en 24h, gratuit.',
                },
                {
                  step: '03',
                  title: 'Vos exposants publient',
                  desc: 'Ils scannent le QR code à leur arrivée et listent leurs objets avec photos. Les chineurs les trouvent instantanément.',
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <span className="text-5xl font-black text-gray-100 block mb-3">{item.step}</span>
                  <h3 className="font-bold text-[#0F0F0F] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── AVANTAGES ─────────────────────────────────────────────── */}
        <section className="py-20 bg-[#F8F7F5]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-[#0F0F0F] text-center mb-10">Ce que vous obtenez</h2>
            <div className="space-y-4">
              {[
                'Un QR code PDF imprimable, prêt à afficher à l\'entrée de la brocante',
                'Une page dédiée à votre brocante sur Brocante Radar',
                'Vos exposants peuvent lister leurs objets avec photos depuis leur téléphone',
                'Vos visiteurs trouvent les stands et les objets qu\'ils cherchent en temps réel',
                'Aucun abonnement, aucun frais — entièrement gratuit',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 bg-white rounded-2xl p-4 border border-gray-100">
                  <CheckCircle className="w-5 h-5 text-[#E8651A] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#0F0F0F] leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CONTACT ───────────────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-lg mx-auto px-4 sm:px-6 text-center">
            <div className="w-12 h-12 bg-[#E8651A] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-black text-[#0F0F0F] mb-4">Contactez-nous</h2>
            <p className="text-[#6B6B6B] text-sm leading-relaxed mb-8">
              Envoyez-nous un email en indiquant le nom de votre brocante, la date, le lieu et le nombre d&apos;exposants attendus.
              On vous répond sous 24h avec votre QR code.
            </p>
            <a
              href="mailto:contact@brocanteradar.fr?subject=Demande QR code brocante&body=Bonjour,%0A%0AJe souhaite obtenir un QR code pour ma brocante.%0A%0ANom de la brocante :%0ADate :%0ALieu :%0ANombre d'exposants estimé :%0A%0AMerci !"
              className="inline-flex items-center justify-center gap-2 bg-[#E8651A] hover:bg-[#d4581a] text-white font-semibold px-8 py-4 rounded-2xl text-base transition-colors"
            >
              <Mail className="w-5 h-5" />
              Envoyer un email
            </a>
            <p className="text-xs text-[#6B6B6B] mt-4">contact@brocanteradar.fr</p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
