'use client';

import { Box, Typography, Paper, Button } from '@mui/material';
import { TrendingUp, Group, Code, Work, Cloud, Security } from '@mui/icons-material';
import AnimatedCounter from '@/components/AnimatedCounter';
import { commonStyles } from '@/styles/commonStyles';
import { emailUtils } from '@/utils/email';
import { theme } from '@/constants/theme';

const CONTACT_EMAIL = 'maryskolos@gmail.com';

const skillBlocks = [
  {
    icon: Work,
    iconColor: theme.colors.primary.main,
    title: <AnimatedCounter target={5} suffix="" />,
    subtitle: 'Years Experience',
  },
  {
    icon: Code,
    iconColor: theme.colors.primary.light,
    title: 'Agile & TDD',
    subtitle: 'Development Practices',
  },
  {
    icon: Group,
    iconColor: theme.colors.primary.dark,
    title: 'Toastmasters',
    subtitle: 'Public Speaking Excellence',
  },
  {
    icon: TrendingUp,
    iconColor: theme.colors.primary.main,
    title: 'Full Stack Developer',
    subtitle: 'PHP, JavaScript, React, Python',
  },
  {
    icon: Cloud,
    iconColor: theme.colors.primary.light,
    title: 'Cloud & DevOps',
    subtitle: 'AWS, Elasticsearch, Redis, CI/CD',
  },
  {
    icon: Security,
    iconColor: theme.colors.primary.dark,
    title: 'Security & Quality',
    subtitle: 'OWASP Certified, Testing, Best Practices',
  },
];

export default function AboutMe() {
  return (
    <Box sx={commonStyles.section}>
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
      
      <Box sx={{ ...commonStyles.grid.responsive, mb: 4 }}>
        {skillBlocks.map((block, index) => (
          <Paper key={index} sx={commonStyles.paper}>
            <block.icon sx={{ fontSize: commonStyles.icon.large, mb: 2, color: block.iconColor }} />
            {typeof block.title === 'string' ? (
              <Typography variant="h6" sx={{ color: theme.colors.text.primary, mb: 1 }}>
                {block.title}
              </Typography>
            ) : (
              block.title
            )}
            <Typography variant="body2" sx={{ color: theme.colors.text.secondary }}>
              {block.subtitle}
            </Typography>
          </Paper>
        ))}
      </Box>
      
      <Box sx={{ mt: 4, gridColumn: '1 / -1' }}>
        <Paper 
          sx={{ 
            ...commonStyles.paper,
            p: 4,
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: theme.shadows.light,
            }
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ color: theme.colors.text.primary, mb: 2 }}>
            References Available
          </Typography>
          <Typography variant="body1" sx={{ color: theme.colors.text.secondary, mb: 3 }}>
            Professional references and recommendations are available upon request.
          </Typography>
          <Button
            variant="contained"
            startIcon={<Work />}
            onClick={() => {
              const template = emailUtils.templates.reference(CONTACT_EMAIL);
              emailUtils.openEmailClient(template.email, template.subject, template.body);
            }}
            sx={commonStyles.button.secondary}
          >
            Request References
          </Button>
        </Paper>
      </Box>
    </Box>
  );
} 