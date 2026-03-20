import type { Metadata } from 'next'
import { Cormorant_Garamond, Outfit } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: 'Valorys — Intelligence Immobilière', template: '%s | Valorys' },
  description: 'Valorys détecte les meilleures opportunités d\'investissement immobilier en France. Scoring IA, données DVF réelles, calculatrices fiscales, bilan marchand de biens.',
  keywords: ['investissement immobilier', 'marchand de biens', 'DVF', 'rendement locatif', 'LMNP'],
  authors: [{ name: 'Valorys' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://valorys.fr'),
  openGraph: {
    title: 'Valorys — Intelligence Immobilière',
    description: 'Les meilleures opportunités d\'investissement immobilier en France, analysées par l\'IA.',
    url: 'https://valorys.fr',
    siteName: 'Valorys',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-ink antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
