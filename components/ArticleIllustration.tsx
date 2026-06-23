type IllustrationKey =
  | 'compass' | 'handshake' | 'treasure' | 'clock' | 'coins'
  | 'hanger' | 'magnify' | 'map' | 'camera' | 'brush'
  | 'star' | 'chart' | 'phone' | 'vinyl' | 'people'
  | 'leaf' | 'pin' | 'document' | 'building' | 'tools'
  | 'default'

const illustrations: Record<IllustrationKey, JSX.Element> = {
  compass: (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="48" fill="#EEF4FF" stroke="#0D1B4B" strokeWidth="3"/>
      <circle cx="60" cy="60" r="36" stroke="#E8651A" strokeWidth="2" strokeDasharray="4 3"/>
      <circle cx="60" cy="60" r="6" fill="#E8651A"/>
      <polygon points="60,20 66,58 60,54 54,58" fill="#0D1B4B"/>
      <polygon points="60,100 66,62 60,66 54,62" fill="#E8651A"/>
      <line x1="60" y1="12" x2="60" y2="22" stroke="#0D1B4B" strokeWidth="2" strokeLinecap="round"/>
      <line x1="60" y1="98" x2="60" y2="108" stroke="#0D1B4B" strokeWidth="2" strokeLinecap="round"/>
      <line x1="12" y1="60" x2="22" y2="60" stroke="#0D1B4B" strokeWidth="2" strokeLinecap="round"/>
      <line x1="98" y1="60" x2="108" y2="60" stroke="#0D1B4B" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  handshake: (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="30" width="28" height="16" rx="4" fill="#0D1B4B"/>
      <rect x="84" y="30" width="28" height="16" rx="4" fill="#0D1B4B"/>
      <path d="M36 38 Q60 22 84 38" stroke="#E8651A" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <circle cx="60" cy="34" r="8" fill="#E8651A"/>
      <path d="M56 34 L59 37 L65 31" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="22" y="46" width="4" height="14" rx="2" fill="#4A5680"/>
      <rect x="94" y="46" width="4" height="14" rx="2" fill="#4A5680"/>
    </svg>
  ),
  treasure: (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="45" width="80" height="45" rx="6" fill="#0D1B4B"/>
      <rect x="20" y="40" width="80" height="12" rx="4" fill="#4A5680"/>
      <path d="M20 46 Q60 58 100 46" stroke="#E8651A" strokeWidth="2" fill="none"/>
      <rect x="50" y="52" width="20" height="14" rx="3" fill="#E8651A"/>
      <circle cx="60" cy="59" r="3" fill="#0D1B4B"/>
      <circle cx="40" cy="20" r="8" fill="#E8651A" opacity="0.8"/>
      <path d="M40 12 L42 18 L40 20 L38 18 Z" fill="white"/>
      <circle cx="75" cy="15" r="5" fill="#E8651A" opacity="0.6"/>
      <circle cx="88" cy="28" r="3" fill="#E8651A" opacity="0.4"/>
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="62" r="48" fill="#EEF4FF" stroke="#0D1B4B" strokeWidth="3"/>
      <circle cx="60" cy="62" r="4" fill="#0D1B4B"/>
      <line x1="60" y1="62" x2="60" y2="30" stroke="#0D1B4B" strokeWidth="3" strokeLinecap="round"/>
      <line x1="60" y1="62" x2="84" y2="72" stroke="#E8651A" strokeWidth="3" strokeLinecap="round"/>
      <line x1="60" y1="16" x2="60" y2="22" stroke="#0D1B4B" strokeWidth="3" strokeLinecap="round"/>
      <line x1="60" y1="102" x2="60" y2="108" stroke="#0D1B4B" strokeWidth="3" strokeLinecap="round"/>
      <line x1="14" y1="62" x2="20" y2="62" stroke="#0D1B4B" strokeWidth="3" strokeLinecap="round"/>
      <line x1="100" y1="62" x2="106" y2="62" stroke="#0D1B4B" strokeWidth="3" strokeLinecap="round"/>
      <rect x="44" y="6" width="32" height="10" rx="5" fill="#0D1B4B"/>
    </svg>
  ),
  coins: (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="45" cy="75" rx="28" ry="10" fill="#0D1B4B"/>
      <rect x="17" y="38" width="56" height="37" fill="#4A5680"/>
      <ellipse cx="45" cy="38" rx="28" ry="10" fill="#0D1B4B"/>
      <ellipse cx="45" cy="52" rx="28" ry="10" fill="#4A5680"/>
      <ellipse cx="45" cy="65" rx="28" ry="10" fill="#0D1B4B"/>
      <circle cx="85" cy="35" r="22" fill="#E8651A"/>
      <circle cx="85" cy="35" r="16" stroke="white" strokeWidth="1.5" fill="none" strokeOpacity="0.5"/>
      <text x="79" y="41" fontFamily="Arial" fontWeight="900" fontSize="16" fill="white">€</text>
    </svg>
  ),
  hanger: (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="18" r="8" stroke="#0D1B4B" strokeWidth="2.5" fill="none"/>
      <path d="M60 26 L60 34 L20 65 Q15 70 20 76 L100 76 Q105 70 100 65 Z" fill="#EEF4FF" stroke="#0D1B4B" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M32 76 L32 90 Q32 94 36 94 L84 94 Q88 94 88 90 L88 76" fill="#E8651A" stroke="#0D1B4B" strokeWidth="2"/>
      <line x1="44" y1="76" x2="44" y2="94" stroke="white" strokeWidth="1.5" strokeOpacity="0.5"/>
      <line x1="60" y1="76" x2="60" y2="94" stroke="white" strokeWidth="1.5" strokeOpacity="0.5"/>
      <line x1="76" y1="76" x2="76" y2="94" stroke="white" strokeWidth="1.5" strokeOpacity="0.5"/>
    </svg>
  ),
  magnify: (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="34" fill="#EEF4FF" stroke="#0D1B4B" strokeWidth="4"/>
      <circle cx="50" cy="50" r="22" stroke="#E8651A" strokeWidth="2.5" fill="none"/>
      <line x1="75" y1="75" x2="105" y2="105" stroke="#0D1B4B" strokeWidth="6" strokeLinecap="round"/>
      <line x1="42" y1="42" x2="58" y2="58" stroke="#E8651A" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      <circle cx="42" cy="42" r="5" fill="#E8651A" opacity="0.7"/>
    </svg>
  ),
  map: (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="15" width="100" height="70" rx="4" fill="#EEF4FF" stroke="#0D1B4B" strokeWidth="2"/>
      <line x1="42" y1="15" x2="42" y2="85" stroke="#4A5680" strokeWidth="1.5" strokeDasharray="3 2"/>
      <line x1="78" y1="15" x2="78" y2="85" stroke="#4A5680" strokeWidth="1.5" strokeDasharray="3 2"/>
      <line x1="10" y1="42" x2="110" y2="42" stroke="#4A5680" strokeWidth="1.5" strokeDasharray="3 2"/>
      <line x1="10" y1="62" x2="110" y2="62" stroke="#4A5680" strokeWidth="1.5" strokeDasharray="3 2"/>
      <circle cx="60" cy="48" r="10" fill="#E8651A"/>
      <path d="M60 38 C54 38 50 43 50 48 C50 55 60 68 60 68 C60 68 70 55 70 48 C70 43 66 38 60 38Z" fill="#E8651A"/>
      <circle cx="60" cy="48" r="4" fill="white"/>
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="25" width="104" height="58" rx="8" fill="#0D1B4B"/>
      <rect x="44" y="12" width="32" height="18" rx="4" fill="#4A5680"/>
      <circle cx="60" cy="54" r="20" fill="#4A5680" stroke="#EEF4FF" strokeWidth="2"/>
      <circle cx="60" cy="54" r="13" fill="#EEF4FF"/>
      <circle cx="60" cy="54" r="7" fill="#0D1B4B"/>
      <circle cx="64" cy="50" r="2.5" fill="white" opacity="0.8"/>
      <circle cx="88" cy="36" r="5" fill="#E8651A"/>
    </svg>
  ),
  brush: (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="55" y="10" width="14" height="60" rx="4" fill="#0D1B4B" transform="rotate(-30 55 10)"/>
      <ellipse cx="42" cy="82" rx="16" ry="12" fill="#E8651A" transform="rotate(-30 42 82)"/>
      <circle cx="35" cy="92" r="10" fill="#E8651A" opacity="0.7"/>
      <circle cx="25" cy="88" r="6" fill="#4A5680" opacity="0.5"/>
      <circle cx="45" cy="98" r="5" fill="#0D1B4B" opacity="0.4"/>
      <circle cx="18" cy="98" r="4" fill="#E8651A" opacity="0.3"/>
    </svg>
  ),
  star: (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="60,10 72,42 106,42 80,62 90,96 60,76 30,96 40,62 14,42 48,42" fill="#E8651A"/>
      <polygon points="60,22 69,46 94,46 74,60 81,85 60,71 39,85 46,60 26,46 51,46" fill="#EEF4FF"/>
      <polygon points="60,34 66,50 82,50 70,59 74,76 60,67 46,76 50,59 38,50 54,50" fill="#E8651A" opacity="0.7"/>
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="15" y1="10" x2="15" y2="85" stroke="#0D1B4B" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="15" y1="85" x2="110" y2="85" stroke="#0D1B4B" strokeWidth="2.5" strokeLinecap="round"/>
      <rect x="25" y="55" width="16" height="30" rx="3" fill="#4A5680"/>
      <rect x="48" y="40" width="16" height="45" rx="3" fill="#4A5680"/>
      <rect x="71" y="25" width="16" height="60" rx="3" fill="#0D1B4B"/>
      <rect x="94" y="15" width="16" height="70" rx="3" fill="#E8651A"/>
      <path d="M33 55 L56 40 L79 25 L102 15" stroke="#E8651A" strokeWidth="2" strokeDasharray="3 2" fill="none"/>
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="8" width="60" height="104" rx="10" fill="#0D1B4B"/>
      <rect x="16" y="20" width="48" height="76" rx="4" fill="#EEF4FF"/>
      <circle cx="40" cy="108" r="5" fill="#4A5680"/>
      <rect x="30" y="12" width="20" height="4" rx="2" fill="#4A5680"/>
      <rect x="20" y="28" width="40" height="28" rx="3" fill="#E8651A" opacity="0.2"/>
      <circle cx="40" cy="42" r="10" fill="#E8651A"/>
      <path d="M36 42 L39 45 L45 38" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="20" y="64" width="18" height="8" rx="2" fill="#0D1B4B" opacity="0.2"/>
      <rect x="42" y="64" width="18" height="8" rx="2" fill="#0D1B4B" opacity="0.2"/>
      <rect x="20" y="76" width="40" height="8" rx="2" fill="#0D1B4B" opacity="0.15"/>
    </svg>
  ),
  vinyl: (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="52" fill="#0D1B4B"/>
      <circle cx="60" cy="60" r="52" fill="none" stroke="#4A5680" strokeWidth="4" strokeDasharray="8 4"/>
      <circle cx="60" cy="60" r="36" fill="none" stroke="#4A5680" strokeWidth="3" strokeDasharray="6 3"/>
      <circle cx="60" cy="60" r="20" fill="#4A5680"/>
      <circle cx="60" cy="60" r="16" fill="#E8651A" opacity="0.9"/>
      <circle cx="60" cy="60" r="6" fill="#0D1B4B"/>
      <circle cx="60" cy="60" r="3" fill="white"/>
      <path d="M60 8 L65 12 L60 16 L55 12 Z" fill="#E8651A" opacity="0.7"/>
    </svg>
  ),
  people: (
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="28" r="14" fill="#4A5680"/>
      <path d="M8 75 Q8 52 30 52 Q52 52 52 75" fill="#4A5680"/>
      <circle cx="60" cy="22" r="18" fill="#0D1B4B"/>
      <path d="M30 75 Q30 48 60 48 Q90 48 90 75" fill="#0D1B4B"/>
      <circle cx="90" cy="28" r="14" fill="#E8651A"/>
      <path d="M68 75 Q68 52 90 52 Q112 52 112 75" fill="#E8651A"/>
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 100 Q20 80 18 40 Q18 15 60 15 Q102 15 102 40 Q100 80 60 100Z" fill="#4A5680" opacity="0.3"/>
      <path d="M60 95 Q24 76 22 42 Q22 20 60 20 Q98 20 98 42 Q96 76 60 95Z" fill="#0D1B4B" opacity="0.8"/>
      <line x1="60" y1="95" x2="60" y2="20" stroke="#E8651A" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="60" y1="40" x2="42" y2="52" stroke="#E8651A" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="60" y1="55" x2="78" y2="65" stroke="#E8651A" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="60" y1="70" x2="44" y2="78" stroke="#E8651A" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 10 C20 10 8 24 8 40 C8 62 40 110 40 110 C40 110 72 62 72 40 C72 24 60 10 40 10Z" fill="#E8651A"/>
      <circle cx="40" cy="40" r="18" fill="white"/>
      <circle cx="40" cy="40" r="10" fill="#0D1B4B"/>
      <circle cx="44" cy="36" r="3" fill="white" opacity="0.7"/>
    </svg>
  ),
  document: (
    <svg viewBox="0 0 90 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="8" width="70" height="92" rx="6" fill="#EEF4FF" stroke="#0D1B4B" strokeWidth="2.5"/>
      <path d="M58 8 L80 30 L58 30 Z" fill="#0D1B4B" opacity="0.3"/>
      <rect x="22" y="42" width="46" height="4" rx="2" fill="#0D1B4B" opacity="0.5"/>
      <rect x="22" y="54" width="46" height="4" rx="2" fill="#0D1B4B" opacity="0.5"/>
      <rect x="22" y="66" width="32" height="4" rx="2" fill="#0D1B4B" opacity="0.5"/>
      <rect x="22" y="78" width="40" height="4" rx="2" fill="#E8651A" opacity="0.6"/>
      <rect x="22" y="90" width="24" height="4" rx="2" fill="#E8651A" opacity="0.4"/>
    </svg>
  ),
  building: (
    <svg viewBox="0 0 120 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="35" width="90" height="70" rx="4" fill="#EEF4FF" stroke="#0D1B4B" strokeWidth="2.5"/>
      <polygon points="10,35 60,8 110,35" fill="#0D1B4B"/>
      <rect x="48" y="70" width="24" height="35" rx="3" fill="#0D1B4B"/>
      <rect x="22" y="48" width="16" height="16" rx="2" fill="#E8651A" opacity="0.7"/>
      <rect x="52" y="48" width="16" height="16" rx="2" fill="#E8651A" opacity="0.7"/>
      <rect x="82" y="48" width="16" height="16" rx="2" fill="#E8651A" opacity="0.7"/>
      <rect x="22" y="72" width="16" height="16" rx="2" fill="#4A5680" opacity="0.5"/>
      <rect x="82" y="72" width="16" height="16" rx="2" fill="#4A5680" opacity="0.5"/>
    </svg>
  ),
  tools: (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="52" y="10" width="16" height="55" rx="4" fill="#0D1B4B" transform="rotate(45 52 10)"/>
      <rect x="20" y="75" width="36" height="14" rx="4" fill="#4A5680"/>
      <rect x="18" y="86" width="40" height="10" rx="4" fill="#0D1B4B"/>
      <circle cx="85" cy="38" r="20" fill="#EEF4FF" stroke="#E8651A" strokeWidth="3"/>
      <line x1="85" y1="22" x2="85" y2="54" stroke="#E8651A" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="69" y1="38" x2="101" y2="38" stroke="#E8651A" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="85" cy="38" r="5" fill="#E8651A"/>
    </svg>
  ),
  default: (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="50" fill="#EEF4FF" stroke="#0D1B4B" strokeWidth="3"/>
      <circle cx="60" cy="60" r="30" fill="#E8651A" opacity="0.2"/>
      <circle cx="60" cy="60" r="12" fill="#E8651A"/>
    </svg>
  ),
}

export default function ArticleIllustration({
  illustration,
  className = '',
}: {
  illustration: string
  className?: string
}) {
  const key = (illustration as IllustrationKey) in illustrations
    ? (illustration as IllustrationKey)
    : 'default'

  return (
    <div className={`w-full flex items-center justify-center ${className}`}>
      <div className="w-32 h-32 opacity-90">
        {illustrations[key]}
      </div>
    </div>
  )
}
