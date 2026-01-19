import type { Metadata } from 'next'
import './globals.css'

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
      </head>
      <body>{children}</body>
    </html>
  )
}
