'use client';

import { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export function useThemeEffect() {
  const { themeMode, isTransitioning } = useTheme();

  useEffect(() => {
    // Only apply theme changes when not transitioning to prevent flash
    if (!isTransitioning) {
      const html = document.documentElement;
      html.setAttribute('data-theme', themeMode);
      
      // Update body background and text colors
      document.body.style.backgroundColor = themeMode === 'dark' ? '#0a0a0a' : '#ffffff';
      document.body.style.color = themeMode === 'dark' ? '#ffffff' : '#2A2A2A';
    }
  }, [themeMode, isTransitioning]);
}
