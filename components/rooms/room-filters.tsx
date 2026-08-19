"use client";

import React from "react";
import { Search, SlidersHorizontal, Users, Bed, DollarSign, Sparkles, RotateCcw } from "lucide-react";
import { RoomCategory } from "@/types";

interface RoomFiltersProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  selectedCategory: RoomCategory;
  setSelectedCategory: (v: RoomCategory) => void;
  maxPrice: number;
  setMaxPrice: (v: number) => void;
  minBedrooms: number;
  setMinBedrooms: (v: number) => void;
  minGuests: number;
  setMinGuests: (v: number) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
  onReset: () => void;
}

const CATEGORIES: RoomCategory[] = [
  "All Suites",
  "Executive",
  "Suites",
  "Deluxe",
  "Standard Luxury",
];

export function RoomFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  minBedrooms,
  setMinBedrooms,
  minGuests,
  setMinGuests,
  sortBy,
  setSortBy,
  onReset,
}: RoomFiltersProps) {
  return (
    <div className="bg-[#121624] border border-amber-500/20 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Top Search & Reset Row */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by suite name or feature..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/40 border border-white/10 focus:border-amber-400 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 hidden md:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-black/40 border border-white/10 hover:border-amber-500/30 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured Suites</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="size-desc">Largest Size (m²)</option>
              <option value="rating-desc">Highest Rated</option>
            </select>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="p-2 text-xs rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-amber-300 transition-colors flex items-center gap-1.5"
            title="Reset Filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Category Pills Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-amber-400 text-black font-semibold shadow-md shadow-amber-400/20"
                : "bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Dynamic Sliders / Filter Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/5">
        {/* Price Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-amber-400" />
              Max Price / Night:
            </span>
            <span className="font-semibold text-amber-300">
              ₦{maxPrice.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="50000"
            max="200000"
            step="5000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer bg-black/40 h-2 rounded-lg"
          />
        </div>

        {/* Minimum Bedrooms */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-amber-400" />
              Minimum Bedrooms:
            </span>
            <span className="font-semibold text-amber-300">
              {minBedrooms === 0 ? "Any" : `${minBedrooms}+ Beds`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {[0, 1, 2, 3].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setMinBedrooms(num)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  minBedrooms === num
                    ? "bg-amber-400 text-black font-semibold"
                    : "bg-black/40 hover:bg-white/5 text-slate-300 border border-white/10"
                }`}
              >
                {num === 0 ? "Any" : `${num} Bed`}
              </button>
            ))}
          </div>
        </div>

        {/* Minimum Guests */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              Minimum Guests:
            </span>
            <span className="font-semibold text-amber-300">
              {minGuests === 0 ? "Any" : `${minGuests}+ Guests`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {[0, 2, 4, 6].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setMinGuests(num)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  minGuests === num
                    ? "bg-amber-400 text-black font-semibold"
                    : "bg-black/40 hover:bg-white/5 text-slate-300 border border-white/10"
                }`}
              >
                {num === 0 ? "Any" : `${num}+`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
