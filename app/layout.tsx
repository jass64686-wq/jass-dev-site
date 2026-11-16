import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ConsentManager } from '@/components/portfolio/consent-manager'
import { SceneBackground } from '@/components/scene/scene-background'
import { SiteFooter } from '@/components/portfolio/site-footer'
import { SiteHeader } from '@/components/portfolio/site-header'
import { HOME_PAGE_TITLE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_PAGE_TITLE,
    template: '%s | Jass Dev',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    'full-stack web developer',
    'Next.js developer',
    'Shopify developer',
    'WordPress developer',
    'e-commerce development',
    'Webflow developer',
    'headless CMS',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: SITE_NAME,
    title: HOME_PAGE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: '/images/jass-professional.webp', alt: 'Portrait of Jass Dev' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_PAGE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/images/jass-professional.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#fdfcff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`light ${geist.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="font-sans antialiased">
        <SceneBackground />
        <SiteHeader />
        {children}
        <SiteFooter />
        <ConsentManager
          analyticsEnabled={process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'}
        />
      </body>
    </html>
  )
}
