import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, Device, Material, AddOn, ImageFilter, PromoCode } from '@/types';

interface CartState {
  items: CartItem[];
  promoCode: PromoCode | null;
  isOpen: boolean;
  
  // Actions
  addItem: (product: Product, device: Device, material: Material, options?: {
    customImage?: string;
    customText?: string;
    textColor?: string;
    filter?: ImageFilter;
    hasMagSafe?: boolean;
    addOns?: AddOn[];
    quantity?: number;
  }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  
  // Computed
  getItemCount: () => number;
  getSubtotal: () => number;
  getDiscount: () => number;
  getTotal: () => number;
  getShipping: () => number;
}

// Demo promo codes
const promoCodes: Record<string, PromoCode> = {
  'ECO2026': { code: 'ECO2026', discount: 15, type: 'percentage', minOrder: 30 },
  'PLANETFIRST': { code: 'PLANETFIRST', discount: 10, type: 'percentage' },
  'WELCOME10': { code: 'WELCOME10', discount: 10, type: 'percentage' },
  'FREESHIP': { code: 'FREESHIP', discount: 5, type: 'fixed' },
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      isOpen: false,

      addItem: (product, device, material, options = {}) => {
        const {
          customImage,
          customText = '',
          textColor = '#FFFFFF',
          filter,
          hasMagSafe = false,
          addOns = [],
          quantity = 1,
        } = options;

        const unitPrice = product.price + material.priceModifier + 
          addOns.reduce((sum, addon) => sum + addon.price, 0) +
          (hasMagSafe ? 5 : 0);
        
        const newItem: CartItem = {
          id: `${product.id}-${device.id}-${material.id}-${Date.now()}`,
          product,
          device,
          material,
          quantity,
          customImage,
          customText,
          textColor,
          filter: filter || undefined,
          hasMagSafe,
          addOns,
          unitPrice,
          totalPrice: unitPrice * quantity,
        };

        set((state) => ({
          items: [...state.items, newItem],
        }));
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity, totalPrice: item.unitPrice * quantity }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], promoCode: null });
      },

      applyPromoCode: (code) => {
        const upperCode = code.toUpperCase();
        const promo = promoCodes[upperCode];
        if (promo) {
          const subtotal = get().getSubtotal();
          if (promo.minOrder && subtotal < promo.minOrder) {
            return false;
          }
          set({ promoCode: promo });
          return true;
        }
        return false;
      },

      removePromoCode: () => {
        set({ promoCode: null });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      setCartOpen: (open) => {
        set({ isOpen: open });
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.totalPrice, 0);
      },

      getDiscount: () => {
        const { promoCode } = get();
        if (!promoCode) return 0;
        
        const subtotal = get().getSubtotal();
        if (promoCode.type === 'percentage') {
          const discount = subtotal * (promoCode.discount / 100);
          return promoCode.maxDiscount ? Math.min(discount, promoCode.maxDiscount) : discount;
        }
        return promoCode.discount;
      },

      getShipping: () => {
        const subtotal = get().getSubtotal();
        if (subtotal >= 50) return 0; // Free shipping over $50
        return 4.99;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        const shipping = get().getShipping();
        return subtotal - discount + shipping;
      },
    }),
    {
      name: 'photoincase-cart',
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
      }),
    }
  )
);
