'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, Store, Building2, CheckCircle, ArrowRight, Phone, Mail, User } from 'lucide-react'

type Brocante = {
  id: string
  nom: string
  date_debut: string
  date_fin: string
  ville: string
  dept: string
  adresse: string | null
  type: string
}

type Role = 'chineur' | 'exposant' | 'organisateur' | null

type Props = {
  brocante: Brocante
  formatDate: (d: string) => string
}

export default function BrocanteInscription({ brocante, formatDate }: Props) {
  const [role, setRole] = useState<Role>(null)
  const [form, setForm] = useState({ nom: '', email: '', telephone: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const isSameDay = brocante.date_debut === brocante.date_fin
  const dateLine = isSameDay
    ? formatDate(brocante.date_debut)
    : `${formatDate(brocante.date_debut)} → ${formatDate(brocante.date_fin)}`

  async function submitOrganisateur(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/contact-organisateur', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brocante_nom: brocante.nom,
          brocante_ville: brocante.ville,
          brocante_date: brocante.date_debut,
          brocante_id: brocante.id,
          ...form,
        }),
      })
      if (!res.ok) throw new Error('Erreur')
      setSent(true)
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer ou écrire à contact@brocanteradar.fr')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      {/* Retour */}
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#4A5680] hover:text-[#0D1B4B] transition-colors mb-10">
        <ArrowLeft className="w-4 h-4" /> Retour aux brocantes
      </Link>

      {/* Header brocante */}
      <div className="bg-[#0D1B4B] rounded-3xl p-8 mb-8 text-white">
        <span className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-3 block">{brocante.type}</span>
        <h1 className="text-2xl sm:text-3xl font-black mb-3">{brocante.nom}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-blue-200">
          <span>📅 {dateLine}</span>
          {brocante.adresse && <span>📍 {brocante.adresse}, {brocante.ville}</span>}
          {!brocante.adresse && <span>📍 {brocante.ville}</span>}
        </div>
      </div>

      {/* Choix du rôle */}
      {!role && (
        <div>
          <h2 className="text-xl font-black text-[#0D1B4B] mb-2 text-center">Vous êtes…</h2>
          <p className="text-sm text-[#4A5680] text-center mb-8">Choisissez votre profil pour continuer</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Chineur */}
            <button
              onClick={() => setRole('chineur')}
              className="group bg-white border-2 border-blue-100 hover:border-[#E8651A] rounded-2xl p-6 flex flex-col items-center gap-4 text-center transition-all hover:shadow-lg hover:shadow-orange-50"
            >
              <div className="w-14 h-14 bg-[#EEF4FF] group-hover:bg-orange-50 rounded-2xl flex items-center justify-center transition-colors">
                <Search className="w-7 h-7 text-[#0D1B4B] group-hover:text-[#E8651A] transition-colors" />
              </div>
              <div>
                <h3 className="font-black text-[#0D1B4B] text-lg mb-1">Chineur</h3>
                <p className="text-xs text-[#4A5680] leading-relaxed">Je viens chercher de bonnes affaires</p>
              </div>
              <span className="text-xs font-semibold text-[#E8651A] flex items-center gap-1 mt-auto">
                Continuer <ArrowRight className="w-3 h-3" />
              </span>
            </button>

            {/* Exposant */}
            <button
              onClick={() => setRole('exposant')}
              className="group bg-white border-2 border-blue-100 hover:border-[#E8651A] rounded-2xl p-6 flex flex-col items-center gap-4 text-center transition-all hover:shadow-lg hover:shadow-orange-50"
            >
              <div className="w-14 h-14 bg-[#EEF4FF] group-hover:bg-orange-50 rounded-2xl flex items-center justify-center transition-colors">
                <Store className="w-7 h-7 text-[#0D1B4B] group-hover:text-[#E8651A] transition-colors" />
              </div>
              <div>
                <h3 className="font-black text-[#0D1B4B] text-lg mb-1">Exposant</h3>
                <p className="text-xs text-[#4A5680] leading-relaxed">J&apos;ai un stand et je vends des objets</p>
              </div>
              <span className="text-xs font-semibold text-[#E8651A] flex items-center gap-1 mt-auto">
                Continuer <ArrowRight className="w-3 h-3" />
              </span>
            </button>

            {/* Organisateur */}
            <button
              onClick={() => setRole('organisateur')}
              className="group bg-white border-2 border-blue-100 hover:border-[#E8651A] rounded-2xl p-6 flex flex-col items-center gap-4 text-center transition-all hover:shadow-lg hover:shadow-orange-50"
            >
              <div className="w-14 h-14 bg-[#EEF4FF] group-hover:bg-orange-50 rounded-2xl flex items-center justify-center transition-colors">
                <Building2 className="w-7 h-7 text-[#0D1B4B] group-hover:text-[#E8651A] transition-colors" />
              </div>
              <div>
                <h3 className="font-black text-[#0D1B4B] text-lg mb-1">Organisateur</h3>
                <p className="text-xs text-[#4A5680] leading-relaxed">J&apos;organise cette brocante</p>
              </div>
              <span className="text-xs font-semibold text-[#E8651A] flex items-center gap-1 mt-auto">
                Continuer <ArrowRight className="w-3 h-3" />
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Chineur → redirection recherche */}
      {role === 'chineur' && (
        <div className="bg-white rounded-3xl p-8 text-center border border-blue-100">
          <div className="w-16 h-16 bg-[#EEF4FF] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Search className="w-8 h-8 text-[#E8651A]" />
          </div>
          <h2 className="text-2xl font-black text-[#0D1B4B] mb-3">Parfait, chineur !</h2>
          <p className="text-[#4A5680] text-sm leading-relaxed mb-8">
            Utilisez notre moteur de recherche pour trouver un objet précis parmi tous les stands de <strong>{brocante.nom}</strong>. Tapez le nom de l&apos;objet que vous cherchez et on vous indique quel stand le vend.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/search?brocante=${brocante.id}`}
              className="inline-flex items-center justify-center gap-2 bg-[#E8651A] hover:bg-[#d4581a] text-white font-semibold px-7 py-4 rounded-2xl text-sm transition-colors"
            >
              <Search className="w-4 h-4" />
              Rechercher un objet
            </Link>
            <button
              onClick={() => setRole(null)}
              className="inline-flex items-center justify-center gap-2 bg-[#EEF4FF] hover:bg-blue-100 text-[#0D1B4B] font-semibold px-6 py-4 rounded-2xl text-sm transition-colors"
            >
              Retour
            </button>
          </div>
        </div>
      )}

      {/* Exposant → page exposant */}
      {role === 'exposant' && (
        <div className="bg-white rounded-3xl p-8 text-center border border-blue-100">
          <div className="w-16 h-16 bg-[#EEF4FF] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Store className="w-8 h-8 text-[#E8651A]" />
          </div>
          <h2 className="text-2xl font-black text-[#0D1B4B] mb-3">Publiez votre stand !</h2>
          <p className="text-[#4A5680] text-sm leading-relaxed mb-8">
            Listez vos objets avec photos depuis votre téléphone. Les chineurs qui visitent <strong>{brocante.nom}</strong> vous trouveront directement. Scannez le QR code à l&apos;entrée de la brocante ou créez votre stand en ligne.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/exposant?brocante=${brocante.id}`}
              className="inline-flex items-center justify-center gap-2 bg-[#E8651A] hover:bg-[#d4581a] text-white font-semibold px-7 py-4 rounded-2xl text-sm transition-colors"
            >
              <Store className="w-4 h-4" />
              Créer mon stand
            </Link>
            <button
              onClick={() => setRole(null)}
              className="inline-flex items-center justify-center gap-2 bg-[#EEF4FF] hover:bg-blue-100 text-[#0D1B4B] font-semibold px-6 py-4 rounded-2xl text-sm transition-colors"
            >
              Retour
            </button>
          </div>
        </div>
      )}

      {/* Organisateur → formulaire coordonnées */}
      {role === 'organisateur' && !sent && (
        <div className="bg-white rounded-3xl p-8 border border-blue-100">
          <div className="w-16 h-16 bg-[#EEF4FF] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-8 h-8 text-[#E8651A]" />
          </div>
          <h2 className="text-2xl font-black text-[#0D1B4B] mb-2 text-center">Vous organisez cette brocante</h2>
          <p className="text-[#4A5680] text-sm text-center leading-relaxed mb-8">
            Laissez vos coordonnées — on vous rappelle pour créer votre QR code gratuitement. Vos exposants pourront publier leurs stands, vos visiteurs les trouver en un scan.
          </p>

          <form onSubmit={submitOrganisateur} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0D1B4B] uppercase tracking-wider mb-2">
                <User className="w-3 h-3 inline mr-1" />Votre nom *
              </label>
              <input
                type="text"
                required
                value={form.nom}
                onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
                placeholder="Prénom et nom"
                className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8651A] bg-[#F8FAFE]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0D1B4B] uppercase tracking-wider mb-2">
                <Phone className="w-3 h-3 inline mr-1" />Téléphone *
              </label>
              <input
                type="tel"
                required
                value={form.telephone}
                onChange={e => setForm(f => ({ ...f, telephone: e.target.value }))}
                placeholder="06 XX XX XX XX"
                className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8651A] bg-[#F8FAFE]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0D1B4B] uppercase tracking-wider mb-2">
                <Mail className="w-3 h-3 inline mr-1" />Email *
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="votre@email.fr"
                className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8651A] bg-[#F8FAFE]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0D1B4B] uppercase tracking-wider mb-2">
                Message (optionnel)
              </label>
              <textarea
                rows={3}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="Nombre d'exposants attendus, remarques…"
                className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8651A] bg-[#F8FAFE] resize-none"
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm bg-red-50 rounded-xl px-4 py-3">{error}</p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={sending}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#E8651A] hover:bg-[#d4581a] disabled:opacity-60 text-white font-semibold px-7 py-4 rounded-2xl text-sm transition-colors"
              >
                {sending ? 'Envoi en cours…' : 'Envoyer ma demande'}
              </button>
              <button
                type="button"
                onClick={() => setRole(null)}
                className="inline-flex items-center justify-center gap-2 bg-[#EEF4FF] hover:bg-blue-100 text-[#0D1B4B] font-semibold px-6 py-4 rounded-2xl text-sm transition-colors"
              >
                Retour
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Confirmation organisateur */}
      {role === 'organisateur' && sent && (
        <div className="bg-white rounded-3xl p-10 text-center border border-blue-100">
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-black text-[#0D1B4B] mb-3">Demande envoyée !</h2>
          <p className="text-[#4A5680] text-sm leading-relaxed mb-2">
            Nous avons bien reçu votre demande pour <strong>{brocante.nom}</strong>.
          </p>
          <p className="text-[#4A5680] text-sm leading-relaxed mb-8">
            Notre équipe vous contacte sous 24h pour créer votre QR code personnalisé.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#EEF4FF] hover:bg-blue-100 text-[#0D1B4B] font-semibold px-6 py-3 rounded-2xl text-sm transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      )}
    </div>
  )
}
