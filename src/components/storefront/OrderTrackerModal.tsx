import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderStatus } from '../../types';
import {
  Search,
  CheckCircle,
  Clock,
  Wrench,
  Truck,
  PackageCheck,
  XCircle,
  CreditCard,
  Sparkles,
} from 'lucide-react';
import { ChineseSealMark } from '../common/ChineseMotifs';

export const OrderTrackerModal: React.FC = () => {
  const { orders, selectedOrderForLookup, setSelectedOrderForLookup } = useStore();
  const [searchInput, setSearchInput] = useState('');

  const activeOrder: Order | undefined =
    selectedOrderForLookup ||
    orders.find((o) => o.orderNumber.toLowerCase() === searchInput.trim().toLowerCase()) ||
    orders[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find(
      (o) =>
        o.orderNumber.toLowerCase().includes(searchInput.trim().toLowerCase()) ||
        o.phone.includes(searchInput.trim())
    );
    if (found) {
      setSelectedOrderForLookup(found);
    }
  };

  const statusSteps: { key: OrderStatus; label: string; icon: React.FC<{ className?: string }> }[] = [
    { key: 'new', label: 'รับคำสั่งซื้อ', icon: Clock },
    { key: 'paid', label: 'ชำระเงินแล้ว', icon: CreditCard },
    { key: 'processing', label: 'เตรียม PP รีไซเคิล', icon: Clock },
    { key: 'customizing', label: 'หล่อหลอม & ปรับแต่ง', icon: Wrench },
    { key: 'shipping', label: 'จัดส่งกล่องหมุนเวียน', icon: Truck },
    { key: 'completed', label: 'ส่งมอบสำเร็จ', icon: PackageCheck },
  ];

  const getStepIndex = (status: OrderStatus) => {
    if (status === 'cancelled') return -1;
    return statusSteps.findIndex((s) => s.key === status);
  };

  const currentStepIdx = activeOrder ? getStepIndex(activeOrder.status) : 0;

  return (
    <section className="py-20 lg:py-24 border-b border-white/10 bg-[#0D0F11]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
            <ChineseSealMark text="查单" className="w-6 h-6 text-[10px] border-[#D4AF37] text-[#D4AF37]" />
            <span>Order Tracking & Circular Provenance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            ติดตามสถานะคำสั่งซื้อ & ความคืบหน้าการหล่อชิ้นงาน
          </h2>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            ตรวจสอบขั้นตอนการคัดแยกพลาสติก PP, การขึ้นรูปไล่เฉด Gradient, การสลักชื่อ และการจัดส่ง
          </p>
        </div>

        {/* Search Bar & Fast Select */}
        <div className="bg-[#121417] p-5 rounded-2xl border border-white/10 space-y-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="ระบุเลขที่คำสั่งซื้อ (เช่น CRF-2026-1049) หรือเบอร์โทรศัพท์"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-black/50 border border-white/15 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-[#C23E2F] hover:bg-[#A82B1D] text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer"
            >
              ค้นหา
            </button>
          </form>

          {/* Quick Order Selector Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs text-neutral-400 pt-2 border-t border-white/5">
            <span className="shrink-0 text-[11px] text-neutral-500">ดูตัวอย่างคำสั่งซื้อ:</span>
            {orders.slice(0, 4).map((ord) => (
              <button
                key={ord.id}
                onClick={() => setSelectedOrderForLookup(ord)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono-num transition-colors whitespace-nowrap cursor-pointer ${
                  activeOrder?.id === ord.id
                    ? 'bg-white text-black font-semibold'
                    : 'bg-white/5 hover:bg-white/10 text-neutral-300'
                }`}
              >
                #{ord.orderNumber} ({ord.customerName.split(' ')[0]})
              </button>
            ))}
          </div>
        </div>

        {/* Order Details View */}
        {activeOrder && (
          <div className="rounded-2xl bg-[#121417] border border-white/15 overflow-hidden shadow-xl">
            
            {/* Top Bar of Card */}
            <div className="p-6 border-b border-white/10 bg-[#0D0F11]/60 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">คำสั่งซื้อ</span>
                <span className="text-lg font-mono-num font-semibold text-white">
                  #{activeOrder.orderNumber}
                </span>
                <span className="text-xs text-neutral-400 block mt-0.5">
                  สั่งซื้อเมื่อ: {activeOrder.createdAt} น.
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">ผู้สั่งซื้อ</span>
                <span className="text-sm font-semibold text-white">{activeOrder.customerName}</span>
                <span className="text-xs text-neutral-400 block">{activeOrder.phone}</span>
              </div>
            </div>

            {/* Stepper Pipeline */}
            <div className="p-6 sm:p-8 border-b border-white/10 bg-black/20">
              <div className="relative">
                
                {/* Connecting Track */}
                <div className="hidden sm:block absolute top-1/2 left-6 right-6 -translate-y-1/2 h-0.5 bg-white/10 z-0" />
                <div
                  className="hidden sm:block absolute top-1/2 left-6 -translate-y-1/2 h-0.5 bg-gradient-to-r from-emerald-500 to-[#D4AF37] transition-all duration-500 z-0"
                  style={{
                    width: `${Math.max(0, (currentStepIdx / (statusSteps.length - 1)) * 100)}%`,
                  }}
                />

                {/* Steps Nodes */}
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 relative z-10">
                  {statusSteps.map((step, idx) => {
                    const isDone = currentStepIdx >= idx;
                    const isCurrent = currentStepIdx === idx;
                    const StepIcon = step.icon;

                    return (
                      <div key={step.key} className="flex flex-col items-center text-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors mb-2 border ${
                            isCurrent
                              ? 'bg-[#C23E2F] border-white text-white shadow-lg shadow-[#C23E2F]/40'
                              : isDone
                              ? 'bg-emerald-600 border-emerald-400 text-white'
                              : 'bg-neutral-800 border-white/10 text-neutral-500'
                          }`}
                        >
                          {isDone && !isCurrent ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <StepIcon className="w-4 h-4" />
                          )}
                        </div>
                        <span
                          className={`text-xs font-medium leading-tight ${
                            isCurrent ? 'text-[#D4AF37] font-semibold' : isDone ? 'text-white' : 'text-neutral-500'
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Delivery Carrier & Tracking Number */}
              {activeOrder.trackingNumber && (
                <div className="mt-8 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-400" />
                    <span className="text-white font-medium">หมายเลขติดตามพัสดุกล่องไม้หมุนเวียน (Reusable Crate):</span>
                    <span className="font-mono-num font-semibold text-emerald-300">
                      {activeOrder.trackingNumber}
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-400">ขนส่งควบคุมพิเศษ 2-3 วัน</span>
                </div>
              )}
            </div>

            {/* Itemized Customized Configuration Review */}
            <div className="p-6 space-y-4">
              <h4 className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
                รายการเก้าอี้และรายละเอียดสเปกพิเศษ
              </h4>

              <div className="space-y-3">
                {activeOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-16 h-16 rounded-lg object-cover bg-neutral-900 border border-white/10 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h5 className="text-sm font-semibold text-white">{item.productName}</h5>
                        <div className="text-xs text-neutral-400 font-mono-num space-x-2 mt-0.5">
                          <span className="text-[#D4AF37]">Gradient: {item.config.gradientKey}</span>
                          <span>·</span>
                          <span>ลาย: {item.config.pattern}</span>
                          <span>·</span>
                          <span>จำนวน: {item.quantity} ตัว</span>
                        </div>
                        {item.config.customEngraving && (
                          <div className="mt-1 text-xs text-amber-300 font-display font-medium">
                            ★ สลักชื่อเลเซอร์: "{item.config.customEngraving}"
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-right font-mono-num shrink-0">
                      <span className="text-sm font-semibold text-white">
                        ฿{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals Summary */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-num">
                <div className="space-y-1 text-neutral-400">
                  <p>ที่อยู่: {activeOrder.address} {activeOrder.district} {activeOrder.province} {activeOrder.postalCode}</p>
                  <p>วิธีชำระเงิน: {activeOrder.paymentMethod.toUpperCase()}</p>
                </div>

                <div className="text-right">
                  <p className="text-neutral-400">
                    ยอดรวมสุทธิ: <strong className="text-base text-[#D4AF37] font-semibold">฿{activeOrder.total.toLocaleString()}</strong>
                  </p>
                  <p className="text-emerald-400 text-[11px]">
                    Green Points ที่ได้รับ: +{activeOrder.greenPointsEarned} pts
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
