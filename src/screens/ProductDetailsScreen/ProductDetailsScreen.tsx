import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppTheme } from '../../contexts/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { addToCart, removeFromCart } from '../../features/cartSlice';
import { use_GET_PRODUCT_DETAILS } from '../../hooks/endpoints/Product/use_GET_PRODUCT_DETAILS';
import { createStyles } from '../../styles/ProductDetailsScreen/ProductDetailsScreen.styles';

// Import components
import ProductImageGallery from '../../components/ProductDetails/ProductImageGallery';
import ProductHeader from '../../components/ProductDetails/ProductHeader';
import ProductDescription from '../../components/ProductDetails/ProductDescription';
import ProductSpecifications from '../../components/ProductDetails/ProductSpecifications';
import ProductTags from '../../components/ProductDetails/ProductTags';
import ProductInfoCards from '../../components/ProductDetails/ProductInfoCards';
import ProductReviews from '../../components/ProductDetails/ProductReviews';
import ProductBottomActions from '../../components/ProductDetails/ProductBottomActions';

const ProductDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { productId } = route.params as { productId: number };
  const { theme, isDark } = useAppTheme();
  const dispatch = useAppDispatch();
  const scrollViewRef = useRef<ScrollView>(null);

  const { product, loading } = use_GET_PRODUCT_DETAILS(productId);

  // Check if product is in cart
  const isInCart = useAppSelector(state =>
    state.cart.addedToCartIds.includes(productId),
  );

  const cartItem = useAppSelector(state =>
    state.cart.items.find(item => item.id === productId),
  );

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1,
        }),
      );
    }
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(productId));
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleCartPress = () => {
    navigation.navigate('Cart' as never);
  };

  const styles = createStyles(theme, isDark);

  if (loading || !product) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        {/* Loading skeleton - keep as is */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <ProductHeader
        brand={product.brand}
        category={product.category}
        title={product.title}
        rating={product.rating}
        reviewCount={product.reviews?.length || 0}
        onBackPress={handleBackPress}
        onCartPress={handleCartPress}
        cartItemCount={cartItem?.quantity}
      />

      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <ProductImageGallery
          images={product.images}
          thumbnail={product.thumbnail}
          discountPercentage={product.discountPercentage}
          stock={product.stock}
          availabilityStatus={product.availabilityStatus}
        />

        <View style={styles.productInfo}>
          <ProductDescription description={product.description} />

          <ProductSpecifications
            sku={product.sku}
            weight={product.weight}
            dimensions={product.dimensions}
            minimumOrderQuantity={product.minimumOrderQuantity}
          />

          <ProductTags tags={product.tags} />

          <ProductInfoCards
            shippingInformation={product.shippingInformation}
            warrantyInformation={product.warrantyInformation}
            returnPolicy={product.returnPolicy}
          />

          <ProductReviews reviews={product.reviews || []} />
        </View>
      </ScrollView>

      <ProductBottomActions
        price={product.price}
        isInCart={isInCart}
        stock={product.stock}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
      />
    </View>
  );
};

export default ProductDetailsScreen;
