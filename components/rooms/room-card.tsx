"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bed, Users, Maximize, ArrowRight, Star, Sparkles, Building, ChevronRight } from "lucide-react";
import { Room } from "@/types";
import { formatPrice, formatPriceToUSD } from "@/lib/currency";
import { cn } from "@/lib/utils";

interface RoomCardProps {
  room: Room;
  className?: string;
  showCategory?: boolean;
}

export function RoomCard({ room, className, showCategory = true }: RoomCardProps) {
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");

  return (
    <div
      className={cn(
        "group relative bg-[#121624] rounded-3xl overflow-hidden border border-white/10 hover:border-amber-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-black/80 flex flex-col justify-between hover:-translate-y-1.5",
        className
      )}
    >
      {/* Image Container with Cinematic Zoom */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
        <Image
          src={room.featuredImage}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121624] via-transparent to-black/40" />

        {/* Top Badges: Category & Rating */}
        <div className="absolute top-3.5 sm:top-4 left-3.5 sm:left-4 right-3.5 sm:right-4 flex items-center justify-between pointer-events-none">
          {showCategory && (
            <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider bg-black/70 backdrop-blur-md text-amber-300 border border-amber-400/30 shadow-lg">
              {room.category}
            </span>
          )}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs border border-white/15 ml-auto shadow-lg">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-xs">{room.rating.toFixed(2)}</span>
            <span className="text-slate-400 text-[10px]">({room.reviewCount})</span>
          </div>
        </div>

        {/* Currency Switcher Overlay Pill */}
        <div className="absolute bottom-3 right-3 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrency(currency === "NGN" ? "USD" : "NGN");
            }}
            className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-black/80 hover:bg-amber-400 hover:text-black text-amber-300 border border-amber-500/30 transition-all shadow-md active:scale-95"
            title="Click to toggle currency between NGN (₦) and USD ($)"
            aria-label="Toggle currency"
          >
            {currency === "NGN" ? "Switch to USD ($)" : "Switch to NGN (₦)"}
          </button>
        </div>

        {/* Location Floor Pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] text-slate-300 font-medium">
          <Building className="w-3 h-3 text-amber-400" />
          <span>{room.floor}</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between space-y-4">
        <div>
          {/* Price Header */}
          <div className="flex items-baseline justify-between mb-1.5">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-medium">
                Nightly Rate
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide gold-shimmer-text">
                  {currency === "NGN"
                    ? formatPrice(room.pricePerNight, "NGN")
                    : formatPriceToUSD(room.pricePerNight)}
                </span>
                <span className="text-xs text-slate-400 font-light">/ night</span>
              </div>
            </div>

            {room.featured && (
              <span className="inline-flex items-center gap-1 text-[10px] uppercase font-semibold tracking-wider text-amber-400 px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30">
                <Sparkles className="w-3 h-3" />
                Featured
              </span>
            )}
          </div>

          {/* Room Title & Tagline */}
          <h3 className="font-serif text-lg sm:text-xl font-medium text-white group-hover:text-amber-300 transition-colors mt-2 line-clamp-1">
            <Link href={`/rooms/${room.slug}`}>{room.name}</Link>
          </h3>
          <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed font-light">
            {room.tagline}
          </p>

          {/* Quick Property Specifications Strip */}
          <div className="grid grid-cols-3 gap-2 py-3.5 my-3 border-y border-white/5 text-slate-300 text-xs">
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">{room.bedrooms} {room.bedrooms > 1 ? "Beds" : "Bed"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">{room.maxGuests} Guests</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">{room.sizeSqM} m²</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 pt-1">
          <Link
            href={`/rooms/${room.slug}`}
            className="flex-1 py-3 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-center text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-1"
          >
            <span>Explore</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
          </Link>
          <Link
            href={`/book?room=${room.slug}`}
            className="flex-1 py-3 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-center text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 active:scale-95"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
