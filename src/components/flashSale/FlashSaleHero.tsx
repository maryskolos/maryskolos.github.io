'use client';

import { Box, Typography, Container, Chip } from '@mui/material';
import { flashSaleColors } from '@/constants/flashSaleTheme';
import { sectionInsetX } from '@/styles/commonStyles';
import { FSL_CLIENT } from '@/constants/flashSaleLab';
import FlashSaleLogo from '@/components/flashSale/FlashSaleLogo';

export default function FlashSaleHero() {
  return (
    <Box
      id="overview"
      component="section"
      aria-labelledby="fsl-heading"
      sx={{
        py: { xs: 6, md: 8 },
        ...sectionInsetX,
        background: `linear-gradient(180deg, ${flashSaleColors.bgPanel} 0%, ${flashSaleColors.bg} 100%)`,
        borderBottom: `1px solid ${flashSaleColors.border}`,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: { xs: 2.5, md: 4 },
          }}
        >
          <Box aria-label="Flash Sale Lab">
            <FlashSaleLogo variant="full" theme="dark" height={56} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              id="fsl-heading"
              variant="h2"
              component="h1"
              sx={{
                color: flashSaleColors.text,
                fontSize: { xs: '1.6rem', md: '2rem' },
                fontWeight: 600,
                mb: 1.5,
                fontFamily: flashSaleColors.display,
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              Checkout stress tests for staging
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: flashSaleColors.textMuted,
                lineHeight: 1.8,
                maxWidth: 560,
                mb: 2.5,
                fontSize: '1.05rem',
              }}
            >
              A B2B-style console for replaying flash-sale scenarios against a sandbox tenant - race
              conditions, inventory holds, and idempotent checkout, simulated in the browser.
            </Typography>
            <Chip
              label={`${FSL_CLIENT.name} · ${FSL_CLIENT.environment}`}
              size="small"
              sx={{
                bgcolor: flashSaleColors.bgElevated,
                color: flashSaleColors.textMuted,
                border: `1px solid ${flashSaleColors.border}`,
                fontFamily: flashSaleColors.mono,
                fontSize: '0.75rem',
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
