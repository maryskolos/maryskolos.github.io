'use client';

import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeSlideOver() {
  const { isTransitioning, pendingTheme, completeTransition } = useTheme();

  useEffect(() => {
    if (isTransitioning && pendingTheme) {
      // Start the slide animation
      const timer = setTimeout(() => {
        // Complete the theme transition after animation
        completeTransition();
      }, 400); // Reduced to 400ms for very snappy transition

      return () => clearTimeout(timer);
    }
  }, [isTransitioning, pendingTheme, completeTransition]);

  if (!isTransitioning || !pendingTheme) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9998,
        pointerEvents: 'none',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'transparent',
          animation: 'revealMask 0.4s ease-out forwards',
        },
        '@keyframes revealMask': {
          '0%': {
            clipPath: 'inset(0 100% 0 0)',
          },
          '100%': {
            clipPath: 'inset(0 0% 0 0)',
          },
        },
      }}
    />
  );
}
