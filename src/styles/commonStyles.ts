// Common styles used across components
export const commonStyles = {
  // Section containers
  section: {
    py: 8,
  },
  
  // Paper components
  paper: {
    p: 3,
    textAlign: 'center' as const,
    bgcolor: '#0a0a1a',
    border: '1px solid',
    borderColor: '#496c99',
    transition: 'all 0.3s ease',
  },
  
  // Buttons
  button: {
    primary: {
      bgcolor: '#6d809f',
      color: '#ffffff',
      py: 2,
      '&:hover': {
        bgcolor: '#9ca0b9',
      },
    },
    secondary: {
      bgcolor: '#496c99',
      color: '#ffffff',
      px: 4,
      py: 1.5,
      fontSize: '1.1rem',
      fontWeight: 500,
      border: '2px solid',
      borderColor: '#496c99',
      '&:hover': {
        bgcolor: '#9ca0b9',
        borderColor: '#9ca0b9',
        transform: 'scale(1.05)',
      },
      transition: 'all 0.2s ease-in-out',
    },
  },
  
  // Hover effects
  hover: {
    paper: {
      '&:hover': {
        boxShadow: '0 8px 25px rgba(73, 108, 153, 0.15)',
        transform: 'translateX(8px)',
      },
    },
    card: {
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 25px rgba(109, 128, 159, 0.3)',
      },
    },
  },
  
  // Separators
  separator: {
    height: '2px',
    width: '80%',
    mx: 'auto',
    my: { xs: 4, md: 6 },
    background: 'linear-gradient(90deg, transparent 0%, #496c99 20%, #496c99 80%, transparent 100%)',
  },
  
  // Grid layouts
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
  
  // Typography colors
  text: {
    primary: '#ffffff',
    secondary: '#e8e9ea',
    body: '#f8f9fa',
  },
  
  // Icon sizes
  icon: {
    large: 60,
    medium: 40,
    small: 32,
  },
};
