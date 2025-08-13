'use client';

import { Container, Box, Typography } from '@mui/material';
import { TypeAnimation } from 'react-type-animation';
import Navigation from '@/components/Navigation';
import AboutMe from '@/components/AboutMe';
import SkillsAndValues from '@/components/SkillsAndValues';
import Timeline from '@/components/Timeline';
import TicTacToe from '@/components/TicTacToe';
import Contact from '@/components/Contact';
import { commonStyles } from '@/styles/commonStyles';
import { theme } from '@/constants/theme';

const heroBackground = `
  linear-gradient(180deg, rgba(4, 4, 12, 0.8) 0%, rgba(73, 108, 153, 0.6) 40%, rgba(109, 128, 159, 0.4) 100%),
  radial-gradient(circle at 30% 20%, rgba(73, 108, 153, 0.3) 0%, transparent 50%),
  radial-gradient(circle at 70% 80%, rgba(144, 131, 144, 0.2) 0%, transparent 50%)
`;

const subtitleSequence = [
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

export default function Home() {
  return (
    <>
      <Navigation />
      <Container maxWidth="lg" sx={{ pl: { md: 12 }, border: 'none' }}>
        <Box sx={{ minHeight: '100vh', py: 4, border: 'none' }}>
          <Box 
            className="fade-in-header"
            sx={{ 
              textAlign: 'center', 
              py: { xs: 8, md: 12 },
              px: { xs: 2, md: 4 },
              background: heroBackground,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: theme.borderRadius.medium,
              border: '3px solid',
              borderColor: theme.colors.primary.main,
              mb: { xs: 2, md: 3 },
              position: 'relative',
            }}
          >
            <Typography
              id="top"
              variant="h1"
              component="h1"
              gutterBottom
              align="center"
              sx={{
                mb: 4,
                fontWeight: 400,
                color: theme.colors.text.primary,
                textShadow: '0 2px 8px rgba(0,0,0,0.9)',
              }}
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
              sx={{ 
                color: theme.colors.text.secondary,
                fontWeight: 400,
                fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                opacity: 0.95,
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.4,
                textShadow: '0 2px 6px rgba(0,0,0,0.8)',
              }}
            >
              <TypeAnimation
                sequence={subtitleSequence}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
              />
            </Typography>
          </Box>
          
          <Box id="about" className="fade-in-about">
            <AboutMe />
          </Box>
          
          <Box sx={commonStyles.separator} />
          
          <Box id="skills" className="fade-in-skills">
            <SkillsAndValues />
          </Box>
          
          <Box sx={commonStyles.separator} />
          
          <Box id="timeline" className="fade-in-timeline">
            <Timeline />
          </Box>
          
          <Box sx={commonStyles.separator} />
          
          <Box id="game" className="fade-in-game">
            <TicTacToe />
          </Box>
          
          <Box sx={commonStyles.separator} />
          
          <Box id="contact" className="fade-in-contact">
            <Contact />
          </Box>
        </Box>
      </Container>
    </>
  );
}
