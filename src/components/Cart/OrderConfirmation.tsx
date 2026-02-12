import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppTheme } from '../../contexts/ThemeContext';

const { width } = Dimensions.get('window');

interface OrderConfirmationProps {
  visible: boolean;
  onClose: () => void;
  orderNumber?: string;
  totalAmount?: number;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  visible,
  onClose,
  orderNumber = 'ORD' + Math.floor(100000 + Math.random() * 900000),
  totalAmount = 0,
}) => {
  const { theme, isDark } = useAppTheme();
  
  // Animation values
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const checkAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Entrance animation
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Checkmark animation
      Animated.sequence([
        Animated.delay(300),
        Animated.spring(checkAnim, {
          toValue: 1,
          friction: 6,
          tension: 50,
          useNativeDriver: true,
        }),
      ]).start();

      // Bounce animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      // Exit animation
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        checkAnim.setValue(0);
        bounceAnim.setValue(0);
      });
    }
  }, [visible]);

  if (!visible) return null;

  const styles = createStyles(theme, isDark);

  const checkScale = checkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const bounce = bounceAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -10, 0],
  });

  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          opacity: opacityAnim,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ scale: scaleAnim }],
            backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF',
          },
        ]}
      >
        {/* Success Icon with Animation */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{ scale: checkScale }, { translateY: bounce }],
              backgroundColor: isDark ? '#2A2A2A' : '#F0F9F0',
            },
          ]}
        >
          <Icon name="checkmark-circle" size={80} color="#4CAF50" />
        </Animated.View>

        {/* Thank You Message */}
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Thank You! 🎉
        </Text>
        
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Your order has been placed successfully
        </Text>

        {/* Order Details */}
        <View style={[styles.orderDetails, { backgroundColor: theme.colors.card }]}>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
              Order Number
            </Text>
            <Text style={[styles.detailValue, { color: theme.colors.primary }]}>
              {orderNumber}
            </Text>
          </View>
          
          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
          
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
              Total Amount
            </Text>
            <Text style={[styles.detailValue, { color: theme.colors.primary }]}>
              ${totalAmount.toFixed(2)}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
              Estimated Delivery
            </Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>
              {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Continue Shopping Button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={onClose}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Continue Shopping</Text>
          <Icon name="arrow-forward" size={20} color="#FFF" style={styles.buttonIcon} />
        </TouchableOpacity>

        {/* Confetti Effect (simulated with dots) */}
        <View style={styles.confettiContainer}>
          {[...Array(20)].map((_, i) => (
            <Animated.View
              key={`confetti-${i}`}
              style={[
                styles.confetti,
                {
                  left: Math.random() * width * 0.8,
                  top: Math.random() * 400,
                  backgroundColor: ['#FF3B30', '#FFB800', '#34C759', '#0F2792'][Math.floor(Math.random() * 4)],
                  transform: [
                    { rotate: `${Math.random() * 360}deg` },
                    { scale: Math.random() * 0.5 + 0.5 },
                  ],
                  opacity: bounceAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.3, 0.8, 0.3],
                  }),
                },
              ]}
            />
          ))}
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    container: {
      width: width * 0.85,
      maxWidth: 400,
      borderRadius: 24,
      padding: 24,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 10,
    },
    iconContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    title: {
      fontSize: 28,
      fontWeight: '800',
      marginBottom: 8,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 24,
      textAlign: 'center',
    },
    orderDetails: {
      width: '100%',
      padding: 16,
      borderRadius: 16,
      marginBottom: 24,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
    },
    detailLabel: {
      fontSize: 14,
    },
    detailValue: {
      fontSize: 16,
      fontWeight: '600',
    },
    divider: {
      height: 1,
      marginVertical: 8,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 24,
      paddingVertical: 14,
      borderRadius: 12,
      width: '100%',
    },
    buttonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '600',
      marginRight: 8,
    },
    buttonIcon: {
      marginLeft: 4,
    },
    confettiContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
    },
    confetti: {
      position: 'absolute',
      width: 8,
      height: 8,
      borderRadius: 4,
    },
  });

export default OrderConfirmation;