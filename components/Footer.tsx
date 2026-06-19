import Link from 'next/link'
import Image from 'next/image'
import { DEPARTEMENTS_IDF } from '@/lib/utils'

export default function Footer() {
  return (
    <footer className="bg-[#060D26] text-gray-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image src="/logo.png" alt="Brocante Radar" width={150} height={50} className="h-10 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Le GPS des chineurs — trouvez les objets que vous cherchez avant même d&apos;arriver à la brocante.
            </p>
            <p className="text-xs text-gray-600">Île-de-France · Lancement juillet 2026</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Navigation</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><Link href="/je-cherche" className="hover:text-white transition-colors">Je cherche la perle rare</Link></li>
              <li><Link href="/search" className="hover:text-white transition-colors">Rechercher un objet</Link></li>
              <li><Link href="/exposant" className="hover:text-white transition-colors">Publier mon stand</Link></li>
              <li><Link href="/guide-chineur" className="hover:text-white transition-colors">Guide du chineur</Link></li>
              <li><Link href="/brocantes-ile-de-france" className="hover:text-white transition-colors">Brocantes IDF</Link></li>
              <li><Link href="/contact-organisateur" className="hover:text-white transition-colors">Organisateur — QR code</Link></li>
            </ul>
          </div>

          {/* Départements */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Départements</h3>
            <ul className="space-y-3 text-sm">
              {DEPARTEMENTS_IDF.slice(0, 6).map((d) => (
                <li key={d.code}>
                  <Link href={`/brocante-${d.slug}`} className="hover:text-white transition-colors">
                    {d.nom}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/brocantes-ile-de-france" className="text-[#E8651A] hover:text-orange-400 transition-colors font-medium">
                  Voir tous →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="mailto:progroupement@gmail.com" className="hover:text-white transition-colors">progroupement@gmail.com</a></li>
              <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link></li>
              <li><Link href="/confidentialite" className="hover:text-white transition-colors">Confidentialité</Link></li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#E8651A] flex items-center justify-center transition-colors text-sm">📸</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#E8651A] flex items-center justify-center transition-colors text-sm">👥</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <span>© {new Date().getFullYear()} Brocante Radar. Tous droits réservés.</span>
          <span>Fait avec ❤️ pour les chineurs d&apos;Île-de-France</span>
        </div>
      </div>
    </footer>
  )
}
