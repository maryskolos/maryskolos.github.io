'use client';

import { Box, Typography, Paper, Chip, Button } from '@mui/material';
import { TrendingUp, Group, Code, Psychology, Email, Work, Cloud, Security } from '@mui/icons-material';
import AnimatedCounter from '@/components/AnimatedCounter';

export default function AboutMe() {
  return (
    <Box sx={{ py: 8 }}>
      <Typography variant="h2" component="h2" gutterBottom>
        About Me
      </Typography>
      
      <Typography variant="h4" component="h3" gutterBottom sx={{ mb: 3 }}>
        Passionate software developer with 5 years of experience in SaaS and e-commerce environments
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4 }}>
        I coordinate large-scale projects and manage junior developers with a passion for games such as Magic the Gathering and D&D. 
        I enjoy spending my time learning about new coding tools, including AI.
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#0a0a1a', border: '1px solid', borderColor: '#496c99' }}>
          <Work sx={{ fontSize: 60, mb: 2, color: '#6d809f' }} />
          <AnimatedCounter target={5} suffix="" />
          <Typography variant="body2" sx={{ color: '#e8e9ea' }}>Years Experience</Typography>
        </Paper>
        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#0a0a1a', border: '1px solid', borderColor: '#496c99' }}>
          <Code sx={{ fontSize: 60, mb: 2, color: '#9ca0b9' }} />
          <Typography variant="h6" sx={{ color: '#ffffff', mb: 1 }}>Agile & TDD</Typography>
          <Typography variant="body2" sx={{ color: '#e8e9ea' }}>Development Practices</Typography>
        </Paper>
        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#0a0a1a', border: '1px solid', borderColor: '#496c99' }}>
          <Group sx={{ fontSize: 60, mb: 2, color: '#496c99' }} />
          <Typography variant="h6" sx={{ color: '#ffffff', mb: 1 }}>Toastmasters</Typography>
          <Typography variant="body2" sx={{ color: '#e8e9ea' }}>Public Speaking Excellence</Typography>
        </Paper>
        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#0a0a1a', border: '1px solid', borderColor: '#496c99' }}>
          <TrendingUp sx={{ fontSize: 60, mb: 2, color: '#6d809f' }} />
          <Typography variant="h6" sx={{ color: '#ffffff', mb: 1 }}>Full Stack Developer</Typography>
          <Typography variant="body2" sx={{ color: '#e8e9ea' }}>PHP, JavaScript, React, Python</Typography>
        </Paper>
        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#0a0a1a', border: '1px solid', borderColor: '#496c99' }}>
          <Cloud sx={{ fontSize: 60, mb: 2, color: '#9ca0b9' }} />
          <Typography variant="h6" sx={{ color: '#ffffff', mb: 1 }}>Cloud & DevOps</Typography>
          <Typography variant="body2" sx={{ color: '#e8e9ea' }}>AWS, Elasticsearch, Redis, CI/CD</Typography>
        </Paper>
        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#0a0a1a', border: '1px solid', borderColor: '#496c99' }}>
          <Security sx={{ fontSize: 60, mb: 2, color: '#496c99' }} />
          <Typography variant="h6" sx={{ color: '#ffffff', mb: 1 }}>Security & Quality</Typography>
          <Typography variant="body2" sx={{ color: '#e8e9ea' }}>OWASP Certified, Testing, Best Practices</Typography>
        </Paper>
      </Box>
      
      {/* References Available Section - Full Width */}
      <Box sx={{ mt: 4, gridColumn: '1 / -1' }}>
        <Paper 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            bgcolor: '#0a0a1a', // Slightly lighter navy background
            border: '1px solid',
            borderColor: '#496c99', // Deep steel blue border
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 8px 25px rgba(73, 108, 153, 0.2)', // Deep steel blue shadow
            }
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ color: '#ffffff', mb: 2 }}>
            References Available
          </Typography>
          <Typography variant="body1" sx={{ color: '#e8e9ea', mb: 3 }}>
            Professional references and recommendations are available upon request.
          </Typography>
          <Button
            variant="contained"
            startIcon={<Email />}
            onClick={() => {
              // Try to open default email client
              const mailtoLink = 'mailto:maryskolos@gmail.com?subject=Reference Request';
              window.open(mailtoLink, '_blank');
            }}
            sx={{
              bgcolor: '#6d809f', // Medium slate blue background
              color: '#ffffff', // White text
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 500,
              border: '2px solid',
              borderColor: '#6d809f',
              '&:hover': {
                bgcolor: '#9ca0b9', // Light lavender-gray on hover
                borderColor: '#9ca0b9',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            Request References
          </Button>
        </Paper>
      </Box>
    </Box>
  );
} 