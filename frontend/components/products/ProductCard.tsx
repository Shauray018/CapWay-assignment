import Image from 'next/image';
import { Product } from '@/types/product';
import { useCartStore } from '@/store/cartStore';
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const initializeStock = useCartStore((state) => state.initializeStock);
  const getProductStock = useCartStore((state) => state.getProductStock);
  const items = useCartStore((state) => state.items);
  
  // Initialize stock when component mounts
  useEffect(() => {
    initializeStock(product._id, product.stockLeft);
  }, [product._id, product.stockLeft, initializeStock]);

  const availableStock = getProductStock(product._id) || product.stockLeft;
  const itemInCart = items.find(item => item._id === product._id);
  const quantityInCart = itemInCart?.quantity || 0;

  const handleAddToCart = () => {
    if (availableStock <= 0) {
      toast.error('Out of stock!');
      return;
    }

    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      description: `$${product.salePrice.toFixed(2)} • ${quantityInCart + 1} in cart`,
    });
  };

  const isOutOfStock = availableStock <= 0;

  return (
    <div className="bg-pink-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
      <div className="relative h-48 mb-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.category}</p>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">{product.pricePerUnit}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">${product.salePrice.toFixed(2)}</span>
          <span className="text-sm text-gray-400 line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${
            isOutOfStock ? 'text-red-600' : 'text-pink-600'
          }`}>
            {availableStock} Left
          </span>
          {quantityInCart > 0 && (
            <span className="text-xs text-gray-500">
              {quantityInCart} in cart
            </span>
          )}
        </div>

        <Button
          onClick={handleAddToCart}
          className="w-full bg-pink-700 hover:bg-pink-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isOutOfStock}
        >
          <ShoppingCart size={16} />
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
}