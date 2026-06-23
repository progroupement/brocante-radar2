'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import { createClient, type Event } from '@/lib/supabase'
import { KEYWORDS_SUGGESTIONS } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import {
  Loader2, X, Camera, CheckCircle, MapPin, CalendarDays,
  RotateCcw, Tag, ArrowRight, ImagePlus
} from 'lucide-react'

export default function StandPage() {
  const { token } = useParams<{ token: string }>()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [success, setSuccess] = useState(false)

  // Formulaire
  const [nomExposant, setNomExposant] = useState('')
  const [numeroStand, setNumeroStand] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState('')
  const [keywords, setKeywords] = useState<string[]>([])
  const [kwInput, setKwInput] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('events')
      .select('*')
      .eq('qr_token', token)
      .single()
      .then(({ data }) => {
        if (data) setEvent(data)
        else setNotFound(true)
        setLoading(false)
      })
  }, [token])

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPhoto(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  function removePhoto() {
    setPhoto(null)
    setPhotoPreview('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function addKeyword(label: string) {
    const trimmed = label.trim()
    if (!trimmed || keywords.includes(trimmed) || keywords.length >= 20) return
    setKeywords([...keywords, trimmed])
    setKwInput('')
    setSuggestions([])
  }

  function removeKeyword(label: string) {
    setKeywords(keywords.filter((k) => k !== label))
  }

  function handleKwInput(value: string) {
    setKwInput(value)
    if (value.length >= 1) {
      const filtered = KEYWORDS_SUGGESTIONS.filter(
        (s) => s.toLowerCase().includes(value.toLowerCase()) && !keywords.includes(s)
      )
      setSuggestions(filtered.slice(0, 6))
    } else {
      setSuggestions([])
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!event) return
    if (!numeroStand.trim()) { setError('Le numéro de stand est requis'); return }
    if (keywords.length === 0) { setError('Ajoutez au moins un mot-clé'); return }

    setSubmitting(true)
    setError('')
    const supabase = createClient()

    try {
      let photoUrl: string | null = null
      if (photo) {
        const ext = photo.name.split('.').pop()
        const filename = `${event.id}_${Date.now()}.${ext}`
        const { error: uploadError } = await supabase.storage
          .from('stands-photos')
          .upload(filename, photo, { upsert: true })
        if (!uploadError) {
          const { data: urlData } = supabase.storage
            .from('stands-photos')
            .getPublicUrl(filename)
          photoUrl = urlData.publicUrl
        }
      }

      const { data: stand, error: standError } = await supabase
        .from('stands')
        .insert({
          event_id: event.id,
          nom_exposant: nomExposant || null,
          numero_stand: numeroStand,
          photo_url: photoUrl,
        })
        .select('id')
        .single()

      if (standError || !stand) throw new Error(standError?.message)

      await supabase.from('keywords').insert(
        keywords.map((label) => ({ stand_id: stand.id, label }))
      )

      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setSubmitting(false)
    }
  }

  /* ── États : loading / not found / success ── */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D1B4B] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#E8651A]" />
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-[#0D1B4B] flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5 text-3xl">
            🔍
          </div>
          <h1 className="text-2xl font-black text-white mb-3">QR code invalide</h1>
          <p className="text-blue-300 text-sm leading-relaxed">
            Ce lien ne correspond à aucune brocante. Demandez le bon QR code à l&apos;organisateur.
          </p>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#0D1B4B] flex items-center justify-center p-6">
        <div className="max-w-sm w-full text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black text-white mb-3">Stand publié !</h1>
          <p className="text-blue-300 mb-6 text-sm leading-relaxed">
            Votre stand <strong className="text-white font-mono text-base">{numeroStand}</strong> est maintenant visible par tous les chineurs.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left mb-8">
            <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider mb-3">Vos mots-clés</p>
            <div className="flex flex-wrap gap-2">
              {keywords.map((k) => (
                <span key={k} className="bg-[#E8651A]/20 text-orange-300 rounded-full px-3 py-1 text-sm font-medium border border-[#E8651A]/30">
                  {k}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => {
              setSuccess(false)
              setNomExposant('')
              setNumeroStand('')
              removePhoto()
              setKeywords([])
            }}
            className="text-sm text-blue-300 hover:text-white transition-colors flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-4 h-4" /> Modifier mon stand
          </button>
        </div>
      </div>
    )
  }

  /* ── Formulaire principal ── */

  return (
    <div className="min-h-screen bg-[#0D1B4B]">

      {/* Header brocante */}
      <div className="bg-[#060D26] border-b border-white/10 px-4 py-5">
        <div className="max-w-lg mx-auto flex items-start gap-4">
          <div className="w-11 h-11 bg-[#E8651A] rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider mb-0.5">Brocante</p>
            <h1 className="text-lg font-black text-white leading-snug">{event!.nom}</h1>
            <div className="flex flex-wrap gap-3 mt-1.5 text-blue-300 text-xs">
              <span className="flex items-center gap-1">
                <CalendarDays className="w-3 h-3" />{formatDate(event!.date)}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />{event!.ville}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <div className="max-w-lg mx-auto px-4 py-8 space-y-5">

        <div>
          <h2 className="text-2xl font-black text-white mb-1">Publiez votre stand</h2>
          <p className="text-blue-400 text-sm">Les chineurs vous trouvent avant d&apos;arriver.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* ── Photo — zone large et tactile ── */}
          <div>
            <label className="text-sm font-semibold text-blue-200 mb-2 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-[#E8651A]" /> Photo de votre stand
              <span className="text-blue-500 font-normal ml-1">— optionnel</span>
            </label>

            {!photoPreview ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-white/5 border-2 border-dashed border-white/20 hover:border-[#E8651A] hover:bg-[#E8651A]/5 rounded-2xl transition-all"
                style={{ minHeight: '180px' }}
              >
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                    <ImagePlus className="w-8 h-8 text-white/40" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold text-base">Prendre une photo</p>
                    <p className="text-blue-400 text-sm mt-1">Appuyez pour ouvrir l&apos;appareil photo</p>
                  </div>
                </div>
              </button>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#E8651A]/50">
                <img
                  src={photoPreview}
                  alt="Aperçu stand"
                  className="w-full object-cover"
                  style={{ maxHeight: '280px' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-3 left-3 flex items-center gap-2 bg-white/90 hover:bg-white text-[#0D1B4B] font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors shadow-lg"
                >
                  <RotateCcw className="w-4 h-4" /> Reprendre
                </button>
                <button
                  type="button"
                  onClick={removePhoto}
                  className="absolute top-3 right-3 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-xl flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </div>

          {/* ── Numéro de stand ── */}
          <div>
            <label htmlFor="numero" className="text-sm font-semibold text-blue-200 mb-2 flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-[#E8651A]" /> Numéro de stand <span className="text-[#E8651A]">*</span>
            </label>
            <input
              id="numero"
              type="text"
              placeholder="Ex : 14 · B-7 · Allée C stand 3"
              value={numeroStand}
              onChange={(e) => setNumeroStand(e.target.value)}
              className="w-full bg-white/5 border border-white/20 focus:border-[#E8651A] focus:ring-2 focus:ring-[#E8651A]/20 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-base font-mono outline-none transition-all"
            />
          </div>

          {/* ── Nom exposant ── */}
          <div>
            <label htmlFor="nom" className="text-sm font-semibold text-blue-200 mb-2 block">
              Votre nom ou pseudo <span className="text-blue-500 font-normal">— optionnel</span>
            </label>
            <input
              id="nom"
              type="text"
              placeholder="Marie, Brocante Vintage, ..."
              value={nomExposant}
              onChange={(e) => setNomExposant(e.target.value)}
              className="w-full bg-white/5 border border-white/20 focus:border-[#E8651A] focus:ring-2 focus:ring-[#E8651A]/20 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-base outline-none transition-all"
            />
          </div>

          {/* ── Mots-clés ── */}
          <div>
            <label className="text-sm font-semibold text-blue-200 mb-1 flex items-center gap-1.5">
              Ce que vous vendez <span className="text-[#E8651A]">*</span>
            </label>
            <p className="text-xs text-blue-400 mb-3">Les chineurs cherchent par ces termes · max 20</p>

            {/* Suggestions rapides */}
            <div className="flex flex-wrap gap-2 mb-3">
              {KEYWORDS_SUGGESTIONS.filter(s => !keywords.includes(s)).slice(0, 10).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => addKeyword(s)}
                  className="text-sm bg-white/10 text-blue-200 border border-white/10 rounded-full px-3 py-1.5 hover:bg-[#E8651A]/20 hover:text-orange-300 hover:border-[#E8651A]/30 transition-all"
                >
                  + {s}
                </button>
              ))}
            </div>

            {/* Saisie libre */}
            <div className="relative">
              <input
                type="text"
                placeholder="Ou tapez un mot-clé..."
                value={kwInput}
                onChange={(e) => handleKwInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') { e.preventDefault(); addKeyword(kwInput) }
                }}
                disabled={keywords.length >= 20}
                className="w-full bg-white/5 border border-white/20 focus:border-[#E8651A] rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none transition-all"
              />
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#0D1B4B] border border-white/10 rounded-xl shadow-2xl z-20 overflow-hidden">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => addKeyword(s)}
                      className="w-full text-left px-4 py-3 text-sm text-blue-200 hover:bg-white/5 hover:text-white transition-colors border-b border-white/5 last:border-0"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Tags sélectionnés */}
            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {keywords.map((k) => (
                  <span key={k} className="flex items-center gap-1.5 bg-[#E8651A]/20 text-orange-300 border border-[#E8651A]/30 rounded-full px-3 py-1.5 text-sm font-medium">
                    {k}
                    <button type="button" onClick={() => removeKeyword(k)} className="hover:text-white transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <span className="text-xs text-blue-500 self-center">{keywords.length}/20</span>
              </div>
            )}
          </div>

          {/* Erreur */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Bouton submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#E8651A] hover:bg-[#d4581a] disabled:opacity-50 text-white font-black text-base px-6 py-4 rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#E8651A]/20 mt-2"
          >
            {submitting ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Publication en cours...</>
            ) : (
              <>Publier mon stand <ArrowRight className="w-5 h-5" /></>
            )}
          </button>

        </form>
      </div>
    </div>
  )
}
