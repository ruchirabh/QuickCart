import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');
export const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    /* ---------- Header ---------- */
    header: {
      flexDirection: 'row',
      alignItems: 'center',

      paddingTop:
        Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 4 : 0,
      paddingBottom: 12,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 5,
      minHeight: Platform.OS === 'ios' ? 100 : 96,
    },

    backBtn: {
      padding: 4,
    },

    backBtnInner: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.primary + '10',
      justifyContent: 'center',
      alignItems: 'center',
    },

    rightSpacer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.textSecondary + '10',
      justifyContent: 'center',
      alignItems: 'center',
    },

    /* ---------- Brand Title ---------- */
    titleContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 80,
    },

    brandRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    iconWrap: {
      marginHorizontal: 4,
      marginTop: 2,
    },

    titleQuick: {
      fontSize: 22,
      fontWeight: '800',
      color: theme.colors.text,
      letterSpacing: 0.5,
    },

    titleCart: {
      fontSize: 22,
      fontWeight: '800',
      color: theme.colors.primary,
      letterSpacing: 0.5,
    },

    subHeader: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginTop: 2,
      letterSpacing: 0.3,
    },

    /* ---------- Content ---------- */
    content: {
      padding: 20,
      paddingBottom: 40,
    },

    /* Hero Section */
    heroSection: {
      alignItems: 'center',
      marginBottom: 24,
      marginTop: 8,
    },

    iconCircle: {
      width: 80,
      height: 80,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },

    heroTitle: {
      fontSize: 28,
      fontWeight: '800',
      color: theme.colors.text,
      marginBottom: 4,
    },

    heroSubtitle: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginBottom: 12,
    },

    badge: {
      paddingHorizontal: 16,
      paddingVertical: 6,
      borderRadius: 20,
    },

    badgeText: {
      fontSize: 12,
      fontWeight: '600',
    },

    /* Cards */
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 3,
    },

    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },

    cardTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.text,
      marginLeft: 8,
    },

    cardText: {
      fontSize: 14,
      lineHeight: 22,
      color: theme.colors.textSecondary,
    },

    /* Features Grid */
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 16,
      marginTop: 8,
    },

    featuresGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 16,
    },

    featureItem: {
      width: (width - 48) / 2,
      padding: 16,
      borderRadius: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    featureIcon: {
      width: 48,
      height: 48,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },

    featureTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 4,
    },

    featureDesc: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      lineHeight: 18,
    },

    /* Tech Stack */
    techStack: {
      marginBottom: 24,
    },

    techRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 8,
    },

    techChip: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 8,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    techText: {
      fontSize: 12,
      color: theme.colors.text,
      marginLeft: 6,
      fontWeight: '500',
    },

    /* API Card */
    apiCard: {
      backgroundColor: theme.colors.card,
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    apiHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },

    apiTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      marginLeft: 8,
    },

    apiUrl: {
      fontSize: 12,
      color: theme.colors.primary,
      marginBottom: 12,
      fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    },

    apiBadge: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },

    apiBadgeText: {
      fontSize: 11,
      color: theme.colors.textSecondary,
      backgroundColor: theme.colors.border + '40',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
      marginRight: 8,
      overflow: 'hidden',
    },

    /* Developer Card */
    developerCard: {
      alignItems: 'center',
      paddingVertical: 24,
      marginTop: 8,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },

    developerText: {
      fontSize: 14,
      color: theme.colors.text,
      marginTop: 12,
      marginBottom: 4,
    },

    developerSubtext: {
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
  });
