import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BrocanteInscription from '@/components/BrocanteInscription'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://amnwcgdqrgmsdgfekrry.supabase.co'
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtbndjZ2Rxcmdtc2RnZmVrcnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1MjUyODMsImV4cCI6MjA5NzEwMTI4M30.Zodk0XBNeOBgiYWrzWXkR6qsdYpgxdUbK-1-etMFiJQ'

type Brocante = {
  id: string
  nom: string
  date_debut: string
  date_fin: string
  ville: string
  dept: string
  adresse: string | null
  type: string
}

async function getBrocante(id: string): Promise<Brocante | null> {
  const url = `${SUPABASE_URL}/rest/v1/brocantes_agenda?id=eq.${id}&select=*&limit=1`
  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_ANON,
      Authorization: `Bearer ${SUPABASE_ANON}`,
    },
    cache: 'no-store',
  })
  if (!res.ok) return null
  const data = await res.json()
  return data[0] ?? null
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const b = await getBrocante(id)
  if (!b) return { title: 'Brocante introuvable' }
  return {
    title: `${b.nom} — ${b.ville} | Brocante Radar`,
    description: `Inscrivez-vous à la brocante ${b.nom} à ${b.ville}. Chineur, exposant ou organisateur — trouvez votre place sur Brocante Radar.`,
  }
}

function formatDateFr(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default async function BrocantePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const brocante = await getBrocante(id)
  if (!brocante) notFound()

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#EEF4FF]">
        <BrocanteInscription brocante={brocante} formatDate={formatDateFr} />
      </main>
      <Footer />
    </>
  )
}
