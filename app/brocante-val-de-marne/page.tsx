import type { Metadata } from 'next'
import DeptPage from '@/components/DeptPage'

export const metadata: Metadata = {
  title: 'Brocantes et vide-greniers dans le Val-de-Marne (94) 2026',
  description: 'Brocantes et vide-greniers dans le Val-de-Marne. Vincennes, Créteil, Ivry — trouvez les stands avec Brocante Radar, le GPS des chineurs.',
  alternates: { canonical: '/brocante-val-de-marne' },
}

export default function BrocanteValDeMarne() {
  return (
    <DeptPage
      config={{
        code: '94',
        nom: 'Val-de-Marne',
        slug: 'val-de-marne',
        description:
          'Le Val-de-Marne, aux portes sud-est de Paris, est un département riche en événements brocante. De Vincennes à Créteil, en passant par Ivry-sur-Seine, Vitry et Maisons-Alfort, les associations organisent régulièrement des vide-greniers et des brocantes appréciés par les habitants et les chineurs de passage. Le bois de Vincennes et ses alentours constituent un cadre idéal pour des brocantes en plein air. Brocante Radar référence ces événements et vous aide à localiser les stands qui vendent les objets de votre liste.',
      }}
    />
  )
}
