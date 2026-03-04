'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { blogPosts } from '@/data/products';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-earth-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="bg-white dark:bg-slate-800 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400 mb-4">
              Eco Tips & Stories
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-heading">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Sustainability tips, behind-the-scenes stories, and guides for eco-conscious living
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          {blogPosts[0] && (
            <Link href={`/blog/${blogPosts[0].slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
              >
                <div className="aspect-[21/9] relative">
                  <img
                    src={blogPosts[0].coverImage}
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <Badge className="bg-brand-600 text-white mb-4">
                    {blogPosts[0].category}
                  </Badge>
                  <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 font-heading">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-white/80 max-w-2xl mb-4">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-white/60 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(blogPosts[0].publishedAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {blogPosts[0].readTime} min read
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          )}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <Card className="h-full overflow-hidden group cursor-pointer hover:card-shadow-hover transition-all">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-3">
                        {post.category}
                      </Badge>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-brand-700 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <span>{post.author.name}</span>
                        </div>
                        <span>{post.readTime} min read</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-brand-700">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4 font-heading">
              Get Eco Tips in Your Inbox
            </h2>
            <p className="text-brand-100 mb-8 max-w-2xl mx-auto">
              Join 25,000+ eco-conscious readers for weekly sustainability tips
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-brand-200 focus:outline-none focus:border-white"
              />
              <Button className="bg-white text-brand-700 hover:bg-brand-50">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
