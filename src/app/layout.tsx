import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PhotoInCase.com | Custom Photo Phone Cases | Eco-Friendly & Biodegradable",
  description: "Create personalized phone cases with your photos. 100% eco-friendly options available. Premium quality, biodegradable materials. Free shipping over $50. Planet-first phone cases.",
  keywords: ["custom phone case", "photo phone case", "eco-friendly phone case", "biodegradable phone case", "personalized phone case", "custom photo case", "sustainable phone accessories", "compostable phone case"],
  authors: [{ name: "PhotoInCase Team" }],
  icons: {
    icon: "/logo-new.png",
  },
  openGraph: {
    title: "PhotoInCase.com | Custom Eco-Friendly Phone Cases",
    description: "Your Photo. Your Case. Planet First. Premium personalized phone cases made from sustainable materials.",
    url: "https://photoincase.com",
    siteName: "PhotoInCase",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "PhotoInCase - Custom Eco Phone Cases",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PhotoInCase.com | Custom Eco-Friendly Phone Cases",
    description: "Your Photo. Your Case. Planet First. Premium personalized phone cases made from sustainable materials.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <CartDrawer />
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
