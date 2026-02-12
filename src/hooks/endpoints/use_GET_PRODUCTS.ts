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
}

export const use_GET_PRODUCTS = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0); // Add page state back

  const LIMIT = 10;

  const fetchProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      const skip = page * LIMIT; // Use page instead of products.length
      const url = ENDPOINTS.GET_PRODUCTS(LIMIT, skip);

      const response = await apiClient.get(url);
      const newProducts = response.data.products || [];

      // Deduplicate products based on ID
      setProducts(prev => {
        const existingIds = new Set(prev.map(p => p.id));
        const uniqueNewProducts = newProducts.filter(
          (p: Product) => !existingIds.has(p.id)
        );
        return [...prev, ...uniqueNewProducts];
      });

      if (newProducts.length < LIMIT) {
        setHasMore(false);
      }

      setPage(prev => prev + 1); // Increment page
    } catch (error: any) {
      console.error('GET_PRODUCTS_ERROR', error.message);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]); // Depend on page instead of products.length

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, fetchProducts, hasMore };
};