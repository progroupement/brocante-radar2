// Logo inline SVG — couleurs adaptées selon le fond
// variant="light" = texte blanc (pour fond sombre Navbar/Footer)
// variant="dark" = texte bleu (pour fond blanc)

export default function Logo({
  variant = 'light',
  className = '',
}: {
  variant?: 'light' | 'dark'
  className?: string
}) {
  const textColor = variant === 'light' ? '#FFFFFF' : '#0D1B4B'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 52"
      fill="none"
      className={className}
      aria-label="Brocante Radar"
    >
      {/* Icône radar */}
      <circle cx="26" cy="26" r="20" fill="#0D1B4B" stroke={textColor} strokeWidth="1.5" strokeOpacity="0.3" />
      <circle cx="26" cy="26" r="14" stroke="#E8651A" strokeWidth="1.8" fill="none" />
      <circle cx="26" cy="26" r="7" stroke="#E8651A" strokeWidth="1.4" fill="none" />
      <circle cx="26" cy="26" r="2.5" fill="#E8651A" />
      {/* Rayon radar */}
      <line x1="26" y1="26" x2="39" y2="13" stroke="#E8651A" strokeWidth="2" strokeLinecap="round" />

      {/* Texte BROCANTE */}
      <text
        x="54"
        y="21"
        fontFamily="'Segoe UI', Arial, sans-serif"
        fontWeight="800"
        fontSize="11.5"
        letterSpacing="2"
        fill={textColor}
        opacity="0.85"
      >
        BROCANTE
      </text>

      {/* Texte RADAR */}
      <text
        x="54"
        y="40"
        fontFamily="'Segoe UI', Arial, sans-serif"
        fontWeight="900"
        fontSize="19"
        letterSpacing="0.5"
        fill="#E8651A"
      >
        RADAR
      </text>
    </svg>
  )
}
