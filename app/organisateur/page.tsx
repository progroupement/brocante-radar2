'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ClipboardList, Loader2, Building2, User, Mail, Phone, MapPin, Calendar, LayoutGrid } from 'lucide-react'

export default function OrganisateurPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    association: '',
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    ville: '',
    code_postal: '',
    date: '',
    nb_stands: '',
  })

  function set(key: string, val: string) {
    setForm(f => ({ ...f, [key]: val }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/organisateur/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()

      if (!res.ok) {
        setError(json.error ?? 'Une erreur est survenue. Veuillez réessayer.')
        setLoading(false)
        return
      }

      // Rediriger vers la page de confirmation avec le token
      router.push(`/organisateur/confirmation?token=${json.qr_token}&nom=${encodeURIComponent(json.event.nom)}&date=${json.event.date}&ville=${encodeURIComponent(json.event.ville)}`)
    } catch {
      setError('Erreur réseau. Vérifiez votre connexion et réessayez.')
      setLoading(false)
    }
  }

  const inputClass = "w-full border border-blue-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8651A] bg-[#F8FAFE] text-[#0D1B4B] placeholder-[#9AABCC]"
  const labelClass = "flex items-center gap-1.5 text-xs font-bold text-[#0D1B4B] uppercase tracking-wider mb-1.5"

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#EEF4FF] min-h-screen px-4 py-14">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[#0D1B4B] rounded-2xl flex items-center justify-center mx-auto mb-5">
              <ClipboardList className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0D1B4B] mb-3">
              Espace Organisateur
            </h1>
            <p className="text-[#4A5680] text-base max-w-lg mx-auto">
              Créez votre fiche brocante en 2 minutes. Vous recevrez instantanément un <strong>QR code unique</strong> à distribuer à vos exposants.
            </p>
          </div>

          {/* Étapes */}
          <div className="grid grid-cols-3 gap-3 mb-10">
            {[
              { n: '1', label: 'Remplissez le formulaire' },
              { n: '2', label: 'QR code généré automatiquement' },
              { n: '3', label: 'Partagez aux exposants' },
            ].map(step => (
              <div key={step.n} className="bg-white rounded-2xl p-4 text-center border border-blue-100">
                <div className="w-8 h-8 bg-[#E8651A] rounded-full flex items-center justify-center text-white font-black text-sm mx-auto mb-2">{step.n}</div>
                <p className="text-xs font-semibold text-[#0D1B4B] leading-snug">{step.label}</p>
              </div>
            ))}
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-blue-100 p-8 space-y-5">

            {/* Association */}
            <div>
              <label className={labelClass}>
                <Building2 className="w-3.5 h-3.5" /> Nom de l&apos;association
                <span className="text-[#9AABCC] font-normal normal-case tracking-normal">(optionnel)</span>
              </label>
              <input
                type="text"
                value={form.association}
                onChange={e => set('association', e.target.value)}
                placeholder="Association des commerçants de..."
                className={inputClass}
              />
            </div>

            {/* Organisateur + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  <User className="w-3.5 h-3.5" /> Nom de l&apos;organisateur *
                </label>
                <input
                  type="text"
                  required
                  value={form.nom}
                  onChange={e => set('nom', e.target.value)}
                  placeholder="Prénom Nom"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  <Mail className="w-3.5 h-3.5" /> Email *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  placeholder="votre@email.fr"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Téléphone */}
            <div>
              <label className={labelClass}>
                <Phone className="w-3.5 h-3.5" /> Téléphone *
              </label>
              <input
                type="tel"
                required
                value={form.telephone}
                onChange={e => set('telephone', e.target.value)}
                placeholder="06 12 34 56 78"
                className={inputClass}
              />
            </div>

            <div className="border-t border-blue-50 pt-5">
              <p className="text-xs font-bold text-[#E8651A] uppercase tracking-wider mb-4">📍 Lieu de la brocante</p>

              {/* Adresse */}
              <div className="mb-4">
                <label className={labelClass}>
                  <MapPin className="w-3.5 h-3.5" /> Adresse *
                </label>
                <input
                  type="text"
                  required
                  value={form.adresse}
                  onChange={e => set('adresse', e.target.value)}
                  placeholder="15 rue de la Mairie"
                  className={inputClass}
                />
              </div>

              {/* Ville + Code postal */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className={labelClass}>Code postal *</label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    value={form.code_postal}
                    onChange={e => set('code_postal', e.target.value.replace(/\D/g, ''))}
                    placeholder="75001"
                    className={inputClass}
                  />
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>Ville *</label>
                  <input
                    type="text"
                    required
                    value={form.ville}
                    onChange={e => set('ville', e.target.value)}
                    placeholder="Paris"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-blue-50 pt-5">
              <p className="text-xs font-bold text-[#E8651A] uppercase tracking-wider mb-4">📅 Date & organisation</p>

              {/* Date + Nb stands */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    <Calendar className="w-3.5 h-3.5" /> Date de la brocante *
                  </label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={e => set('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    <LayoutGrid className="w-3.5 h-3.5" /> Nombre de stands
                    <span className="text-[#9AABCC] font-normal normal-case tracking-normal">(optionnel)</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5000"
                    value={form.nb_stands}
                    onChange={e => set('nb_stands', e.target.value)}
                    placeholder="ex: 80"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#E8651A] hover:bg-[#d4581a] disabled:opacity-60 text-white font-black text-base px-6 py-4 rounded-2xl transition-all hover:scale-[1.01] shadow-lg shadow-orange-900/20"
            >
              {loading
                ? <><Loader2 className="w-5 h-5 animate-spin" /> Création en cours…</>
                : '🎯 Créer ma brocante et générer le QR code'
              }
            </button>

            <p className="text-center text-xs text-[#9AABCC]">
              Votre fiche est créée instantanément. Aucun compte requis.
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
