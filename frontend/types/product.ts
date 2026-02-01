export interface Product {
  _id: string;
  name: string;
  category: string;
  pricePerUnit: string;
  salePrice: number;
  originalPrice: number;
  stockLeft: number;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  success: boolean;
  count: number;
  data: Product[];
}

export interface CartItem extends Product {
  quantity: number;
}