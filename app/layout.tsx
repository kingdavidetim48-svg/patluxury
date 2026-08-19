import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0b0d13",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://patluxury.com"),
  title: {
    default: "Pat Luxury Residences & Suites | Elite Short-Let Apartments",
    template: "%s | Pat Luxury Suites",
  },
  description:
    "Experience unrivaled luxury short-let penthouses and executive residences with 24/7 clean power, gigabit fiber Wi-Fi, private chef on-demand, and biometric security.",
  keywords: [
    "luxury short-let apartments",
    "presidential penthouse",
    "executive suites",
    "luxury apartments Uyo",
    "boutique hospitality",
    "private chef short-let",
    "24/7 power apartments",
    "Pat Luxury",
  ],
  authors: [{ name: "Pat Luxury Hospitality Group" }],
  creator: "Pat Luxury Residences",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://patluxury.com",
    title: "Pat Luxury Residences & Suites | World-Class Short-Let Living",
    description:
      "Curated luxury penthouses, 24/7 clean power, private chefs, and bespoke concierge hospitality.",
    siteName: "Pat Luxury Residences",
    images: [
      {
        url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85",
        width: 1600,
        height: 900,
        alt: "Pat Luxury Grand Presidential Penthouse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pat Luxury Residences & Suites",
    description:
      "World-class short-let penthouses with 24/7 uninterrupted power, biometric access, and gourmet private dining.",
    images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} dark scroll-smooth`}>
      <body className="min-h-screen bg-[#0b0d13] text-slate-100 font-sans antialiased selection:bg-amber-400 selection:text-black flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
