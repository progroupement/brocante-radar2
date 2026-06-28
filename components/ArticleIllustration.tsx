import Image from 'next/image'

export default function ArticleIllustration({
  illustration,
  className = '',
  alt = '',
}: {
  illustration: string
  className?: string
  alt?: string
}) {
  const isUrl = illustration.startsWith('https://') || illustration.startsWith('http://')

  if (isUrl) {
    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <Image
          src={illustration}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 400px"
        />
      </div>
    )
  }

  // Fallback SVG générique
  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 opacity-60">
        <circle cx="60" cy="60" r="48" fill="#EEF4FF" stroke="#0D1B4B" strokeWidth="3"/>
        <circle cx="60" cy="42" r="14" fill="#E8651A" opacity="0.7"/>
        <path d="M24 90 Q60 60 96 90" fill="#0D1B4B" opacity="0.3"/>
      </svg>
    </div>
  )
}
