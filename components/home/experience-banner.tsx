import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Check, ArrowRight, ShieldCheck, Zap, Award } from "lucide-react";
import { LuxuryBadge } from "@/components/shared/badge";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function ExperienceBanner() {
  return (
    <section className="py-24 bg-[#0b0d13] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Layered Visual Composition (7 cols) */}
          <div className="lg:col-span-7 relative">
            <ScrollReveal animation="scale-up" duration={800}>
              {/* Primary Large Image */}
              <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl shadow-black/80">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85"
                  alt="Pat Luxury Living Experience"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent" />
              </div>

              {/* Overlapping Secondary Image */}
              <div className="hidden sm:block absolute -bottom-10 -right-6 w-3/5 aspect-[4/3] rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-2xl shadow-black/90">
                <Image
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=85"
                  alt="Private In-Suite Gourmet Dining"
                  fill
                  sizes="40vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Floating Luxury Trust Pill */}
              <div className="absolute top-6 left-6 p-4 rounded-2xl bg-[#0b0d13]/85 backdrop-blur-xl border border-amber-500/30 shadow-xl flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-black font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white">
                    Five-Star Short-Let
                  </p>
                  <p className="text-[11px] text-amber-300">
                    Verified Clean & Secure
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Text Content (5 cols) */}
          <div className="lg:col-span-5 space-y-6 pt-6 lg:pt-0">
            <ScrollReveal animation="fade-up" delay={150}>
              <LuxuryBadge>The Art of Elevated Hospitality</LuxuryBadge>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mt-3">
                A Private Sanctuary Tailored to Your{" "}
                <span className="font-normal italic gold-gradient-text">
                  Highest Standard
                </span>
                .
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mt-4">
                At Pat Luxury, we don't simply provide short-let accommodation — we curate an immersive residential sanctuary in Uyo. From Egyptian cotton linens to discrete 24/7 security and on-demand private chefs, every detail is orchestrated with obsessive care.
              </p>

              {/* Feature Checklist */}
              <div className="space-y-3.5 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">
                      Uninterrupted 24/7 Redundant Power
                    </h4>
                    <p className="text-xs text-slate-400">
                      Industrial hybrid solar and generators guarantee 100% continuous uptime.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">
                      Contactless Smart Keyless Check-In
                    </h4>
                    <p className="text-xs text-slate-400">
                      Receive your encrypted digital PIN automatically for arrival at any hour.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">
                      Bespoke In-Suite Master Chef
                    </h4>
                    <p className="text-xs text-slate-400">
                      Freshly cooked authentic cuisine served inside your private dining salon.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/about"
                  className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-black bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition-all shadow-lg shadow-amber-400/20 active:scale-95"
                >
                  Discover Brand Story
                </Link>
                <Link
                  href="/services"
                  className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Explore VIP Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
