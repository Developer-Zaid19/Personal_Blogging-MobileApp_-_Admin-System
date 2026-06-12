import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LIGHT_THEME = {
  primary: '#00BCFF',
  primarySoft: '#5ad9ff',
  primaryDark: '#0090cc',
  primaryGlow: 'rgba(0, 188, 255, 0.12)',
  primaryGlowStrong: 'rgba(0, 188, 255, 0.25)',
  background: '#f8fbff',
  backgroundTint: '#eef6ff',
  card: 'rgba(0, 188, 255, 0.06)',
  text: '#0f172a',
  textMuted: '#64748b',
  border: 'rgba(0, 144, 204, 0.12)',
  borderHover: 'rgba(0, 144, 204, 0.28)',
  focus: '#3766d1',
  error: 'rgb(220, 38, 38)',
  surface: '#ffffff',
};

export const DARK_THEME = {
  primary: '#00BCFF',
  primarySoft: '#38d4ff',
  primaryDark: '#0090cc',
  primaryGlow: 'rgba(0, 188, 255, 0.2)',
  primaryGlowStrong: 'rgba(0, 188, 255, 0.45)',
  background: '#080e1a',
  backgroundTint: '#0d1525',
  card: 'rgba(0, 188, 255, 0.04)',
  text: '#e2eeff',
  textMuted: '#6b83a8',
  border: 'rgba(0, 188, 255, 0.12)',
  borderHover: 'rgba(0, 188, 255, 0.4)',
  focus: '#3766d1',
  error: 'rgb(255, 80, 80)',
  surface: '#111827',
};

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('blogTheme');
        if (savedTheme === 'dark' || savedTheme === 'light') {
          setTheme(savedTheme);
        }
      } catch (error) {
        // ignore persisted theme issues
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    try {
      await AsyncStorage.setItem('blogTheme', nextTheme);
    } catch (error) {
      // ignore persisted theme issues
    }
  };

  const value = useMemo(() => ({theme, toggleTheme}), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
