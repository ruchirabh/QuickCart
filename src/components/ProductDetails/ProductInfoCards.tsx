import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppTheme } from '../../contexts/ThemeContext';

interface ProductInfoCardsProps {
  shippingInformation: string;
  warrantyInformation: string;
  returnPolicy: string;
}

const ProductInfoCards: React.FC<ProductInfoCardsProps> = ({
  shippingInformation,
  warrantyInformation,
  returnPolicy,
}) => {
  const { theme, isDark } = useAppTheme();
  const styles = createStyles(theme, isDark);

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Icon name="car" size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Shipping
        </Text>
        <Text style={[styles.text, { color: theme.colors.textSecondary }]}>
          {shippingInformation}
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Icon name="shield-checkmark" size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Warranty
        </Text>
        <Text style={[styles.text, { color: theme.colors.textSecondary }]}>
          {warrantyInformation}
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Icon name="return-down-back" size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Returns
        </Text>
        <Text style={[styles.text, { color: theme.colors.textSecondary }]}>
          {returnPolicy}
        </Text>
      </View>
    </View>
  );
};

const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginBottom: 24,
    },
    card: {
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      marginTop: 8,
      marginBottom: 4,
    },
    text: {
      fontSize: 14,
    },
  });

export default ProductInfoCards;
