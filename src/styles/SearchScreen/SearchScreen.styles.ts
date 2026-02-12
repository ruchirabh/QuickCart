import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

export const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    /* Header */
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop:
        Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 8 : 12,
      paddingBottom: 12,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },

    backButton: {
      padding: 8,
      marginRight: 8,
    },

    searchContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#2A2A2A' : '#F5F5F5',
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: Platform.OS === 'ios' ? 12 : 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    searchInput: {
      flex: 1,
      marginLeft: 8,
      marginRight: 8,
      fontSize: 16,
      padding: 0,
    },

    /* Loading */
    loadingContainer: {
      flex: 1,
      paddingTop: 16,
      paddingHorizontal: 8,
    },

    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },

    cardWrapper: {
      width: (width - 32) / 2,
      marginBottom: 16,
    },

    /* Suggestions */
    suggestionsContent: {
      paddingTop: 16,
      paddingBottom: 16,
    },

    suggestionsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 12,
    },

    suggestionsTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    suggestionsTitle: {
      fontSize: 14,
      fontWeight: '600',
      marginLeft: 8,
    },

    clearText: {
      fontSize: 14,
      fontWeight: '600',
    },

    suggestionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border + '40',
    },

    suggestionText: {
      fontSize: 16,
      marginLeft: 12,
      flex: 1,
    },

    suggestionsLoading: {
      paddingVertical: 20,
      alignItems: 'center',
    },

    /* Results */
    resultsContent: {
      paddingHorizontal: 8,
      paddingBottom: 16,
    },

    columnWrapper: {
      justifyContent: 'space-between',
    },

    footerContainer: {
      paddingVertical: 20,
      alignItems: 'center',
    },

    endContainer: {
      paddingVertical: 30,
      alignItems: 'center',
    },

    endLine: {
      width: 100,
      height: 2,
      borderRadius: 1,
      marginBottom: 8,
    },

    endText: {
      fontSize: 14,
    },

    /* Empty State */
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
      marginTop: -40,
    },

    iconCircle: {
      width: 100,
      height: 100,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },

    emptyTitle: {
      fontSize: 20,
      fontWeight: '700',
      marginBottom: 8,
      textAlign: 'center',
    },

    emptySubtitle: {
      fontSize: 14,
      textAlign: 'center',
      lineHeight: 20,
    },
  });
