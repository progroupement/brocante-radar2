'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Store, ArrowLeft, Loader2, CheckCircle } from 'lucide-react'

function MotDePasseOublieForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error: err } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/exposant/nouveau-mot-de-passe`,
    })

    if (err) {
      setError('Erreur : ' + err.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-blue-100 p-8 text-center">
        <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-black text-[#0D1B4B] mb-2">Email envoyé !</h2>
        <p className="text-[#4A5680] text-sm mb-6">
          Vérifiez votre boîte mail et cliquez sur le lien pour réinitialiser votre mot de passe.
        </p>
        <Link href="/exposant/connexion" className="text-[#E8651A] font-semibold hover:underline text-sm">
          ← Retour à la connexion
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-blue-100 p-8">
      <p className="text-[#4A5680] text-sm mb-6">
        Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#0D1B4B] uppercase tracking-wider mb-1.5">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="votre@email.fr"
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
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Envoi…</> : 'Envoyer le lien'}
        </button>
      </form>

      <div className="text-center mt-6">
        <Link href="/exposant/connexion" className="inline-flex items-center gap-1 text-sm text-[#4A5680] hover:text-[#0D1B4B]">
          <ArrowLeft className="w-3.5 h-3.5" /> Retour à la connexion
        </Link>
      </div>
    </div>
  )
}

export default function MotDePasseOubliePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#EEF4FF] min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#0D1B4B] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Store className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-black text-[#0D1B4B]">Mot de passe oublié</h1>
          </div>
          <Suspense fallback={<div className="flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-[#E8651A]" /></div>}>
            <MotDePasseOublieForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}
