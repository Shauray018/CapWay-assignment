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

  const { searchQuery, selectedCategory, minPrice, maxPrice, inStockOnly, sortBy } =
    useFilterStore();

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

        // Apply sorting on the client side
        let sortedData = [...data];
        if (sortBy) {
          sortedData.sort((a, b) => {
            switch (sortBy) {
              case 'price-asc':
                return a.salePrice - b.salePrice;
              case 'price-desc':
                return b.salePrice - a.salePrice;
              case 'name-asc':
                return a.name.localeCompare(b.name);
              case 'name-desc':
                return b.name.localeCompare(a.name);
              default:
                return 0;
            }
          });
        }

        setProducts(sortedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedSearchQuery, selectedCategory, minPrice, maxPrice, inStockOnly, sortBy]);

  return { products, loading, error };
}