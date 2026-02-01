'use client';

import { useCartStore } from '@/store/cartStore';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } =
    useCartStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto m-4">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X size={24} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Your cart is empty
          </div>
        ) : (
          <>
            <div className="p-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 border-b pb-4 last:border-b-0"
                >
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.category}</p>
                    <p className="text-lg font-bold text-pink-700">
                      ${item.salePrice.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="p-1 hover:bg-gray-100 rounded text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>

                    <div className="flex items-center gap-2 border rounded">
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                        className="p-2 hover:bg-gray-100"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 font-semibold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                        className="p-2 hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <p className="font-semibold">
                      ${(item.salePrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="sticky bottom-0 bg-white border-t p-4 space-y-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total:</span>
                <span className="text-pink-700">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={clearCart}
                  variant="outline"
                  className="flex-1"
                >
                  Clear Cart
                </Button>
                <Button className="flex-1 bg-pink-700 hover:bg-pink-800">
                  Checkout
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}