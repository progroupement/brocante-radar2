'use client'

import { useState } from 'react'

function FallbackSvg({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full h-full flex items-center justify-center bg-[#EEF4FF] ${className}`}>
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 opacity-50">
        <circle cx="60" cy="60" r="48" fill="#EEF4FF" stroke="#0D1B4B" strokeWidth="3"/>
        <circle cx="60" cy="42" r="14" fill="#E8651A" opacity="0.7"/>
        <path d="M24 90 Q60 60 96 90" fill="#0D1B4B" opacity="0.3"/>
      </svg>
    </div>
  )
}

export default function ArticleIllustration({
  illustration,
  className = '',
  alt = '',
}: {
  illustration: string
  className?: string
  alt?: string
}) {
  const [errored, setErrored] = useState(false)
  const isUrl = illustration?.startsWith('https://') || illustration?.startsWith('http://')

  if (isUrl && !errored) {
    return (
      <div className={`w-full h-full overflow-hidden ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={illustration}
          alt={alt}
          onError={() => setErrored(true)}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    )
  }

  return <FallbackSvg className={className} />
}
