import { theme } from '@/constants/theme';

export const getCurrentTheme = (isDarkMode: boolean) => {
  return isDarkMode ? theme.colors : theme.lightColors;
};

export const getThemeColor = (isDarkMode: boolean, colorPath: keyof typeof theme.colors) => {
  const currentTheme = getCurrentTheme(isDarkMode);
  return currentTheme[colorPath];
};

export const getHeaderColor = (isDarkMode: boolean) => {
  if (isDarkMode) {
    return theme.colors.text.primary; // White for dark mode
  } else {
    return theme.lightColors.primary.dark; // Dark blue (#2E5C8A) for light mode - same as request references button
  }
};
