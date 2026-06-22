import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Brocante Radar — Le GPS des chineurs en Île-de-France',
    template: '%s | Brocante Radar',
  },
  description:
    'Brocante Radar : trouvez les objets que vous cherchez avant même d\'arriver à la brocante. 50+ brocantes et vide-greniers référencés en Île-de-France — Paris, 77, 78, 91, 92, 93, 94, 95.',
  keywords: [
    'brocante île-de-france',
    'vide-grenier paris',
    'chineur paris',
    'brocante paris',
    'brocante 77 seine-et-marne',
    'brocante 78 yvelines',
    'brocante 91 essonne',
    'brocante 92 hauts-de-seine',
    'brocante 93 seine-saint-denis',
    'brocante 94 val-de-marne',
    'brocante 95 val-d-oise',
    'marché aux puces',
    'trouver objet brocante',
    'stands brocante',
    'GPS chineur',
  ],
  authors: [{ name: 'Brocante Radar' }],
  creator: 'Brocante Radar',
  metadataBase: new URL('https://brocanteradar.fr'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    siteName: 'Brocante Radar',
    locale: 'fr_FR',
    type: 'website',
    url: 'https://brocanteradar.fr',
    title: 'Brocante Radar — Le GPS des chineurs en Île-de-France',
    description: 'Trouvez les objets que vous cherchez avant même d\'arriver à la brocante. Brocantes et vide-greniers IDF référencés.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brocante Radar — Le GPS des chineurs',
    description: 'Brocantes et vide-greniers en Île-de-France. Trouvez vos objets avant d\'arriver.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#1A1A1A]">
        {children}
      </body>
    </html>
  )
}
