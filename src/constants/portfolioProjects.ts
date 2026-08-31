export type PortfolioProject = {
  id: string;
  label: string;
  href: string;
  logo?: string;
  logoAlt?: string;
  status: 'live' | 'coming-soon';
  tagline?: string;
  summary?: string;
};

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'sapp',
    label: 'SApp',
    href: '/sapp/',
    logo: '/sapp-logo.png',
    logoAlt: 'SApp',
    status: 'live',
    tagline: 'Swipe. Share. Grow.',
    summary: 'Concept demo for a local plant-trading app - profile setup, swipe discovery, match, and chat.',
  },
  {
    id: 'flash-sale-lab',
    label: 'Flash Sale Lab',
    href: '/flash-sale-lab/',
    logo: '/flash-sale-lab-mark.svg',
    logoAlt: 'Flash Sale Lab',
    status: 'live',
    tagline: 'Checkout stress tests',
    summary:
      'B2B-style console for replaying flash-sale scenarios - race conditions, inventory holds, and idempotent checkout against a staging sandbox.',
  },
];

export function getProjectById(id: string) {
  return PORTFOLIO_PROJECTS.find((p) => p.id === id);
}
