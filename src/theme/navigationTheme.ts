import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import type { AppTheme } from './types';

export const MyLightTheme: AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2563EB',
    background: '#FFFFFF',
    card: '#F9FAFB',
    text: '#111827',
    border: '#E5E7EB',
    notification: '#EF4444',

    // Custom colors
    textSecondary: '#6B7280',
    cardBackground: '#FFFFFF',
  },
};

export const MyDarkTheme: AppTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#60A5FA',
    background: '#000000',

    card: '#121212',        // 👈 darker
    cardBackground: '#121212',
    text: '#F1F5F9',
    border: '#1F1F1F',
    notification: '#F87171',

    textSecondary: '#9CA3AF',
  },
};

