import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StatusBar,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../contexts/ThemeContext';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { clearCart } from '../../features/cartSlice';

interface TopNavBarProps {
  title?: string;
  showSearch?: boolean;
  showInfo?: boolean;
  showCart?: boolean;
  onSearchPress?: () => void;
  onInfoPress?: () => void;
  onCartPress?: () => void;
  animated?: boolean;
  scrollY?: Animated.Value;
  onHomePress?: () => void;
  cartItemCount?: number;
}

const TopNavBar: React.FC<TopNavBarProps> = ({
  title = 'QuickCart',
  showSearch = true,
  showInfo = true,
  showCart = true,
  onSearchPress,
  onInfoPress,
  onCartPress,
  animated = false,
  scrollY,
  onHomePress,
  cartItemCount = 0,
}) => {
  const { theme, isDark } = useAppTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  // Animation values
  const translateY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (animated && scrollY) {
      const listener = scrollY.addListener(({ value }) => {
        if (value < 0) return;
        const diff = value - lastScrollY.current;

        if (diff > 5 && value > 50) {
          Animated.timing(translateY, {
            toValue: -100,
            duration: 250,
            useNativeDriver: true,
          }).start();
        } else if (diff < -5) {
          Animated.timing(translateY, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }).start();
        }

        lastScrollY.current = value;
      });

      return () => {
        scrollY.removeListener(listener);
      };
    }
  }, [animated, scrollY]);

  const handleHomePress = () => {
    // Navigate to Home screen
    navigation.navigate('Home' as never);

    // Call custom onHomePress if provided
    if (onHomePress) {
      onHomePress();
    }
  };

  const styles = createStyles(theme, isDark);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        animated && {
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.container}>
        {/* Left Section - Logo and Title */}
        <TouchableOpacity
          style={styles.leftSection}
          onPress={handleHomePress}
          activeOpacity={0.7}
        >
          <View style={styles.titleContainer}>
            <View style={styles.brandRow}>
              <Text style={styles.titleQuick}>Quick</Text>

              <View style={styles.iconWrap}>
                <Icon name="cart" size={18} color={'#FFCC33'} />
              </View>

              <Text style={styles.titleCart}>Cart</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Right Section - Icons */}
        <View style={styles.rightSection}>
          {showSearch && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onSearchPress}
              activeOpacity={0.7}
            >
              <Icon name="search-outline" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          )}

          {showCart && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onCartPress}
              activeOpacity={0.7}
            >
              <View>
                <Icon
                  name="cart-outline"
                  size={24}
                  color={theme.colors.primary}
                />
                {cartItemCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {cartItemCount > 99 ? '99+' : cartItemCount}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}

          {showInfo && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onInfoPress}
              activeOpacity={0.7}
            >
              <Icon
                name="information-circle-outline"
                size={24}
                color={theme.colors.text}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    wrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: theme.colors.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      height: Platform.OS === 'ios' ? 56 : 64,
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    logoIcon: {
      marginRight: 8,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      letterSpacing: 0.5,
    },

    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconButton: {
      padding: 8,
      marginLeft: 8,
      position: 'relative',
    },
    badge: {
      position: 'absolute',
      top: -4,
      right: -4,
      backgroundColor: '#FF3B30',
      borderRadius: 12,
      minWidth: 18,
      height: 18,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 4,
      borderWidth: 1.5,
      borderColor: theme.colors.card,
    },
    badgeText: {
      color: '#FFFFFF',
      fontSize: 10,
      fontWeight: '700',
    },
    brandRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    iconWrap: {
      marginHorizontal: 4,
      marginTop: 1, // small baseline alignment tweak
    },

    titleQuick: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.text,
    },

    titleCart: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.primary,
    },
  });

export default TopNavBar;
