import type { Metadata } from 'next';
import Hero from '@/components/sapp/Hero';
import PitchDeck from '@/components/pitch/PitchDeck';
import SappSystemDesign from '@/components/sapp/SappSystemDesign';

export const metadata: Metadata = {
  title: 'SApp',
  description:
    'Interactive concept demo - local plant-trading app with profile setup, swipe discovery, match, chat, and system design.',
};

export default function SappPage() {
  return (
    <>
      <Hero />
      <PitchDeck />
      <SappSystemDesign />
    </>
  );
}
