'use client';

import { Box, Typography, Button } from '@mui/material';
import { LinkedIn, Email, Download } from '@mui/icons-material';
import { getCommonStyles } from '@/styles/commonStyles';
import { emailUtils } from '@/utils/email';
import { useTheme } from '@/contexts/ThemeContext';
import { getCurrentTheme, getHeaderColor } from '@/utils/theme';
import { sanitizeUrl, isValidEmail } from '@/utils/security';

const CONTACT_EMAIL = 'maryskolos@gmail.com';

const contactButtons = [
  {
    icon: LinkedIn,
    label: 'LinkedIn Profile',
    href: sanitizeUrl('https://www.linkedin.com/in/mary-skolos-698387128/'),
    isExternal: true
  },
  {
    icon: Email,
    label: 'Send Email',
    onClick: () => {
      if (isValidEmail(CONTACT_EMAIL)) {
        const template = emailUtils.templates.general(CONTACT_EMAIL);
        emailUtils.openEmailClient(template.email, template.subject, template.body);
      }
    }
  },
  {
    icon: Download,
    label: 'Download Resume',
    href: sanitizeUrl('/resume.pdf'),
    isExternal: true
  }
];

const getButtonProps = (button: typeof contactButtons[0]) => {
  if (button.href) {
    const sanitizedHref = sanitizeUrl(button.href);
    if (!sanitizedHref) {
      return { disabled: true };
    }
    
    return {
      href: sanitizedHref,
      target: button.isExternal ? '_blank' : undefined,
      rel: button.isExternal ? 'noopener noreferrer' : undefined,
    };
  }
  
  return {
    onClick: button.onClick,
  };
};

const getButtonContainerStyles = () => ({
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center',
  gap: 3, 
  flexWrap: 'nowrap',
  mt: 4,
  width: '100%',
  // Stack buttons vertically on mobile, horizontally on desktop
  flexDirection: { xs: 'column', sm: 'row' },
  // Remove hover effects on mobile
  '& .MuiButton-root': {
    cursor: { xs: 'default', sm: 'pointer' },
    '&:hover': {
      transform: { xs: 'none', sm: 'scale(1.05)' }
    }
  }
});

const getButtonStyles = () => ({
  flex: { xs: 'none', sm: 1 },
  width: { xs: '100%', sm: 'auto' },
  py: 2,
  px: 3,
  minWidth: 0,
  // Hide icons on mobile
  '& .MuiButton-startIcon': {
    display: { xs: 'none', sm: 'flex' }
  }
});

const getDescriptionStyles = (isDarkMode: boolean) => {
  const currentTheme = getCurrentTheme(isDarkMode);
  return {
    variant: 'body1' as const,
    mb: 6,
    color: currentTheme.text.body,
    fontSize: '1.1rem',
    lineHeight: 1.6,
    maxWidth: '800px',
    textAlign: 'left',
    display: 'block'
  };
};

export default function Contact() {
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
        Get In Touch
      </Typography>
      
      <Typography sx={getDescriptionStyles(displayIsDarkMode)}>
        I&apos;m always interested in new opportunities and collaborations. Whether you have a question or just want to say hi, feel free to reach out!
      </Typography>

      <Box sx={getButtonContainerStyles()}>
        {contactButtons.map((button, index) => {
          const buttonProps = getButtonProps(button);
          const IconComponent = button.icon;
          return (
            <Button
              key={index}
              {...buttonProps}
              variant="contained"
              startIcon={<IconComponent />}
              sx={{
                ...commonStyles.button.secondary,
                ...getButtonStyles(),
              }}
            >
              {button.label}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
} 