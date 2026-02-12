import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppTheme } from '../../../contexts/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { addToCart, removeFromCart } from '../../../features/cartSlice';
import Button from '../../common/Button';
import RatingStars from './RatingStars';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 20;

interface Props {
  product: any;
  onViewDetails?: () => void;
}

const ProductCard: React.FC<Props> = ({ product, onViewDetails }) => {
  const { theme, isDark } = useAppTheme();
  const dispatch = useAppDispatch();

  // Check if product is in cart
  const isInCart = useAppSelector(state =>
    state.cart.addedToCartIds.includes(product.id),
  );

  const styles = createStyles(theme, isDark);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: 1,
      }),
    );
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
  };

  return (
    <View style={styles.card}>
      {/* Discount Badge */}
      {product.discountPercentage && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>
            {Math.round(product.discountPercentage)}% OFF
          </Text>
        </View>
      )}

      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.thumbnail }} style={styles.image} />

        {/* Favorite Button */}
        {/* <TouchableOpacity style={styles.favoriteButton}>
          <Icon name="heart-outline" size={20} color={theme.colors.text} />
        </TouchableOpacity> */}
      </View>

      <View style={styles.content}>
        {/* Product Title */}
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <RatingStars rating={product.rating} />
          <Text style={styles.ratingCount}>({product.rating.toFixed(1)})</Text>
        </View>

        {/* Price Section */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${product.price}</Text>
          {product.discountPercentage && (
            <Text style={styles.originalPrice}>
              $
              {(product.price / (1 - product.discountPercentage / 100)).toFixed(
                2,
              )}
            </Text>
          )}
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            title="Details"
            variant="outline"
            size="small"
            onPress={onViewDetails || (() => console.log('View details'))}
            style={styles.detailsButton}
            textStyle={styles.buttonText}
          />

          {isInCart ? (
            <Button
              title="Remove"
              variant="secondary"
              size="small"
              onPress={handleRemoveFromCart}
              style={[styles.cartButton, { backgroundColor: '#FF3B30' }]}
              textStyle={styles.buttonText}
              icon={<Icon name="checkmark-circle" size={16} color="#FFF" />}
            />
          ) : (
            <Button
              title="Add"
              variant="primary"
              size="small"
              onPress={handleAddToCart}
              style={styles.cartButton}
              textStyle={styles.buttonText}
              icon={<Icon name="cart-outline" size={16} color="#FFF" />}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    card: {
      width: CARD_WIDTH,
      backgroundColor: theme.colors.card,
      borderRadius: 16,
      marginBottom: 16,
   
      borderWidth: 1,
      borderColor: theme.colors.border,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    imageContainer: {
      position: 'relative',
    },
    image: {
      width: '100%',
      height: 180,
      resizeMode: 'cover',
    },
    discountBadge: {
      position: 'absolute',
      top: 10,
      left: 10,
      backgroundColor: '#FF3B30',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      zIndex: 1,
    },
    discountText: {
      color: '#FFF',
      fontSize: 11,
      fontWeight: '700',
    },
    favoriteButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.9)',
      borderRadius: 20,
      padding: 8,
      zIndex: 1,
    },
    content: {
      padding: 12,
    },
    title: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 6,
      lineHeight: 20,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    ratingCount: {
      fontSize: 11,
      color: theme.colors.textSecondary,
      marginLeft: 4,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    price: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.primary,
    },
    originalPrice: {
      fontSize: 13,
      color: theme.colors.textSecondary,
      textDecorationLine: 'line-through',
      marginLeft: 8,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    detailsButton: {
      flex: 1,
      marginRight: 8,
    },
    cartButton: {
      flex: 1,
    },
    buttonText: {
      fontSize: 12,
    },
  });

export default ProductCard;
