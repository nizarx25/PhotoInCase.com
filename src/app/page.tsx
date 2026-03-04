'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowRight, 
  Leaf, 
  Truck, 
  Shield, 
  Camera, 
  Palette, 
  Package,
  Star,
  Users,
  TreePine,
  Globe,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/product/ProductCard';
import { TestimonialCard } from '@/components/shared/TestimonialCard';
import { PhoneMockup } from '@/components/shared/PhoneMockup';
import { getFeaturedProducts, testimonials } from '@/data/products';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts().slice(0, 6);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-earth-50 via-white to-sage-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-eco-pattern opacity-30" />
        
        {/* Floating leaves decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
              }}
              animate={{
                y: ['0%', '110vh'],
                rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                delay: i * 2,
              }}
            >
              <Leaf className="w-6 h-6 text-brand-300 dark:text-brand-700 opacity-40" />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
            >
              <Badge className="mb-4 bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400 gap-1">
                <Leaf className="w-3 h-3" />
                Planet First
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 font-heading leading-tight">
                Turn Your Photo Into a{' '}
                <span className="text-brand-700 dark:text-brand-400">Premium Eco</span>{' '}
                Phone Case
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
                Your Photo. Your Case. Planet First. Personalized phone cases crafted from sustainable, biodegradable materials.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/customize">
                  <Button size="lg" className="bg-brand-700 hover:bg-brand-800 gap-2 w-full sm:w-auto">
                    Start Customizing Now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/eco">
                  <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                    <Leaf className="w-4 h-4" />
                    Browse Eco Collection
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mt-10">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">50,000+</p>
                    <p className="text-sm text-muted-foreground">Happy Customers</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center">
                    <TreePine className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">25,000+</p>
                    <p className="text-sm text-muted-foreground">Trees Planted</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">4.9/5</p>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right content - Phone mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex justify-center"
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-brand-400/20 blur-[100px] rounded-full" />
                
                <PhoneMockup
                  image="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=800&fit=crop"
                  material={{ name: 'Bamboo Fiber', color: '#D4C4A8', type: 'eco' }}
                  deviceName="iPhone 18 Pro"
                  size="lg"
                />

                {/* Floating badges */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -right-4 top-1/4 bg-white dark:bg-slate-800 rounded-full px-4 py-2 shadow-lg flex items-center gap-2"
                >
                  <Leaf className="w-4 h-4 text-brand-500" />
                  <span className="text-sm font-medium">100% Compostable</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -left-4 bottom-1/4 bg-white dark:bg-slate-800 rounded-full px-4 py-2 shadow-lg flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-gold-500" />
                  <span className="text-sm font-medium">Premium Quality</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-brand-700 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-white text-sm">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4" />
              <span>100% Compostable Options</span>
            </div>
            <div className="hidden md:block w-1 h-1 bg-white/50 rounded-full" />
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>50,000+ Happy Customers</span>
            </div>
            <div className="hidden md:block w-1 h-1 bg-white/50 rounded-full" />
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Carbon Negative</span>
            </div>
            <div className="hidden md:block w-1 h-1 bg-white/50 rounded-full" />
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              <span>Free Shipping $50+</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Eco Cases */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-sage-100 text-sage-700 dark:bg-sage-900/30 dark:text-sage-400">
              Trending Now
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 font-heading">
              Eco Collection Bestsellers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our most loved sustainable phone cases, crafted from biodegradable materials.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/shop">
              <Button size="lg" variant="outline" className="gap-2">
                View All Cases
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-earth-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 font-heading">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Create your custom eco phone case in 3 simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Camera,
                title: 'Upload Your Photo',
                description: 'Drag & drop or upload any photo from your device. Our preview shows exactly how it looks.',
                color: 'bg-brand-100 dark:bg-brand-900/30',
                iconColor: 'text-brand-600',
              },
              {
                icon: Palette,
                title: 'Customize Your Case',
                description: 'Choose your device, material, and add personal touches like text or filters.',
                color: 'bg-sage-100 dark:bg-sage-900/30',
                iconColor: 'text-sage-600',
              },
              {
                icon: Package,
                title: 'Receive & Enjoy',
                description: 'Ships in 3-5 days. Your eco case arrives in plastic-free, recyclable packaging.',
                color: 'bg-gold-100 dark:bg-gold-900/30',
                iconColor: 'text-gold-600',
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 text-center card-shadow h-full">
                  <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <step.icon className={`w-8 h-8 ${step.iconColor}`} />
                  </div>
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-brand-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/how-it-works">
              <Button variant="outline" className="gap-2">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-terracotta-100 text-terracotta-700 dark:bg-terracotta-900/30 dark:text-terracotta-400">
                Why Choose Us
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 font-heading">
                Sustainable Style Without Compromise
              </h2>
              <p className="text-muted-foreground mb-8">
                We believe protecting your phone shouldn't come at the planet's expense. Every case we make is designed with Earth in mind.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Leaf, text: 'Compostable within 6 months (eco cases)' },
                  { icon: TreePine, text: '1 tree planted for every eco order' },
                  { icon: Globe, text: 'Carbon-negative shipping worldwide' },
                  { icon: Shield, text: 'Premium protection, zero plastic waste' },
                  { icon: Sparkles, text: 'Crystal-clear print quality guaranteed' },
                ].map((item, index) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-brand-600" />
                    </div>
                    <span className="text-foreground">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <Link href="/about">
                <Button className="mt-8 bg-brand-700 hover:bg-brand-800 gap-2">
                  Our Sustainability Story
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: '100%', label: 'Compostable Options', suffix: '' },
                { value: '50K+', label: 'Happy Customers', suffix: '' },
                { value: '25K', label: 'Trees Planted', suffix: '' },
                { value: '0', label: 'Plastic in Eco Cases', suffix: '' },
                { value: '4.9', label: 'Average Rating', suffix: '/5' },
                { value: '3-5', label: 'Day Shipping', suffix: ' days' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-earth-50 dark:bg-slate-800 rounded-2xl p-6 text-center"
                >
                  <p className="text-3xl font-bold text-brand-700 dark:text-brand-400">
                    {stat.value}{stat.suffix}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-earth-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 font-heading">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of eco-conscious customers who love their personalized cases
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-brand-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-leaf-pattern opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-heading">
              Ready to Create Your Custom Eco Case?
            </h2>
            <p className="text-brand-100 text-lg mb-8">
              Upload your favorite photo and transform it into a sustainable phone case you'll love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/customize">
                <Button size="lg" className="bg-white text-brand-700 hover:bg-brand-50 gap-2 w-full sm:w-auto">
                  Start Creating Now
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/eco">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2 w-full sm:w-auto">
                  <Leaf className="w-4 h-4" />
                  Explore Eco Collection
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
