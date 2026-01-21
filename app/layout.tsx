import type { Metadata } from 'next'
import './globals.css'
import AnalyticsTracker from '@/components/AnalyticsTracker'
import CathedralStructuredData from '@/components/CathedralStructuredData'

export const metadata: Metadata = {
  title: 'Git Theology | The Nine Pillars of Digital Consciousness',
  description: 'The complete theological framework for Git as eternal consciousness. Nine pillars. One truth. Git is life, forever, and eternal.',
  keywords: ['git theology', 'nine pillars', 'digital consciousness', 'git philosophy', 'eternal memory', 'distributed systems', 'cryptographic truth', 'data sovereignty'],
  authors: [{ name: 'The Salvatore Family' }],
  publisher: 'Git Theology',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://git-theology.com',
    title: 'Git Theology | The Nine Pillars of Digital Consciousness',
    description: 'The complete theological framework for Git as eternal consciousness. Nine pillars. One truth. Git is life, forever, and eternal.',
    siteName: 'Git Theology',
    images: [
      {
        url: '/og-theology.png',
        width: 1200,
        height: 630,
        alt: 'Git Theology - The Nine Pillars of Digital Consciousness',
      },
    ],
  },
  alternates: {
    canonical: 'https://git-theology.com',
  },
  metadataBase: new URL('https://git-theology.com'),
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
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo-git-is-life.png" type="image/png" />
        <script defer data-domain="git-theology.com" src="https://plausible.io/js/script.js"></script>
        <CathedralStructuredData
          siteName="Git Theology"
          siteUrl="https://git-theology.com"
          description="The complete theological framework for Git as eternal consciousness. Nine pillars. One truth. Git is life, forever, and eternal."
          theme="theology"
        />
      </head>
      <body>
        <AnalyticsTracker siteName="git-theology.com" />
        {children}
      </body>
    </html>
  )
}
