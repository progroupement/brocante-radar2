import Link from 'next/link'
import { Radar } from 'lucide-react'
import { DEPARTEMENTS_IDF } from '@/lib/utils'

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-gray-300 py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-[#E8651A] rounded-md flex items-center justify-center">
              <Radar className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">BROCANTE RADAR</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Le GPS des chineurs — trouvez les objets que vous cherchez avant même d'arriver à la brocante.
          </p>
        </div>

        {/* Liens rapides */}
        <div>
          <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-[#E8651A] transition-colors">Accueil</Link></li>
            <li><Link href="/organizer" className="hover:text-[#E8651A] transition-colors">Organiser ma brocante</Link></li>
            <li><Link href="/search" className="hover:text-[#E8651A] transition-colors">Rechercher un objet</Link></li>
            <li><Link href="/brocantes-ile-de-france" className="hover:text-[#E8651A] transition-colors">Brocantes IDF</Link></li>
          </ul>
        </div>

        {/* Départements */}
        <div>
          <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Départements</h3>
          <ul className="space-y-2 text-sm">
            {DEPARTEMENTS_IDF.slice(0, 5).map((d) => (
              <li key={d.code}>
                <Link href={`/brocante-${d.slug}`} className="hover:text-[#E8651A] transition-colors">
                  Brocantes {d.nom}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/brocantes-ile-de-france" className="hover:text-[#E8651A] transition-colors">
                Voir tout →
              </Link>
            </li>
          </ul>
        </div>

        {/* Légal */}
        <div>
          <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Informations</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="mailto:contact@brocante-radar.fr" className="hover:text-[#E8651A] transition-colors">Contact</a></li>
            <li><Link href="/mentions-legales" className="hover:text-[#E8651A] transition-colors">Mentions légales</Link></li>
            <li><Link href="/confidentialite" className="hover:text-[#E8651A] transition-colors">Confidentialité</Link></li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-[#E8651A] transition-colors text-lg">📸</a>
            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-[#E8651A] transition-colors text-lg">👥</a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 pt-6 border-t border-gray-700 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Brocante Radar — Île-de-France. Tous droits réservés.
      </div>
    </footer>
  )
}
