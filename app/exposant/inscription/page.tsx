'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Store, ArrowRight, Eye, EyeOff } from 'lucide-react'

export default function InscriptionExposantPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const brocanteId = searchParams.get('brocante')
  const [form, setForm] = useState({ nom: '', email: '', telephone: '', password: '', confirm: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function set(key: string, val: string) {
    setForm(f => ({ ...f, [key]: val }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirm) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }
    if (form.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.')
      return
    }

    setLoading(true)
    const supabase = createClient()

    // 1. Créer le compte Supabase Auth
    const { data, error: authError } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.password,
    })

    if (authError || !data.user) {
      setError(authError?.message ?? 'Erreur lors de la création du compte.')
      setLoading(false)
      return
    }

    // 2. Créer le profil exposant
    const { error: profileError } = await supabase
      .from('exposant_profiles')
      .insert({
        id: data.user.id,
        nom: form.nom.trim(),
        telephone: form.telephone.trim() || null,
      })

    if (profileError) {
      setError('Compte créé mais erreur profil : ' + profileError.message)
      setLoading(false)
      return
    }

    // 3. Si on vient d'une brocante, s'y inscrire automatiquement
    if (brocanteId) {
      await supabase
        .from('inscriptions_brocante')
        .insert({ exposant_id: data.user.id, brocante_id: brocanteId })
    }

    router.push('/exposant/mon-espace?bienvenue=1')
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#EEF4FF] min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#E8651A] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Store className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-black text-[#0D1B4B]">Créer mon compte</h1>
            <p className="text-[#4A5680] text-sm mt-2">Exposant — Brocante Radar</p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-blue-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nom */}
              <div>
                <label className="block text-xs font-bold text-[#0D1B4B] uppercase tracking-wider mb-1.5">
                  Votre nom *
                </label>
                <input
                  type="text"
                  required
                  value={form.nom}
                  onChange={e => set('nom', e.target.value)}
                  placeholder="Prénom et nom"
                  className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8651A] bg-[#F8FAFE]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-[#0D1B4B] uppercase tracking-wider mb-1.5">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  placeholder="votre@email.fr"
                  className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8651A] bg-[#F8FAFE]"
                />
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-xs font-bold text-[#0D1B4B] uppercase tracking-wider mb-1.5">
                  Téléphone <span className="text-[#4A5680] font-normal normal-case">(optionnel)</span>
                </label>
                <input
                  type="tel"
                  value={form.telephone}
                  onChange={e => set('telephone', e.target.value)}
                  placeholder="06 XX XX XX XX"
                  className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8651A] bg-[#F8FAFE]"
                />
              </div>

              {/* Mot de passe */}
              <div>
                <label className="block text-xs font-bold text-[#0D1B4B] uppercase tracking-wider mb-1.5">
                  Mot de passe *
                </label>
                <div className="relative">
                  <input
                    type={showPwd ? 'text' : 'password'}
                    required
                    value={form.password}
                    onChange={e => set('password', e.target.value)}
                    placeholder="8 caractères minimum"
                    className="w-full border border-blue-200 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8651A] bg-[#F8FAFE]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A5680] hover:text-[#0D1B4B]"
                  >
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirmer */}
              <div>
                <label className="block text-xs font-bold text-[#0D1B4B] uppercase tracking-wider mb-1.5">
                  Confirmer le mot de passe *
                </label>
                <input
                  type={showPwd ? 'text' : 'password'}
                  required
                  value={form.confirm}
                  onChange={e => set('confirm', e.target.value)}
                  placeholder="Répétez le mot de passe"
                  className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8651A] bg-[#F8FAFE]"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#E8651A] hover:bg-[#d4581a] disabled:opacity-60 text-white font-bold px-6 py-3.5 rounded-xl transition-colors mt-2"
              >
                {loading ? 'Création en cours…' : (
                  <>Créer mon compte <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-[#4A5680] mt-6">
              Déjà un compte ?{' '}
              <Link href="/exposant/connexion" className="text-[#E8651A] font-semibold hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
