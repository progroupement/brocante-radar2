'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Radar } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'} border-b border-gray-100`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-[#E8651A] rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
            <Radar className="w-4.5 h-4.5 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-black text-sm tracking-widest text-[#1A1A1A] uppercase">Brocante</span>
            <span className="font-black text-sm tracking-widest text-[#E8651A] uppercase">Radar</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2">
          <Link href="/guide-chineur" className="text-sm font-medium text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors px-4 py-2">
            Guide du chineur
          </Link>
          <Link href="/brocantes-ile-de-france" className="text-sm font-medium text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors px-4 py-2">
            Brocantes IDF
          </Link>
          <Link href="/search" className="text-sm font-medium text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors px-4 py-2">
            Rechercher
          </Link>
          <Link href="/exposant" className="ml-2 bg-[#E8651A] hover:bg-[#d4581a] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
            Publier mon stand
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-1">
          <Link href="/guide-chineur" onClick={() => setOpen(false)} className="text-sm font-medium text-[#1A1A1A] px-3 py-3 rounded-lg hover:bg-gray-50">Guide du chineur</Link>
          <Link href="/brocantes-ile-de-france" onClick={() => setOpen(false)} className="text-sm font-medium text-[#1A1A1A] px-3 py-3 rounded-lg hover:bg-gray-50">Brocantes IDF</Link>
          <Link href="/search" onClick={() => setOpen(false)} className="text-sm font-medium text-[#1A1A1A] px-3 py-3 rounded-lg hover:bg-gray-50">Rechercher un objet</Link>
          <Link href="/exposant" onClick={() => setOpen(false)} className="mt-2 bg-[#E8651A] text-white text-sm font-semibold px-4 py-3 rounded-xl text-center">Publier mon stand</Link>
        </div>
      )}
    </nav>
  )
}
