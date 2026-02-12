import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAppTheme } from '../../contexts/ThemeContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 20;

interface ShimmerProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

export const Shimmer: React.FC<ShimmerProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
}) => {
  const { isDark } = useAppTheme();
  const translateX = useRef(new Animated.Value(-1)).current;
  const numericWidth = typeof width === 'number' ? width : CARD_WIDTH;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const backgroundColor = isDark ? '#2A2A2A' : '#E1E9EE';
  const shimmerColor = isDark ? '#3A3A3A' : '#F2F8FC';

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [
              {
                translateX: translateX.interpolate({
                  inputRange: [-1, 1],
                  outputRange: [-numericWidth, numericWidth],
                }),
              },
            ],
          },
        ]}
      >
        <LinearGradient
          colors={['transparent', shimmerColor, shimmerColor, 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1, width: '100%' }}
        />
      </Animated.View>
    </View>
  );
};

export const ProductCardShimmer = () => {
  const { isDark } = useAppTheme();

  return (
    <View
      style={[
        styles.shimmerCard,
        { backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF' },
      ]}
    >
      <Shimmer height={180} borderRadius={16} style={styles.shimmerImage} />

      <View style={styles.shimmerContent}>
        <Shimmer
          width="80%"
          height={16}
          borderRadius={4}
          style={styles.shimmerTitle}
        />
        <Shimmer
          width="60%"
          height={14}
          borderRadius={4}
          style={styles.shimmerText}
        />

        <View style={styles.shimmerRating}>
          <Shimmer width={60} height={12} borderRadius={4} />
          <Shimmer
            width={30}
            height={12}
            borderRadius={4}
            style={{ marginLeft: 8 }}
          />
        </View>

        <View style={styles.shimmerBottom}>
          <Shimmer width={50} height={20} borderRadius={4} />
          <View style={styles.shimmerButtons}>
            <Shimmer width={70} height={32} borderRadius={8} />
            <Shimmer
              width={70}
              height={32}
              borderRadius={8}
              style={{ marginLeft: 8 }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shimmerCard: {
    width: CARD_WIDTH,
    borderRadius: 16,
    marginBottom: 16,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  shimmerImage: {
    width: '100%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  shimmerContent: {
    padding: 12,
  },
  shimmerTitle: {
    marginBottom: 8,
  },
  shimmerText: {
    marginBottom: 12,
  },
  shimmerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  shimmerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shimmerButtons: {
    flexDirection: 'row',
  },
});
