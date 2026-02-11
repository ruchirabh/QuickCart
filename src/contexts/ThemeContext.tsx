import React, { createContext, useState, useContext, useEffect } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import { MyLightTheme, MyDarkTheme } from '../theme/navigationTheme';
import type { Theme } from '@react-navigation/native';

interface ThemeContextType {
  theme: Theme;
  colorScheme: ColorSchemeName;
  isDark: boolean;
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
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme() ?? 'light',
  );

  useEffect(() => {
    // Listen for system theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme ?? 'light');
    });

    return () => subscription.remove();
  }, []);

  const isDark = colorScheme === 'dark';
  const theme = isDark ? MyDarkTheme : MyLightTheme;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colorScheme,
        isDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};