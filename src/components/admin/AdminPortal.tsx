import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ChineseSealMark } from '../common/ChineseMotifs';
import {
  LayoutDashboard,
  Armchair,
  Layers,
  ShoppingBag,
  Award,
  Store,
  Bell,
  User,
  Shield,
} from 'lucide-react';
import { AdminDashboard } from './AdminDashboard';
import { ProductManagement } from './ProductManagement';
import { StockManagement } from './StockManagement';
import { OrderManagement } from './OrderManagement';
import { GreenLoyaltyCRM } from './GreenLoyaltyCRM';

export const AdminPortal: React.FC = () => {
  const { adminTab, setAdminTab, setViewMode, lowStockProducts, orders } = useStore();

  const newOrdersCount = orders.filter((o) => o.status === 'new').length;

  const navItems: { id: typeof adminTab; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'dashboard', label: 'แดชบอร์ดภาพรวม (Dashboard)', icon: LayoutDashboard },
    { id: 'products', label: 'จัดการสินค้า (Products)', icon: Armchair },
    { id: 'stock', label: 'คลังสินค้า & สต็อก (Stock)', icon: Layers, badge: lowStockProducts.length },
    { id: 'orders', label: 'คำสั่งซื้อ (Order Pipeline)', icon: ShoppingBag, badge: newOrdersCount },
    { id: 'loyalty', label: 'สมาชิกรักษ์โลก (Green Loyalty CRM)', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-[#0D0F11] text-[#EAE6DF] flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 lg:w-72 bg-[#121417] border-r border-white/10 flex flex-col justify-between shrink-0">
        
        <div>
          {/* Brand & Portal Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ChineseSealMark text="管理" className="w-7 h-7 text-xs border-[#D4AF37] text-[#D4AF37]" />
              <div>
                <span className="font-display text-sm tracking-wider font-semibold text-white block">
                  CHINA RE:FORM
                </span>
                <span className="text-[10px] text-neutral-400 font-mono-num uppercase tracking-wider block">
                  CRM & Operations Portal
                </span>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = adminTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setAdminTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#C23E2F] text-white shadow-md shadow-[#C23E2F]/20'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono-num font-bold bg-amber-400 text-black shrink-0">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Operator & Storefront Switcher */}
        <div className="p-4 border-t border-white/10 space-y-3 bg-[#0A0B0D]/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-[#D4AF37]">
              <Shield className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">ผู้จัดการระบบ (Admin)</p>
              <p className="text-[10px] text-emerald-400 font-mono-num">Online · สาขาสตูดิโอทองหล่อ</p>
            </div>
          </div>

          <button
            onClick={() => setViewMode('storefront')}
            className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Store className="w-4 h-4 text-[#C23E2F]" />
            <span>สลับสู่หน้าร้าน (Storefront)</span>
          </button>
        </div>

      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header Breadcrumb bar */}
        <header className="h-16 px-6 lg:px-8 border-b border-white/10 bg-[#0D0F11]/90 backdrop-blur-md flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs font-mono-num text-neutral-400">
            <span>CRM</span>
            <span>/</span>
            <span className="text-white capitalize">{adminTab}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-xs font-mono-num text-neutral-400 hidden sm:block">
              28 ก.ย. 2026 · 11:30 น.
            </div>

            <button
              onClick={() => setViewMode('storefront')}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Store className="w-3.5 h-3.5 text-[#C23E2F]" />
              <span className="hidden sm:inline">ดูเว็บไซต์หน้าร้าน</span>
            </button>
          </div>
        </header>

        {/* Body View */}
        <div className="p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {adminTab === 'dashboard' && <AdminDashboard />}
          {adminTab === 'products' && <ProductManagement />}
          {adminTab === 'stock' && <StockManagement />}
          {adminTab === 'orders' && <OrderManagement />}
          {adminTab === 'loyalty' && <GreenLoyaltyCRM />}
        </div>

      </main>

    </div>
  );
};
