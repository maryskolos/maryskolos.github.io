export const oliveColors = {
  cream: '#F5F0E6',
  olivePale: '#D4E2D0',
  sand: '#D9C9A8',
  oliveMuted: '#8A9B6F',
  oliveMoss: '#5A6A3F',
  oliveDeep: '#3D4A32',
  white: '#FEFDFB',
} as const;

export const oliveTheme = {
  colors: oliveColors,
  spacing: {
    sectionY: { xs: 6, md: 10 },
    containerPx: { xs: 2, sm: 3, md: 4 },
    maxWidth: 1200,
  },
  borderRadius: {
    card: 12,
    chip: 20,
    phone: 36,
  },
  shadows: {
    phone: '0 20px 60px rgba(61, 74, 50, 0.25)',
    card: '0 4px 20px rgba(61, 74, 50, 0.12)',
  },
} as const;

export type OliveColor = keyof typeof oliveColors;
