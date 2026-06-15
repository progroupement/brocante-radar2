import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Brocante Radar — Le GPS des chineurs',
    template: '%s | Brocante Radar',
  },
  description:
    'Trouvez les objets que vous cherchez avant même de parcourir la brocante. Brocante Radar référence les stands en Île-de-France.',
  keywords: ['brocante', 'vide-grenier', 'île-de-france', 'chineur', 'stands'],
  openGraph: {
    siteName: 'Brocante Radar',
    locale: 'fr_FR',
    type: 'website',
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
