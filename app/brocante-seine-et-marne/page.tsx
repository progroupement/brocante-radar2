import type { Metadata } from 'next'
import DeptPage from '@/components/DeptPage'

export const metadata: Metadata = {
  title: 'Brocantes et vide-greniers en Seine-et-Marne (77) 2026',
  description: 'Brocantes et vide-greniers en Seine-et-Marne. De Fontainebleau à Meaux, trouvez les stands et les objets qui vous intéressent — Brocante Radar.',
  alternates: { canonical: '/brocante-seine-et-marne' },
}

export default function BrocanteSeineMarne() {
  return (
    <DeptPage
      config={{
        code: '77',
        nom: 'Seine-et-Marne',
        slug: 'seine-et-marne',
        description:
          'La Seine-et-Marne, avec ses nombreux villages et son tissu associatif actif, accueille chaque année des dizaines de brocantes et vide-greniers. De Fontainebleau à Meaux, en passant par Provins et Melun, ce département rural offre de véritables trésors aux chineurs patients. Les brocantes en plein air y sont particulièrement prisées au printemps et en été. Brocante Radar recense tous ces événements et vous permet de localiser précisément les stands qui vendent les objets de votre liste avant même de vous déplacer.',
      }}
    />
  )
}
