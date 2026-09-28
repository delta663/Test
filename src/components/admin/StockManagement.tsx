import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  AlertTriangle,
  History,
  Layers,
  Filter,
  CheckCircle,
} from 'lucide-react';

export const StockManagement: React.FC = () => {
  const {
    products,
    stockMovements,
    stockIn,
    stockOut,
    lowStockProducts,
  } = useStore();

  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [modalType, setModalType] = useState<'in' | 'out' | null>(null);
  const [quantity, setQuantity] = useState(5);
  const [reason, setReason] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [movementFilter, setMovementFilter] = useState<'all' | 'in' | 'out'>('all');

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  const handleStockAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || quantity <= 0) return;

    if (modalType === 'in') {
      stockIn(
        selectedProduct.id,
        quantity,
        reason || 'นำเข้าสินค้าจากการหล่อขึ้นรูป Batch ประจำวัน',
        'เจ้าหน้าที่คลังสินค้า',
        batchNumber || `BATCH-PP-${Date.now().toString().slice(-4)}`
      );
    } else if (modalType === 'out') {
      stockOut(
        selectedProduct.id,
        quantity,
        reason || 'เบิกสินค้าเพื่อส่งออกโชว์รูมหรือจำหน่าย',
        'เจ้าหน้าที่คลังสินค้า'
      );
    }

    setModalType(null);
    setReason('');
    setBatchNumber('');
  };

  const filteredMovements =
    movementFilter === 'all'
      ? stockMovements
      : stockMovements.filter((m) => m.type === movementFilter);

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight">ระบบคลังสินค้า & สต็อกวัตถุดิบ (Stock Management)</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            ตรวจนับสต็อกคงเหลือ, บันทึกการรับเข้า (Stock In), ตัดจำหน่าย (Stock Out) และประวัติการเคลื่อนไหว
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setModalType('in');
              setReason('รับเข้าสินค้าจากการหล่อชิ้นงาน Batch ใหม่');
            }}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowDownCircle className="w-4 h-4" />
            <span>รับเข้าสต็อก (Stock In)</span>
          </button>

          <button
            onClick={() => {
              setModalType('out');
              setReason('เบิกสินค้าส่งโชว์รูม หรือความเสียหาย');
            }}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-neutral-200 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer border border-white/15"
          >
            <ArrowUpCircle className="w-4 h-4 text-amber-400" />
            <span>ตัดสต็อกออก (Stock Out)</span>
          </button>
        </div>
      </div>

      {/* Low Stock Warning Banner if applicable */}
      {lowStockProducts.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-amber-300">
                แจ้งเตือน: มีสินค้าคงคลังต่ำกว่าเกณฑ์ความปลอดภัย {lowStockProducts.length} รายการ
              </p>
              <p className="text-[11px] text-neutral-400">
                {lowStockProducts.map((p) => `${p.nameTh} (เหลือ ${p.stock} ตัว)`).join(', ')}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedProductId(lowStockProducts[0].id);
              setModalType('in');
            }}
            className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold transition-colors cursor-pointer shrink-0"
          >
            สั่งเติมสต็อกด่วน
          </button>
        </div>
      )}

      {/* Current Inventory Grid */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#D4AF37]" />
          <span>ยอดสต็อกคงเหลือปัจจุบัน (Current Inventory Balance)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => {
            const isLow = p.stock <= p.lowStockThreshold;

            return (
              <div
                key={p.id}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-4 hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={p.image}
                    alt={p.nameEn}
                    className="w-12 h-12 rounded-lg object-cover bg-neutral-900 border border-white/10 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-semibold text-white truncate">{p.nameTh}</h4>
                    <p className="text-[10px] text-neutral-400 font-mono-num">{p.collectionEn}</p>
                    <p className="text-[10px] text-emerald-400 font-mono-num mt-0.5">
                      PP: {p.ppDivertedKg} กก./ตัว
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">คงเหลือ</span>
                    <span className={`text-2xl font-mono-num font-bold ${isLow ? 'text-amber-400' : 'text-white'}`}>
                      {p.stock} <span className="text-xs font-normal text-neutral-400">ตัว</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setSelectedProductId(p.id);
                        setModalType('in');
                      }}
                      className="p-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/20 text-xs transition-colors"
                      title="รับเข้าสต็อก"
                    >
                      <ArrowDownCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProductId(p.id);
                        setModalType('out');
                      }}
                      className="p-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/20 text-xs transition-colors"
                      title="ตัดสต็อก"
                    >
                      <ArrowUpCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stock Movement History Table */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-neutral-400" />
            <h3 className="text-sm font-semibold text-white">ประวัติการเคลื่อนไหวสต็อก (Stock Movement Audit Log)</h3>
          </div>

          {/* Segmented Filter */}
          <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-lg text-xs">
            <button
              onClick={() => setMovementFilter('all')}
              className={`px-2.5 py-1 rounded transition-colors ${
                movementFilter === 'all' ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              ทั้งหมด ({stockMovements.length})
            </button>
            <button
              onClick={() => setMovementFilter('in')}
              className={`px-2.5 py-1 rounded transition-colors ${
                movementFilter === 'in' ? 'bg-emerald-600 text-white font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              รับเข้า (In)
            </button>
            <button
              onClick={() => setMovementFilter('out')}
              className={`px-2.5 py-1 rounded transition-colors ${
                movementFilter === 'out' ? 'bg-amber-600 text-white font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              ตัดออก (Out)
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/40 text-neutral-400 uppercase tracking-wider text-[10px] border-b border-white/10 font-mono-num">
              <tr>
                <th className="py-3 px-4">วัน-เวลา</th>
                <th className="py-3 px-4">สินค้า</th>
                <th className="py-3 px-4 text-center">ประเภท</th>
                <th className="py-3 px-4 text-center">จำนวน</th>
                <th className="py-3 px-4 text-center">คงเหลือหลังทำรายการ</th>
                <th className="py-3 px-4">เหตุผล / เลขที่ Batch</th>
                <th className="py-3 px-4 text-right">ผู้ทำรายการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredMovements.map((m) => (
                <tr key={m.id} className="hover:bg-white/[0.02] transition-colors font-mono-num">
                  <td className="py-3 px-4 text-neutral-400">{m.timestamp}</td>
                  <td className="py-3 px-4 font-semibold text-white font-sans">{m.productName}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                        m.type === 'in'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {m.type === 'in' ? '+ รับเข้า (IN)' : '- ตัดออก (OUT)'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-white">
                    {m.type === 'in' ? `+${m.quantity}` : `-${m.quantity}`}
                  </td>
                  <td className="py-3 px-4 text-center text-neutral-300">{m.remainingStock}</td>
                  <td className="py-3 px-4 font-sans text-neutral-300">
                    {m.reason} {m.batchNumber && <span className="text-[#D4AF37] font-mono-num">[{m.batchNumber}]</span>}
                  </td>
                  <td className="py-3 px-4 text-right text-neutral-400 font-sans">{m.performedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock In / Out Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#121417] border border-white/15 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
            <h3 className="text-base font-semibold text-white">
              {modalType === 'in' ? 'รับสินค้าเข้าสต็อก (Stock In)' : 'ตัดสินค้าออกจากสต็อก (Stock Out)'}
            </h3>

            <form onSubmit={handleStockAction} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-300 block mb-1">เลือกสินค้า</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nameTh} (คงเหลือ: {p.stock} ตัว)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">จำนวน (ตัว)</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white font-mono-num"
                />
              </div>

              {modalType === 'in' && (
                <div>
                  <label className="text-neutral-300 block mb-1">รหัส Batch การหล่อ (ไม่บังคับ)</label>
                  <input
                    type="text"
                    placeholder="เช่น CRF-PP-0928-C"
                    value={batchNumber}
                    onChange={(e) => setBatchNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white font-mono-num"
                  />
                </div>
              )}

              <div>
                <label className="text-neutral-300 block mb-1">เหตุผลในการทำรายการ</label>
                <textarea
                  rows={2}
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2 rounded-lg text-white font-semibold ${
                    modalType === 'in' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-amber-600 hover:bg-amber-500'
                  }`}
                >
                  ยืนยันทำรายการ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
