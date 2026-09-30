import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  OrderStatus,
  StockMovement,
  CustomerLoyalty,
  LoyaltyReward,
  CustomConfiguration,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_STOCK_MOVEMENTS,
  INITIAL_CUSTOMERS,
  INITIAL_REWARDS,
} from '../data/initialData';
import {
  CHAIR_RED_ORANGE_IMAGE,
  CHAIR_BLUE_WHITE_IMAGE,
  CHAIR_GREEN_YELLOW_IMAGE,
  CHAIR_BLACK_GOLD_IMAGE,
} from '../assets/images';

interface StoreContextType {
  // Navigation / View Mode
  viewMode: 'storefront' | 'admin';
  setViewMode: (mode: 'storefront' | 'admin') => void;
  adminTab: 'dashboard' | 'products' | 'stock' | 'orders' | 'loyalty';
  setAdminTab: (tab: 'dashboard' | 'products' | 'stock' | 'orders' | 'loyalty') => void;
  storefrontTab: 'home' | 'collection' | 'loyalty' | 'track_order';
  setStorefrontTab: (tab: 'home' | 'collection' | 'loyalty' | 'track_order') => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, config: CustomConfiguration, quantity?: number) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartItemsCount: number;

  // Selected Product for PDP / Configurator
  selectedProductForConfig: Product | null;
  setSelectedProductForConfig: (p: Product | null) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string) => void;
  selectedOrderForLookup: Order | null;
  setSelectedOrderForLookup: (order: Order | null) => void;

  // Stock
  stockMovements: StockMovement[];
  stockIn: (productId: string, quantity: number, reason: string, performedBy: string, batch?: string) => void;
  stockOut: (productId: string, quantity: number, reason: string, performedBy: string) => void;
  lowStockProducts: Product[];

  // Loyalty & Rewards
  customers: CustomerLoyalty[];
  rewards: LoyaltyReward[];
  activeCustomer: CustomerLoyalty;
  creditPlasticRecycling: (customerId: string, weightKg: number, notes?: string) => void;
  redeemReward: (rewardId: string) => boolean;

  // Notifications
  notification: string | null;
  showNotification: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'china_reform_products_v1',
  ORDERS: 'china_reform_orders_v1',
  STOCK_MOVEMENTS: 'china_reform_movements_v1',
  CUSTOMERS: 'china_reform_customers_v1',
  REWARDS: 'china_reform_rewards_v1',
  CART: 'china_reform_cart_v1',
};

// Older deployments stored Vite source paths in localStorage. Those paths are not
// valid after a production build, so translate only the known legacy values to
// their bundled asset URLs while leaving admin-provided/custom image URLs intact.
const LEGACY_IMAGE_MAP: Record<string, string> = {
  '/src/assets/images/chair_red_orange_1790608936533.jpg': CHAIR_RED_ORANGE_IMAGE,
  '/src/assets/images/chair_blue_white_1790608950562.jpg': CHAIR_BLUE_WHITE_IMAGE,
  '/src/assets/images/chair_green_yellow_1790608962532.jpg': CHAIR_GREEN_YELLOW_IMAGE,
  '/src/assets/images/chair_black_gold_1790608974109.jpg': CHAIR_BLACK_GOLD_IMAGE,
};

const normalizeImage = (image: string) => LEGACY_IMAGE_MAP[image] ?? image;

const normalizeProducts = (items: Product[]): Product[] =>
  items.map((product) => ({ ...product, image: normalizeImage(product.image) }));

const normalizeOrders = (items: Order[]): Order[] =>
  items.map((order) => ({
    ...order,
    items: order.items.map((item) => ({ ...item, image: normalizeImage(item.image) })),
  }));

const normalizeCart = (items: CartItem[]): CartItem[] =>
  items.map((item) => ({
    ...item,
    product: { ...item.product, image: normalizeImage(item.product.image) },
  }));

const loadStored = <T,>(key: string, fallback: T, normalize?: (value: T) => T): T => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;

    const parsed = JSON.parse(saved) as T;
    return normalize ? normalize(parsed) : parsed;
  } catch {
    // A malformed/stale localStorage entry should never prevent the storefront
    // from loading. Fall back to the built-in demo data instead.
    return fallback;
  }
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [viewMode, setViewMode] = useState<'storefront' | 'admin'>('storefront');
  const [adminTab, setAdminTab] = useState<'dashboard' | 'products' | 'stock' | 'orders' | 'loyalty'>('dashboard');
  const [storefrontTab, setStorefrontTab] = useState<'home' | 'collection' | 'loyalty' | 'track_order'>('home');

  // Modals & Panels
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductForConfig, setSelectedProductForConfig] = useState<Product | null>(null);
  const [selectedOrderForLookup, setSelectedOrderForLookup] = useState<Order | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Products state
  const [products, setProducts] = useState<Product[]>(() =>
    loadStored(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS, normalizeProducts)
  );

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() =>
    loadStored(STORAGE_KEYS.ORDERS, INITIAL_ORDERS, normalizeOrders)
  );

  // Stock movements
  const [stockMovements, setStockMovements] = useState<StockMovement[]>(() =>
    loadStored(STORAGE_KEYS.STOCK_MOVEMENTS, INITIAL_STOCK_MOVEMENTS)
  );

  // Customers / Loyalty
  const [customers, setCustomers] = useState<CustomerLoyalty[]>(() =>
    loadStored(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS)
  );

  // Current active customer for demo simulation
  const [activeCustomerIndex] = useState(0);
  const activeCustomer = customers[activeCustomerIndex] || customers[0];

  // Rewards
  const [rewards, setRewards] = useState<LoyaltyReward[]>(() =>
    loadStored(STORAGE_KEYS.REWARDS, INITIAL_REWARDS)
  );

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() =>
    loadStored(STORAGE_KEYS.CART, [], normalizeCart)
  );

  // Persist states
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STOCK_MOVEMENTS, JSON.stringify(stockMovements));
  }, [stockMovements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REWARDS, JSON.stringify(rewards));
  }, [rewards]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 4000);
  };

  // Product mutations
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    const product: Product = { ...newProd, id };
    setProducts((prev) => [product, ...prev]);

    // Log stock movement
    if (product.stock > 0) {
      const movement: StockMovement = {
        id: `mov-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        productId: id,
        productName: product.nameEn,
        type: 'in',
        quantity: product.stock,
        reason: 'เพิ่มสินค้าใหม่เข้าสู่ระบบ พร้อมล็อตตั้งต้น',
        remainingStock: product.stock,
        performedBy: 'ผู้ดูแลระบบ (Admin)',
      };
      setStockMovements((prev) => [movement, ...prev]);
    }
    showNotification(`เพิ่มสินค้า "${product.nameTh}" เรียบร้อยแล้ว`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, ...updates };
          // Check stock status automatically
          if (updated.stock <= 0) {
            updated.status = 'pre_order';
          } else if (updated.stock <= updated.lowStockThreshold) {
            updated.status = 'low_stock';
          } else if (updated.status === 'low_stock' && updated.stock > updated.lowStockThreshold) {
            updated.status = 'in_stock';
          }
          return updated;
        }
        return item;
      })
    );
    showNotification(`อัปเดตข้อมูลสินค้าเรียบร้อย`);
  };

  const deleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showNotification(`ลบสินค้า "${target?.nameTh || id}" แล้ว`);
  };

  // Cart operations
  const addToCart = (product: Product, config: CustomConfiguration, quantity = 1) => {
    const cartItemId = `${product.id}-${config.gradientKey}-${config.pattern}-${config.cushionColor}-${config.customEngraving || 'none'}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { cartItemId, product, quantity, config, itemPrice: product.price }];
    });
    setIsCartOpen(true);
    showNotification(`เพิ่ม "${product.nameTh}" ลงในตะกร้าแล้ว`);
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showNotification(`นำสินค้าออกจากตะกร้าแล้ว`);
  };

  const clearCart = () => setCart([]);

  const cartSubtotal = cart.reduce((sum, item) => sum + item.itemPrice * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Stock operations
  const stockIn = (
    productId: string,
    quantity: number,
    reason: string,
    performedBy: string,
    batch?: string
  ) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;

    const newStock = prod.stock + quantity;
    updateProduct(productId, { stock: newStock });

    const movement: StockMovement = {
      id: `mov-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      productId,
      productName: prod.nameEn,
      type: 'in',
      quantity,
      reason,
      remainingStock: newStock,
      performedBy,
      batchNumber: batch || `BATCH-${Date.now().toString().slice(-4)}`,
    };
    setStockMovements((prev) => [movement, ...prev]);
    showNotification(`รับสินค้าเข้าสต็อก +${quantity} ชิ้น (${prod.nameTh})`);
  };

  const stockOut = (
    productId: string,
    quantity: number,
    reason: string,
    performedBy: string
  ) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;

    const newStock = Math.max(0, prod.stock - quantity);
    updateProduct(productId, { stock: newStock });

    const movement: StockMovement = {
      id: `mov-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      productId,
      productName: prod.nameEn,
      type: 'out',
      quantity,
      reason,
      remainingStock: newStock,
      performedBy,
    };
    setStockMovements((prev) => [movement, ...prev]);
    showNotification(`ตัดสต็อกออก -${quantity} ชิ้น (${prod.nameTh})`);
  };

  const lowStockProducts = products.filter(
    (p) => p.stock <= p.lowStockThreshold || p.status === 'low_stock'
  );

  // Order management
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order => {
    const orderNum = `CRF-2026-${Math.floor(1050 + Math.random() * 900)}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      createdAt: now,
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Deduct stock for each purchased item
    newOrder.items.forEach((item) => {
      stockOut(
        item.productId,
        item.quantity,
        `จำหน่ายผ่านคำสั่งซื้อ #${orderNum} (${newOrder.customerName})`,
        'ระบบหน้าร้านอัตโนมัติ'
      );
    });

    // Credit Green Points to active customer & deduct redeemed points
    if (activeCustomer) {
      setCustomers((prev) =>
        prev.map((c) => {
          if (c.id === activeCustomer.id) {
            const netPoints = c.greenPoints - newOrder.greenPointsRedeemed + newOrder.greenPointsEarned;
            const newHistory = [...c.history];

            if (newOrder.greenPointsRedeemed > 0) {
              newHistory.unshift({
                id: `act-${Date.now()}-redeem`,
                date: now.split(' ')[0],
                type: 'redemption',
                descriptionTh: `ใช้คะแนนส่วนลดคำสั่งซื้อ #${orderNum}`,
                points: -newOrder.greenPointsRedeemed,
              });
            }

            if (newOrder.greenPointsEarned > 0) {
              newHistory.unshift({
                id: `act-${Date.now()}-earn`,
                date: now.split(' ')[0],
                type: 'purchase',
                descriptionTh: `ได้รับ Green Points จากการสั่งซื้อ #${orderNum}`,
                points: newOrder.greenPointsEarned,
              });
            }

            return {
              ...c,
              greenPoints: Math.max(0, netPoints),
              pointsFromPurchases: c.pointsFromPurchases + newOrder.greenPointsEarned,
              pointsRedeemed: c.pointsRedeemed + newOrder.greenPointsRedeemed,
              history: newHistory,
            };
          }
          return c;
        })
      );
    }

    clearCart();
    setSelectedOrderForLookup(newOrder);
    setStorefrontTab('track_order');
    showNotification(`สร้างคำสั่งซื้อ #${orderNum} สำเร็จ! ได้รับ +${newOrder.greenPointsEarned} Green Points`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, trackingNumber?: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            status,
            trackingNumber: trackingNumber !== undefined ? trackingNumber : order.trackingNumber,
          };
        }
        return order;
      })
    );
    showNotification(`อัปเดตสถานะคำสั่งซื้อเป็น "${status.toUpperCase()}" เรียบร้อยแล้ว`);
  };

  // Recycling intake & CRM
  const creditPlasticRecycling = (customerId: string, weightKg: number, notes?: string) => {
    const pointsToAward = Math.round(weightKg * 50); // 50 pts per kg of industrial PP
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === customerId) {
          const newTotalKg = Number((c.totalRecycledPpKg + weightKg).toFixed(1));
          // Tier progression: Sprout (<10kg) -> Bamboo (10-25kg) -> Jade (25-40kg) -> Phoenix (>40kg)
          let newTier = c.tier;
          if (newTotalKg >= 40) newTier = 'Phoenix';
          else if (newTotalKg >= 25) newTier = 'Jade';
          else if (newTotalKg >= 10) newTier = 'Bamboo';

          const newActivity = {
            id: `act-${Date.now()}`,
            date: now.split(' ')[0],
            type: 'recycling_return' as const,
            descriptionTh: `ส่งมอบเศษพลาสติก PP โรงงาน ${weightKg} กก. (${notes || 'ตรวจรับสภาพเกรดบริสุทธิ์'})`,
            points: pointsToAward,
          };

          return {
            ...c,
            greenPoints: c.greenPoints + pointsToAward,
            pointsFromEco: c.pointsFromEco + pointsToAward,
            totalRecycledPpKg: newTotalKg,
            tier: newTier,
            history: [newActivity, ...c.history],
          };
        }
        return c;
      })
    );

    showNotification(`ตรวจรับพลาสติก PP ${weightKg} กก. มอบคะแนน +${pointsToAward} Green Points สำเร็จ`);
  };

  const redeemReward = (rewardId: string): boolean => {
    const reward = rewards.find((r) => r.id === rewardId);
    if (!reward) return false;

    if (activeCustomer.greenPoints < reward.pointsRequired) {
      showNotification(`คะแนน Green Points ไม่เพียงพอ (ต้องการ ${reward.pointsRequired} คะแนน)`);
      return false;
    }

    if (reward.stockRemaining <= 0) {
      showNotification(`สิทธิ์หรือของรางวัลนี้หมดแล้ว`);
      return false;
    }

    const now = new Date().toISOString().split('T')[0];

    // Deduct points
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === activeCustomer.id) {
          return {
            ...c,
            greenPoints: c.greenPoints - reward.pointsRequired,
            pointsRedeemed: c.pointsRedeemed + reward.pointsRequired,
            history: [
              {
                id: `act-${Date.now()}`,
                date: now,
                type: 'redemption',
                descriptionTh: `แลกรับ: ${reward.titleTh} (โค้ด: ${reward.code})`,
                points: -reward.pointsRequired,
              },
              ...c.history,
            ],
          };
        }
        return c;
      })
    );

    // Deduct reward stock
    setRewards((prev) =>
      prev.map((r) => (r.id === rewardId ? { ...r, stockRemaining: r.stockRemaining - 1 } : r))
    );

    showNotification(`แลกสิทธิ์ "${reward.titleTh}" สำเร็จ! รหัสสิทธิ์: ${reward.code}`);
    return true;
  };

  return (
    <StoreContext.Provider
      value={{
        viewMode,
        setViewMode,
        adminTab,
        setAdminTab,
        storefrontTab,
        setStorefrontTab,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartItemsCount,
        selectedProductForConfig,
        setSelectedProductForConfig,
        orders,
        createOrder,
        updateOrderStatus,
        selectedOrderForLookup,
        setSelectedOrderForLookup,
        stockMovements,
        stockIn,
        stockOut,
        lowStockProducts,
        customers,
        rewards,
        activeCustomer,
        creditPlasticRecycling,
        redeemReward,
        notification,
        showNotification,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
