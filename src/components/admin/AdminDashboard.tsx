import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  Award,
  Package,
  ArrowUpRight,
  PlusCircle,
  ArrowDownRight,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    orders,
    customers,
    lowStockProducts,
    setAdminTab,
  } = useStore();

  const [timeRange, setTimeRange] = useState<'today' | 'month'>('month');

  // Metrics calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.total : 0), 0);
  const todayRevenue = orders
    .filter((o) => o.createdAt.startsWith('2026-09-28'))
    .reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.total : 0), 0);

  const activeOrdersCount = orders.filter((o) => o.status !== 'completed' && o.status !== 'cancelled').length;

  const totalGreenPointsIssued = customers.reduce(
    (sum, c) => sum + c.pointsFromPurchases + c.pointsFromEco,
    0
  );

  const totalPpSavedKg = products.reduce((sum, p) => sum + p.ppDivertedKg * p.stock, 0);

  // Top selling product determination
  const productSalesMap: { [key: string]: number } = {};
  orders.forEach((o) => {
    o.items.forEach((item) => {
      productSalesMap[item.productName] = (productSalesMap[item.productName] || 0) + item.quantity;
    });
  });

  const bestSellerName = Object.keys(productSalesMap).sort(
    (a, b) => productSalesMap[b] - productSalesMap[a]
  )[0] || 'Vermilion Dawn Ming Armchair';

  // Weekly sales trend simulation data
  const salesTrend = [
    { day: 'จันทร์', sales: 42000, orders: 2 },
    { day: 'อังคาร', sales: 58000, orders: 3 },
    { day: 'พุธ', sales: 38000, orders: 2 },
    { day: 'พฤหัส', sales: 74000, orders: 4 },
    { day: 'ศุกร์', sales: 92000, orders: 5 },
    { day: 'เสาร์', sales: 110000, orders: 6 },
    { day: 'อาทิตย์ (วันนี้)', sales: 67500, orders: 3 },
  ];

  const maxSale = Math.max(...salesTrend.map((t) => t.sales));

  return (
    <div className="space-y-8">
      
      {/* Top Banner / Time Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight">ภาพรวมธุรกิจ & ระบบบริหารจัดการ (CRM Dashboard)</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            สรุปข้อมูลคำสั่งซื้อ, ยอดขายเฟอร์นิเจอร์ PP รีไซเคิล, คลังสินค้า และคะแนนสะสม Green Loyalty
          </p>
        </div>

        {/* Time Switcher */}
        <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-lg">
          <button
            onClick={() => setTimeRange('today')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              timeRange === 'today' ? 'bg-white text-black font-semibold shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            ยอดวันนี้ (Today)
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              timeRange === 'month' ? 'bg-white text-black font-semibold shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            ยอดเดือนนี้ (September 2026)
          </button>
        </div>
      </div>

      {/* Primary KPI Grid (6 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        
        {/* KPI 1: Revenue */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>{timeRange === 'today' ? 'ยอดขายวันนี้' : 'รายได้รวมเดือนนี้'}</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xl font-mono-num font-bold text-white">
            ฿{(timeRange === 'today' ? todayRevenue : totalRevenue).toLocaleString()}
          </p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono-num">
            <TrendingUp className="w-3 h-3" />
            <span>+18.4% จากสัปดาห์ก่อน</span>
          </div>
        </div>

        {/* KPI 2: Total Orders */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>จำนวนคำสั่งซื้อ</span>
            <ShoppingBag className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-xl font-mono-num font-bold text-white">
            {orders.length} <span className="text-xs text-neutral-400 font-normal">ออร์เดอร์</span>
          </p>
          <p className="text-[11px] text-neutral-400">
            รอดำเนินการ {activeOrdersCount} ออร์เดอร์
          </p>
        </div>

        {/* KPI 3: Best Seller */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>สินค้าขายดี</span>
            <Award className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <p className="text-sm font-semibold text-white truncate" title={bestSellerName}>
            {bestSellerName.split(' ')[0]}
          </p>
          <p className="text-[11px] text-[#D4AF37]">
            สัดส่วนยอดขาย 38%
          </p>
        </div>

        {/* KPI 4: Green Points Issued */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>Green Points แจกจ่าย</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xl font-mono-num font-bold text-emerald-400">
            {totalGreenPointsIssued.toLocaleString()} <span className="text-xs font-normal">pts</span>
          </p>
          <p className="text-[11px] text-neutral-400">
            แลกแล้ว {customers.reduce((s, c) => s + c.pointsRedeemed, 0).toLocaleString()} pts
          </p>
        </div>

        {/* KPI 5: Low Stock Alert */}
        <div className={`p-4 rounded-xl border space-y-2 ${
          lowStockProducts.length > 0 ? 'bg-amber-500/10 border-amber-500/30' : 'bg-white/[0.02] border-white/10'
        }`}>
          <div className="flex items-center justify-between text-xs">
            <span className={lowStockProducts.length > 0 ? 'text-amber-400 font-medium' : 'text-neutral-400'}>
              สินค้า Stock ต่ำ
            </span>
            <AlertTriangle className={`w-4 h-4 ${lowStockProducts.length > 0 ? 'text-amber-400' : 'text-neutral-400'}`} />
          </div>
          <p className={`text-xl font-mono-num font-bold ${lowStockProducts.length > 0 ? 'text-amber-400' : 'text-white'}`}>
            {lowStockProducts.length} <span className="text-xs font-normal">รายการ</span>
          </p>
          <button
            onClick={() => setAdminTab('stock')}
            className="text-[11px] text-neutral-400 hover:text-white underline cursor-pointer"
          >
            ตรวจสต็อกด่วน →
          </button>
        </div>

        {/* KPI 6: PP Plastic Diverted */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs">
            <span>PP ในคลังพร้อมผลิต</span>
            <Package className="w-4 h-4 text-[#E86A17]" />
          </div>
          <p className="text-xl font-mono-num font-bold text-white">
            {totalPpSavedKg.toFixed(1)} <span className="text-xs text-neutral-400 font-normal">กก.</span>
          </p>
          <p className="text-[11px] text-emerald-400">
            พร้อมส่งต่อรอบการหล่อ
          </p>
        </div>

      </div>

      {/* Main Grid: Interactive Sales Chart & Fast Low Stock Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: 7-Day Revenue & Orders Trend Chart */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">กราฟยอดขายรายสัปดาห์ (Weekly Sales Trend)</h3>
              <p className="text-xs text-neutral-400 mt-0.5">การเติบโตของยอดสั่งซื้อเก้าอี้และมูลค่าเฉลี่ยต่อบิล</p>
            </div>
            <span className="text-xs font-mono-num text-neutral-400">หน่วย: บาท (THB)</span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-56 flex items-end gap-3 pt-6 pb-2 px-2 border-b border-white/10">
            {salesTrend.map((item, idx) => {
              const heightPct = Math.round((item.sales / maxSale) * 100);
              const isToday = idx === salesTrend.length - 1;

              return (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group relative">
                  {/* Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 bg-neutral-900 border border-white/20 text-white text-[11px] font-mono-num px-2.5 py-1 rounded shadow-lg pointer-events-none whitespace-nowrap z-20">
                    ฿{item.sales.toLocaleString()} ({item.orders} ออร์เดอร์)
                  </div>

                  {/* Bar */}
                  <div className="w-full h-44 flex items-end justify-center">
                    <div
                      className={`w-full max-w-[42px] rounded-t-md transition-all duration-500 ${
                        isToday
                          ? 'bg-gradient-to-t from-[#B3261E] to-[#E86A17] shadow-lg shadow-[#B3261E]/30'
                          : 'bg-white/15 hover:bg-white/25'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>

                  {/* Day Label */}
                  <span className={`text-[10px] truncate max-w-full font-mono-num ${isToday ? 'text-amber-400 font-semibold' : 'text-neutral-400'}`}>
                    {item.day.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-400 pt-1 font-mono-num">
            <span>ยอดรวมสัปดาห์นี้: ฿487,500</span>
            <span>เฉลี่ยต่อวัน: ฿69,642</span>
          </div>
        </div>

        {/* Right: Low Stock Alert & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Low Stock Warning Card */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>การแจ้งเตือนสต็อกต่ำ</span>
              </h3>
              <button
                onClick={() => setAdminTab('stock')}
                className="text-xs text-[#D4AF37] hover:underline cursor-pointer"
              >
                จัดการสต็อก
              </button>
            </div>

            {lowStockProducts.length === 0 ? (
              <p className="text-xs text-neutral-400 py-4 text-center">
                สต็อกสินค้าทุกรายการอยู่ในระดับปลอดภัย
              </p>
            ) : (
              <div className="space-y-3">
                {lowStockProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-semibold text-white">{p.nameTh}</h4>
                      <p className="text-[11px] text-neutral-400 font-mono-num mt-0.5">
                        เกณฑ์ขั้นต่ำ: {p.lowStockThreshold} ตัว
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-mono-num font-bold text-amber-400">
                        {p.stock} ตัว
                      </span>
                      <span className="block text-[10px] text-amber-300">ใกล้หมด</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Admin Actions */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
            <h3 className="text-sm font-semibold text-white">เมนูลัด (Quick Actions)</h3>
            
            <button
              onClick={() => setAdminTab('products')}
              className="w-full py-2.5 px-3.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-neutral-200 hover:text-white flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>+ เพิ่มสินค้าเก้าอี้ใหม่</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-400" />
            </button>

            <button
              onClick={() => setAdminTab('stock')}
              className="w-full py-2.5 px-3.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-neutral-200 hover:text-white flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>รับสินค้าเข้าสต็อก (Stock In)</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-400" />
            </button>

            <button
              onClick={() => setAdminTab('loyalty')}
              className="w-full py-2.5 px-3.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-neutral-200 hover:text-white flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>ตรวจรับพลาสติก PP รีไซเคิล & แจกคะแนน</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-400" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
