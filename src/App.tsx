import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/storefront/HeroSection';
import { BrandStorySection } from './components/storefront/BrandStorySection';
import { CollectionSection } from './components/storefront/CollectionSection';
import { GreenLoyaltySection } from './components/storefront/GreenLoyaltySection';
import { CartDrawer } from './components/storefront/CartDrawer';
import { CustomConfiguratorModal } from './components/storefront/CustomConfiguratorModal';
import { OrderTrackerModal } from './components/storefront/OrderTrackerModal';
import { AdminPortal } from './components/admin/AdminPortal';
import { CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { viewMode, storefrontTab, notification } = useStore();

  if (viewMode === 'admin') {
    return (
      <div className="relative">
        <AdminPortal />
        {/* Floating Notification */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-neutral-900/95 border border-[#D4AF37]/50 text-white shadow-2xl backdrop-blur-md text-xs font-medium animate-in fade-in slide-in-from-bottom-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{notification}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0F11] text-[#EAE6DF] flex flex-col selection:bg-[#B3261E] selection:text-white">
      <Navbar />

      <main className="flex-1">
        {storefrontTab === 'home' && (
          <>
            <HeroSection />
            <BrandStorySection />
            <CollectionSection />
            <GreenLoyaltySection />
          </>
        )}

        {storefrontTab === 'collection' && (
          <div className="pt-4">
            <CollectionSection />
          </div>
        )}

        {storefrontTab === 'loyalty' && (
          <div className="pt-4">
            <GreenLoyaltySection />
          </div>
        )}

        {storefrontTab === 'track_order' && (
          <div className="pt-4">
            <OrderTrackerModal />
          </div>
        )}
      </main>

      {/* Cart Slide-out Drawer */}
      <CartDrawer />

      {/* Bespoke Interactive 3D/2D Configurator Modal */}
      <CustomConfiguratorModal />

      {/* Footer */}
      <Footer />

      {/* Global Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#14171A]/95 border border-[#D4AF37]/40 text-white shadow-2xl backdrop-blur-md text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
