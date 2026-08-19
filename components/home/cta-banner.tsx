import React from "react";
import Link from "next/link";
import { Sparkles, CalendarCheck, Phone, ArrowRight, MessageCircle } from "lucide-react";
import { LuxuryBadge } from "@/components/shared/badge";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function CtaBanner() {
  return (
    <section className="py-24 bg-[#0b0d13] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="scale-up" duration={800}>
          <div className="relative rounded-3xl bg-gradient-to-r from-[#121624] via-[#1a233a] to-[#121624] border border-amber-500/30 p-8 sm:p-14 lg:p-20 text-center overflow-hidden shadow-2xl shadow-black/90">
            {/* Decorative Glowing Radial Backgrounds */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <div className="inline-block">
                <LuxuryBadge>Reserve Your Exclusive Stay</LuxuryBadge>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white leading-tight">
                Your Uncompromised Luxury Living Awaits at{" "}
                <span className="font-normal italic gold-gradient-text">
                  Pat Luxury
                </span>
                .
              </h2>

              <p className="text-sm sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
                Whether you are visiting Uyo for an executive summit, diplomatic mission, romantic getaway, or an extended private retreat, step into the pinnacle of boutique hospitality.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  href="/book"
                  className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-black bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 hover:from-amber-100 hover:to-amber-300 shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Reserve Suite Online</span>
                </Link>

                <a
                  href="https://wa.me/2347030968954?text=Hello%20Pat%20Luxury%20Concierge!%20I'd%20like%20to%20reserve%20a%20suite."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-4 rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-white hover:text-amber-300 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-amber-400/40 backdrop-blur-md flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Instant WhatsApp Concierge</span>
                </a>
              </div>

              <p className="text-[11px] text-slate-400 font-light pt-2">
                🔒 Best Rate Guarantee • Instant Contactless Digital Access • Free Cancellation Options
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
