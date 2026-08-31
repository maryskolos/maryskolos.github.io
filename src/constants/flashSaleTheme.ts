import { oliveColors } from '@/constants/oliveTheme';

/** Warm dark palette - olive undertone so the shift from site cream feels less cold */
export const flashSaleColors = {
  bg: '#171C19',
  bgPanel: '#1E2420',
  bgElevated: '#252C27',
  border: '#3D4A42',
  text: '#E8EDE6',
  textMuted: '#9CA89C',
  amber: '#F59E0B',
  amberDim: '#B45309',
  fail: '#EF4444',
  failBg: 'rgba(239, 68, 68, 0.08)',
  pass: '#22C55E',
  passBg: 'rgba(34, 197, 94, 0.08)',
  mono: 'var(--font-ibm-plex-mono), "IBM Plex Mono", ui-monospace, monospace',
  sans: 'var(--font-dm-sans), "DM Sans", system-ui, sans-serif',
  display: 'var(--font-space-grotesk), "Space Grotesk", system-ui, sans-serif',
  /** Matches site cream - used for bridge gradients only */
  siteCream: oliveColors.cream,
} as const;
