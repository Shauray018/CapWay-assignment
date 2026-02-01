'use client';

import ProductCard from '@/components/products/ProductCard';
import CategoryFilter from '@/components/filters/CategoryFilter';
import SortFilter from '@/components/filters/SortFilter';
import { useProducts } from '@/hooks/useProducts';
import { ProductCardSkeleton } from '@/components/products/ProductCardSkeleton';

export default function Home() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="mx-14 p-6 space-y-6">
        <div className="h-10 w-64 bg-gray-200 rounded-md animate-pulse" />
        <div className="h-8 w-40 bg-gray-200 rounded-md animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="mx-14 p-6 space-y-6">
      <CategoryFilter />
      
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <SortFilter />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No products found
        </div>
      )}
    </div>
  );
}