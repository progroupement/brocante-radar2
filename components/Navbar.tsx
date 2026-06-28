'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import Logo from '@/components/Logo'
import { Menu, X, ChevronDown } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [blogOpen, setBlogOpen] = useState(false)
  const [espaceOpen, setEspaceOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const blogRef = useRef<HTMLDivElement>(null)
  const espaceRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (blogRef.current && !blogRef.current.contains(e.target as Node)) setBlogOpen(false)
      if (espaceRef.current && !espaceRef.current.contains(e.target as Node)) setEspaceOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0D1B4B]/95 backdrop-blur-md shadow-lg shadow-blue-950/30' : 'bg-[#0D1B4B]'} border-b border-blue-900`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center group shrink-0 py-3">
          <Logo variant="light" className="h-10 w-auto transition-opacity group-hover:opacity-90" />
        </Link>

        {/* Desktop nav — centré + bouton CTA inclus dans le groupe central */}
        <div className="hidden md:flex items-center justify-center flex-1 gap-1 px-4">
          <Link href="/" className="text-sm font-semibold text-blue-300 hover:text-white transition-colors px-3 py-2 whitespace-nowrap rounded-lg hover:bg-white/5">
            Accueil
          </Link>
          <Link href="/brocantes-ile-de-france" className="text-sm font-semibold text-blue-300 hover:text-white transition-colors px-3 py-2 whitespace-nowrap rounded-lg hover:bg-white/5">
            Brocantes IDF
          </Link>
          <Link href="/search" className="text-sm font-semibold text-blue-300 hover:text-white transition-colors px-3 py-2 whitespace-nowrap rounded-lg hover:bg-white/5">
            Rechercher
          </Link>

          {/* Séparateur */}
          <span className="w-px h-4 bg-blue-700 mx-1" />

          {/* Blogs dropdown — 3 blogs seulement */}
          <div ref={blogRef} className="relative">
            <button
              onClick={() => { setBlogOpen(!blogOpen); setEspaceOpen(false) }}
              className="flex items-center gap-1 text-sm font-semibold text-blue-300 hover:text-white transition-colors px-3 py-2 whitespace-nowrap rounded-lg hover:bg-white/5"
            >
              Blogs <ChevronDown className={`w-3.5 h-3.5 transition-transform ${blogOpen ? 'rotate-180' : ''}`} />
            </button>
            {blogOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-blue-100 py-2 z-50">
                <Link href="/blog-chineur" onClick={() => setBlogOpen(false)} className="block px-4 py-3 hover:bg-[#EEF4FF] transition-colors rounded-xl mx-1">
                  <p className="font-bold text-[#0D1B4B] text-sm">Blog du chineur</p>
                  <p className="text-xs text-[#4A5680] mt-0.5">Conseils, astuces, chinage</p>
                </Link>
                <div className="border-t border-blue-50 mx-2 my-0.5" />
                <Link href="/blog-collectionneur" onClick={() => setBlogOpen(false)} className="block px-4 py-3 hover:bg-[#EEF4FF] transition-colors rounded-xl mx-1">
                  <p className="font-bold text-[#0D1B4B] text-sm">Blog du collectionneur</p>
                  <p className="text-xs text-[#4A5680] mt-0.5">Expertise, objets, valeur</p>
                </Link>
                <div className="border-t border-blue-50 mx-2 my-0.5" />
                <Link href="/blog-organisateur" onClick={() => setBlogOpen(false)} className="block px-4 py-3 hover:bg-[#EEF4FF] transition-colors rounded-xl mx-1">
                  <p className="font-bold text-[#0D1B4B] text-sm">Blog de l&apos;organisateur</p>
                  <p className="text-xs text-[#4A5680] mt-0.5">Logistique, autorisations</p>
                </Link>
              </div>
            )}
          </div>

          {/* Actualités — lien direct séparé */}
          <Link href="/actualites" className="text-sm font-semibold text-blue-300 hover:text-white transition-colors px-3 py-2 whitespace-nowrap rounded-lg hover:bg-white/5">
            Actualités
          </Link>

          {/* Séparateur */}
          <span className="w-px h-4 bg-blue-700 mx-1" />

          {/* Mon espace dropdown */}
          <div ref={espaceRef} className="relative">
            <button
              onClick={() => { setEspaceOpen(!espaceOpen); setBlogOpen(false) }}
              className="flex items-center gap-1 text-sm font-semibold text-blue-300 hover:text-white transition-colors px-3 py-2 whitespace-nowrap rounded-lg hover:bg-white/5"
            >
              Mon espace <ChevronDown className={`w-3.5 h-3.5 transition-transform ${espaceOpen ? 'rotate-180' : ''}`} />
            </button>
            {espaceOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-blue-100 py-2 z-50">
                <Link href="/je-cherche" onClick={() => setEspaceOpen(false)} className="block px-4 py-3 hover:bg-[#EEF4FF] transition-colors rounded-xl mx-1">
                  <p className="font-bold text-[#0D1B4B] text-sm">🔍 Espace chineur</p>
                  <p className="text-xs text-[#4A5680] mt-0.5">Mes alertes, ma liste de recherche</p>
                </Link>
                <div className="border-t border-blue-50 mx-2 my-0.5" />
                <Link href="/exposant/connexion" onClick={() => setEspaceOpen(false)} className="block px-4 py-3 hover:bg-[#EEF4FF] transition-colors rounded-xl mx-1">
                  <p className="font-bold text-[#0D1B4B] text-sm">🏷️ Espace exposant</p>
                  <p className="text-xs text-[#4A5680] mt-0.5">Mon stand, mes photos, mes articles</p>
                </Link>
                <div className="border-t border-blue-50 mx-2 my-0.5" />
                <Link href="/organisateur" onClick={() => setEspaceOpen(false)} className="block px-4 py-3 hover:bg-[#EEF4FF] transition-colors rounded-xl mx-1">
                  <p className="font-bold text-[#0D1B4B] text-sm">📋 Espace organisateur</p>
                  <p className="text-xs text-[#4A5680] mt-0.5">Créer et gérer ma brocante</p>
                </Link>
              </div>
            )}
          </div>

          {/* CTA centré dans le groupe */}
          <Link
            href="/exposant/inscription"
            className="ml-2 bg-[#E8651A] hover:bg-[#d4581a] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:scale-105 whitespace-nowrap shadow-lg shadow-orange-900/30"
          >
            Publier mon stand
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden ml-auto">
          <button
            className="p-2 rounded-lg hover:bg-blue-800 transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-blue-800 bg-[#0D1B4B] px-4 py-4 flex flex-col gap-1">
          <Link href="/" onClick={() => setOpen(false)} className="text-sm font-semibold text-blue-200 px-3 py-3 rounded-lg hover:bg-blue-800">Accueil</Link>
          <Link href="/brocantes-ile-de-france" onClick={() => setOpen(false)} className="text-sm font-semibold text-blue-200 px-3 py-3 rounded-lg hover:bg-blue-800">Brocantes IDF</Link>
          <Link href="/search" onClick={() => setOpen(false)} className="text-sm font-semibold text-blue-200 px-3 py-3 rounded-lg hover:bg-blue-800">Rechercher un objet</Link>
          <Link href="/actualites" onClick={() => setOpen(false)} className="text-sm font-semibold text-blue-200 px-3 py-3 rounded-lg hover:bg-blue-800">Actualités brocante</Link>

          <div className="border-t border-blue-800 pt-2 mt-1">
            <p className="text-xs text-blue-500 px-3 pb-2 font-semibold uppercase tracking-wider">Blogs</p>
            <Link href="/blog-chineur" onClick={() => setOpen(false)} className="text-sm font-semibold text-blue-200 px-3 py-3 rounded-lg hover:bg-blue-800 block">Blog du chineur</Link>
            <Link href="/blog-collectionneur" onClick={() => setOpen(false)} className="text-sm font-semibold text-blue-200 px-3 py-3 rounded-lg hover:bg-blue-800 block">Blog du collectionneur</Link>
            <Link href="/blog-organisateur" onClick={() => setOpen(false)} className="text-sm font-semibold text-blue-200 px-3 py-3 rounded-lg hover:bg-blue-800 block">Blog de l&apos;organisateur</Link>
          </div>

          <div className="border-t border-blue-800 pt-2 mt-1">
            <p className="text-xs text-blue-500 px-3 pb-2 font-semibold uppercase tracking-wider">Mon espace</p>
            <Link href="/je-cherche" onClick={() => setOpen(false)} className="text-sm font-semibold text-blue-200 px-3 py-3 rounded-lg hover:bg-blue-800 block">🔍 Espace chineur</Link>
            <Link href="/exposant/connexion" onClick={() => setOpen(false)} className="text-sm font-semibold text-blue-200 px-3 py-3 rounded-lg hover:bg-blue-800 block">🏷️ Espace exposant</Link>
            <Link href="/organisateur" onClick={() => setOpen(false)} className="text-sm font-semibold text-blue-200 px-3 py-3 rounded-lg hover:bg-blue-800 block">📋 Espace organisateur</Link>
          </div>

          <Link href="/exposant/inscription" onClick={() => setOpen(false)} className="mt-3 bg-[#E8651A] text-white text-sm font-bold px-4 py-3.5 rounded-xl text-center block shadow-lg">
            Publier mon stand
          </Link>
        </div>
      )}
    </nav>
  )
}
