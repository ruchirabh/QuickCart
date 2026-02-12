import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppTheme } from '../../../contexts/ThemeContext';

interface Props {
  rating: number;
}

const RatingStars: React.FC<Props> = ({ rating }) => {
  const { theme } = useAppTheme();

  const fullStars = Math.floor(rating);

  return (
    <View style={{ flexDirection: 'row' }}>
      {[...Array(5)].map((_, index) => (
        <Icon
          key={index}
          name={index < fullStars ? 'star' : 'star-outline'}
          size={16}
          color="#FBBF24"
        />
      ))}
    </View>
  );
};

export default RatingStars;
