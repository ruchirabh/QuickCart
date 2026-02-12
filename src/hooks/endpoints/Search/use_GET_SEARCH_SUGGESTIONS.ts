import { useState, useCallback, useRef } from 'react';
import { apiClient } from '../../../services/apiClient';

export const use_GET_SEARCH_SUGGESTIONS = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const POPULAR_SEARCHES: string[] = [
    'phone',
    'laptop',
    'watch',
    'shirt',
    'shoes',
    'headphones',
    'camera',
    'furniture',
    'books',
    'groceries',
  ];

  const RECENT_SEARCHES_KEY = '@recent_searches';

  /* ------------------ Recent Searches ------------------ */

  const getRecentSearches = useCallback(async (): Promise<string[]> => {
    try {
      const { default: AsyncStorage } = await import(
        '@react-native-async-storage/async-storage'
      );

      const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);

      const parsed: string[] = stored ? JSON.parse(stored) : [];
      return parsed;
    } catch (error) {
      console.error('Error loading recent searches:', error);
      return [];
    }
  }, []);

  const addToRecentSearches = useCallback(async (query: string) => {
    try {
      if (!query.trim()) return;

      const { default: AsyncStorage } = await import(
        '@react-native-async-storage/async-storage'
      );

      const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
      const recents: string[] = stored ? JSON.parse(stored) : [];

      const filtered = recents.filter(
        (q: string) => q.toLowerCase() !== query.toLowerCase(),
      );

      const updated = [query, ...filtered].slice(0, 5);

      await AsyncStorage.setItem(
        RECENT_SEARCHES_KEY,
        JSON.stringify(updated),
      );

      return updated;
    } catch (error) {
      console.error('Error saving recent search:', error);
      return [];
    }
  }, []);

  const clearRecentSearches = useCallback(async () => {
    try {
      const { default: AsyncStorage } = await import(
        '@react-native-async-storage/async-storage'
      );

      await AsyncStorage.removeItem(RECENT_SEARCHES_KEY);
      setSuggestions([]);
    } catch (error) {
      console.error('Error clearing recent searches:', error);
    }
  }, []);

  /* ------------------ Suggestions Logic ------------------ */

  const getSuggestions = useCallback(async (query: string) => {
    if (!query.trim()) {
      const recents = await getRecentSearches();

      setSuggestions(
        recents.length > 0 ? recents : POPULAR_SEARCHES.slice(0, 5),
      );

      setLoading(false);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      setLoading(true);

      const filteredPopular = POPULAR_SEARCHES.filter((item: string) =>
        item.toLowerCase().includes(query.toLowerCase()),
      ).slice(0, 5);

      const recents = await getRecentSearches();

      const filteredRecents = recents.filter((item: string) =>
        item.toLowerCase().includes(query.toLowerCase()),
      );

      const combined = [...new Set<string>([
        ...filteredRecents,
        ...filteredPopular,
      ])];

      setSuggestions(combined);
    } catch (error: any) {
      if (error.name === 'AbortError') return;

      console.error('SUGGESTIONS_ERROR', error.message);
    } finally {
      setLoading(false);
    }
  }, [getRecentSearches]);

  return {
    suggestions,
    loading,
    getSuggestions,
    addToRecentSearches,
    clearRecentSearches,
    getRecentSearches,
  };
};
