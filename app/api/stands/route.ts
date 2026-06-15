import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const eventId = searchParams.get('event_id')

  const supabase = await createClient()

  let query = supabase
    .from('stands')
    .select(`
      *,
      keywords (label),
      events!inner (nom, date, adresse, ville)
    `)
    .order('created_at', { ascending: false })

  if (eventId) query = query.eq('event_id', eventId)

  const { data, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ stands: data ?? [] })
}
