'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingBag, 
  Leaf,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cart';
import { useState } from 'react';

export function CartDrawer() {
  const { 
    items, 
    isOpen, 
    setCartOpen, 
    updateQuantity, 
    removeItem,
    getSubtotal,
    getDiscount,
    getTotal,
    getShipping,
    promoCode,
    applyPromoCode,
    removePromoCode,
  } = useCartStore();
  
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState(false);

  const handleApplyPromo = () => {
    if (applyPromoCode(promoInput)) {
      setPromoInput('');
      setPromoError(false);
    } else {
      setPromoError(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-slate-900 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Your Cart</h2>
                <Badge variant="secondary">{items.length}</Badge>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setCartOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 bg-earth-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Start customizing your eco-friendly phone case!
                  </p>
                  <Button 
                    onClick={() => setCartOpen(false)}
                    className="bg-brand-700 hover:bg-brand-800"
                  >
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 p-3 bg-earth-50 dark:bg-slate-800 rounded-lg"
                    >
                      {/* Image */}
                      <div className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden relative shrink-0">
                        {item.customImage ? (
                          <img
                            src={item.customImage}
                            alt="Custom case"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {item.device.name}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <span>{item.material.icon}</span>
                          <span>{item.material.name}</span>
                          {item.material.type === 'eco' && (
                            <Leaf className="w-3 h-3 text-brand-500" />
                          )}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-6 h-6"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="w-6 h-6"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <span className="font-semibold text-sm">
                            ${item.totalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Remove */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 text-muted-foreground hover:text-terracotta-600"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t p-4 space-y-4 bg-earth-50 dark:bg-slate-800">
                {/* Promo Code */}
                <div>
                  {promoCode ? (
                    <div className="flex items-center justify-between bg-brand-100 dark:bg-brand-900/30 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-brand-600" />
                        <span className="font-medium text-brand-700 dark:text-brand-400">
                          {promoCode.code}
                        </span>
                        <Badge variant="secondary" className="bg-brand-200 text-brand-800">
                          -{promoCode.discount}%
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removePromoCode}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Promo code"
                        value={promoInput}
                        onChange={(e) => {
                          setPromoInput(e.target.value);
                          setPromoError(false);
                        }}
                        className={promoError ? 'border-red-500' : ''}
                      />
                      <Button variant="outline" onClick={handleApplyPromo}>
                        Apply
                      </Button>
                    </div>
                  )}
                  {promoError && (
                    <p className="text-xs text-red-500 mt-1">Invalid promo code</p>
                  )}
                </div>

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>
                  {getDiscount() > 0 && (
                    <div className="flex justify-between text-sm text-brand-600">
                      <span>Discount</span>
                      <span>-${getDiscount().toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {getShipping() === 0 ? (
                        <span className="text-brand-600">FREE</span>
                      ) : (
                        `$${getShipping().toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${getTotal().toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link href="/checkout" className="block">
                  <Button 
                    className="w-full bg-brand-700 hover:bg-brand-800"
                    onClick={() => setCartOpen(false)}
                  >
                    Proceed to Checkout
                  </Button>
                </Link>

                {/* Continue Shopping */}
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full text-center text-sm text-muted-foreground hover:text-foreground"
                >
                  Continue Shopping
                </button>

                {/* Eco Message */}
                <div className="flex items-center justify-center gap-2 text-xs text-brand-600 bg-brand-50 dark:bg-brand-900/20 p-2 rounded-lg">
                  <Leaf className="w-4 h-4" />
                  <span>Every eco case plants 1 tree</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
