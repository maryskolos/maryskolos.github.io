'use client';

import { Box, Typography, Container } from '@mui/material';
import { oliveColors } from '@/constants/oliveTheme';
import { sectionInsetX } from '@/styles/commonStyles';
import PitchContent from './PitchContent';

export default function PitchDeck() {
  return (
    <Box
      id="the-idea"
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        ...sectionInsetX,
        bgcolor: oliveColors.cream,
        borderTop: `3px solid ${oliveColors.olivePale}`,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 3, md: 4 }, maxWidth: 720 }}>
          <Typography
            variant="overline"
            sx={{
              display: 'block',
              color: oliveColors.oliveMuted,
              letterSpacing: '0.14em',
              mb: 0.75,
              fontWeight: 600,
            }}
          >
            Why SApp
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mb: 1,
              textAlign: { xs: 'center', md: 'left' },
              fontSize: { xs: '2rem', md: '2.25rem' },
            }}
          >
            The Idea
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: oliveColors.oliveMuted,
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            Tap <strong>Demo SApp</strong> above to walk through the flow.
          </Typography>
        </Box>
        <PitchContent />
      </Container>
    </Box>
  );
}
