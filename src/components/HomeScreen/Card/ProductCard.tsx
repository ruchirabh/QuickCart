import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useAppTheme } from '../../../contexts/ThemeContext';
import RatingStars from './RatingStars';

interface Props {
  product: any;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { theme, isDark } = useAppTheme();

  const styles = createStyles(theme, isDark);

  return (
    <View style={styles.card}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>

        <Text style={styles.description}>
          {product.description.length > 60
            ? product.description.substring(0, 60) + '...'
            : product.description}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>${product.price}</Text>
          <RatingStars rating={product.rating} />
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.card,
      marginHorizontal: 5,
      marginTop: 10,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    image: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
    },
    content: {
      padding: 14,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 6,
    },
    description: {
      fontSize: 13,
      color: theme.colors.textSecondary,
      marginBottom: 8,
    },
    bottomRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    price: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.primary,
    },
  });

export default ProductCard;
