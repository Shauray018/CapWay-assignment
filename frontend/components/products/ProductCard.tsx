import Image from 'next/image';
import { Product } from '@/types/product';
import { useCartStore } from '@/store/cartStore';
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const discountPercentage = Math.round(
    ((product.originalPrice - product.salePrice) / product.originalPrice) * 100
  );

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      description: `$${product.salePrice.toFixed(2)}`,
    });
  };

  return (
    <div className="bg-pink-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
      <div className="relative h-48 mb-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain"
        />
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
          <span className="text-pink-600 text-sm font-medium">
            {product.stockLeft} Left
          </span>
        </div>

        <Button
          onClick={handleAddToCart}
          className="w-full bg-pink-700 hover:bg-pink-800 text-white"
          disabled={product.stockLeft === 0}
        >
          <ShoppingCart size={16} />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}