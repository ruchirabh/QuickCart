import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
  Alert,
  Dimensions,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../contexts/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../../features/cartSlice';
import Button from '../../components/common/Button';
import OrderConfirmation from '../../components/Cart/OrderConfirmation';

const { width, height } = Dimensions.get('window');

const CartScreen = () => {
  const navigation = useNavigation();
  const { theme, isDark } = useAppTheme();
  const dispatch = useAppDispatch();
  
  // State for order confirmation modal
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderNumber] = useState('ORD' + Math.floor(100000 + Math.random() * 900000));
  
  // Scroll animation for header
  const scrollY = useRef(new Animated.Value(0)).current;

  // Access cart items from Redux store
  const cartItems = useAppSelector(state => state.cart.items);
  const cartItemCount = useAppSelector(state =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  );
  const cartTotal = useAppSelector(state =>
    state.cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    ),
  );

  const styles = createStyles(theme, isDark);

  // Header animation based on scroll
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.95],
    extrapolate: 'clamp',
  });

  const headerShadow = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 5],
    extrapolate: 'clamp',
  });

  const handleRemoveItem = (id: number, title: string) => {
    Alert.alert(
      'Remove Item',
      `Are you sure you want to remove ${title} from cart?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          onPress: () => dispatch(removeFromCart(id)),
          style: 'destructive',
        },
      ],
    );
  };

  const handleUpdateQuantity = (
    id: number,
    currentQuantity: number,
    change: number,
  ) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          onPress: () => dispatch(clearCart()),
          style: 'destructive',
        },
      ],
    );
  };

  const handleCheckout = () => {
    Alert.alert(
      'Confirm Order',
      'Are you ready to place your order?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Place Order',
          onPress: () => {
            // Show order confirmation popup
            setShowConfirmation(true);
          },
          style: 'default',
        },
      ],
    );
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    // Clear cart after order is placed
    dispatch(clearCart());
    // Navigate back to home after a short delay
    setTimeout(() => {
      navigation.navigate('Home' as never);
    }, 500);
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <Animated.View
      style={[
        styles.cartItem,
        { backgroundColor: theme.colors.card },
      ]}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.itemImage} />

      <View style={styles.itemDetails}>
        <Text
          style={[styles.itemTitle, { color: theme.colors.text }]}
          numberOfLines={2}
        >
          {item.title}
        </Text>

        <Text style={[styles.itemPrice, { color: theme.colors.primary }]}>
          ${item.price.toFixed(2)}
        </Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={[
              styles.quantityButton,
              { borderColor: theme.colors.border },
            ]}
            onPress={() => handleUpdateQuantity(item.id, item.quantity, -1)}
          >
            <Icon name="remove" size={18} color={theme.colors.text} />
          </TouchableOpacity>

          <Text style={[styles.quantity, { color: theme.colors.text }]}>
            {item.quantity}
          </Text>

          <TouchableOpacity
            style={[
              styles.quantityButton,
              { borderColor: theme.colors.border },
            ]}
            onPress={() => handleUpdateQuantity(item.id, item.quantity, 1)}
          >
            <Icon name="add" size={18} color={theme.colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveItem(item.id, item.title)}
          >
            <Icon name="trash-outline" size={18} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <View
        style={[
          styles.iconCircle,
          { backgroundColor: theme.colors.border + '40' },
        ]}
      >
        <Icon
          name="cart-outline"
          size={64}
          color={theme.colors.textSecondary}
        />
      </View>
      <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
        Your cart is empty
      </Text>
      <Text
        style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}
      >
        Looks like you haven't added any items to your cart yet
      </Text>
      <Button
        title="Start Shopping"
        variant="primary"
        onPress={() => navigation.navigate('Home' as never)}
        style={styles.shopButton}
      />
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Animated Header */}
      <Animated.View
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.card,
            opacity: headerOpacity,
            elevation: headerShadow,
            shadowOpacity: headerShadow.interpolate({
              inputRange: [0, 5],
              outputRange: [0, 0.1],
            }),
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          My Cart ({cartItemCount})
        </Text>
        {cartItems.length > 0 && (
          <TouchableOpacity onPress={handleClearCart}>
            <Text style={[styles.clearText, { color: theme.colors.primary }]}>
              Clear
            </Text>
          </TouchableOpacity>
        )}
      </Animated.View>

      {/* Cart Items with Scroll */}
      <Animated.FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={renderCartItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyCart}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        bounces={true}
        overScrollMode="always"
      />

      {/* Bottom Summary - Only show if cart has items */}
      {cartItems.length > 0 && (
        <Animated.View
          style={[
            styles.bottomBar,
            {
              backgroundColor: theme.colors.card,
              transform: [{
                translateY: scrollY.interpolate({
                  inputRange: [0, height],
                  outputRange: [0, 100],
                  extrapolate: 'clamp',
                })
              }]
            },
          ]}
        >
          <View style={styles.summaryRow}>
            <Text
              style={[
                styles.summaryLabel,
                { color: theme.colors.textSecondary },
              ]}
            >
              Subtotal ({cartItemCount} items)
            </Text>
            <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
              ${cartTotal.toFixed(2)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text
              style={[
                styles.summaryLabel,
                { color: theme.colors.textSecondary },
              ]}
            >
              Shipping
            </Text>
            <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
              Free
            </Text>
          </View>

          <View
            style={[styles.divider, { backgroundColor: theme.colors.border }]}
          />

          <View style={styles.summaryRow}>
            <Text style={[styles.totalLabel, { color: theme.colors.text }]}>
              Total
            </Text>
            <Text style={[styles.totalValue, { color: theme.colors.primary }]}>
              ${cartTotal.toFixed(2)}
            </Text>
          </View>

          <Button
            title="Proceed to Checkout"
            variant="primary"
            onPress={handleCheckout}
            style={styles.checkoutButton}
            icon={<Icon name="cart-outline" size={20} color="#FFF" />}
          />
        </Animated.View>
      )}

      {/* Order Confirmation Popup */}
      <OrderConfirmation
        visible={showConfirmation}
        onClose={handleConfirmationClose}
        orderNumber={orderNumber}
        totalAmount={cartTotal}
      />
    </View>
  );
};

const createStyles = (theme: any, isDark: boolean) =>
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

export default CartScreen;