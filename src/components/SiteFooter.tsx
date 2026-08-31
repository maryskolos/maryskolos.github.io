'use client';

import { Box, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import { oliveColors } from '@/constants/oliveTheme';
import { flashSaleColors } from '@/constants/flashSaleTheme';
import { normalizePath } from '@/constants/sappNav';

const YEAR = new Date().getFullYear();

export default function SiteFooter() {
  const pathname = usePathname();
  const isFlashSaleLab = normalizePath(pathname) === '/flash-sale-lab';

  return (
    <Box
      component="footer"
      sx={{
        px: { xs: 2, sm: 3, md: 4 },
        py: 3,
        borderTop: `1px solid ${isFlashSaleLab ? flashSaleColors.border : oliveColors.olivePale}`,
        bgcolor: isFlashSaleLab ? flashSaleColors.bgPanel : oliveColors.cream,
        textAlign: 'center',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: isFlashSaleLab ? flashSaleColors.textMuted : oliveColors.oliveMuted,
          letterSpacing: '0.04em',
          fontSize: '0.75rem',
        }}
      >
        © {YEAR} Mary Skolos. All rights reserved.
      </Typography>
    </Box>
  );
}
