import React, { useRef, useCallback, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Platform,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../contexts/ThemeContext';
import { useAppSelector } from '../hooks/reduxHooks';
import TopNavBar from '../components/TopNavBar/TopNavBar';
import ProductCard from '../components/HomeScreen/Card/ProductCard';
import CategoriesHorizontal from '../components/HomeScreen/Categories/CategoriesHorizontal';
import { ProductCardShimmer } from '../components/Loading/ShimmerSkeleton';
import { use_GET_PRODUCTS } from '../hooks/endpoints/use_GET_PRODUCTS';
import { use_GET_CATEGORIES } from '../hooks/endpoints/use_GET_CATEGORIES';
import { use_GET_PRODUCTS_BY_CATEGORY } from '../hooks/endpoints/use_GET_PRODUCTS_BY_CATEGORY';

const { width } = Dimensions.get('window');

export const HomeScreen = () => {
  const { theme } = useAppTheme();
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);

  // Fetch all products
  const { 
    products: allProducts, 
    loading: allProductsLoading, 
    fetchProducts: fetchAllProducts, 
    hasMore: hasMoreAll, 
    refresh: refreshAll 
  } = use_GET_PRODUCTS();

  // Fetch categories
  const { 
    categories, 
    loading: categoriesLoading 
  } = use_GET_CATEGORIES();

  // Fetch products by category
  const {
    products: categoryProducts,
    loading: categoryProductsLoading,
    hasMore: hasMoreCategory,
    fetchProducts: fetchMoreCategoryProducts,
    resetCategory,
  } = use_GET_PRODUCTS_BY_CATEGORY(selectedCategory);

  // Determine which products to display
  const displayProducts = selectedCategory 
    ? categoryProducts 
    : allProducts;
  
  const isLoading = selectedCategory
    ? categoryProductsLoading
    : allProductsLoading;
  
  const hasMore = selectedCategory
    ? hasMoreCategory
    : hasMoreAll;

  const fetchMore = selectedCategory
    ? fetchMoreCategoryProducts
    : fetchAllProducts;

  // Get cart item count from Redux
  const cartItemCount = useAppSelector(state => 
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const navbarHeight = Platform.OS === 'ios' ? 56 : 64;
  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;
  const totalNavbarHeight = navbarHeight + statusBarHeight;

  const keyExtractor = useCallback(
    (item: any, index: number) => `${item.id}-${index}-${selectedCategory || 'all'}`,
    [selectedCategory]
  );

  const handleHomePress = async () => {
    // Scroll to top
    scrollY.setValue(0);
    // Clear category filter
    setSelectedCategory(null);
    // Show shimmer skeleton
    setIsRefreshing(true);
    // Refetch products
    await refreshAll();
    // Hide shimmer skeleton
    setIsRefreshing(false);
  };

  const handleCartPress = () => {
    navigation.navigate('Cart' as never);
  };

  const handleSearchPress = () => {
    navigation.navigate('Search' as never);
  };

  const handleInfoPress = () => {
    navigation.navigate('Info' as never)
  };

  const handleSelectCategory = async (category: string | null) => {
    // Show shimmer immediately on category click
    setIsCategoryLoading(true);
    
    // Scroll to top
    scrollY.setValue(0);
    
    // Set selected category
    setSelectedCategory(category);
    
    // Simulate minimum loading time for better UX
    setTimeout(() => {
      setIsCategoryLoading(false);
    }, 800);
  };

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <ProductCard
        product={item}
      />
    ),
    []
  );

  const renderFooter = () => {
    if (isRefreshing || isCategoryLoading) return null;
    
    if (isLoading && !isInitialLoading && !isRefreshing && !isCategoryLoading) {
      return (
        <View style={styles.footerContainer}>
          <ActivityIndicator
            size="large"
            color={theme.colors.primary}
            style={styles.footer}
          />
        </View>
      );
    }
    if (!hasMore && displayProducts.length > 0) {
      return (
        <View style={styles.endContainer}>
          <View style={[styles.endLine, { backgroundColor: theme.colors.border }]} />
          <Text style={[styles.endText, { color: theme.colors.textSecondary }]}>
            You've reached the end
          </Text>
        </View>
      );
    }
    return null;
  };

  const renderHeader = () => (
    <CategoriesHorizontal
      categories={categories.filter(cat => cat !== 'all')}
      selectedCategory={selectedCategory}
      onSelectCategory={handleSelectCategory}
      loading={categoriesLoading}
      categoryLoading={isCategoryLoading}
    />
  );

  // Show skeleton loader during initial load
  if (isInitialLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <TopNavBar 
          title="QuickCart" 
          animated={false}
          cartItemCount={cartItemCount}
          onHomePress={handleHomePress}
          onCartPress={handleCartPress}
          onSearchPress={handleSearchPress}
          onInfoPress={handleInfoPress}
        />
        <View style={{ paddingTop: totalNavbarHeight + 16, paddingHorizontal: 8 }}>
          {/* Categories skeleton */}
          <View style={styles.categoriesSkeleton}>
            {[...Array(8)].map((_, index) => (
              <View
                key={`cat-skel-${index}`}
                style={[styles.categorySkeleton, { backgroundColor: theme.colors.border }]}
              />
            ))}
          </View>
          {/* Products skeleton */}
          <View style={styles.row}>
            {[...Array(6)].map((_, index) => (
              <View key={`initial-shimmer-${index}`} style={styles.cardWrapper}>
                <ProductCardShimmer />
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <TopNavBar 
        title="QuickCart" 
        animated 
        scrollY={scrollY}
        cartItemCount={cartItemCount}
        onHomePress={handleHomePress}
        onCartPress={handleCartPress}
        onSearchPress={handleSearchPress}
        onInfoPress={handleInfoPress}
      />

      {isRefreshing || (isCategoryLoading && !displayProducts.length) ? (
        // Show full screen of shimmers during refresh or category loading
        <View style={[styles.refreshContainer, { paddingTop: totalNavbarHeight + 16 }]}>
          {/* Categories skeleton */}
          <View style={styles.categoriesSkeleton}>
            {[...Array(8)].map((_, index) => (
              <View
                key={`cat-loading-skel-${index}`}
                style={[styles.categorySkeleton, { backgroundColor: theme.colors.border }]}
              />
            ))}
          </View>
          {/* Products skeleton */}
          <View style={styles.row}>
            {[...Array(6)].map((_, index) => (
              <View key={`refresh-shimmer-${index}`} style={styles.cardWrapper}>
                <ProductCardShimmer />
              </View>
            ))}
          </View>
        </View>
      ) : (
        // Show actual products with categories
        <Animated.FlatList
          data={displayProducts}
          keyExtractor={keyExtractor}
          numColumns={2}
          contentContainerStyle={{
            paddingTop: totalNavbarHeight + 16,
            paddingHorizontal: 8,
            paddingBottom: 16,
          }}
          columnWrapperStyle={styles.columnWrapper}
          ListHeaderComponent={renderHeader}
          renderItem={renderItem}
          onEndReached={hasMore ? fetchMore : null}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: (width - 32) / 2,
    marginBottom: 16,
  },
  footerContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footer: {
    marginVertical: 20,
  },
  endContainer: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  endLine: {
    width: 100,
    height: 2,
    borderRadius: 1,
    marginBottom: 8,
  },
  endText: {
    fontSize: 14,
  },
  refreshContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  categoriesSkeleton: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  categorySkeleton: {
    width: 80,
    height: 36,
    borderRadius: 20,
    marginRight: 8,
    opacity: 0.3,
  },
});