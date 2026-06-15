'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient, type Event } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { KEYWORDS_SUGGESTIONS } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import { Loader2, X, Camera, CheckCircle, MapPin, CalendarDays } from 'lucide-react'

export default function StandPage() {
  const { token } = useParams<{ token: string }>()
  const router = useRouter()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [success, setSuccess] = useState(false)
  const [standId, setStandId] = useState('')

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
      // 1. Upload photo
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

      // 2. Créer le stand
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

      // 3. Insérer les mots-clés
      await supabase.from('keywords').insert(
        keywords.map((label) => ({ stand_id: stand.id, label }))
      )

      setStandId(stand.id)
      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
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

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold mb-2">QR code invalide</h1>
          <p className="text-[#6B6B6B]">Ce lien ne correspond à aucune brocante. Demandez le bon QR code à l'organisateur.</p>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#F8F5F0] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-sm w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Stand publié ! 🎉</h1>
          <p className="text-[#6B6B6B] mb-6">
            Votre stand <strong className="font-mono text-[#1A1A1A]">{numeroStand}</strong> est visible par tous les visiteurs.
          </p>
          <div className="bg-[#F8F5F0] rounded-xl p-4 text-left text-sm mb-6">
            <p className="font-medium mb-2">Mots-clés publiés :</p>
            <div className="flex flex-wrap gap-1.5">
              {keywords.map((k) => (
                <span key={k} className="bg-orange-100 text-orange-800 rounded-full px-2 py-0.5 text-xs font-medium">{k}</span>
              ))}
            </div>
          </div>
          <button
            onClick={() => {
              setSuccess(false)
              setNomExposant('')
              setNumeroStand('')
              setPhoto(null)
              setPhotoPreview('')
              setKeywords([])
              setStandId('')
            }}
            className="text-sm text-[#E8651A] hover:underline"
          >
            Modifier mon stand
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* En-tête brocante */}
      <div className="bg-[#E8651A] text-white px-4 py-6">
        <div className="max-w-lg mx-auto">
          <p className="text-orange-200 text-xs font-medium uppercase tracking-wider mb-1">Brocante</p>
          <h1 className="text-xl font-bold">{event!.nom}</h1>
          <div className="flex flex-col sm:flex-row gap-2 mt-2 text-orange-100 text-sm">
            <span className="flex items-center gap-1">
              <CalendarDays className="w-3.5 h-3.5" />
              {formatDate(event!.date)}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {event!.ville}
            </span>
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h2 className="text-xl font-bold mb-1">Publiez votre stand</h2>
          <p className="text-[#6B6B6B] text-sm mb-6">Les visiteurs vous trouveront en cherchant vos objets.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nom exposant */}
            <div>
              <Label htmlFor="nom">Votre nom ou pseudo</Label>
              <Input
                id="nom"
                placeholder="Marie, Brocante Vintage, ..."
                className="mt-1.5"
                value={nomExposant}
                onChange={(e) => setNomExposant(e.target.value)}
              />
            </div>

            {/* Numéro stand */}
            <div>
              <Label htmlFor="numero">Numéro de stand <span className="text-red-500">*</span></Label>
              <Input
                id="numero"
                placeholder="14 · B-7 · Allée C stand 3"
                className="mt-1.5 font-mono text-base"
                value={numeroStand}
                onChange={(e) => setNumeroStand(e.target.value)}
              />
            </div>

            {/* Photo */}
            <div>
              <Label>Photo de votre stand</Label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="mt-1.5 border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center cursor-pointer hover:border-[#E8651A] hover:bg-orange-50 transition-colors"
              >
                {photoPreview ? (
                  <img src={photoPreview} alt="Aperçu" className="w-full max-h-40 object-cover rounded-lg" />
                ) : (
                  <>
                    <Camera className="w-8 h-8 text-gray-300 mb-2" />
                    <p className="text-sm text-[#6B6B6B]">Appuyez pour prendre une photo</p>
                    <p className="text-xs text-gray-400 mt-1">Optionnel — aide les visiteurs à vous repérer</p>
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
              <Label>Ce que vous vendez <span className="text-red-500">*</span></Label>
              <p className="text-xs text-[#6B6B6B] mb-2 mt-0.5">Maximum 20 mots-clés · Les visiteurs cherchent par ces termes</p>

              {/* Suggestions rapides */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {KEYWORDS_SUGGESTIONS.filter(s => !keywords.includes(s)).slice(0, 8).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => addKeyword(s)}
                    className="text-xs bg-gray-100 text-[#6B6B6B] rounded-full px-3 py-1 hover:bg-orange-100 hover:text-orange-800 transition-colors"
                  >
                    + {s}
                  </button>
                ))}
              </div>

              {/* Saisie libre */}
              <div className="relative">
                <Input
                  placeholder="Saisir un mot-clé..."
                  value={kwInput}
                  onChange={(e) => handleKwInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') { e.preventDefault(); addKeyword(kwInput) }
                  }}
                  disabled={keywords.length >= 20}
                />
                {suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
                    {suggestions.map((s) => (
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
                  {keywords.map((k) => (
                    <span
                      key={k}
                      className="flex items-center gap-1 bg-orange-100 text-orange-800 rounded-full px-3 py-1 text-xs font-medium"
                    >
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
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full h-12 text-base" disabled={submitting}>
              {submitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Publication en cours...</>
              ) : (
                '📣 Publier mon stand'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
