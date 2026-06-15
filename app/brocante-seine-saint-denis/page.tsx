import type { Metadata } from 'next'
import DeptPage from '@/components/DeptPage'

export const metadata: Metadata = {
  title: 'Brocantes et vide-greniers en Seine-Saint-Denis (93) 2026',
  description: 'Brocantes et vide-greniers en Seine-Saint-Denis. Saint-Denis, Montreuil, Aubervilliers — trouvez les stands avec Brocante Radar.',
  alternates: { canonical: '/brocante-seine-saint-denis' },
}

export default function BrocanteSeineSaintDenis() {
  return (
    <DeptPage
      config={{
        code: '93',
        nom: 'Seine-Saint-Denis',
        slug: 'seine-saint-denis',
        description:
          'La Seine-Saint-Denis est un département multiculturel et populaire qui fourmille de brocantes et de vide-greniers tout au long de l\'année. De Saint-Denis à Montreuil, en passant par Aubervilliers, Pantin et Noisy-le-Grand, les chineurs avertis y trouvent des objets rares à des prix défiant toute concurrence. Les brocantes du 93 sont réputées pour leur diversité et l\'authenticité de leurs exposants. Brocante Radar recense ces événements et vous permet de repérer les stands qui vendent exactement ce que vous cherchez.',
      }}
    />
  )
}
