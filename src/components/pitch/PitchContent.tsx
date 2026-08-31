'use client';

import { Box, Typography, Paper } from '@mui/material';
import { oliveColors, oliveTheme } from '@/constants/oliveTheme';

const pillars = [
  {
    emoji: '🍅',
    title: 'Surplus goes to waste',
    body: 'Backyard harvests and cuttings pile up while finding someone nearby still means scrolling random groups.',
  },
  {
    emoji: '🌿',
    title: 'Match by what you grow',
    body: 'Build a garden profile, swipe local growers, and connect over the plants you actually have - or want.',
  },
  {
    emoji: '🤝',
    title: 'Grow a real community',
    body: 'Every match is a neighbor, not a stranger - trades, tips, and seasonal check-ins that keep local growing alive.',
  },
];

const steps = [
  { num: '1', label: 'Build your garden profile' },
  { num: '2', label: 'Swipe nearby growers' },
  { num: '3', label: 'Match & coordinate pickup' },
];

const growers = [
  { src: '/images/profiles/tree-1.png', alt: 'Herb grower profile', tag: '🌿 Herbs' },
  { src: '/images/profiles/tree-2.png', alt: 'Tomato grower profile', tag: '🍅 Tomatoes' },
  { src: '/images/profiles/tree-3.png', alt: 'Apple grower profile', tag: '🍎 Apples' },
];

export default function PitchContent() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 4, md: 5 } }}>
      <Typography
        variant="body1"
        sx={{
          color: oliveColors.oliveDeep,
          lineHeight: 1.7,
          maxWidth: 640,
          fontSize: { xs: '1rem', md: '1.0625rem' },
        }}
      >
        SApp turns scattered gardening chatter into a{' '}
        <Box component="span" sx={{ color: oliveColors.oliveMoss, fontWeight: 600 }}>
          local growing community
        </Box>
        - matching neighbors by what they share, what they need, and how close they live.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 0.9fr) minmax(0, 1.1fr)' },
          gap: { xs: 3, md: 4 },
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            borderRadius: 3,
            overflow: 'hidden',
            bgcolor: oliveColors.olivePale,
            border: `1px solid ${oliveColors.olivePale}`,
            p: { xs: 2, sm: 2.5 },
            minHeight: { xs: 220, md: 280 },
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 1.5,
              height: '100%',
            }}
          >
            {growers.map((grower, i) => (
              <Box
                key={grower.src}
                sx={{
                  position: 'relative',
                  borderRadius: 2,
                  overflow: 'hidden',
                  aspectRatio: '3 / 4',
                  boxShadow: oliveTheme.shadows.card,
                  transform: i === 1 ? 'translateY(-8px)' : i === 2 ? 'translateY(4px)' : 'none',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={grower.src}
                  alt={grower.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    px: 0.75,
                    py: 0.5,
                    bgcolor: 'rgba(61, 74, 50, 0.72)',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: oliveColors.cream, fontWeight: 600, fontSize: '0.65rem' }}
                  >
                    {grower.tag}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              bgcolor: oliveColors.white,
              borderRadius: 2,
              px: 1.25,
              py: 0.75,
              boxShadow: oliveTheme.shadows.card,
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sapp-logo.png" alt="" aria-hidden="true" style={{ height: 20, width: 'auto' }} />
            <Typography variant="caption" sx={{ color: oliveColors.oliveMoss, fontWeight: 600 }}>
              Nearby growers
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {pillars.map((pillar) => (
            <Paper
              key={pillar.title}
              elevation={0}
              sx={{
                p: { xs: 2, sm: 2.25 },
                display: 'flex',
                gap: 1.75,
                alignItems: 'flex-start',
                bgcolor: oliveColors.white,
                border: `1px solid ${oliveColors.olivePale}`,
                borderRadius: 2,
                transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                '&:hover': {
                  boxShadow: oliveTheme.shadows.card,
                  transform: 'translateY(-1px)',
                },
              }}
            >
              <Box
                aria-hidden="true"
                sx={{
                  fontSize: '1.5rem',
                  lineHeight: 1,
                  flexShrink: 0,
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: oliveColors.olivePale,
                  borderRadius: '50%',
                }}
              >
                {pillar.emoji}
              </Box>
              <Box>
                <Typography
                  variant="subtitle1"
                  component="h3"
                  sx={{ color: oliveColors.oliveMoss, fontWeight: 600, mb: 0.25, lineHeight: 1.3 }}
                >
                  {pillar.title}
                </Typography>
                <Typography variant="body2" sx={{ color: oliveColors.oliveDeep, lineHeight: 1.6 }}>
                  {pillar.body}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>

      <Box>
        <Typography
          variant="overline"
          sx={{
            display: 'block',
            color: oliveColors.oliveMuted,
            letterSpacing: '0.12em',
            mb: 1.5,
            fontWeight: 600,
          }}
        >
          How it works
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 1.5,
          }}
        >
          {steps.map((step, i) => (
            <Box
              key={step.num}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                p: { xs: 1.75, sm: 2 },
                bgcolor: oliveColors.olivePale,
                borderRadius: 2,
                border: `1px solid ${oliveColors.oliveMuted}44`,
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  bgcolor: oliveColors.oliveMoss,
                  color: oliveColors.cream,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {step.num}
              </Box>
              <Typography variant="body2" sx={{ color: oliveColors.oliveDeep, fontWeight: 500, lineHeight: 1.4 }}>
                {step.label}
              </Typography>
              {i < steps.length - 1 && (
                <Box
                  aria-hidden="true"
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    position: 'absolute',
                    right: -10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: oliveColors.oliveMuted,
                    fontSize: '1rem',
                    zIndex: 1,
                  }}
                >
                  →
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
