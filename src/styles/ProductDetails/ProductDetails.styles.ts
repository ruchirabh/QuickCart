import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');
export const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    /* Loading State */
    loadingContainer: {
      flex: 1,
    },
    loadingContent: {
      flex: 1,
    },
    imageSkeleton: {
      width: width,
      height: width,
    },
    contentSkeleton: {
      padding: 20,
    },
    titleSkeleton: {
      width: '80%',
      height: 32,
      borderRadius: 8,
      marginBottom: 12,
    },
    priceSkeleton: {
      width: '40%',
      height: 28,
      borderRadius: 8,
      marginBottom: 20,
    },
    descSkeleton: {
      width: '100%',
      height: 80,
      borderRadius: 8,
    },

    /* Header */
    header: {
      position: 'absolute',
      top: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 8 : 12,
      left: 16,
      right: 16,
      zIndex: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    backButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.9)',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    cartButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.9)',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    cartBadge: {
      position: 'absolute',
      top: -2,
      right: -2,
      backgroundColor: '#FF3B30',
      borderRadius: 10,
      minWidth: 18,
      height: 18,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 4,
      borderWidth: 1.5,
      borderColor: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.9)',
    },
    cartBadgeText: {
      color: '#FFFFFF',
      fontSize: 10,
      fontWeight: '700',
    },

    /* Image Gallery */
    imageGallery: {
      position: 'relative',
    },
    mainImage: {
      width: width,
      height: width,
      resizeMode: 'cover',
    },
    imageIndicators: {
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    indicator: {
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4,
    },
    discountBadge: {
      position: 'absolute',
      top: 20,
      left: 20,
      backgroundColor: '#FF3B30',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },
    discountText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '700',
    },
    stockBadge: {
      position: 'absolute',
      top: 20,
      right: 20,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },
    stockText: {
      fontSize: 12,
      fontWeight: '600',
    },

    /* Product Info */
    productInfo: {
      padding: 20,
    },
    brandRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    brand: {
      fontSize: 16,
      fontWeight: '600',
    },
    categoryChip: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
      backgroundColor: theme.colors.border + '30',
    },
    categoryText: {
      fontSize: 12,
      fontWeight: '500',
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      marginBottom: 12,
      lineHeight: 32,
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    ratingCount: {
      fontSize: 14,
      marginLeft: 8,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    price: {
      fontSize: 32,
      fontWeight: '800',
    },
    originalPrice: {
      fontSize: 18,
      textDecorationLine: 'line-through',
      marginLeft: 12,
    },
    descriptionContainer: {
      marginBottom: 24,
    },
    descriptionTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 8,
    },
    description: {
      fontSize: 14,
      lineHeight: 22,
      marginBottom: 8,
    },
    readMore: {
      fontSize: 14,
      fontWeight: '600',
    },

    /* Specifications */
    specsContainer: {
      marginBottom: 24,
    },
    specsTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 16,
    },
    specsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    specItem: {
      width: (width - 48) / 2,
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    specLabel: {
      fontSize: 12,
      marginTop: 8,
      marginBottom: 4,
    },
    specValue: {
      fontSize: 14,
      fontWeight: '600',
    },

    /* Tags */
    tagsContainer: {
      marginBottom: 24,
    },
    tagsTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 12,
    },
    tagsWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    tagChip: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      marginRight: 8,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    tagText: {
      fontSize: 12,
      fontWeight: '500',
    },

    /* Info Cards */
    infoCards: {
      marginBottom: 24,
    },
    infoCard: {
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    infoTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginTop: 8,
      marginBottom: 4,
    },
    infoText: {
      fontSize: 14,
    },

    /* Reviews */
    reviewsContainer: {
      marginBottom: 24,
    },
    reviewsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    reviewsTitle: {
      fontSize: 18,
      fontWeight: '700',
    },
    viewAllText: {
      fontSize: 14,
      fontWeight: '600',
    },
    reviewItem: {
      paddingVertical: 16,
      borderBottomWidth: 1,
    },
    reviewHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    reviewerInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    reviewerAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    reviewerInitial: {
      fontSize: 18,
      fontWeight: '600',
    },
    reviewerName: {
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 2,
    },
    reviewDate: {
      fontSize: 12,
    },
    reviewComment: {
      fontSize: 14,
      lineHeight: 20,
      marginLeft: 52,
    },

    /* Bottom Bar */
    bottomBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 10,
    },
    priceInfo: {
      flex: 1,
    },
    bottomPriceLabel: {
      fontSize: 12,
      marginBottom: 2,
    },
    bottomPrice: {
      fontSize: 22,
      fontWeight: '800',
    },
    addButton: {
      flex: 0.8,
    },
    removeButton: {
      flex: 0.8,
      backgroundColor: '#FF3B30',
    },
    cartActions: {
      flex: 0.8,
    },
  });
