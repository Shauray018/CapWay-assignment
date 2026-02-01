// import { create } from 'zustand';

// interface FilterState {
//   searchQuery: string;
//   selectedCategory: string | null;
//   minPrice: number | null;
//   maxPrice: number | null;
//   inStockOnly: boolean;
//   setSearchQuery: (query: string) => void;
//   setSelectedCategory: (category: string | null) => void;
//   setMinPrice: (price: number | null) => void;
//   setMaxPrice: (price: number | null) => void;
//   setInStockOnly: (inStock: boolean) => void;
//   clearFilters: () => void;
// }

// export const useFilterStore = create<FilterState>((set) => ({
//   searchQuery: '',
//   selectedCategory: null,
//   minPrice: null,
//   maxPrice: null,
//   inStockOnly: false,

//   setSearchQuery: (query) => set({ searchQuery: query }),
//   setSelectedCategory: (category) => set({ selectedCategory: category }),
//   setMinPrice: (price) => set({ minPrice: price }),
//   setMaxPrice: (price) => set({ maxPrice: price }),
//   setInStockOnly: (inStock) => set({ inStockOnly: inStock }),
  
//   clearFilters: () =>
//     set({
//       searchQuery: '',
//       selectedCategory: null,
//       minPrice: null,
//       maxPrice: null,
//       inStockOnly: false,
//     }),
// }));
import { create } from 'zustand';

export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

interface FilterState {
  searchQuery: string;
  selectedCategory: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  inStockOnly: boolean;
  sortBy: SortOption | null;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setMinPrice: (price: number | null) => void;
  setMaxPrice: (price: number | null) => void;
  setInStockOnly: (inStock: boolean) => void;
  setSortBy: (sort: SortOption | null) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchQuery: '',
  selectedCategory: null,
  minPrice: null,
  maxPrice: null,
  inStockOnly: false,
  sortBy: null,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setMinPrice: (price) => set({ minPrice: price }),
  setMaxPrice: (price) => set({ maxPrice: price }),
  setInStockOnly: (inStock) => set({ inStockOnly: inStock }),
  setSortBy: (sort) => set({ sortBy: sort }),
  resetFilters: () =>
    set({
      searchQuery: '',
      selectedCategory: null,
      minPrice: null,
      maxPrice: null,
      inStockOnly: false,
      sortBy: null,
    }),
}));