import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ChineseSealMark } from './ChineseMotifs';
import { ShoppingBag, LayoutDashboard, Store } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    storefrontTab,
    setStorefrontTab,
    cartItemsCount,
    setIsCartOpen,
  } = useStore();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0D0F11]/90 border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Brand Wordmark (Single prominent text element with delicate seal) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setViewMode('storefront');
              setStorefrontTab('home');
            }}
            className="flex items-center gap-2.5 text-left group"
          >
            <ChineseSealMark text="塑新" className="w-7 h-7 text-xs border-[#C23E2F] text-[#C23E2F]" />
            <div className="flex flex-col">
              <span className="font-display text-lg tracking-[0.2em] font-semibold text-white group-hover:text-[#E86A17] transition-colors">
                CHINA RE:FORM
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Clean text links with subtle indicator) */}
        {viewMode === 'storefront' && (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button
              onClick={() => setStorefrontTab('home')}
              className={`transition-colors relative py-1 ${
                storefrontTab === 'home'
                  ? 'text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              เรื่องราว & นวัตกรรม
              {storefrontTab === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C23E2F]" />
              )}
            </button>

            <button
              onClick={() => setStorefrontTab('collection')}
              className={`transition-colors relative py-1 ${
                storefrontTab === 'collection'
                  ? 'text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              คอลเลกชันเก้าอี้
              {storefrontTab === 'collection' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C23E2F]" />
              )}
            </button>

            <button
              onClick={() => setStorefrontTab('loyalty')}
              className={`transition-colors relative py-1 ${
                storefrontTab === 'loyalty'
                  ? 'text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Green Loyalty
              {storefrontTab === 'loyalty' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C23E2F]" />
              )}
            </button>

            <button
              onClick={() => setStorefrontTab('track_order')}
              className={`transition-colors relative py-1 ${
                storefrontTab === 'track_order'
                  ? 'text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              ติดตามคำสั่งซื้อ
              {storefrontTab === 'track_order' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C23E2F]" />
              )}
            </button>
          </nav>
        )}

        {/* Zone 3: Primary Actions (Cart + Mode Switcher) */}
        <div className="flex items-center gap-3">
          {viewMode === 'storefront' ? (
            <>
              {/* Shopping Bag Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="ตะกร้าสินค้า"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C23E2F] text-white text-[11px] font-mono-num font-semibold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-[#0D0F11]">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              {/* Portal Switcher Button */}
              <button
                onClick={() => setViewMode('admin')}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-neutral-300 bg-white/5 border border-white/10 hover:border-white/20 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                <LayoutDashboard className="w-4 h-4 text-[#D4AF37]" />
                <span className="hidden sm:inline">ระบบหลังบ้าน CRM</span>
                <span className="sm:hidden">CRM</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setViewMode('storefront')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-white bg-[#C23E2F] hover:bg-[#A82B1D] transition-colors whitespace-nowrap"
            >
              <Store className="w-4 h-4" />
              <span>กลับสู่หน้าร้าน</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
