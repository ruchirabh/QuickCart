import React, { createContext, useState, useContext, useEffect } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import { MyLightTheme, MyDarkTheme } from '../theme/navigationTheme';
import type { AppTheme } from '../theme/types';

interface ThemeContextType {
  theme: AppTheme;
  colorScheme: ColorSchemeName;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemScheme = Appearance.getColorScheme() ?? 'light';

  const [colorScheme, setColorScheme] =
    useState<ColorSchemeName>(systemScheme);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme ?? 'light');
    });

    return () => subscription.remove();
  }, []);

  const isDark = colorScheme === 'dark';
  const theme = isDark ? MyDarkTheme : MyLightTheme;

  const toggleTheme = () => {
    setColorScheme(isDark ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colorScheme,
        isDark,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
