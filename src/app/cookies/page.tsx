'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function CookiesPage() {
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
              Cookie Policy
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
              <h2>What Are Cookies?</h2>
              <p>
                Cookies are small text files that are stored on your device when you visit a website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
              </p>

              <h2>How We Use Cookies</h2>
              <p>We use cookies for the following purposes:</p>
              
              <h3>Essential Cookies</h3>
              <p>
                These cookies are necessary for the website to function properly. They enable core functionality such as:
              </p>
              <ul>
                <li>Shopping cart functionality</li>
                <li>Secure checkout process</li>
                <li>Account login and authentication</li>
                <li>Security and fraud prevention</li>
              </ul>

              <h3>Performance Cookies</h3>
              <p>
                These cookies help us understand how visitors interact with our website by collecting anonymous information. This helps us:
              </p>
              <ul>
                <li>Analyze website traffic and usage patterns</li>
                <li>Identify and fix technical issues</li>
                <li>Improve website performance</li>
              </ul>

              <h3>Functionality Cookies</h3>
              <p>
                These cookies allow the website to remember choices you make and provide enhanced features:
              </p>
              <ul>
                <li>Remember your preferred language</li>
                <li>Remember your theme preference (light/dark mode)</li>
                <li>Remember items in your shopping cart</li>
                <li>Personalize your experience</li>
              </ul>

              <h3>Marketing Cookies</h3>
              <p>
                These cookies are used to deliver relevant advertisements:
              </p>
              <ul>
                <li>Track the effectiveness of marketing campaigns</li>
                <li>Show personalized ads based on interests</li>
                <li>Measure conversion rates</li>
              </ul>

              <h2>Third-Party Cookies</h2>
              <p>
                We may allow trusted third parties to place cookies on your device for:
              </p>
              <ul>
                <li>Payment processing (Stripe, PayPal, Apple Pay)</li>
                <li>Analytics (Google Analytics)</li>
                <li>Social media integration</li>
                <li>Customer support chat</li>
              </ul>

              <h2>Managing Cookies</h2>
              <p>
                You can control cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul>
                <li>View what cookies are stored on your device</li>
                <li>Delete some or all cookies</li>
                <li>Block cookies from specific sites</li>
                <li>Block all cookies entirely</li>
              </ul>
              <p>
                Please note that blocking certain cookies may affect your ability to use some features of our website.
              </p>

              <h2>Cookie Duration</h2>
              <p>
                Cookies can be either:
              </p>
              <ul>
                <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent cookies:</strong> Remain on your device for a set period or until manually deleted</li>
              </ul>

              <h2>Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have questions about our use of cookies, please contact us at:
              </p>
              <ul>
                <li>Email: privacy@photoincase.com</li>
                <li>Phone: 1-800-ECO-CASE</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
