'use client';

import { Box, Typography, Paper } from '@mui/material';
import { Person, Assignment, Code, Psychology, Group, School } from '@mui/icons-material';
import { commonStyles } from '@/styles/commonStyles';
import { theme } from '@/constants/theme';

const skills = [
  {
    title: 'Leadership',
    description: 'Leading development teams and mentoring junior developers to deliver high-quality software solutions.',
    icon: Person,
    color: theme.colors.primary.dark
  },
  {
    title: 'Project Management',
    description: 'Coordinating large-scale projects and ensuring timely delivery while maintaining code quality standards.',
    icon: Assignment,
    color: theme.colors.primary.main
  },
  {
    title: 'Technical Expertise',
    description: 'Full-stack development with Laravel, React, and modern web technologies.',
    icon: Code,
    color: theme.colors.primary.light
  },
  {
    title: 'Problem Solving',
    description: 'Analyzing complex technical challenges and implementing innovative solutions.',
    icon: Psychology,
    color: theme.colors.primary.dark
  },
  {
    title: 'Team Collaboration',
    description: 'Working effectively in cross-functional teams and fostering collaborative development practices.',
    icon: Group,
    color: theme.colors.primary.main
  },
  {
    title: 'Continuous Learning',
    description: 'Staying current with emerging technologies and best practices in software development.',
    icon: School,
    color: theme.colors.primary.light
  }
];

export default function SkillsAndValues() {
  return (
    <Box sx={commonStyles.section}>
      <Typography variant="h2" component="h2" gutterBottom>
        Skills and Values
      </Typography>
      

      
      <Box sx={commonStyles.grid.responsive}>
        {skills.map((skill, index) => (
          <Paper 
            key={index} 
            sx={{ 
              ...commonStyles.paper,
              ...commonStyles.hover.card,
              '&:hover': { 
                ...commonStyles.hover.card['&:hover'],
                borderColor: skill.color
              } 
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <skill.icon sx={{ fontSize: commonStyles.icon.medium, color: skill.color }} />
            </Box>
            <Typography variant="h6" gutterBottom>
              {skill.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {skill.description}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
} 