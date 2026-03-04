'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Leaf,
  TreePine,
  Droplets,
  Recycle,
  Award,
  Truck,
  ArrowRight,
  Check,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/product/ProductCard';
import { getEcoProducts, materials } from '@/data/products';

export default function EcoCollectionPage() {
  const ecoProducts = getEcoProducts();
  const ecoMaterials = materials.filter(m => m.type === 'eco');

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative bg-brand-700 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-leaf-pattern opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="bg-white/20 text-white mb-4">
              <Leaf className="w-3 h-3 mr-1" />
              Planet-First Collection
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-heading">
              Eco Collection
            </h1>
            <p className="text-lg text-brand-100 mb-8">
              Phone cases crafted from nature, designed to return to nature. 
              100% biodegradable materials, zero compromise on style or protection.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/customize">
                <Button size="lg" className="bg-white text-brand-700 hover:bg-brand-50 gap-2">
                  Create Your Eco Case
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: TreePine, value: '25,000+', label: 'Trees Planted' },
              { icon: Globe, value: '50K+', label: 'CO₂ kg Saved' },
              { icon: Droplets, value: '2M+', label: 'Liters Water Saved' },
              { icon: Recycle, value: '100%', label: 'Compostable Options' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-earth-50 dark:bg-slate-900 rounded-xl"
              >
                <stat.icon className="w-8 h-8 text-brand-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 font-heading">
              Our Eco Materials
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each material is carefully selected for its sustainability credentials, 
              durability, and beauty. Click to learn more about each one.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecoMaterials.map((material, index) => (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:card-shadow-hover transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="w-16 h-16 rounded-full border shrink-0"
                        style={{ backgroundColor: material.color }}
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{material.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {material.description}
                        </p>
                      </div>
                    </div>

                    {material.ecoInfo && (
                      <div className="space-y-2">
                        {material.ecoInfo.compostable && (
                          <div className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-brand-600" />
                            <span>Compostable in {material.ecoInfo.compostTime}</span>
                          </div>
                        )}
                        {material.ecoInfo.carbonNegative && (
                          <div className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-brand-600" />
                            <span>Carbon-negative production</span>
                          </div>
                        )}
                        {material.ecoInfo.plantBased && (
                          <div className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-brand-600" />
                            <span>100% plant-based</span>
                          </div>
                        )}
                        {material.ecoInfo.recycledContent && (
                          <div className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-brand-600" />
                            <span>{material.ecoInfo.recycledContent}% recycled content</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-muted-foreground">
                        Price: +${material.priceModifier} from base
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-earth-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 font-heading">
              Eco Collection Products
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every eco case plants a tree and ships in plastic-free packaging
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecoProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 font-heading">
              Certifications & Standards
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'B Corp', desc: 'Certified B Corporation' },
              { name: 'FSC', desc: 'Forest Stewardship Council' },
              { name: 'Cradle to Cradle', desc: 'Circular Economy' },
              { name: '1% for the Planet', desc: 'Environmental Giving' },
            ].map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-earth-50 dark:bg-slate-900 rounded-xl"
              >
                <Award className="w-10 h-10 text-brand-600 mx-auto mb-3" />
                <p className="font-semibold">{cert.name}</p>
                <p className="text-xs text-muted-foreground">{cert.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-700">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Leaf className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4 font-heading">
              Ready to Go Eco?
            </h2>
            <p className="text-brand-100 mb-8 max-w-2xl mx-auto">
              Join thousands of eco-conscious customers who choose sustainable phone protection.
            </p>
            <Link href="/customize">
              <Button size="lg" className="bg-white text-brand-700 hover:bg-brand-50 gap-2">
                Create Your Eco Case Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
