'use client';

import { Box, IconButton, Tooltip } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';
import { theme } from '@/constants/theme';

export default function ThemeToggle() {
  const { themeMode, toggleTheme, isTransitioning } = useTheme();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 10000,
        pointerEvents: isTransitioning ? 'none' : 'auto',
      }}
    >
      <Tooltip 
        title={`Switch to ${themeMode === 'dark' ? 'light' : 'dark'} mode`}
        placement="left"
      >
        <IconButton
          onClick={toggleTheme}
          disabled={isTransitioning}
          sx={{
            backgroundColor: themeMode === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(0, 0, 0, 0.1)',
            border: `2px solid ${themeMode === 'dark' 
              ? theme.colors.primary.main 
              : '#4A90E2'}`,
            color: themeMode === 'dark' 
              ? theme.colors.primary.main 
              : '#4A90E2',
            width: 48,
            height: 48,
            transition: 'all 0.3s ease-in-out',
            backdropFilter: 'blur(10px)',
            '&:hover': {
              backgroundColor: themeMode === 'dark' 
                ? 'rgba(255, 255, 255, 0.2)' 
                : 'rgba(0, 0, 0, 0.2)',
              transform: 'scale(1.1)',
              boxShadow: themeMode === 'dark'
                ? '0 8px 32px rgba(73, 108, 153, 0.4)'
                : '0 8px 32px rgba(74, 144, 226, 0.4)',
            },
            '&:disabled': {
              opacity: 0.5,
              transform: 'scale(0.95)',
            },
          }}
        >
          {themeMode === 'dark' ? (
            <LightMode sx={{ fontSize: 24 }} />
          ) : (
            <DarkMode sx={{ fontSize: 24 }} />
          )}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
