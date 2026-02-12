import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');
export const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop:
        Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 8 : 50,
      paddingBottom: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      zIndex: 10,
    },
    backButton: {
      padding: 4,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '700',
    },
    clearText: {
      fontSize: 14,
      fontWeight: '600',
    },
    listContent: {
      padding: 16,
      paddingBottom: 180, // Increased to ensure all items are visible above bottom bar
    },
    cartItem: {
      flexDirection: 'row',
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    itemImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      resizeMode: 'cover',
    },
    itemDetails: {
      flex: 1,
      marginLeft: 12,
    },
    itemTitle: {
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 4,
    },
    itemPrice: {
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 8,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    quantityButton: {
      width: 32,
      height: 32,
      borderRadius: 8,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    quantity: {
      fontSize: 16,
      fontWeight: '600',
      marginHorizontal: 12,
    },
    removeButton: {
      marginLeft: 16,
      padding: 4,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
      marginTop: height * 0.2,
    },
    iconCircle: {
      width: 120,
      height: 120,
      borderRadius: 60,
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
      marginBottom: 24,
      lineHeight: 20,
    },
    shopButton: {
      width: 200,
    },
    bottomBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 10,
      zIndex: 20,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    summaryLabel: {
      fontSize: 14,
    },
    summaryValue: {
      fontSize: 14,
      fontWeight: '600',
    },
    divider: {
      height: 1,
      marginVertical: 12,
    },
    totalLabel: {
      fontSize: 16,
      fontWeight: '700',
    },
    totalValue: {
      fontSize: 20,
      fontWeight: '800',
    },
    checkoutButton: {
      marginTop: 12,
    },
  });
