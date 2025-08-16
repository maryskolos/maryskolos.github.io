'use client';

import { useState } from 'react';
import { Box, Typography, Fade, ClickAwayListener } from '@mui/material';
import { theme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { getCurrentTheme } from '@/utils/theme';

interface InfoTooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export default function InfoTooltip({ content, children, position = 'top' }: InfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { themeMode, isTransitioning, pendingTheme } = useTheme();
  const isDarkMode = themeMode === 'dark';
  
  const displayTheme = isTransitioning && pendingTheme ? pendingTheme : themeMode;
  const displayIsDarkMode = displayTheme === 'dark';

  const handleToggle = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

  const getPositionStyles = () => {
    const baseStyles = { left: '50%', transform: 'translateX(-50%)' };
    
    switch (position) {
      case 'top':
        return { ...baseStyles, bottom: '100%', mb: 1 };
      case 'bottom':
        return { ...baseStyles, top: '100%', mt: 1 };
      case 'left':
        return { right: '100%', top: '50%', transform: 'translateY(-50%)', mr: 1 };
      case 'right':
        return { left: '100%', top: '50%', transform: 'translateY(-50%)', ml: 1 };
      default:
        return { ...baseStyles, bottom: '100%', mb: 1 };
    }
  };

  const getArrowStyles = () => {
    const currentTheme = getCurrentTheme(displayIsDarkMode);
    const baseArrowStyles = { 
      content: '""', 
      position: 'absolute' as const, 
      border: '10px solid transparent' 
    };
    
    switch (position) {
      case 'top':
        return { ...baseArrowStyles, top: '100%', left: '50%', transform: 'translateX(-50%)', borderTopColor: currentTheme.primary.main };
      case 'bottom':
        return { ...baseArrowStyles, bottom: '100%', left: '50%', transform: 'translateX(-50%)', borderBottomColor: currentTheme.primary.main };
      case 'left':
        return { ...baseArrowStyles, left: '100%', top: '50%', transform: 'translateY(-50%)', borderLeftColor: currentTheme.primary.main };
      case 'right':
        return { ...baseArrowStyles, right: '100%', top: '50%', transform: 'translateY(-50%)', borderRightColor: currentTheme.primary.main };
      default:
        return { ...baseArrowStyles, top: '100%', left: '50%', transform: 'translateX(-50%)', borderTopColor: currentTheme.primary.main };
    }
  };

  const getTooltipStyles = () => {
    const currentTheme = getCurrentTheme(displayIsDarkMode);
    return {
      position: 'absolute' as const,
      ...getPositionStyles(),
      zIndex: 9999,
      minWidth: 400,
      maxWidth: 700,
      backgroundColor: displayIsDarkMode ? 'rgba(4, 4, 12, 0.98)' : 'rgba(255, 255, 255, 0.98)',
      border: `3px solid ${currentTheme.primary.main}`,
      borderRadius: theme.borderRadius.medium,
      padding: 3,
      boxShadow: displayIsDarkMode 
        ? '0 12px 40px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        : '0 12px 40px rgba(42, 42, 42, 0.2), 0 0 0 1px rgba(42, 42, 42, 0.1)',
      backdropFilter: 'blur(15px)',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: displayIsDarkMode
          ? `linear-gradient(135deg, rgba(73, 108, 153, 0.1) 0%, rgba(109, 128, 159, 0.05) 100%)`
          : `linear-gradient(135deg, rgba(74, 144, 226, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)`,
        borderRadius: theme.borderRadius.medium,
        zIndex: -1,
      },
      '&::after': getArrowStyles(),
    };
  };

  const getTooltipTextStyles = () => {
    const currentTheme = getCurrentTheme(displayIsDarkMode);
    return {
      color: currentTheme.text.primary,
      lineHeight: 1.6,
      fontSize: '0.9rem',
      fontWeight: 400,
      textShadow: displayIsDarkMode 
        ? '0 1px 3px rgba(0,0,0,0.8)' 
        : '0 1px 3px rgba(255,255,255,0.8)',
    };
  };

  return (
    <Box sx={{ position: 'relative', display: 'block', width: '100%' }}>
      <Box
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={handleToggle}
        sx={{
          cursor: 'pointer',
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </Box>

      <ClickAwayListener onClickAway={handleClose}>
        <Fade in={isOpen} timeout={200}>
          <Box sx={getTooltipStyles()}>
            <Typography variant="body2" sx={getTooltipTextStyles()}>
              {content}
            </Typography>
          </Box>
        </Fade>
      </ClickAwayListener>
    </Box>
  );
}