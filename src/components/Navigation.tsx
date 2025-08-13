'use client';

import { Box, IconButton, Tooltip, Paper } from '@mui/material';
import { Person, Star, Timeline, Games, ContactMail } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { theme } from '@/constants/theme';

const navItems = [
  { id: 'about', label: 'About', icon: <Person /> },
  { id: 'skills', label: 'Skills', icon: <Star /> },
  { id: 'timeline', label: 'Experience', icon: <Timeline /> },
  { id: 'game', label: 'Game', icon: <Games /> },
  { id: 'contact', label: 'Contact', icon: <ContactMail /> },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('top');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 20,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        display: { xs: 'none', md: 'block' }
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 1,
          bgcolor: theme.colors.background.paper,
          borderRadius: 3,
          border: '1px solid',
          borderColor: theme.colors.border.primary,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(10, 10, 26, 0.98)',
          boxShadow: theme.shadows.heavy
        }}
      >
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
                sx={{
                  width: 48,
                  height: 48,
                  color: activeSection === item.id ? theme.colors.primary.main : theme.colors.text.secondary,
                  bgcolor: activeSection === item.id ? theme.colors.primary.dark : 'transparent',
                  border: '1px solid',
                  borderColor: activeSection === item.id ? theme.colors.primary.main : 'transparent',
                  '&:hover': {
                    bgcolor: theme.colors.primary.dark,
                    color: theme.colors.text.primary,
                    transform: 'scale(1.1)',
                    borderColor: theme.colors.primary.main,
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
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