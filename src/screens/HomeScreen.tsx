import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Platform,
  StatusBar,
} from 'react-native';
import { useAppTheme } from '../contexts/ThemeContext';
import TopNavBar from '../components/TopNavBar/TopNavBar';

export const HomeScreen = () => {
  const { theme, isDark } = useAppTheme();
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleSearchPress = () => {
    console.log('Search pressed');
  };

  const handleInfoPress = () => {
    console.log('Info pressed');
  };

  // Calculate navbar height based on platform
  const navbarHeight = Platform.OS === 'ios' ? 56 : 64;
  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;
  const totalNavbarHeight = navbarHeight + statusBarHeight;

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Navbar - absolutely positioned */}
      <TopNavBar
        title="QuickCart"
        onSearchPress={handleSearchPress}
        onInfoPress={handleInfoPress}
        animated={true}
        scrollY={scrollY}
      />

      {/* Scrollable Content - with padding top to account for navbar */}
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: totalNavbarHeight + 16 }, // Add padding to push content below navbar
        ]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
      >
        {[...Array(20)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.card,
              {
                backgroundColor: isDark ? '#1A1A1A' : '#F8FAFC',
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Item {index + 1}
            </Text>
            <Text style={[styles.cardSubtitle, { color: theme.colors.text }]}>
              Scroll to see navbar hide/show
            </Text>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
});
