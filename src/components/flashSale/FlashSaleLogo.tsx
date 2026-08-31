'use client';

import { Box, Typography } from '@mui/material';
import { flashSaleColors } from '@/constants/flashSaleTheme';

interface FlashSaleLogoProps {
  /** Icon + wordmark, or icon only */
  variant?: 'full' | 'mark';
  /** Dark page background or light nav background */
  theme?: 'dark' | 'light';
  /** Overall height in px */
  height?: number;
}

export default function FlashSaleLogo({
  variant = 'full',
  theme = 'dark',
  height = 48,
}: FlashSaleLogoProps) {
  const markSrc =
    theme === 'dark' ? '/flash-sale-lab-mark-dark.svg' : '/flash-sale-lab-mark.svg';
  const markHeight = variant === 'full' ? Math.round(height * 0.9) : height;
  const titleColor = theme === 'dark' ? flashSaleColors.text : '#1E293B';
  const labColor = flashSaleColors.amber;

  if (variant === 'mark') {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={markSrc}
        alt=""
        style={{ height: markHeight, width: 'auto', display: 'block' }}
      />
    );
  }

  const scale = height / 48;
  const titleSize = `${Math.max(0.92, 1.28 * scale)}rem`;
  const labSize = `${Math.max(0.86, 1.18 * scale)}rem`;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: height <= 32 ? 0.875 : 1.25 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={markSrc}
        alt=""
        style={{ height: markHeight, width: 'auto', display: 'block', flexShrink: 0 }}
      />
      <Box sx={{ lineHeight: 0.88 }}>
        <Typography
          component="span"
          sx={{
            display: 'block',
            color: titleColor,
            fontFamily: flashSaleColors.display,
            fontWeight: 800,
            fontSize: titleSize,
            lineHeight: 0.88,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
          }}
        >
          Flash Sale
        </Typography>
        <Typography
          component="span"
          sx={{
            display: 'block',
            color: labColor,
            fontFamily: flashSaleColors.mono,
            fontWeight: 700,
            fontSize: labSize,
            lineHeight: 0.88,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          Lab
        </Typography>
      </Box>
    </Box>
  );
}
