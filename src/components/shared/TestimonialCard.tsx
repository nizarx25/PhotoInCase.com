'use client';

import { motion } from 'framer-motion';
import { Star, CheckCircle, Quote } from 'lucide-react';
import type { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 card-shadow relative"
    >
      {/* Quote icon */}
      <Quote className="absolute top-4 right-4 w-8 h-8 text-earth-200 dark:text-slate-700" />

      {/* Rating */}
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < testimonial.rating
                ? 'text-gold-500 fill-current'
                : 'text-slate-300'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-foreground mb-4 line-clamp-4">
        "{testimonial.content}"
      </p>

      {/* Product purchased */}
      <p className="text-sm text-muted-foreground mb-4">
        Purchased: <span className="font-medium text-foreground">{testimonial.productPurchased}</span>
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-foreground">{testimonial.name}</p>
            {testimonial.verified && (
              <CheckCircle className="w-4 h-4 text-brand-500" />
            )}
          </div>
          <p className="text-sm text-muted-foreground">{testimonial.location}</p>
        </div>
      </div>
    </motion.div>
  );
}
