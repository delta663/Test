import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, GradientType, ProductStatus } from '../../types';
import { Plus, Edit2, Trash2, Search, SlidersHorizontal, X, Check } from 'lucide-react';

export const ProductManagement: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [nameTh, setNameTh] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [collectionTh, setCollectionTh] = useState('');
  const [collectionEn, setCollectionEn] = useState('');
  const [gradientKey, setGradientKey] = useState<GradientType>('red-orange');
  const [gradientFrom, setGradientFrom] = useState('#B3261E');
  const [gradientTo, setGradientTo] = useState('#E86A17');
  const [price, setPrice] = useState(18900);
  const [stock, setStock] = useState(10);
  const [lowStockThreshold, setLowStockThreshold] = useState(5);
  const [status, setStatus] = useState<ProductStatus>('in_stock');
  const [ppDivertedKg, setPpDivertedKg] = useState(8.5);
  const [descriptionTh, setDescriptionTh] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [image, setImage] = useState('/src/assets/images/chair_red_orange_1790608936533.jpg');

  const openCreateModal = () => {
    setEditingProduct(null);
    setNameTh('');
    setNameEn('');
    setCollectionTh('คอลเลกชัน แดงสู่ส้ม');
    setCollectionEn('Vermilion Dawn Collection');
    setGradientKey('red-orange');
    setGradientFrom('#B3261E');
    setGradientTo('#E86A17');
    setPrice(18900);
    setStock(10);
    setLowStockThreshold(5);
    setStatus('in_stock');
    setPpDivertedKg(8.4);
    setDescriptionTh('เก้าอี้จีนร่วมสมัยหล่อหลอมจากพลาสติก PP รีไซเคิล');
    setDescriptionEn('Contemporary Chinese chair from upcycled industrial PP.');
    setImage('/src/assets/images/chair_red_orange_1790608936533.jpg');
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setNameTh(p.nameTh);
    setNameEn(p.nameEn);
    setCollectionTh(p.collectionTh);
    setCollectionEn(p.collectionEn);
    setGradientKey(p.gradientKey);
    setGradientFrom(p.gradientFrom);
    setGradientTo(p.gradientTo);
    setPrice(p.price);
    setStock(p.stock);
    setLowStockThreshold(p.lowStockThreshold);
    setStatus(p.status);
    setPpDivertedKg(p.ppDivertedKg);
    setDescriptionTh(p.descriptionTh);
    setDescriptionEn(p.descriptionEn);
    setImage(p.image);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, {
        nameTh,
        nameEn,
        collectionTh,
        collectionEn,
        gradientKey,
        gradientFrom,
        gradientTo,
        price,
        stock,
        lowStockThreshold,
        status,
        ppDivertedKg,
        descriptionTh,
        descriptionEn,
        image,
      });
    } else {
      addProduct({
        nameTh,
        nameEn,
        collectionTh,
        collectionEn,
        gradientKey,
        gradientLabel: `${gradientKey} Signature`,
        gradientFrom,
        gradientTo,
        price,
        stock,
        lowStockThreshold,
        status,
        ppDivertedKg,
        descriptionTh,
        descriptionEn,
        image,
        dimensions: { width: 62, depth: 58, height: 82, seatHeight: 46 },
        weightKg: ppDivertedKg,
      });
    }
    setIsModalOpen(false);
  };

  const filtered = products.filter(
    (p) =>
      p.nameTh.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.collectionEn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight">การจัดการสินค้า (Product Management)</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            จัดการรายการสินค้าเก้าอี้จีนร่วมสมัย, ราคาจำหน่าย, Gradient สี, ปริมาณสต็อก และสถานะการขาย
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-lg bg-[#C23E2F] hover:bg-[#A82B1D] text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-md shadow-[#C23E2F]/20"
        >
          <Plus className="w-4 h-4" />
          <span>เพิ่มสินค้าใหม่</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ค้นหาชื่อเก้าอี้, คอลเลกชัน, หรือ Gradient..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
        <span className="text-xs font-mono-num text-neutral-400 shrink-0">
          ทั้งหมด {filtered.length} รายการ
        </span>
      </div>

      {/* High-density Data Table */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/40 text-neutral-400 uppercase tracking-wider text-[10px] border-b border-white/10 font-mono-num">
              <tr>
                <th className="py-3 px-4">รูปภาพ</th>
                <th className="py-3 px-4">ชื่อสินค้า & คอลเลกชัน</th>
                <th className="py-3 px-4">Gradient Palette</th>
                <th className="py-3 px-4 text-right">ราคา (บาท)</th>
                <th className="py-3 px-4 text-center">คงเหลือ (Stock)</th>
                <th className="py-3 px-4 text-center">PP รีไซเคิล</th>
                <th className="py-3 px-4 text-center">สถานะ</th>
                <th className="py-3 px-4 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((prod) => {
                const isLow = prod.stock <= prod.lowStockThreshold;

                return (
                  <tr key={prod.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4">
                      <img
                        src={prod.image}
                        alt={prod.nameEn}
                        className="w-12 h-12 rounded-lg object-cover bg-neutral-900 border border-white/10"
                        referrerPolicy="no-referrer"
                      />
                    </td>

                    <td className="py-3 px-4 max-w-xs">
                      <p className="font-semibold text-white leading-snug truncate">{prod.nameTh}</p>
                      <p className="text-[11px] text-neutral-400 truncate">{prod.nameEn}</p>
                      <p className="text-[10px] text-[#D4AF37] font-mono-num mt-0.5">{prod.collectionEn}</p>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${prod.gradientFrom}, ${prod.gradientTo})`,
                          }}
                        />
                        <span className="font-mono-num text-[11px] text-neutral-300 capitalize">
                          {prod.gradientKey}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right font-mono-num font-semibold text-white">
                      ฿{prod.price.toLocaleString()}
                    </td>

                    <td className="py-3 px-4 text-center font-mono-num">
                      <span className={`font-semibold ${isLow ? 'text-amber-400' : 'text-neutral-200'}`}>
                        {prod.stock}
                      </span>
                      <span className="text-[10px] text-neutral-500 block">เตือนต่ำกว่า {prod.lowStockThreshold}</span>
                    </td>

                    <td className="py-3 px-4 text-center font-mono-num text-emerald-400">
                      {prod.ppDivertedKg} กก.
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-mono-num font-medium ${
                          prod.status === 'in_stock'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : prod.status === 'low_stock'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : prod.status === 'pre_order'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : 'bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        {prod.status === 'in_stock'
                          ? 'พร้อมจำหน่าย'
                          : prod.status === 'low_stock'
                          ? 'สต็อกต่ำ'
                          : prod.status === 'pre_order'
                          ? 'สั่งผลิต Pre-order'
                          : 'เก็บถาวร'}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(prod)}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                          title="แก้ไขสินค้า"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`คุณต้องการลบสินค้า "${prod.nameTh}" หรือไม่?`)) {
                              deleteProduct(prod.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="ลบสินค้า"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#121417] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-auto">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0D0F11]">
              <h3 className="text-sm font-semibold text-white">
                {editingProduct ? 'แก้ไขข้อมูลสินค้า' : 'เพิ่มสินค้าเก้าอี้ใหม่'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-300 block mb-1">ชื่อสินค้า (ภาษาไทย)</label>
                  <input
                    type="text"
                    required
                    value={nameTh}
                    onChange={(e) => setNameTh(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1">ชื่อสินค้า (ภาษาอังกฤษ)</label>
                  <input
                    type="text"
                    required
                    value={nameEn}
                    onChange={(e) => setNameEn(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-300 block mb-1">คอลเลกชัน (ไทย)</label>
                  <input
                    type="text"
                    required
                    value={collectionTh}
                    onChange={(e) => setCollectionTh(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1">คอลเลกชัน (อังกฤษ)</label>
                  <input
                    type="text"
                    required
                    value={collectionEn}
                    onChange={(e) => setCollectionEn(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Gradient & Colors */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-neutral-300 block mb-1">Gradient Scheme</label>
                  <select
                    value={gradientKey}
                    onChange={(e) => setGradientKey(e.target.value as GradientType)}
                    className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="red-orange">Red → Orange</option>
                    <option value="blue-white">Blue → White</option>
                    <option value="green-yellow">Green → Yellow</option>
                    <option value="black-gold">Black → Gold</option>
                  </select>
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1">สีเริ่มต้น (From Hex)</label>
                  <input
                    type="text"
                    value={gradientFrom}
                    onChange={(e) => setGradientFrom(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white font-mono-num"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1">สีปลายทาง (To Hex)</label>
                  <input
                    type="text"
                    value={gradientTo}
                    onChange={(e) => setGradientTo(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white font-mono-num"
                  />
                </div>
              </div>

              {/* Price & Stock */}
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className="text-neutral-300 block mb-1">ราคา (บาท)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white font-mono-num"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1">จำนวนสต็อก</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white font-mono-num"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1">เตือนเมื่อต่ำกว่า</label>
                  <input
                    type="number"
                    required
                    value={lowStockThreshold}
                    onChange={(e) => setLowStockThreshold(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white font-mono-num"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1">PP รีไซเคิล (กก.)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={ppDivertedKg}
                    onChange={(e) => setPpDivertedKg(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white font-mono-num"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="text-neutral-300 block mb-1">สถานะสินค้า</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ProductStatus)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="in_stock">พร้อมจำหน่าย (In Stock)</option>
                  <option value="low_stock">สต็อกต่ำ (Low Stock)</option>
                  <option value="pre_order">สั่งทำล่วงหน้า (Pre-order)</option>
                  <option value="archived">เก็บถาวร (Archived)</option>
                </select>
              </div>

              {/* Image Path */}
              <div>
                <label className="text-neutral-300 block mb-1">ที่อยู่รูปภาพ (Image Path)</label>
                <input
                  type="text"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white font-mono-num"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-neutral-300 block mb-1">คำอธิบายภาษาไทย</label>
                <textarea
                  rows={2}
                  value={descriptionTh}
                  onChange={(e) => setDescriptionTh(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#C23E2F] hover:bg-[#A82B1D] text-white font-semibold"
                >
                  บันทึกข้อมูลสินค้า
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
