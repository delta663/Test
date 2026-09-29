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

      {/* Floating Download Button on Screen */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
        <button
          onClick={() => setShowImageGalleryModal(true)}
          className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold shadow-2xl hover:scale-105 transition-all cursor-pointer border border-amber-300/40"
        >
          <span className="text-lg">🖼️</span>
          <span className="text-sm">โหลดไฟล์รูป (.jpg)</span>
        </button>
      </div>

      {/* Direct Image Download Gallery Modal */}
      {showImageGalleryModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#12161A] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>📥</span> ดาวน์โหลดไฟล์รูปภาพ (.jpg) คอลเลกชันเก้าอี้จีนร่วมสมัย
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  คลิกที่ปุ่มสีทองใต้รูปเพื่อเซฟไฟล์ภาพนามสกุล .jpg บันทึกลงเครื่องทันที
                </p>
              </div>
              <button
                onClick={() => setShowImageGalleryModal(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
              {[
                {
                  title: "1. ภาพรวมคอลเลกชันในแกลเลอรี (Showcase Gallery 16:9)",
                  desc: "เก้าอี้หมิงทั้ง 4 รุ่นจัดแสดงเคียงกันในสตูดิโอมินิมอล",
                  src: "/downloads/ming_chair_collection_showcase_1790677996019.jpg",
                  filename: "ming_chair_collection_showcase.jpg"
                },
                {
                  title: "2. ภาพอาร์ตเวิร์กเก้าอี้คู่ในสวนเซน (Artistic Zen Portrait 1:1)",
                  desc: "เก้าอี้สีแดงชาด-ส้ม เคียงคู่กับสีดำออบซิเดียน-ทองคำ",
                  src: "/downloads/ming_chair_hero_artistic_1790678013613.jpg",
                  filename: "ming_chair_artistic_portrait.jpg"
                },
                {
                  title: "3. รุ่น ด่านเสีย - Vermilion Dawn (แดงสู่ส้ม)",
                  desc: "เก้าอี้ทรงเกือกม้า หล่อจาก PP รีไซเคิล 8.4 กก.",
                  src: "/downloads/chair_red_orange_1790608936533.jpg",
                  filename: "chair_vermilion_dawn.jpg"
                },
                {
                  title: "4. รุ่น ชิงฮวา - Cerulean Porcelain (น้ำเงินสู่ขาว)",
                  desc: "แรงบันดาลใจจากเครื่องเคลือบลายครามจีน",
                  src: "/downloads/chair_blue_white_1790608950562.jpg",
                  filename: "chair_cerulean_porcelain.jpg"
                },
                {
                  title: "5. รุ่น ชุยจู๋ - Bamboo Jade (เขียวสู่เหลือง)",
                  desc: "ลดทอนข้อปล้องไผ่ ผสานสีเขียวหยกและเหลืองอำพัน",
                  src: "/downloads/chair_green_yellow_1790608962532.jpg",
                  filename: "chair_bamboo_jade.jpg"
                },
                {
                  title: "6. รุ่น สวี่จิน - Imperial Obsidian (ดำสู่ทอง)",
                  desc: "ดำออบซิเดียนผสานประกายทองคำแชมเปญมิเนอรัล",
                  src: "/downloads/chair_black_gold_1790608974109.jpg",
                  filename: "chair_imperial_obsidian.jpg"
                },
                {
                  title: "7. ภาพประธานเก้าอี้หมิง (Hero Ming Chair)",
                  desc: "ภาพปกประจำแบรนด์ CHINA RE:FORM สไตล์ Futuristic Ming",
                  src: "/downloads/hero_chair_ming_pp_1790608921381.jpg",
                  filename: "hero_chair_ming_pp.jpg"
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-black/40 border border-white/10 rounded-xl overflow-hidden flex flex-col group">
                  <div className="relative aspect-video bg-neutral-900 overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-amber-400 font-mono">
                      .JPG
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                      <p className="text-xs text-neutral-400 mt-0.5">{item.desc}</p>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                      <a
                        href={item.src}
                        download={item.filename}
                        className="flex-1 py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
                      >
                        ⬇️ ดาวน์โหลดไฟล์ .jpg
                      </a>
                      <a
                        href={item.src}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                      >
                        เปิดดู
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-white/10 bg-black/60 flex items-center justify-between">
              <a
                href="/downloads/contemporary_ming_chairs_collection.zip"
                download="contemporary_ming_chairs_collection.zip"
                className="text-xs text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>📦</span> ต้องการโหลดรวมทุกภาพเป็นไฟล์ ZIP (4.3 MB) คลิกที่นี่
              </a>
              <button
                onClick={() => setShowImageGalleryModal(false)}
                className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white cursor-pointer"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}

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
