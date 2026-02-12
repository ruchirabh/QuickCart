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
import { useAppTheme } from '../../contexts/ThemeContext';

interface TopNavBarProps {
  title?: string;
  showSearch?: boolean;
  showInfo?: boolean;
  onSearchPress?: () => void;
  onInfoPress?: () => void;
  animated?: boolean;
  scrollY?: Animated.Value;
}

const TopNavBar: React.FC<TopNavBarProps> = ({
  title = 'QuickCart',
  showSearch = true,
  showInfo = true,
  onSearchPress,
  onInfoPress,
  animated = false,
  scrollY,
}) => {
  const { theme, isDark } = useAppTheme();

  // Animation values
  const translateY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (animated && scrollY) {
      const listener = scrollY.addListener(({ value }) => {
        // Don't animate if scroll value is negative (overscroll)
        if (value < 0) return;

        const diff = value - lastScrollY.current;

        // Scrolling down - hide navbar
        if (diff > 5 && value > 50) {
          Animated.timing(translateY, {
            toValue: -100,
            duration: 250,
            useNativeDriver: true,
          }).start();
        }
        // Scrolling up - show navbar
        else if (diff < -5) {
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
        <View style={styles.leftSection}>
          <Text style={styles.title}>{title}</Text>
        </View>

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
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      height: Platform.OS === 'ios' ? 56 : 64,
    },
    leftSection: {
      flex: 1,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.text,
      letterSpacing: 0.5,
    },
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconButton: {
      padding: 8,
      marginLeft: 8,
    },
  });

export default TopNavBar;