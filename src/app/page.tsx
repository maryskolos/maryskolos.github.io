'use client';

import { Container, Box, Typography } from '@mui/material';
import { TypeAnimation } from 'react-type-animation';
import Navigation from '@/components/Navigation';
import AboutMe from '@/components/AboutMe';
import SkillsAndValues from '@/components/SkillsAndValues';
import Timeline from '@/components/Timeline';
import TicTacToe from '@/components/TicTacToe';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Navigation />
      <Container maxWidth="lg" sx={{ pl: { md: 12 }, border: 'none' }}>
        <Box sx={{ minHeight: '100vh', py: 4, border: 'none' }}>
          {/* Hero Header Section - Sequential fade-in */}
          <Box 
            className="fade-in-header"
            sx={{ 
              textAlign: 'center', 
              py: { xs: 8, md: 12 }, // More vertical padding
              px: { xs: 2, md: 4 }, // Horizontal padding
              background: `
                linear-gradient(180deg, rgba(4, 4, 12, 0.8) 0%, rgba(73, 108, 153, 0.6) 40%, rgba(109, 128, 159, 0.4) 100%),
                url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><radialGradient id="stars" cx="50%" cy="50%"><stop offset="0%" stop-color="%23ffffff" stop-opacity="0.8"/><stop offset="100%" stop-color="%23ffffff" stop-opacity="0"/></radialGradient><radialGradient id="milkyway" cx="30%" cy="20%"><stop offset="0%" stop-color="%239ca0b9" stop-opacity="0.3"/><stop offset="100%" stop-color="%239ca0b9" stop-opacity="0"/></radialGradient></defs><rect width="1200" height="800" fill="%2304040c"/><circle cx="200" cy="150" r="1" fill="url(%23stars)"/><circle cx="400" cy="100" r="0.8" fill="url(%23stars)"/><circle cx="600" cy="200" r="1.2" fill="url(%23stars)"/><circle cx="800" cy="120" r="0.9" fill="url(%23stars)"/><circle cx="1000" cy="180" r="1.1" fill="url(%23stars)"/><circle cx="300" cy="300" r="0.7" fill="url(%23stars)"/><circle cx="500" cy="250" r="1" fill="url(%23stars)"/><circle cx="700" cy="350" r="0.8" fill="url(%23stars)"/><circle cx="900" cy="280" r="1.2" fill="url(%23stars)"/><circle cx="1100" cy="320" r="0.9" fill="url(%23stars)"/><circle cx="150" cy="450" r="1" fill="url(%23stars)"/><circle cx="350" cy="400" r="0.8" fill="url(%23stars)"/><circle cx="550" cy="500" r="1.1" fill="url(%23stars)"/><circle cx="750" cy="450" r="0.9" fill="url(%23stars)"/><circle cx="950" cy="520" r="1.2" fill="url(%23stars)"/><circle cx="1150" cy="480" r="0.7" fill="url(%23stars)"/><circle cx="250" cy="600" r="1.1" fill="url(%23stars)"/><circle cx="450" cy="550" r="0.8" fill="url(%23stars)"/><circle cx="650" cy="650" r="1" fill="url(%23stars)"/><circle cx="850" cy="580" r="1.2" fill="url(%23stars)"/><circle cx="1050" cy="620" r="0.9" fill="url(%23stars)"/><circle cx="100" cy="700" r="1" fill="url(%23stars)"/><circle cx="300" cy="680" r="0.8" fill="url(%23stars)"/><circle cx="500" cy="720" r="1.1" fill="url(%23stars)"/><circle cx="700" cy="700" r="0.9" fill="url(%23stars)"/><circle cx="900" cy="750" r="1.2" fill="url(%23stars)"/><circle cx="1100" cy="730" r="0.7" fill="url(%23stars)"/><ellipse cx="400" cy="200" rx="300" ry="100" fill="url(%23milkyway)" opacity="0.4"/><ellipse cx="800" cy="400" rx="250" ry="80" fill="url(%23milkyway)" opacity="0.3"/><ellipse cx="600" cy="600" rx="200" ry="60" fill="url(%23milkyway)" opacity="0.2"/></svg>')
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 2,
                border: '3px solid', // Outer border
                borderColor: '#6d809f', // Medium slate blue from palette
                mb: { xs: 2, md: 3 },
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at 30% 20%, rgba(73, 108, 153, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(144, 131, 144, 0.2) 0%, transparent 50%)', // Subtle texture patterns using palette colors
                  borderRadius: 1,
                  zIndex: -1, // Background behind everything
                }
              }}
            >
              <Typography
                id="top"
                variant="h1"
                component="h1"
                gutterBottom
                align="center"
                sx={{
                  mb: 4, // More space below the title
                  fontWeight: 400, // Back to previous font weight
                  color: '#ffffff', // Pure white for maximum contrast and accessibility
                  textShadow: '0 2px 8px rgba(0,0,0,0.9)', // Stronger shadow for better text visibility
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
                  color: '#e8e9ea', // Very light gray for subtitle
                  fontWeight: 400,
                  fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                  opacity: 0.95,
                  maxWidth: '600px',
                  mx: 'auto',
                  lineHeight: 1.4,
                  textShadow: '0 2px 6px rgba(0,0,0,0.8)', // Shadow for subtitle visibility
                }}
              >
                <TypeAnimation
                  sequence={[
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
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                />
              </Typography>
            </Box>
            
            <Box id="about" className="fade-in-about">
              <AboutMe />
            </Box>
            
            {/* Separator border between about and skills */}
            <Box 
              sx={{ 
                height: '2px',
                width: '80%',
                mx: 'auto',
                my: { xs: 4, md: 6 },
                background: 'linear-gradient(90deg, transparent 0%, #496c99 20%, #496c99 80%, transparent 100%)', // Deep steel blue with gradient fade
              }}
            />
            
            <Box id="skills" className="fade-in-skills">
              <SkillsAndValues />
            </Box>
            
            {/* Separator border between skills and timeline */}
            <Box 
              sx={{ 
                height: '2px',
                width: '80%',
                mx: 'auto',
                my: { xs: 4, md: 6 },
                background: 'linear-gradient(90deg, transparent 0%, #496c99 20%, #496c99 80%, transparent 100%)', // Deep steel blue with gradient fade
              }}
            />
            
            <Box id="timeline" className="fade-in-timeline">
              <Timeline />
            </Box>
            
            {/* Separator border between timeline and game */}
            <Box 
              sx={{ 
                height: '2px',
                width: '80%',
                mx: 'auto',
                my: { xs: 4, md: 6 },
                background: 'linear-gradient(90deg, transparent 0%, #496c99 20%, #496c99 80%, transparent 100%)', // Deep steel blue with gradient fade
              }}
            />
            
            <Box id="game" className="fade-in-game">
              <TicTacToe />
            </Box>
            
            {/* Separator border between game and contact */}
            <Box 
              sx={{ 
                height: '2px',
                width: '80%',
                mx: 'auto',
                my: { xs: 4, md: 6 },
                background: 'linear-gradient(90deg, transparent 0%, #496c99 20%, #496c99 80%, transparent 100%)', // Deep steel blue with gradient fade
              }}
            />
            
            <Box id="contact" className="fade-in-contact">
              <Contact />
            </Box>
          </Box>
        </Container>
    </>
  );
}
