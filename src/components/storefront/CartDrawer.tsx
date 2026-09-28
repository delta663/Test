import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { CheckoutModal } from './CheckoutModal';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartItemsCount,
    activeCustomer,
  } = useStore();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [useGreenPoints, setUseGreenPoints] = useState(false);

  if (!isCartOpen) return null;

  // Green point discount calculation: up to active customer's points, max 20% of subtotal
  const maxApplicablePoints = Math.min(
    activeCustomer.greenPoints,
    Math.floor(cartSubtotal * 0.2)
  );
  const pointDiscount = useGreenPoints ? maxApplicablePoints : 0;
  const shippingFee = cartSubtotal > 15000 || cartSubtotal === 0 ? 0 : 450;
  const finalTotal = Math.max(0, cartSubtotal - pointDiscount + shippingFee);
  const greenPointsToEarn = Math.round(finalTotal * 0.01);

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <div
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-md bg-[#121417] border-l border-white/10 flex flex-col justify-between shadow-2xl">
            
            {/* Drawer Header */}
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#E86A17]" />
                <h3 className="text-base font-semibold text-white">ตะกร้าสินค้า</h3>
                <span className="text-xs font-mono-num text-neutral-400">
                  ({cartItemsCount} ชิ้น)
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-neutral-400 space-y-3">
                  <ShoppingBag className="w-12 h-12 text-white/10" />
                  <p className="text-sm">ยังไม่มีสินค้าในตะกร้า</p>
                  <p className="text-xs text-neutral-500">เลือกชม 4 คอลเลกชันเก้าอี้จีนเพื่อเริ่มสั่งซื้อ</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3"
                  >
                    <div className="flex gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.nameEn}
                        className="w-20 h-20 rounded-lg object-cover bg-neutral-900 border border-white/10 shrink-0"
                        referrerPolicy="no-referrer"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-semibold text-white truncate">
                            {item.product.nameTh}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Custom configuration tags */}
                        <div className="mt-1 space-y-0.5 text-[11px] text-neutral-400 font-mono-num">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[#D4AF37]">Gradient:</span>
                            <span className="text-neutral-200 capitalize">{item.config.gradientKey.replace('-', ' → ')}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-neutral-400">Pattern:</span>
                            <span className="text-neutral-200 capitalize">{item.config.pattern.replace('_', ' ')}</span>
                          </div>
                          {item.config.customEngraving && (
                            <div className="flex items-center gap-1.5">
                              <span className="text-amber-400 font-semibold">Laser:</span>
                              <span className="text-amber-300 font-display font-medium">"{item.config.customEngraving}"</span>
                            </div>
                          )}
                        </div>

                        {/* Price & Quantity Stepper */}
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs font-mono-num font-semibold text-white">
                            ฿{(item.itemPrice * item.quantity).toLocaleString()}
                          </span>

                          <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 rounded-lg p-0.5">
                            <button
                              onClick={() => updateCartQuantity(item.cartItemId, -1)}
                              className="w-6 h-6 flex items-center justify-center text-xs text-neutral-300 hover:text-white"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-xs font-mono-num font-medium text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.cartItemId, 1)}
                              className="w-6 h-6 flex items-center justify-center text-xs text-neutral-300 hover:text-white"
                            >
                              +
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer & Checkout Action */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#0D0F11] space-y-4">
                
                {/* Green Points Redemption Toggle */}
                {activeCustomer.greenPoints > 0 && (
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <span className="text-xs font-semibold text-white block">
                          ใช้ Green Points เป็นส่วนลด
                        </span>
                        <span className="text-[11px] text-neutral-400">
                          มี {activeCustomer.greenPoints.toLocaleString()} pts (ลดได้สูงสุด ฿{maxApplicablePoints.toLocaleString()})
                        </span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={useGreenPoints}
                      onChange={(e) => setUseGreenPoints(e.target.checked)}
                      className="w-4 h-4 accent-emerald-500 cursor-pointer"
                    />
                  </div>
                )}

                {/* Calculation Breakdown */}
                <div className="space-y-1.5 text-xs text-neutral-400 font-mono-num">
                  <div className="flex justify-between">
                    <span>ยอดรวมสินค้า (Subtotal)</span>
                    <span className="text-neutral-200">฿{cartSubtotal.toLocaleString()}</span>
                  </div>

                  {pointDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>ส่วนลด Green Points ({pointDiscount} pts)</span>
                      <span>-฿{pointDiscount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>ค่าจัดส่ง (Delivery Crate)</span>
                    <span>{shippingFee === 0 ? 'ส่งฟรี (มูลค่าเกิน ฿15,000)' : `฿${shippingFee}`}</span>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex justify-between text-base font-semibold text-white">
                    <span>ยอดชำระสุทธิ</span>
                    <span className="text-[#D4AF37]">฿{finalTotal.toLocaleString()}</span>
                  </div>

                  <div className="text-[11px] text-emerald-400 text-right">
                    จะได้รับ +{greenPointsToEarn.toLocaleString()} Green Points
                  </div>
                </div>

                {/* Primary Checkout Button */}
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-3.5 rounded-lg bg-[#C23E2F] hover:bg-[#A82B1D] text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#C23E2F]/20 cursor-pointer"
                >
                  <span>ดำเนินการสั่งซื้อ (Checkout)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            )}

          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          onClose={() => setIsCheckoutOpen(false)}
          pointDiscount={pointDiscount}
          greenPointsRedeemed={pointDiscount}
          greenPointsEarned={greenPointsToEarn}
          shippingFee={shippingFee}
          finalTotal={finalTotal}
          cartSubtotal={cartSubtotal}
        />
      )}
    </>
  );
};
