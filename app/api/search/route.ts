import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.trim()
  const eventId = searchParams.get('event_id')
  const scope = searchParams.get('scope') ?? 'today' // today | week | all

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [], error: 'Terme trop court' }, { status: 400 })
  }

  const supabase = await createClient()

  // Construire la requête — Supabase ne supporte pas ILIKE sur JOIN directement,
  // on utilise donc une RPC ou une requête en deux temps.
  // Ici on requête via le client JS en filtrant sur keywords.label puis en
  // récupérant les stands associés.

  // 1. Trouver les stand_id qui ont un keyword matching
  let kwQuery = supabase
    .from('keywords')
    .select('stand_id, label')
    .ilike('label', `%${q}%`)
    .limit(200)

  const { data: matchingKw, error: kwError } = await kwQuery

  if (kwError) {
    return NextResponse.json({ error: kwError.message }, { status: 500 })
  }

  if (!matchingKw || matchingKw.length === 0) {
    return NextResponse.json({ results: [] })
  }

  const standIds = [...new Set(matchingKw.map((k) => k.stand_id))]

  // 2. Récupérer les stands avec leur événement
  let standsQuery = supabase
    .from('stands')
    .select(`
      id, nom_exposant, numero_stand, photo_url,
      events!inner (
        id, nom, adresse, ville, date, lat, lng, statut
      )
    `)
    .in('id', standIds)
    .eq('events.statut', 'validé')

  // Filtre temporel
  const today = new Date().toISOString().split('T')[0]
  if (scope === 'today') {
    standsQuery = standsQuery.eq('events.date', today)
  } else if (scope === 'week') {
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    standsQuery = standsQuery.gte('events.date', today).lte('events.date', nextWeek)
  }

  // Filtre par événement spécifique
  if (eventId) {
    standsQuery = standsQuery.eq('events.id', eventId)
  }

  const { data: stands, error: standsError } = await standsQuery

  if (standsError) {
    return NextResponse.json({ error: standsError.message }, { status: 500 })
  }

  // 3. Pour chaque stand, récupérer tous ses keywords
  const allStandIds = stands?.map((s) => s.id) ?? []

  const { data: allKeywords } = await supabase
    .from('keywords')
    .select('stand_id, label')
    .in('stand_id', allStandIds)

  const kwByStand: Record<string, string[]> = {}
  allKeywords?.forEach((k) => {
    if (!kwByStand[k.stand_id]) kwByStand[k.stand_id] = []
    kwByStand[k.stand_id].push(k.label)
  })

  // 4. Construire les résultats enrichis
  const results = (stands ?? []).map((stand) => {
    const event = Array.isArray(stand.events) ? stand.events[0] : stand.events
    return {
      id: stand.id,
      nom_exposant: stand.nom_exposant,
      numero_stand: stand.numero_stand,
      photo_url: stand.photo_url,
      keywords: kwByStand[stand.id] ?? [],
      event_id: event?.id,
      event_nom: event?.nom,
      event_adresse: event?.adresse,
      event_ville: event?.ville,
      event_date: event?.date,
      event_lat: event?.lat,
      event_lng: event?.lng,
    }
  })

  // ── Recherche dans agenda_stands (exposants comptes) ──────────────────────

  const { data: agendaKw } = await supabase
    .from('agenda_keywords')
    .select('stand_id, label')
    .ilike('label', `%${q}%`)
    .limit(200)

  if (agendaKw && agendaKw.length > 0) {
    const agendaStandIds = [...new Set(agendaKw.map(k => k.stand_id))]

    const { data: agendaStands } = await supabase
      .from('agenda_stands')
      .select(`
        id, photo_url,
        inscriptions_brocante!inner (
          exposant_id,
          brocantes_agenda!inner (
            id, nom, adresse, ville, date_debut, date_fin
          ),
          exposant_profiles (nom)
        )
      `)
      .in('id', agendaStandIds)
      .eq('actif', true)

    if (agendaStands) {
      // Récupérer tous les keywords pour ces stands
      const { data: agendaAllKw } = await supabase
        .from('agenda_keywords')
        .select('stand_id, label')
        .in('stand_id', agendaStandIds)

      const agendaKwByStand: Record<string, string[]> = {}
      agendaAllKw?.forEach(k => {
        if (!agendaKwByStand[k.stand_id]) agendaKwByStand[k.stand_id] = []
        agendaKwByStand[k.stand_id].push(k.label)
      })

      for (const as of agendaStands) {
        const insc = Array.isArray(as.inscriptions_brocante) ? as.inscriptions_brocante[0] : as.inscriptions_brocante
        const brocante = Array.isArray(insc?.brocantes_agenda) ? insc.brocantes_agenda[0] : insc?.brocantes_agenda
        const profil = Array.isArray(insc?.exposant_profiles) ? insc.exposant_profiles[0] : insc?.exposant_profiles

        // Filtre temporel sur date_debut
        if (brocante?.date_debut) {
          if (scope === 'today' && brocante.date_debut !== today) continue
          if (scope === 'week') {
            const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            if (brocante.date_debut < today || brocante.date_debut > nextWeek) continue
          }
        }

        results.push({
          id: as.id,
          nom_exposant: profil?.nom ?? null,
          numero_stand: null,
          photo_url: as.photo_url ?? null,
          keywords: agendaKwByStand[as.id] ?? [],
          event_id: brocante?.id ?? null,
          event_nom: brocante?.nom ?? null,
          event_adresse: brocante?.adresse ?? null,
          event_ville: brocante?.ville ?? null,
          event_date: brocante?.date_debut ?? null,
          event_lat: null,
          event_lng: null,
        })
      }
    }
  }

  // 5. Trier : les keywords qui matchent exactement en premier
  const qLower = q.toLowerCase()
  results.sort((a, b) => {
    const aExact = a.keywords.some((k) => k.toLowerCase() === qLower) ? 0 : 1
    const bExact = b.keywords.some((k) => k.toLowerCase() === qLower) ? 0 : 1
    return aExact - bExact
  })

  return NextResponse.json({ results, total: results.length })
}
