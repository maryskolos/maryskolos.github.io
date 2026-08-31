export const FSL_CLIENT = {
  name: 'Meridian Hobby Co.',
  environment: 'staging',
  baseUrl: 'https://staging.meridianhobby.example',
  apiKeyMasked: 'sk_test_••••7f2a',
  sku: 'MHC-8842',
  skuLabel: 'Limited-run model kit - 1 unit remaining',
} as const;

export const FSL_ENDPOINTS = [
  'POST /api/v1/inventory/{sku}/hold',
  'POST /api/v1/checkout/complete',
  'GET /api/v1/inventory/{sku}',
] as const;

export type FlashSaleScenarioId = 'last-unit' | 'timeout-storm' | 'hold-expiry';

export interface FlashSaleScenario {
  id: FlashSaleScenarioId;
  title: string;
  description: string;
  defaultBuyers: number;
  checkoutWindowSec: number;
  stock: number;
}

export const FSL_SCENARIOS: FlashSaleScenario[] = [
  {
    id: 'last-unit',
    title: 'Last unit',
    description: 'One SKU left and hundreds of buyers hit checkout at once.',
    defaultBuyers: 200,
    checkoutWindowSec: 90,
    stock: 1,
  },
  {
    id: 'timeout-storm',
    title: 'Payment timeout storm',
    description: 'Slow payment responses stack up while holds expire.',
    defaultBuyers: 120,
    checkoutWindowSec: 60,
    stock: 3,
  },
  {
    id: 'hold-expiry',
    title: 'Hold expiry race',
    description: 'Buyers complete checkout after their inventory hold window closes.',
    defaultBuyers: 80,
    checkoutWindowSec: 45,
    stock: 2,
  },
];
