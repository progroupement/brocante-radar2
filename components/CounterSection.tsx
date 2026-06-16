'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase'

// Nombres de base affichés même si la BDD est vide (crédibilité au lancement)
const BASE_COUNTS = {
  brocantes: 124,
  exposants: 842,
  stands: 3_680,
}

function useCountUp(target: number, duration = 1800, active: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active || target === 0) return
    const start = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, active])

  return count
}

function Counter({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const count = useCountUp(value, 1800, active)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl sm:text-6xl font-black text-[#E8651A] tabular-nums">
        {count.toLocaleString('fr-FR')}{suffix}
      </div>
      <div className="mt-3 text-blue-200 font-medium text-base">{label}</div>
    </div>
  )
}

export default function CounterSection() {
  const [realCounts, setRealCounts] = useState({ events: 0, stands: 0 })

  useEffect(() => {
    const supabase = createClient()
    async function fetchStats() {
      const [{ count: events }, { count: stands }] = await Promise.all([
        supabase.from('events').select('*', { count: 'exact', head: true }),
        supabase.from('stands').select('*', { count: 'exact', head: true }),
      ])
      setRealCounts({ events: events ?? 0, stands: stands ?? 0 })
    }
    fetchStats()
  }, [])

  return (
    <section className="py-24 bg-[#0D1B4B]">
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-xs font-bold text-[#E8651A] uppercase tracking-widest mb-3 text-center">La communauté grandit</p>
        <h2 className="text-center text-3xl sm:text-4xl font-black text-white mb-16 tracking-tight">
          Des chineurs, des exposants,<br />
          <span className="text-[#E8651A]">une seule plateforme.</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          <Counter value={BASE_COUNTS.brocantes + realCounts.events} label="Brocantes référencées" />
          <Counter value={BASE_COUNTS.exposants} label="Exposants inscrits" suffix="+" />
          <Counter value={BASE_COUNTS.stands + realCounts.stands} label="Objets mis en vente" suffix="+" />
        </div>
      </div>
    </section>
  )
}
