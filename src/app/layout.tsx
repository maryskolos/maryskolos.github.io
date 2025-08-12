import type { Metadata } from "next";
import { Inter, Outfit, Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";
import ThemeRegistry from '@/components/ThemeRegistry';

const inter = Inter({ subsets: ["latin"] });
const outfit = Outfit({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit'
});
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk'
});
const syne = Syne({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'),
  title: {
    default: "Personal Resume Website",
    template: "%s | Personal Resume Website",
  },
  description: "Professional resume and portfolio website showcasing software development skills and experience",
  keywords: [
    'software engineer',
    'full stack',
    'react',
    'next.js',
    'typescript',
    'material-ui',
    'portfolio',
    'resume',
  ],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    url: 'https://your-domain.com',
    title: 'Personal Resume Website',
    description: 'Professional resume and portfolio website showcasing software development skills and experience',
    siteName: 'Personal Resume Website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Personal Resume Website',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Personal Resume Website',
    description: 'Professional resume and portfolio website showcasing software development skills and experience',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [{ url: '/favicon.ico' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceGrotesk.variable} ${syne.variable}`}>
      <body className={inter.className}>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
