import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../contexts/ThemeContext';

interface ProductDescriptionProps {
  description: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  description,
}) => {
  const { theme, isDark } = useAppTheme();
  const [showFull, setShowFull] = useState(false);
  const styles = createStyles(theme, isDark);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Description
      </Text>
      <Text style={[styles.text, { color: theme.colors.textSecondary }]}>
        {showFull ? description : description.slice(0, 150) + '...'}
      </Text>
      <TouchableOpacity onPress={() => setShowFull(!showFull)}>
        <Text style={[styles.readMore, { color: theme.colors.primary }]}>
          {showFull ? 'Read Less' : 'Read More'}
        </Text>
      </TouchableOpacity>
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
      marginBottom: 8,
    },
    text: {
      fontSize: 14,
      lineHeight: 22,
      marginBottom: 8,
    },
    readMore: {
      fontSize: 14,
      fontWeight: '600',
    },
  });

export default ProductDescription;