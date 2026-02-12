import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../../../services/apiClient';

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: string[];
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export const use_GET_PRODUCT_DETAILS = (productId: number | null) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProductDetails = useCallback(async () => {
    if (!productId) return;

    try {
      setLoading(true);
      setError(null);

      console.log(`Fetching product details for ID: ${productId}`);

      const response = await apiClient.get(`/products/${productId}`);
      console.log('GET PRODUCT DETAILS API RESPONSE::', response);

      setProduct(response.data);
    } catch (error: any) {
      console.error('GET_PRODUCT_DETAILS_ERROR', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const refresh = useCallback(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  return {
    product,
    loading,
    error,
    refresh,
  };
};
