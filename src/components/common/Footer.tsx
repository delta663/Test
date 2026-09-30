import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ChineseSealMark } from './ChineseMotifs';
import { ShieldCheck, Recycle, HeartHandshake } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setStorefrontTab, setViewMode } = useStore();

  return (
    <footer className="border-t border-white/10 bg-[#090A0C] text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        {/* Top 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-white/10">
          <div className="flex items-start gap-3">
            <Recycle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold text-sm">100% Upcycled Polypropylene</h4>
              <p className="mt-1 leading-relaxed text-neutral-400">
                กู้คืนพลาสติก PP บริสุทธิ์เกรดอุตสาหกรรมจากโรงงานในประเทศไทย ไม่ทิ้งสารตกค้างสู่ระบบนิเวศ
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold text-sm">รับประกันโครงสร้างยาวนาน 10 ปี</h4>
              <p className="mt-1 leading-relaxed text-neutral-400">
                รองรับน้ำหนักได้สูงสุด 180 กิโลกรัม ทนแดด ทนชื้น ไม่บวมน้ำ ทำความสะอาดง่ายด้วยน้ำเปล่า
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-[#C23E2F] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold text-sm">Circular Trade-in Guarantee</h4>
              <p className="mt-1 leading-relaxed text-neutral-400">
                รับซื้อคืนหรือแลกเปลี่ยนเป็นเก้าอี้รุ่นใหม่ พร้อมมอบ Green Points สูงสุด 50% ของมูลค่าเดิม
              </p>
            </div>
          </div>
        </div>

        {/* Links and Brand Summary */}
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="space-y-3 max-w-sm">
            <div className="flex items-center gap-2.5">
              <ChineseSealMark text="塑新" className="w-6 h-6 text-[10px] border-[#C23E2F] text-[#C23E2F]" />
              <span className="font-display text-base tracking-[0.2em] font-semibold text-white">
                CHINA RE:FORM
              </span>
            </div>
            <p className="leading-relaxed">
              เปลี่ยนพลาสติก PP เหลือใช้จากโรงงานอุตสาหกรรม ให้กลายเป็นเก้าอี้จีนร่วมสมัยที่มีเอกลักษณ์เฉพาะตัว
            </p>
            <p className="font-mono-num text-[11px] text-neutral-500">
              แฟลกชิปสตูดิโอ: โครงการ The Warehouse ทองหล่อ 13 กรุงเทพฯ 10110
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8 text-neutral-300">
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold">การนำทาง</p>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <button onClick={() => setStorefrontTab('home')} className="hover:text-white transition-colors cursor-pointer">
                    เรื่องราว & นวัตกรรม
                  </button>
                </li>
                <li>
                  <button onClick={() => setStorefrontTab('collection')} className="hover:text-white transition-colors cursor-pointer">
                    4 คอลเลกชันเก้าอี้
                  </button>
                </li>
                <li>
                  <button onClick={() => setStorefrontTab('loyalty')} className="hover:text-white transition-colors cursor-pointer">
                    ระบบ Green Loyalty
                  </button>
                </li>
                <li>
                  <button onClick={() => setStorefrontTab('track_order')} className="hover:text-white transition-colors cursor-pointer">
                    ติดตามคำสั่งซื้อ
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold">ระบบบริหาร</p>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <button onClick={() => setViewMode('admin')} className="hover:text-white transition-colors cursor-pointer">
                    เข้าสู่ระบบหลังบ้าน CRM
                  </button>
                </li>
                <li>
                  <span className="text-neutral-500">ISO 14001 Circular Polymer</span>
                </li>
                <li>
                  <span className="text-neutral-500">B Corp Certified Candidate</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400 font-mono-num">
          <p>© 2026 CHINA RE:FORM Co., Ltd. สงวนลิขสิทธิ์ทุกประการ</p>
          <p>Chinese Contemporary + Sustainable Circular Craftsmanship</p>
        </div>

      </div>
    </footer>
  );
};
