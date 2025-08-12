'use client';

import { Box, IconButton, Tooltip, Paper } from '@mui/material';
import { Home, Person, Code, Star, Timeline, Games, ContactMail } from '@mui/icons-material';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('top');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['top', 'about', 'interests', 'skills', 'timeline', 'game', 'contact'];
      const scrollPosition = window.scrollY + 100;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      
      // Check if we're near the bottom of the page
      const isNearBottom = scrollPosition + windowHeight >= documentHeight - 50;

      if (isNearBottom) {
        // If near bottom, activate the last section (contact)
        setActiveSection('contact');
        return;
      }

      // Normal section detection
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

  const navItems = [
    { id: 'about', label: 'About', icon: <Person /> },
    { id: 'skills', label: 'Skills', icon: <Star /> },
    { id: 'timeline', label: 'Experience', icon: <Timeline /> },
    { id: 'game', label: 'Game', icon: <Games /> },
    { id: 'contact', label: 'Contact', icon: <ContactMail /> },
  ];

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
          bgcolor: '#0a0a1a', // Slightly lighter navy background
          borderRadius: 3,
          border: '1px solid',
          borderColor: '#496c99', // Deep steel blue border
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(10, 10, 26, 0.98)', // High opacity navy
          boxShadow: '0 8px 32px rgba(73, 108, 153, 0.3)' // Deep steel blue shadow
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
                  color: activeSection === item.id ? '#6d809f' : '#e8e9ea', // Medium slate blue for active, very light gray for inactive
                  bgcolor: activeSection === item.id ? '#496c99' : 'transparent', // Deep steel blue for active background
                  border: '1px solid',
                  borderColor: activeSection === item.id ? '#6d809f' : 'transparent',
                  '&:hover': {
                    bgcolor: '#496c99', // Deep steel blue for hover
                    color: '#ffffff', // Pure white for hover text
                    transform: 'scale(1.1)',
                    borderColor: '#6d809f',
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