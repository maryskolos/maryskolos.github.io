'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Outfit, Space_Grotesk } from 'next/font/google';

// Load the fonts
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

// Create a warm, natural theme with high contrast
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6d809f', // Medium slate blue for primary
      light: '#9ca0b9', // Light lavender-gray for lighter variations
      dark: '#496c99', // Deep steel blue for darker variations
      contrastText: '#ffffff', // White text for maximum contrast
    },
    secondary: {
      main: '#9ca0b9', // Light lavender-gray for secondary
      light: '#e8e9ea', // Very light gray for lighter variations
      dark: '#6d809f', // Medium slate blue for darker variations
      contrastText: '#04040c', // Dark text for contrast on light backgrounds
    },
    background: {
      default: '#04040c', // Deep navy for main background
      paper: '#0a0a1a', // Slightly lighter navy for cards/panels
    },
    text: {
      primary: '#ffffff', // Pure white for primary text
      secondary: '#e8e9ea', // Very light gray for secondary text
    },
    divider: '#496c99', // Deep steel blue for dividers
    action: {
      active: '#6d809f', // Medium slate blue for active states
      hover: '#9ca0b9', // Light lavender-gray for hover states
      selected: '#496c99', // Deep steel blue for selected states
    },
  },
  typography: {
    fontFamily: 'var(--font-outfit), Inter, Arial, sans-serif',
    h1: {
      fontFamily: 'Syne, var(--font-space-grotesk), var(--font-outfit), Inter, Arial, sans-serif',
      fontWeight: 700, // Increased weight for better contrast
      letterSpacing: '-0.01em',
      color: '#ffffff', // Pure white for main headings
    },
    h2: {
      fontFamily: 'var(--font-space-grotesk), var(--font-outfit), Inter, Arial, sans-serif',
      fontWeight: 600, // Increased weight for better contrast
      color: '#ffffff', // Pure white for section headers
    },
    h3: {
      fontFamily: 'var(--font-space-grotesk), var(--font-outfit), Inter, Arial, sans-serif',
      fontWeight: 600, // Increased weight for better contrast
      color: '#ffffff', // Pure white for subsection headers
    },
    h4: {
      fontFamily: 'var(--font-outfit), Inter, Arial, sans-serif',
      fontWeight: 500, // Increased weight for better contrast
      color: '#e8e9ea', // Very light gray for smaller headers
    },
    h5: {
      fontFamily: 'var(--font-outfit), Inter, Arial, sans-serif',
      fontWeight: 500, // Increased weight for better contrast
      color: '#e8e9ea', // Very light gray for smaller headers
    },
    h6: {
      fontFamily: 'var(--font-outfit), Inter, Arial, sans-serif',
      fontWeight: 500, // Increased weight for better contrast
      color: '#e8e9ea', // Very light gray for smaller headers
    },
    body1: {
      fontFamily: 'var(--font-outfit), Inter, Arial, sans-serif',
      fontWeight: 400, // Increased weight for better contrast
      color: '#f8f9fa', // Light gray for body text
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: 'var(--font-outfit), Inter, Arial, sans-serif',
      fontWeight: 400, // Increased weight for better contrast
      color: '#e8e9ea', // Very light gray for secondary body text
      lineHeight: 1.5,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#0a0a1a', // Slightly lighter navy for paper elements
          borderColor: '#496c99', // Deep steel blue for paper borders
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#0a0a1a', // Slightly lighter navy for cards
          borderColor: '#496c99', // Deep steel blue for card borders
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#0a0a1a', // Slightly lighter navy for chip backgrounds
          color: '#e8e9ea', // Very light gray for chip text
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