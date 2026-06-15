import type { Metadata } from 'next'
import DeptPage from '@/components/DeptPage'

export const metadata: Metadata = {
  title: 'Brocantes et vide-greniers dans les Yvelines (78) 2026',
  description: 'Brocantes et vide-greniers dans les Yvelines. Versailles, Saint-Germain-en-Laye, Rambouillet — trouvez les stands et les objets recherchés avec Brocante Radar.',
  alternates: { canonical: '/brocante-yvelines' },
}

export default function BrocanteYvelines() {
  return (
    <DeptPage
      config={{
        code: '78',
        nom: 'Yvelines',
        slug: 'yvelines',
        description:
          'Les Yvelines abritent une culture du chineur bien ancrée, entre les châteaux de Versailles et de Rambouillet, les villes historiques de Saint-Germain-en-Laye et de Poissy. Les vide-greniers de quartier y côtoient des brocantes plus importantes organisées par des associations locales. Le mobilier de style Louis XV ou XVI, les porcelaines et les objets décoratifs sont particulièrement présents dans ce département chic de l\'Île-de-France. Brocante Radar vous guide stand par stand pour ne jamais rater la pièce rare.',
      }}
    />
  )
}
