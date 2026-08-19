import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { LuxuryBadge } from "@/components/shared/badge";
import { StatsSection } from "@/components/home/stats-section";
import { CtaBanner } from "@/components/home/cta-banner";
import {
  Compass,
  ShieldCheck,
  Zap,
  Award,
  Sparkles,
  ArrowRight,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "About Us — Architectural Quiet Luxury & Hospitality Vision",
  description:
    "Discover the story, architectural philosophy, and uncompromising infrastructure standards behind Pat Luxury Suites & Residences.",
};

const PHILOSOPHY_PILLARS = [
  {
    icon: Compass,
    title: "Architectural Intent",
    description:
      "Every suite is designed with proportion, light, and acoustic serenity at its core. We use honed natural travertine, brushed champagne brass, and solid oak to foster an organic, timeless haven.",
  },
  {
    icon: Zap,
    title: "Sovereign Infrastructure",
    description:
      "In an environment where power and connectivity are often unpredictable, Pat Luxury operates with industrial-grade multi-redundant solar and generator backbones that guarantee 100% continuous uptime.",
  },
  {
    icon: HeartHandshake,
    title: "Discrete Bespoke Care",
    description:
      "Hospitality should be intuitive, not intrusive. From autonomous keyless arrivals to on-demand master chefs and private chauffeurs, your sanctuary operates entirely on your rhythm.",
  },
  {
    icon: ShieldCheck,
    title: "Absolute Safety & Privacy",
    description:
      "We enforce rigorous discrete security protocols, gated access control, and 24/7 CCTV monitoring, ensuring high-profile executives, diplomats, and families enjoy complete peace of mind.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0b0d13] pb-12">
      {/* Header Banner */}
      <PageHeader
        badgeText="Our Heritage & Philosophy"
        title="Redefining the Essence of Boutique Luxury Hospitality"
        subtitle="Pat Luxury was founded on a singular conviction: that modern luxury lies in uncompromised privacy, exquisite aesthetics, and seamless living infrastructure."
        backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
      />

      {/* Narrative Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Story (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <LuxuryBadge>The Brand Genesis</LuxuryBadge>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
              Where Exceptional Comfort Meets{" "}
              <span className="font-normal italic gold-gradient-text">
                Quiet Distinction
              </span>
              .
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              Frustrated by generic hotel chains that compromise on kitchen facilities, space, and personal freedom, we set out to build a hospitality destination where guests could enjoy the spaciousness of private luxury residences combined with the white-glove service of a 5-star boutique hotel.
            </p>

            <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
              Located in the prestigious residential district of Uyo, each Pat Luxury suite is uniquely styled with custom furnishings, high-end Italian quartz culinary spaces, spa-grade soaking tubs, and dedicated gigabit fiber internet.
            </p>

            <div className="pt-4 flex items-center gap-6">
              <div>
                <p className="font-serif text-2xl font-bold text-amber-300">100%</p>
                <p className="text-xs text-slate-400">Guaranteed Power</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="font-serif text-2xl font-bold text-amber-300">4.96/5</p>
                <p className="text-xs text-slate-400">Guest Rating</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="font-serif text-2xl font-bold text-amber-300">24/7</p>
                <p className="text-xs text-slate-400">VIP Concierge</p>
              </div>
            </div>
          </div>

          {/* Layered Photo Grid (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl shadow-black/80">
              <Image
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85"
                alt="Pat Luxury Architectural Splendor"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="hidden sm:block absolute -bottom-8 -left-8 w-1/2 aspect-[4/3] rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=85"
                alt="Natural Wood & Botanical Accents"
                fill
                sizes="30vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Grid */}
      <section className="py-20 bg-[#0e111a] border-y border-amber-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <LuxuryBadge>Our Foundation</LuxuryBadge>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-light">
              The Four Pillars of Pat Luxury Hospitality
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PHILOSOPHY_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#131724] border border-white/5 hover:border-amber-500/30 transition-all duration-300 space-y-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* CTA */}
      <CtaBanner />
    </div>
  );
}
