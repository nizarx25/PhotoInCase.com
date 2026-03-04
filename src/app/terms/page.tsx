'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-earth-50 dark:bg-slate-900">
      {/* Header */}
      <section className="bg-brand-700 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="bg-white/20 text-white mb-4">Legal</Badge>
            <h1 className="text-4xl font-bold text-white mb-4 font-heading">
              Terms of Service
            </h1>
            <p className="text-brand-100">
              Last updated: January 2026
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-8 prose dark:prose-invert max-w-none">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using PhotoInCase.com, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
              </p>

              <h2>2. Products and Services</h2>
              <p>
                PhotoInCase offers custom phone cases with personalized photo printing. We offer:
              </p>
              <ul>
                <li>Standard and eco-friendly phone case options</li>
                <li>Custom photo printing services</li>
                <li>Various device compatibility options</li>
                <li>Add-on accessories and bundles</li>
              </ul>

              <h2>3. Orders and Payment</h2>
              <p>
                When you place an order through our website:
              </p>
              <ul>
                <li>You agree to provide accurate and complete information</li>
                <li>You authorize us to charge the total amount shown</li>
                <li>Prices are subject to change without notice</li>
                <li>We reserve the right to refuse or cancel orders</li>
              </ul>

              <h2>4. Custom Products</h2>
              <p>
                For custom photo cases:
              </p>
              <ul>
                <li>You must own or have rights to use any uploaded images</li>
                <li>You are responsible for image quality and content</li>
                <li>Custom products cannot be returned unless defective</li>
                <li>We are not liable for copyrighted or inappropriate content uploaded by users</li>
              </ul>

              <h2>5. Shipping and Delivery</h2>
              <p>
                We ship worldwide with the following conditions:
              </p>
              <ul>
                <li>Processing time: 3-5 business days</li>
                <li>Shipping times vary by location</li>
                <li>Free shipping on orders over $50</li>
                <li>We are not responsible for carrier delays</li>
              </ul>

              <h2>6. Returns and Refunds</h2>
              <p>
                Our return policy:
              </p>
              <ul>
                <li>30-day return policy for non-custom items</li>
                <li>Custom photo cases are final sale</li>
                <li>Defective items will be replaced free of charge</li>
                <li>Refunds are processed within 5-7 business days</li>
              </ul>

              <h2>7. Intellectual Property</h2>
              <p>
                All content on PhotoInCase.com, including text, graphics, logos, and images, is the property of PhotoInCase and protected by copyright laws. You may not:
              </p>
              <ul>
                <li>Copy, reproduce, or distribute our content</li>
                <li>Use our trademarks without permission</li>
                <li>Create derivative works without consent</li>
              </ul>

              <h2>8. User Conduct</h2>
              <p>
                You agree not to:
              </p>
              <ul>
                <li>Upload illegal, harmful, or offensive content</li>
                <li>Infringe on others' intellectual property rights</li>
                <li>Attempt to hack or disrupt our services</li>
                <li>Use the service for any unlawful purpose</li>
              </ul>

              <h2>9. Limitation of Liability</h2>
              <p>
                PhotoInCase is not liable for:
              </p>
              <ul>
                <li>Indirect, incidental, or consequential damages</li>
                <li>Loss of data or profits</li>
                <li>Third-party actions or content</li>
              </ul>

              <h2>10. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of our services constitutes acceptance of modified terms.
              </p>

              <h2>11. Contact</h2>
              <p>
                For questions about these Terms of Service, contact us at:
              </p>
              <ul>
                <li>Email: legal@photoincase.com</li>
                <li>Phone: 1-800-ECO-CASE</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
