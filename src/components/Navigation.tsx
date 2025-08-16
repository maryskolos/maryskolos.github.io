'use client';

import { Box, IconButton, Tooltip, Paper } from '@mui/material';
import { Person, Star, Timeline, Games, ContactMail } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { theme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { getCurrentTheme } from '@/utils/theme';
import { scrollToSection } from '@/utils/scroll';

const navItems = [
  { id: 'about', label: 'About', icon: <Person /> },
  { id: 'skills', label: 'Skills', icon: <Star /> },
  { id: 'timeline', label: 'Experience', icon: <Timeline /> },
  { id: 'game', label: 'Game', icon: <Games /> },
  { id: 'contact', label: 'Contact', icon: <ContactMail /> },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('top');
  const { themeMode } = useTheme();
  const isDarkMode = themeMode === 'dark';

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['top', 'about', 'skills', 'timeline', 'game', 'contact'];
      const scrollPosition = window.scrollY + 100;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      
      const isNearBottom = scrollPosition + windowHeight >= documentHeight - 50;

      if (isNearBottom) {
        setActiveSection('contact');
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getNavigationStyles = () => ({
    position: 'fixed' as const,
    left: 20,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1000,
    display: { xs: 'none', md: 'block' }
  });

  const getPaperStyles = () => {
    const currentTheme = getCurrentTheme(isDarkMode);
    return {
      p: 1,
      bgcolor: currentTheme.background.paper,
      borderRadius: 3,
      border: '1px solid',
      borderColor: currentTheme.border.primary,
      backdropFilter: 'blur(10px)',
      backgroundColor: isDarkMode ? 'rgba(10, 10, 26, 0.98)' : 'rgba(248, 250, 255, 0.98)',
      boxShadow: isDarkMode ? theme.shadows.heavy : '0 8px 32px rgba(74, 144, 226, 0.3)'
    };
  };

  const getButtonStyles = (itemId: string) => {
    const currentTheme = getCurrentTheme(isDarkMode);
    const isActive = activeSection === itemId;
    
    return {
      width: 48,
      height: 48,
      color: isActive ? currentTheme.primary.main : currentTheme.text.secondary,
      bgcolor: isActive ? currentTheme.primary.dark : 'transparent',
      border: '1px solid',
      borderColor: isActive ? currentTheme.primary.main : 'transparent',
      '&:hover': {
        bgcolor: currentTheme.primary.dark,
        color: currentTheme.text.primary,
        transform: 'scale(1.1)',
        borderColor: currentTheme.primary.main,
      },
      transition: 'all 0.2s ease-in-out',
    };
  };

  return (
    <Box sx={getNavigationStyles()}>
      <Paper elevation={8} sx={getPaperStyles()}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {navItems.map((item) => (
            <Tooltip
              key={item.id}
              title={item.label}
              placement="right"
              arrow
            >
              <IconButton
                onClick={() => scrollToSection(item.id)}
                sx={getButtonStyles(item.id)}
              >
                {item.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      </Paper>
    </Box>
  );
} 