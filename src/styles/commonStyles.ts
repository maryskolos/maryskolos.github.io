import { theme } from '@/constants/theme';
import { getCurrentTheme } from '@/utils/theme';

export const getCommonStyles = (isDarkMode: boolean) => {
  const currentTheme = getCurrentTheme(isDarkMode);
  
  return {
    section: {
      py: 8,
    },
    
    paper: {
      p: 3,
      textAlign: 'center' as const,
      bgcolor: currentTheme.background.paper,
      border: '1px solid',
      borderColor: currentTheme.border.primary,
      transition: 'all 0.3s ease',
    },
    
    button: {
      primary: {
        bgcolor: currentTheme.primary.main,
        color: '#ffffff',
        py: 2,
        '&:hover': {
          bgcolor: currentTheme.primary.light,
        },
      },
      secondary: {
        bgcolor: currentTheme.primary.dark,
        color: '#ffffff',
        px: 4,
        py: 1.5,
        fontSize: '1.1rem',
        fontWeight: 500,
        border: '2px solid',
        borderColor: currentTheme.primary.dark,
        '&:hover': {
          bgcolor: currentTheme.primary.light,
          borderColor: currentTheme.primary.light,
          transform: 'scale(1.05)',
        },
        transition: 'all 0.2s ease-in-out',
      },
    },
    
    hover: {
      paper: {
        '&:hover': {
          boxShadow: isDarkMode 
            ? '0 8px 25px rgba(73, 108, 153, 0.15)'
            : '0 8px 25px rgba(74, 144, 226, 0.15)',
          transform: 'translateX(8px)',
        },
      },
      card: {
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: isDarkMode 
            ? '0 8px 25px rgba(109, 128, 159, 0.3)'
            : '0 8px 25px rgba(74, 144, 226, 0.3)',
        },
      },
    },
    
    separator: {
      height: '2px',
      width: '80%',
      mx: 'auto',
      my: { xs: 4, md: 6 },
      background: `linear-gradient(90deg, transparent 0%, ${currentTheme.border.primary} 20%, ${currentTheme.border.primary} 80%, transparent 100%)`,
    },
    
    grid: {
      responsive: {
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        gap: 3,
      },
      threeColumn: {
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        gap: 3,
      },
    },
    
    text: {
      primary: currentTheme.text.primary,
      secondary: currentTheme.text.secondary,
      body: currentTheme.text.body,
    },
    
    icon: {
      large: 60,
      medium: 40,
      small: 32,
    },

    // Common card styles to reduce duplication
    card: {
      scrollable: {
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: isDarkMode 
            ? '0 8px 25px rgba(109, 128, 159, 0.3)' 
            : '0 8px 25px rgba(74, 144, 226, 0.3)',
        },
        transition: 'all 0.3s ease',
        border: '2px solid',
        borderColor: currentTheme.primary.main,
      },
      regular: {
        cursor: 'default',
        transition: 'all 0.3s ease',
      }
    },

    // Common icon styles
    iconStyles: {
      large: {
        fontSize: 60,
        mb: 2,
        color: currentTheme.primary.main,
      },
      medium: {
        fontSize: 40,
        color: currentTheme.text.primary,
      }
    },

    // Common typography styles
    typography: {
      title: {
        variant: 'h5' as const,
        component: 'h3' as const,
        gutterBottom: true,
        color: currentTheme.text.primary,
        fontWeight: 600,
      },
      subtitle: {
        variant: 'body2' as const,
        color: currentTheme.text.secondary,
        mb: 2,
      }
    }
  };
};
