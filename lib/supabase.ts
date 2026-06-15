import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Types utilitaires
export type Organizer = {
  id: string
  association?: string
  nom: string
  email: string
  telephone?: string
  created_at: string
}

export type Event = {
  id: string
  organizer_id: string
  nom: string
  adresse: string
  ville: string
  departement: string
  code_postal?: string
  date: string
  nb_stands?: number
  statut: 'en_attente' | 'validé' | 'annulé'
  qr_token: string
  lat?: number
  lng?: number
  created_at: string
}

export type Stand = {
  id: string
  event_id: string
  nom_exposant?: string
  numero_stand: string
  photo_url?: string
  created_at: string
}

export type Keyword = {
  id: string
  stand_id: string
  label: string
}

export type StandWithKeywords = Stand & {
  keywords: string[]
  event_nom: string
  event_adresse: string
  event_date: string
  event_ville: string
  event_lat?: number
  event_lng?: number
}
