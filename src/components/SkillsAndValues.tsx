'use client';

import { Box, Typography, Paper, Chip } from '@mui/material';
import { Person, Assignment, Code, Psychology, Group, School } from '@mui/icons-material';

export default function SkillsAndValues() {
  const skills = [
    {
      title: 'Leadership',
      description: 'Leading development teams and mentoring junior developers to deliver high-quality software solutions.',
      icon: Person,
      color: '#496c99' // Deep steel blue
    },
    {
      title: 'Project Management',
      description: 'Coordinating large-scale projects and ensuring timely delivery while maintaining code quality standards.',
      icon: Assignment,
      color: '#6d809f' // Medium blue
    },
    {
      title: 'Technical Expertise',
      description: 'Full-stack development with Laravel, React, and modern web technologies.',
      icon: Code,
      color: '#9ca0b9' // Light blue
    },
    {
      title: 'Problem Solving',
      description: 'Analyzing complex technical challenges and implementing innovative solutions.',
      icon: Psychology,
      color: '#496c99' // Deep steel blue
    },
    {
      title: 'Team Collaboration',
      description: 'Working effectively in cross-functional teams and fostering collaborative development practices.',
      icon: Group,
      color: '#6d809f' // Medium blue
    },
    {
      title: 'Continuous Learning',
      description: 'Staying current with emerging technologies and best practices in software development.',
      icon: School,
      color: '#9ca0b9' // Light blue
    }
  ];

  return (
    <Box sx={{ py: 8 }}>
      <Typography variant="h2" component="h2" gutterBottom>
        Skills and Values
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4 }}>
        Here are the key skills and values that drive my professional approach:
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
        {skills.map((skill, index) => (
          <Paper 
            key={index} 
            sx={{ 
              p: 3, 
              textAlign: 'center', 
              transition: 'all 0.3s ease',
              border: '1px solid',
              borderColor: '#496c99', // Deep steel blue border
              bgcolor: '#0a0a1a', // Slightly lighter navy background
              '&:hover': { 
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(109, 128, 159, 0.3)', // Medium slate blue shadow
                borderColor: skill.color // Color-coded border on hover
              } 
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <skill.icon sx={{ fontSize: 40, color: skill.color }} />
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