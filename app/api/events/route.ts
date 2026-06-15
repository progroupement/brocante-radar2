import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const departement = searchParams.get('departement')
  const date = searchParams.get('date')
  const scope = searchParams.get('scope') ?? 'upcoming' // upcoming | today | week | all
  const limit = parseInt(searchParams.get('limit') ?? '50')

  const supabase = await createClient()

  let query = supabase
    .from('events')
    .select('*')
    .eq('statut', 'validé')
    .order('date', { ascending: true })
    .limit(limit)

  if (departement) query = query.eq('departement', departement)
  if (date) query = query.eq('date', date)

  const today = new Date().toISOString().split('T')[0]
  if (scope === 'today') {
    query = query.eq('date', today)
  } else if (scope === 'week') {
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    query = query.gte('date', today).lte('date', nextWeek)
  } else if (scope === 'upcoming') {
    query = query.gte('date', today)
  }

  const { data, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ events: data ?? [] })
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const body = await request.json()

  const { data, error } = await supabase
    .from('events')
    .insert(body)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ event: data }, { status: 201 })
}
