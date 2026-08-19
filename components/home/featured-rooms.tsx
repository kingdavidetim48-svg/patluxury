"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { roomsData } from "@/data/rooms";
import { RoomCard } from "@/components/rooms/room-card";
import { LuxuryBadge } from "@/components/shared/badge";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { RoomCategory } from "@/types";

const CATEGORIES: RoomCategory[] = [
  "All Suites",
  "Executive",
  "Suites",
  "Deluxe",
  "Standard Luxury",
];

export function FeaturedRooms() {
  const [selectedCategory, setSelectedCategory] = useState<RoomCategory>("All Suites");

  const filteredRooms =
    selectedCategory === "All Suites"
      ? roomsData
      : roomsData.filter((r) => r.category === selectedCategory);

  return (
    <section className="py-24 bg-[#0e111a] border-y border-amber-500/15 relative overflow-hidden">
      {/* Subtle Background Lighting */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <LuxuryBadge>Curated Suites Collection</LuxuryBadge>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
                Featured Residences &{" "}
                <span className="font-normal italic gold-gradient-text">
                  Signature Penthouses
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
                Discover our signature suites in Uyo, appointed with Italian quartz culinary spaces, spa-grade soaking baths, and panoramic terraces.
              </p>
            </div>

            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300 hover:text-white transition-colors group self-start md:self-auto"
            >
              <span>View All ({roomsData.length} Suites)</span>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Category Tab Buttons with Scroll Reveal */}
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-amber-400 text-black font-semibold shadow-lg shadow-amber-400/20"
                    : "bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Room Cards Grid with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.slice(0, 6).map((room, idx) => (
            <ScrollReveal
              key={room.id}
              animation="fade-up"
              delay={(idx % 3) * 120}
            >
              <RoomCard room={room} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
