'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { KEYWORDS_SUGGESTIONS } from '@/lib/utils'

interface SearchBarProps {
  value: string
  onChange: (v: string) => void
  onSearch: (v: string) => void
  placeholder?: string
  autoFocus?: boolean
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = 'Que recherchez-vous ? Playmobil, vinyles, machine à coudre...',
  autoFocus = false,
}: SearchBarProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSugg, setShowSugg] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  function handleChange(v: string) {
    onChange(v)
    if (v.length >= 1) {
      const filtered = KEYWORDS_SUGGESTIONS.filter((s) =>
        s.toLowerCase().includes(v.toLowerCase())
      ).slice(0, 5)
      setSuggestions(filtered)
      setShowSugg(filtered.length > 0)
    } else {
      setShowSugg(false)
    }
  }

  function handleSelect(s: string) {
    onChange(s)
    setShowSugg(false)
    onSearch(s)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      setShowSugg(false)
      onSearch(value)
    }
    if (e.key === 'Escape') {
      setShowSugg(false)
    }
  }

  function clear() {
    onChange('')
    setSuggestions([])
    setShowSugg(false)
    inputRef.current?.focus()
  }

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-3 bg-white border-2 border-gray-200 rounded-2xl px-4 py-3 focus-within:border-[#E8651A] transition-colors shadow-sm">
        <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setShowSugg(true)}
          placeholder={placeholder}
          className="flex-1 outline-none text-[#1A1A1A] placeholder:text-gray-400 text-base bg-transparent"
        />
        {value && (
          <button onClick={clear} className="flex-shrink-0 p-1 rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
        <button
          onClick={() => { setShowSugg(false); onSearch(value) }}
          className="flex-shrink-0 bg-[#E8651A] text-white rounded-xl px-4 py-1.5 text-sm font-semibold hover:bg-orange-700 transition-colors"
        >
          Rechercher
        </button>
      </div>

      {/* Suggestions dropdown */}
      {showSugg && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg z-20 overflow-hidden">
          {suggestions.map((s) => (
            <button
              key={s}
              onMouseDown={() => handleSelect(s)}
              className="w-full text-left px-5 py-3 text-sm hover:bg-orange-50 hover:text-[#E8651A] transition-colors flex items-center gap-3"
            >
              <Search className="w-3.5 h-3.5 text-gray-300" />
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
