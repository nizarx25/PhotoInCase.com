'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Star,
  Leaf,
  Heart,
  Share2,
  Truck,
  Shield,
  Clock,
  ChevronRight,
  Plus,
  Minus,
  Check,
  Info,
  Sparkles,
  Camera,
  Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PhoneMockup } from '@/components/shared/PhoneMockup';
import { ProductCard } from '@/components/product/ProductCard';
import { useCartStore } from '@/store/cart';
import { getProductBySlug, getRelatedProducts, devices, materials, addOns } from '@/data/products';
import type { Device, Material, AddOn } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const product = useMemo(() => getProductBySlug(slug), [slug]);
  
  const { addItem, toggleCart } = useCartStore();
  
  // Initialize state with product data
  const initialMaterial = product?.material ?? null;
  const initialDevice = product?.availableDevices[0] ?? null;
  
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(initialDevice);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(initialMaterial);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [hasMagSafe, setHasMagSafe] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [customImage, setCustomImage] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.id);

  const calculatePrice = () => {
    let price = product.price;
    if (selectedMaterial) {
      price += selectedMaterial.priceModifier - product.material.priceModifier;
    }
    if (hasMagSafe) price += 5;
    selectedAddOns.forEach(addon => price += addon.price);
    return price;
  };

  const handleAddToCart = () => {
    if (!selectedDevice || !selectedMaterial) return;
    
    addItem(product, selectedDevice, selectedMaterial, {
      customImage: customImage || undefined,
      hasMagSafe,
      addOns: selectedAddOns,
      quantity,
    });
    
    toggleCart();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const popularDevices = devices.filter(d => d.popular);

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-slate-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-slate-800 border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/shop" className="hover:text-foreground">Shop</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Images & Preview */}
          <div className="space-y-6">
            {/* Main Preview with Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 card-shadow"
            >
              <div className="flex justify-center">
                <PhoneMockup
                  image={customImage || product.images[activeImage]}
                  material={selectedMaterial || product.material}
                  deviceName={selectedDevice?.name}
                  size="lg"
                />
              </div>
            </motion.div>

            {/* Image Upload */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 card-shadow">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Upload Your Photo
              </h3>
              <label className="block">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50/50 dark:hover:bg-brand-900/20 transition-colors">
                  {customImage ? (
                    <div className="space-y-2">
                      <img
                        src={customImage}
                        alt="Uploaded"
                        className="w-32 h-32 object-cover rounded-lg mx-auto"
                      />
                      <p className="text-sm text-muted-foreground">Click to change photo</p>
                    </div>
                  ) : (
                    <>
                      <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="font-medium mb-1">Drag & drop or click to upload</p>
                      <p className="text-sm text-muted-foreground">JPG, PNG, WebP up to 10MB</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              {customImage && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => setCustomImage(null)}
                >
                  Remove Photo
                </Button>
              )}
            </div>

            {/* Product Images Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                    activeImage === index ? 'border-brand-500 ring-2 ring-brand-500/20' : 'border-transparent'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info & Options */}
          <div className="space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {product.category === 'eco' && (
                  <Badge className="bg-brand-600 text-white gap-1">
                    <Leaf className="w-3 h-3" />
                    Eco
                  </Badge>
                )}
                {product.isNew && (
                  <Badge className="bg-gold-500 text-white">New</Badge>
                )}
                {product.isBestseller && (
                  <Badge className="bg-terracotta-500 text-white">Bestseller</Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 font-heading">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-gold-500 fill-current'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">
                  ${calculatePrice()}
                </span>
                {product.comparePrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.comparePrice}
                  </span>
                )}
              </div>

              <p className="text-muted-foreground">{product.shortDescription}</p>
            </motion.div>

            <Separator />

            {/* Device Selection */}
            <div>
              <h3 className="font-semibold mb-3">Select Your Device</h3>
              <Select
                value={selectedDevice?.id}
                onValueChange={(value) => {
                  const device = devices.find(d => d.id === value);
                  if (device) setSelectedDevice(device);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose your device" />
                </SelectTrigger>
                <SelectContent>
                  <div className="p-2">
                    <p className="text-xs text-muted-foreground mb-2">Popular</p>
                    {popularDevices.map(device => (
                      <SelectItem key={device.id} value={device.id}>
                        {device.name}
                      </SelectItem>
                    ))}
                  </div>
                  <Separator />
                  <div className="p-2 max-h-48 overflow-y-auto">
                    <p className="text-xs text-muted-foreground mb-2">All Devices</p>
                    {devices.map(device => (
                      <SelectItem key={device.id} value={device.id}>
                        {device.name}
                      </SelectItem>
                    ))}
                  </div>
                </SelectContent>
              </Select>
            </div>

            {/* Material Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Material</h3>
                <Link href="/eco" className="text-sm text-brand-600 hover:underline">
                  Learn about eco materials
                </Link>
              </div>
              <RadioGroup
                value={selectedMaterial?.id}
                onValueChange={(value) => {
                  const material = materials.find(m => m.id === value);
                  if (material) setSelectedMaterial(material);
                }}
                className="grid grid-cols-2 gap-3"
              >
                {materials.map((material) => (
                  <div
                    key={material.id}
                    className={`relative flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedMaterial?.id === material.id
                        ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-900/20'
                        : 'border-border hover:border-muted-foreground/50'
                    }`}
                    onClick={() => setSelectedMaterial(material)}
                  >
                    <div
                      className="w-8 h-8 rounded-full border"
                      style={{ backgroundColor: material.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{material.name}</span>
                        {material.type === 'eco' && (
                          <Leaf className="w-3 h-3 text-brand-500" />
                        )}
                      </div>
                      {material.priceModifier > 0 && (
                        <span className="text-xs text-muted-foreground">
                          +${material.priceModifier}
                        </span>
                      )}
                    </div>
                    {selectedMaterial?.id === material.id && (
                      <Check className="w-4 h-4 text-brand-600" />
                    )}
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* MagSafe Toggle */}
            {product.magSafeCompatible && (
              <div className="flex items-center justify-between p-4 bg-earth-50 dark:bg-slate-800 rounded-lg">
                <div>
                  <h4 className="font-medium">MagSafe Compatible</h4>
                  <p className="text-sm text-muted-foreground">Add MagSafe magnets (+$5)</p>
                </div>
                <Switch checked={hasMagSafe} onCheckedChange={setHasMagSafe} />
              </div>
            )}

            {/* Add-ons */}
            <div>
              <h3 className="font-semibold mb-3">Add-ons</h3>
              <div className="grid grid-cols-2 gap-3">
                {addOns.map((addon) => (
                  <div
                    key={addon.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedAddOns.some(a => a.id === addon.id)
                        ? 'border-brand-500 bg-brand-50/50'
                        : 'border-border hover:border-muted-foreground/50'
                    }`}
                    onClick={() => {
                      setSelectedAddOns(prev =>
                        prev.some(a => a.id === addon.id)
                          ? prev.filter(a => a.id !== addon.id)
                          : [...prev, addon]
                      );
                    }}
                  >
                    <span className="text-xl">{addon.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{addon.name}</p>
                      <p className="text-xs text-muted-foreground">+${addon.price}</p>
                    </div>
                    {selectedAddOns.some(a => a.id === addon.id) && (
                      <Check className="w-4 h-4 text-brand-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <h3 className="font-semibold">Quantity</h3>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 bg-brand-700 hover:bg-brand-800"
                onClick={handleAddToCart}
              >
                Add to Cart - ${calculatePrice()}
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-lg">
                <Truck className="w-5 h-5 mx-auto mb-1 text-brand-600" />
                <p className="text-xs font-medium">Free Shipping $50+</p>
              </div>
              <div className="p-3 bg-white dark:bg-slate-800 rounded-lg">
                <Shield className="w-5 h-5 mx-auto mb-1 text-brand-600" />
                <p className="text-xs font-medium">30-Day Returns</p>
              </div>
              <div className="p-3 bg-white dark:bg-slate-800 rounded-lg">
                <Clock className="w-5 h-5 mx-auto mb-1 text-brand-600" />
                <p className="text-xs font-medium">Ships in 3-5 Days</p>
              </div>
            </div>

            {/* Eco Info */}
            {product.category === 'eco' && product.sustainabilityInfo && (
              <div className="bg-brand-50 dark:bg-brand-900/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Leaf className="w-5 h-5 text-brand-600" />
                  <h4 className="font-semibold text-brand-700 dark:text-brand-400">
                    Planet-First Impact
                  </h4>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-brand-700">
                      {product.sustainabilityInfo.co2Saved}
                    </p>
                    <p className="text-xs text-muted-foreground">CO₂ Saved</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-brand-700">
                      {product.sustainabilityInfo.waterSaved}
                    </p>
                    <p className="text-xs text-muted-foreground">Water Saved</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-brand-700">
                      {product.sustainabilityInfo.treesPlanted}+
                    </p>
                    <p className="text-xs text-muted-foreground">Trees Planted</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6 prose dark:prose-invert max-w-none">
                  {product.description.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="materials" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-16 h-16 rounded-full border"
                      style={{ backgroundColor: product.material.color }}
                    />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{product.material.name}</h3>
                      <p className="text-muted-foreground mb-4">
                        {product.material.description}
                      </p>
                      {product.storyBehindMaterial && (
                        <div className="bg-earth-50 dark:bg-slate-800 rounded-lg p-4">
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <Info className="w-4 h-4" />
                            Story Behind the Material
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {product.storyBehindMaterial}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Shipping Information</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <Package className="w-4 h-4" />
                          Ships in 3-5 business days
                        </li>
                        <li>Free shipping on orders over $50</li>
                        <li>Standard shipping: $4.99</li>
                        <li>Express shipping: $12.99</li>
                        <li>We ship worldwide</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Returns & Exchanges</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>30-day return policy</li>
                        <li>Free returns on defective items</li>
                        <li>Custom products are final sale</li>
                        <li>Easy exchange process</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">
                    Reviews section coming soon. This product has a {product.rating} star rating from {product.reviewCount} reviews.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
