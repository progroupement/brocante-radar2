import type { Metadata } from 'next'
import DeptPage from '@/components/DeptPage'

export const metadata: Metadata = {
  title: 'Brocantes et vide-greniers dans les Hauts-de-Seine (92) 2026',
  description: 'Brocantes et vide-greniers dans les Hauts-de-Seine. Nanterre, Boulogne, Levallois — trouvez les stands avec Brocante Radar.',
  alternates: { canonical: '/brocante-hauts-de-seine' },
}

export default function BrocanteHautsDeSeine() {
  return (
    <DeptPage
      config={{
        code: '92',
        nom: 'Hauts-de-Seine',
        slug: 'hauts-de-seine',
        description:
          'Les Hauts-de-Seine, département densément peuplé aux portes de Paris, offre de nombreuses opportunités pour les chineurs. De Boulogne-Billancourt à Nanterre, en passant par Levallois-Perret, Neuilly et Issy-les-Moulineaux, les vide-greniers de quartier et les brocantes associatives se succèdent tout au long de l\'année. La proximité de la capitale en fait un terrain de chasse idéal pour dénicher des objets de qualité à des prix souvent plus accessibles. Brocante Radar vous guide vers les stands qui vendent exactement ce que vous recherchez.',
      }}
    />
  )
}
