export type ScreenType = 'home' | 'pdp' | 'checkout' | 'confirmation';

export type ProductCategory =
  | "Men's Clothing"
  | "Women's Clothing"
  | "Kids' Wear"
  | 'Electronics'
  | 'Mobiles'
  | 'Laptops'
  | 'Headphones'
  | 'Shoes'
  | 'Watches'
  | 'Home & Kitchen'
  | 'Beauty Products'
  | 'Accessories';

export interface Product {
  id: number;
  sku: string;
  title: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  tag?: string | null;
  inStock: boolean;
  image: string;
  imageAlt: string;
  description: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  specs?: Record<string, string>;
  variants?: string[];
  gallery?: { src: string; label: string; alt: string }[];
}

export interface CartItem {
  id: number;
  title: string;
  sku: string;
  price: number;
  quantity: number;
  image: string;
  subtitle?: string;
  variant?: string;
  category?: string;
}

export interface OrderState {
  orderNumber: string;
  date: string;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
  shippingAddress: string;
  suite: string;
  city: string;
  state: string;
  zip: string;
  dispatchMethod: string;
  trackingNumber: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  grandTotal: number;
  paymentMethod: string;
  cardLast4: string;
}

export interface BannerSlide {
  id: string;
  kicker: string;
  title: string;
  highlight: string;
  description: string;
  ctaText: string;
  categoryFilter?: ProductCategory;
  badge: string;
  image: string;
  stats: { value: string; label: string }[];
}
