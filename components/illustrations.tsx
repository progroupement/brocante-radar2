/* ─────────────────────────────────────────────────────────
   Illustrations SVG — Brocante Radar
   Toutes les illustrations du site, vectorielles et légères
───────────────────────────────────────────────────────── */

/** Illustration principale du hero — téléphone + objets vintage */
export function HeroIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Cercles radar en fond */}
      <circle cx="240" cy="270" r="210" stroke="#E8651A" strokeOpacity="0.06" strokeWidth="1.5" />
      <circle cx="240" cy="270" r="155" stroke="#E8651A" strokeOpacity="0.09" strokeWidth="1.5" />
      <circle cx="240" cy="270" r="100" stroke="#E8651A" strokeOpacity="0.13" strokeWidth="1.5" />

      {/* ── Téléphone ── */}
      <rect x="158" y="100" width="164" height="310" rx="26" fill="white" stroke="#E8E8E8" strokeWidth="2" />
      <rect x="158" y="100" width="164" height="310" rx="26" fill="url(#phoneGrad)" />
      {/* Encoche */}
      <rect x="198" y="113" width="84" height="10" rx="5" fill="#F0F0F0" />
      {/* Bouton home */}
      <rect x="220" y="396" width="40" height="5" rx="2.5" fill="#E0E0E0" />

      {/* ── Contenu écran ── */}
      {/* Barre de recherche */}
      <rect x="174" y="136" width="132" height="32" rx="10" fill="#F8F7F5" />
      <circle cx="192" cy="152" r="7" fill="none" stroke="#E8651A" strokeWidth="2" />
      <line x1="197" y1="157" x2="202" y2="162" stroke="#E8651A" strokeWidth="2" strokeLinecap="round" />
      <rect x="206" y="147" width="68" height="5" rx="2.5" fill="#D8D8D8" />
      <rect x="206" y="156" width="44" height="4" rx="2" fill="#EBEBEB" />

      {/* Carte résultat 1 — highlight */}
      <rect x="174" y="178" width="132" height="58" rx="10" fill="#FFF4EE" stroke="#E8651A" strokeWidth="1.5" strokeOpacity="0.4" />
      <rect x="182" y="186" width="34" height="34" rx="8" fill="#E8651A" fillOpacity="0.15" />
      {/* Icône lampe mini */}
      <path d="M194 196 L193 206 L201 206 L200 196 Z" fill="#E8651A" fillOpacity="0.5" />
      <rect x="195" y="206" width="4" height="6" rx="1" fill="#E8651A" fillOpacity="0.4" />
      <rect x="222" y="189" width="72" height="6" rx="3" fill="#C8C8C8" />
      <rect x="222" y="200" width="52" height="5" rx="2.5" fill="#DEDEDE" />
      <rect x="222" y="210" width="38" height="5" rx="2.5" fill="#E8651A" fillOpacity="0.5" />
      {/* Badge "Trouvé" */}
      <rect x="252" y="186" width="48" height="16" rx="8" fill="#E8651A" />
      <rect x="258" y="191" width="36" height="6" rx="3" fill="white" fillOpacity="0.8" />

      {/* Carte résultat 2 */}
      <rect x="174" y="244" width="132" height="52" rx="10" fill="#F8F7F5" />
      <rect x="182" y="252" width="30" height="30" rx="7" fill="#E0E0E0" />
      <rect x="218" y="256" width="72" height="5" rx="2.5" fill="#C8C8C8" />
      <rect x="218" y="266" width="50" height="5" rx="2.5" fill="#DEDEDE" />
      <rect x="218" y="276" width="36" height="5" rx="2.5" fill="#EBEBEB" />

      {/* Carte résultat 3 */}
      <rect x="174" y="304" width="132" height="52" rx="10" fill="#F8F7F5" />
      <rect x="182" y="312" width="30" height="30" rx="7" fill="#E0E0E0" />
      <rect x="218" y="316" width="72" height="5" rx="2.5" fill="#C8C8C8" />
      <rect x="218" y="326" width="50" height="5" rx="2.5" fill="#DEDEDE" />
      <rect x="218" y="336" width="36" height="5" rx="2.5" fill="#EBEBEB" />

      {/* ── Disque vinyle (haut gauche) ── */}
      <circle cx="94" cy="148" r="38" fill="#1A1A1A" />
      <circle cx="94" cy="148" r="26" fill="#242424" />
      <circle cx="94" cy="148" r="14" fill="#1A1A1A" />
      <circle cx="94" cy="148" r="6" fill="#E8651A" />
      <circle cx="94" cy="148" r="3" fill="#1A1A1A" />
      {/* Reflet */}
      <path d="M78 135 Q86 128 96 134" stroke="white" strokeOpacity="0.15" strokeWidth="1.5" strokeLinecap="round" />

      {/* ── Lampe de chevet (haut droite) ── */}
      <g transform="translate(360, 90)">
        {/* Abat-jour */}
        <path d="M0 0 L-30 48 L30 48 Z" fill="#E8651A" fillOpacity="0.85" />
        <path d="M-30 48 L30 48" stroke="#C85A10" strokeWidth="2" />
        {/* Pied */}
        <rect x="-4" y="48" width="8" height="38" rx="4" fill="#8A7660" />
        {/* Base */}
        <ellipse cx="0" cy="88" rx="18" ry="6" fill="#C8B89A" />
        {/* Bouton */}
        <circle cx="6" cy="58" r="3" fill="#C85A10" />
      </g>

      {/* ── Livre ancien (bas gauche) ── */}
      <g transform="translate(58, 300)">
        <rect x="0" y="0" width="64" height="52" rx="4" fill="#2E5FAA" />
        <rect x="0" y="0" width="10" height="52" rx="4" fill="#1E4F9A" />
        <rect x="0" y="0" width="64" height="52" rx="4" fill="none" stroke="#1E4F9A" strokeWidth="1" />
        {/* Titre simulé */}
        <rect x="14" y="10" width="40" height="5" rx="2.5" fill="white" fillOpacity="0.5" />
        <rect x="14" y="20" width="32" height="4" rx="2" fill="white" fillOpacity="0.35" />
        <rect x="14" y="30" width="36" height="4" rx="2" fill="white" fillOpacity="0.25" />
        {/* Petite illustration sur la couv */}
        <ellipse cx="33" cy="42" rx="12" ry="6" fill="#4A7FCC" fillOpacity="0.5" />
      </g>

      {/* ── Vase (bas droite) ── */}
      <g transform="translate(374, 288)">
        {/* Corps du vase */}
        <path d="M16 0 C8 0 2 8 0 20 L-4 54 C-6 68 4 80 16 80 C28 80 38 68 36 54 L32 20 C30 8 24 0 16 0Z" fill="#C8A96E" />
        {/* Goulot */}
        <rect x="8" y="-28" width="16" height="30" rx="5" fill="#C8A96E" />
        <ellipse cx="16" cy="-28" rx="10" ry="5" fill="#B89860" />
        {/* Motif déco */}
        <path d="M4 35 Q16 28 28 35" stroke="#B89860" strokeWidth="1.5" fill="none" />
        <path d="M2 48 Q16 40 30 48" stroke="#B89860" strokeWidth="1.5" fill="none" />
      </g>

      {/* ── Pin de localisation (au dessus du téléphone) ── */}
      <g transform="translate(224, 62)">
        <path d="M16 32 C8 32 0 24 0 16 C0 7 7 0 16 0 C25 0 32 7 32 16 C32 24 24 32 16 32Z" fill="#E8651A" />
        <path d="M16 32 L12 44 L20 44 Z" fill="#E8651A" />
        <circle cx="16" cy="15" r="7" fill="white" />
        <circle cx="16" cy="15" r="4" fill="#E8651A" />
        {/* Ombre */}
        <ellipse cx="16" cy="46" rx="6" ry="2.5" fill="#0F0F0F" fillOpacity="0.1" />
      </g>

      {/* ── Étoiles décoratives ── */}
      <path d="M136 240 L138 247 L145 247 L139 251 L141 258 L136 254 L131 258 L133 251 L127 247 L134 247Z"
        fill="#E8651A" fillOpacity="0.55" />
      <path d="M358 185 L360 190 L365 190 L361 193 L362 198 L358 195 L354 198 L355 193 L351 190 L356 190Z"
        fill="#E8651A" fillOpacity="0.4" />
      <circle cx="100" cy="220" r="5" fill="#E8651A" fillOpacity="0.2" />
      <circle cx="380" cy="245" r="4" fill="#0F0F0F" fillOpacity="0.1" />
      <circle cx="70" cy="270" r="3" fill="#E8651A" fillOpacity="0.3" />

      <defs>
        <linearGradient id="phoneGrad" x1="158" y1="100" x2="322" y2="410" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="#F8F7F5" stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/** Illustration QR code pour l'espace organisateur */
export function OrganizerIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Fond */}
      <rect x="60" y="30" width="200" height="200" rx="20" fill="#FFF4EE" stroke="#E8651A" strokeWidth="1.5" strokeOpacity="0.3" />

      {/* QR code stylisé */}
      {/* Coin haut-gauche */}
      <rect x="84" y="54" width="52" height="52" rx="6" fill="#E8651A" fillOpacity="0.15" />
      <rect x="90" y="60" width="40" height="40" rx="4" fill="none" stroke="#E8651A" strokeWidth="3" />
      <rect x="98" y="68" width="24" height="24" rx="2" fill="#E8651A" />

      {/* Coin haut-droit */}
      <rect x="184" y="54" width="52" height="52" rx="6" fill="#E8651A" fillOpacity="0.15" />
      <rect x="190" y="60" width="40" height="40" rx="4" fill="none" stroke="#E8651A" strokeWidth="3" />
      <rect x="198" y="68" width="24" height="24" rx="2" fill="#E8651A" />

      {/* Coin bas-gauche */}
      <rect x="84" y="154" width="52" height="52" rx="6" fill="#E8651A" fillOpacity="0.15" />
      <rect x="90" y="160" width="40" height="40" rx="4" fill="none" stroke="#E8651A" strokeWidth="3" />
      <rect x="98" y="168" width="24" height="24" rx="2" fill="#E8651A" />

      {/* Données QR (points aléatoires) */}
      {[
        [152,60],[160,60],[168,60],[176,60],
        [152,68],[168,68],
        [152,76],[160,76],[176,76],
        [160,84],[168,84],[176,84],
        [152,92],[160,92],
        [152,100],[168,100],[176,100],
        [152,108],[160,108],[168,108],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="6" height="6" rx="1" fill="#0F0F0F" fillOpacity="0.7" />
      ))}
      {[
        [184,152],[192,152],[208,152],[216,152],
        [184,160],[200,160],
        [192,168],[208,168],[216,168],
        [184,176],[192,176],[200,176],
        [208,184],[216,184],
        [184,192],[200,192],[208,192],
        [192,200],[200,200],[216,200],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="6" height="6" rx="1" fill="#0F0F0F" fillOpacity="0.7" />
      ))}

      {/* Label Brocante Radar */}
      <rect x="90" y="215" width="140" height="6" rx="3" fill="#E8651A" fillOpacity="0.3" />
      <rect x="110" y="225" width="100" height="5" rx="2.5" fill="#E8651A" fillOpacity="0.2" />

      {/* Étincelles */}
      <path d="M42 80 L44 87 L51 87 L45 91 L47 98 L42 94 L37 98 L39 91 L33 87 L40 87Z" fill="#E8651A" fillOpacity="0.5" />
      <path d="M278 170 L280 176 L286 176 L281 180 L283 186 L278 182 L273 186 L275 180 L270 176 L276 176Z" fill="#E8651A" fillOpacity="0.4" />
      <circle cx="50" cy="170" r="6" fill="#E8651A" fillOpacity="0.2" />
      <circle cx="270" cy="80" r="5" fill="#E8651A" fillOpacity="0.25" />
    </svg>
  )
}

/** Illustration téléphone + appareil photo pour l'exposant */
export function ExposantIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Table de stand */}
      <rect x="30" y="170" width="260" height="14" rx="7" fill="#C8A96E" fillOpacity="0.6" />
      <rect x="50" y="184" width="8" height="50" rx="4" fill="#C8A96E" fillOpacity="0.4" />
      <rect x="262" y="184" width="8" height="50" rx="4" fill="#C8A96E" fillOpacity="0.4" />

      {/* Objets sur la table */}
      {/* Livre */}
      <rect x="46" y="140" width="44" height="32" rx="3" fill="#2E5FAA" />
      <rect x="46" y="140" width="7" height="32" rx="3" fill="#1E4F9A" />
      <rect x="56" y="148" width="26" height="4" rx="2" fill="white" fillOpacity="0.4" />
      <rect x="56" y="157" width="18" height="3" rx="1.5" fill="white" fillOpacity="0.25" />

      {/* Lampe */}
      <path d="M152 110 L136 145 L168 145 Z" fill="#E8651A" fillOpacity="0.75" />
      <rect x="148" y="145" width="8" height="26" rx="4" fill="#8A7660" />
      <ellipse cx="152" cy="172" rx="14" ry="5" fill="#C8B89A" />

      {/* Vase */}
      <path d="M222 138 C218 138 214 143 213 151 L211 165 C210 172 215 172 222 172 C229 172 234 172 233 165 L231 151 C230 143 226 138 222 138Z" fill="#C8A96E" />
      <rect x="216" y="122" width="12" height="18" rx="4" fill="#C8A96E" />
      <ellipse cx="222" cy="122" rx="8" ry="3.5" fill="#B89860" />

      {/* ── Téléphone en main (en train de photographier) ── */}
      <g transform="translate(80, 30)">
        {/* Main */}
        <ellipse cx="80" cy="140" rx="28" ry="14" fill="#F5DEB3" fillOpacity="0.8" />
        {/* Doigts */}
        <rect x="55" y="128" width="10" height="24" rx="5" fill="#F0D090" />
        <rect x="68" y="124" width="10" height="28" rx="5" fill="#F0D090" />
        <rect x="97" y="128" width="10" height="24" rx="5" fill="#F0D090" />
        <rect x="110" y="132" width="10" height="20" rx="5" fill="#F0D090" />
        {/* Téléphone */}
        <rect x="30" y="10" width="100" height="140" rx="16" fill="white" stroke="#E0E0E0" strokeWidth="2" />
        <rect x="30" y="10" width="100" height="140" rx="16" fill="#0F0F0F" />
        {/* Écran appareil photo */}
        <rect x="38" y="18" width="84" height="108" rx="10" fill="#1A2A3A" />
        {/* Viseur */}
        <rect x="42" y="22" width="76" height="100" rx="8" fill="#1E3A50" />
        {/* Grille photo */}
        <line x1="67" y1="22" x2="67" y2="122" stroke="white" strokeOpacity="0.15" strokeWidth="1" />
        <line x1="92" y1="22" x2="92" y2="122" stroke="white" strokeOpacity="0.15" strokeWidth="1" />
        <line x1="42" y1="55" x2="118" y2="55" stroke="white" strokeOpacity="0.15" strokeWidth="1" />
        <line x1="42" y1="89" x2="118" y2="89" stroke="white" strokeOpacity="0.15" strokeWidth="1" />
        {/* Croix de mise au point */}
        <rect x="74" y="68" width="12" height="2" rx="1" fill="#E8651A" fillOpacity="0.8" />
        <rect x="79" y="63" width="2" height="12" rx="1" fill="#E8651A" fillOpacity="0.8" />
        {/* Coins de cadre */}
        <path d="M50 30 L50 38 M50 30 L58 30" stroke="#E8651A" strokeWidth="2" strokeLinecap="round" />
        <path d="M110 30 L110 38 M110 30 L102 30" stroke="#E8651A" strokeWidth="2" strokeLinecap="round" />
        <path d="M50 114 L50 106 M50 114 L58 114" stroke="#E8651A" strokeWidth="2" strokeLinecap="round" />
        <path d="M110 114 L110 106 M110 114 L102 114" stroke="#E8651A" strokeWidth="2" strokeLinecap="round" />
        {/* Bouton déclencheur */}
        <circle cx="80" cy="136" r="8" fill="#333" stroke="#444" strokeWidth="1" />
        <circle cx="80" cy="136" r="5" fill="#444" />
      </g>

      {/* Flash */}
      <path d="M162 35 L148 58 L158 58 L144 80 L166 52 L155 52Z" fill="#FFD700" fillOpacity="0.7" />

      {/* Prix flottant */}
      <rect x="230" y="100" width="70" height="30" rx="15" fill="#E8651A" />
      <rect x="240" y="110" width="50" height="10" rx="5" fill="white" fillOpacity="0.7" />

      {/* Étoile */}
      <path d="M28 100 L30 107 L37 107 L31 111 L33 118 L28 114 L23 118 L25 111 L19 107 L26 107Z" fill="#E8651A" fillOpacity="0.45" />
    </svg>
  )
}

/** Illustration loupe + objets pour le chineur */
export function ChineurIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Grande loupe */}
      <circle cx="148" cy="120" r="80" fill="#F8F7F5" stroke="#E8651A" strokeWidth="3" />
      <circle cx="148" cy="120" r="68" fill="white" stroke="#E8651A" strokeWidth="1" strokeOpacity="0.3" />
      {/* Manche de la loupe */}
      <line x1="208" y1="178" x2="264" y2="234" stroke="#C8A96E" strokeWidth="12" strokeLinecap="round" />
      <line x1="208" y1="178" x2="264" y2="234" stroke="#B89860" strokeWidth="8" strokeLinecap="round" />

      {/* Contenu dans la loupe — stand de brocante miniature */}
      {/* Table */}
      <rect x="96" y="148" width="104" height="8" rx="4" fill="#C8A96E" fillOpacity="0.7" />
      {/* Nappe */}
      <rect x="96" y="152" width="104" height="4" rx="2" fill="#E8651A" fillOpacity="0.3" />

      {/* Objet 1 : vase */}
      <path d="M118 118 C115 118 112 122 111 128 L110 140 C109 146 112 150 118 150 C124 150 127 146 126 140 L125 128 C124 122 121 118 118 118Z" fill="#C8A96E" />
      <rect x="113" y="108" width="10" height="12" rx="4" fill="#C8A96E" />
      <ellipse cx="118" cy="108" rx="6" ry="3" fill="#B89860" />

      {/* Objet 2 : livre */}
      <rect x="135" y="128" width="30" height="22" rx="2" fill="#2E5FAA" />
      <rect x="135" y="128" width="5" height="22" rx="2" fill="#1E4F9A" />
      <rect x="143" y="133" width="18" height="3" rx="1.5" fill="white" fillOpacity="0.4" />
      <rect x="143" y="140" width="14" height="2.5" rx="1" fill="white" fillOpacity="0.25" />

      {/* Objet 3 : lampe */}
      <path d="M174 114 L168 134 L180 134 Z" fill="#E8651A" fillOpacity="0.7" />
      <rect x="172" y="134" width="4" height="16" rx="2" fill="#8A7660" />
      <ellipse cx="174" cy="151" rx="8" ry="3" fill="#C8B89A" />

      {/* Pin localisation dans la loupe */}
      <circle cx="148" cy="84" r="10" fill="#E8651A" fillOpacity="0.15" />
      <path d="M148 80 C145 80 143 82 143 85 C143 89 146 91 148 94 C150 91 153 89 153 85 C153 82 151 80 148 80Z" fill="#E8651A" />
      <circle cx="148" cy="85" r="2.5" fill="white" />

      {/* Reflet sur la loupe */}
      <path d="M96 76 Q108 68 124 74" stroke="white" strokeOpacity="0.6" strokeWidth="3" strokeLinecap="round" />

      {/* Éléments décoratifs */}
      <path d="M40 80 L42 87 L49 87 L43 91 L45 98 L40 94 L35 98 L37 91 L31 87 L38 87Z" fill="#E8651A" fillOpacity="0.5" />
      <path d="M282 100 L284 106 L290 106 L285 110 L287 116 L282 112 L277 116 L279 110 L274 106 L280 106Z" fill="#E8651A" fillOpacity="0.4" />
      <circle cx="52" cy="180" r="7" fill="#E8651A" fillOpacity="0.18" />
      <circle cx="278" cy="200" r="5" fill="#0F0F0F" fillOpacity="0.08" />

      {/* Trait de scan animé dans la loupe */}
      <line x1="82" y1="120" x2="214" y2="120" stroke="#E8651A" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="4 4" />
    </svg>
  )
}

/** Illustration marché / scène brocante pour le guide */
export function MarketIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Ciel */}
      <rect width="480" height="280" rx="20" fill="#F0F7FF" />

      {/* Nuages */}
      <ellipse cx="80" cy="50" rx="40" ry="20" fill="white" fillOpacity="0.8" />
      <ellipse cx="110" cy="44" rx="30" ry="18" fill="white" fillOpacity="0.8" />
      <ellipse cx="55" cy="46" rx="28" ry="16" fill="white" fillOpacity="0.8" />
      <ellipse cx="360" cy="40" rx="35" ry="18" fill="white" fillOpacity="0.8" />
      <ellipse cx="388" cy="35" rx="26" ry="15" fill="white" fillOpacity="0.8" />

      {/* Sol */}
      <rect x="0" y="210" width="480" height="70" rx="0" fill="#E8DCC8" />
      <rect x="0" y="210" width="480" height="8" fill="#D8CDB8" />

      {/* ── Stand 1 (gauche) ── */}
      {/* Toit */}
      <path d="M20 140 L100 110 L180 140 Z" fill="#E8651A" />
      <rect x="20" y="140" width="160" height="6" rx="0" fill="#C85A10" />
      {/* Rayures */}
      <path d="M52 116 L44 140" stroke="white" strokeOpacity="0.4" strokeWidth="4" />
      <path d="M84 110 L76 140" stroke="white" strokeOpacity="0.4" strokeWidth="4" />
      <path d="M116 110 L108 140" stroke="white" strokeOpacity="0.4" strokeWidth="4" />
      <path d="M148 116 L140 140" stroke="white" strokeOpacity="0.4" strokeWidth="4" />
      {/* Structure */}
      <rect x="24" y="140" width="8" height="70" rx="2" fill="#8A7660" />
      <rect x="168" y="140" width="8" height="70" rx="2" fill="#8A7660" />
      {/* Table */}
      <rect x="30" y="190" width="140" height="10" rx="3" fill="#C8B89A" />
      {/* Objets */}
      <rect x="38" y="165" width="28" height="26" rx="3" fill="#2E5FAA" />
      <rect x="38" y="165" width="6" height="26" rx="3" fill="#1E4F9A" />
      <rect x="72" y="160" width="20" height="30" rx="3" fill="#4A90D9" />
      <path d="M102 170 C99 170 97 173 96 178 L95 188 C94 193 97 196 102 196 C107 196 110 193 109 188 L108 178 C107 173 105 170 102 170Z" fill="#C8A96E" />
      <rect x="128" y="168" width="24" height="22" rx="2" fill="#8B4513" fillOpacity="0.7" />

      {/* ── Stand 2 (centre) ── */}
      {/* Toit */}
      <path d="M170 130 L260 98 L350 130 Z" fill="#2E5FAA" />
      <rect x="170" y="130" width="180" height="6" fill="#1E4F9A" />
      {/* Rayures */}
      <path d="M200 108 L192 130" stroke="white" strokeOpacity="0.3" strokeWidth="4" />
      <path d="M234 100 L226 130" stroke="white" strokeOpacity="0.3" strokeWidth="4" />
      <path d="M268 100 L260 130" stroke="white" strokeOpacity="0.3" strokeWidth="4" />
      <path d="M302 108 L294 130" stroke="white" strokeOpacity="0.3" strokeWidth="4" />
      {/* Structure */}
      <rect x="174" y="130" width="8" height="80" rx="2" fill="#8A7660" />
      <rect x="338" y="130" width="8" height="80" rx="2" fill="#8A7660" />
      {/* Table */}
      <rect x="180" y="186" width="156" height="10" rx="3" fill="#C8B89A" />
      {/* Lampe */}
      <path d="M208 152 L198 182 L218 182 Z" fill="#E8651A" fillOpacity="0.8" />
      <rect x="205" y="182" width="6" height="6" rx="3" fill="#8A7660" />
      {/* Disque vinyle */}
      <circle cx="244" cy="168" r="16" fill="#1A1A1A" />
      <circle cx="244" cy="168" r="10" fill="#242424" />
      <circle cx="244" cy="168" r="4" fill="#E8651A" />
      {/* Tableau */}
      <rect x="272" y="148" width="48" height="36" rx="3" fill="#F5DEB3" stroke="#8B6914" strokeWidth="2" />
      <rect x="276" y="152" width="40" height="28" rx="2" fill="#87CEEB" fillOpacity="0.5" />
      <ellipse cx="286" cy="166" rx="8" ry="6" fill="#228B22" fillOpacity="0.4" />

      {/* ── Stand 3 (droite) ── */}
      {/* Toit */}
      <path d="M320 138 L400 108 L480 138 Z" fill="#228B22" fillOpacity="0.8" />
      <rect x="320" y="138" width="160" height="6" fill="#1A6B12" fillOpacity="0.8" />
      {/* Rayures */}
      <path d="M350 118 L342 138" stroke="white" strokeOpacity="0.3" strokeWidth="4" />
      <path d="M384 108 L376 138" stroke="white" strokeOpacity="0.3" strokeWidth="4" />
      <path d="M416 110 L408 138" stroke="white" strokeOpacity="0.3" strokeWidth="4" />
      <path d="M450 118 L442 138" stroke="white" strokeOpacity="0.3" strokeWidth="4" />
      {/* Structure */}
      <rect x="324" y="138" width="8" height="72" rx="2" fill="#8A7660" />
      <rect x="468" y="138" width="8" height="72" rx="2" fill="#8A7660" />
      {/* Table */}
      <rect x="330" y="188" width="140" height="10" rx="3" fill="#C8B89A" />
      {/* Objets */}
      <path d="M352 164 C348 164 344 168 343 176 L342 188 C341 195 345 198 352 198 C359 198 363 195 362 188 L361 176 C360 168 356 164 352 164Z" fill="#C8A96E" />
      <rect x="372" y="158" width="32" height="30" rx="4" fill="#8B4513" fillOpacity="0.6" />
      <rect x="376" y="162" width="24" height="22" rx="3" fill="#C8903C" fillOpacity="0.4" />
      <rect x="416" y="170" width="36" height="18" rx="3" fill="#2E5FAA" fillOpacity="0.7" />

      {/* ── Personnages ── */}
      {/* Chineur (centre-bas) */}
      <circle cx="240" cy="198" r="14" fill="#F5DEB3" />
      <rect x="226" y="212" width="28" height="32" rx="8" fill="#E8651A" />
      <rect x="222" y="216" width="8" height="22" rx="4" fill="#F5DEB3" />
      <rect x="250" y="216" width="8" height="22" rx="4" fill="#F5DEB3" />
      {/* Loupe tenue */}
      <circle cx="262" cy="230" r="8" fill="none" stroke="#0F0F0F" strokeWidth="2.5" />
      <line x1="268" y1="236" x2="272" y2="240" stroke="#0F0F0F" strokeWidth="2.5" strokeLinecap="round" />

      {/* Soleil */}
      <circle cx="420" cy="55" r="22" fill="#FFD700" fillOpacity="0.8" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <line
          key={i}
          x1={420 + 26 * Math.cos((angle * Math.PI) / 180)}
          y1={55 + 26 * Math.sin((angle * Math.PI) / 180)}
          x2={420 + 34 * Math.cos((angle * Math.PI) / 180)}
          y2={55 + 34 * Math.sin((angle * Math.PI) / 180)}
          stroke="#FFD700"
          strokeWidth="3"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
      ))}
    </svg>
  )
}

/** Petite illustration "carte / stand" pour les résultats de recherche */
export function StandCardIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <rect width="200" height="140" rx="12" fill="#F8F7F5" />
      {/* Stand miniature */}
      <path d="M30 60 L100 40 L170 60 Z" fill="#E8651A" fillOpacity="0.8" />
      <rect x="30" y="60" width="140" height="5" fill="#C85A10" fillOpacity="0.7" />
      <rect x="34" y="64" width="6" height="50" rx="2" fill="#8A7660" />
      <rect x="160" y="64" width="6" height="50" rx="2" fill="#8A7660" />
      <rect x="40" y="96" width="120" height="8" rx="2" fill="#C8B89A" />
      {/* Items */}
      <circle cx="72" cy="82" r="12" fill="#1A1A1A" />
      <circle cx="72" cy="82" r="6" fill="#242424" />
      <circle cx="72" cy="82" r="3" fill="#E8651A" />
      <rect x="92" y="72" width="16" height="24" rx="2" fill="#2E5FAA" />
      <path d="M120 74 C118 74 116 77 115 82 L114 90 C113 95 116 97 120 97 C124 97 127 95 126 90 L125 82 C124 77 122 74 120 74Z" fill="#C8A96E" />
      {/* Pin */}
      <path d="M100 20 C97 20 95 22 95 25 C95 29 98 31 100 34 C102 31 105 29 105 25 C105 22 103 20 100 20Z" fill="#E8651A" />
      <circle cx="100" cy="25" r="2.5" fill="white" />
      <ellipse cx="100" cy="35" rx="4" ry="1.5" fill="#0F0F0F" fillOpacity="0.1" />
    </svg>
  )
}
