import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { CustomerLoyalty } from '../../types';
import {
  Award,
  Recycle,
  ShoppingBag,
  Sparkles,
  Gift,
  Search,
  CheckCircle2,
  Plus,
  History,
  UserCheck,
} from 'lucide-react';
import { ChineseSealMark } from '../common/ChineseMotifs';

export const GreenLoyaltyCRM: React.FC = () => {
  const { customers, creditPlasticRecycling, showNotification } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(customers[0]?.id || '');
  const [scrapWeightKg, setScrapWeightKg] = useState<number>(5);
  const [scrapNotes, setScrapNotes] = useState('พาเลทและขอบพลาสติก PP ฉีดขึ้นรูป');
  const [selectedCustomerForHistory, setSelectedCustomerForHistory] = useState<CustomerLoyalty | null>(null);

  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId) || customers[0];

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdminCreditRecycle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer || scrapWeightKg <= 0) return;
    creditPlasticRecycling(selectedCustomer.id, scrapWeightKg, scrapNotes);
    setScrapWeightKg(5);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight">ระบบสมาชิกรักษ์โลก (Green Loyalty CRM)</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            จัดการฐานข้อมูลลูกค้า, ยอด Green Points สะสม, สัดส่วนคะแนนจากการซื้อ vs รีไซเคิล และตรวจรับพลาสติก PP
          </p>
        </div>
      </div>

      {/* Staff Tool: Plastic Recycling Intake & Credit Points */}
      <div className="rounded-2xl bg-gradient-to-r from-[#141A18] to-[#12161A] border border-emerald-500/30 p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="space-y-2 max-w-lg">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              <Recycle className="w-4 h-4" />
              <span>เครื่องมือเจ้าหน้าที่: ตรวจรับขยะพลาสติก PP เข้าโรงหล่อ</span>
            </div>
            <h3 className="text-base font-semibold text-white">
              ชั่งน้ำหนักเศษพลาสติก PP และโอน Green Points ทันที
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              อัตราเครดิต: พลาสติกพอลิโพรพีลีน (PP) บริสุทธิ์ 1 กก. = 50 Green Points (ใช้แลกส่วนลดเงินสด 1 Point = 1 บาท)
            </p>
          </div>

          {/* Intake Action Form */}
          <form onSubmit={handleAdminCreditRecycle} className="flex-1 max-w-xl bg-black/40 p-4 rounded-xl border border-white/10 space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-neutral-300 block mb-1">สมาชิกลูกค้าผู้ส่งมอบ</label>
                <select
                  value={selectedCustomerId}
                  onChange={(e) => setSelectedCustomerId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0D0F11] border border-white/15 text-white focus:outline-none focus:border-emerald-500"
                >
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.tier}) - {c.phone}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">น้ำหนักชั่งจริง (กิโลกรัม)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  required
                  value={scrapWeightKg}
                  onChange={(e) => setScrapWeightKg(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-[#0D0F11] border border-white/15 text-white font-mono-num font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="text-neutral-300 block mb-1">ประเภทวัสดุ / บันทึกการตรวจสภาพ</label>
              <input
                type="text"
                required
                value={scrapNotes}
                onChange={(e) => setScrapNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0D0F11] border border-white/15 text-white"
              />
            </div>

            <div className="pt-1 flex items-center justify-between">
              <span className="text-emerald-400 font-mono-num font-semibold">
                คะแนนที่จะโอน: +{Math.round(scrapWeightKg * 50)} Green Points
              </span>

              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>ยืนยันตรวจรับ & เครดิตคะแนน</span>
              </button>
            </div>
          </form>

        </div>
      </div>

      {/* Customer Directory Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="text-sm font-semibold text-white">ตารางรายชื่อสมาชิก Green Loyalty ({customers.length} ท่าน)</h3>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ค้นหาชื่อ, เบอร์โทร, อีเมล..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/40 text-neutral-400 uppercase tracking-wider text-[10px] border-b border-white/10 font-mono-num">
                <tr>
                  <th className="py-3 px-4">ชื่อลูกค้า & ข้อมูลติดต่อ</th>
                  <th className="py-3 px-4 text-center">ระดับสมาชิก (Tier)</th>
                  <th className="py-3 px-4 text-center">คะแนนสะสมคงเหลือ</th>
                  <th className="py-3 px-4 text-center">ได้จากการซื้อสินค้า</th>
                  <th className="py-3 px-4 text-center">ได้จากรีไซเคิล PP</th>
                  <th className="py-3 px-4 text-center">ใช้แลกไปแล้ว</th>
                  <th className="py-3 px-4 text-center">PP รีไซเคิลรวม</th>
                  <th className="py-3 px-4 text-right">ประวัติ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredCustomers.map((cust) => {
                  return (
                    <tr key={cust.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4">
                        <p className="font-semibold text-white">{cust.name}</p>
                        <p className="text-[11px] text-neutral-400 font-mono-num">{cust.phone}</p>
                        <p className="text-[10px] text-neutral-500">{cust.email}</p>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-mono-num font-medium ${
                            cust.tier === 'Phoenix'
                              ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40'
                              : cust.tier === 'Jade'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : cust.tier === 'Bamboo'
                              ? 'bg-teal-500/10 text-teal-300 border border-teal-500/20'
                              : 'bg-neutral-800 text-neutral-300'
                          }`}
                        >
                          {cust.tier}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-center font-mono-num font-bold text-emerald-400">
                        {cust.greenPoints.toLocaleString()} pts
                      </td>

                      <td className="py-3 px-4 text-center font-mono-num text-neutral-300">
                        +{cust.pointsFromPurchases.toLocaleString()}
                      </td>

                      <td className="py-3 px-4 text-center font-mono-num text-emerald-300">
                        +{cust.pointsFromEco.toLocaleString()}
                      </td>

                      <td className="py-3 px-4 text-center font-mono-num text-amber-400">
                        -{cust.pointsRedeemed.toLocaleString()}
                      </td>

                      <td className="py-3 px-4 text-center font-mono-num font-semibold text-[#D4AF37]">
                        {cust.totalRecycledPpKg} กก.
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedCustomerForHistory(cust)}
                          className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300 text-xs border border-white/10 transition-colors cursor-pointer"
                        >
                          ดูกิจกรรม ({cust.history.length})
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Customer Activity History Modal */}
      {selectedCustomerForHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#121417] border border-white/15 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  ประวัติกิจกรรม Green Loyalty: {selectedCustomerForHistory.name}
                </h3>
                <p className="text-[11px] text-neutral-400 font-mono-num">
                  คะแนนคงเหลือ: {selectedCustomerForHistory.greenPoints} pts · รีไซเคิลสะสม: {selectedCustomerForHistory.totalRecycledPpKg} กก.
                </p>
              </div>
              <button
                onClick={() => setSelectedCustomerForHistory(null)}
                className="text-neutral-400 hover:text-white p-1 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto text-xs">
              {selectedCustomerForHistory.history.map((act) => (
                <div
                  key={act.id}
                  className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between"
                >
                  <div>
                    <p className="text-neutral-200">{act.descriptionTh}</p>
                    <span className="text-[10px] text-neutral-500 font-mono-num">{act.date}</span>
                  </div>
                  <span
                    className={`font-mono-num font-bold text-xs shrink-0 ${
                      act.points >= 0 ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {act.points >= 0 ? `+${act.points}` : act.points} pts
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedCustomerForHistory(null)}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
