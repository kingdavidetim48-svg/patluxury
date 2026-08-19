"use client";

import React, { useState } from "react";
import {
  Zap,
  Wifi,
  KeyRound,
  ChefHat,
  UtensilsCrossed,
  Tv,
  Sparkles,
  ShieldCheck,
  Wind,
  Car,
  Shirt,
  Bath,
  CheckCircle2,
} from "lucide-react";
import { amenitiesData } from "@/data/amenities";
import { LuxuryBadge } from "@/components/shared/badge";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const ICON_MAP: Record<string, any> = {
  Zap,
  Wifi,
  KeyRound,
  ChefHat,
  UtensilsCrossed,
  Tv,
  Sparkles,
  ShieldCheck,
  Wind,
  Car,
  Shirt,
  Bath,
};

const CATEGORIES = ["All", "Comfort", "Technology", "Hospitality", "Security", "Wellness"];

export function AmenitiesGrid() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredAmenities =
    activeTab === "All"
      ? amenitiesData
      : amenitiesData.filter((a) => a.category === activeTab);

  return (
    <section className="py-24 bg-[#0e111a] border-t border-amber-500/15 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <LuxuryBadge>Exceptional Amenities</LuxuryBadge>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
              Every Detail Engineered for{" "}
              <span className="font-normal italic gold-gradient-text">
                Total Comfort
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
              From climate-controlled whisper-quiet interiors to chef-grade culinary stations and high-speed streaming, our suites in Uyo are equipped for effortless living.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Filter Tabs */}
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeTab === cat
                    ? "bg-amber-400 text-black font-semibold shadow-lg shadow-amber-400/20"
                    : "bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Amenities Cards Grid with Scroll Reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAmenities.map((amenity, idx) => {
            const IconComponent = ICON_MAP[amenity.iconName] || CheckCircle2;
            return (
              <ScrollReveal
                key={amenity.id}
                animation="fade-up"
                delay={(idx % 3) * 100}
              >
                <div className="group p-6 rounded-2xl bg-[#131724] border border-white/5 hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/60 flex items-start gap-4 h-full">
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-black transition-all duration-300 shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-sm text-white group-hover:text-amber-300 transition-colors">
                        {amenity.name}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      {amenity.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
