import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Platform,
  StatusBar,
  Dimensions,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../contexts/ThemeContext';
import ProductCard from '../../components/HomeScreen/Card/ProductCard';
import { use_GET_SEARCH_PRODUCTS } from '../../hooks/endpoints/Search/use_GET_SEARCH_PRODUCTS';
import { use_GET_SEARCH_SUGGESTIONS } from '../../hooks/endpoints/Search/use_GET_SEARCH_SUGGESTIONS';
import { ProductCardShimmer } from '../../components/Loading/ShimmerSkeleton';

const { width } = Dimensions.get('window');

const SearchScreen = () => {
  const navigation = useNavigation();
  const { theme, isDark } = useAppTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const inputRef = useRef<TextInput>(null);

  const {
    searchResults,
    loading,
    totalResults,
    hasMore,
    searchProducts,
    loadMore,
    clearSearch,
  } = use_GET_SEARCH_PRODUCTS();

  const {
    suggestions,
    loading: suggestionsLoading,
    getSuggestions,
    addToRecentSearches,
    clearRecentSearches,
  } = use_GET_SEARCH_SUGGESTIONS();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim()) {
        getSuggestions(searchQuery);
      } else {
        getSuggestions('');
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, getSuggestions]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    Keyboard.dismiss();
    setShowSuggestions(false);
    await searchProducts(searchQuery);
    await addToRecentSearches(searchQuery);
  };

  const handleSuggestionPress = async (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    await searchProducts(suggestion);
    await addToRecentSearches(suggestion);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    clearSearch();
    setShowSuggestions(true);
    getSuggestions('');
    inputRef.current?.focus();
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const keyExtractor = useCallback(
    (item: any, index: number) => `search-${item.id}-${index}`,
    []
  );

  const renderSuggestionItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handleSuggestionPress(item)}
      activeOpacity={0.7}
    >
      <Icon 
        name="search-outline" 
        size={20} 
        color={theme.colors.textSecondary} 
      />
      <Text style={[styles.suggestionText, { color: theme.colors.text }]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderRecentHeader = () => (
    <View style={styles.suggestionsHeader}>
      <View style={styles.suggestionsTitleContainer}>
        <Icon name="time-outline" size={18} color={theme.colors.textSecondary} />
        <Text style={[styles.suggestionsTitle, { color: theme.colors.textSecondary }]}>
          Recent Searches
        </Text>
      </View>
      <TouchableOpacity onPress={clearRecentSearches}>
        <Text style={[styles.clearText, { color: theme.colors.primary }]}>
          Clear All
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderPopularHeader = () => (
    <View style={styles.suggestionsHeader}>
      <View style={styles.suggestionsTitleContainer}>
        <Icon name="trending-up" size={18} color={theme.colors.textSecondary} />
        <Text style={[styles.suggestionsTitle, { color: theme.colors.textSecondary }]}>
          Popular Searches
        </Text>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={[styles.iconCircle, { backgroundColor: theme.colors.border + '40' }]}>
        <Icon name="search" size={48} color={theme.colors.textSecondary} />
      </View>
      <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
        {searchQuery.trim() ? 'No results found' : 'Search products'}
      </Text>
      <Text style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}>
        {searchQuery.trim() 
          ? `No products match "${searchQuery}"`
          : 'Find your favorite products'}
      </Text>
    </View>
  );

  const renderFooter = () => {
    if (loading && searchResults.length > 0) {
      return (
        <View style={styles.footerContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      );
    }
    if (!hasMore && searchResults.length > 0) {
      return (
        <View style={styles.endContainer}>
          <View style={[styles.endLine, { backgroundColor: theme.colors.border }]} />
          <Text style={[styles.endText, { color: theme.colors.textSecondary }]}>
            No more results
          </Text>
        </View>
      );
    }
    return null;
  };

  const renderResults = () => (
    <FlatList
      data={searchResults}
      keyExtractor={keyExtractor}
      numColumns={2}
      contentContainerStyle={styles.resultsContent}
      columnWrapperStyle={styles.columnWrapper}
      renderItem={({ item }) => <ProductCard product={item} />}
      onEndReached={hasMore ? loadMore : null}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={!loading ? renderEmptyState : null}
      showsVerticalScrollIndicator={false}
    />
  );

  const renderSuggestions = () => (
    <FlatList
      data={suggestions}
      keyExtractor={(item, index) => `suggestion-${item}-${index}`}
      contentContainerStyle={styles.suggestionsContent}
      ListHeaderComponent={
        suggestions.length > 0 ? (
          searchQuery.trim() ? (
            renderPopularHeader()
          ) : (
            renderRecentHeader()
          )
        ) : null
      }
      renderItem={renderSuggestionItem}
      ListFooterComponent={
        suggestionsLoading ? (
          <View style={styles.suggestionsLoading}>
            <ActivityIndicator size="small" color={theme.colors.primary} />
          </View>
        ) : null
      }
    />
  );

  const styles = createStyles(theme, isDark);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color={theme.colors.textSecondary} />
          <TextInput
            ref={inputRef}
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search products..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            autoFocus
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch}>
              <Icon name="close-circle" size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Content */}
      {loading && searchResults.length === 0 ? (
        // Loading skeleton
        <View style={styles.loadingContainer}>
          <View style={styles.row}>
            {[...Array(6)].map((_, index) => (
              <View key={`search-shimmer-${index}`} style={styles.cardWrapper}>
                <ProductCardShimmer />
              </View>
            ))}
          </View>
        </View>
      ) : (
        <>
          {/* Search Results */}
          {!showSuggestions && searchResults.length > 0 && renderResults()}
          
          {/* Suggestions */}
          {showSuggestions && renderSuggestions()}
          
          {/* Empty State */}
          {!showSuggestions && searchResults.length === 0 && !loading && renderEmptyState()}
        </>
      )}
    </View>
  );
};

const createStyles = (theme: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    /* Header */
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: Platform.OS === 'android' 
        ? (StatusBar.currentHeight || 0) + 8 
        : 12,
      paddingBottom: 12,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },

    backButton: {
      padding: 8,
      marginRight: 8,
    },

    searchContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#2A2A2A' : '#F5F5F5',
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: Platform.OS === 'ios' ? 12 : 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    searchInput: {
      flex: 1,
      marginLeft: 8,
      marginRight: 8,
      fontSize: 16,
      padding: 0,
    },

    /* Loading */
    loadingContainer: {
      flex: 1,
      paddingTop: 16,
      paddingHorizontal: 8,
    },

    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },

    cardWrapper: {
      width: (width - 32) / 2,
      marginBottom: 16,
    },

    /* Suggestions */
    suggestionsContent: {
      paddingTop: 16,
      paddingBottom: 16,
    },

    suggestionsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 12,
    },

    suggestionsTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    suggestionsTitle: {
      fontSize: 14,
      fontWeight: '600',
      marginLeft: 8,
    },

    clearText: {
      fontSize: 14,
      fontWeight: '600',
    },

    suggestionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border + '40',
    },

    suggestionText: {
      fontSize: 16,
      marginLeft: 12,
      flex: 1,
    },

    suggestionsLoading: {
      paddingVertical: 20,
      alignItems: 'center',
    },

    /* Results */
    resultsContent: {
      paddingHorizontal: 8,
      paddingBottom: 16,
    },

    columnWrapper: {
      justifyContent: 'space-between',
    },

    footerContainer: {
      paddingVertical: 20,
      alignItems: 'center',
    },

    endContainer: {
      paddingVertical: 30,
      alignItems: 'center',
    },

    endLine: {
      width: 100,
      height: 2,
      borderRadius: 1,
      marginBottom: 8,
    },

    endText: {
      fontSize: 14,
    },

    /* Empty State */
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
      marginTop: -40,
    },

    iconCircle: {
      width: 100,
      height: 100,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },

    emptyTitle: {
      fontSize: 20,
      fontWeight: '700',
      marginBottom: 8,
      textAlign: 'center',
    },

    emptySubtitle: {
      fontSize: 14,
      textAlign: 'center',
      lineHeight: 20,
    },
  });

export default SearchScreen;