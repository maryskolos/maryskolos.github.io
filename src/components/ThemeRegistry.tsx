'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Outfit, Space_Grotesk } from 'next/font/google';

const outfit = Outfit({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit'
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk'
});

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6d809f',
      light: '#9ca0b9',
      dark: '#496c99',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#9ca0b9',
      light: '#e8e9ea',
      dark: '#6d809f',
      contrastText: '#04040c',
    },
    background: {
      default: '#04040c',
      paper: '#0a0a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#e8e9ea',
    },
    divider: '#496c99',
    action: {
      active: '#6d809f',
      hover: '#9ca0b9',
      selected: '#496c99',
    },
  },
  typography: {
    fontFamily: 'var(--font-outfit), Inter, Arial, sans-serif',
    h1: {
      fontFamily: 'Syne, var(--font-space-grotesk), var(--font-outfit), Inter, Arial, sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      color: '#ffffff',
    },
    h2: {
      fontFamily: 'var(--font-space-grotesk), var(--font-outfit), Inter, Arial, sans-serif',
      fontWeight: 600,
      color: '#ffffff',
    },
    h3: {
      fontFamily: 'var(--font-space-grotesk), var(--font-outfit), Inter, Arial, sans-serif',
      fontWeight: 600,
      color: '#ffffff',
    },
    h4: {
      fontFamily: 'var(--font-outfit), Inter, Arial, sans-serif',
      fontWeight: 500,
      color: '#e8e9ea',
    },
    h5: {
      fontFamily: 'var(--font-outfit), Inter, Arial, sans-serif',
      fontWeight: 500,
      color: '#e8e9ea',
    },
    h6: {
      fontFamily: 'var(--font-outfit), Inter, Arial, sans-serif',
      fontWeight: 500,
      color: '#e8e9ea',
    },
    body1: {
      fontFamily: 'var(--font-outfit), Inter, Arial, sans-serif',
      fontWeight: 400,
      color: '#f8f9fa',
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: 'var(--font-outfit), Inter, Arial, sans-serif',
      fontWeight: 400,
      color: '#e8e9ea',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#0a0a1a',
          borderColor: '#496c99',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#0a0a1a',
          borderColor: '#496c99',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#0a0a1a',
          color: '#e8e9ea',
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