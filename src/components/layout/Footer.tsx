'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  Mail, 
  Phone,
  Instagram,
  Facebook,
  Twitter,
  Heart,
  Shield
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const footerLinks = {
  shop: [
    { label: 'All Cases', href: '/shop' },
    { label: 'Eco Collection', href: '/eco' },
    { label: 'New Arrivals', href: '/shop?filter=new' },
    { label: 'Best Sellers', href: '/shop?filter=bestseller' },
    { label: 'Customize Your Own', href: '/customize' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Story', href: '/about#story' },
    { label: 'Sustainability', href: '/about#sustainability' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/about#careers' },
  ],
  support: [
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'FAQ', href: '/how-it-works#faq' },
    { label: 'Shipping Info', href: '/how-it-works#shipping' },
    { label: 'Returns', href: '/how-it-works#returns' },
    { label: 'Contact Us', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: 'https://x.com/photoincase', label: 'X (Twitter)' },
  { icon: Instagram, href: 'https://www.instagram.com/photo.incase/', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/photoincase1', label: 'Facebook' },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      {/* Newsletter Section */}
      <div className="bg-brand-700 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Leaf className="w-10 h-10 mx-auto mb-4 text-white" />
              <h3 className="text-2xl font-bold text-white mb-2 font-heading">
                Join 25,000+ Eco-Conscious People
              </h3>
              <p className="text-brand-100 mb-6">
                Get exclusive offers, sustainability tips, and early access to new eco cases.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-brand-600 text-white placeholder:text-brand-200 focus:border-white"
                />
                <Button 
                  type="submit"
                  className="bg-white text-brand-700 hover:bg-brand-50 shrink-0"
                >
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-brand-200 mt-3">
                No spam, ever. Unsubscribe anytime.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-brand-500 flex items-center justify-center">
                <img 
                  src="/logo-new.png" 
                  alt="PhotoInCase Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-bold text-white font-heading">PhotoInCase</span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-xs">
              Your Photo. Your Case. Planet First. Personalized & 100% Eco-Friendly phone cases.
            </p>
            
            {/* Planet-First Promise */}
            <div className="bg-slate-800 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-brand-400" />
                Planet-First Promise
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <Leaf className="w-3 h-3 text-sage-400" />
                  Carbon-negative shipping
                </li>
                <li className="flex items-center gap-2">
                  <Leaf className="w-3 h-3 text-sage-400" />
                  100% compostable eco options
                </li>
                <li className="flex items-center gap-2">
                  <Leaf className="w-3 h-3 text-sage-400" />
                  1 tree planted per eco order
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-brand-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                <a href="mailto:info@nizarrahme.com" className="hover:text-white transition-colors">
                  info@nizarrahme.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                <a href="tel:+905528875997" className="hover:text-white transition-colors">
                  +90 552 887 5997
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <Link href="/contact">
                <Button variant="outline" size="sm" className="w-full border-slate-700 hover:bg-slate-800">
                  Contact Form
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-800" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Payment Methods */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">We accept:</span>
            <div className="flex items-center gap-2">
              <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center text-xs font-bold">
                VISA
              </div>
              <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center text-xs font-bold">
                MC
              </div>
              <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center text-xs font-bold">
                AMEX
              </div>
              <div className="w-12 h-6 bg-slate-800 rounded flex items-center justify-center text-[10px] font-bold">
                Apple Pay
              </div>
              <div className="w-12 h-6 bg-slate-800 rounded flex items-center justify-center text-[10px] font-bold">
                Shop Pay
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-sm text-slate-500 text-center">
            <p>© 2026 PhotoInCase.com. All rights reserved.</p>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-1 text-sm text-slate-500">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-terracotta-500 fill-current" />
            <span>for the planet</span>
          </div>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {footerLinks.legal.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-slate-500 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
