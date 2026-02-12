import { useState, useEffect, useCallback, useRef } from 'react';
import { apiClient } from '../../../services/apiClient';
import { ENDPOINTS } from '../../../endpoints/endpoints';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  thumbnail: string;
  discountPercentage?: number;
}

interface SearchResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const use_GET_SEARCH_PRODUCTS = () => {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [currentQuery, setCurrentQuery] = useState('');

  const LIMIT = 10;
  const abortControllerRef = useRef<AbortController | null>(null);

  const searchProducts = useCallback(
    async (query: string, loadMore: boolean = false) => {
      if (!query.trim()) {
        setSearchResults([]);
        setCurrentQuery('');
        setTotalResults(0);
        setHasMore(true);
        setPage(0);
        return;
      }

      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      try {
        setLoading(true);
        setError(null);

        const skip = loadMore ? page * LIMIT : 0;

        console.log(`Searching for: ${query}, skip: ${skip}`);

        const response = await apiClient.get<SearchResponse>(
          `/products/search?q=${encodeURIComponent(
            query,
          )}&limit=${LIMIT}&skip=${skip}`,
          { signal: abortControllerRef.current.signal },
        );

        const newResults = response.data.products || [];

        if (!loadMore) {
          setSearchResults(newResults);
          setCurrentQuery(query);
          setPage(1);
        } else {
          // Filter out duplicates
          setSearchResults(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const uniqueNewResults = newResults.filter(
              (p: Product) => !existingIds.has(p.id),
            );
            return [...prev, ...uniqueNewResults];
          });
          setPage(prev => prev + 1);
        }

        setTotalResults(response.data.total || 0);

        if (newResults.length < LIMIT) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } catch (error: any) {
        if (error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
          console.log('Search request cancelled');
          return;
        }
        console.error('SEARCH_ERROR', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [page],
  );

  const loadMore = useCallback(() => {
    if (currentQuery && !loading && hasMore) {
      searchProducts(currentQuery, true);
    }
  }, [currentQuery, loading, hasMore, searchProducts]);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setCurrentQuery('');
    setTotalResults(0);
    setHasMore(true);
    setPage(0);
    setError(null);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    searchResults,
    loading,
    error,
    totalResults,
    hasMore,
    currentQuery,
    searchProducts,
    loadMore,
    clearSearch,
  };
};
