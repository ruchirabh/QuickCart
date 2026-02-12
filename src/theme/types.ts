import type { Theme } from '@react-navigation/native';

export interface AppTheme extends Theme {
  colors: Theme['colors'] & {
    textSecondary: string;
    cardBackground: string;
  };
}
