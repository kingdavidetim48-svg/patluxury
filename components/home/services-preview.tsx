import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { servicesData } from "@/data/services";
import { LuxuryBadge } from "@/components/shared/badge";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function ServicesPreview() {
  return (
    <section className="py-24 bg-[#0b0d13] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-4 max-w-2xl">
              <LuxuryBadge>Bespoke Concierge</LuxuryBadge>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
                Curated VIP Services for the{" "}
                <span className="font-normal italic gold-gradient-text">
                  Discerning Guest
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
                Experience seamless luxury with private in-suite master dining, airport chauffeur transfers, and 24/7 personal concierge assistance in Uyo.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300 hover:text-white transition-colors group self-start md:self-auto"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Services Grid (3 prominent services) with Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.slice(0, 3).map((service, idx) => (
            <ScrollReveal
              key={service.id}
              animation="fade-up"
              delay={idx * 130}
            >
              <div className="group relative rounded-3xl bg-[#121624] border border-white/10 hover:border-amber-500/40 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/80 h-full">
                {/* Service Image */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-black/60">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121624] via-transparent to-transparent" />

                  {service.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-black/70 backdrop-blur-md text-amber-300 border border-amber-400/30">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Service Details */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-white group-hover:text-amber-300 transition-colors mb-2">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-light mb-4">
                      {service.tagline}
                    </p>

                    <ul className="space-y-1.5 mb-6 text-xs text-slate-300 border-t border-white/5 pt-4">
                      {service.details.slice(0, 2).map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-300">
                      {service.pricingInfo.split("(")[0]}
                    </span>
                    <Link
                      href={`/services#${service.id}`}
                      className="p-2.5 rounded-full bg-white/5 group-hover:bg-amber-400 group-hover:text-black text-amber-400 transition-all shadow-md"
                      aria-label={`View details for ${service.title}`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
