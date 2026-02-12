import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useAppTheme } from '../../../contexts/ThemeContext';

interface CategoryChipProps {
  category: string;
  isSelected: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

const CategoryChip: React.FC<CategoryChipProps> = ({
  category,
  isSelected,
  onPress,
  style,
}) => {
  const { theme } = useAppTheme();

  // Format category name
  const formatCategoryName = (cat: string) => {
    if (cat === 'all') return 'All';
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isSelected ? theme.colors.primary : 'transparent',
          borderColor: isSelected ? theme.colors.primary : theme.colors.border,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.text,
          {
            color: isSelected ? '#FFFFFF' : theme.colors.textSecondary,
          },
        ]}
      >
        {formatCategoryName(category)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default CategoryChip;