import { createBrowserClient } from '@supabase/ssr'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://amnwcgdqrgmsdgfekrry.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtbndjZ2Rxcmdtc2RnZmVrcnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1MjUyODMsImV4cCI6MjA5NzEwMTI4M30.Zodk0XBNeOBgiYWrzWXkR6qsdYpgxdUbK-1-etMFiJQ'

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
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
