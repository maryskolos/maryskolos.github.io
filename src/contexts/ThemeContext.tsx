'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  themeMode: 'light' | 'dark';
  toggleTheme: () => void;
  isTransitioning: boolean;
  pendingTheme: 'light' | 'dark' | null;
  completeTransition: () => void;
  isLoaded: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingTheme, setPendingTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('themeMode') as 'light' | 'dark';
    if (savedTheme) {
      setThemeMode(savedTheme);
    }
    setIsLoaded(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = themeMode === 'dark' ? 'light' : 'dark';
    setPendingTheme(newTheme);
    setIsTransitioning(true);
  };

  const completeTransition = () => {
    if (pendingTheme) {
      setThemeMode(pendingTheme);
      localStorage.setItem('themeMode', pendingTheme);
      setPendingTheme(null);
      setIsTransitioning(false);
    }
  };

  if (!isLoaded) {
    return null;
  }

  const value = {
    themeMode,
    toggleTheme,
    isTransitioning,
    pendingTheme,
    completeTransition,
    isLoaded,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
