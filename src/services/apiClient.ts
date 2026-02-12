import axios from 'axios';
import { BASE_URL } from '@env';

console.log('API Base URL:', BASE_URL); // Add this to verify the env variable

export const apiClient = axios.create({
  baseURL: BASE_URL || 'https://dummyjson.com', // Add fallback
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});