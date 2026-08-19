"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { RoomFilters } from "@/components/rooms/room-filters";
import { RoomCard } from "@/components/rooms/room-card";
import { roomsData } from "@/data/rooms";
import { RoomCategory } from "@/types";
import { Sparkles, Calendar, Users, SlidersHorizontal } from "lucide-react";

function RoomsListingContent() {
  const searchParams = useSearchParams();

  const urlCategory = (searchParams.get("category") as RoomCategory) || "All Suites";
  const urlGuests = Number(searchParams.get("guests")) || 0;
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<RoomCategory>(urlCategory);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [minBedrooms, setMinBedrooms] = useState(0);
  const [minGuests, setMinGuests] = useState(urlGuests);
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    if (urlCategory) setSelectedCategory(urlCategory);
    if (urlGuests) setMinGuests(urlGuests);
  }, [urlCategory, urlGuests]);

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("All Suites");
    setMaxPrice(200000);
    setMinBedrooms(0);
    setMinGuests(0);
    setSortBy("featured");
  };

  const filteredRooms = useMemo(() => {
    return roomsData
      .filter((room) => {
        // Search Term Filter
        if (
          searchTerm &&
          !room.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !room.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !room.tagline.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return false;
        }

        // Category Filter
        if (selectedCategory !== "All Suites" && room.category !== selectedCategory) {
          return false;
        }

        // Price Filter
        if (room.pricePerNight > maxPrice) {
          return false;
        }

        // Bedroom Filter
        if (minBedrooms > 0 && room.bedrooms < minBedrooms) {
          return false;
        }

        // Guest Filter
        if (minGuests > 0 && room.maxGuests < minGuests) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.pricePerNight - b.pricePerNight;
        if (sortBy === "price-desc") return b.pricePerNight - a.pricePerNight;
        if (sortBy === "size-desc") return b.sizeSqM - a.sizeSqM;
        if (sortBy === "rating-desc") return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [searchTerm, selectedCategory, maxPrice, minBedrooms, minGuests, sortBy]);

  return (
    <div className="min-h-screen bg-[#0b0d13] pb-24">
      {/* Page Header */}
      <PageHeader
        badgeText="Curated Suites Collection"
        title="Luxury Residences & Penthouses"
        subtitle="Experience our hand-crafted collection of boutique suites, featuring 24/7 power, panoramic terraces, on-demand master chefs, and biometric security."
      >
        {checkIn && checkOut && (
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300">
            <Calendar className="w-3.5 h-3.5" />
            <span>
              Dates: {checkIn} to {checkOut} • {urlGuests ? `${urlGuests} Guests` : "All Capacities"}
            </span>
          </div>
        )}
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {/* Filter Controls */}
        <RoomFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          minBedrooms={minBedrooms}
          setMinBedrooms={setMinBedrooms}
          minGuests={minGuests}
          setMinGuests={setMinGuests}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onReset={handleReset}
        />

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between py-6 text-xs text-slate-400">
          <p>
            Showing <span className="font-semibold text-white">{filteredRooms.length}</span> luxury suites available
          </p>
          {(searchTerm || selectedCategory !== "All Suites" || minBedrooms > 0 || minGuests > 0) && (
            <span className="text-amber-400 font-medium">Filters active</span>
          )}
        </div>

        {/* Suites Grid */}
        {filteredRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 px-4 rounded-3xl bg-[#121624] border border-white/10 max-w-xl mx-auto space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-white font-medium">
              No Suites Match Your Filters
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Try adjusting your price range, reducing minimum bedrooms, or resetting your search parameters.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RoomsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0b0d13] flex items-center justify-center text-amber-400 text-sm">
          Loading Luxury Suites...
        </div>
      }
    >
      <RoomsListingContent />
    </Suspense>
  );
}
