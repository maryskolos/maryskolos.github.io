import { DM_Sans, Space_Grotesk, IBM_Plex_Mono } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-dm-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-ibm-plex-mono',
});

export default function FlashSaleLabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${dmSans.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}>
      {children}
    </div>
  );
}
