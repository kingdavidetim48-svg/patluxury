import React from "react";
import {
  Zap,
  Wifi,
  ChefHat,
  KeyRound,
  UtensilsCrossed,
  ShieldCheck,
  Sparkles,
  Tv,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { LuxuryBadge } from "@/components/shared/badge";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const PILLARS = [
  {
    icon: Zap,
    title: "24/7 Unbroken Clean Power",
    description:
      "Triple-redundancy hybrid solar, inverters, and industrial soundproof generators guarantee 0-second downtime in Uyo.",
    highlight: "100% Guaranteed Uptime",
  },
  {
    icon: Wifi,
    title: "Gigabit Fiber Backbone (500Mbps+)",
    description:
      "Enterprise mesh Wi-Fi with ultra-low latency for seamless 4K Zoom calls, streaming, and executive productivity.",
    highlight: "Zero Dead Zones",
  },
  {
    icon: ChefHat,
    title: "Private In-Suite Chef on Demand",
    description:
      "Culinary masters craft bespoke multi-course dinners, fresh grills, and authentic local delicacies in your kitchen.",
    highlight: "Bespoke Menus",
  },
  {
    icon: KeyRound,
    title: "Encrypted Biometric Smart Locks",
    description:
      "Keyless custom PIN and biometric access. Arrive at any hour with contact-free, autonomous digital check-in.",
    highlight: "Instant 24/7 Check-In",
  },
  {
    icon: UtensilsCrossed,
    title: "Custom Italian Quartz Kitchen",
    description:
      "Complete with induction cooktops, espresso bar, French-door refrigeration, microwave, and full culinary sets.",
    highlight: "Fully Equipped",
  },
  {
    icon: ShieldCheck,
    title: "Guarded Security & 24/7 CCTV",
    description:
      "Perimeter surveillance, gated access control, and trained professional security personnel at all times.",
    highlight: "Maximum Discretion",
  },
  {
    icon: Sparkles,
    title: "White-Glove Housekeeping & Valet",
    description:
      "Daily hospital-grade sanitization, 1,000-thread Egyptian cotton linens, and aromatherapy evening turndown.",
    highlight: "Daily Refresh",
  },
  {
    icon: Tv,
    title: "65-75\" 4K OLED Smart Entertainment",
    description:
      "Pre-loaded with active Netflix 4K, Prime Video, Apple AirPlay, and cinematic Dolby Atmos soundbars.",
    highlight: "Dolby Surround",
  },
];

export function ValueProposition() {
  return (
    <section className="py-24 bg-[#0b0d13] relative overflow-hidden">
      {/* Subtle Glows */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with on-scroll reveal */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <LuxuryBadge>The Pat Luxury Standard</LuxuryBadge>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
              Designed for Guests Who Demand{" "}
              <span className="font-normal italic gold-gradient-text">
                Uncompromising Comfort
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
              We eliminated the typical short-let compromises by investing in sovereign industrial infrastructure, discrete security, and Michelin-standard residential amenities.
            </p>
          </div>
        </ScrollReveal>

        {/* Pillars Grid with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal
                key={idx}
                animation="fade-up"
                delay={(idx % 4) * 100}
              >
                <div className="group relative p-6 rounded-2xl bg-[#121624] border border-white/5 hover:border-amber-500/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/70 flex flex-col justify-between h-full">
                  <div>
                    {/* Icon & Highlight Pill */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-black transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] uppercase font-semibold tracking-wider text-amber-300/90 px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20">
                        {pillar.highlight}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-serif text-lg font-medium text-white group-hover:text-amber-300 transition-colors mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-amber-400/80 font-medium group-hover:text-amber-300">
                    <span>Verified Amenity</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom Banner Bar */}
        <ScrollReveal animation="scale-up" delay={200}>
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#121624] via-[#1a2136] to-[#121624] border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <p className="text-base font-medium text-white">
                  Planning an extended corporate stay or diplomatic delegation in Uyo?
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Contact our executive concierge desk for custom weekly and monthly residential rates.
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.15em] text-black bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition-all shrink-0 shadow-lg shadow-amber-500/20 active:scale-95"
            >
              Request VIP Quote
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
