'use client';

import { Box, Typography, Paper, Chip } from '@mui/material';
import { Work, School, Star } from '@mui/icons-material';
import { getCommonStyles } from '@/styles/commonStyles';
import { theme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { getCurrentTheme, getHeaderColor } from '@/utils/theme';

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  type: 'Professional' | 'Personal' | 'education';
  achievements: string[];
}

const timelineItems: TimelineItem[] = [
  {
    year: '2022 - Present',
    title: 'Software Engineer II',
    company: 'Card Kingdom',
    description: 'Leading development of e-commerce platform improvements and new features. Improved search functionality and performance by optimizing indexes and queries. Implemented PowerBI Embedded reporting solution and developed APIs and customer-facing features.',
    type: 'Professional',
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
    type: 'Personal',
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
    type: 'Professional',
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
    type: 'Personal',
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
    type: 'Professional',
    achievements: [
      'Laravel CRM development',
      'TDD implementation',
      'Client collaboration'
    ]
  }
];

const getIcon = (type: TimelineItem['type'], isDarkMode: boolean) => {
  const iconProps = { sx: { color: getTypeColor(type, isDarkMode) } };
  
  switch (type) {
    case 'Professional':
      return <Work {...iconProps} />;
    case 'Personal':
      return <Star {...iconProps} />;
    default:
      return <School {...iconProps} />;
  }
};

const getTypeColor = (type: TimelineItem['type'], isDarkMode: boolean) => {
  const currentTheme = getCurrentTheme(isDarkMode);
  
  switch (type) {
    case 'Professional':
      return currentTheme.primary.dark;
    case 'Personal':
      if (isDarkMode) {
        return (theme.colors.accent as any).purple;
      } else {
        return (theme.lightColors.accent as any).green;
      }
    default:
      return currentTheme.primary.main;
  }
};

const getTimelineStyles = (isDarkMode: boolean) => {
  const currentTheme = getCurrentTheme(isDarkMode);
  return {
    position: 'absolute',
    left: { xs: 4, md: 8 },
    top: 0,
    bottom: 0,
    width: '2px',
    background: `linear-gradient(180deg, ${currentTheme.primary.main} 0%, ${currentTheme.primary.light} 100%)`,
  };
};

const getTimelineDotStyles = (type: TimelineItem['type'], isDarkMode: boolean) => {
  const currentTheme = getCurrentTheme(isDarkMode);
  return {
    position: 'absolute',
    left: { xs: 7, md: 9 },
    top: 20,
    width: { xs: 12, md: 16 },
    height: { xs: 12, md: 16 },
    borderRadius: '50%',
    background: getTypeColor(type, isDarkMode),
    border: '3px solid',
    borderColor: '#ffffff',
    zIndex: 1,
    transform: 'translateX(-50%)',
  };
};

const getChipStyles = (isTypeChip: boolean, isDarkMode: boolean) => {
  const currentTheme = getCurrentTheme(isDarkMode);
  return {
    bgcolor: isTypeChip ? getTypeColor('Professional', isDarkMode) : currentTheme.background.default,
    color: isTypeChip ? '#ffffff' : currentTheme.text.secondary,
    border: isTypeChip ? 'none' : `1px solid ${currentTheme.border.primary}`,
    fontWeight: isTypeChip ? 600 : 400,
  };
};

export default function Timeline() {
  const { themeMode, isTransitioning, pendingTheme } = useTheme();
  const isDarkMode = themeMode === 'dark';
  const commonStyles = getCommonStyles(isDarkMode);
  
  const displayTheme = isTransitioning && pendingTheme ? pendingTheme : themeMode;
  const displayIsDarkMode = displayTheme === 'dark';
  
  return (
    <Box sx={{ ...commonStyles.section, pt: 3 }}>
      <Typography 
        variant="h2" 
        component="h2" 
        gutterBottom
        sx={{ color: getHeaderColor(displayIsDarkMode) }}
      >
        Experience & Interests
      </Typography>
      
      <Typography 
        variant="body1" 
        sx={{ 
          mb: 4,
          color: getCurrentTheme(displayIsDarkMode).text.body
        }}
      >
        A chronological journey through my professional development and personal interests:
      </Typography>
      
      <Box sx={{ position: 'relative' }}>
        <Box sx={getTimelineStyles(displayIsDarkMode)} />
        
        {timelineItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              mb: 4,
              pl: { xs: 4, md: 8 },
            }}
          >
            <Box sx={getTimelineDotStyles(item.type, displayIsDarkMode)} />
            
            <Paper
              sx={{
                ...commonStyles.paper,
                textAlign: 'left',
                borderLeft: `4px solid ${getTypeColor(item.type, displayIsDarkMode)}`,
                position: 'relative',
                ...commonStyles.hover.paper
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {getIcon(item.type, displayIsDarkMode)}
                <Typography variant="h6" sx={{ ml: 1, color: getTypeColor(item.type, displayIsDarkMode) }}>
                  {item.year}
                </Typography>
              </Box>
              
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{ color: getCurrentTheme(displayIsDarkMode).text.primary }}
              >
                {item.title}
              </Typography>
              
              <Typography 
                variant="subtitle1" 
                gutterBottom
                sx={{ color: getCurrentTheme(displayIsDarkMode).text.secondary }}
              >
                {item.company}
              </Typography>
              
              <Typography 
                variant="body2" 
                sx={{ 
                  mb: 2,
                  color: getCurrentTheme(displayIsDarkMode).text.body
                }}
              >
                {item.description}
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip
                  label={item.type}
                  size="small"
                  sx={getChipStyles(true, displayIsDarkMode)}
                />
                {item.achievements.map((achievement, achievementIndex) => (
                  <Chip
                    key={achievementIndex}
                    label={achievement}
                    size="small"
                    sx={getChipStyles(false, displayIsDarkMode)}
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