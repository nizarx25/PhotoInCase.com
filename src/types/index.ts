// Product Types
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: 'standard' | 'eco';
  material: Material;
  isFeatured: boolean;
  isNew: boolean;
  isBestseller: boolean;
  rating: number;
  reviewCount: number;
  storyBehindMaterial?: string;
  sustainabilityInfo?: SustainabilityInfo;
  availableDevices: Device[];
  magSafeCompatible: boolean;
  inStock: boolean;
  tags: string[];
}

export interface Material {
  id: string;
  name: string;
  type: 'standard' | 'eco';
  description: string;
  icon: string;
  color: string;
  priceModifier: number;
  ecoInfo?: {
    compostable: boolean;
    compostTime?: string;
    carbonNegative: boolean;
    plantBased: boolean;
    recycledContent?: number;
  };
}

export interface SustainabilityInfo {
  co2Saved: string;
  waterSaved: string;
  treesPlanted: number;
  compostTime?: string;
  certifications: string[];
}

export interface Device {
  id: string;
  brand: 'apple' | 'samsung' | 'google' | 'other';
  name: string;
  model: string;
  year: number;
  popular: boolean;
}

// Cart Types
export interface CartItem {
  id: string;
  product: Product;
  device: Device;
  material: Material;
  quantity: number;
  customImage?: string;
  customText?: string;
  textColor?: string;
  filter?: ImageFilter;
  hasMagSafe: boolean;
  addOns: AddOn[];
  unitPrice: number;
  totalPrice: number;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  icon: string;
}

export interface ImageFilter {
  id: string;
  name: string;
  value: string;
}

// Checkout Types
export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentMethod {
  type: 'card' | 'applepay' | 'googlepay' | 'shoppay';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}

// Blog Types
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: Author;
  publishedAt: string;
  readTime: number;
  category: string;
  tags: string[];
}

export interface Author {
  name: string;
  avatar: string;
  bio: string;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  content: string;
  productPurchased: string;
  verified: boolean;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Promo Types
export interface PromoCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minOrder?: number;
  maxDiscount?: number;
  expiresAt?: string;
}

// Filter Types for Shop
export interface ShopFilters {
  category?: 'standard' | 'eco' | 'all';
  device?: string;
  priceRange?: [number, number];
  material?: string;
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'popular' | 'rating';
}

// Customization Types
export interface CustomizationState {
  uploadedImage: string | null;
  selectedDevice: Device | null;
  selectedMaterial: Material | null;
  customText: string;
  textColor: string;
  selectedFilter: ImageFilter | null;
  hasMagSafe: boolean;
  quantity: number;
  addOns: AddOn[];
}
