'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const LAUNCH_DATE = new Date('2026-07-01T00:00:00')

function getTimeLeft() {
  const diff = LAUNCH_DATE.getTime() - Date.now()
  if (diff <= 0) return { jours: 0, heures: 0, minutes: 0, secondes: 0 }
  return {
    jours: Math.floor(diff / (1000 * 60 * 60 * 24)),
    heures: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    secondes: Math.floor((diff / 1000) % 60),
  }
}

function Unit({ value, label }: { value: number | null; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[60px]">
      <span className="text-3xl sm:text-4xl font-bold tabular-nums">
        {value === null ? '--' : String(value).padStart(2, '0')}
      </span>
      <span className="text-xs sm:text-sm opacity-80 uppercase tracking-wide mt-1">{label}</span>
    </div>
  )
}

export default function CountdownBanner() {
  // null = pas encore monté côté client (évite le mismatch hydration)
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null)

  useEffect(() => {
    // Initialisation au premier rendu client
    setTime(getTimeLeft())
    const timer = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="bg-[#E8651A] text-white py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-lg sm:text-xl font-semibold mb-4">
          🚀 Lancement officiel le <strong>1er juillet 2026</strong>
        </p>

        <div className="flex items-center justify-center gap-4 sm:gap-8 mb-6">
          <Unit value={time?.jours ?? null} label="Jours" />
          <span className="text-3xl sm:text-4xl font-bold opacity-60">:</span>
          <Unit value={time?.heures ?? null} label="Heures" />
          <span className="text-3xl sm:text-4xl font-bold opacity-60">:</span>
          <Unit value={time?.minutes ?? null} label="Minutes" />
          <span className="text-3xl sm:text-4xl font-bold opacity-60">:</span>
          <Unit value={time?.secondes ?? null} label="Secondes" />
        </div>

        <Link href="/organizer">
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-[#E8651A] font-semibold"
          >
            Préinscrire ma brocante
          </Button>
        </Link>
      </div>
    </section>
  )
}
