import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';
import { LightColors, DarkColors } from './colors';

export const MyLightTheme: Theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    ...LightColors,
    primary: LightColors.primary,
    background: LightColors.background,
    card: LightColors.card,
    text: LightColors.text,
    border: LightColors.border,
    notification: LightColors.notification,
  },
};

export const MyDarkTheme: Theme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    ...DarkColors,
    primary: DarkColors.primary,
    background: DarkColors.background,
    card: DarkColors.card,
    text: DarkColors.text,
    border: DarkColors.border,
    notification: DarkColors.notification,
  },
};