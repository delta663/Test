import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderStatus } from '../../types';
import {
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  Wrench,
  Truck,
  CheckCheck,
  XCircle,
  CreditCard,
  X,
  Send,
} from 'lucide-react';

export const OrderManagement: React.FC = () => {
  const { orders, updateOrderStatus } = useStore();
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'all' | OrderStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeOrderDetails, setActiveOrderDetails] = useState<Order | null>(null);
  const [newTrackingNum, setNewTrackingNum] = useState('');

  const statusConfig: { [key in OrderStatus]: { label: string; color: string; icon: React.FC<{ className?: string }> } } = {
    new: { label: 'New Order (ใหม่)', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', icon: Clock },
    paid: { label: 'Paid (ชำระแล้ว)', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: CreditCard },
    processing: { label: 'Processing (เตรียมวัตถุดิบ)', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', icon: Clock },
    customizing: { label: 'Customizing (กำลังหล่อ/สลัก)', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20', icon: Wrench },
    shipping: { label: 'Shipping (กำลังจัดส่ง)', color: 'bg-sky-500/10 text-sky-400 border-sky-500/20', icon: Truck },
    completed: { label: 'Completed (เสร็จสิ้น)', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', icon: CheckCheck },
    cancelled: { label: 'Cancelled (ยกเลิก)', color: 'bg-red-500/10 text-red-400 border-red-500/20', icon: XCircle },
  };

  const filteredOrders = orders.filter((o) => {
    const matchesFilter = selectedStatusFilter === 'all' || o.status === selectedStatusFilter;
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.phone.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status);
    if (activeOrderDetails && activeOrderDetails.id === orderId) {
      setActiveOrderDetails((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const handleSaveTracking = (orderId: string) => {
    if (!newTrackingNum.trim()) return;
    updateOrderStatus(orderId, activeOrderDetails?.status || 'shipping', newTrackingNum.trim());
    if (activeOrderDetails && activeOrderDetails.id === orderId) {
      setActiveOrderDetails((prev) => (prev ? { ...prev, trackingNumber: newTrackingNum.trim() } : null));
    }
    setNewTrackingNum('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight">การจัดการคำสั่งซื้อ (Order Management Pipeline)</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            ติดตามสถานะคำสั่งซื้อจากหน้าร้าน, อัปเดตขั้นตอนการหล่อแบบ Customizing, ออกเลขพัสดุกล่องไม้หมุนเวียน
          </p>
        </div>
      </div>

      {/* Filter Tabs (Button segmented controls) */}
      <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl overflow-x-auto text-xs">
        <button
          onClick={() => setSelectedStatusFilter('all')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
            selectedStatusFilter === 'all' ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
          }`}
        >
          ทั้งหมด ({orders.length})
        </button>

        {(['new', 'paid', 'processing', 'customizing', 'shipping', 'completed', 'cancelled'] as OrderStatus[]).map(
          (status) => {
            const count = orders.filter((o) => o.status === status).length;
            const cfg = statusConfig[status];

            return (
              <button
                key={status}
                onClick={() => setSelectedStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  selectedStatusFilter === status ? 'bg-[#C23E2F] text-white font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cfg.label.split(' ')[0]} ({count})
              </button>
            );
          }
        )}
      </div>

      {/* Search Input */}
      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center gap-3">
        <Search className="w-4 h-4 text-neutral-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="ค้นหาตามเลขที่คำสั่งซื้อ, ชื่อลูกค้า, หรือเบอร์โทรศัพท์..."
          className="flex-1 bg-transparent text-white text-xs placeholder-neutral-500 focus:outline-none"
        />
      </div>

      {/* Orders Table */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/40 text-neutral-400 uppercase tracking-wider text-[10px] border-b border-white/10 font-mono-num">
              <tr>
                <th className="py-3 px-4">เลขที่สั่งซื้อ</th>
                <th className="py-3 px-4">วัน-เวลา</th>
                <th className="py-3 px-4">ข้อมูลลูกค้า</th>
                <th className="py-3 px-4">รายการสินค้า</th>
                <th className="py-3 px-4 text-right">ยอดสุทธิ</th>
                <th className="py-3 px-4 text-center">สถานะคำสั่งซื้อ</th>
                <th className="py-3 px-4 text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.map((ord) => {
                const cfg = statusConfig[ord.status];
                const StatusIcon = cfg.icon;

                return (
                  <tr key={ord.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-mono-num font-semibold text-white">
                      #{ord.orderNumber}
                    </td>

                    <td className="py-3 px-4 font-mono-num text-neutral-400 whitespace-nowrap">
                      {ord.createdAt}
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-semibold text-white">{ord.customerName}</p>
                      <p className="text-[11px] text-neutral-400 font-mono-num">{ord.phone}</p>
                      <p className="text-[10px] text-neutral-500 truncate max-w-xs">{ord.province}</p>
                    </td>

                    <td className="py-3 px-4">
                      {ord.items.map((i, idx) => (
                        <div key={idx} className="text-[11px] text-neutral-300 truncate max-w-xs">
                          {i.quantity}x {i.productName}
                          {i.config.customEngraving && (
                            <span className="text-[#D4AF37] block font-mono-num text-[10px]">
                              [สลัก: {i.config.customEngraving}]
                            </span>
                          )}
                        </div>
                      ))}
                    </td>

                    <td className="py-3 px-4 text-right font-mono-num font-bold text-[#D4AF37]">
                      ฿{ord.total.toLocaleString()}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] border font-medium ${cfg.color}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        <span>{cfg.label.split(' ')[0]}</span>
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          setActiveOrderDetails(ord);
                          setNewTrackingNum(ord.trackingNumber || '');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium border border-white/10 transition-colors cursor-pointer"
                      >
                        ดูรายละเอียด
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details & Status Updater Modal Drawer */}
      {activeOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#121417] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-auto">
            
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0D0F11]">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  คำสั่งซื้อ #{activeOrderDetails.orderNumber}
                </h3>
                <span className="text-xs text-neutral-400 font-mono-num">
                  สั่งซื้อเมื่อ {activeOrderDetails.createdAt} น.
                </span>
              </div>
              <button
                onClick={() => setActiveOrderDetails(null)}
                className="text-neutral-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs">
              
              {/* Quick Status Update Selector */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <label className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold block">
                  อัปเดตสถานะคำสั่งซื้อ (Order Status)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['new', 'paid', 'processing', 'customizing', 'shipping', 'completed', 'cancelled'] as OrderStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(activeOrderDetails.id, st)}
                      className={`p-2 rounded-lg border text-center transition-all cursor-pointer font-medium text-xs ${
                        activeOrderDetails.status === st
                          ? 'bg-[#C23E2F] text-white border-white'
                          : 'bg-white/5 border-white/10 text-neutral-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {statusConfig[st].label.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tracking Number Input */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <label className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold block">
                  หมายเลขติดตามพัสดุกล่องไม้หมุนเวียน (Tracking Number)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTrackingNum}
                    onChange={(e) => setNewTrackingNum(e.target.value)}
                    placeholder="เช่น CRF-EXP-88912 หรือ KEX-TH902188471"
                    className="flex-1 px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white font-mono-num"
                  />
                  <button
                    onClick={() => handleSaveTracking(activeOrderDetails.id)}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold cursor-pointer"
                  >
                    บันทึกเลขพัสดุ
                  </button>
                </div>
              </div>

              {/* Customer and Shipping Details */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-black/30 border border-white/10 font-mono-num">
                <div>
                  <span className="text-neutral-400 block text-[10px]">ผู้รับสินค้า</span>
                  <p className="text-white font-semibold font-sans">{activeOrderDetails.customerName}</p>
                  <p className="text-neutral-300">{activeOrderDetails.phone}</p>
                  <p className="text-neutral-400">{activeOrderDetails.email}</p>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px]">ที่อยู่จัดส่ง</span>
                  <p className="text-neutral-300 font-sans">
                    {activeOrderDetails.address} {activeOrderDetails.district} {activeOrderDetails.province} {activeOrderDetails.postalCode}
                  </p>
                  <p className="text-[#D4AF37] mt-1 font-sans">วิธีชำระ: {activeOrderDetails.paymentMethod.toUpperCase()}</p>
                </div>
              </div>

              {/* Items Breakdown */}
              <div>
                <h4 className="text-neutral-300 font-semibold mb-2">รายการสินค้าในคำสั่งซื้อ</h4>
                <div className="space-y-2">
                  {activeOrderDetails.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-12 h-12 rounded object-cover bg-neutral-900 border border-white/10 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-semibold text-white">{item.productName}</p>
                          <p className="text-neutral-400 text-[11px] font-mono-num">
                            Gradient: {item.config.gradientKey} · ลาย: {item.config.pattern} · เบาะ: {item.config.cushionColor}
                          </p>
                          {item.config.customEngraving && (
                            <p className="text-amber-300 font-display text-[11px]">
                              สลักชื่อเลเซอร์: "{item.config.customEngraving}"
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right font-mono-num">
                        <span className="text-white font-semibold">
                          ฿{(item.price * item.quantity).toLocaleString()}
                        </span>
                        <span className="block text-neutral-400 text-[10px]">({item.quantity} ตัว)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="pt-3 border-t border-white/10 space-y-1 text-right font-mono-num">
                <p className="text-neutral-400">ยอดรวมสินค้า: ฿{activeOrderDetails.subtotal.toLocaleString()}</p>
                {activeOrderDetails.discount > 0 && (
                  <p className="text-emerald-400">ส่วนลด Green Points: -฿{activeOrderDetails.discount.toLocaleString()}</p>
                )}
                <p className="text-neutral-400">ค่าจัดส่ง: {activeOrderDetails.shippingFee === 0 ? 'ฟรี' : `฿${activeOrderDetails.shippingFee}`}</p>
                <p className="text-sm font-bold text-white pt-1">
                  ยอดชำระสุทธิ: <span className="text-[#D4AF37]">฿{activeOrderDetails.total.toLocaleString()}</span>
                </p>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
