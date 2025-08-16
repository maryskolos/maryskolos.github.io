'use client';

import { Box, Typography, Paper, Button } from '@mui/material';
import { Code, Cloud, Security, Bolt, Timeline, RecordVoiceOver } from '@mui/icons-material';
import InfoTooltip from '@/components/InfoTooltip';
import { getCommonStyles } from '@/styles/commonStyles';
import { theme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { isValidSectionId } from '@/utils/security';
import { getCurrentTheme, getHeaderColor } from '@/utils/theme';
import { scrollToSection } from '@/utils/scroll';

interface SkillBlock {
  icon: React.ComponentType<any>;
  title: string;
  subtitle: string;
  tooltip?: string;
  scrollTo?: string;
}

const skillBlocks: SkillBlock[] = [
  {
    icon: Timeline,
    title: '5 Years Experience',
    subtitle: 'SaaS & E-commerce',
    tooltip: 'Click here to view my timeline!',
    scrollTo: 'timeline'
  },
  {
    icon: Code,
    title: 'Full Stack Developer',
    subtitle: 'Laravel, React, Node.js',
    tooltip: 'I aim for creating good customer and developer experiences, and those both require eye for detail. I work to create designs that are accessible, intuitive, and built on clean code.'
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    subtitle: 'AWS, CI/CD, Server Management',
    tooltip: 'Though I now have the pleasure of working with a dedicated DevOps team, that was not always the case. My experience in startups led to me wearing many hats, including the roles of RDS, server deployment, CI/CD setup. I appreciate that knowledge and the context it gives me working with all kinds of developers.'
  },
  {
    icon: Security,
    title: 'Security & Quality',
    subtitle: 'OWASP Certified, Health Data',
    tooltip: 'OWASP certified in 2020. I have worked on several projects that involved health data, PII, and received extensive training in these subjects. I highly value working on teams that respect and prioritize quality of product.'
  },
  {
    icon: Bolt,
    title: 'Agile & TDD',
    subtitle: 'Test-Driven Development',
    tooltip: 'I initially began my career working with a Test-Driven Development focus, creating code with a test-first approach becoming cognizant of optimizing both coverage and usefulness of our automated tests. Currently I am in an Agile environment, and appreciate the flexibility and efficiency on a larger team.'
  },
  {
    icon: RecordVoiceOver,
    title: 'Toastmasters',
    subtitle: 'Public Speaking & Leadership',
    tooltip: 'I attended Toastmasters when being coached by the local instance for my speech as my high school\'s valedictorian. I credit that group and the experiences it led to in my ability to communicate both ideas, and problems, effectively across teams.'
  }
];

const getReferencesContainerStyles = () => ({
  mt: 6,
  textAlign: 'center' as const,
});

const getReferencesPaperStyles = (isDarkMode: boolean) => {
  const currentTheme = getCurrentTheme(isDarkMode);
  return {
    p: 4,
    bgcolor: currentTheme.background.paper,
    border: '2px solid',
    borderColor: currentTheme.border.primary,
    borderRadius: theme.borderRadius.medium,
  };
};

const getReferencesTitleStyles = (isDarkMode: boolean) => {
  const currentTheme = getCurrentTheme(isDarkMode);
  return {
    variant: 'h4' as const,
    component: 'h3' as const,
    gutterBottom: true,
    color: currentTheme.text.primary,
    mb: 3,
  };
};

const getReferencesDescriptionStyles = (isDarkMode: boolean) => {
  const currentTheme = getCurrentTheme(isDarkMode);
  return {
    variant: 'body1' as const,
    color: currentTheme.text.body,
    mb: 4,
    maxWidth: '800px',
    mx: 'auto',
    lineHeight: 1.6,
  };
};

const openEmailClient = () => {
  window.open('mailto:your-email@example.com?subject=Reference%20Request&body=Hi%20Mary,%0D%0A%0D%0AI%20would%20like%20to%20request%20references%20for%20your%20work.%0D%0A%0D%0AThank%20you!');
};

const renderSkillCard = (block: SkillBlock, isDarkMode: boolean, commonStyles: any) => {
  const cardStyles = block.scrollTo ? commonStyles.card.scrollable : commonStyles.card.regular;
  const IconComponent = block.icon;
  
  const cardContent = (
    <Paper
      sx={{
        ...commonStyles.paper,
        ...cardStyles,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
      onClick={block.scrollTo ? () => scrollToSection(block.scrollTo!) : undefined}
    >
      <IconComponent sx={commonStyles.iconStyles.large} />
      <Typography sx={commonStyles.typography.title}>
        {block.title}
      </Typography>
      <Typography sx={commonStyles.typography.subtitle}>
        {block.subtitle}
      </Typography>
    </Paper>
  );

  if (block.tooltip) {
    return (
      <InfoTooltip content={block.tooltip} position="bottom">
        {cardContent}
      </InfoTooltip>
    );
  }

  return cardContent;
};

export default function AboutMe() {
  const { themeMode, isTransitioning, pendingTheme } = useTheme();
  const isDarkMode = themeMode === 'dark';
  const commonStyles = getCommonStyles(isDarkMode);
  
  const displayTheme = isTransitioning && pendingTheme ? pendingTheme : themeMode;
  const displayIsDarkMode = displayTheme === 'dark';

  return (
    <Box sx={{ ...commonStyles.section, pt: 6 }}>
      <Typography 
        variant="h2" 
        component="h2" 
        gutterBottom
        sx={{ color: getHeaderColor(displayIsDarkMode) }}
      >
        About Me
      </Typography>
      
      <Typography 
        variant="body1" 
        sx={{ 
          mb: 6,
          color: getCurrentTheme(displayIsDarkMode).text.body,
          fontSize: '1.1rem',
          lineHeight: 1.6,
          maxWidth: '800px',
          textAlign: 'left',
          display: 'block'
        }}
      >
        Passionate software developer with 5 years of experience in SaaS and e-commerce environments
      </Typography>
      
      <Box sx={commonStyles.grid.responsive}>
        {skillBlocks.map((block, index) => (
          <Box key={index}>
            {renderSkillCard(block, displayIsDarkMode, commonStyles)}
          </Box>
        ))}
      </Box>
      
      <Box sx={getReferencesContainerStyles()}>
        <Paper sx={getReferencesPaperStyles(displayIsDarkMode)}>
          <Typography sx={getReferencesTitleStyles(displayIsDarkMode)}>
            Professional References
          </Typography>
          
          <Typography sx={getReferencesDescriptionStyles(displayIsDarkMode)}>
            I'm happy to provide professional references upon request. Please reach out if you'd like to 
            speak with previous colleagues or supervisors about my work ethic, technical skills, and 
            team collaboration abilities.
          </Typography>
          
          <Button
            variant="contained"
            onClick={openEmailClient}
            sx={{
              ...commonStyles.button.secondary,
              px: 4,
              py: 2,
            }}
          >
            Request References
          </Button>
        </Paper>
      </Box>
    </Box>
  );
} 