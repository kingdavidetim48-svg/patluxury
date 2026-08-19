import React from "react";
import Image from "next/image";
import { Star, Quote, Sparkles, CheckCircle2 } from "lucide-react";
import { testimonialsData } from "@/data/testimonials";
import { LuxuryBadge } from "@/components/shared/badge";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function Testimonials() {
  return (
    <section className="py-24 bg-[#0b0d13] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <LuxuryBadge>Guest Experiences</LuxuryBadge>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
              Voices of Our{" "}
              <span className="font-normal italic gold-gradient-text">
                Distinguished Guests
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
              Read firsthand testimonials from global executives, international travelers, and families who have made Pat Luxury their premier sanctuary in Akwa Ibom.
            </p>
          </div>
        </ScrollReveal>

        {/* Testimonials Grid with Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonialsData.map((review, idx) => (
            <ScrollReveal
              key={review.id}
              animation="fade-up"
              delay={idx * 140}
            >
              <div className="p-8 rounded-3xl bg-[#121624] border border-white/10 hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between relative group hover:shadow-2xl hover:shadow-black/80 h-full">
                <div>
                  {/* Rating Stars & Trip Type */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
                      {review.tripType}
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="text-slate-200 text-sm sm:text-base font-light italic leading-relaxed mb-6">
                    "{review.quote}"
                  </p>
                </div>

                {/* Guest Profile Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden border border-amber-400/30">
                      <Image
                        src={review.avatar}
                        alt={review.guestName}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                        <span>{review.guestName}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      </h3>
                      <p className="text-xs text-slate-400">
                        {review.guestLocation} • <span className="text-amber-300/80">{review.stayedRoom}</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] text-slate-500 hidden sm:block">
                    {review.date}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
