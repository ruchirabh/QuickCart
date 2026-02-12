import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../../services/apiClient';
import { ENDPOINTS } from '../../endpoints/endpoints';

export const use_GET_CATEGORIES = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.get(ENDPOINTS.GET_CATEGORIES);
      const data = response.data;
      
      // Add "All" category at the beginning
      setCategories(['all', ...data]);
    } catch (error: any) {
      console.error('GET_CATEGORIES_ERROR', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
  };
};