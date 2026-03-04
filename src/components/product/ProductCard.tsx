'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Leaf, Star, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const isEco = product.category === 'eco';
  const discount = product.comparePrice 
    ? Math.round((1 - product.price / product.comparePrice) * 100) 
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <Link href={`/shop/${product.slug}`}>
        <div className="relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {isEco && (
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
              {discount > 0 && (
                <Badge className="bg-red-500 text-white">-{discount}%</Badge>
              )}
            </div>

            {/* Wishlist */}
            <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 dark:bg-slate-800/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
              <Heart className="w-4 h-4" />
            </button>

            {/* Quick actions */}
            <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
              <Button size="sm" className="flex-1 bg-brand-700 hover:bg-brand-800">
                <ShoppingCart className="w-4 h-4 mr-1" />
                Add to Cart
              </Button>
              <Button size="sm" variant="secondary">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating)
                        ? 'text-gold-500 fill-current'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>

            {/* Name */}
            <h3 className="font-semibold text-foreground group-hover:text-brand-700 transition-colors line-clamp-1">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {product.shortDescription}
            </p>

            {/* Material */}
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <span>{product.material.icon}</span>
              <span>{product.material.name}</span>
              {product.material.type === 'eco' && (
                <Leaf className="w-3 h-3 text-brand-500" />
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mt-3">
              <span className="text-lg font-bold text-foreground">
                ${product.price}
              </span>
              {product.comparePrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.comparePrice}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
