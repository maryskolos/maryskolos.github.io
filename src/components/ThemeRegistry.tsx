'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { oliveColors } from '@/constants/oliveTheme';

const headingFont = 'var(--font-fraunces), "Fraunces", Georgia, serif';
const bodyFont = 'var(--font-figtree), "Figtree", system-ui, sans-serif';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: oliveColors.oliveMoss,
      light: oliveColors.oliveMuted,
      dark: oliveColors.oliveDeep,
      contrastText: oliveColors.cream,
    },
    secondary: {
      main: oliveColors.sand,
      light: oliveColors.olivePale,
      dark: oliveColors.oliveMuted,
      contrastText: oliveColors.oliveDeep,
    },
    background: {
      default: oliveColors.cream,
      paper: oliveColors.white,
    },
    text: {
      primary: oliveColors.oliveDeep,
      secondary: oliveColors.oliveMuted,
    },
    divider: oliveColors.olivePale,
  },
  typography: {
    fontFamily: bodyFont,
    h1: {
      fontFamily: headingFont,
      fontWeight: 600,
      letterSpacing: '-0.02em',
      color: oliveColors.oliveDeep,
      fontSize: '2rem',
      lineHeight: 1.15,
      '@media (min-width:900px)': {
        fontSize: '3.25rem',
      },
    },
    h2: {
      fontFamily: headingFont,
      fontWeight: 600,
      letterSpacing: '-0.015em',
      color: oliveColors.oliveDeep,
      fontSize: '1.5rem',
      lineHeight: 1.2,
      '@media (min-width:900px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontFamily: headingFont,
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: oliveColors.oliveDeep,
      fontSize: '1.2rem',
      lineHeight: 1.25,
      '@media (min-width:900px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontFamily: headingFont,
      fontWeight: 500,
      color: oliveColors.oliveDeep,
      fontSize: '1.1rem',
      '@media (min-width:900px)': {
        fontSize: '1.25rem',
      },
    },
    h5: {
      fontFamily: bodyFont,
      fontWeight: 600,
      color: oliveColors.oliveDeep,
      fontSize: '1.05rem',
      '@media (min-width:900px)': {
        fontSize: '1.25rem',
      },
    },
    h6: {
      fontFamily: bodyFont,
      fontWeight: 600,
      color: oliveColors.oliveDeep,
    },
    body1: { color: oliveColors.oliveDeep, lineHeight: 1.75 },
    body2: { color: oliveColors.oliveMuted, lineHeight: 1.65 },
    button: { fontFamily: bodyFont, fontWeight: 600, textTransform: 'none' },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: oliveColors.white,
          borderColor: oliveColors.olivePale,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontFamily: bodyFont,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10,
        },
      },
    },
  },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
