'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Camera, X, CheckCircle, Loader2, ArrowLeft, Tag } from 'lucide-react'
import { KEYWORDS_SUGGESTIONS } from '@/lib/utils'

const SUPABASE_URL = 'https://amnwcgdqrgmsdgfekrry.supabase.co'
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtbndjZ2Rxcmdtc2RnZmVrcnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1MjUyODMsImV4cCI6MjA5NzEwMTI4M30.Zodk0XBNeOBgiYWrzWXkR6qsdYpgxdUbK-1-etMFiJQ'

type Brocante = {
  id: string
  nom: string
  date_debut: string
  ville: string
  adresse: string | null
}

export default function MonStandPage() {
  const { brocante_id } = useParams<{ brocante_id: string }>()
  const router = useRouter()

  const [brocante, setBrocante] = useState<Brocante | null>(null)
  const [inscriptionId, setInscriptionId] = useState<string | null>(null)
  const [standId, setStandId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // Formulaire
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState('')
  const [existingPhotoUrl, setExistingPhotoUrl] = useState('')
  const [keywords, setKeywords] = useState<string[]>([])
  const [kwInput, setKwInput] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { router.push('/exposant/connexion'); return }

      // Charger brocante
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/brocantes_agenda?id=eq.${brocante_id}&select=*&limit=1`,
        { headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` } }
      )
      const brocanteData = await res.json()
      if (brocanteData[0]) setBrocante(brocanteData[0])

      // Charger inscription
      const { data: insc } = await supabase
        .from('inscriptions_brocante')
        .select('id')
        .eq('exposant_id', user.id)
        .eq('brocante_id', brocante_id)
        .single()

      if (!insc) {
        // Pas inscrit → retour mon-espace
        router.push('/exposant/mon-espace')
        return
      }
      setInscriptionId(insc.id)

      // Charger stand existant
      const { data: stand } = await supabase
        .from('agenda_stands')
        .select('id, photo_url')
        .eq('inscription_id', insc.id)
        .single()

      if (stand) {
        setStandId(stand.id)
        if (stand.photo_url) setExistingPhotoUrl(stand.photo_url)

        // Charger keywords existants
        const { data: kws } = await supabase
          .from('agenda_keywords')
          .select('label')
          .eq('stand_id', stand.id)
        if (kws) setKeywords(kws.map(k => k.label))
      }

      setLoading(false)
    })
  }, [brocante_id, router])

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPhoto(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  function addKeyword(label: string) {
    const t = label.trim()
    if (!t || keywords.includes(t) || keywords.length >= 20) return
    setKeywords(prev => [...prev, t])
    setKwInput('')
    setSuggestions([])
  }

  function removeKeyword(label: string) {
    setKeywords(prev => prev.filter(k => k !== label))
  }

  function handleKwInput(value: string) {
    setKwInput(value)
    if (value.length >= 1) {
      setSuggestions(
        KEYWORDS_SUGGESTIONS.filter(
          s => s.toLowerCase().includes(value.toLowerCase()) && !keywords.includes(s)
        ).slice(0, 6)
      )
    } else {
      setSuggestions([])
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!inscriptionId) return
    if (keywords.length === 0) { setError('Ajoutez au moins un mot-clé.'); return }

    setSubmitting(true)
    setError('')
    const supabase = createClient()

    try {
      // 1. Upload photo si nouvelle
      let photoUrl = existingPhotoUrl || null
      if (photo) {
        const ext = photo.name.split('.').pop()
        const filename = `${brocante_id}_${Date.now()}.${ext}`
        const { error: upErr } = await supabase.storage
          .from('agenda-stands-photos')
          .upload(filename, photo, { upsert: true })
        if (!upErr) {
          const { data: urlData } = supabase.storage
            .from('agenda-stands-photos')
            .getPublicUrl(filename)
          photoUrl = urlData.publicUrl
        }
      }

      // 2. Créer ou mettre à jour le stand
      let currentStandId = standId
      if (!currentStandId) {
        const { data: newStand, error: standErr } = await supabase
          .from('agenda_stands')
          .insert({ inscription_id: inscriptionId, photo_url: photoUrl })
          .select('id')
          .single()
        if (standErr || !newStand) throw new Error(standErr?.message)
        currentStandId = newStand.id
        setStandId(currentStandId)
      } else {
        await supabase
          .from('agenda_stands')
          .update({ photo_url: photoUrl, updated_at: new Date().toISOString() })
          .eq('id', currentStandId)
      }

      // 3. Remplacer les keywords
      await supabase.from('agenda_keywords').delete().eq('stand_id', currentStandId)
      if (keywords.length > 0) {
        await supabase.from('agenda_keywords').insert(
          keywords.map(label => ({ stand_id: currentStandId!, label }))
        )
      }

      if (photoUrl) setExistingPhotoUrl(photoUrl)
      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#E8651A]" />
      </div>
    )
  }

  if (success) {
    return (
      <>
        <Navbar />
        <main className="flex-1 bg-[#EEF4FF] min-h-screen flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl border border-blue-100 p-10 text-center max-w-sm w-full">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-[#0D1B4B] mb-2">Stand publié ! 🎉</h2>
            <p className="text-[#4A5680] text-sm mb-2">
              Les chineurs peuvent maintenant trouver votre stand en cherchant vos objets.
            </p>
            <div className="flex flex-wrap gap-1.5 justify-center my-4">
              {keywords.map(k => (
                <span key={k} className="bg-orange-100 text-orange-800 text-xs font-medium rounded-full px-3 py-1">{k}</span>
              ))}
            </div>
            <div className="flex flex-col gap-2 mt-6">
              <button
                onClick={() => setSuccess(false)}
                className="text-sm text-[#E8651A] hover:underline font-semibold"
              >
                Modifier mon stand
              </button>
              <Link
                href="/exposant/mon-espace"
                className="text-sm text-[#4A5680] hover:text-[#0D1B4B]"
              >
                ← Mon espace
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#EEF4FF] min-h-screen">
        <div className="max-w-lg mx-auto px-4 py-10">

          <Link
            href="/exposant/mon-espace"
            className="inline-flex items-center gap-2 text-sm text-[#4A5680] hover:text-[#0D1B4B] mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Mon espace
          </Link>

          {/* Header brocante */}
          {brocante && (
            <div className="bg-[#E8651A] text-white rounded-2xl p-5 mb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-orange-200 mb-1">Votre stand</p>
              <h1 className="text-xl font-black">{brocante.nom}</h1>
              <p className="text-sm text-orange-100 mt-1">
                {brocante.adresse ? `${brocante.adresse}, ` : ''}{brocante.ville}
              </p>
            </div>
          )}

          <div className="bg-white rounded-3xl border border-blue-100 p-6 sm:p-8">
            <h2 className="text-xl font-black text-[#0D1B4B] mb-1">
              {standId ? 'Mettre à jour mon stand' : 'Publier mon stand'}
            </h2>
            <p className="text-sm text-[#4A5680] mb-6">
              Les chineurs trouveront vos objets via la recherche.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Photo */}
              <div>
                <label className="block text-xs font-bold text-[#0D1B4B] uppercase tracking-wider mb-2">
                  <Camera className="w-3.5 h-3.5 inline mr-1" />
                  Photo de votre stand
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-blue-200 rounded-xl p-4 flex flex-col items-center cursor-pointer hover:border-[#E8651A] hover:bg-orange-50 transition-colors"
                >
                  {photoPreview || existingPhotoUrl ? (
                    <img
                      src={photoPreview || existingPhotoUrl}
                      alt="Aperçu stand"
                      className="w-full max-h-52 object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <Camera className="w-10 h-10 text-blue-200 mb-2" />
                      <p className="text-sm text-[#4A5680]">Appuyez pour prendre une photo</p>
                      <p className="text-xs text-gray-400 mt-1">Optionnel — aide les chineurs à vous repérer</p>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </div>

              {/* Mots-clés */}
              <div>
                <label className="block text-xs font-bold text-[#0D1B4B] uppercase tracking-wider mb-1">
                  <Tag className="w-3.5 h-3.5 inline mr-1" />
                  Ce que vous vendez *
                </label>
                <p className="text-xs text-[#4A5680] mb-2">
                  Tapez ce que vous avez : vinyles, Lego, argenterie, vêtements…
                </p>

                {/* Suggestions rapides */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {KEYWORDS_SUGGESTIONS.filter(s => !keywords.includes(s)).slice(0, 8).map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => addKeyword(s)}
                      className="text-xs bg-[#EEF4FF] text-[#4A5680] rounded-full px-3 py-1 hover:bg-orange-100 hover:text-orange-800 transition-colors"
                    >
                      + {s}
                    </button>
                  ))}
                </div>

                {/* Saisie libre */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ajouter un mot-clé…"
                    value={kwInput}
                    onChange={e => handleKwInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addKeyword(kwInput) } }}
                    disabled={keywords.length >= 20}
                    className="w-full border border-blue-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8651A]"
                  />
                  {suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-blue-100 rounded-xl shadow-lg z-10 overflow-hidden">
                      {suggestions.map(s => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => addKeyword(s)}
                          className="w-full text-left px-4 py-2.5 text-sm hover:bg-orange-50 hover:text-[#E8651A] transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tags sélectionnés */}
                {keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {keywords.map(k => (
                      <span key={k} className="flex items-center gap-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full px-3 py-1">
                        {k}
                        <button type="button" onClick={() => removeKeyword(k)} className="hover:text-orange-900">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    <span className="text-xs text-gray-400 self-center">{keywords.length}/20</span>
                  </div>
                )}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 bg-[#E8651A] hover:bg-[#d4581a] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors"
              >
                {submitting
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Publication…</>
                  : '📣 Publier mon stand'}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
