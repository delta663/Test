import React from 'react';
import { useStore } from '../../context/StoreContext';
import { HERO_IMAGE } from '../../data/initialData';
import { ArrowRight, Recycle, Sparkles, ShieldCheck } from 'lucide-react';
import { CloudAbstractSvg, WaveDynamicSvg } from '../common/ChineseMotifs';

export const HeroSection: React.FC = () => {
  const { setStorefrontTab, setSelectedProductForConfig, products } = useStore();

  const handleExplore = () => {
    setStorefrontTab('collection');
    const target = document.getElementById('collection-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConfigureHeroChair = () => {
    // Open vermilion dawn product directly
    const heroProd = products[0];
    if (heroProd) {
      setSelectedProductForConfig(heroProd);
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-white/10 bg-radial from-[#1A1F26] via-[#0D0F11] to-[#0A0B0D]">
      {/* Delicate background ambient gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B3261E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#CA8A04]/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Water wave and cloud decorative accents */}
      <div className="absolute top-12 left-6 text-white/5 pointer-events-none">
        <CloudAbstractSvg className="w-28 h-28" />
      </div>
      <div className="absolute bottom-6 right-8 text-white/5 pointer-events-none">
        <WaveDynamicSvg className="w-40 h-40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Thesis & Story Hook */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs text-[#D4AF37] uppercase tracking-[0.25em] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#C23E2F]" />
              <span>Chinese Contemporary Upcycled Furniture</span>
              <span className="text-white/20">/</span>
              <span>100% Recycled PP</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.2] text-balance">
              เปลี่ยนพลาสติก <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E86A17] to-[#D4AF37]">PP เหลือใช้</span> สู่เก้าอี้จีนร่วมสมัยที่ไม่มีใครเหมือน
            </h1>

            <p className="text-base text-neutral-300 leading-relaxed font-light">
              <strong className="font-medium text-white">CHINA RE:FORM</strong> คัดสรรเศษพลาสติกพอลิโพรพีลีน (PP) บริสุทธิ์เกรดอุตสาหกรรมจากโรงงานผลิต นำมาขึ้นรูปใหม่ด้วยเทคนิคการหล่อหลอมไล่เฉดสี (Gradient Casting) ถ่ายทอดความสง่างามของเก้าอี้ราชวงศ์หมิงในรูปแบบสัจจะวัสดุโมเดิร์น
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={handleExplore}
                className="px-6 py-3.5 rounded-lg bg-[#C23E2F] hover:bg-[#A82B1D] text-white text-sm font-medium tracking-wide flex items-center gap-2.5 transition-all shadow-lg shadow-[#C23E2F]/20 cursor-pointer"
              >
                <span>สำรวจ 4 คอลเลกชัน</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleConfigureHeroChair}
                className="px-6 py-3.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white border border-white/15 text-sm font-medium tracking-wide flex items-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>จำลองการปรับแต่งเก้าอี้ (Bespoke)</span>
              </button>
            </div>

            {/* Ecological Impact Metrics */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-6">
              <div>
                <p className="text-2xl font-mono-num font-semibold text-white">14,820 <span className="text-sm font-normal text-neutral-400">กก.</span></p>
                <p className="text-xs text-neutral-400 mt-1">PP ที่กู้คืนจากโรงงาน</p>
              </div>
              <div>
                <p className="text-2xl font-mono-num font-semibold text-[#D4AF37]">4 <span className="text-sm font-normal text-neutral-400">เฉด</span></p>
                <p className="text-xs text-neutral-400 mt-1">Chinese Gradients</p>
              </div>
              <div>
                <p className="text-2xl font-mono-num font-semibold text-emerald-400">100%</p>
                <p className="text-xs text-neutral-400 mt-1">หล่อหมุนเวียนซ้ำได้</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 bg-neutral-900 shadow-2xl group">
              <img
                src={HERO_IMAGE}
                alt="CHINA RE:FORM Contemporary Chinese Horseshoe Chair crafted from upcycled industrial polypropylene"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              
              {/* Subtle scrim for editorial overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

              {/* Bottom Tag */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-300">
                <div className="flex items-center gap-2 backdrop-blur-md bg-black/60 px-3 py-1.5 rounded-md border border-white/10">
                  <Recycle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>กู้คืนพลาสติก 8.4 กิโลกรัมต่อหนึ่งตัว</span>
                </div>
                <div className="flex items-center gap-1.5 backdrop-blur-md bg-black/60 px-3 py-1.5 rounded-md border border-white/10 font-mono-num text-[#D4AF37]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>รับประกันโครงสร้าง 10 ปี</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
