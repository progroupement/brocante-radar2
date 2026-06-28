'use client'

import { Suspense, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Store, Loader2, CheckCircle, Eye, EyeOff } from 'lucide-react'

function NouveauMotDePasseForm() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)

  // Supabase envoie le token via le hash de l'URL (#access_token=...)
  // Le client Supabase le détecte automatiquement au chargement
  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setReady(true)
      } else {
        setError('Lien expiré ou invalide. Veuillez recommencer la procédure.')
      }
    })
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.')
      return
    }
    if (password !== confirm) {
      setError('Les deux mots de passe ne correspondent pas.')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error: err } = await supabase.auth.updateUser({ password })

    if (err) {
      setError(err.message || 'Erreur lors de la mise à jour. Veuillez réessayer.')
    } else {
      setDone(true)
      setTimeout(() => router.push('/exposant/connexion'), 3000)
    }
    setLoading(false)
  }

  if (done) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-blue-100 p-8 text-center">
        <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-black text-[#0D1B4B] mb-2">Mot de passe mis à jour !</h2>
        <p className="text-[#4A5680] text-sm mb-2">
          Vous allez être redirigé vers la page de connexion…
        </p>
        <Link href="/exposant/connexion" className="text-[#E8651A] font-semibold hover:underline text-sm">
          Se connecter maintenant →
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-blue-100 p-8">
      <p className="text-[#4A5680] text-sm mb-6">
        Choisissez un nouveau mot de passe pour votre espace exposant.
      </p>

      {!ready && !error && (
        <div className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-[#E8651A]" />
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm mb-4">
          {error}
          {error.includes('expiré') && (
            <div className="mt-2">
              <Link href="/exposant/mot-de-passe-oublie" className="text-[#E8651A] font-semibold hover:underline">
                Recommencer →
              </Link>
            </div>
          )}
        </div>
      )}

      {ready && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0D1B4B] uppercase tracking-wider mb-1.5">
              Nouveau mot de passe
            </label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Minimum 8 caractères"
                className="w-full border border-blue-200 rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8651A] bg-[#F8FAFE]"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A5680] hover:text-[#0D1B4B]"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0D1B4B] uppercase tracking-wider mb-1.5">
              Confirmer le mot de passe
            </label>
            <input
              type={showPw ? 'text' : 'password'}
              required
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="Répétez le mot de passe"
              className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8651A] bg-[#F8FAFE]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#E8651A] hover:bg-[#d4581a] disabled:opacity-60 text-white font-bold px-6 py-3.5 rounded-xl transition-colors"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Mise à jour…</> : 'Enregistrer le nouveau mot de passe'}
          </button>
        </form>
      )}

      <div className="text-center mt-6">
        <Link href="/exposant/connexion" className="text-sm text-[#4A5680] hover:text-[#0D1B4B]">
          ← Retour à la connexion
        </Link>
      </div>
    </div>
  )
}

export default function NouveauMotDePassePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#EEF4FF] min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#0D1B4B] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Store className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-black text-[#0D1B4B]">Nouveau mot de passe</h1>
          </div>
          <Suspense fallback={<div className="flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-[#E8651A]" /></div>}>
            <NouveauMotDePasseForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}
