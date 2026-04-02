// ===== Ver.3 AI 쇼핑몰 빌더 타입 정의 =====

export interface Shop {
  id: string;
  sellerId: string;
  shopName: string;
  subdomain: string;
  customDomain?: string;
  logo?: string;
  bannerImages?: string[];
  theme: string;
  description?: string;
  settings?: ShopSettings;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
}

export interface ShopSettings {
  currency: string;
  shippingPolicy: string;
  returnPolicy: string;
  shippingFee: number;
  freeShippingThreshold?: number;
}

export interface Category {
  id: string;
  shopId: string;
  name: string;
  slug: string;
  order: number;
}

export interface Product {
  id: string;
  shopId: string;
  categoryId?: string;
  category?: Category;
  name: string;
  price: number;
  salePrice?: number;
  description?: string;
  images: ProductImages;
  detailPage?: string;
  options?: ProductOption[];
  stock: number;
  status: 'active' | 'draft' | 'soldout';
  hoverEnabled: boolean;
  createdAt: string;
}

export interface ProductImages {
  product: string;
  modelCut?: string;
  styled?: string;
  detail?: string;
}

export interface ProductOption {
  name: string;
  values: string[];
}

export interface Order {
  id: string;
  shopId: string;
  orderNumber: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  buyerAddress: BuyerAddress;
  items: OrderItem[];
  totalPrice: number;
  paymentStatus: 'pending' | 'paid' | 'cancelled' | 'refunded';
  shippingStatus: 'preparing' | 'shipped' | 'delivered' | 'returned';
  trackingNumber?: string;
  createdAt: string;
}

export interface BuyerAddress {
  zipCode: string;
  address1: string;
  address2: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product?: Product;
  quantity: number;
  price: number;
  options?: Record<string, string>;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  selectedOptions?: Record<string, string>;
}

// Ver.3 Pricing Plans
export interface Ver3PricingPlan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: { name: string; included: boolean; detail?: string }[];
  highlighted?: boolean;
  badge?: string;
}

// AI Pipeline
export interface AIPipelineResult {
  productCut: string;   // 누끼컷
  modelCut: string;     // AI 모델컷
  styledCut: string;    // 연출컷
  detailPage: string;   // 상세페이지 HTML
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

// Dashboard Stats
export interface DashboardStats {
  todaySales: number;
  todayOrders: number;
  todayVisitors: number;
  monthlyAIUsage: {
    modelCut: { used: number; total: number };
    video: { used: number; total: number };
    fitting: { used: number; total: number };
    productCut: { used: number; total: number };
  };
}
