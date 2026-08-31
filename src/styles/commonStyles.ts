import { oliveColors } from '@/constants/oliveTheme';

/** Full-bleed section backgrounds; left clears side nav via --side-nav-gutter on main */
export const sectionInsetX = {
  pr: { xs: 2, sm: 3, md: 4 },
  pl: {
    xs: 2,
    sm: 3,
    md: 'calc(var(--side-nav-gutter, 0px) + 2rem)',
    lg: 'calc(var(--side-nav-gutter, 0px) + 2rem)',
  },
} as const;

export const commonStyles = {
  section: {
    py: { xs: 6, md: 10 },
    ...sectionInsetX,
  },

  paper: {
    p: 3,
    textAlign: 'left' as const,
    bgcolor: oliveColors.white,
    border: '1px solid',
    borderColor: oliveColors.olivePale,
    borderRadius: 2,
    transition: 'all 0.3s ease',
  },

  button: {
    primary: {
      bgcolor: oliveColors.oliveMoss,
      color: oliveColors.cream,
      py: 1.5,
      px: 3,
      fontWeight: 600,
      '&:hover': {
        bgcolor: oliveColors.oliveDeep,
      },
    },
    secondary: {
      bgcolor: 'transparent',
      color: oliveColors.oliveDeep,
      px: 3,
      py: 1.5,
      fontWeight: 600,
      border: '2px solid',
      borderColor: oliveColors.oliveMoss,
      '&:hover': {
        bgcolor: oliveColors.olivePale,
      },
    },
  },

  hover: {
    paper: {
      '&:hover': {
        boxShadow: '0 8px 25px rgba(61, 74, 50, 0.12)',
        transform: 'translateY(-2px)',
      },
    },
  },

  grid: {
    threeColumn: {
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
      gap: 2,
    },
    twoColumn: {
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
      gap: 3,
    },
  },
};
