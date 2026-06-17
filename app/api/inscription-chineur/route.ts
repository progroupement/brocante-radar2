import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://amnwcgdqrgmsdgfekrry.supabase.co'
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtbndjZ2Rxcmdtc2RnZmVrcnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1MjUyODMsImV4cCI6MjA5NzEwMTI4M30.Zodk0XBNeOBgiYWrzWXkR6qsdYpgxdUbK-1-etMFiJQ'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { prenom, email, departement, objet_recherche, notifications } = body

    if (!prenom || !email) {
      return NextResponse.json({ error: 'Prénom et email requis' }, { status: 400 })
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

    const { error } = await supabase.from('profils_chineurs').insert({
      prenom,
      email,
      departement: departement || null,
      objet_recherche: objet_recherche || null,
      notifications: notifications ?? false,
    })

    if (error) {
      console.error('Supabase error:', error)
      // Si la table n'existe pas encore, on retourne quand même succès
      if (error.code === '42P01') {
        return NextResponse.json({ success: true, warning: 'table_missing' })
      }
      return NextResponse.json({ error: 'Erreur lors de l\'inscription' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
