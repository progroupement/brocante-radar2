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
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0D1B4B]/95 backdrop-blur-md shadow-lg shadow-blue-950/30' : 'bg-[#0D1B4B]'} border-b border-blue-900`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-[#E8651A] rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
            <Radar className="w-4.5 h-4.5 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-black text-sm tracking-widest text-white uppercase">Brocante</span>
            <span className="font-black text-sm tracking-widest text-[#E8651A] uppercase">Radar</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2">
          <Link href="/je-cherche" className="text-sm font-medium text-blue-300 hover:text-white transition-colors px-4 py-2">
            Je cherche
          </Link>
          <Link href="/guide-chineur" className="text-sm font-medium text-blue-300 hover:text-white transition-colors px-4 py-2">
            Guide du chineur
          </Link>
          <Link href="/brocantes-ile-de-france" className="text-sm font-medium text-blue-300 hover:text-white transition-colors px-4 py-2">
            Brocantes IDF
          </Link>
          <Link href="/search" className="text-sm font-medium text-blue-300 hover:text-white transition-colors px-4 py-2">
            Rechercher
          </Link>
          <Link href="/exposant" className="ml-2 bg-[#E8651A] hover:bg-[#d4581a] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
            Publier mon stand
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-blue-800 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-blue-800 bg-[#0D1B4B] px-4 py-4 flex flex-col gap-1">
          <Link href="/je-cherche" onClick={() => setOpen(false)} className="text-sm font-medium text-blue-200 px-3 py-3 rounded-lg hover:bg-blue-800">Je cherche la perle rare</Link>
          <Link href="/guide-chineur" onClick={() => setOpen(false)} className="text-sm font-medium text-blue-200 px-3 py-3 rounded-lg hover:bg-blue-800">Guide du chineur</Link>
          <Link href="/brocantes-ile-de-france" onClick={() => setOpen(false)} className="text-sm font-medium text-blue-200 px-3 py-3 rounded-lg hover:bg-blue-800">Brocantes IDF</Link>
          <Link href="/search" onClick={() => setOpen(false)} className="text-sm font-medium text-blue-200 px-3 py-3 rounded-lg hover:bg-blue-800">Rechercher un objet</Link>
          <Link href="/exposant" onClick={() => setOpen(false)} className="mt-2 bg-[#E8651A] text-white text-sm font-semibold px-4 py-3 rounded-xl text-center">Publier mon stand</Link>
        </div>
      )}
    </nav>
  )
}
