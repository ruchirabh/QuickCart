import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Platform,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useAppTheme } from '../contexts/ThemeContext';
import TopNavBar from '../components/TopNavBar/TopNavBar';
import ProductCard from '../components/HomeScreen/Card/ProductCard';
import { use_GET_PRODUCTS } from '../hooks/endpoints/use_GET_PRODUCTS';

export const HomeScreen = () => {
  const { theme } = useAppTheme();
  const scrollY = useRef(new Animated.Value(0)).current;

  const { products, loading, fetchProducts } = use_GET_PRODUCTS();

  const navbarHeight = Platform.OS === 'ios' ? 56 : 64;
  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;
  const totalNavbarHeight = navbarHeight + statusBarHeight;

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <TopNavBar title="QuickCart" animated scrollY={scrollY} />

      <Animated.FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{
          paddingTop: totalNavbarHeight + 1,
          paddingHorizontal: 0,
          paddingBottom: 16,
        }}
        renderItem={({ item }) => <ProductCard product={item} />}
        onEndReached={fetchProducts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" /> : null
        }
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
