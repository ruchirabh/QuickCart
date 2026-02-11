import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { useAppTheme } from '../contexts/ThemeContext';
import TopNavBar from '../components/TopNavBar/TopNavBar';

export const HomeScreen = () => {
  const { theme, isDark } = useAppTheme();
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleSearchPress = () => {
    console.log('Search pressed');
    // Navigate to search screen
  };

  const handleInfoPress = () => {
    console.log('Info pressed');
    // Show info modal or navigate
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TopNavBar
        title="QuickCart"
        onSearchPress={handleSearchPress}
        onInfoPress={handleInfoPress}
        animated={true}
        scrollY={scrollY}
      />
      
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {/* Placeholder content for scrolling */}
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
            <Text style={[styles.cardSubtitle, { color: '#1010' }]}>
              Scroll to see navbar hide/show
            </Text>
          </View>
        ))}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    marginTop: 56, // Height of navbar + status bar
  },
  scrollContent: {
    padding: 16,
    paddingTop: 8,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
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
  },
});