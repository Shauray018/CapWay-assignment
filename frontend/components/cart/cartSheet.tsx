'use client';

import { useCartStore } from '@/store/cartStore';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '../ui/sheet';
import { toast } from 'sonner';

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSheet({ isOpen, onClose }: CartSheetProps) {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } =
    useCartStore();

  const handleRemoveItem = (name: string, id: string) => {
    removeFromCart(id);
    toast.success(`${name} removed from cart`);
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Cart cleared');
  };

  const handleCheckout = () => {
    toast.success('Proceeding to checkout...');
    // Add checkout logic here
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="text-pink-700" />
            Your Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
            <ShoppingBag size={64} className="mb-4 text-gray-300" />
            <p className="text-lg font-medium">Your cart is empty</p>
            <p className="text-sm">Add some products to get started</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
                >
                  <div className="relative w-20 h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-600">{item.category}</p>
                    <p className="text-sm font-bold text-pink-700 mt-1">
                      ${item.salePrice.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-pink-300 rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity - 1)
                          }
                          className="p-1.5 hover:bg-pink-200 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-sm font-semibold min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                          className="p-1.5 hover:bg-pink-200 transition-colors"
                          disabled={item.quantity >= item.stockLeft}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.name, item._id)}
                        className="ml-auto p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <p className="font-bold text-pink-700">
                      ${(item.salePrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <SheetFooter className="flex-col gap-4">
              <div className="w-full space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span className="text-pink-700">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="w-full flex gap-2">
                <Button
                  onClick={handleClearCart}
                  variant="outline"
                  className="flex-1 border-pink-700 text-pink-700 hover:bg-pink-50"
                >
                  Clear Cart
                </Button>
                <Button
                  onClick={handleCheckout}
                  className="flex-1 bg-pink-700 hover:bg-pink-800"
                >
                  Checkout
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}