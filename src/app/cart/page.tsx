'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Tag,
  Leaf,
  ArrowRight,
  Truck,
  Shield,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cart';
import { useState } from 'react';

export default function CartPage() {
  const {
    items,
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

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-earth-50 dark:bg-slate-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-24 h-24 bg-earth-200 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-muted-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Your cart is empty
              </h1>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any cases yet. Start customizing your eco-friendly phone case!
              </p>
              <Link href="/customize">
                <Button className="bg-brand-700 hover:bg-brand-800 gap-2">
                  Start Customizing
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-heading">
              Shopping Cart
            </h1>
            <p className="text-muted-foreground">
              {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 card-shadow"
              >
                <div className="flex gap-6">
                  {/* Image */}
                  <div className="w-28 h-28 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={item.customImage || item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link 
                          href={`/shop/${item.product.slug}`}
                          className="font-semibold text-lg hover:text-brand-700 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.device.name}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {item.material.icon} {item.material.name}
                          </Badge>
                          {item.material.type === 'eco' && (
                            <Badge className="bg-brand-600 text-white text-xs">
                              <Leaf className="w-3 h-3 mr-1" />
                              Eco
                            </Badge>
                          )}
                          {item.hasMagSafe && (
                            <Badge variant="outline" className="text-xs">
                              MagSafe
                            </Badge>
                          )}
                        </div>
                        {item.addOns.length > 0 && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Add-ons: {item.addOns.map(a => a.name).join(', ')}
                          </p>
                        )}
                      </div>

                      {/* Remove */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-terracotta-600 shrink-0"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-10 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-lg">${item.totalPrice.toFixed(2)}</p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-muted-foreground">
                            ${item.unitPrice.toFixed(2)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 card-shadow sticky top-32"
            >
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

              {/* Promo Code */}
              <div className="mb-6">
                {promoCode ? (
                  <div className="flex items-center justify-between bg-brand-50 dark:bg-brand-900/20 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-brand-600" />
                      <span className="font-medium text-brand-700 dark:text-brand-400">
                        {promoCode.code}
                      </span>
                      <Badge className="bg-brand-200 text-brand-800">
                        -{promoCode.discount}%
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" onClick={removePromoCode}>
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
                <p className="text-xs text-muted-foreground mt-2">
                  Try: ECO2026, PLANETFIRST, or WELCOME10
                </p>
              </div>

              <Separator className="my-4" />

              {/* Totals */}
              <div className="space-y-3">
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
                {getShipping() > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Add ${(50 - getSubtotal()).toFixed(2)} more for free shipping
                  </p>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout" className="block mt-6">
                <Button className="w-full bg-brand-700 hover:bg-brand-800 gap-2">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Truck className="w-4 h-4" />
                  <span>Ships in 3-5 days</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>Secure checkout</span>
                </div>
              </div>

              {/* Eco Message */}
              {items.some(i => i.material.type === 'eco') && (
                <div className="mt-6 p-3 bg-brand-50 dark:bg-brand-900/20 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-brand-700 dark:text-brand-400">
                    <Leaf className="w-4 h-4" />
                    <span>Your eco order plants {items.filter(i => i.material.type === 'eco').reduce((sum, i) => sum + i.quantity, 0)} trees!</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
