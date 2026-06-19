import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mentions légales — Brocante Radar',
  description: 'Mentions légales du site Brocante Radar — Le GPS des chineurs en Île-de-France.',
}

export default function MentionsLegalesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">

        <section className="bg-[#0D1B4B] py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Retour à l&apos;accueil
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Mentions légales
            </h1>
            <p className="text-blue-300 mt-3 text-sm">Dernière mise à jour : juin 2026</p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto space-y-10 text-[#4A5680] leading-relaxed">

            <div>
              <h2 className="text-xl font-black text-[#0D1B4B] mb-4">1. Éditeur du site</h2>
              <p>Le site <strong>brocanteradar.fr</strong> est édité par :</p>
              <div className="mt-3 bg-[#EEF4FF] rounded-2xl p-5 text-sm space-y-1">
                <p><strong>Dénomination :</strong> Brocante Radar</p>
                <p><strong>Email :</strong> <a href="mailto:progroupement@gmail.com" className="text-[#E8651A] hover:underline">progroupement@gmail.com</a></p>
                <p><strong>Région :</strong> Île-de-France, France</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-black text-[#0D1B4B] mb-4">2. Hébergement</h2>
              <div className="bg-[#EEF4FF] rounded-2xl p-5 text-sm space-y-1">
                <p><strong>Hébergeur :</strong> Vercel Inc.</p>
                <p><strong>Adresse :</strong> 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</p>
                <p><strong>Site :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[#E8651A] hover:underline">vercel.com</a></p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-black text-[#0D1B4B] mb-4">3. Propriété intellectuelle</h2>
              <p>
                L&apos;ensemble des contenus présents sur le site brocanteradar.fr (textes, images, logos, icônes, structure) sont la propriété exclusive de Brocante Radar, sauf mention contraire.
              </p>
              <p className="mt-3">
                Toute reproduction, représentation, modification, publication ou adaptation, totale ou partielle, des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation préalable écrite.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-black text-[#0D1B4B] mb-4">4. Responsabilité</h2>
              <p>
                Brocante Radar s&apos;efforce de fournir des informations aussi précises que possible. Cependant, les informations relatives aux brocantes (dates, lieux, horaires) sont fournies à titre indicatif et peuvent être modifiées sans préavis par les organisateurs.
              </p>
              <p className="mt-3">
                Brocante Radar ne peut être tenu responsable des dommages directs ou indirects causés au matériel de l&apos;utilisateur lors de l&apos;accès au site, résultant notamment de l&apos;utilisation d&apos;un matériel ne répondant pas aux spécifications techniques requises.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-black text-[#0D1B4B] mb-4">5. Liens hypertextes</h2>
              <p>
                Le site brocanteradar.fr peut contenir des liens vers d&apos;autres sites. Brocante Radar n&apos;exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou à leur politique de confidentialité.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-black text-[#0D1B4B] mb-4">6. Droit applicable</h2>
              <p>
                Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-black text-[#0D1B4B] mb-4">7. Contact</h2>
              <p>
                Pour toute question relative au site, vous pouvez nous contacter à :{' '}
                <a href="mailto:progroupement@gmail.com" className="text-[#E8651A] hover:underline font-semibold">progroupement@gmail.com</a>
              </p>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
