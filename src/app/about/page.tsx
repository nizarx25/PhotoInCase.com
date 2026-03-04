'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Leaf,
  Heart,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  Shield,
  Target,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
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
            <Badge className="bg-white/20 text-white mb-4">Our Story</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-heading">
              About PhotoInCase
            </h1>
            <p className="text-lg text-brand-100">
              We're on a mission to make personalized phone cases that protect your device 
              without compromising our planet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white dark:bg-slate-800" id="story">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 font-heading">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  PhotoInCase was born in 2024 from a simple frustration: why should custom phone 
                  cases contribute to the 1.5 billion plastic cases that end up in landfills each year?
                </p>
                <p>
                  Our founders, Maya and James, were environmental scientists who saw firsthand 
                  the devastating impact of plastic pollution on marine ecosystems. They asked: 
                  "What if we could create personalized phone cases that people love, without 
                  the environmental guilt?"
                </p>
                <p>
                  After 18 months of research and development, we launched our first eco-friendly 
                  phone case made from bamboo fiber. Today, we offer five distinct biodegradable 
                  materials and have planted over 25,000 trees.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop"
                alt="Sustainability"
                className="rounded-xl w-full h-48 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop"
                alt="Team"
                className="rounded-xl w-full h-48 object-cover mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop"
                alt="Work"
                className="rounded-xl w-full h-48 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop"
                alt="Office"
                className="rounded-xl w-full h-48 object-cover mt-8"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-earth-50 dark:bg-slate-900" id="sustainability">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 font-heading">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every decision we make is guided by these core principles
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Leaf,
                title: 'Planet First',
                description: 'Every product we create considers its environmental impact. We source sustainably, manufacture responsibly, and offset our carbon footprint.',
              },
              {
                icon: Heart,
                title: 'Customer Love',
                description: 'Your memories deserve premium quality. We obsess over print clarity, color accuracy, and protection because your photos matter.',
              },
              {
                icon: Shield,
                title: 'Honesty & Transparency',
                description: 'No greenwashing here. We share exactly where our materials come from, how they\'re made, and what happens when you\'re done with them.',
              },
              {
                icon: Sparkles,
                title: 'Innovation',
                description: 'We\'re constantly researching new sustainable materials and production methods. The best eco case hasn\'t been invented yet.',
              },
              {
                icon: Users,
                title: 'Community',
                description: 'We\'re building a community of eco-conscious individuals who believe small choices add up to big change.',
              },
              {
                icon: Target,
                title: 'Impact',
                description: 'One tree planted per eco order. Carbon-negative shipping. Ocean plastic cleanup partnerships. Your purchase makes a difference.',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <value.icon className="w-10 h-10 text-brand-600 mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50,000+', label: 'Happy Customers' },
              { value: '25,000+', label: 'Trees Planted' },
              { value: '150K+', label: 'Plastic Cases Avoided' },
              { value: '4.9/5', label: 'Average Rating' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl font-bold text-brand-700 dark:text-brand-400">
                  {stat.value}
                </p>
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-earth-50 dark:bg-slate-900" id="careers">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 font-heading">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A passionate group of environmentalists, designers, and tech enthusiasts
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'Maya Chen', role: 'Co-Founder & CEO', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' },
              { name: 'James Wilson', role: 'Co-Founder & COO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
              { name: 'Sophie Park', role: 'Head of Design', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop' },
              { name: 'Alex Rivera', role: 'Head of Sustainability', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop' },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                />
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white dark:bg-slate-800" id="contact">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 font-heading">
              Get in Touch
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="w-8 h-8 text-brand-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Email Us</h3>
                <a href="mailto:info@nizarrahme.com" className="text-brand-600 hover:underline">
                  info@nizarrahme.com
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="w-8 h-8 text-brand-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-1">Call Us</h3>
                <a href="tel:+905528875997" className="text-brand-600 hover:underline">
                  +90 552 887 5997
                </a>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Link href="/contact">
              <Button className="bg-brand-700 hover:bg-brand-800">
                Contact Form
              </Button>
            </Link>
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
              Join Our Mission
            </h2>
            <p className="text-brand-100 mb-8 max-w-2xl mx-auto">
              Ready to protect your phone and the planet at the same time?
            </p>
            <Link href="/customize">
              <Button size="lg" className="bg-white text-brand-700 hover:bg-brand-50 gap-2">
                Create Your Eco Case
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
