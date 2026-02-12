import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppTheme } from '../../contexts/ThemeContext';
import RatingStars from '../HomeScreen/Card/RatingStars';

interface ProductHeaderProps {
  brand: string;
  category: string;
  title: string;
  rating: number;
  reviewCount: number;
  onBackPress: () => void;
  onCartPress: () => void;
  cartItemCount?: number;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  brand,
  category,
  title,
  rating,
  reviewCount,
  onBackPress,
  onCartPress,
  cartItemCount,
}) => {
  const { theme, isDark } = useAppTheme();
  const styles = createStyles(theme, isDark);

  return (
    <>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBackPress}
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Product Details
          </Text>
        </View>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={onCartPress}
          activeOpacity={0.7}
        >
          <Icon name="cart-outline" size={24} color={theme.colors.primary} />
          {cartItemCount ? (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>

      {/* Product Info Header */}
      <View style={styles.productInfo}>
        <View style={styles.brandRow}>
          <Text style={[styles.brand, { color: theme.colors.primary }]}>
            {brand}
          </Text>
          <View style={styles.categoryChip}>
            <Text
              style={[
                styles.categoryText,
                { color: theme.colors.textSecondary },
              ]}
            >
              {category}
            </Text>
          </View>
        </View>

        <Text style={[styles.title, { color: theme.colors.text }]}>
          {title}
        </Text>

        <View style={styles.ratingRow}>
          <RatingStars rating={rating} />
          <Text
            style={[styles.ratingCount, { color: theme.colors.textSecondary }]}
          >
            {rating.toFixed(1)} ({reviewCount}{' '}
            {reviewCount === 1 ? 'review' : 'reviews'})
          </Text>
        </View>
      </View>
    </>
  );
};

const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop:
        Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 8 : 50, // Increased for iOS
      paddingHorizontal: 16,
      paddingBottom: 12,
      backgroundColor: 'transparent',
    },
    backButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.95)',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 5,
    },
    headerTitleContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      textShadowColor: 'rgba(0,0,0,0.1)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    cartButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.95)',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 5,
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
      borderColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.95)',
    },
    cartBadgeText: {
      color: '#FFFFFF',
      fontSize: 10,
      fontWeight: '700',
    },
    productInfo: {
      paddingTop:
        Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 100 : 120, // Increased to account for header height
      paddingHorizontal: 20,
      paddingBottom: 20,
      backgroundColor: theme.colors.background,
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
  });

export default ProductHeader;
