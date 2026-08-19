"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Sparkles, Maximize2 } from "lucide-react";
import { galleryData } from "@/data/gallery";
import { LuxuryBadge } from "@/components/shared/badge";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function GalleryTeaser() {
  const previewImages = galleryData.slice(0, 5);

  return (
    <section className="py-24 bg-[#0e111a] border-t border-amber-500/15 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <LuxuryBadge>The Pat Luxury Showcase</LuxuryBadge>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
                Immerse Yourself in{" "}
                <span className="font-normal italic gold-gradient-text">
                  Our Living Spaces
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
                Step inside our signature penthouses, marble spa baths, modern quartz kitchens, and private skyline terraces.
              </p>
            </div>

            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300 hover:text-white transition-colors group self-start md:self-auto"
            >
              <span>View Full Gallery (15+ Spaces)</span>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Mosaic Asymmetrical Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Main Large Feature (2 cols, 2 rows on lg) */}
          <ScrollReveal
            animation="scale-up"
            duration={800}
            className="sm:col-span-2 lg:col-span-2 lg:row-span-2 h-full"
          >
            <div className="relative aspect-[4/3] lg:aspect-auto h-full min-h-[340px] sm:min-h-[420px] rounded-3xl overflow-hidden group border border-white/10 hover:border-amber-500/40 shadow-2xl transition-all duration-500 hover:shadow-black/90">
              <Image
                src={previewImages[0].image}
                alt={previewImages[0].title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-black/70 backdrop-blur-md text-amber-300 border border-amber-400/30">
                  Featured Space
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase font-semibold tracking-widest text-amber-300 block mb-1">
                    {previewImages[0].category}
                  </span>
                  <h3 className="font-serif text-lg sm:text-2xl text-white font-medium group-hover:text-amber-300 transition-colors">
                    {previewImages[0].title}
                  </h3>
                </div>
                <Link
                  href="/gallery"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-400 hover:text-black text-white flex items-center justify-center transition-all shrink-0 ml-3"
                  aria-label="View in gallery"
                >
                  <Eye className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* 4 smaller grid items */}
          {previewImages.slice(1, 5).map((item, idx) => (
            <ScrollReveal
              key={item.id}
              animation="fade-up"
              delay={(idx + 1) * 120}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group border border-white/10 hover:border-amber-500/40 shadow-lg transition-all duration-500 hover:-translate-y-1">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[9px] uppercase font-semibold tracking-wider text-amber-300 block">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-xs sm:text-sm text-white font-medium line-clamp-1 group-hover:text-amber-200 transition-colors mt-0.5">
                    {item.title}
                  </h4>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
