'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPage() {
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
              Privacy Policy
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
              <h2>1. Information We Collect</h2>
              <p>
                At PhotoInCase, we collect information you provide directly to us, including:
              </p>
              <ul>
                <li>Name, email address, and contact information when you create an account or place an order</li>
                <li>Payment information when you make a purchase</li>
                <li>Photos and images you upload for custom cases</li>
                <li>Device preferences and customization choices</li>
                <li>Communication preferences and feedback</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Process and fulfill your orders</li>
                <li>Create and customize your phone cases</li>
                <li>Send you order confirmations and shipping updates</li>
                <li>Respond to your comments and questions</li>
                <li>Improve our products and services</li>
                <li>Send promotional communications (with your consent)</li>
              </ul>

              <h2>3. Information Sharing</h2>
              <p>
                We do not sell your personal information. We may share your information with:
              </p>
              <ul>
                <li>Service providers who assist in our operations (payment processors, shipping carriers)</li>
                <li>Professional advisors (lawyers, accountants)</li>
                <li>Law enforcement when required by law</li>
              </ul>

              <h2>4. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information, including:
              </p>
              <ul>
                <li>SSL encryption for all data transmission</li>
                <li>Secure payment processing through trusted providers</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal data on a need-to-know basis</li>
              </ul>

              <h2>5. Your Photos</h2>
              <p>
                Photos you upload for custom cases are used solely to create your product. We:
              </p>
              <ul>
                <li>Store uploaded images securely on encrypted servers</li>
                <li>Delete images within 30 days after order completion</li>
                <li>Never use your photos for marketing without explicit consent</li>
                <li>Respect your ownership of all uploaded content</li>
              </ul>

              <h2>6. Cookies</h2>
              <p>
                We use cookies to improve your experience on our website. For more information, see our{' '}
                <Link href="/cookies" className="text-brand-600 hover:underline">
                  Cookie Policy
                </Link>.
              </p>

              <h2>7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access and download your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>

              <h2>8. Children's Privacy</h2>
              <p>
                Our services are not intended for children under 13. We do not knowingly collect information from children under 13.
              </p>

              <h2>9. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <ul>
                <li>Email: privacy@photoincase.com</li>
                <li>Phone: 1-800-ECO-CASE</li>
                <li>Address: Portland, OR, USA</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
