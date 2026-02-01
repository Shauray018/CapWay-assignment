import { create } from 'zustand';

interface FilterState {
  searchQuery: string;
  selectedCategory: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  inStockOnly: boolean;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setMinPrice: (price: number | null) => void;
  setMaxPrice: (price: number | null) => void;
  setInStockOnly: (inStock: boolean) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchQuery: '',
  selectedCategory: null,
  minPrice: null,
  maxPrice: null,
  inStockOnly: false,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setMinPrice: (price) => set({ minPrice: price }),
  setMaxPrice: (price) => set({ maxPrice: price }),
  setInStockOnly: (inStock) => set({ inStockOnly: inStock }),
  
  clearFilters: () =>
    set({
      searchQuery: '',
      selectedCategory: null,
      minPrice: null,
      maxPrice: null,
      inStockOnly: false,
    }),
}));