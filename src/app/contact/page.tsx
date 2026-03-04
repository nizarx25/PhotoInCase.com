'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  Send,
  MessageSquare,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative bg-brand-700 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-leaf-pattern opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="bg-white/20 text-white mb-4">Get in Touch</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading">
              Contact Us
            </h1>
            <p className="text-lg text-brand-100">
              Have a question or need help with your order? We&apos;re here to help!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto -mt-20 relative z-20">
            {[
              {
                icon: Phone,
                title: 'Phone',
                value: '+90 552 887 5997',
                href: 'tel:+905528875997',
                description: 'Mon-Fri 9am-6pm (GMT+3)'
              },
              {
                icon: Mail,
                title: 'Email',
                value: 'info@nizarrahme.com',
                href: 'mailto:info@nizarrahme.com',
                description: 'We reply within 24 hours'
              },
              {
                icon: Clock,
                title: 'Response Time',
                value: 'Fast Response',
                description: 'Usually within 2-4 hours'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-6 h-6 text-brand-600" />
                    </div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-brand-600 hover:text-brand-700 font-medium"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-brand-600 font-medium">{item.value}</p>
                    )}
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-earth-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-brand-600" />
                    </div>
                    <h2 className="text-2xl font-bold font-heading">Send us a Message</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Your Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Your Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject</label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) => setFormData({ ...formData, subject: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="order">Order Inquiry</SelectItem>
                          <SelectItem value="product">Product Question</SelectItem>
                          <SelectItem value="customization">Custom Design Help</SelectItem>
                          <SelectItem value="shipping">Shipping & Delivery</SelectItem>
                          <SelectItem value="returns">Returns & Refunds</SelectItem>
                          <SelectItem value="wholesale">Wholesale Inquiry</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message</label>
                      <Textarea
                        placeholder="How can we help you?"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>

                    {status === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg"
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>Message sent successfully! We&apos;ll get back to you soon.</span>
                      </motion.div>
                    )}

                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg"
                      >
                        <AlertCircle className="w-5 h-5" />
                        <span>Something went wrong. Please try again.</span>
                      </motion.div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-brand-700 hover:bg-brand-800 gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            <Send className="w-4 h-4" />
                          </motion.div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Info & FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <Card className="bg-brand-700 text-white">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4 font-heading">Quick Tips</h3>
                  <ul className="space-y-3 text-brand-100">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-1 text-brand-300" />
                      <span>Include your order number for faster support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-1 text-brand-300" />
                      <span>Attach photos if you have product issues</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-1 text-brand-300" />
                      <span>Check our FAQ section for instant answers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-1 text-brand-300" />
                      <span>Follow us on social for updates and inspiration</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4 font-heading">Frequently Asked</h3>
                  <div className="space-y-4">
                    {[
                      {
                        q: 'How long does shipping take?',
                        a: 'Standard shipping: 5-7 business days. Express: 2-3 business days.'
                      },
                      {
                        q: 'Can I track my order?',
                        a: 'Yes! You\'ll receive a tracking number via email once your order ships.'
                      },
                      {
                        q: 'What\'s your return policy?',
                        a: 'We offer 30-day returns on unused products. Custom items are final sale.'
                      },
                      {
                        q: 'Do you ship internationally?',
                        a: 'Yes! We ship to over 50 countries worldwide.'
                      }
                    ].map((faq, index) => (
                      <div key={index} className="border-b border-border pb-3 last:border-0 last:pb-0">
                        <p className="font-medium text-sm">{faq.q}</p>
                        <p className="text-sm text-muted-foreground mt-1">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-sage-100 dark:bg-sage-900/30 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-sage-600" />
                    </div>
                    <div>
                      <p className="font-semibold">PhotoInCase</p>
                      <p className="text-sm text-muted-foreground">
                        Serving customers worldwide with eco-friendly phone cases
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
