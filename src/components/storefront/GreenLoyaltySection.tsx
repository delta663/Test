import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Recycle,
  ShoppingBag,
  Box,
  Users,
  Award,
  ArrowRight,
  CheckCircle2,
  Gift,
  Sparkles,
} from 'lucide-react';
import { ChineseSealMark } from '../common/ChineseMotifs';

export const GreenLoyaltySection: React.FC = () => {
  const {
    activeCustomer,
    creditPlasticRecycling,
    rewards,
    redeemReward,
    showNotification,
  } = useStore();

  const [recycleInputKg, setRecycleInputKg] = useState<number>(10);
  const [recyclePlasticsSource, setRecyclePlasticsSource] = useState('เศษขอบแม่พิมพ์โรงงานฉีดพลาสติก');
  const [isSubmittingRecycle, setIsSubmittingRecycle] = useState(false);

  const calculatedPoints = Math.round(recycleInputKg * 50);

  const handleRecycleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (recycleInputKg <= 0) return;
    setIsSubmittingRecycle(true);
    setTimeout(() => {
      creditPlasticRecycling(activeCustomer.id, recycleInputKg, recyclePlasticsSource);
      setIsSubmittingRecycle(false);
      showNotification(
        `บันทึกคำขอส่งมอบพลาสติก PP ${recycleInputKg} กก. และเครดิต +${calculatedPoints} Green Points สำเร็จ!`
      );
    }, 600);
  };

  const earningMethods = [
    {
      icon: ShoppingBag,
      title: 'ซื้อสินค้าเก้าอี้ CHINA RE:FORM',
      rate: 'ทุก ฿100 รับ 1 Green Point (หรือ 1% เงินคืน)',
      desc: 'คะแนนจะถูกคำนวณและเข้าบัญชีสมาชิกทันทีเมื่อชำระเงินคำสั่งซื้อสำเร็จ',
    },
    {
      icon: Recycle,
      title: 'นำพลาสติก PP เหลือใช้กลับมารีไซเคิล',
      rate: 'PP บริสุทธิ์ 1 กก. = 50 Green Points',
      desc: 'นำส่งที่จุด Drop-off หรือแจ้งรับที่โรงงาน/สตูดิโอ เรารับชิ้นส่วน PP เกรดฉีดขึ้นรูปและพาเลท',
    },
    {
      icon: Box,
      title: 'ส่งคืนบรรจุภัณฑ์ Circular Crate',
      rate: 'รับ 100 - 150 Green Points ต่อยูนิต',
      desc: 'ส่งคืนกล่องไม้หมุนเวียนที่ใช้จัดส่งเก้าอี้ เพื่อให้เรานำไปฆ่าเชื้อและใช้ซ้ำกับออร์เดอร์ถัดไป',
    },
    {
      icon: Users,
      title: 'ร่วมกิจกรรมเวิร์กช็อปรักษ์โลก',
      rate: 'รับ 100 - 200 Green Points ต่ออีเวนต์',
      desc: 'เข้าร่วมเสวนาการออกแบบหมุนเวียน (Circular Design) และนิทรรศการวัสดุศาสตร์ยั่งยืน',
    },
  ];

  return (
    <section className="py-20 lg:py-28 border-b border-white/10 bg-[#0D0F11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.25em] text-emerald-400 font-medium mb-2">
            03. Green Loyalty & Circular Economy
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight">
            ระบบ Green Points: ยิ่งหมุนเวียน ยิ่งได้รับสิทธิพิเศษ
          </h2>
          <p className="mt-3 text-neutral-300 text-sm leading-relaxed">
            เปลี่ยนความรับผิดชอบต่อสิ่งแวดล้อมให้เป็นมูลค่าที่จับต้องได้ ทุกกรัมของพลาสติก PP ที่คุณส่งกลับมา และทุกเก้าอี้ที่คุณครอบครอง จะถูกบันทึกใน Green Passport ของคุณ
          </p>
        </div>

        {/* User Green Passport Card (Live Active Customer State) */}
        <div className="rounded-2xl bg-gradient-to-r from-[#171B20] to-[#1F252D] border border-white/15 p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <ChineseSealMark text="綠章" className="w-8 h-8 text-xs border-emerald-500 text-emerald-400" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">{activeCustomer.name}</h3>
                    <span className="text-xs font-mono-num font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Tier: {activeCustomer.tier} Member
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400">
                    โทร: {activeCustomer.phone} · อีเมล: {activeCustomer.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center lg:text-right">
              <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                <span className="text-[11px] text-neutral-400 block">คงเหลือ</span>
                <span className="text-xl font-mono-num font-bold text-emerald-400">
                  {activeCustomer.greenPoints.toLocaleString()} <span className="text-xs font-normal">pts</span>
                </span>
              </div>
              <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                <span className="text-[11px] text-neutral-400 block">ได้จากการซื้อ</span>
                <span className="text-base font-mono-num text-neutral-200">
                  +{activeCustomer.pointsFromPurchases.toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                <span className="text-[11px] text-neutral-400 block">ได้จากกู้คืนพลาสติก</span>
                <span className="text-base font-mono-num text-emerald-300">
                  +{activeCustomer.pointsFromEco.toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                <span className="text-[11px] text-neutral-400 block">รีไซเคิลสะสม</span>
                <span className="text-base font-mono-num text-[#D4AF37]">
                  {activeCustomer.totalRecycledPpKg} กก.
                </span>
              </div>
            </div>

          </div>

          {/* Tier Progress Bar */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2 font-mono-num">
              <span>ระดับ: Sprout (ต้นกล้า)</span>
              <span>Bamboo (ไผ่เขียว)</span>
              <span>Jade (หยกมงคล)</span>
              <span className="text-[#D4AF37]">Phoenix (หงส์เพลิง)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-[#D4AF37] rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min(100, (activeCustomer.totalRecycledPpKg / 40) * 100)}%`,
                }}
              />
            </div>
            <p className="text-[11px] text-neutral-400 mt-2">
              รีไซเคิลสะสมอีก {Math.max(0, 40 - activeCustomer.totalRecycledPpKg).toFixed(1)} กก. เพื่อเลื่อนสู่ระดับสูงสุด Phoenix พร้อมสิทธิ์สั่งทำเก้าอี้ Bespoke สีพิเศษ
            </p>
          </div>
        </div>

        {/* 4 Earning Methods Grid */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#D4AF37]" />
            <span>4 ช่องทางการสะสม Green Points</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {earningMethods.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.title}
                  className="p-6 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1">{m.title}</h4>
                    <p className="text-xs font-mono-num text-emerald-300 font-medium mb-2">{m.rate}</p>
                    <p className="text-xs text-neutral-400 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Plastic Intake / Drop-off Request Tool */}
        <div className="rounded-2xl bg-[#121519] border border-white/10 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs text-emerald-400 font-medium">
                <Recycle className="w-4 h-4" />
                <span>จำลองการนำพลาสติก PP ส่งกลับรีไซเคิล</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white">
                มีเศษพลาสติก PP จากโรงงานหรือบรรจุภัณฑ์?
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                ส่งเศษชิ้นส่วน PP (Polypropylene สัญลักษณ์เบอร์ 5) ให้เราเปลี่ยนเป็นวัตถุดิบหล่อเก้าอี้ เรารับทั้งเศษตัดขอบ พาเลทแตกหัก และลังบรรจุภัณฑ์ พร้อมโอน Green Points เข้าบัญชีคุณทันที
              </p>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-400 block">Green Points ที่จะได้รับ</span>
                  <span className="text-2xl font-mono-num font-bold text-emerald-400">
                    +{calculatedPoints} <span className="text-sm font-normal">คะแนน</span>
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-neutral-400 block">มูลค่าส่วนลดเทียบเท่า</span>
                  <span className="text-base font-mono-num font-semibold text-white">
                    ฿{calculatedPoints} บาท
                  </span>
                </div>
              </div>
            </div>

            {/* Input Form */}
            <div className="lg:col-span-6 bg-black/30 p-6 rounded-xl border border-white/10">
              <form onSubmit={handleRecycleSubmit} className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <label className="text-neutral-300 font-medium">น้ำหนักพลาสติก PP (กิโลกรัม)</label>
                    <span className="font-mono-num text-emerald-400 font-semibold">{recycleInputKg} กก.</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={recycleInputKg}
                    onChange={(e) => setRecycleInputKg(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500 font-mono-num mt-1">
                    <span>1 กก. (+50 pts)</span>
                    <span>50 กก. (+2,500 pts)</span>
                    <span>100 กก. (+5,000 pts)</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-neutral-300 font-medium block mb-1">
                    ประเภทของวัสดุ PP ที่ส่งมอบ
                  </label>
                  <select
                    value={recyclePlasticsSource}
                    onChange={(e) => setRecyclePlasticsSource(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#0D0F11] border border-white/15 text-white text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="เศษขอบแม่พิมพ์โรงงานฉีดพลาสติก">เศษขอบแม่พิมพ์โรงงานฉีดพลาสติก (Edge Trim)</option>
                    <option value="ชิ้นส่วนพลาสติก PP ยานยนต์เหลือใช้">ชิ้นส่วนพลาสติก PP ยานยนต์เหลือใช้ (Auto Parts)</option>
                    <option value="พาเลทพลาสติก PP ชำรุด">พาเลทพลาสติก PP ชำรุด (Damaged Pallet)</option>
                    <option value="บรรจุภัณฑ์ PP ลังอาหารและแก้วน้ำ">บรรจุภัณฑ์ PP ลังอาหารและแก้วน้ำ (Packaging Cleaned)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingRecycle}
                  className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-emerald-900/30"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {isSubmittingRecycle ? 'กำลังส่งข้อมูล...' : `ส่งมอบ & เครดิต +${calculatedPoints} Green Points ทันที`}
                  </span>
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* Rewards & Redemption Catalog */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#E86A17]" />
                <span>แคตตาล็อกแลกสิทธิ์และของรางวัล (Rewards Redemption)</span>
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                ใช้คะแนนของคุณเพื่อรับส่วนลดเงินสด, บริการสลักชื่อ Bespoke หรือของสะสม Limited Edition
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward) => {
              const canAfford = activeCustomer.greenPoints >= reward.pointsRequired;

              return (
                <div
                  key={reward.id}
                  className="p-6 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono-num font-semibold text-emerald-400 px-2 py-0.5 rounded bg-emerald-400/10">
                        {reward.pointsRequired.toLocaleString()} Green Points
                      </span>
                      <span className="text-[11px] font-mono-num text-neutral-400">
                        เหลือ {reward.stockRemaining} สิทธิ์
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-white mb-2 leading-snug">
                      {reward.titleTh}
                    </h4>

                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {reward.descriptionTh}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono-num text-neutral-400">
                      โค้ด: {reward.code}
                    </span>

                    <button
                      onClick={() => redeemReward(reward.id)}
                      disabled={!canAfford || reward.stockRemaining <= 0}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        canAfford && reward.stockRemaining > 0
                          ? 'bg-[#C23E2F] hover:bg-[#A82B1D] text-white shadow-sm'
                          : 'bg-white/5 text-neutral-500 cursor-not-allowed border border-white/5'
                      }`}
                    >
                      {canAfford ? 'แลกรับทันที' : 'คะแนนไม่พอ'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
