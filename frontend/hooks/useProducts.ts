'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { productService } from '@/services/productService';
import { useFilterStore } from '@/store/filterStore';
import { useDebounce } from './useDebounce';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { searchQuery, selectedCategory, minPrice, maxPrice, inStockOnly } =
    useFilterStore();

  // Debounce search query by 500ms
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productService.getProducts({
          search: debouncedSearchQuery || undefined,
          category: selectedCategory || undefined,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
          inStock: inStockOnly || undefined,
        });
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedSearchQuery, selectedCategory, minPrice, maxPrice, inStockOnly]);

  return { products, loading, error };
}