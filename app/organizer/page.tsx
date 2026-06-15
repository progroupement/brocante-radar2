'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase'
import { DEPARTEMENTS_IDF } from '@/lib/utils'
import { CheckCircle, Loader2 } from 'lucide-react'

const schema = z.object({
  association: z.string().optional(),
  nom: z.string().min(2, 'Le nom est requis (min. 2 caractères)'),
  email: z.string().email('Email invalide'),
  telephone: z.string().optional(),
  nom_brocante: z.string().min(3, 'Nom de la brocante requis'),
  adresse: z.string().min(5, 'Adresse requise'),
  ville: z.string().min(2, 'Ville requise'),
  departement: z.string().min(2, 'Département requis'),
  code_postal: z.string().regex(/^\d{5}$/, 'Code postal invalide'),
  date: z.string().min(1, 'Date requise'),
  nb_stands: z.coerce.number().int().positive().optional(),
})

type FormData = z.infer<typeof schema>

async function geocodeAddress(adresse: string, ville: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const query = encodeURIComponent(`${adresse}, ${ville}, France`)
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`,
      { headers: { 'User-Agent': 'BrocanteRadar/1.0' } }
    )
    const data = await res.json()
    if (data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
    }
  } catch {}
  return null
}

export default function OrganizerPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setLoading(true)
    setError('')
    const supabase = createClient()

    try {
      // 1. Créer ou récupérer l'organisateur
      let organizerId: string

      const { data: existingOrg } = await supabase
        .from('organizers')
        .select('id')
        .eq('email', data.email)
        .single()

      if (existingOrg) {
        organizerId = existingOrg.id
      } else {
        const { data: newOrg, error: orgError } = await supabase
          .from('organizers')
          .insert({
            association: data.association || null,
            nom: data.nom,
            email: data.email,
            telephone: data.telephone || null,
          })
          .select('id')
          .single()

        if (orgError || !newOrg) throw new Error(orgError?.message || 'Erreur création organisateur')
        organizerId = newOrg.id
      }

      // 2. Géocoder l'adresse
      const coords = await geocodeAddress(data.adresse, data.ville)

      // 3. Créer l'événement
      const { data: event, error: eventError } = await supabase
        .from('events')
        .insert({
          organizer_id: organizerId,
          nom: data.nom_brocante,
          adresse: data.adresse,
          ville: data.ville,
          departement: data.departement,
          code_postal: data.code_postal,
          date: data.date,
          nb_stands: data.nb_stands || null,
          lat: coords?.lat || null,
          lng: coords?.lng || null,
        })
        .select('id')
        .single()

      if (eventError || !event) throw new Error(eventError?.message || 'Erreur création événement')

      // 4. Envoyer l'email de confirmation via Resend
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || ''
      await fetch('/api/send-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: data.nom,
          email: data.email,
          nomBrocante: data.nom_brocante,
          date: data.date,
          adresse: data.adresse,
          ville: data.ville,
          qrCodeUrl: `${appUrl}/organizer/${event.id}/qrcode`,
          dashboardUrl: `${appUrl}/organizer/${event.id}/dashboard`,
        }),
      })

      // 5. Redirection vers le QR code
      router.push(`/organizer/${event.id}/qrcode`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#F8F5F0] min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-12">
          {/* En-tête */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-[#E8651A] text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <CheckCircle className="w-4 h-4" />
              Inscription gratuite
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-3">
              Organisez votre brocante
            </h1>
            <p className="text-[#6B6B6B] text-lg">
              Inscrivez votre événement et recevez votre QR code pour les exposants.
            </p>
          </div>

          {/* Formulaire */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Section organisateur */}
              <div>
                <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-100">
                  Vos informations
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="association">Nom de l'association <span className="text-gray-400 font-normal">(optionnel)</span></Label>
                    <Input id="association" placeholder="Ex : Amicale de Montrouge" className="mt-1.5" {...register('association')} />
                  </div>
                  <div>
                    <Label htmlFor="nom">Nom et prénom <span className="text-red-500">*</span></Label>
                    <Input id="nom" placeholder="Marie Dupont" className="mt-1.5" {...register('nom')} />
                    {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom.message}</p>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                      <Input id="email" type="email" placeholder="marie@exemple.fr" className="mt-1.5" {...register('email')} />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="telephone">Téléphone</Label>
                      <Input id="telephone" placeholder="06 12 34 56 78" className="mt-1.5" {...register('telephone')} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section événement */}
              <div>
                <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-100">
                  Votre brocante
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nom_brocante">Nom de la brocante <span className="text-red-500">*</span></Label>
                    <Input id="nom_brocante" placeholder="Grande Brocante de Vincennes" className="mt-1.5" {...register('nom_brocante')} />
                    {errors.nom_brocante && <p className="text-red-500 text-xs mt-1">{errors.nom_brocante.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="adresse">Adresse <span className="text-red-500">*</span></Label>
                    <Input id="adresse" placeholder="12 avenue de la République" className="mt-1.5" {...register('adresse')} />
                    {errors.adresse && <p className="text-red-500 text-xs mt-1">{errors.adresse.message}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="code_postal">Code postal <span className="text-red-500">*</span></Label>
                      <Input id="code_postal" placeholder="75011" className="mt-1.5" {...register('code_postal')} />
                      {errors.code_postal && <p className="text-red-500 text-xs mt-1">{errors.code_postal.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="ville">Ville <span className="text-red-500">*</span></Label>
                      <Input id="ville" placeholder="Paris" className="mt-1.5" {...register('ville')} />
                      {errors.ville && <p className="text-red-500 text-xs mt-1">{errors.ville.message}</p>}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="departement">Département <span className="text-red-500">*</span></Label>
                    <select
                      id="departement"
                      className="mt-1.5 flex h-11 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8651A]"
                      {...register('departement')}
                    >
                      <option value="">Sélectionner un département</option>
                      {DEPARTEMENTS_IDF.map((d) => (
                        <option key={d.code} value={d.code}>{d.code} — {d.nom}</option>
                      ))}
                    </select>
                    {errors.departement && <p className="text-red-500 text-xs mt-1">{errors.departement.message}</p>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date de la brocante <span className="text-red-500">*</span></Label>
                      <Input id="date" type="date" className="mt-1.5" {...register('date')} />
                      {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="nb_stands">Nombre de stands estimé</Label>
                      <Input id="nb_stands" type="number" placeholder="50" className="mt-1.5" {...register('nb_stands')} />
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Inscription en cours...</>
                ) : (
                  'Inscrire ma brocante et obtenir mon QR code →'
                )}
              </Button>

              <p className="text-xs text-center text-gray-400">
                Inscription gratuite · Votre QR code sera disponible immédiatement
              </p>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
