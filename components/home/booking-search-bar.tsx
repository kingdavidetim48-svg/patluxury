"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users, Search, Sparkles, ChevronDown, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingSearchBarProps {
  className?: string;
  variant?: "hero" | "compact";
}

export function BookingSearchBar({ className, variant = "hero" }: BookingSearchBarProps) {
  const router = useRouter();

  // Tomorrow as default check-in
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultCheckIn = tomorrow.toISOString().split("T")[0];

  // 3 days later as default check-out
  const threeDaysLater = new Date();
  threeDaysLater.setDate(threeDaysLater.getDate() + 4);
  const defaultCheckOut = threeDaysLater.toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false);
  const [category, setCategory] = useState("All Suites");

  const totalGuests = adults + children;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      guests: totalGuests.toString(),
      adults: adults.toString(),
      children: children.toString(),
    });
    if (category !== "All Suites") {
      params.set("category", category);
    }
    router.push(`/rooms?${params.toString()}`);
  };

  return (
    <div
      className={cn(
        "w-full max-w-5xl mx-auto rounded-2xl bg-[#121624]/95 border border-amber-500/25 p-4 sm:p-6 backdrop-blur-2xl shadow-2xl shadow-black/80 relative z-20",
        className
      )}
    >
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Check-In Date */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Check-In Date</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={checkIn}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-black/40 border border-white/10 hover:border-amber-500/40 focus:border-amber-400 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none transition-colors [color-scheme:dark]"
                required
              />
            </div>
          </div>

          {/* Check-Out Date */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Check-Out Date</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={checkOut}
                min={checkIn || new Date().toISOString().split("T")[0]}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-black/40 border border-white/10 hover:border-amber-500/40 focus:border-amber-400 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none transition-colors [color-scheme:dark]"
                required
              />
            </div>
          </div>

          {/* Guests Popover Selector */}
          <div className="space-y-1.5 relative">
            <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-300 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Guests & Suites</span>
            </label>
            <button
              type="button"
              onClick={() => setIsGuestPickerOpen(!isGuestPickerOpen)}
              className="w-full bg-black/40 border border-white/10 hover:border-amber-500/40 focus:border-amber-400 rounded-xl px-3.5 py-3 text-sm text-white flex items-center justify-between transition-colors text-left"
            >
              <span>
                {totalGuests} {totalGuests === 1 ? "Guest" : "Guests"} ({adults} Ad, {children} Ch)
              </span>
              <ChevronDown className="w-4 h-4 text-amber-400" />
            </button>

            {/* Popover Dropdown */}
            {isGuestPickerOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#171d30] border border-amber-500/30 rounded-xl p-4 shadow-2xl z-30 space-y-4 animate-in fade-in zoom-in-95">
                {/* Adults Counter */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white">Adults</p>
                    <p className="text-[10px] text-slate-400">Ages 13 and above</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      disabled={adults <= 1}
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-30 text-white flex items-center justify-center transition-all"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-semibold text-amber-300 w-4 text-center">
                      {adults}
                    </span>
                    <button
                      type="button"
                      disabled={adults >= 8}
                      onClick={() => setAdults(Math.min(8, adults + 1))}
                      className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-30 text-white flex items-center justify-center transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Children Counter */}
                <div className="flex items-center justify-between border-t border-white/5 pt-3">
                  <div>
                    <p className="text-xs font-semibold text-white">Children</p>
                    <p className="text-[10px] text-slate-400">Ages 0 - 12</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      disabled={children <= 0}
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-30 text-white flex items-center justify-center transition-all"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-semibold text-amber-300 w-4 text-center">
                      {children}
                    </span>
                    <button
                      type="button"
                      disabled={children >= 6}
                      onClick={() => setChildren(Math.min(6, children + 1))}
                      className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-30 text-white flex items-center justify-center transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsGuestPickerOpen(false)}
                  className="w-full py-1.5 text-center text-xs font-semibold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
                >
                  Confirm Guests
                </button>
              </div>
            )}
          </div>

          {/* Search Button */}
          <div>
            <button
              type="submit"
              className="w-full h-[46px] rounded-xl text-xs font-semibold uppercase tracking-[0.2em] text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Search className="w-4 h-4" />
              <span>Explore Available Suites</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
