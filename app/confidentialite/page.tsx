import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — Brocante Radar',
  description: 'Politique de confidentialité et protection des données personnelles de Brocante Radar.',
}

export default function ConfidentialitePage() {
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
              Politique de confidentialité
            </h1>
            <p className="text-blue-300 mt-3 text-sm">Dernière mise à jour : juin 2026</p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto space-y-10 text-[#4A5680] leading-relaxed">

            <div>
              <h2 className="text-xl font-black text-[#0D1B4B] mb-4">1. Responsable du traitement</h2>
              <p>
                Le responsable du traitement des données collectées sur le site brocanteradar.fr est Brocante Radar,
                joignable à l&apos;adresse :{' '}
                <a href="mailto:progroupement@gmail.com" className="text-[#E8651A] hover:underline">progroupement@gmail.com</a>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-black text-[#0D1B4B] mb-4">2. Données collectées</h2>
              <p className="mb-4">Brocante Radar collecte les données suivantes :</p>

              <div className="space-y-4">
                <div className="bg-[#EEF4FF] rounded-2xl p-5 text-sm">
                  <p className="font-bold text-[#0D1B4B] mb-2">Profils chineurs (formulaire « Je cherche la perle rare »)</p>
                  <ul className="space-y-1 text-[#4A5680] list-disc list-inside">
                    <li>Prénom</li>
                    <li>Adresse email</li>
                    <li>Département (facultatif)</li>
                    <li>Objet recherché (facultatif)</li>
                    <li>Préférence de notification (oui/non)</li>
                  </ul>
                </div>

                <div className="bg-[#EEF4FF] rounded-2xl p-5 text-sm">
                  <p className="font-bold text-[#0D1B4B] mb-2">Demandes organisateurs (formulaire « Contact organisateur »)</p>
                  <ul className="space-y-1 text-[#4A5680] list-disc list-inside">
                    <li>Nom et prénom</li>
                    <li>Adresse email</li>
                    <li>Numéro de téléphone</li>
                    <li>Nom et lieu de l&apos;événement</li>
                    <li>Message libre</li>
                  </ul>
                </div>

                <div className="bg-[#EEF4FF] rounded-2xl p-5 text-sm">
                  <p className="font-bold text-[#0D1B4B] mb-2">Données techniques</p>
                  <ul className="space-y-1 text-[#4A5680] list-disc list-inside">
                    <li>Adresse IP (logs serveur)</li>
                    <li>Type de navigateur et système d&apos;exploitation</li>
                    <li>Pages visitées et durée de visite</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-black text-[#0D1B4B] mb-4">3. Finalités du traitement</h2>
              <p>Les données collectées sont utilisées pour :</p>
              <ul className="mt-3 space-y-2 list-disc list-inside text-sm">
                <li>Vous alerter lorsqu&apos;un exposant propose un objet correspondant à votre recherche</li>
                <li>Répondre à vos demandes de contact en tant qu&apos;organisateur de brocante</li>
                <li>Améliorer le fonctionnement et les services du site</li>
                <li>Respecter nos obligations légales</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-black text-[#0D1B4B] mb-4">4. Base légale</h2>
              <p>
                Le traitement de vos données repose sur votre <strong>consentement explicite</strong> (article 6.1.a du RGPD),
                recueilli au moment de la soumission des formulaires du site.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-black text-[#0D1B4B] mb-4">5. Durée de conservation</h2>
              <div className="bg-[#EEF4FF] rounded-2xl p-5 text-sm space-y-2">
                <p><strong>Profils chineurs :</strong> conservés 24 mois à compter de la création du profil, ou jusqu&apos;à demande de suppression.</p>
                <p><strong>Demandes organisateurs :</strong> conservées 12 mois à compter de la réception de la demande.</p>
                <p><strong>Données techniques :</strong> conservées 12 mois maximum.</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-black text-[#0D1B4B] mb-4">6. Destinataires des données</h2>
              <p>Vos données sont traitées par :</p>
              <ul className="mt-3 space-y-2 list-disc list-inside text-sm">
                <li><strong>Supabase</strong> (stockage base de données) — hébergé en Europe (région eu-west-3)</li>
                <li><strong>Resend</strong> (envoi d&apos;emails transactionnels) — pour vous notifier et informer l&apos;équipe Brocante Radar</li>
                <li><strong>Vercel</strong> (hébergement du site)</li>
              </ul>
              <p className="mt-3 text-sm">
                Ces sous-traitants sont soumis à des obligations de confidentialité et ne sont pas autorisés à utiliser vos données à d&apos;autres fins.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-black text-[#0D1B4B] mb-4">7. Vos droits (RGPD)</h2>
              <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :</p>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                {[
                  { icon: '👁️', title: 'Droit d\'accès', desc: 'Consulter les données que nous détenons sur vous.' },
                  { icon: '✏️', title: 'Droit de rectification', desc: 'Corriger des données inexactes ou incomplètes.' },
                  { icon: '🗑️', title: 'Droit à l\'effacement', desc: 'Demander la suppression de vos données ("droit à l\'oubli").' },
                  { icon: '🚫', title: 'Droit d\'opposition', desc: 'Vous opposer au traitement de vos données.' },
                  { icon: '⏸️', title: 'Droit à la limitation', desc: 'Limiter temporairement le traitement de vos données.' },
                  { icon: '📦', title: 'Droit à la portabilité', desc: 'Recevoir vos données dans un format lisible.' },
                ].map((right) => (
                  <div key={right.title} className="bg-[#EEF4FF] rounded-xl p-4 text-sm">
                    <p className="font-bold text-[#0D1B4B]">{right.icon} {right.title}</p>
                    <p className="text-[#4A5680] mt-1">{right.desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm">
                Pour exercer ces droits, contactez-nous à :{' '}
                <a href="mailto:progroupement@gmail.com" className="text-[#E8651A] hover:underline font-semibold">progroupement@gmail.com</a>.
                Nous nous engageons à répondre dans un délai maximum de 30 jours.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-black text-[#0D1B4B] mb-4">8. Cookies</h2>
              <p>
                Le site brocanteradar.fr utilise des cookies techniques strictement nécessaires au fonctionnement du site.
                Aucun cookie publicitaire ou de tracking n&apos;est déposé sur votre appareil.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-black text-[#0D1B4B] mb-4">9. Réclamation</h2>
              <p>
                Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la
                Commission Nationale de l&apos;Informatique et des Libertés (CNIL) :{' '}
                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#E8651A] hover:underline">www.cnil.fr</a>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-black text-[#0D1B4B] mb-4">10. Modifications</h2>
              <p>
                Brocante Radar se réserve le droit de modifier cette politique de confidentialité à tout moment.
                Toute modification sera publiée sur cette page avec une date de mise à jour.
              </p>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
