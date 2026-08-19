"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  MessageCircle,
  ChefHat,
  Car,
  Wine,
} from "lucide-react";
import { Room } from "@/types";
import { formatPrice, formatPriceToUSD } from "@/lib/currency";
import { calculateNights } from "@/lib/utils";

interface BookingCardProps {
  room: Room;
}

export function BookingCard({ room }: BookingCardProps) {
  const router = useRouter();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultCheckIn = tomorrow.toISOString().split("T")[0];

  const threeDaysLater = new Date();
  threeDaysLater.setDate(threeDaysLater.getDate() + 4);
  const defaultCheckOut = threeDaysLater.toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [guests, setGuests] = useState(2);
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");

  // VIP Add-ons
  const [addChef, setAddChef] = useState(false);
  const [addChauffeur, setAddChauffeur] = useState(false);
  const [addChampagne, setAddChampagne] = useState(false);

  const nights = calculateNights(checkIn, checkOut);
  const baseTotal = room.pricePerNight * nights;

  const chefCost = addChef ? 45000 * nights : 0;
  const chauffeurCost = addChauffeur ? 35000 : 0;
  const champagneCost = addChampagne ? 25000 : 0;

  const grandTotal = baseTotal + chefCost + chauffeurCost + champagneCost;

  const handleProceedBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      room: room.slug,
      checkIn,
      checkOut,
      guests: guests.toString(),
      addChef: addChef ? "true" : "false",
      addChauffeur: addChauffeur ? "true" : "false",
      addChampagne: addChampagne ? "true" : "false",
    });
    router.push(`/book?${params.toString()}`);
  };

  const handleWhatsAppBooking = () => {
    const msg = `Hello Pat Luxury Concierge! I would like to reserve ${room.name} for ${nights} night(s) from ${checkIn} to ${checkOut} for ${guests} guest(s). Estimated total: ₦${grandTotal.toLocaleString()}.`;
    window.open(`https://wa.me/2347030968954?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="bg-[#121624] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 sticky top-28 space-y-6">
      {/* Price Header */}
      <div className="flex items-baseline justify-between border-b border-white/10 pb-5">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">
            Suite Rate
          </span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
              {currency === "NGN"
                ? formatPrice(room.pricePerNight, "NGN")
                : formatPriceToUSD(room.pricePerNight)}
            </span>
            <span className="text-xs text-slate-400 font-light">/ night</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setCurrency(currency === "NGN" ? "USD" : "NGN")}
          className="text-[10px] uppercase font-semibold tracking-wider px-2.5 py-1 rounded bg-black/60 hover:bg-black text-amber-300 border border-amber-500/20 transition-all"
        >
          {currency === "NGN" ? "Switch to USD $" : "Switch to NGN ₦"}
        </button>
      </div>

      {/* Reservation Form Inputs */}
      <form onSubmit={handleProceedBooking} className="space-y-4">
        {/* Date Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-amber-400" />
              <span>Check-In</span>
            </label>
            <input
              type="date"
              value={checkIn}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-black/40 border border-white/10 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white [color-scheme:dark] focus:outline-none"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-amber-400" />
              <span>Check-Out</span>
            </label>
            <input
              type="date"
              value={checkOut}
              min={checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-black/40 border border-white/10 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white [color-scheme:dark] focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Guests Input */}
        <div className="space-y-1">
          <label className="text-[10px] font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-1">
            <Users className="w-3 h-3 text-amber-400" />
            <span>Guests (Max {room.maxGuests})</span>
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full bg-black/40 border border-white/10 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white focus:outline-none cursor-pointer"
          >
            {Array.from({ length: room.maxGuests }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>

        {/* Optional VIP Add-Ons */}
        <div className="pt-2 border-t border-white/5 space-y-2">
          <p className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
            Enhance Your Stay (VIP Extras)
          </p>

          <label className="flex items-center justify-between p-2.5 rounded-xl bg-black/30 border border-white/5 hover:border-amber-500/20 cursor-pointer text-xs transition-colors">
            <span className="flex items-center gap-2 text-slate-200">
              <ChefHat className="w-3.5 h-3.5 text-amber-400" />
              <span>Private In-Suite Chef</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-amber-300">+₦45,000/nt</span>
              <input
                type="checkbox"
                checked={addChef}
                onChange={(e) => setAddChef(e.target.checked)}
                className="accent-amber-400 rounded"
              />
            </div>
          </label>

          <label className="flex items-center justify-between p-2.5 rounded-xl bg-black/30 border border-white/5 hover:border-amber-500/20 cursor-pointer text-xs transition-colors">
            <span className="flex items-center gap-2 text-slate-200">
              <Car className="w-3.5 h-3.5 text-amber-400" />
              <span>Airport Chauffeur Transfer</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-amber-300">+₦35,000</span>
              <input
                type="checkbox"
                checked={addChauffeur}
                onChange={(e) => setAddChauffeur(e.target.checked)}
                className="accent-amber-400 rounded"
              />
            </div>
          </label>

          <label className="flex items-center justify-between p-2.5 rounded-xl bg-black/30 border border-white/5 hover:border-amber-500/20 cursor-pointer text-xs transition-colors">
            <span className="flex items-center gap-2 text-slate-200">
              <Wine className="w-3.5 h-3.5 text-amber-400" />
              <span>Chilled Champagne on Arrival</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-amber-300">+₦25,000</span>
              <input
                type="checkbox"
                checked={addChampagne}
                onChange={(e) => setAddChampagne(e.target.checked)}
                className="accent-amber-400 rounded"
              />
            </div>
          </label>
        </div>

        {/* Live Calculation Breakdown */}
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>
              ₦{room.pricePerNight.toLocaleString()} × {nights} {nights === 1 ? "night" : "nights"}
            </span>
            <span className="text-white">₦{baseTotal.toLocaleString()}</span>
          </div>

          {addChef && (
            <div className="flex justify-between text-slate-400">
              <span>Chef Service ({nights} nights)</span>
              <span className="text-white">₦{chefCost.toLocaleString()}</span>
            </div>
          )}

          {addChauffeur && (
            <div className="flex justify-between text-slate-400">
              <span>VIP Chauffeur Pickup</span>
              <span className="text-white">₦{chauffeurCost.toLocaleString()}</span>
            </div>
          )}

          {addChampagne && (
            <div className="flex justify-between text-slate-400">
              <span>Arrival Champagne</span>
              <span className="text-white">₦{champagneCost.toLocaleString()}</span>
            </div>
          )}

          <div className="border-t border-white/10 pt-2 mt-2 flex justify-between font-semibold text-sm">
            <span className="text-white">Estimated Total</span>
            <span className="text-amber-300">₦{grandTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* Primary Booking Button */}
        <button
          type="submit"
          className="w-full py-3.5 rounded-xl text-xs font-semibold uppercase tracking-[0.2em] text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Continue to Reservation</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* WhatsApp Direct Concierge CTA */}
        <button
          type="button"
          onClick={handleWhatsAppBooking}
          className="w-full py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-white hover:text-amber-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/30 transition-colors flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>Reserve via WhatsApp</span>
        </button>
      </form>

      {/* Trust Badges */}
      <div className="border-t border-white/5 pt-4 space-y-2 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>100% Guaranteed 24/7 Clean Power</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>Keyless Biometric Entry & Guarded Perimeter</span>
        </div>
      </div>
    </div>
  );
}
