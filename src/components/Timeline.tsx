'use client';

import { Box, Typography, Paper, Chip } from '@mui/material';
import { Work, School, Star } from '@mui/icons-material';
import { commonStyles } from '@/styles/commonStyles';
import { theme } from '@/constants/theme';

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
  const iconProps = { sx: { color: getTypeColor(type) } };
  
  switch (type) {
    case 'professional':
      return <Work {...iconProps} />;
    case 'personal':
      return <Star {...iconProps} />;
    default:
      return <School {...iconProps} />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'professional':
      return theme.colors.primary.dark;
    case 'personal':
      return theme.colors.accent.purple;
    default:
      return theme.colors.primary.light;
  }
};

export default function Timeline() {
  return (
    <Box sx={commonStyles.section}>
      <Typography variant="h2" component="h2" gutterBottom>
        Experience & Interests
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4 }}>
        A chronological journey through my professional development and personal interests:
      </Typography>
      
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            left: { xs: 20, md: 50 },
            top: 0,
            bottom: 0,
            width: 2,
            bgcolor: theme.colors.primary.main,
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
            <Box
              sx={{
                position: 'absolute',
                top: 20,
                width: 16,
                height: 16,
                borderRadius: '50%',
                bgcolor: getTypeColor(item.type),
                border: '3px solid',
                borderColor: theme.colors.text.primary,
                zIndex: 2,
                transform: 'translateX(-50%)',
                left: { xs: 21, md: 51 }
              }}
            />
            
            <Paper
              sx={{
                ...commonStyles.paper,
                borderLeft: `4px solid ${getTypeColor(item.type)}`,
                position: 'relative',
                ...commonStyles.hover.paper
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
                    bgcolor: theme.colors.background.paper,
                    color: theme.colors.text.secondary,
                    border: '1px solid',
                    borderColor: getTypeColor(item.type),
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    '&:hover': {
                      bgcolor: theme.colors.primary.dark,
                      color: theme.colors.text.primary,
                    }
                  }}
                />
                {item.achievements.map((achievement, achievementIndex) => (
                  <Chip
                    key={achievementIndex}
                    label={achievement}
                    size="small"
                    sx={{
                      bgcolor: theme.colors.background.paper,
                      color: theme.colors.text.secondary,
                      border: '1px solid',
                      borderColor: theme.colors.primary.main,
                      fontSize: '0.75rem',
                      fontWeight: 400,
                      '&:hover': {
                        bgcolor: theme.colors.primary.dark,
                        color: theme.colors.text.primary,
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