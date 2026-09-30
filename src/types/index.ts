export type GradientType = 'red-orange' | 'blue-white' | 'green-yellow' | 'black-gold';

export type ChinesePatternType = 'cloud_abstract' | 'dragon_minimal' | 'bamboo_flow' | 'wave_dynamic';

export type ProductStatus = 'in_stock' | 'low_stock' | 'pre_order' | 'archived';

export interface Product {
  id: string;
  nameTh: string;
  nameEn: string;
  collectionTh: string;
  collectionEn: string;
  gradientKey: GradientType;
  gradientLabel: string;
  gradientFrom: string;
  gradientTo: string;
  price: number;
  stock: number;
  lowStockThreshold: number;
  status: ProductStatus;
  ppDivertedKg: number; // kg of recycled industrial PP plastic
  descriptionTh: string;
  descriptionEn: string;
  dimensions: {
    width: number;
    depth: number;
    height: number;
    seatHeight: number;
  };
  weightKg: number;
  image: string;
  featured?: boolean;
}

export interface CustomConfiguration {
  gradientKey: GradientType;
  pattern: ChinesePatternType;
  cushionColor: 'charcoal' | 'natural_linen' | 'cinnabar' | 'imperial_gold';
  customEngraving?: string;
  surfaceFinish: 'tactile_matte' | 'satin_translucent' | 'mineral_grain';
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number;
  config: CustomConfiguration;
  itemPrice: number;
}

export type OrderStatus =
  | 'new'
  | 'paid'
  | 'processing'
  | 'customizing'
  | 'shipping'
  | 'completed'
  | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  collectionName: string;
  price: number;
  quantity: number;
  image: string;
  config: CustomConfiguration;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  district: string;
  province: string;
  postalCode: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  greenPointsRedeemed: number;
  greenPointsEarned: number;
  total: number;
  paymentMethod: 'promptpay' | 'credit_card' | 'bank_transfer';
  status: OrderStatus;
  trackingNumber?: string;
  notes?: string;
}

export interface StockMovement {
  id: string;
  timestamp: string;
  productId: string;
  productName: string;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  reason: string;
  remainingStock: number;
  performedBy: string;
  batchNumber?: string;
}

export type LoyaltyTier = 'Sprout' | 'Bamboo' | 'Jade' | 'Phoenix';

export interface LoyaltyActivity {
  id: string;
  date: string;
  type: 'purchase' | 'recycling_return' | 'reusable_box' | 'eco_activity' | 'redemption';
  descriptionTh: string;
  points: number; // positive or negative
}

export interface CustomerLoyalty {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: LoyaltyTier;
  greenPoints: number;
  pointsFromPurchases: number;
  pointsFromEco: number;
  pointsRedeemed: number;
  totalRecycledPpKg: number;
  joinedDate: string;
  history: LoyaltyActivity[];
}

export interface LoyaltyReward {
  id: string;
  titleTh: string;
  titleEn: string;
  descriptionTh: string;
  pointsRequired: number;
  category: 'discount' | 'privilege' | 'limited_item';
  discountAmount?: number;
  code: string;
  stockRemaining: number;
}
