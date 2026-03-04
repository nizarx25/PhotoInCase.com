'use client';

import { useState, useMemo, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  LayoutList, 
  Leaf,
  X,
  SlidersHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '@/components/product/ProductCard';
import { products, materials } from '@/data/products';
import type { Product } from '@/types';

function ShopContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const filterParam = searchParams.get('filter') || '';
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState(searchQuery);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'eco' | 'standard'>(
    filterParam === 'eco' ? 'eco' : filterParam === 'standard' ? 'standard' : 'all'
  );
  const [priceRange, setPriceRange] = useState([0, 60]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (search) {
      const query = search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.shortDescription.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Material filter
    if (selectedMaterials.length > 0) {
      result = result.filter(p => selectedMaterials.includes(p.material.id));
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [search, selectedCategory, priceRange, selectedMaterials, sortBy]);

  const ecoCount = products.filter(p => p.category === 'eco').length;
  const standardCount = products.filter(p => p.category === 'standard').length;

  const filtersContent = (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h4 className="font-semibold mb-3">Category</h4>
        <div className="space-y-2">
          <div
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
              selectedCategory === 'all' ? 'bg-brand-100 dark:bg-brand-900/30' : 'hover:bg-muted'
            }`}
            onClick={() => setSelectedCategory('all')}
          >
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full border-2 ${
                selectedCategory === 'all' ? 'border-brand-600 bg-brand-600' : 'border-muted-foreground'
              }`}>
                {selectedCategory === 'all' && (
                  <div className="w-full h-full flex items-center justify-center text-white text-[8px]">✓</div>
                )}
              </div>
              <span>All Cases</span>
            </div>
            <Badge variant="secondary">{products.length}</Badge>
          </div>
          
          <div
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
              selectedCategory === 'eco' ? 'bg-brand-100 dark:bg-brand-900/30' : 'hover:bg-muted'
            }`}
            onClick={() => setSelectedCategory('eco')}
          >
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full border-2 ${
                selectedCategory === 'eco' ? 'border-brand-600 bg-brand-600' : 'border-muted-foreground'
              }`}>
                {selectedCategory === 'eco' && (
                  <div className="w-full h-full flex items-center justify-center text-white text-[8px]">✓</div>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Leaf className="w-4 h-4 text-brand-500" />
                <span>Eco Collection</span>
              </div>
            </div>
            <Badge variant="secondary">{ecoCount}</Badge>
          </div>
          
          <div
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
              selectedCategory === 'standard' ? 'bg-brand-100 dark:bg-brand-900/30' : 'hover:bg-muted'
            }`}
            onClick={() => setSelectedCategory('standard')}
          >
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full border-2 ${
                selectedCategory === 'standard' ? 'border-brand-600 bg-brand-600' : 'border-muted-foreground'
              }`}>
                {selectedCategory === 'standard' && (
                  <div className="w-full h-full flex items-center justify-center text-white text-[8px]">✓</div>
                )}
              </div>
              <span>Standard</span>
            </div>
            <Badge variant="secondary">{standardCount}</Badge>
          </div>
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h4 className="font-semibold mb-3">Price Range</h4>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={60}
            min={0}
            step={5}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Materials */}
      <div>
        <h4 className="font-semibold mb-3">Material</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {materials.map((material) => (
            <div
              key={material.id}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer"
              onClick={() => {
                setSelectedMaterials(prev =>
                  prev.includes(material.id)
                    ? prev.filter(m => m !== material.id)
                    : [...prev, material.id]
                );
              }}
            >
              <Checkbox
                checked={selectedMaterials.includes(material.id)}
                onCheckedChange={() => {}}
              />
              <span className="text-sm">{material.icon}</span>
              <span className="text-sm flex-1">{material.name}</span>
              {material.type === 'eco' && (
                <Leaf className="w-3 h-3 text-brand-500" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(selectedCategory !== 'all' || selectedMaterials.length > 0 || priceRange[0] > 0 || priceRange[1] < 60) && (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            setSelectedCategory('all');
            setSelectedMaterials([]);
            setPriceRange([0, 60]);
          }}
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Shop All Cases
            </h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} products found
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search cases..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>

          <div className="flex gap-2">
            {/* Mobile Filters */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  {filtersContent}
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="hidden sm:flex border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="rounded-none"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="rounded-none"
              >
                <LayoutList className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32 bg-white dark:bg-slate-800 rounded-xl p-6 card-shadow">
              <h3 className="font-semibold text-lg mb-4">Filters</h3>
              {filtersContent}
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters
                </p>
                <Button
                  onClick={() => {
                    setSearch('');
                    setSelectedCategory('all');
                    setSelectedMaterials([]);
                    setPriceRange([0, 60]);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
