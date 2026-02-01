import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types/product';

interface CartState {
  items: CartItem[];
  // Track stock locally (in real app, this should sync with backend)
  stockMap: Record<string, number>;
  
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getProductStock: (productId: string) => number;
  initializeStock: (productId: string, stock: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      stockMap: {},

      initializeStock: (productId, stock) => {
        set((state) => ({
          stockMap: {
            ...state.stockMap,
            [productId]: stock,
          },
        }));
      },

      addToCart: (product) => {
        const items = get().items;
        const stockMap = get().stockMap;
        
        // Initialize stock if not already tracked
        if (!(product._id in stockMap)) {
          get().initializeStock(product._id, product.stockLeft);
        }

        const currentStock = stockMap[product._id] ?? product.stockLeft;
        const existingItem = items.find((item) => item._id === product._id);
        const currentQuantityInCart = existingItem?.quantity ?? 0;

        // Check if we have enough stock
        if (currentQuantityInCart >= currentStock) {
          return; // Can't add more than available stock
        }

        if (existingItem) {
          set({
            items: items.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            stockMap: {
              ...stockMap,
              [product._id]: currentStock - 1,
            },
          });
        } else {
          set({
            items: [...items, { ...product, quantity: 1 }],
            stockMap: {
              ...stockMap,
              [product._id]: currentStock - 1,
            },
          });
        }
      },

      removeFromCart: (productId) => {
        const items = get().items;
        const stockMap = get().stockMap;
        const removedItem = items.find((item) => item._id === productId);

        if (removedItem) {
          set({
            items: items.filter((item) => item._id !== productId),
            stockMap: {
              ...stockMap,
              [productId]: (stockMap[productId] ?? 0) + removedItem.quantity,
            },
          });
        }
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        const items = get().items;
        const stockMap = get().stockMap;
        const existingItem = items.find((item) => item._id === productId);
        
        if (!existingItem) return;

        const currentStock = stockMap[productId] ?? existingItem.stockLeft;
        const quantityDiff = quantity - existingItem.quantity;

        // Check if we have enough stock for the increase
        if (quantityDiff > currentStock) {
          return; // Can't increase beyond available stock
        }

        set({
          items: items.map((item) =>
            item._id === productId ? { ...item, quantity } : item
          ),
          stockMap: {
            ...stockMap,
            [productId]: currentStock - quantityDiff,
          },
        });
      },

      clearCart: () => {
        // Restore all stock when clearing cart
        const items = get().items;
        const stockMap = get().stockMap;
        const restoredStock = { ...stockMap };

        items.forEach((item) => {
          restoredStock[item._id] = (stockMap[item._id] ?? 0) + item.quantity;
        });

        set({ 
          items: [],
          stockMap: restoredStock,
        });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.salePrice * item.quantity,
          0
        );
      },

      getProductStock: (productId) => {
        const stockMap = get().stockMap;
        return stockMap[productId] ?? 0;
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);