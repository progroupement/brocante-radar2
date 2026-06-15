'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, Radar } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#E8651A] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <Radar className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-[#1A1A1A]">
            BROCANTE <span className="text-[#E8651A]">RADAR</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/search">
            <Button variant="ghost" size="sm">Je suis chineur</Button>
          </Link>
          <Link href="/organizer">
            <Button size="sm">Organiser ma brocante</Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-3">
          <Link href="/search" onClick={() => setOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">Je suis chineur</Button>
          </Link>
          <Link href="/organizer" onClick={() => setOpen(false)}>
            <Button className="w-full">Organiser ma brocante</Button>
          </Link>
        </div>
      )}
    </nav>
  )
}
