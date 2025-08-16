'use client';

import { Box, Typography, Paper } from '@mui/material';
import { Person, Assignment, Code, Psychology, Group, School } from '@mui/icons-material';
import InfoTooltip from '@/components/InfoTooltip';
import { getCommonStyles } from '@/styles/commonStyles';
import { theme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { getCurrentTheme, getHeaderColor } from '@/utils/theme';

interface Skill {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  tooltip: string;
}

const skills: Skill[] = [
  {
    title: 'Leadership',
    description: 'Leading development teams and mentoring junior developers to deliver high-quality software solutions.',
    icon: Person,
    color: '#496c99', // Using a fixed color instead of theme reference
    tooltip: "I have directly managed 5 junior developers over my career, generally 2 at a time. I find great fulfillment in mentoring and finding their strengths."
  },
  {
    title: 'Project Management',
    description: 'Coordinating large-scale projects and ensuring timely delivery while maintaining code quality standards.',
    icon: Assignment,
    color: '#6d809f', // Using a fixed color instead of theme reference
    tooltip: "In SaaS, I've designed and developed fully-featured websites for unlimited custom branding. In e-commerce, I've led high-impact projects and legacy system rewrites - all on schedule."
  },
  {
    title: 'Technical Expertise',
    description: 'Full-stack development with Laravel, React, and modern web technologies.',
    icon: Code,
    color: '#9ca0b9', // Using a fixed color instead of theme reference
    tooltip: "Laravel and PHP have been my bread and butter throughout my career. I'm expanding my toolset by learning Ruby, React, and Node.js at a professional level. This website is part of that TypeScript learning journey."
  },
  {
    title: 'Problem Solving',
    description: 'Analyzing complex technical challenges and implementing innovative solutions.',
    icon: Psychology,
    color: '#496c99', // Using a fixed color instead of theme reference
    tooltip: "The best part of being an engineer is solving problems - whatever they look like. Creative problems are often solved simply, but thinking comes first."
  },
  {
    title: 'Team Collaboration',
    description: 'Working effectively with cross-functional teams and stakeholders to achieve project goals.',
    icon: Group,
    color: '#6d809f', // Using a fixed color instead of theme reference
    tooltip: "Teams take a lot of work, and for my role that means being aware and available. That may look like rubber-ducking, using previous expertise, or niche domain knowledge."
  },
  {
    title: 'Continuous Learning',
    description: 'Staying current with emerging technologies and industry best practices.',
    icon: School,
    color: '#9ca0b9', // Using a fixed color instead of theme reference
    tooltip: "This website came from my want to learn more modern, broadly applicable languages. I take knowledge from many sources and encourage that support among my team. I've begun learning dedicated hours at my current company."
  }
];

const getContainerStyles = (isDarkMode: boolean) => {
  const commonStyles = getCommonStyles(isDarkMode);
  return {
    ...commonStyles.section,
    position: 'relative',
    zIndex: 1
  };
};

const getSkillCardStyles = (isDarkMode: boolean) => {
  const commonStyles = getCommonStyles(isDarkMode);
  const currentTheme = getCurrentTheme(isDarkMode);
  return {
    ...commonStyles.paper,
    ...commonStyles.hover.card,
    position: 'relative',
    zIndex: 2,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      ...commonStyles.hover.card['&:hover'],
      borderColor: currentTheme.primary.dark,
      zIndex: 3
    }
  };
};

const getIconContainerStyles = (isDarkMode: boolean) => {
  const currentTheme = getCurrentTheme(isDarkMode);
  return {
    display: 'flex',
    justifyContent: 'center',
    mb: 2,
    mt: 2, // Add top padding to icons
    color: currentTheme.text.primary,
    flexShrink: 0
  };
};

const getIconStyles = (isDarkMode: boolean) => {
  const currentTheme = getCurrentTheme(isDarkMode);
  return {
    fontSize: 40,
    color: currentTheme.primary.main // Use same color as About Me section icons
  };
};

const getCardContentStyles = (isDarkMode: boolean) => ({
  textAlign: 'center' as const,
  p: 3,
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
});

export default function SkillsAndValues() {
  const { themeMode, isTransitioning, pendingTheme } = useTheme();
  const isDarkMode = themeMode === 'dark';
  const commonStyles = getCommonStyles(isDarkMode);
  
  const displayTheme = isTransitioning && pendingTheme ? pendingTheme : themeMode;
  const displayIsDarkMode = displayTheme === 'dark';

  return (
    <Box sx={{ ...getContainerStyles(displayIsDarkMode), pt: 3 }}>
      <Typography 
        variant="h2" 
        component="h2" 
        gutterBottom
        sx={{ color: getHeaderColor(displayIsDarkMode) }}
      >
        Skills & Values
      </Typography>
      
      <Typography 
        variant="body1" 
        sx={{ 
          mb: 6,
          color: getCurrentTheme(displayIsDarkMode).text.body
        }}
      >
        Core competencies and principles that guide my approach to software development and team collaboration:
      </Typography>
      
      <Box sx={{
        ...commonStyles.grid.responsive,
        '& > *': {
          height: 'auto',
          display: 'flex'
        }
      }}>
        {skills.map((skill, index) => (
          <InfoTooltip
            key={index}
            content={skill.tooltip}
            position="bottom"
          >
            <Paper
              sx={{
                ...getSkillCardStyles(displayIsDarkMode),
                ...commonStyles.hover.paper,
                position: 'relative',
                zIndex: 2,
                width: '100%',
                '&:hover': {
                  zIndex: 3,
                }
              }}
            >
              <Box sx={getIconContainerStyles(displayIsDarkMode)}>
                <skill.icon sx={getIconStyles(displayIsDarkMode)} />
              </Box>
              
              <Box sx={getCardContentStyles(displayIsDarkMode)}>
                <Typography 
                  variant="h5" 
                  gutterBottom
                  sx={{ color: getCurrentTheme(displayIsDarkMode).text.primary }}
                >
                  {skill.title}
                </Typography>
                
                <Typography 
                  variant="body2"
                  sx={{ color: getCurrentTheme(displayIsDarkMode).text.body }}
                >
                  {skill.description}
                </Typography>
              </Box>
            </Paper>
          </InfoTooltip>
        ))}
      </Box>
    </Box>
  );
} 