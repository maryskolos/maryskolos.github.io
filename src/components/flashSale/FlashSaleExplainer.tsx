'use client';

import { Box, Typography, Container } from '@mui/material';
import { flashSaleColors } from '@/constants/flashSaleTheme';
import { sectionInsetX } from '@/styles/commonStyles';

export default function FlashSaleExplainer() {
  return (
    <Box
      id="why"
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        ...sectionInsetX,
        bgcolor: flashSaleColors.bgPanel,
        borderTop: `1px solid ${flashSaleColors.border}`,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="overline"
          sx={{
            display: 'block',
            color: flashSaleColors.amber,
            letterSpacing: '0.14em',
            mb: 0.75,
            fontWeight: 700,
            fontFamily: flashSaleColors.display,
          }}
        >
          Why this exists
        </Typography>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            mb: 2.5,
            color: flashSaleColors.text,
            fontFamily: flashSaleColors.display,
            fontSize: { xs: '1.75rem', md: '2rem' },
            letterSpacing: '-0.02em',
          }}
        >
          Why Flash Sale Lab
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 640 }}>
          <Typography
            variant="body1"
            sx={{ color: flashSaleColors.text, lineHeight: 1.8, fontFamily: flashSaleColors.sans }}
          >
            Flash Sale Lab comes from my own experience building e-commerce websites - struggling with
            inventory tracking, transactions, and order fulfillment on high-traffic sites with fast-moving,
            low-stock items.
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: flashSaleColors.text, lineHeight: 1.8, fontFamily: flashSaleColors.sans }}
          >
            I&apos;ve done research and learned more about transactions and bank business norms than I care
            to acknowledge here. It can be difficult to keep promises to customers when many want the same
            thing, so making sure you&apos;re not overselling - or otherwise not handling a bad experience -
            makes a huge difference.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
