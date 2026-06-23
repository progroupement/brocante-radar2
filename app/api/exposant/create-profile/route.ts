import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  // Initialisation ici pour éviter l'erreur au build (env vars absentes à ce stade)
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  try {
    const { userId, nom, telephone } = await req.json()

    if (!userId || !nom) {
      return NextResponse.json({ error: 'userId et nom requis' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('exposant_profiles')
      .insert({ id: userId, nom: nom.trim(), telephone: telephone?.trim() || null })

    if (error) {
      // Si le profil existe déjà, ce n'est pas une erreur
      if (error.code === '23505') {
        return NextResponse.json({ ok: true })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
