'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Bell, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

export default function InscriptionChineurForm() {
  const [form, setForm] = useState({
    prenom: '',
    email: '',
    departement: '',
    objet_recherche: '',
    notifications: false,
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.prenom.trim() || !form.email.trim()) return

    setStatus('loading')
    try {
      const res = await fetch('/api/inscription-chineur', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
      } else {
        setErrorMsg(data.error || 'Une erreur est survenue.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Impossible de contacter le serveur. Réessayez.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-[#EEF4FF] rounded-3xl p-8 border border-blue-100 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-black text-[#0D1B4B] mb-3">
          Bienvenue, {form.prenom} !
        </h3>
        <p className="text-[#4A5680] mb-2">
          Votre profil chineur est créé.
        </p>
        {form.objet_recherche && (
          <p className="text-[#4A5680] mb-6">
            On recherche <strong className="text-[#E8651A]">"{form.objet_recherche}"</strong> dans toutes les brocantes IDF.
          </p>
        )}
        <Link
          href={form.objet_recherche ? `/search?q=${encodeURIComponent(form.objet_recherche)}` : '/search'}
          className="inline-flex items-center gap-2 bg-[#E8651A] hover:bg-[#d4581a] text-white font-semibold px-7 py-4 rounded-2xl text-base transition-colors"
        >
          <Search className="w-5 h-5" />
          Rechercher maintenant
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-[#EEF4FF] rounded-3xl p-8 border border-blue-100">
      {status === 'error' && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-[#0D1B4B] mb-2">
            Votre prénom <span className="text-[#E8651A]">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Ex : Marie"
            value={form.prenom}
            onChange={(e) => setForm({ ...form, prenom: e.target.value })}
            className="w-full border border-blue-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#E8651A] bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-[#0D1B4B] mb-2">
            Votre email <span className="text-[#E8651A]">*</span>
          </label>
          <input
            type="email"
            required
            placeholder="vous@email.fr"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-blue-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#E8651A] bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-[#0D1B4B] mb-2">
            Votre département IDF
          </label>
          <select
            value={form.departement}
            onChange={(e) => setForm({ ...form, departement: e.target.value })}
            className="w-full border border-blue-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#E8651A] bg-white"
          >
            <option value="">Choisissez votre département</option>
            <option value="75">75 — Paris</option>
            <option value="77">77 — Seine-et-Marne</option>
            <option value="78">78 — Yvelines</option>
            <option value="91">91 — Essonne</option>
            <option value="92">92 — Hauts-de-Seine</option>
            <option value="93">93 — Seine-Saint-Denis</option>
            <option value="94">94 — Val-de-Marne</option>
            <option value="95">95 — Val-d'Oise</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-[#0D1B4B] mb-2">
            Que cherchez-vous ? <span className="text-[#4A5680] font-normal">(optionnel)</span>
          </label>
          <input
            type="text"
            placeholder="Ex : vinyles, Lego, machine à coudre..."
            value={form.objet_recherche}
            onChange={(e) => setForm({ ...form, objet_recherche: e.target.value })}
            className="w-full border border-blue-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#E8651A] bg-white"
          />
        </div>

        <div className="flex items-start gap-3 pt-2">
          <input
            type="checkbox"
            id="notifs"
            checked={form.notifications}
            onChange={(e) => setForm({ ...form, notifications: e.target.checked })}
            className="mt-1 w-5 h-5 rounded accent-[#E8651A]"
          />
          <label htmlFor="notifs" className="text-sm text-[#4A5680] leading-relaxed cursor-pointer">
            <span className="flex items-center gap-1.5 font-semibold text-[#0D1B4B] mb-0.5">
              <Bell className="w-4 h-4 text-[#E8651A]" />
              Recevoir les nouvelles brocantes IDF chaque semaine
            </span>
            Alertes par email uniquement. Désabonnement en un clic.
          </label>
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full flex items-center justify-center gap-2 bg-[#E8651A] hover:bg-[#d4581a] disabled:opacity-60 text-white font-semibold px-6 py-4 rounded-2xl text-base transition-colors"
        >
          {status === 'loading' ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Inscription en cours...</>
          ) : (
            <><Search className="w-5 h-5" /> Créer mon profil et rechercher</>
          )}
        </button>

        <p className="text-center text-xs text-[#4A5680]">
          Gratuit · Aucune app · Aucun abonnement
        </p>
      </form>
    </div>
  )
}
