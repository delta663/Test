import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { GradientType, ChinesePatternType, CustomConfiguration } from '../../types';
import {
  CloudAbstractSvg,
  DragonMinimalSvg,
  BambooFlowSvg,
  WaveDynamicSvg,
  ChineseSealMark,
} from '../common/ChineseMotifs';
import { X, Sparkles, Check, ShoppingBag, ShieldCheck, Recycle } from 'lucide-react';

export const CustomConfiguratorModal: React.FC = () => {
  const {
    selectedProductForConfig,
    setSelectedProductForConfig,
    addToCart,
    products,
  } = useStore();

  const [activeGradient, setActiveGradient] = useState<GradientType>('red-orange');
  const [activePattern, setActivePattern] = useState<ChinesePatternType>('cloud_abstract');
  const [activeCushion, setActiveCushion] = useState<'charcoal' | 'natural_linen' | 'cinnabar' | 'imperial_gold'>('charcoal');
  const [activeFinish, setActiveFinish] = useState<'tactile_matte' | 'satin_translucent' | 'mineral_grain'>('tactile_matte');
  const [customEngraving, setCustomEngraving] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  // Sync when product opened
  useEffect(() => {
    if (selectedProductForConfig) {
      setActiveGradient(selectedProductForConfig.gradientKey);
    }
  }, [selectedProductForConfig]);

  if (!selectedProductForConfig) return null;

  const currentProduct =
    products.find((p) => p.gradientKey === activeGradient) || selectedProductForConfig;

  const patternOptions: { id: ChinesePatternType; labelTh: string; labelEn: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'cloud_abstract', labelTh: 'เมฆานามธรรม (Cloud)', labelEn: 'Abstract Cloud', icon: CloudAbstractSvg },
    { id: 'dragon_minimal', labelTh: 'มังกรเรขาคณิต (Dragon)', labelEn: 'Minimal Dragon', icon: DragonMinimalSvg },
    { id: 'bamboo_flow', labelTh: 'ข้อปล้องไผ่ (Bamboo)', labelEn: 'Bamboo Flow', icon: BambooFlowSvg },
    { id: 'wave_dynamic', labelTh: 'ระลอกคลื่นจีน (Wave)', labelEn: 'Wave Dynamic', icon: WaveDynamicSvg },
  ];

  const gradientOptions: { id: GradientType; label: string; colors: [string, string] }[] = [
    { id: 'red-orange', label: 'Vermilion Dawn', colors: ['#B3261E', '#E86A17'] },
    { id: 'blue-white', label: 'Cerulean Porcelain', colors: ['#1E3A8A', '#F1F5F9'] },
    { id: 'green-yellow', label: 'Bamboo Jade', colors: ['#166534', '#CA8A04'] },
    { id: 'black-gold', label: 'Imperial Obsidian', colors: ['#18181B', '#EAB308'] },
  ];

  const cushionOptions = [
    { id: 'charcoal' as const, label: 'ถ่านหินชาร์โคล (Charcoal)', colorCode: '#262626' },
    { id: 'natural_linen' as const, label: 'ลินินธรรมชาติ (Linen)', colorCode: '#D6C7B2' },
    { id: 'cinnabar' as const, label: 'แดงชาดหมิง (Cinnabar)', colorCode: '#9E2A2B' },
    { id: 'imperial_gold' as const, label: 'ทองอร่ามหลวง (Imperial Gold)', colorCode: '#C69214' },
  ];

  const finishOptions = [
    { id: 'tactile_matte' as const, label: 'Tactile Matte', desc: 'เนื้อแมตต์ด้านนุ่มนวล สัมผัสคล้ายหินทราเวอร์ทีน' },
    { id: 'satin_translucent' as const, label: 'Satin Translucent', desc: 'เนื้อซาตินโปร่งแสงเล็กน้อย เผยโครงสร้างการไหลของพลาสติก' },
    { id: 'mineral_grain' as const, label: 'Mineral Grain', desc: 'เนื้อเกร็ดแร่อัญมณี ผสมประกายทองเหลืองและเศษ PP ละเอียด' },
  ];

  const handleAddToCart = () => {
    const config: CustomConfiguration = {
      gradientKey: activeGradient,
      pattern: activePattern,
      cushionColor: activeCushion,
      customEngraving: customEngraving.trim() || undefined,
      surfaceFinish: activeFinish,
    };
    addToCart(currentProduct, config, quantity);
    setSelectedProductForConfig(null);
  };

  const SelectedPatternIcon = patternOptions.find((p) => p.id === activePattern)?.icon || CloudAbstractSvg;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#121417] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0D0F11]/60">
          <div className="flex items-center gap-3">
            <ChineseSealMark text="定制" className="w-7 h-7 text-xs border-[#D4AF37] text-[#D4AF37]" />
            <div>
              <h3 className="text-base font-semibold text-white">
                Bespoke Chair Configurator (สตูดิโอปรับแต่งเก้าอี้จีนร่วมสมัย)
              </h3>
              <p className="text-xs text-neutral-400">
                เลือกเฉดสี Gradient, ลวดลายจีนนามธรรม, เบาะรองนั่ง และข้อความสลักเลเซอร์
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedProductForConfig(null)}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[80vh] overflow-y-auto">
          
          {/* Left: Interactive Visual Simulation */}
          <div className="lg:col-span-6 p-6 sm:p-8 bg-[#0A0B0D] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
            
            {/* Visual Canvas Display */}
            <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-neutral-900 group shadow-inner">
              <img
                src={currentProduct.image}
                alt={currentProduct.nameEn}
                className="w-full h-full object-cover transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Dynamic Overlay: Gradient Glow & Abstract Pattern Badge */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                style={{
                  background: `linear-gradient(135deg, ${currentProduct.gradientFrom}, ${currentProduct.gradientTo})`,
                }}
              />

              {/* Pattern Silhouette Watermark in corner */}
              <div className="absolute top-4 left-4 p-3 rounded-lg bg-black/70 backdrop-blur-md border border-white/15 text-[#D4AF37]">
                <SelectedPatternIcon className="w-8 h-8" />
                <span className="block text-[10px] text-neutral-300 mt-1 uppercase tracking-wider font-mono-num">
                  {patternOptions.find((p) => p.id === activePattern)?.labelEn}
                </span>
              </div>

              {/* Laser-engraved Brass Plate Preview */}
              {customEngraving.trim() && (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-sm bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] text-black font-display font-bold text-xs tracking-[0.2em] shadow-xl border border-amber-900/40 select-none text-center">
                  <span>{customEngraving.toUpperCase()}</span>
                </div>
              )}

              {/* Material Spec Tag */}
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded bg-black/70 backdrop-blur-md text-xs text-neutral-300 border border-white/10">
                <Recycle className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono-num">PP {currentProduct.ppDivertedKg} กก.</span>
              </div>
            </div>

            {/* Spec Highlights */}
            <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-neutral-400 block text-[10px]">ขนาด (ซม.)</span>
                <span className="font-mono-num text-white font-medium">
                  {currentProduct.dimensions.width} × {currentProduct.dimensions.depth} × {currentProduct.dimensions.height}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-neutral-400 block text-[10px]">น้ำหนักเก้าอี้</span>
                <span className="font-mono-num text-white font-medium">
                  {currentProduct.weightKg} กก.
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-neutral-400 block text-[10px]">Green Points ได้รับ</span>
                <span className="font-mono-num text-emerald-400 font-semibold">
                  +{Math.round(currentProduct.price * 0.01 * quantity)} pts
                </span>
              </div>
            </div>

          </div>

          {/* Right: Customization Controls */}
          <div className="lg:col-span-6 p-6 sm:p-8 space-y-6">
            
            {/* 1. Gradient Collection Choice */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block mb-2.5">
                1. เลือกโทนสี Gradient (Chinese Contemporary Palette)
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {gradientOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setActiveGradient(opt.id)}
                    className={`p-3 rounded-lg border text-left transition-all flex items-center gap-3 cursor-pointer ${
                      activeGradient === opt.id
                        ? 'border-white bg-white/10 text-white'
                        : 'border-white/10 hover:border-white/20 bg-white/[0.02] text-neutral-300'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full shrink-0 shadow"
                      style={{
                        background: `linear-gradient(135deg, ${opt.colors[0]}, ${opt.colors[1]})`,
                      }}
                    />
                    <div className="truncate">
                      <span className="text-xs font-medium block truncate">{opt.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Abstract Chinese Pattern */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block mb-2.5">
                2. เลือกลวดลายจีนนามธรรม (Chinese Art Motif)
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {patternOptions.map((pat) => {
                  const Icon = pat.icon;
                  return (
                    <button
                      key={pat.id}
                      onClick={() => setActivePattern(pat.id)}
                      className={`p-3 rounded-lg border text-left transition-all flex items-center gap-3 cursor-pointer ${
                        activePattern === pat.id
                          ? 'border-[#C23E2F] bg-[#C23E2F]/15 text-white'
                          : 'border-white/10 hover:border-white/20 bg-white/[0.02] text-neutral-300'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-[#E86A17] shrink-0" />
                      <div className="truncate">
                        <span className="text-xs font-medium block truncate">{pat.labelTh}</span>
                        <span className="text-[10px] text-neutral-400 block">{pat.labelEn}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Surface Finish */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block mb-2.5">
                3. ผิวสัมผัสพื้นผิว (Tactile Finish)
              </label>
              <div className="space-y-2">
                {finishOptions.map((fin) => (
                  <button
                    key={fin.id}
                    onClick={() => setActiveFinish(fin.id)}
                    className={`w-full p-2.5 rounded-lg border text-left transition-all flex items-start gap-3 cursor-pointer ${
                      activeFinish === fin.id
                        ? 'border-white bg-white/10 text-white'
                        : 'border-white/10 hover:border-white/20 bg-white/[0.02] text-neutral-300'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                      activeFinish === fin.id ? 'border-white bg-white' : 'border-neutral-500'
                    }`}>
                      {activeFinish === fin.id && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                    </div>
                    <div>
                      <span className="text-xs font-semibold block">{fin.label}</span>
                      <span className="text-[11px] text-neutral-400 block leading-tight">{fin.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Cushion Linen Color */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block mb-2.5">
                4. สีเบาะรองนั่งผ้าลินินทอมือ
              </label>
              <div className="grid grid-cols-2 gap-2">
                {cushionOptions.map((cush) => (
                  <button
                    key={cush.id}
                    onClick={() => setActiveCushion(cush.id)}
                    className={`p-2.5 rounded-lg border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                      activeCushion === cush.id
                        ? 'border-white bg-white/10 text-white'
                        : 'border-white/10 bg-white/[0.02] text-neutral-300'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                      style={{ backgroundColor: cush.colorCode }}
                    />
                    <span className="text-xs truncate">{cush.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Custom Engraved Brass Nameplate */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block mb-1.5">
                5. สลักชื่อแผ่นทองเหลืองรีไซเคิล Bespoke (Laser Engraved)
              </label>
              <input
                type="text"
                maxLength={24}
                value={customEngraving}
                onChange={(e) => setCustomEngraving(e.target.value)}
                placeholder="เช่น STUDIO CHEN หรือ TANG RESIDENCE"
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/15 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#D4AF37]"
              />
              <span className="text-[11px] text-neutral-400 mt-1 block">
                สลักฟรีสำหรับคำสั่งซื้อออนไลน์ (ตัวอักษรพิมพ์ใหญ่ สูงสุด 24 ตัวอักษร)
              </span>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">ยอดรวม</span>
                <span className="text-xl font-mono-num font-semibold text-white">
                  ฿{(currentProduct.price * quantity).toLocaleString()}
                </span>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-1.5 bg-black/40 border border-white/15 rounded-lg p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 flex items-center justify-center text-neutral-300 hover:text-white cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-mono-num font-medium text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(currentProduct.stock, q + 1))}
                  className="w-7 h-7 flex items-center justify-center text-neutral-300 hover:text-white cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="px-6 py-3 rounded-lg bg-[#C23E2F] hover:bg-[#A82B1D] text-white text-xs font-semibold tracking-wide flex items-center gap-2 transition-all shadow-lg shadow-[#C23E2F]/20 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ยืนยันและใส่ตะกร้า</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
