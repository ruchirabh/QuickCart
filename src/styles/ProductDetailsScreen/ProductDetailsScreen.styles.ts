import { StyleSheet } from "react-native";

export const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    productInfo: {
      padding: 20,
    },
    loadingContainer: {
      flex: 1,
    },
  });