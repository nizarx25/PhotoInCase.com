'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Upload,
  Camera,
  Leaf,
  ChevronRight,
  Check,
  Info,
  Sparkles,
  Type,
  Palette,
  Sliders,
  Smartphone,
  ShoppingCart,
  ArrowRight,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { PhoneMockup } from '@/components/shared/PhoneMockup';
import { useCartStore } from '@/store/cart';
import { devices, materials, imageFilters, addOns } from '@/data/products';
import type { Device, Material, ImageFilter, AddOn, Product } from '@/types';

export default function CustomizePage() {
  const { addItem, toggleCart } = useCartStore();
  
  // State
  const [step, setStep] = useState(1);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<ImageFilter | null>(null);
  const [customText, setCustomText] = useState('');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [hasMagSafe, setHasMagSafe] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [ecoMode, setEcoMode] = useState(false);

  const popularDevices = devices.filter(d => d.popular);
  const filteredMaterials = ecoMode 
    ? materials.filter(m => m.type === 'eco')
    : materials;

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const calculatePrice = () => {
    let price = 29; // Base price
    if (selectedMaterial) price += selectedMaterial.priceModifier;
    if (hasMagSafe) price += 5;
    selectedAddOns.forEach(addon => price += addon.price);
    return price;
  };

  const handleAddToCart = () => {
    if (!uploadedImage || !selectedDevice || !selectedMaterial) {
      return;
    }
    
    // Create a dummy product for the customize flow
    const customProduct: Product = {
      id: 'custom-case',
      slug: 'custom-case',
      name: 'Custom Photo Case',
      description: 'Your personalized photo phone case',
      shortDescription: 'Custom photo phone case',
      price: 29,
      images: [],
      category: selectedMaterial.type === 'eco' ? 'eco' : 'standard',
      material: selectedMaterial,
      isFeatured: false,
      isNew: false,
      isBestseller: false,
      rating: 5,
      reviewCount: 0,
      availableDevices: [selectedDevice],
      magSafeCompatible: true,
      inStock: true,
      tags: ['custom'],
    };
    
    addItem(customProduct, selectedDevice, selectedMaterial, {
      customImage: uploadedImage,
      customText,
      textColor,
      filter: selectedFilter || undefined,
      hasMagSafe,
      addOns: selectedAddOns,
      quantity,
    });
    
    toggleCart();
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return uploadedImage !== null;
      case 2:
        return selectedDevice !== null;
      case 3:
        return selectedMaterial !== null;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-foreground">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">Customize Your Case</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-heading">
              Create Your Custom Phone Case
            </h1>
            <p className="text-muted-foreground mt-2">
              Upload your photo, choose your device & material, and we'll create a unique case just for you.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white dark:bg-slate-800 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between overflow-x-auto py-4 gap-4">
            {[
              { num: 1, label: 'Upload Photo', icon: Camera },
              { num: 2, label: 'Choose Device', icon: Smartphone },
              { num: 3, label: 'Select Material', icon: Leaf },
              { num: 4, label: 'Customize', icon: Palette },
            ].map((s, index) => (
              <button
                key={s.num}
                onClick={() => setStep(s.num)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                  step >= s.num
                    ? 'bg-brand-700 text-white'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <s.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">{s.num}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Preview */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 card-shadow"
            >
              <div className="flex justify-center mb-6">
                <PhoneMockup
                  image={uploadedImage}
                  material={selectedMaterial || undefined}
                  deviceName={selectedDevice?.name}
                  customText={customText}
                  textColor={textColor}
                  filter={selectedFilter?.value}
                  size="lg"
                />
              </div>

              {/* Quick Info */}
              <div className="border-t pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Device</span>
                  <span className="font-medium">
                    {selectedDevice?.name || 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Material</span>
                  <span className="font-medium flex items-center gap-1">
                    {selectedMaterial?.name || 'Not selected'}
                    {selectedMaterial?.type === 'eco' && (
                      <Leaf className="w-3 h-3 text-brand-500" />
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${(calculatePrice() * quantity).toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Steps */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {/* Step 1: Upload Photo */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Camera className="w-5 h-5 text-brand-600" />
                        Upload Your Photo
                      </h2>

                      <div
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-12 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50/50 dark:hover:bg-brand-900/20 transition-all"
                      >
                        {uploadedImage ? (
                          <div className="space-y-4">
                            <img
                              src={uploadedImage}
                              alt="Uploaded"
                              className="max-w-xs mx-auto rounded-lg shadow-lg"
                            />
                            <div className="flex justify-center gap-2">
                              <label className="cursor-pointer">
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                  className="hidden"
                                />
                                <Button variant="outline" asChild>
                                  <span>Change Photo</span>
                                </Button>
                              </label>
                              <Button
                                variant="outline"
                                onClick={() => setUploadedImage(null)}
                              >
                                <X className="w-4 h-4 mr-1" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <label className="cursor-pointer block">
                            <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <p className="text-lg font-medium mb-2">
                              Drag & drop your photo here
                            </p>
                            <p className="text-muted-foreground mb-4">
                              or click to browse
                            </p>
                            <p className="text-sm text-muted-foreground">
                              JPG, PNG, WebP • Max 10MB
                            </p>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>

                      {/* Tips */}
                      <div className="mt-6 p-4 bg-earth-50 dark:bg-slate-800 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-gold-500" />
                          Photo Tips
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• High-resolution photos (300+ DPI) work best</li>
                          <li>• Portrait photos fit perfectly on phone cases</li>
                          <li>• Ensure good lighting for vibrant prints</li>
                          <li>• Avoid cropped faces at edges</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 2: Choose Device */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-brand-600" />
                        Choose Your Device
                      </h2>

                      {/* Popular Devices */}
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-muted-foreground mb-3">
                          Popular Models
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {popularDevices.map((device) => (
                            <button
                              key={device.id}
                              onClick={() => setSelectedDevice(device)}
                              className={`p-4 rounded-lg border-2 text-left transition-all ${
                                selectedDevice?.id === device.id
                                  ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-900/20'
                                  : 'border-border hover:border-muted-foreground/50'
                              }`}
                            >
                              <p className="font-medium text-sm">{device.name}</p>
                              <p className="text-xs text-muted-foreground">{device.year}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* All Devices */}
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-3">
                          All Devices
                        </h4>
                        <Select
                          value={selectedDevice?.id}
                          onValueChange={(value) => {
                            const device = devices.find(d => d.id === value);
                            if (device) setSelectedDevice(device);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your device" />
                          </SelectTrigger>
                          <SelectContent className="max-h-64">
                            {['apple', 'samsung', 'google'].map((brand) => (
                              <div key={brand}>
                                <p className="px-2 py-1 text-xs text-muted-foreground font-medium uppercase">
                                  {brand === 'apple' ? 'iPhone' : brand === 'samsung' ? 'Samsung Galaxy' : 'Google Pixel'}
                                </p>
                                {devices
                                  .filter(d => d.brand === brand)
                                  .map(device => (
                                    <SelectItem key={device.id} value={device.id}>
                                      {device.name}
                                    </SelectItem>
                                  ))}
                              </div>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 3: Select Material */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Leaf className="w-5 h-5 text-brand-600" />
                        Select Material
                      </h2>

                      {/* Eco Mode Toggle */}
                      <div className="flex items-center justify-between p-4 bg-brand-50 dark:bg-brand-900/20 rounded-lg mb-6">
                        <div className="flex items-center gap-3">
                          <Leaf className="w-5 h-5 text-brand-600" />
                          <div>
                            <h4 className="font-medium">Eco Mode</h4>
                            <p className="text-sm text-muted-foreground">
                              Show only biodegradable materials
                            </p>
                          </div>
                        </div>
                        <Switch checked={ecoMode} onCheckedChange={setEcoMode} />
                      </div>

                      {/* Materials Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredMaterials.map((material) => (
                          <button
                            key={material.id}
                            onClick={() => setSelectedMaterial(material)}
                            className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                              selectedMaterial?.id === material.id
                                ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-900/20'
                                : 'border-border hover:border-muted-foreground/50'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className="w-12 h-12 rounded-full border shrink-0"
                                style={{ backgroundColor: material.color }}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{material.name}</span>
                                  {material.type === 'eco' && (
                                    <Badge className="bg-brand-600 text-white">
                                      <Leaf className="w-3 h-3 mr-1" />
                                      Eco
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {material.description}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="text-sm font-medium">
                                    {material.priceModifier > 0 ? `+$${material.priceModifier}` : 'Included'}
                                  </span>
                                  {material.ecoInfo?.compostable && (
                                    <span className="text-xs text-brand-600">
                                      Composts in {material.ecoInfo.compostTime}
                                    </span>
                                  )}
                                </div>
                              </div>
                              {selectedMaterial?.id === material.id && (
                                <Check className="w-5 h-5 text-brand-600 shrink-0" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>

                      <Link href="/eco" className="block mt-4">
                        <Button variant="outline" className="w-full">
                          Learn More About Our Eco Materials
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 4: Customize */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <Palette className="w-5 h-5 text-brand-600" />
                        Customize Your Design
                      </h2>

                      <Tabs defaultValue="filters">
                        <TabsList className="w-full">
                          <TabsTrigger value="filters">Filters</TabsTrigger>
                          <TabsTrigger value="text">Text</TabsTrigger>
                          <TabsTrigger value="addons">Add-ons</TabsTrigger>
                        </TabsList>

                        <TabsContent value="filters" className="mt-4">
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {imageFilters.map((filter) => (
                              <button
                                key={filter.id}
                                onClick={() => setSelectedFilter(
                                  filter.id === 'none' ? null : filter
                                )}
                                className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                                  (selectedFilter?.id === filter.id || (!selectedFilter && filter.id === 'none'))
                                    ? 'border-brand-500'
                                    : 'border-transparent hover:border-muted-foreground/50'
                                }`}
                              >
                                {uploadedImage ? (
                                  <img
                                    src={uploadedImage}
                                    alt={filter.name}
                                    className="w-full aspect-square object-cover"
                                    style={{ filter: filter.value }}
                                  />
                                ) : (
                                  <div className="w-full aspect-square bg-muted flex items-center justify-center text-xs">
                                    {filter.name}
                                  </div>
                                )}
                                <p className="text-xs p-2 bg-black/50 text-white absolute bottom-0 left-0 right-0">
                                  {filter.name}
                                </p>
                              </button>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="text" className="mt-4 space-y-4">
                          <div>
                            <Label>Add Custom Text</Label>
                            <Input
                              value={customText}
                              onChange={(e) => setCustomText(e.target.value)}
                              placeholder="Enter text..."
                              className="mt-2"
                              maxLength={50}
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              {customText.length}/50 characters
                            </p>
                          </div>

                          <div>
                            <Label>Text Color</Label>
                            <div className="flex gap-2 mt-2">
                              {['#FFFFFF', '#000000', '#D97706', '#C2410C', '#166534'].map((color) => (
                                <button
                                  key={color}
                                  onClick={() => setTextColor(color)}
                                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                                    textColor === color ? 'border-brand-500 scale-110' : 'border-border'
                                  }`}
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="addons" className="mt-4 space-y-4">
                          {/* MagSafe */}
                          <div className="flex items-center justify-between p-4 bg-earth-50 dark:bg-slate-800 rounded-lg">
                            <div>
                              <h4 className="font-medium">MagSafe Compatible</h4>
                              <p className="text-sm text-muted-foreground">
                                Add MagSafe magnets (+$5)
                              </p>
                            </div>
                            <Switch checked={hasMagSafe} onCheckedChange={setHasMagSafe} />
                          </div>

                          {/* Add-ons */}
                          <div className="grid grid-cols-2 gap-3">
                            {addOns.map((addon) => (
                              <button
                                key={addon.id}
                                onClick={() => {
                                  setSelectedAddOns(prev =>
                                    prev.some(a => a.id === addon.id)
                                      ? prev.filter(a => a.id !== addon.id)
                                      : [...prev, addon]
                                  );
                                }}
                                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                                  selectedAddOns.some(a => a.id === addon.id)
                                    ? 'border-brand-500 bg-brand-50/50'
                                    : 'border-border hover:border-muted-foreground/50'
                                }`}
                              >
                                <span className="text-xl">{addon.icon}</span>
                                <div className="text-left">
                                  <p className="text-sm font-medium">{addon.name}</p>
                                  <p className="text-xs text-muted-foreground">+${addon.price}</p>
                                </div>
                                {selectedAddOns.some(a => a.id === addon.id) && (
                                  <Check className="w-4 h-4 text-brand-600 ml-auto" />
                                )}
                              </button>
                            ))}
                          </div>

                          {/* Quantity */}
                          <div className="flex items-center justify-between pt-4">
                            <h4 className="font-medium">Quantity</h4>
                            <div className="flex items-center border rounded-lg">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                disabled={quantity <= 1}
                              >
                                -
                              </Button>
                              <span className="w-12 text-center font-medium">{quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setQuantity(quantity + 1)}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              )}
              
              {step < 4 ? (
                <Button
                  className="bg-brand-700 hover:bg-brand-800 ml-auto"
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  className="bg-brand-700 hover:bg-brand-800 ml-auto"
                  onClick={handleAddToCart}
                  disabled={!uploadedImage || !selectedDevice || !selectedMaterial}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart - ${(calculatePrice() * quantity).toFixed(2)}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
