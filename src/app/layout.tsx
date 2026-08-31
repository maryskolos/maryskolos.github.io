import type { Metadata } from 'next';
import { Figtree, Fraunces } from 'next/font/google';
import './globals.css';
import ThemeRegistry from '@/components/ThemeRegistry';
import SkipLink from '@/components/SkipLink';
import SiteChrome from '@/components/SiteChrome';

const figtree = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-figtree',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === 'production'
      ? 'https://maryskolos.github.io'
      : 'http://localhost:3000'
  ),
  title: {
    default: 'Mary Skolos',
    template: '%s | Mary Skolos',
  },
  description:
    'Portfolio of Mary Skolos - full-stack software engineer. Concept demos, case studies, and writing on e-commerce, payments, and cloud-backed product work.',
  keywords: [
    'SApp',
    'plant trading',
    'portfolio',
    'software engineer',
    'Mary Skolos',
    'full stack',
    'react',
    'next.js',
  ],
  authors: [{ name: 'Mary Skolos' }],
  creator: 'Mary Skolos',
  openGraph: {
    type: 'website',
    url:
      process.env.NODE_ENV === 'production'
        ? 'https://maryskolos.github.io'
        : 'http://localhost:3000',
    title: 'Mary Skolos',
    description:
      'Full-stack software engineer portfolio - concept demos, case studies, and writing on e-commerce, payments, and product engineering.',
    siteName: 'Mary Skolos',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SApp - Swipe. Share. Grow.',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mary Skolos',
    description:
      'Full-stack software engineer portfolio - concept demos, case studies, and writing on e-commerce, payments, and product engineering.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [{ url: '/sapp-logo.png' }],
    apple: [{ url: '/sapp-logo.png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} ${fraunces.variable}`}>
      <body className={figtree.className}>
        <SkipLink />
        <ThemeRegistry>
          <SiteChrome>{children}</SiteChrome>
        </ThemeRegistry>
      </body>
    </html>
  );
}
