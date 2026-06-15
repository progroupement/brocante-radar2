import type { Metadata } from 'next'
import DeptPage from '@/components/DeptPage'

export const metadata: Metadata = {
  title: "Brocantes et vide-greniers dans le Val-d'Oise (95) 2026",
  description: "Brocantes et vide-greniers dans le Val-d'Oise. Cergy, Pontoise, Argenteuil — trouvez les stands avec Brocante Radar, le GPS des chineurs.",
  alternates: { canonical: '/brocante-val-d-oise' },
}

export default function BrocanteValDOise() {
  return (
    <DeptPage
      config={{
        code: '95',
        nom: "Val-d'Oise",
        slug: 'val-d-oise',
        description:
          "Le Val-d'Oise, département le plus au nord de l'Île-de-France, accueille de nombreuses brocantes et vide-greniers dans un cadre souvent verdoyant. De Cergy-Pontoise à Argenteuil, en passant par Enghien-les-Bains et Montmorency, les événements se multiplient dès le printemps. Les bords de l'Oise et les parcs régionaux constituent de magnifiques cadres pour des brocantes champêtres. Brocante Radar recense tous ces événements et vous permet de préparer votre visite en localisant les stands qui vendent exactement ce que vous recherchez.",
      }}
    />
  )
}
