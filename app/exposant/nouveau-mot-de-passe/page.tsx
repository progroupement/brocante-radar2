'use client'

import { Suspense, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Store, Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react'

function NouveauMotDePasseForm() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Supabase injecte la session depuis le fragment URL (#access_token=...)
    const supabase = createClient()
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setReady(true)
      }
    })
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }
    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error: err } = await supabase.auth.updateUser({ password })

    if (err) {
      setError('Erreur : ' + err.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setTimeout(() => router.push('/exposant/connexion'), 2500)
  }

  if (success) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-blue-100 p-8 text-center">
        <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-black text-[#0D1B4B] mb-2">Mot de passe mis à jour !</h2>
        <p className="text-[#4A5680] text-sm">Redirection vers la connexion…</p>
      </div>
    )
  }

  if (!ready) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-blue-100 p-8 text-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#E8651A] mx-auto mb-4" />
        <p className="text-[#4A5680] text-sm">Vérification du lien…</p>
        <p className="text-xs text-gray-400 mt-2">
          Si rien ne se passe, votre lien a peut-être expiré.{' '}
          <a href="/exposant/mot-de-passe-oublie" className="text-[#E8651A] hover:underline">Réessayer</a>
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-blue-100 p-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#0D1B4B] uppercase tracking-wider mb-1.5">Nouveau mot de passe</label>
          <div className="relative">
            <input
              type={showPwd ? 'text' : 'password'}
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="8 caractères minimum"
              className="w-full border border-blue-200 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8651A] bg-[#F8FAFE]"
            />
            <button type="button" onClick={() => setShowPwd(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A5680] hover:text-[#0D1B4B]">
              {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#0D1B4B] uppercase tracking-wider mb-1.5">Confirmer le mot de passe</label>
          <input
            type={showPwd ? 'text' : 'password'}
            required
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            placeholder="Répétez le mot de passe"
            className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8651A] bg-[#F8FAFE]"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#E8651A] hover:bg-[#d4581a] disabled:opacity-60 text-white font-bold px-6 py-3.5 rounded-xl transition-colors"
        >
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Mise à jour…</> : 'Enregistrer le nouveau mot de passe'}
        </button>
      </form>
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
