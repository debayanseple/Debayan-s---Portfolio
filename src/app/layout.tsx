import type { Metadata, Viewport } from 'next'
import { site } from '@/config/site'
import SmoothScroll from '@/components/ui/SmoothScroll'
import Cursor from '@/components/ui/Cursor'
import './globals.css'

const siteUrl = 'https://debayansportfolio.vercel.app'
const ogImage = `${siteUrl}/assets/avatar.webp`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Debayan Chakraborty — UI/UX Designer & Frontend Developer | Kolkata',
    template: '%s — Debayan Chakraborty',
  },
  description:
    'UI/UX Designer & Frontend Developer based in Kolkata, India. 2+ years building production web apps, Zoho Creator & Deluge automation, and 4 live Play Store apps. Zoho • React • Next.js • Supabase.',
  keywords: [
    'Debayan Chakraborty',
    'UI/UX Designer',
    'Frontend Developer',
    'Kolkata',
    'Zoho Creator',
    'Deluge Script',
    'React Developer',
    'Next.js',
    'TanStack Start',
    'Supabase',
    'Portfolio',
  ],
  authors: [{ name: 'Debayan Chakraborty', url: siteUrl }],
  creator: 'Debayan Chakraborty',
  publisher: 'Debayan Chakraborty',
  category: 'portfolio',
  alternates: {
    canonical: siteUrl,
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
  openGraph: {
    title: 'Debayan Chakraborty — UI/UX Designer & Frontend Developer',
    description:
      'UI/UX Designer & Frontend Developer based in Kolkata. Zoho Creator • Deluge • React • Next.js • Supabase. 4 live Play Store apps & Zoho ecosystem integrations.',
    url: siteUrl,
    siteName: 'Debayan Chakraborty — Portfolio',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Debayan Chakraborty — UI/UX Designer & Frontend Developer',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debayan Chakraborty — UI/UX Designer & Frontend Developer',
    description:
      'Kolkata-based UI/UX & Frontend Developer. Zoho Creator, Deluge, React, Next.js. Explore 9 live projects.',
    images: [ogImage],
  },
  verification: {
    google: 'mx8RIjv2BAEyS-qdJhci7J5CfennRMWj6gn6gU2-laA',
  },
}

export const viewport: Viewport = {
  themeColor: '#f3f1eb',
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Debayan Chakraborty',
    jobTitle: 'UI/UX Designer & Frontend Developer',
    url: siteUrl,
    image: ogImage,
    sameAs: ['https://www.linkedin.com/in/debayan-chakraborty-developer', 'https://debayansportfolio.vercel.app/'],
    address: { '@type': 'PostalAddress', addressLocality: 'Kolkata', addressCountry: 'IN' },
    knowsAbout: ['UI/UX', 'Frontend Development', 'Zoho Creator', 'Deluge Script', 'React', 'Next.js', 'Supabase'],
  }
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Debayan Chakraborty — Portfolio',
    url: siteUrl,
    inLanguage: 'en-IN',
  }
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/archivo-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </head>
      <body>
        <SmoothScroll />
        <Cursor />
        <a
          href="#intro"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
