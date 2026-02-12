import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../../contexts/ThemeContext';

interface ProductTagsProps {
  tags: string[];
}

const ProductTags: React.FC<ProductTagsProps> = ({ tags }) => {
  const { theme, isDark } = useAppTheme();
  const styles = createStyles(theme, isDark);

  if (!tags || tags.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Tags</Text>
      <View style={styles.wrapper}>
        {tags.map((tag, index) => (
          <View
            key={`tag-${index}`}
            style={[styles.chip, { backgroundColor: theme.colors.card }]}
          >
            <Text
              style={[
                styles.text,
                { color: theme.colors.textSecondary },
              ]}
            >
              #{tag}
            </Text>
          </View>
        ))}
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
      marginBottom: 12,
    },
    wrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    chip: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      marginRight: 8,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    text: {
      fontSize: 12,
      fontWeight: '500',
    },
  });

export default ProductTags;