'use client';

import { Box, Typography, Paper, Chip } from '@mui/material';
import { Work, School, Star, Games, Psychology } from '@mui/icons-material';

export default function Timeline() {
  const timelineItems = [
    {
      year: '2022 - Present',
      title: 'Software Engineer II',
      company: 'Card Kingdom',
      description: 'Leading development of e-commerce platform improvements and new features. Improved search functionality and performance by optimizing indexes and queries. Implemented PowerBI Embedded reporting solution and developed APIs and customer-facing features.',
      type: 'professional',
      achievements: [
        'Rewrote checkout experience with timed checkout',
        'Reduced inventory race conditions',
        'Cross-team agile collaboration'
      ]
    },
    {
      year: '2022',
      title: 'Magic the Gathering',
      company: 'Hobby & Strategy',
      description: 'Developed strategic thinking through competitive card gaming. Participated in tournaments and developed deck building strategies while building community leadership skills.',
      type: 'personal',
      achievements: [
        'Tournament participation',
        'Deck building strategies',
        'Community leadership'
      ]
    },
    {
      year: '2020 - 2022',
      title: 'Full Stack Developer',
      company: 'Lumiio Inc.',
      description: 'Led full-stack development for health data applications using Laravel, Livewire, and Alpine.js (TALL stack). Mentored junior developers and managed code infrastructure via AWS and Laravel Forge. Implemented OWASP security best practices and led internal security training initiatives.',
      type: 'professional',
      achievements: [
        'TALL stack development leadership',
        'Junior developer mentorship',
        'Security training initiatives'
      ]
    },
    {
      year: '2018',
      title: 'Dungeons & Dragons',
      company: 'Hobby & Creativity',
      description: 'Started playing D&D to develop storytelling, problem-solving, and collaborative skills. Learned to think creatively and work as part of a team in dynamic scenarios.',
      type: 'personal',
      achievements: [
        'Storytelling development',
        'Creative problem-solving',
        'Team collaboration'
      ]
    },
    {
      year: '2017-2018',
      title: 'Junior Developer',
      company: 'Shawn Veltman & Associates',
      description: 'Developed and maintained Laravel-based CRM and sales tracking systems with TDD practices. Collaborated with clients and partners to integrate new features and testing protocols into existing projects, increasing customer satisfaction.',
      type: 'professional',
      achievements: [
        'Laravel CRM development',
        'TDD implementation',
        'Client collaboration'
      ]
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'professional':
        return <Work sx={{ color: '#496c99' }} />; // Deep steel blue
      case 'personal':
        return <Star sx={{ color: '#8a2be2' }} />; // Vibrant purple
      default:
        return <School sx={{ color: '#9ca0b9' }} />; // Light blue
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'professional':
        return '#496c99'; // Deep steel blue
      case 'personal':
        return '#8a2be2'; // Vibrant purple
      default:
        return '#9ca0b9'; // Light blue
    }
  };

  return (
    <Box sx={{ py: 8 }}>
      <Typography variant="h2" component="h2" gutterBottom>
        Experience & Interests
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4 }}>
        A chronological journey through my professional development and personal interests:
      </Typography>
      
      <Box sx={{ position: 'relative' }}>
        {/* Timeline line */}
        <Box
          sx={{
            position: 'absolute',
            left: { xs: 20, md: 50 },
            top: 0,
            bottom: 0,
            width: 2,
            bgcolor: '#6d809f', // Medium blue timeline line
            zIndex: 1
          }}
        />
        
        {timelineItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              mb: 4,
              pl: { xs: 8, md: 12 },
            }}
          >
            {/* Timeline dot - Larger and perfectly centered on the line */}
            <Box
              sx={{
                position: 'absolute',
                top: 20, // Moved down from 8 to 20 for better alignment with timecard
                width: 16,
                height: 16,
                borderRadius: '50%',
                bgcolor: getTypeColor(item.type),
                border: '3px solid',
                borderColor: '#FFFFFF',
                zIndex: 2,
                transform: 'translateX(-50%)',
                left: { xs: 21, md: 51 } // Moved 1px right from 20/50
              }}
            />
            
            <Paper
              sx={{
                p: 3,
                borderLeft: `4px solid ${getTypeColor(item.type)}`,
                transition: 'all 0.3s ease',
                position: 'relative', // Ensure proper positioning context
                '&:hover': {
                  boxShadow: '0 8px 25px rgba(73, 108, 153, 0.15)', // Deep steel blue shadow
                  transform: 'translateX(8px)', // Move right on hover
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {getIcon(item.type)}
                <Typography variant="h6" sx={{ ml: 1, color: getTypeColor(item.type) }}>
                  {item.year}
                </Typography>
              </Box>
              
              <Typography variant="h5" gutterBottom>
                {item.title}
              </Typography>
              
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {item.company}
              </Typography>
              
              <Typography variant="body2" sx={{ mb: 2 }}>
                {item.description}
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip
                  label={item.type}
                  size="small"
                  sx={{
                    bgcolor: '#0a0a1a', // Slightly lighter navy background
                    color: '#e8e9ea', // Very light gray text
                    border: '1px solid',
                    borderColor: getTypeColor(item.type), // Use the type color for border
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    '&:hover': {
                      bgcolor: '#496c99', // Deep steel blue on hover
                      color: '#ffffff', // White text on hover
                    }
                  }}
                />
                {item.achievements.map((achievement, achievementIndex) => (
                  <Chip
                    key={achievementIndex}
                    label={achievement}
                    size="small"
                    sx={{
                      bgcolor: '#0a0a1a', // Slightly lighter navy background
                      color: '#e8e9ea', // Very light gray text
                      border: '1px solid',
                      borderColor: '#6d809f', // Medium slate blue border
                      fontSize: '0.75rem',
                      fontWeight: 400,
                      '&:hover': {
                        bgcolor: '#496c99', // Deep steel blue on hover
                        color: '#ffffff', // White text on hover
                      }
                    }}
                  />
                ))}
              </Box>
            </Paper>
          </Box>
        ))}
      </Box>
    </Box>
  );
} 