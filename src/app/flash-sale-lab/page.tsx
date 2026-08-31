import type { Metadata } from 'next';
import FlashSaleHero from '@/components/flashSale/FlashSaleHero';
import FlashSaleLabDemo from '@/components/flashSale/FlashSaleLabDemo';
import FlashSaleExplainer from '@/components/flashSale/FlashSaleExplainer';
import FlashSaleSystemDesign from '@/components/flashSale/FlashSaleSystemDesign';

export const metadata: Metadata = {
  title: 'Flash Sale Lab',
  description:
    'Checkout stress-testing console - simulated flash-sale scenarios, inventory holds, and idempotent checkout for e-commerce staging environments.',
};

export default function FlashSaleLabPage() {
  return (
    <>
      <FlashSaleHero />
      <FlashSaleLabDemo />
      <FlashSaleExplainer />
      <FlashSaleSystemDesign />
    </>
  );
}
