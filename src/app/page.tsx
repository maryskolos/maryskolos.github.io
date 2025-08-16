'use client';

import { Container, Box, Typography } from '@mui/material';
import { TypeAnimation } from 'react-type-animation';
import Navigation from '@/components/Navigation';
import AboutMe from '@/components/AboutMe';
import SkillsAndValues from '@/components/SkillsAndValues';
import Timeline from '@/components/Timeline';
import TicTacToe from '@/components/TicTacToe';
import Contact from '@/components/Contact';
import CursorHighlight from '@/components/CursorHighlight';
import ThemeToggle from '@/components/ThemeToggle';
import ThemeSlideOver from '@/components/ThemeSlideOver';
import { useThemeEffect } from '@/hooks/useThemeEffect';
import { useTheme } from '@/contexts/ThemeContext';
import { getCommonStyles } from '@/styles/commonStyles';
import { theme } from '@/constants/theme';
import { getCurrentTheme } from '@/utils/theme';

const DARK_HERO_BACKGROUND = `
  linear-gradient(180deg, rgba(4, 4, 12, 0.8) 0%, rgba(73, 108, 153, 0.6) 40%, rgba(109, 128, 159, 0.4) 100%),
  radial-gradient(circle at 30% 20%, rgba(73, 108, 153, 0.3) 0%, transparent 50%),
  radial-gradient(circle at 70% 80%, rgba(144, 131, 144, 0.2) 0%, transparent 50%)
`;

const LIGHT_HERO_BACKGROUND = `
  linear-gradient(180deg, rgba(74, 144, 226, 0.5) 0%, rgba(74, 144, 226, 0.3) 40%, rgba(76, 175, 80, 0.2) 100%),
  radial-gradient(circle at 30% 20%, rgba(74, 144, 226, 0.4) 0%, transparent 50%),
  radial-gradient(circle at 70% 80%, rgba(76, 175, 80, 0.2) 0%, transparent 50%)
`;

const SUBTITLE_SEQUENCE = [
  'Software Engineer & Creative Problem Solver',
  3000,
  'Full Stack Developer with Laravel & React',
  3000,
  'Agile Leader & Junior Developer Mentor',
  3000,
  'E-commerce & SaaS Platform Expert',
  3000,
  'Toastmasters Speaker & Team Collaborator',
  3000
];

const getHeroStyles = (isDarkMode: boolean) => {
  const currentTheme = getCurrentTheme(isDarkMode);
  return {
    textAlign: 'center',
    py: { xs: 8, md: 12 },
    px: { xs: 2, md: 4 },
    background: isDarkMode ? DARK_HERO_BACKGROUND : LIGHT_HERO_BACKGROUND,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: theme.borderRadius.medium,
    border: '3px solid',
    borderColor: currentTheme.primary.main,
    mb: 0,
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: isDarkMode ? 'url("/night-sky.jpg")' : 'url("/day-sky.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      opacity: isDarkMode ? 0.7 : 0.5,
      zIndex: -1,
      borderRadius: theme.borderRadius.medium,
    }
  };
};

const getHeroTitleStyles = (isDarkMode: boolean) => ({
  mb: 4,
  fontWeight: 400,
  color: '#ffffff',
  textShadow: isDarkMode ? '0 1px 3px rgba(0,0,0,0.4)' : '0 1px 2px rgba(0,0,0,0.1)',
});

const getHeroSubtitleStyles = (isDarkMode: boolean) => ({
  color: '#ffffff',
  fontWeight: 400,
  fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
  opacity: 0.95,
  maxWidth: '600px',
  mx: 'auto',
  lineHeight: 1.4,
  textShadow: isDarkMode ? '0 2px 6px rgba(0,0,0,0.8)' : '0 1px 3px rgba(42,42,42,0.3)',
});

const getMainContainerStyles = () => ({
  minHeight: '100vh',
  py: { xs: 1, md: 2 },
  border: 'none'
});

const getContainerStyles = () => ({
  pl: { md: 12 },
  border: 'none'
});

const pageSections = [
  { id: 'about', component: <AboutMe />, className: 'fade-in-about' },
  { id: 'skills', component: <SkillsAndValues />, className: 'fade-in-skills' },
  { id: 'timeline', component: <Timeline />, className: 'fade-in-timeline' },
  { id: 'game', component: <TicTacToe />, className: 'fade-in-game' },
  { id: 'contact', component: <Contact />, className: 'fade-in-contact' }
];

export default function Home() {
  useThemeEffect();
  const { themeMode, isTransitioning, pendingTheme } = useTheme();
  const isDarkMode = themeMode === 'dark';
  const commonStyles = getCommonStyles(isDarkMode);
  
  const displayTheme = isTransitioning && pendingTheme ? pendingTheme : themeMode;
  const displayIsDarkMode = displayTheme === 'dark';
  
  return (
    <>
      <ThemeToggle />
      <ThemeSlideOver />
      <CursorHighlight />
      <Navigation />
      <Container maxWidth="lg" sx={getContainerStyles()}>
        <Box sx={getMainContainerStyles()}>
          <Box className="fade-in-header" sx={getHeroStyles(displayIsDarkMode)}>
            <Typography
              id="top"
              variant="h1"
              component="h1"
              gutterBottom
              align="center"
              sx={getHeroTitleStyles(displayIsDarkMode)}
            >
              <TypeAnimation
                sequence={['Mary Skolos', 8000]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
              />
            </Typography>
            
            <Typography 
              variant="h4" 
              component="h2" 
              align="center" 
              sx={getHeroSubtitleStyles(displayIsDarkMode)}
            >
              <TypeAnimation
                sequence={SUBTITLE_SEQUENCE}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
              />
            </Typography>
          </Box>
          
          {pageSections.map((section, index) => (
            <Box key={section.id}>
              <Box id={section.id} className={section.className} sx={{ pt: 0 }}>
                {section.component}
              </Box>
              {index < pageSections.length - 1 && <Box sx={commonStyles.separator} />}
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
}
