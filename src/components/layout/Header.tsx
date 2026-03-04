'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  X, 
  Leaf, 
  Sun, 
  Moon,
  ChevronDown 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cart';
import { useTheme } from 'next-themes';

const navItems = [
  { label: 'Shop', href: '/shop' },
  { label: 'Customize', href: '/customize' },
  { label: 'Eco Collection', href: '/eco' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

// Custom hook for mounted state without useEffect
function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const { items, toggleCart, getItemCount } = useCartStore();
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const itemCount = getItemCount();

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        {/* Top banner */}
        <div className="bg-brand-700 text-white py-2 px-4 text-center text-sm">
          <span className="flex items-center justify-center gap-2">
            <Leaf className="w-4 h-4" />
             For Sale: 2026-Ready Eco Phone Case Store – Biodegradable Products, Live Preview, Domain Included | Grab This Gem!
          </span>
        </div>

        {/* Main header */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 rounded-full overflow-hidden bg-brand-700 flex items-center justify-center"
              >
                <img 
                  src="/logo-new.png" 
                  alt="PhotoInCase Logo" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold text-brand-700 dark:text-brand-400 font-heading">
                  PhotoInCase
                </span>
                <span className="text-[10px] text-muted-foreground hidden sm:block -mt-1">
                  Planet First
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    pathname === item.href || pathname.startsWith(item.href + '/')
                      ? 'bg-brand-700 text-white'
                      : 'text-foreground hover:bg-earth-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    onSubmit={handleSearch}
                    className="hidden md:flex items-center"
                  >
                    <Input
                      type="search"
                      placeholder="Search cases..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-48 lg:w-64 h-9"
                      autoFocus
                    />
                  </motion.form>
                )}
              </AnimatePresence>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hidden md:flex"
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Theme toggle */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </Button>
              )}

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleCart}
                className="relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-terracotta-600 text-white text-xs rounded-full flex items-center justify-center font-bold"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </Button>

              {/* Mobile menu toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 md:hidden pt-28 bg-white dark:bg-slate-900"
          >
            <nav className="container mx-auto px-4 py-6">
              <form onSubmit={handleSearch} className="mb-6">
                <Input
                  type="search"
                  placeholder="Search cases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </form>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-4 text-lg font-medium border-b border-border ${
                      pathname === item.href
                        ? 'text-brand-700 dark:text-brand-400'
                        : 'text-foreground'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-6">
                <Link href="/how-it-works" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full mb-2">
                    How It Works
                  </Button>
                </Link>
                <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full mb-2">
                    Blog
                  </Button>
                </Link>
                <Link href="/customize" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-brand-700 hover:bg-brand-800">
                    Start Customizing
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-[108px] md:h-[120px]" />
    </>
  );
}
