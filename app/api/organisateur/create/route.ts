import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const body = await req.json()
  const { association, nom, email, telephone, adresse, ville, code_postal, date, nb_stands } = body

  if (!nom || !email || !telephone || !adresse || !ville || !date) {
    return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 })
  }

  // Extraire le département depuis le code postal
  const departement = code_postal ? code_postal.substring(0, 2) : '75'

  // 1. Créer l'organisateur
  const { data: organizer, error: orgError } = await supabaseAdmin
    .from('organizers')
    .insert({ association: association || null, nom, email, telephone })
    .select()
    .single()

  if (orgError) {
    return NextResponse.json({ error: 'Erreur création organisateur : ' + orgError.message }, { status: 400 })
  }

  // 2. Créer l'événement avec un QR token unique
  const qr_token = crypto.randomUUID()
  const eventNom = association
    ? `Brocante ${association}`
    : `Brocante organisée par ${nom}`

  const adresseComplete = `${adresse}, ${code_postal} ${ville}`

  const { data: event, error: evtError } = await supabaseAdmin
    .from('events')
    .insert({
      organizer_id: organizer.id,
      nom: eventNom,
      adresse: adresseComplete,
      ville,
      departement,
      code_postal: code_postal || null,
      date,
      nb_stands: nb_stands ? parseInt(nb_stands) : null,
      statut: 'validé',
      qr_token,
    })
    .select()
    .single()

  if (evtError) {
    return NextResponse.json({ error: 'Erreur création événement : ' + evtError.message }, { status: 400 })
  }

  // 3. Notifier par email (non bloquant)
  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    if (RESEND_API_KEY) {
      const dateFormatted = new Date(date + 'T00:00:00').toLocaleDateString('fr-FR', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
      })
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${RESEND_API_KEY}` },
        body: JSON.stringify({
          from: 'Brocante Radar <noreply@brocanteradar.fr>',
          to: ['progroupement@gmail.com'],
          subject: `✅ Nouvelle brocante créée — ${eventNom} (${ville})`,
          html: `<p><strong>${nom}</strong> (${email} / ${telephone}) a créé la brocante <strong>${eventNom}</strong> le <strong>${dateFormatted}</strong> à ${ville}.<br>QR token : <code>${qr_token}</code><br>Stands prévus : ${nb_stands || 'non précisé'}</p>`,
        }),
      })
    }
  } catch {
    // Non bloquant
  }

  return NextResponse.json({ event, organizer, qr_token })
}
