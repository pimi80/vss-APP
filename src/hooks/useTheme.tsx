import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../config';

type Theme = 'dark' | 'light';

interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  card: string;
}

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const darkColors: ThemeColors = {
  background: COLORS.darker,
  surface: COLORS.dark,
  text: '#ffffff',
  textSecondary: 'rgba(255,255,255,0.5)',
  border: 'rgba(255,255,255,0.1)',
  card: 'rgba(255,255,255,0.05)',
};

const lightColors: ThemeColors = {
  background: '#f8fafc',
  surface: '#ffffff',
  text: '#0f172a',
  textSecondary: '#64748b',
  border: '#e2e8f0',
  card: '#f1f5f9',
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  isDark: true,
  colors: darkColors,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const isDark = theme === 'dark';
  const colors = isDark ? darkColors : lightColors;

  useEffect(() => {
    AsyncStorage.getItem('vss-theme').then(saved => {
      if (saved === 'light' || saved === 'dark') {
        setTheme(saved);
      }
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      AsyncStorage.setItem('vss-theme', next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, isDark, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
