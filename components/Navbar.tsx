'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import Logo from '@/components/Logo'
import { Menu, X, ChevronDown } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [blogOpen, setBlogOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const blogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (blogRef.current && !blogRef.current.contains(e.target as Node)) {
        setBlogOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0D1B4B]/95 backdrop-blur-md shadow-lg shadow-blue-950/30' : 'bg-[#0D1B4B]'} border-b border-blue-900`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Logo variant="light" className="h-10 w-auto transition-opacity group-hover:opacity-90" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0.5">
          <Link href="/je-cherche" className="text-xs font-medium text-blue-300 hover:text-white transition-colors px-2.5 py-2 whitespace-nowrap">
            Je cherche
          </Link>
          <Link href="/brocantes-ile-de-france" className="text-xs font-medium text-blue-300 hover:text-white transition-colors px-2.5 py-2 whitespace-nowrap">
            Brocantes IDF
          </Link>
          <Link href="/search" className="text-xs font-medium text-blue-300 hover:text-white transition-colors px-2.5 py-2 whitespace-nowrap">
            Rechercher
          </Link>

          {/* Menu Blog */}
          <div ref={blogRef} className="relative">
            <button
              onClick={() => setBlogOpen(!blogOpen)}
              className="flex items-center gap-1 text-xs font-medium text-blue-300 hover:text-white transition-colors px-2.5 py-2 whitespace-nowrap"
            >
              Blog <ChevronDown className={`w-3 h-3 transition-transform ${blogOpen ? 'rotate-180' : ''}`} />
            </button>
            {blogOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-blue-100 py-2 z-50">
                <Link href="/blog-chineur" onClick={() => setBlogOpen(false)} className="block px-4 py-2.5 hover:bg-[#EEF4FF] transition-colors">
                  <p className="font-bold text-[#0D1B4B] text-sm">Blog du chineur</p>
                </Link>
                <div className="border-t border-blue-50 mx-2 my-0.5" />
                <Link href="/blog-collectionneur" onClick={() => setBlogOpen(false)} className="block px-4 py-2.5 hover:bg-[#EEF4FF] transition-colors">
                  <p className="font-bold text-[#0D1B4B] text-sm">Blog du collectionneur</p>
                </Link>
                <div className="border-t border-blue-50 mx-2 my-0.5" />
                <Link href="/actualites" onClick={() => setBlogOpen(false)} className="block px-4 py-2.5 hover:bg-[#EEF4FF] transition-colors">
                  <p className="font-bold text-[#0D1B4B] text-sm">Actualités brocante</p>
                </Link>
                <div className="border-t border-blue-50 mx-2 my-0.5" />
                <Link href="/blog-organisateur" onClick={() => setBlogOpen(false)} className="block px-4 py-2.5 hover:bg-[#EEF4FF] transition-colors">
                  <p className="font-bold text-[#0D1B4B] text-sm">Blog de l&apos;organisateur</p>
                </Link>
              </div>
            )}
          </div>

          <Link href="/exposant/connexion" className="text-xs font-medium text-blue-300 hover:text-white transition-colors px-2.5 py-2 whitespace-nowrap">
            Mon espace
          </Link>
          <Link href="/exposant/inscription" className="ml-1 bg-[#E8651A] hover:bg-[#d4581a] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap">
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
          <div className="border-t border-blue-800 pt-2 mt-1">
            <p className="text-xs text-blue-500 px-3 pb-2 font-semibold uppercase tracking-wider">Blog</p>
            <Link href="/blog-chineur" onClick={() => setOpen(false)} className="text-sm font-medium text-blue-200 px-3 py-3 rounded-lg hover:bg-blue-800 block">Blog du chineur</Link>
            <Link href="/blog-collectionneur" onClick={() => setOpen(false)} className="text-sm font-medium text-blue-200 px-3 py-3 rounded-lg hover:bg-blue-800 block">Blog du collectionneur</Link>
            <Link href="/actualites" onClick={() => setOpen(false)} className="text-sm font-medium text-blue-200 px-3 py-3 rounded-lg hover:bg-blue-800 block">Actualités brocante</Link>
            <Link href="/blog-organisateur" onClick={() => setOpen(false)} className="text-sm font-medium text-blue-200 px-3 py-3 rounded-lg hover:bg-blue-800 block">Blog de l&apos;organisateur</Link>
          </div>
          <Link href="/exposant/connexion" onClick={() => setOpen(false)} className="text-sm font-medium text-blue-200 px-3 py-3 rounded-lg hover:bg-blue-800 block">Mon espace exposant</Link>
          <Link href="/exposant/inscription" onClick={() => setOpen(false)} className="mt-2 bg-[#E8651A] text-white text-sm font-semibold px-4 py-3 rounded-xl text-center block">Publier mon stand</Link>
        </div>
      )}
    </nav>
  )
}
