"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { galleryData } from "@/data/gallery";
import { GalleryItem } from "@/types";
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";

const CATEGORIES = [
  "All Spaces",
  "Presidential Suites",
  "Master Bedrooms",
  "Living Spaces",
  "Gourmet Kitchens",
  "Spa Bathrooms",
  "Hospitality & Dining",
  "Architecture & Views",
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Spaces");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredImages =
    selectedCategory === "All Spaces"
      ? galleryData
      : galleryData.filter((img) => img.category === selectedCategory);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === "Escape") setActiveLightboxIndex(null);
      if (e.key === "ArrowRight")
        setActiveLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredImages.length : 0));
      if (e.key === "ArrowLeft")
        setActiveLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : 0));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIndex, filteredImages.length]);

  return (
    <div className="min-h-screen bg-[#0b0d13] pb-24">
      {/* Header Banner */}
      <PageHeader
        badgeText="Visual Portfolio"
        title="Immersive Property Gallery"
        subtitle="Explore our architectural collection of marble master suites, panoramic skyline terraces, gourmet kitchens, and private dining salons."
        backgroundImage="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=85"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-amber-400 text-black font-semibold shadow-lg shadow-amber-400/20"
                  : "bg-[#121624] hover:bg-[#1a2034] text-slate-300 hover:text-white border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Masonry-style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((item, idx) => (
            <ScrollReveal
              key={item.id}
              animation="fade-up"
              delay={(idx % 3) * 100}
            >
              <div
                onClick={() => setActiveLightboxIndex(idx)}
                className={`group relative rounded-3xl overflow-hidden bg-[#121624] border border-white/10 hover:border-amber-500/40 shadow-xl cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/80 ${
                  item.aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Hover Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Top Category Badge */}
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-black/70 backdrop-blur-md text-amber-300 border border-amber-400/30">
                  {item.category}
                </span>

                {/* Bottom Title & Inspect Button */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg text-white font-medium group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-[11px] text-slate-400 font-light block mt-0.5">
                      Click to expand in fullscreen
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-amber-400 group-hover:text-black text-white flex items-center justify-center transition-all shrink-0 ml-2">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-300">
          {/* Top Info Bar */}
          <div className="flex items-center justify-between z-10 text-white">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block">
                {filteredImages[activeLightboxIndex].category}
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-medium mt-0.5">
                {filteredImages[activeLightboxIndex].title}
              </h3>
            </div>
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Central Image Container */}
          <div className="relative flex-grow flex items-center justify-center my-4 max-h-[75vh]">
            <button
              type="button"
              onClick={() =>
                setActiveLightboxIndex(
                  (prev) => (prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : 0)
                )
              }
              className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/70 hover:bg-black border border-white/20 text-white hover:text-amber-300 transition-all hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative w-full h-full max-w-5xl aspect-[16/10] max-h-[70vh]">
              <Image
                src={filteredImages[activeLightboxIndex].image}
                alt={filteredImages[activeLightboxIndex].title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <button
              type="button"
              onClick={() =>
                setActiveLightboxIndex(
                  (prev) => (prev !== null ? (prev + 1) % filteredImages.length : 0)
                )
              }
              className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/70 hover:bg-black border border-white/20 text-white hover:text-amber-300 transition-all hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Bar: Action link & Slide Counter */}
          <div className="flex items-center justify-between text-xs text-slate-400 border-t border-white/10 pt-4">
            <span>
              Image {activeLightboxIndex + 1} of {filteredImages.length}
            </span>

            {filteredImages[activeLightboxIndex].roomSlug && (
              <Link
                href={`/rooms/${filteredImages[activeLightboxIndex].roomSlug}`}
                className="inline-flex items-center gap-1.5 text-amber-300 hover:text-white font-semibold uppercase tracking-wider"
              >
                <span>View Complete Suite Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
