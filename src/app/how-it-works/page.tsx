'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Camera,
  Smartphone,
  Palette,
  Package,
  Truck,
  RotateCcw,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  Check,
  Leaf
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-earth-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative bg-white dark:bg-slate-800 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-eco-pattern opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400 mb-4">
              Simple & Easy
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 font-heading">
              How It Works
            </h1>
            <p className="text-lg text-muted-foreground">
              Create your custom eco-friendly phone case in just a few simple steps
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Camera,
                step: '01',
                title: 'Upload Your Photo',
                description: 'Drag and drop or upload any photo from your device. Our preview tool shows exactly how it will look on your case.',
                color: 'bg-brand-100 dark:bg-brand-900/30',
              },
              {
                icon: Smartphone,
                step: '02',
                title: 'Choose Your Device',
                description: 'Select from 100+ device models including iPhone 18, Galaxy S26, and Pixel 11 series.',
                color: 'bg-sage-100 dark:bg-sage-900/30',
              },
              {
                icon: Palette,
                step: '03',
                title: 'Customize & Design',
                description: 'Pick your material (eco or standard), add text, apply filters, and select add-ons like MagSafe.',
                color: 'bg-gold-100 dark:bg-gold-900/30',
              },
              {
                icon: Package,
                step: '04',
                title: 'Receive & Enjoy',
                description: 'Your case ships in 3-5 days in plastic-free packaging. Add-ons like screen protectors included if selected.',
                color: 'bg-terracotta-100 dark:bg-terracotta-900/30',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 ${item.color} rounded-full flex items-center justify-center mb-4`}>
                      <item.icon className="w-7 h-7 text-brand-700 dark:text-brand-400" />
                    </div>
                    <Badge variant="outline" className="mb-2">Step {item.step}</Badge>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-muted-foreground/50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-earth-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 font-heading">
              What Makes Us Different
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Leaf,
                title: 'Eco Materials',
                description: '5 biodegradable options including bamboo, hemp, and ocean plastic.',
              },
              {
                icon: Check,
                title: 'Live Preview',
                description: 'See exactly how your photo looks on the case before ordering.',
              },
              {
                icon: Truck,
                title: 'Fast Shipping',
                description: 'Ships in 3-5 days with carbon-negative delivery options.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center card-shadow"
              >
                <feature.icon className="w-10 h-10 text-brand-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Info */}
      <section className="py-16 bg-white dark:bg-slate-800" id="shipping">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 font-heading">
              Shipping Information
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <Truck className="w-8 h-8 text-brand-600 mb-4" />
                <h3 className="font-semibold text-lg mb-3">Delivery Times</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex justify-between">
                    <span>USA (Standard)</span>
                    <span className="font-medium text-foreground">3-5 business days</span>
                  </li>
                  <li className="flex justify-between">
                    <span>USA (Express)</span>
                    <span className="font-medium text-foreground">1-2 business days</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Canada</span>
                    <span className="font-medium text-foreground">5-7 business days</span>
                  </li>
                  <li className="flex justify-between">
                    <span>International</span>
                    <span className="font-medium text-foreground">7-14 business days</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Package className="w-8 h-8 text-brand-600 mb-4" />
                <h3 className="font-semibold text-lg mb-3">Shipping Costs</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex justify-between">
                    <span>Orders $50+</span>
                    <span className="font-medium text-brand-600">FREE</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Standard Shipping</span>
                    <span className="font-medium text-foreground">$4.99</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Express Shipping</span>
                    <span className="font-medium text-foreground">$12.99</span>
                  </li>
                  <li className="flex justify-between">
                    <span>International</span>
                    <span className="font-medium text-foreground">$9.99</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Returns */}
      <section className="py-16 bg-earth-50 dark:bg-slate-900" id="returns">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 font-heading">
              Returns & Exchanges
            </h2>
          </motion.div>

          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <RotateCcw className="w-8 h-8 text-brand-600 mb-4" />
              <h3 className="font-semibold text-lg mb-3">Our Guarantee</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />
                  <span>30-day return policy on unused items</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />
                  <span>Free returns on defective products</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />
                  <span>Easy exchange process if you change devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />
                  <span>Note: Custom photo cases are final sale due to personalization</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white dark:bg-slate-800" id="faq">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 font-heading">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: 'How long does shipping take?',
                  answer: 'Standard shipping takes 3-5 business days within the US. Express shipping is 1-2 days. International orders typically arrive in 7-14 business days.',
                },
                {
                  question: 'What makes your eco cases biodegradable?',
                  answer: 'Our eco cases are made from plant-based materials like bamboo fiber, hemp, and wheat straw. They break down naturally in compost within 3-8 months, depending on the material.',
                },
                {
                  question: 'Can I wash my eco case?',
                  answer: 'Yes! All our cases can be gently hand-washed with mild soap and water. Avoid harsh chemicals or dishwashers, especially for eco materials.',
                },
                {
                  question: 'What image formats do you accept?',
                  answer: 'We accept JPG, PNG, and WebP formats. For best results, use high-resolution images (300+ DPI) with good lighting and minimal cropping.',
                },
                {
                  question: 'Do you offer MagSafe compatible cases?',
                  answer: 'Yes! MagSafe compatibility is available as a +$5 add-on for all case types. This adds embedded magnets for seamless compatibility with MagSafe accessories.',
                },
                {
                  question: 'What is your return policy?',
                  answer: 'We offer 30-day returns on unused items. Custom photo cases are final sale due to personalization, but we guarantee print quality—if there\'s an issue, we\'ll make it right.',
                },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
            <h2 className="text-3xl font-bold text-white mb-4 font-heading">
              Ready to Create?
            </h2>
            <p className="text-brand-100 mb-8 max-w-2xl mx-auto">
              Start designing your custom eco phone case today
            </p>
            <Link href="/customize">
              <Button size="lg" className="bg-white text-brand-700 hover:bg-brand-50 gap-2">
                Start Customizing
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
