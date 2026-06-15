import type { Metadata } from 'next'
import DeptPage from '@/components/DeptPage'

export const metadata: Metadata = {
  title: 'Brocantes et vide-greniers en Essonne (91) 2026',
  description: 'Brocantes et vide-greniers en Essonne. Évry, Corbeil-Essonnes, Étampes — trouvez les stands avec Brocante Radar, le GPS des chineurs.',
  alternates: { canonical: '/brocante-essonne' },
}

export default function BrocanteEssonne() {
  return (
    <DeptPage
      config={{
        code: '91',
        nom: 'Essonne',
        slug: 'essonne',
        description:
          'L\'Essonne est un département dynamique qui accueille de nombreuses brocantes et vide-greniers tout au long de l\'année. D\'Évry à Étampes, en passant par Corbeil-Essonnes, Massy et Palaiseau, les associations organisent régulièrement des événements qui rassemblent aussi bien les collectionneurs que les familles souhaitant vendre ou acheter de bonnes affaires. Brocante Radar recense ces événements en temps réel et vous permet de trouver exactement ce que vous recherchez avant de vous déplacer en Essonne.',
      }}
    />
  )
}
