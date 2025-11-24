import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTheme } from '../theme';

interface ThemeContextType {
  colors: ReturnType<typeof getTheme>['colors'];
  typography: ReturnType<typeof getTheme>['typography'];
  spacing: ReturnType<typeof getTheme>['spacing'];
  borderRadius: ReturnType<typeof getTheme>['borderRadius'];
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const THEME_STORAGE_KEY = '@waicalm_theme';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar tema guardado
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme !== null) {
          setIsDark(savedTheme === 'dark');
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTheme();
  }, []);

  // Guardar tema cuando cambia
  useEffect(() => {
    if (!isLoading) {
      AsyncStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light').catch(
        (error) => console.error('Error saving theme:', error)
      );
    }
  }, [isDark, isLoading]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const theme = getTheme(isDark);

  const value: ThemeContextType = {
    colors: theme.colors,
    typography: theme.typography,
    spacing: theme.spacing,
    borderRadius: theme.borderRadius,
    isDark,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme debe ser usado dentro de ThemeProvider');
  }
  return context;
};





