import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { LuxuryBadge } from "@/components/shared/badge";
import { servicesData } from "@/data/services";
import { CtaBanner } from "@/components/home/cta-banner";
import {
  ChefHat,
  Car,
  Phone,
  Sparkles,
  Award,
  CheckCircle2,
  Calendar,
  MessageCircle,
} from "lucide-react";

export const metadata = {
  title: "VIP Hospitality Services — Private Chef, Chauffeur & 24/7 Concierge",
  description:
    "Explore bespoke luxury services at Pat Luxury: on-demand Michelin-partner private chefs, executive airport transfers, in-suite wellness massages, and 24/7 personal concierge assistance.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0b0d13] pb-12">
      {/* Header */}
      <PageHeader
        badgeText="Curated VIP Experiences"
        title="Exceptional Services Tailored to You"
        subtitle="Elevate your stay beyond traditional accommodation with our suite of bespoke residential and lifestyle services."
        backgroundImage="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=2000&q=85"
      />

      {/* Services List Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
        {servicesData.map((service, index) => {
          const isEven = index % 2 === 1;
          return (
            <div
              key={service.id}
              id={service.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-8 border-t border-white/5 first:border-none first:pt-0 scroll-mt-28"
            >
              {/* Service Image (6 cols) */}
              <div
                className={`lg:col-span-6 relative aspect-[16/11] rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl shadow-black/80 group ${
                  isEven ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {service.badge && (
                  <span className="absolute top-6 left-6 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/70 backdrop-blur-md text-amber-300 border border-amber-400/30">
                    {service.badge}
                  </span>
                )}
              </div>

              {/* Service Details (6 cols) */}
              <div
                className={`lg:col-span-6 space-y-6 ${
                  isEven ? "lg:order-1" : ""
                }`}
              >
                <div className="space-y-2">
                  <p className="text-xs uppercase font-semibold tracking-[0.2em] text-amber-400">
                    Service In Focus
                  </p>
                  <h2 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight">
                    {service.title}
                  </h2>
                  <p className="text-sm font-medium text-amber-200/90 italic">
                    {service.tagline}
                  </p>
                </div>

                <p className="text-sm text-slate-300 font-light leading-relaxed">
                  {service.description}
                </p>

                {/* Inclusions List */}
                <div className="space-y-2.5 pt-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                    What is Included:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {service.details.map((detail, idx) => (
                      <li
                        key={idx}
                        className="p-3 rounded-xl bg-[#121624] border border-white/5 flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price and Action Bar */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium">
                      Pricing & Availability
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {service.pricingInfo}
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/2347030968954?text=${encodeURIComponent(
                      `Hello Pat Luxury Concierge! I would like to enquire about booking the "${service.title}" service.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 transition-all flex items-center justify-center gap-2 shadow-md shadow-amber-400/20"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Banner */}
      <CtaBanner />
    </div>
  );
}
