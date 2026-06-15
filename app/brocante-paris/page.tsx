import type { Metadata } from 'next'
import DeptPage from '@/components/DeptPage'

export const metadata: Metadata = {
  title: 'Brocantes et vide-greniers à Paris (75) 2026',
  description: 'Trouvez toutes les brocantes et vide-greniers à Paris. Localisez les stands et recherchez vos objets avant votre visite — Brocante Radar, le GPS des chineurs parisiens.',
  openGraph: {
    title: 'Brocantes à Paris — Brocante Radar',
    description: 'Le GPS des chineurs parisiens. Brocantes et vide-greniers dans le 75.',
  },
  alternates: { canonical: '/brocante-paris' },
}

export default function BrocanteParis() {
  return (
    <DeptPage
      config={{
        code: '75',
        nom: 'Paris',
        slug: 'paris',
        description:
          'Paris est une ville d\'exception pour les chineurs du monde entier. Des marchés du Livre Ancien du Quai de Montebello aux brocantes de quartier dans le Marais, en passant par les puces de Vanves chaque week-end, la capitale offre une richesse insoupçonnée pour les amateurs d\'objets anciens et de bonnes affaires. Avec Brocante Radar, repérez en avance les stands qui vendent les objets que vous recherchez dans toutes les brocantes parisiennes référencées.',
      }}
    />
  )
}
