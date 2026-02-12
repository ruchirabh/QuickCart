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

export const use_GET_PRODUCTS_BY_CATEGORY = (category: string | null) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);

  const LIMIT = 10;
  const fetchedIds = useRef(new Set<number>());

  const fetchProducts = useCallback(async () => {
    if (loading || !hasMore) return;
    if (!category || category === 'all') return;

    try {
      setLoading(true);
      setError(null);

      const skip = page * LIMIT;
      const url = ENDPOINTS.GET_PRODUCTS_BY_CATEGORY(category, LIMIT, skip);

      console.log(`Fetching category ${category}, page ${page}, skip: ${skip}`);
      
      const response = await apiClient.get(url);
      const newProducts = response.data.products || [];
      setTotalProducts(response.data.total || 0);

      // Filter out duplicates
      const uniqueNewProducts = newProducts.filter((product: Product) => {
        if (fetchedIds.current.has(product.id)) {
          return false;
        }
        fetchedIds.current.add(product.id);
        return true;
      });

      if (uniqueNewProducts.length > 0) {
        setProducts(prev => [...prev, ...uniqueNewProducts]);
      }

      if (newProducts.length < LIMIT) {
        setHasMore(false);
      }

      setPage(prev => prev + 1);
    } catch (error: any) {
      console.error('GET_PRODUCTS_BY_CATEGORY_ERROR', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [category, page, loading, hasMore]);

  const resetCategory = useCallback(() => {
    setProducts([]);
    setPage(0);
    setHasMore(true);
    fetchedIds.current.clear();
    setError(null);
  }, []);

  useEffect(() => {
    resetCategory();
    if (category && category !== 'all') {
      fetchProducts();
    }
  }, [category]);

  return {
    products,
    loading,
    error,
    hasMore,
    totalProducts,
    fetchProducts,
    resetCategory,
  };
};