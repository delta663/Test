import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, CheckCircle, ShieldCheck, QrCode, CreditCard, Building2, Truck } from 'lucide-react';
import { ChineseSealMark } from '../common/ChineseMotifs';

interface CheckoutModalProps {
  onClose: () => void;
  pointDiscount: number;
  greenPointsRedeemed: number;
  greenPointsEarned: number;
  shippingFee: number;
  finalTotal: number;
  cartSubtotal: number;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  onClose,
  pointDiscount,
  greenPointsRedeemed,
  greenPointsEarned,
  shippingFee,
  finalTotal,
  cartSubtotal,
}) => {
  const { cart, createOrder, setIsCartOpen, activeCustomer } = useStore();

  const [customerName, setCustomerName] = useState(activeCustomer.name || 'คุณวรปรัชญ์ ศิริไพศาล');
  const [email, setEmail] = useState(activeCustomer.email || 'woraprach.s@gmail.com');
  const [phone, setPhone] = useState(activeCustomer.phone || '082-391-4455');
  const [address, setAddress] = useState('128/9 ซอยสุขุมวิท 39 แขวงคลองตันเหนือ');
  const [district, setDistrict] = useState('วัฒนา');
  const [province, setProvince] = useState('กรุงเทพมหานคร');
  const [postalCode, setPostalCode] = useState('10110');
  const [paymentMethod, setPaymentMethod] = useState<'promptpay' | 'credit_card' | 'bank_transfer'>('promptpay');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderItems = cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.nameTh,
        collectionName: item.product.collectionEn,
        price: item.itemPrice,
        quantity: item.quantity,
        image: item.product.image,
        config: item.config,
      }));

      createOrder({
        customerName,
        email,
        phone,
        address,
        district,
        province,
        postalCode,
        items: orderItems,
        subtotal: cartSubtotal,
        shippingFee,
        discount: pointDiscount,
        greenPointsRedeemed,
        greenPointsEarned,
        total: finalTotal,
        paymentMethod,
        status: 'paid', // Instant confirmation
        trackingNumber: `CRF-EXP-${Math.floor(10000 + Math.random() * 90000)}`,
        notes: 'คำสั่งซื้อผ่านระบบออนไลน์พร้อมสิทธิประโยชน์ Green Loyalty',
      });

      setIsProcessing(false);
      setIsCartOpen(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#121417] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0D0F11]">
          <div className="flex items-center gap-3">
            <ChineseSealMark text="结账" className="w-7 h-7 text-xs border-[#C23E2F] text-[#C23E2F]" />
            <div>
              <h3 className="text-base font-semibold text-white">ชำระเงินและระบุที่อยู่จัดส่ง</h3>
              <p className="text-xs text-neutral-400">ปลอดภัยด้วยมาตรฐานการเข้ารหัส 256-bit SSL</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Section 1: Customer & Shipping Address */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-2 mb-3">
              <Truck className="w-4 h-4" />
              <span>1. ข้อมูลผู้รับและที่อยู่จัดส่ง (Shipping Information)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-neutral-300 block mb-1">ชื่อ-นามสกุล ผู้รับ</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-xs text-neutral-300 block mb-1">เบอร์โทรศัพท์ติดต่อ</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-neutral-300 block mb-1">อีเมลสำหรับรับใบเสร็จและสถานะการผลิต</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs text-neutral-300 block mb-1">ที่อยู่จัดส่ง (บ้านเลขที่ / ถนน / อาคาร)</label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-xs text-neutral-300 block mb-1">เขต / อำเภอ</label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-neutral-300 block mb-1">จังหวัด</label>
                  <input
                    type="text"
                    required
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-300 block mb-1">รหัสไปรษณีย์</label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Payment Method */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-2 mb-3">
              <CreditCard className="w-4 h-4" />
              <span>2. วิธีการชำระเงิน (Payment Method)</span>
            </h4>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('promptpay')}
                className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                  paymentMethod === 'promptpay'
                    ? 'border-[#C23E2F] bg-[#C23E2F]/10 text-white'
                    : 'border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white'
                }`}
              >
                <QrCode className="w-5 h-5 mx-auto mb-1 text-[#E86A17]" />
                <span className="text-xs font-medium block">Thai QR PromptPay</span>
                <span className="text-[10px] text-neutral-400">สแกนจ่ายทันที</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('credit_card')}
                className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                  paymentMethod === 'credit_card'
                    ? 'border-[#C23E2F] bg-[#C23E2F]/10 text-white'
                    : 'border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1 text-[#3B82F6]" />
                <span className="text-xs font-medium block">บัตรเครดิต / เดบิต</span>
                <span className="text-[10px] text-neutral-400">Visa / Mastercard</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('bank_transfer')}
                className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-[#C23E2F] bg-[#C23E2F]/10 text-white'
                    : 'border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white'
                }`}
              >
                <Building2 className="w-5 h-5 mx-auto mb-1 text-[#10B981]" />
                <span className="text-xs font-medium block">โอนผ่านธนาคาร</span>
                <span className="text-[10px] text-neutral-400">แนบสลิปอัตโนมัติ</span>
              </button>
            </div>

            {/* PromptPay preview illustration */}
            {paymentMethod === 'promptpay' && (
              <div className="mt-3 p-4 rounded-xl bg-black/50 border border-white/10 flex items-center gap-4">
                <div className="w-16 h-16 bg-white p-1 rounded-md shrink-0 flex items-center justify-center">
                  <div className="w-full h-full border-2 border-black grid grid-cols-3 gap-0.5 p-1">
                    <div className="bg-black" />
                    <div className="bg-transparent" />
                    <div className="bg-black" />
                    <div className="bg-black" />
                    <div className="bg-black" />
                    <div className="bg-transparent" />
                    <div className="bg-transparent" />
                    <div className="bg-black" />
                    <div className="bg-black" />
                  </div>
                </div>
                <div className="text-xs text-neutral-300">
                  <p className="font-semibold text-white">PromptPay QR Code จะถูกสร้างทันที</p>
                  <p className="text-[11px] text-neutral-400">
                    ยอดชำระ <span className="text-emerald-400 font-mono-num font-bold">฿{finalTotal.toLocaleString()}</span> บาท รองรับทุกแอปพลิเคชันธนาคารในไทย
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Order Summary Review */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2 text-xs font-mono-num">
            <div className="flex justify-between text-neutral-400">
              <span>ยอดรวมสินค้า ({cart.length} รายการ)</span>
              <span>฿{cartSubtotal.toLocaleString()}</span>
            </div>
            {pointDiscount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>ส่วนลดคะแนน Green Loyalty (-{greenPointsRedeemed} pts)</span>
                <span>-฿{pointDiscount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-400">
              <span>ค่าจัดส่งบรรจุภัณฑ์ Circular Crate</span>
              <span>{shippingFee === 0 ? 'ฟรี (โปรโมชั่น)' : `฿${shippingFee}`}</span>
            </div>
            <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-semibold text-white">
              <span>ยอดชำระเงินสุทธิ</span>
              <span className="text-xl text-[#D4AF37]">฿{finalTotal.toLocaleString()}</span>
            </div>
            <div className="text-[11px] text-emerald-400 text-right">
              คุณจะได้รับ +{greenPointsEarned.toLocaleString()} Green Points สะสมเข้าบัตร
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3.5 rounded-lg bg-[#C23E2F] hover:bg-[#A82B1D] text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#C23E2F]/20 cursor-pointer disabled:opacity-60"
          >
            {isProcessing ? (
              <span>กำลังบันทึกคำสั่งซื้อ...</span>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>ยืนยันคำสั่งซื้อ ฿{finalTotal.toLocaleString()}</span>
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
};
