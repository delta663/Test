import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, GradientType } from '../../types';
import { Sparkles, ShoppingBag, Eye, SlidersHorizontal, Check, Download, Image as ImageIcon } from 'lucide-react';

export const CollectionSection: React.FC = () => {
  const { products, setSelectedProductForConfig, addToCart } = useStore();
  const [selectedFilter, setSelectedFilter] = useState<'all' | GradientType>('all');
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  const filteredProducts =
    selectedFilter === 'all'
      ? products
      : products.filter((p) => p.gradientKey === selectedFilter);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, {
      gradientKey: product.gradientKey,
      pattern: 'cloud_abstract',
      cushionColor: 'charcoal',
      surfaceFinish: 'tactile_matte',
    });
    setQuickAddedId(product.id);
    setTimeout(() => setQuickAddedId(null), 1800);
  };

  return (
    <section id="collection-section" className="py-20 lg:py-28 border-b border-white/10 bg-[#0D0F11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium mb-2">
              02. Signature Gradient Collections
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                4 คอลเลกชันเก้าอี้จีนร่วมสมัย
              </h2>
              <a
                href="/downloads/contemporary_ming_chairs_collection.zip"
                download="contemporary_ming_chairs_collection.zip"
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 transition-colors"
                title="ดาวน์โหลดไฟล์รูปภาพทั้งหมดรวมเป็น ZIP"
              >
                <Download className="w-3 h-3" />
                <span>โหลดรูปทั้งหมด (ZIP 4.3MB)</span>
              </a>
              <a
                href="/download-images.html"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md bg-white/10 hover:bg-white/20 text-neutral-200 border border-white/20 transition-colors"
              >
                <ImageIcon className="w-3 h-3" />
                <span>หน้าคลังรูปภาพ</span>
              </a>
            </div>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              แต่ละชิ้นงานถ่ายทอดการไหลตัวของเฉดสีมงคลและสัจจะวัสดุของ PP บริสุทธิ์ หล่อหลอมใหม่ด้วยมือร่วมกับหุ่นยนต์หล่อความดันสูง
            </p>
          </div>

          {/* Interactive Filter Tabs (Button Segmented Controls) */}
          <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl overflow-x-auto max-w-full">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              ทั้งหมด (All 4)
            </button>
            <button
              onClick={() => setSelectedFilter('red-orange')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                selectedFilter === 'red-orange'
                  ? 'bg-[#B3261E] text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-red-600 to-orange-500" />
              <span>Red → Orange</span>
            </button>
            <button
              onClick={() => setSelectedFilter('blue-white')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                selectedFilter === 'blue-white'
                  ? 'bg-[#1E3A8A] text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-700 to-slate-200" />
              <span>Blue → White</span>
            </button>
            <button
              onClick={() => setSelectedFilter('green-yellow')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                selectedFilter === 'green-yellow'
                  ? 'bg-[#166534] text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-green-700 to-yellow-500" />
              <span>Green → Yellow</span>
            </button>
            <button
              onClick={() => setSelectedFilter('black-gold')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                selectedFilter === 'black-gold'
                  ? 'bg-[#27272A] text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-black to-amber-400" />
              <span>Black → Gold</span>
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
            const isLowStock = product.stock <= product.lowStockThreshold;

            return (
              <div
                key={product.id}
                className="group rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Product Image Slot */}
                <div
                  onClick={() => setSelectedProductForConfig(product)}
                  className="relative aspect-[4/3] bg-neutral-900 overflow-hidden cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.nameEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Gradient Swatch Overlay */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-white">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})`,
                      }}
                    />
                    <span className="font-mono-num">{product.gradientLabel.split(' ')[0]}</span>
                  </div>

                  {/* Stock or Eco Tag (Unboxed clean text) */}
                  <div className="absolute top-3 right-3 text-[11px] font-mono-num px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10">
                    {isLowStock ? (
                      <span className="text-amber-400">เหลือเพียง {product.stock} ตัว</span>
                    ) : (
                      <span className="text-neutral-300">คงเหลือ {product.stock} ตัว</span>
                    )}
                  </div>

                  {/* Hover Quick Action */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProductForConfig(product);
                      }}
                      className="px-3 py-2 rounded-lg bg-white text-black text-xs font-semibold flex items-center gap-1.5 shadow-lg hover:bg-neutral-100 cursor-pointer"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>ปรับแต่ง</span>
                    </button>
                    <a
                      href={product.image.replace("/src/assets/images/", "/downloads/")}
                      download
                      onClick={(e) => e.stopPropagation()}
                      title="ดาวน์โหลดรูปภาพไฟล์ต้นฉบับ"
                      className="p-2 rounded-lg bg-black/80 hover:bg-black text-white border border-white/20 text-xs font-semibold flex items-center gap-1 shadow-lg transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-neutral-200" />
                    </a>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Collection Metadata */}
                    <div className="text-[11px] text-[#D4AF37] font-medium tracking-wider uppercase mb-1">
                      {product.collectionEn}
                    </div>

                    <h3
                      onClick={() => setSelectedProductForConfig(product)}
                      className="text-base font-semibold text-white group-hover:text-[#E86A17] transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.nameTh}
                    </h3>

                    <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                      {product.descriptionTh}
                    </p>

                    {/* Unboxed Metadata with · separator */}
                    <div className="mt-3 flex items-center gap-2 text-xs text-neutral-400 font-mono-num">
                      <span>รีไซเคิล PP {product.ppDivertedKg} กก.</span>
                      <span aria-hidden="true">·</span>
                      <span>กว้าง {product.dimensions.width} ซม.</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-400">รับ +{Math.round(product.price * 0.01)} Green Pts</span>
                    </div>
                  </div>

                  {/* Price & Add to Cart Action */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">ราคาเริ่มต้น</span>
                      <span className="text-lg font-mono-num font-semibold text-white">
                        ฿{product.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                          quickAddedId === product.id
                            ? 'bg-emerald-600 border-emerald-500 text-white'
                            : 'bg-white/5 border-white/10 hover:border-white/25 text-white hover:bg-white/10'
                        }`}
                        title="สั่งซื้อทันที (มาตรฐาน)"
                      >
                        {quickAddedId === product.id ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <ShoppingBag className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        onClick={() => setSelectedProductForConfig(product)}
                        className="px-3.5 py-2.5 rounded-lg bg-[#C23E2F] hover:bg-[#A82B1D] text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>ปรับแต่ง</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
