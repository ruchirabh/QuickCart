import { useState, useEffect, useCallback, useRef } from 'react';
import { apiClient } from '../../services/apiClient';
import { ENDPOINTS } from '../../endpoints/endpoints';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  thumbnail: string;
  discountPercentage?: number;
}

export const use_GET_PRODUCTS = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const LIMIT = 10;
  const fetchedIds = useRef(new Set<number>());

  const fetchProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      setError(null);

      const skip = page * LIMIT;
      const url = ENDPOINTS.GET_PRODUCTS(LIMIT, skip);

      console.log(`Fetching page ${page}, skip: ${skip}`);

      const response = await apiClient.get(url);
      const newProducts = response.data.products || [];

      // Filter out duplicates using the Set
      const uniqueNewProducts = newProducts.filter((product: Product) => {
        if (fetchedIds.current.has(product.id)) {
          console.log(`Skipping duplicate product ID: ${product.id}`);
          return false;
        }
        fetchedIds.current.add(product.id);
        return true;
      });

      if (uniqueNewProducts.length > 0) {
        setProducts(prev => [...prev, ...uniqueNewProducts]);
      }

      // Check if we've reached the end
      if (newProducts.length < LIMIT) {
        setHasMore(false);
      }

      setPage(prev => prev + 1);
    } catch (error: any) {
      console.error('GET_PRODUCTS_ERROR', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  // Refresh function - clear all data and fetch from beginning
  const refresh = useCallback(async () => {
    setProducts([]);
    setPage(0);
    setHasMore(true);
    fetchedIds.current.clear();
    setError(null);

    // Fetch first page
    try {
      setLoading(true);
      const url = ENDPOINTS.GET_PRODUCTS(LIMIT, 0);
      const response = await apiClient.get(url);
      const newProducts = response.data.products || [];

      newProducts.forEach((product: Product) => {
        fetchedIds.current.add(product.id);
      });

      setProducts(newProducts);

      if (newProducts.length < LIMIT) {
        setHasMore(false);
      }

      setPage(1);
    } catch (error: any) {
      console.error('REFRESH_ERROR', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    hasMore,
    refresh,
  };
};
