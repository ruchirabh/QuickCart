import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { useAppTheme } from '../../contexts/ThemeContext';

const { width } = Dimensions.get('window');

interface ProductImageGalleryProps {
  images: string[];
  thumbnail: string;
  discountPercentage: number;
  stock: number;
  availabilityStatus: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  thumbnail,
  discountPercentage,
  stock,
  availabilityStatus,
}) => {
  const { theme, isDark } = useAppTheme();
  const [selectedImage, setSelectedImage] = useState(0);

  const styles = createStyles(theme, isDark);

  const galleryImages = images && images.length > 0 ? images : [thumbnail];

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={galleryImages}
        keyExtractor={(item, index) => `image-${index}`}
        onMomentumScrollEnd={event => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setSelectedImage(index);
        }}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.mainImage} />
        )}
      />

      {/* Image Indicators */}
      {galleryImages.length > 1 && (
        <View style={styles.imageIndicators}>
          {galleryImages.map((_, index) => (
            <View
              key={`indicator-${index}`}
              style={[
                styles.indicator,
                {
                  backgroundColor:
                    selectedImage === index
                      ? theme.colors.primary
                      : theme.colors.border,
                  width: selectedImage === index ? 24 : 8,
                },
              ]}
            />
          ))}
        </View>
      )}

      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>
            {Math.round(discountPercentage)}% OFF
          </Text>
        </View>
      )}

      {/* Stock Status */}
      <View
        style={[
          styles.stockBadge,
          {
            backgroundColor:
              stock > 0
                ? stock < 10
                  ? '#FFB80020'
                  : '#34C75920'
                : '#FF3B3020',
          },
        ]}
      >
        <Text
          style={[
            styles.stockText,
            {
              color:
                stock > 0 ? (stock < 10 ? '#FFB800' : '#34C759') : '#FF3B30',
            },
          ]}
        >
          {availabilityStatus}
        </Text>
      </View>
    </View>
  );
};

const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      position: 'relative',
    },
    mainImage: {
      width: width,
      height: width,
      resizeMode: 'cover',
    },
    imageIndicators: {
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    indicator: {
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4,
    },
    discountBadge: {
      position: 'absolute',
      top: 20,
      left: 20,
      backgroundColor: '#FF3B30',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },
    discountText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '700',
    },
    stockBadge: {
      position: 'absolute',
      top: 20,
      right: 20,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },
    stockText: {
      fontSize: 12,
      fontWeight: '600',
    },
  });

export default ProductImageGallery;
