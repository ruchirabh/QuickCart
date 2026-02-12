import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppTheme } from '../../contexts/ThemeContext';

interface ProductSpecificationsProps {
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  minimumOrderQuantity: number;
}

const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({
  sku,
  weight,
  dimensions,
  minimumOrderQuantity,
}) => {
  const { theme, isDark } = useAppTheme();
  const styles = createStyles(theme, isDark);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Specifications
      </Text>

      <View style={styles.grid}>
        <View style={[styles.item, { backgroundColor: theme.colors.card }]}>
          <Icon name="pricetag" size={20} color={theme.colors.primary} />
          <Text style={[styles.label, { color: theme.colors.textSecondary }]}>SKU</Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>{sku}</Text>
        </View>

        <View style={[styles.item, { backgroundColor: theme.colors.card }]}>
          <Icon name="scale" size={20} color={theme.colors.primary} />
          <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Weight</Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>{weight}g</Text>
        </View>

        <View style={[styles.item, { backgroundColor: theme.colors.card }]}>
          <Icon name="cube" size={20} color={theme.colors.primary} />
          <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Dimensions</Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>
            {dimensions.width} x {dimensions.height} x {dimensions.depth} cm
          </Text>
        </View>

        <View style={[styles.item, { backgroundColor: theme.colors.card }]}>
          <Icon name="archive" size={20} color={theme.colors.primary} />
          <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Min Order</Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>{minimumOrderQuantity} units</Text>
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginBottom: 24,
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 16,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    item: {
      width: (Dimensions.get('window').width - 48) / 2,
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    label: {
      fontSize: 12,
      marginTop: 8,
      marginBottom: 4,
    },
    value: {
      fontSize: 14,
      fontWeight: '600',
    },
  });

export default ProductSpecifications;