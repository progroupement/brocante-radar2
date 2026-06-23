'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Store, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react'

function ConnexionForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') ?? '/exposant/mon-espace'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (authError) {
      setError('Email ou mot de passe incorrect.')
      setLoading(false)
      return
    }

    router.push(redirectTo)
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-blue-100 p-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#0D1B4B] uppercase tracking-wider mb-1.5">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="votre@email.fr"
            className="w-full border border-blue-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8651A] bg-[#F8FAFE]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#0D1B4B] uppercase tracking-wider mb-1.5">
            Mot de passe
          </label>
          <div className="relative">
            <input
              type={showPwd ? 'text' : 'password'}
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Votre mot de passe"
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
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Connexion…</> : <>Me connecter <ArrowRight className="w-4 h-4" /></>}
        </button>
      </form>

      <p className="text-center text-sm text-[#4A5680] mt-6">
        Pas encore de compte ?{' '}
        <Link href="/exposant/inscription" className="text-[#E8651A] font-semibold hover:underline">
          Créer un compte
        </Link>
      </p>
    </div>
  )
}

export default function ConnexionExposantPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#EEF4FF] min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#0D1B4B] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Store className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-black text-[#0D1B4B]">Connexion exposant</h1>
            <p className="text-[#4A5680] text-sm mt-2">Accédez à votre espace stand</p>
          </div>
          <Suspense fallback={<div className="flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-[#E8651A]" /></div>}>
            <ConnexionForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}
