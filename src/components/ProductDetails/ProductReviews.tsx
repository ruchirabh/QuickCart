import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppTheme } from '../../contexts/ThemeContext';
import RatingStars from '../HomeScreen/Card/RatingStars';

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface ProductReviewsProps {
  reviews: Review[];
  onViewAll?: () => void;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({
  reviews,
  onViewAll,
}) => {
  const { theme, isDark } = useAppTheme();
  const styles = createStyles(theme, isDark);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!reviews || reviews.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Customer Reviews
        </Text>
        {onViewAll && (
          <TouchableOpacity onPress={onViewAll}>
            <Text style={[styles.viewAll, { color: theme.colors.primary }]}>
              View All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {reviews.slice(0, 3).map((review, index) => (
        <View
          key={`review-${index}`}
          style={[styles.reviewItem, { borderBottomColor: theme.colors.border }]}
        >
          <View style={styles.reviewHeader}>
            <View style={styles.reviewerInfo}>
              <View
                style={[
                  styles.reviewerAvatar,
                  { backgroundColor: theme.colors.primary + '20' },
                ]}
              >
                <Text
                  style={[
                    styles.reviewerInitial,
                    { color: theme.colors.primary },
                  ]}
                >
                  {review.reviewerName.charAt(0)}
                </Text>
              </View>
              <View>
                <Text style={[styles.reviewerName, { color: theme.colors.text }]}>
                  {review.reviewerName}
                </Text>
                <Text
                  style={[
                    styles.reviewDate,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {formatDate(review.date)}
                </Text>
              </View>
            </View>
            <RatingStars rating={review.rating} />
          </View>
          <Text
            style={[
              styles.reviewComment,
              { color: theme.colors.textSecondary },
            ]}
          >
            {review.comment}
          </Text>
        </View>
      ))}
    </View>
  );
};

const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginBottom: 24,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
    },
    viewAll: {
      fontSize: 14,
      fontWeight: '600',
    },
    reviewItem: {
      paddingVertical: 16,
      borderBottomWidth: 1,
    },
    reviewHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    reviewerInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    reviewerAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    reviewerInitial: {
      fontSize: 18,
      fontWeight: '600',
    },
    reviewerName: {
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 2,
    },
    reviewDate: {
      fontSize: 12,
    },
    reviewComment: {
      fontSize: 14,
      lineHeight: 20,
      marginLeft: 52,
    },
  });

export default ProductReviews;