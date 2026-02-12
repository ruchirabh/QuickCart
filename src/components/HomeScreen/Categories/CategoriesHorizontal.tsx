import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import { useAppTheme } from '../../../contexts/ThemeContext';
import CategoryChip from './CategoryChip';

interface CategoriesHorizontalProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  loading?: boolean;
  categoryLoading?: boolean; // New prop for category click loading
}

const CategoriesHorizontal: React.FC<CategoriesHorizontalProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  loading = false,
  categoryLoading = false,
}) => {
  const { theme } = useAppTheme();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [showSkeleton, setShowSkeleton] = useState(false);

  // Handle category click loading state
  useEffect(() => {
    if (categoryLoading) {
      setShowSkeleton(true);
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 800); // Show skeleton for at least 800ms
      return () => clearTimeout(timer);
    } else {
      setShowSkeleton(false);
    }
  }, [categoryLoading]);

  const handleCategoryPress = (category: string) => {
    // If clicking the same category, deselect it (show all)
    if (selectedCategory === category) {
      onSelectCategory(null);
    } else {
      onSelectCategory(category);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {loading || showSkeleton ? (
          // Skeleton loaders for categories
          [...Array(8)].map((_, index) => (
            <View
              key={`category-skeleton-${index}`}
              style={[
                styles.skeletonChip,
                { backgroundColor: theme.colors.border },
              ]}
            />
          ))
        ) : (
          <>
            {/* "All" category chip */}
            <CategoryChip
              category="all"
              isSelected={selectedCategory === null}
              onPress={() => onSelectCategory(null)}
            />
            
            {/* Other categories */}
            {categories.map((category) => (
              <CategoryChip
                key={category}
                category={category}
                isSelected={selectedCategory === category}
                onPress={() => handleCategoryPress(category)}
              />
            ))}
          </>
        )}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  skeletonChip: {
    width: 80,
    height: 36,
    borderRadius: 20,
    marginRight: 8,
    opacity: 0.3,
  },
});

export default CategoriesHorizontal;