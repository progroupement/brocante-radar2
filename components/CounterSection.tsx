'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase'

function useCountUp(target: number, duration = 1500, active: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active || target === 0) return
    const start = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, active])

  return count
}

function Counter({ value, label, suffix = '' }: { value: number; label: string; suffix?: string; active: boolean }) {
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const count = useCountUp(value, 1500, active)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl sm:text-6xl font-bold text-[#E8651A] tabular-nums">
        {count.toLocaleString('fr-FR')}{suffix}
      </div>
      <div className="mt-2 text-[#6B6B6B] font-medium text-lg">{label}</div>
    </div>
  )
}

export default function CounterSection() {
  const [stats, setStats] = useState({ events: 0, organizers: 0, stands: 0 })

  useEffect(() => {
    const supabase = createClient()
    async function fetchStats() {
      const [{ count: events }, { count: organizers }, { count: stands }] = await Promise.all([
        supabase.from('events').select('*', { count: 'exact', head: true }),
        supabase.from('organizers').select('*', { count: 'exact', head: true }),
        supabase.from('stands').select('*', { count: 'exact', head: true }),
      ])
      setStats({
        events: events ?? 0,
        organizers: organizers ?? 0,
        stands: stands ?? 0,
      })
    }
    fetchStats()
  }, [])

  return (
    <section className="py-20 bg-[#F8F5F0]">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-center text-3xl font-bold mb-12 text-[#1A1A1A]">
          La communauté grandit
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          <Counter value={stats.events} label="Brocantes référencées" active={false} />
          <Counter value={stats.organizers} label="Organisateurs inscrits" active={false} />
          <Counter value={stats.stands} label="Stands enregistrés" active={false} />
        </div>
      </div>
    </section>
  )
}
