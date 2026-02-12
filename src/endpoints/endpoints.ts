import { BASE_URL } from '@env';

export const ENV = {
  BASE_URL,
};

export const ENDPOINTS = {
  GET_PRODUCTS: (limit: number, skip: number) =>
    `/products?limit=${limit}&skip=${skip}`,
  GET_CATEGORIES: `/products/category-list`,
  GET_PRODUCTS_BY_CATEGORY: (category: string, limit: number, skip: number) =>
    `/products/category/${category}?limit=${limit}&skip=${skip}`,
};
