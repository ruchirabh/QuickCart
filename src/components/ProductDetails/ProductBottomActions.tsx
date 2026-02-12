import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppTheme } from '../../contexts/ThemeContext';
import Button from '../common/Button';

interface ProductBottomActionsProps {
  price: number;
  isInCart: boolean;
  stock: number;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
}

const ProductBottomActions: React.FC<ProductBottomActionsProps> = ({
  price,
  isInCart,
  stock,
  onAddToCart,
  onRemoveFromCart,
}) => {
  const { theme, isDark } = useAppTheme();
  const styles = createStyles(theme, isDark);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.priceInfo}>
        <Text style={[styles.priceLabel, { color: theme.colors.textSecondary }]}>
          Total Price
        </Text>
        <Text style={[styles.price, { color: theme.colors.primary }]}>
          ${price}
        </Text>
      </View>

      {isInCart ? (
        <View style={styles.cartActions}>
          <Button
            title="Remove from Cart"
            variant="secondary"
            onPress={onRemoveFromCart}
            style={styles.removeButton}
            icon={<Icon name="trash-outline" size={18} color="#FFF" />}
          />
        </View>
      ) : (
        <Button
          title="Add to Cart"
          variant="primary"
          onPress={onAddToCart}
          style={styles.addButton}
          icon={<Icon name="cart-outline" size={18} color="#FFF" />}
          disabled={stock === 0}
        />
      )}
    </View>
  );
};

const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 26,
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
    priceLabel: {
      fontSize: 12,
      marginBottom: 2,
    },
    price: {
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

export default ProductBottomActions;