'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  CreditCard,
  Lock,
  Truck,
  Leaf,
  Shield,
  Check,
  ChevronRight,
  Apple,
  Package,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cart';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getDiscount, getTotal, getShipping, promoCode, clearCart } = useCartStore();
  
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'googlepay' | 'shoppay'>('card');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setStep('confirmation');
    clearCart();
  };

  if (items.length === 0 && step !== 'confirmation') {
    router.push('/cart');
    return null;
  }

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-earth-50 dark:bg-slate-900 flex items-center justify-center py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center bg-white dark:bg-slate-800 rounded-2xl p-8 card-shadow"
        >
          <div className="w-20 h-20 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-brand-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground mb-6">
            Thank you for your order. We've sent a confirmation email to {shippingData.email}.
          </p>
          <div className="bg-earth-50 dark:bg-slate-700 rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground">Order Number</p>
            <p className="font-mono font-bold text-lg">#PIC-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          </div>
          
          {items.some(i => i.material.type === 'eco') && (
            <div className="bg-brand-50 dark:bg-brand-900/20 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-brand-700 dark:text-brand-400">
                <Leaf className="w-5 h-5" />
                <span className="font-medium">
                  {items.filter(i => i.material.type === 'eco').reduce((sum, i) => sum + i.quantity, 0)} trees will be planted!
                </span>
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              <Truck className="w-4 h-4 inline mr-2" />
              Estimated delivery: 3-5 business days
            </p>
            <p className="text-sm text-muted-foreground">
              <Package className="w-4 h-4 inline mr-2" />
              You'll receive tracking info via email
            </p>
          </div>
          
          <Link href="/shop">
            <Button className="w-full mt-8 bg-brand-700 hover:bg-brand-800">
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/cart" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              Back to Cart
            </Link>
            <div className="flex items-center gap-2 text-sm">
              <Lock className="w-4 h-4 text-brand-600" />
              <span className="text-muted-foreground">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-brand-700' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'shipping' ? 'bg-brand-700 text-white' : 'bg-muted text-muted-foreground'
            }`}>
              1
            </div>
            <span className="hidden sm:inline font-medium">Shipping</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-brand-700' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'payment' ? 'bg-brand-700 text-white' : 'bg-muted text-muted-foreground'
            }`}>
              2
            </div>
            <span className="hidden sm:inline font-medium">Payment</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Forms */}
          <div className="lg:col-span-2">
            {step === 'shipping' && (
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleShippingSubmit}
              >
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                    
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={shippingData.firstName}
                            onChange={(e) => setShippingData({ ...shippingData, firstName: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={shippingData.lastName}
                            onChange={(e) => setShippingData({ ...shippingData, lastName: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={shippingData.email}
                            onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={shippingData.phone}
                            onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={shippingData.address}
                          onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                        <Input
                          id="apartment"
                          value={shippingData.apartment}
                          onChange={(e) => setShippingData({ ...shippingData, apartment: e.target.value })}
                        />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={shippingData.city}
                            onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={shippingData.state}
                            onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          <Input
                            id="zipCode"
                            value={shippingData.zipCode}
                            onChange={(e) => setShippingData({ ...shippingData, zipCode: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full mt-6 bg-brand-700 hover:bg-brand-800">
                      Continue to Payment
                    </Button>
                  </CardContent>
                </Card>
              </motion.form>
            )}

            {step === 'payment' && (
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handlePaymentSubmit}
              >
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                    
                    <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as typeof paymentMethod)} className="mb-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { id: 'card', label: 'Card', icon: CreditCard },
                          { id: 'applepay', label: 'Apple Pay', icon: Apple },
                          { id: 'googlepay', label: 'Google Pay', icon: CreditCard },
                          { id: 'shoppay', label: 'Shop Pay', icon: CreditCard },
                        ].map((method) => (
                          <div
                            key={method.id}
                            className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                              paymentMethod === method.id
                                ? 'border-brand-500 bg-brand-50/50'
                                : 'border-border hover:border-muted-foreground/50'
                            }`}
                            onClick={() => setPaymentMethod(method.id as typeof paymentMethod)}
                          >
                            <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
                            <method.icon className="w-5 h-5" />
                            <span className="text-sm font-medium">{method.label}</span>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>

                    {paymentMethod === 'card' && (
                      <div className="grid gap-4">
                        <div>
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input
                            id="cardName"
                            value={cardData.name}
                            onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardData.number}
                            onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              value={cardData.expiry}
                              onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={cardData.cvv}
                              onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod !== 'card' && (
                      <div className="bg-earth-50 dark:bg-slate-700 rounded-lg p-8 text-center">
                        <p className="text-muted-foreground">
                          You'll be redirected to {paymentMethod === 'applepay' ? 'Apple Pay' : paymentMethod === 'googlepay' ? 'Google Pay' : 'Shop Pay'} to complete your purchase.
                        </p>
                      </div>
                    )}

                    <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
                      <Shield className="w-4 h-4" />
                      <span>Your payment is secured with SSL encryption</span>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <Button type="button" variant="outline" onClick={() => setStep('shipping')}>
                        Back
                      </Button>
                      <Button 
                        type="submit" 
                        className="flex-1 bg-brand-700 hover:bg-brand-800"
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processing...' : `Pay $${getTotal().toFixed(2)}`}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.form>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-32">
              <CardContent className="p-6">
                <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
                
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden shrink-0 relative">
                        <img
                          src={item.customImage || item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-700 text-white text-xs rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">{item.device.name}</p>
                        <p className="text-sm font-medium mt-1">${item.totalPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

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
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${getTotal().toFixed(2)}</span>
                  </div>
                </div>

                {/* Eco Impact */}
                {items.some(i => i.material.type === 'eco') && (
                  <div className="mt-4 p-3 bg-brand-50 dark:bg-brand-900/20 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-brand-700 dark:text-brand-400">
                      <Leaf className="w-4 h-4" />
                      <span>This order plants {items.filter(i => i.material.type === 'eco').reduce((sum, i) => sum + i.quantity, 0)} trees</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
