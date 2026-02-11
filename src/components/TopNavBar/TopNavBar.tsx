import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StatusBar,
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
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (animated && scrollY) {
      // Hide navbar when scrolling down, show when scrolling up
      const listener = scrollY.addListener(({ value }) => {
        const scrollDiff = value - (scrollY as any)._lastValue;
        
        if (scrollDiff > 5 && value > 50) {
          // Scrolling down - hide navbar
          Animated.parallel([
            Animated.timing(translateY, {
              toValue: -100,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 150,
              useNativeDriver: true,
            }),
          ]).start();
        } else if (scrollDiff < -5) {
          // Scrolling up - show navbar
          Animated.parallel([
            Animated.timing(translateY, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 1,
              duration: 150,
              useNativeDriver: true,
            }),
          ]).start();
        }
      });

      return () => {
        scrollY.removeListener(listener);
      };
    }
  }, [animated, scrollY]);

  const styles = createStyles(theme, isDark);

  const NavContent = () => (
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
            <Icon name="information-circle-outline" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (animated) {
    return (
      <Animated.View
        style={[
          styles.wrapper,
          {
            transform: [{ translateY }],
            opacity,
          },
        ]}
      >
        <NavContent />
      </Animated.View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <NavContent />
    </View>
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
      backgroundColor: isDark ? 'rgba(10, 10, 10, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      paddingTop: StatusBar.currentHeight || 0,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      height: 56,
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