import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Compass, Star, Sparkles, Wifi, KeyRound } from "lucide-react";
import { LuxuryBadge } from "@/components/shared/badge";
import { BookingSearchBar } from "./booking-search-bar";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-28 sm:pt-32 lg:pt-36 pb-16 overflow-hidden bg-[#0b0d13]">
      {/* Background Image Layer with Multi-Stop Cinematic Vignette */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2200&q=90"
          alt="Pat Luxury Presidential Penthouse"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transform animate-pulse-subtle brightness-90"
        />
        {/* Layered Gradient Overlays for Extreme Contrast & Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d13] via-[#0b0d13]/75 to-[#0b0d13]/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d13]/95 via-[#0b0d13]/70 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
      </div>

      {/* Decorative Floating Luxury Lighting Accents */}
      <div className="absolute top-1/4 right-5 sm:right-12 w-60 sm:w-96 h-60 sm:h-96 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-5 sm:left-10 w-60 sm:w-80 h-60 sm:h-80 rounded-full bg-amber-600/10 blur-[100px] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow flex flex-col justify-center w-full">
        <div className="max-w-3xl space-y-5 sm:space-y-6">
          {/* Top Pill / Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
              The Sovereign Standard in Short-Let Living
            </span>
          </div>

          {/* Main Cinematic Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.12] sm:leading-[1.08]">
            An Extraordinary Sanctuary of{" "}
            <span className="font-normal italic gold-gradient-text block sm:inline">
              Quiet Luxury
            </span>{" "}
            & Precision Comfort.
          </h1>

          {/* Subtitle / Value summary */}
          <p className="text-sm sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl">
            Immerse yourself in bespoke architectural residences with guaranteed 24/7 uninterrupted power, gigabit fiber Wi-Fi, private in-suite chefs, and frictionless biometric access.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
            <Link
              href="/rooms"
              id="hero-cta-explore-suites"
              className="px-7 py-4 rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-black bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 hover:from-amber-100 hover:to-amber-300 shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
            >
              <span>Explore All Suites</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/about"
              id="hero-cta-about"
              className="px-6 py-4 rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-white hover:text-amber-300 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-amber-400/40 backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>The Pat Luxury Experience</span>
            </Link>
          </div>

          {/* Trust & Guarantee Badges Strip */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 text-slate-300 text-xs border-t border-white/10 max-w-xl">
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-white">4.98/5.0</span>
              <span className="text-slate-400 text-[11px]">(240+ VIP Stays)</span>
            </div>

            <div className="h-3 w-px bg-white/20 hidden sm:block" />

            <div className="flex items-center gap-1.5 text-amber-300 font-medium">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>100% 24/7 Power Guarantee</span>
            </div>

            <div className="h-3 w-px bg-white/20 hidden sm:block" />

            <div className="flex items-center gap-1.5 text-slate-300 font-medium">
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>Biometric Keyless Entry</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Booking Search Bar at Bottom */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14 w-full">
        <BookingSearchBar />
      </div>
    </section>
  );
}
