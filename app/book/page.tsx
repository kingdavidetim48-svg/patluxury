"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { LuxuryBadge } from "@/components/shared/badge";
import { roomsData } from "@/data/rooms";
import { Room } from "@/types";
import { calculateNights } from "@/lib/utils";
import { formatPrice, formatPriceToUSD } from "@/lib/currency";
import {
  Calendar,
  Users,
  ChefHat,
  Car,
  Wine,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  MessageCircle,
  Clock,
  Printer,
} from "lucide-react";

function BookingSuiteContent() {
  const searchParams = useSearchParams();

  // Selected room slug from URL or default to presidential
  const initialRoomSlug = searchParams.get("room") || roomsData[0].slug;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultCheckIn = searchParams.get("checkIn") || tomorrow.toISOString().split("T")[0];

  const threeDaysLater = new Date();
  threeDaysLater.setDate(threeDaysLater.getDate() + 4);
  const defaultCheckOut = searchParams.get("checkOut") || threeDaysLater.toISOString().split("T")[0];

  const [selectedSlug, setSelectedSlug] = useState(initialRoomSlug);
  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [adults, setAdults] = useState(Number(searchParams.get("adults")) || 2);
  const [children, setChildren] = useState(Number(searchParams.get("children")) || 0);

  // VIP Add-ons
  const [addChef, setAddChef] = useState(searchParams.get("addChef") === "true");
  const [addChauffeur, setAddChauffeur] = useState(searchParams.get("addChauffeur") === "true");
  const [addChampagne, setAddChampagne] = useState(searchParams.get("addChampagne") === "true");
  const [lateCheckOut, setLateCheckOut] = useState(false);

  // Guest Details
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<any>(null);

  const selectedRoom: Room =
    roomsData.find((r) => r.slug === selectedSlug) || roomsData[0];

  const totalGuests = adults + children;
  const nights = calculateNights(checkIn, checkOut);
  const basePrice = selectedRoom.pricePerNight * nights;

  const chefCost = addChef ? 45000 * nights : 0;
  const chauffeurCost = addChauffeur ? 35000 : 0;
  const champagneCost = addChampagne ? 25000 : 0;
  const lateCheckOutCost = lateCheckOut ? 20000 : 0;

  const addOnsTotal = chefCost + chauffeurCost + champagneCost + lateCheckOutCost;
  const grandTotal = basePrice + addOnsTotal;

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const reservationRef = `PAT-${Math.floor(100000 + Math.random() * 900000)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmedReservation({
        ref: reservationRef,
        room: selectedRoom,
        checkIn,
        checkOut,
        nights,
        guests: totalGuests,
        adults,
        children,
        guestName,
        guestEmail,
        guestPhone,
        specialRequests,
        addOns: {
          chef: addChef,
          chauffeur: addChauffeur,
          champagne: addChampagne,
          lateCheckOut,
        },
        basePrice,
        addOnsTotal,
        grandTotal,
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      });
    }, 1200);
  };

  const generateWhatsAppConfirmation = () => {
    if (!confirmedReservation) return "";
    const text = `*PAT LUXURY RESIDENCES — RESERVATION REQUEST*
Reference: *${confirmedReservation.ref}*
Suite: *${confirmedReservation.room.name}*
Guest Name: *${confirmedReservation.guestName}*
Phone: *${confirmedReservation.guestPhone}*
Dates: *${confirmedReservation.checkIn}* to *${confirmedReservation.checkOut}* (${confirmedReservation.nights} nights)
Guests: *${confirmedReservation.guests}*
Total Amount: *₦${confirmedReservation.grandTotal.toLocaleString()}*
Add-ons: ${addChef ? "Private Chef, " : ""}${addChauffeur ? "Airport Chauffeur, " : ""}${addChampagne ? "Champagne, " : ""}${lateCheckOut ? "Late Check-out" : "None"}

Please confirm availability and dispatch check-in details.`;
    return encodeURIComponent(text);
  };

  return (
    <div className="min-h-screen bg-[#0b0d13] pb-24">
      {/* Header */}
      <PageHeader
        badgeText="Secure VIP Reservation"
        title="Reserve Your Luxury Suite"
        subtitle="Finalize your reservation in our boutique short-let residences. Enjoy 24/7 power, biometric access, and bespoke hospitality."
        backgroundImage="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=85"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {/* If Confirmation is Generated, Show Luxury Receipt State */}
        {confirmedReservation ? (
          <div className="max-w-3xl mx-auto rounded-3xl bg-[#121624] border border-amber-500/40 p-8 sm:p-12 shadow-2xl shadow-black/90 space-y-8 animate-in fade-in zoom-in-95">
            {/* Top Success Badge */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <LuxuryBadge variant="gold">Reservation Confirmed</LuxuryBadge>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium">
                We Await Your Arrival, {confirmedReservation.guestName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light max-w-lg mx-auto">
                Your reservation voucher has been created. A copy and digital smart access key have been dispatched to <strong>{confirmedReservation.guestEmail}</strong>.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="p-6 rounded-2xl bg-black/50 border border-white/10 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-4 gap-2">
                <div>
                  <span className="text-[10px] uppercase font-semibold tracking-widest text-amber-400">
                    Booking Reference
                  </span>
                  <p className="text-lg font-mono font-bold text-white tracking-wider">
                    {confirmedReservation.ref}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400">
                    Date Created
                  </span>
                  <p className="text-xs text-white">{confirmedReservation.date}</p>
                </div>
              </div>

              {/* Suite Info Row */}
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
                  <Image
                    src={confirmedReservation.room.featuredImage}
                    alt={confirmedReservation.room.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-base text-white font-medium">
                    {confirmedReservation.room.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {confirmedReservation.checkIn} to {confirmedReservation.checkOut} ({confirmedReservation.nights} nights, {confirmedReservation.guests} guests)
                  </p>
                </div>
              </div>

              {/* Financial Math */}
              <div className="space-y-2 text-xs border-t border-white/5 pt-4">
                <div className="flex justify-between text-slate-400">
                  <span>Base Rate ({confirmedReservation.nights} nights)</span>
                  <span className="text-white">₦{confirmedReservation.basePrice.toLocaleString()}</span>
                </div>
                {confirmedReservation.addOnsTotal > 0 && (
                  <div className="flex justify-between text-slate-400">
                    <span>VIP Enhancements & Add-ons</span>
                    <span className="text-white">₦{confirmedReservation.addOnsTotal.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-white/10 pt-3 flex justify-between text-base font-semibold">
                  <span className="text-white">Total Amount</span>
                  <span className="text-amber-300">₦{confirmedReservation.grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Next Steps Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href={`https://wa.me/2347030968954?text=${generateWhatsAppConfirmation()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp Concierge</span>
              </a>

              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Voucher</span>
              </button>

              <button
                type="button"
                onClick={() => setConfirmedReservation(null)}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
              >
                Make Another Booking
              </button>
            </div>
          </div>
        ) : (
          /* Active Reservation Form Workflow */
          <form onSubmit={handleConfirmReservation}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Form Inputs (7 cols) */}
              <div className="lg:col-span-7 space-y-8">
                {/* 1. Suite Selection */}
                <div className="p-6 sm:p-8 rounded-3xl bg-[#121624] border border-white/10 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl text-white font-medium">
                      1. Selected Suite
                    </h3>
                    <Link
                      href="/rooms"
                      className="text-xs text-amber-300 hover:text-white uppercase tracking-wider font-semibold"
                    >
                      Change Suite
                    </Link>
                  </div>

                  <select
                    value={selectedSlug}
                    onChange={(e) => setSelectedSlug(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 focus:border-amber-400 rounded-xl px-4 py-3 text-xs text-white focus:outline-none cursor-pointer"
                  >
                    {roomsData.map((room) => (
                      <option key={room.id} value={room.slug}>
                        {room.name} — ₦{room.pricePerNight.toLocaleString()}/night ({room.category})
                      </option>
                    ))}
                  </select>

                  {/* Selected Room Card Mini Preview */}
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center gap-4">
                    <div className="relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
                      <Image
                        src={selectedRoom.featuredImage}
                        alt={selectedRoom.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-white">
                        {selectedRoom.name}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {selectedRoom.bedrooms} Bed • {selectedRoom.bathrooms} Bath • Max {selectedRoom.maxGuests} Guests • {selectedRoom.sizeSqM} m²
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Dates & Occupancy */}
                <div className="p-6 sm:p-8 rounded-3xl bg-[#121624] border border-white/10 space-y-5 shadow-xl">
                  <h3 className="font-serif text-xl text-white font-medium">
                    2. Dates & Guests
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>Check-In Date</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={checkIn}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs text-white [color-scheme:dark] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>Check-Out Date</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={checkOut}
                        min={checkIn}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs text-white [color-scheme:dark] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        Adults (Ages 13+)
                      </label>
                      <select
                        value={adults}
                        onChange={(e) => setAdults(Number(e.target.value))}
                        className="w-full bg-black/40 border border-white/10 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none cursor-pointer"
                      >
                        {Array.from({ length: selectedRoom.maxGuests }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "Adult" : "Adults"}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        Children (Ages 0 - 12)
                      </label>
                      <select
                        value={children}
                        onChange={(e) => setChildren(Number(e.target.value))}
                        className="w-full bg-black/40 border border-white/10 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none cursor-pointer"
                      >
                        {[0, 1, 2, 3, 4].map((n) => (
                          <option key={n} value={n}>
                            {n} Children
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. VIP Add-ons Selection */}
                <div className="p-6 sm:p-8 rounded-3xl bg-[#121624] border border-white/10 space-y-4 shadow-xl">
                  <h3 className="font-serif text-xl text-white font-medium flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>3. VIP Add-on Experiences</span>
                  </h3>

                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3.5 rounded-2xl bg-black/30 border border-white/5 hover:border-amber-500/30 cursor-pointer text-xs transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
                          <ChefHat className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Private In-Suite Chef</p>
                          <p className="text-[11px] text-slate-400">Live multi-course culinary preparation in your suite kitchen</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-amber-300">+₦45,000/night</span>
                        <input
                          type="checkbox"
                          checked={addChef}
                          onChange={(e) => setAddChef(e.target.checked)}
                          className="accent-amber-400 rounded w-4 h-4"
                        />
                      </div>
                    </label>

                    <label className="flex items-center justify-between p-3.5 rounded-2xl bg-black/30 border border-white/5 hover:border-amber-500/30 cursor-pointer text-xs transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
                          <Car className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-white font-medium">VIP Airport Chauffeur Transfer</p>
                          <p className="text-[11px] text-slate-400">Airport pickup at Victor Attah Airport in Mercedes/Range Rover</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-amber-300">+₦35,000</span>
                        <input
                          type="checkbox"
                          checked={addChauffeur}
                          onChange={(e) => setAddChauffeur(e.target.checked)}
                          className="accent-amber-400 rounded w-4 h-4"
                        />
                      </div>
                    </label>

                    <label className="flex items-center justify-between p-3.5 rounded-2xl bg-black/30 border border-white/5 hover:border-amber-500/30 cursor-pointer text-xs transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
                          <Wine className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Arrival Chilled Champagne & Strawberries</p>
                          <p className="text-[11px] text-slate-400">Pre-stocked in your suite refrigerator for your arrival</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-amber-300">+₦25,000</span>
                        <input
                          type="checkbox"
                          checked={addChampagne}
                          onChange={(e) => setAddChampagne(e.target.checked)}
                          className="accent-amber-400 rounded w-4 h-4"
                        />
                      </div>
                    </label>

                    <label className="flex items-center justify-between p-3.5 rounded-2xl bg-black/30 border border-white/5 hover:border-amber-500/30 cursor-pointer text-xs transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Guaranteed Late Check-Out (4:00 PM)</p>
                          <p className="text-[11px] text-slate-400">Extend your relaxation time on departure day</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-amber-300">+₦20,000</span>
                        <input
                          type="checkbox"
                          checked={lateCheckOut}
                          onChange={(e) => setLateCheckOut(e.target.checked)}
                          className="accent-amber-400 rounded w-4 h-4"
                        />
                      </div>
                    </label>
                  </div>
                </div>

                {/* 4. Guest Details */}
                <div className="p-6 sm:p-8 rounded-3xl bg-[#121624] border border-white/10 space-y-4 shadow-xl">
                  <h3 className="font-serif text-xl text-white font-medium">
                    4. Guest Information & Special Instructions
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        Primary Guest Full Name <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Elena Rostova"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        Email Address <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="elena@example.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Mobile / WhatsApp Phone Number <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 800 000 0000"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Special Requests / Dietary Needs (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Flight arrival number for chauffeur, extra hypoallergenic pillows, late arrival at 11pm..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 focus:border-amber-400 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Right Sticky Summary Card (5 cols) */}
              <div className="lg:col-span-5">
                <div className="p-6 sm:p-8 rounded-3xl bg-[#121624] border border-amber-500/30 sticky top-28 shadow-2xl shadow-black/80 space-y-6">
                  <div className="border-b border-white/10 pb-4">
                    <LuxuryBadge>Reservation Summary</LuxuryBadge>
                    <h3 className="font-serif text-2xl text-white font-medium mt-2">
                      {selectedRoom.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {nights} {nights === 1 ? "Night" : "Nights"} • {totalGuests} {totalGuests === 1 ? "Guest" : "Guests"}
                    </p>
                  </div>

                  {/* Dates Details */}
                  <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-black/40 border border-white/5 text-xs">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400">
                        Check-In
                      </span>
                      <p className="text-white font-medium mt-0.5">{checkIn}</p>
                      <span className="text-[10px] text-amber-300/80">From 2:00 PM</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400">
                        Check-Out
                      </span>
                      <p className="text-white font-medium mt-0.5">{checkOut}</p>
                      <span className="text-[10px] text-amber-300/80">
                        {lateCheckOut ? "By 4:00 PM (Late)" : "By 12:00 PM"}
                      </span>
                    </div>
                  </div>

                  {/* Price Math Breakdown */}
                  <div className="space-y-2 text-xs border-b border-white/10 pb-4">
                    <div className="flex justify-between text-slate-400">
                      <span>
                        ₦{selectedRoom.pricePerNight.toLocaleString()} × {nights} {nights === 1 ? "night" : "nights"}
                      </span>
                      <span className="text-white">₦{basePrice.toLocaleString()}</span>
                    </div>

                    {addChef && (
                      <div className="flex justify-between text-slate-400">
                        <span>Private Chef ({nights} nights)</span>
                        <span className="text-white">₦{chefCost.toLocaleString()}</span>
                      </div>
                    )}

                    {addChauffeur && (
                      <div className="flex justify-between text-slate-400">
                        <span>VIP Airport Chauffeur</span>
                        <span className="text-white">₦{chauffeurCost.toLocaleString()}</span>
                      </div>
                    )}

                    {addChampagne && (
                      <div className="flex justify-between text-slate-400">
                        <span>Chilled Arrival Champagne</span>
                        <span className="text-white">₦{champagneCost.toLocaleString()}</span>
                      </div>
                    )}

                    {lateCheckOut && (
                      <div className="flex justify-between text-slate-400">
                        <span>Late Check-Out Extension</span>
                        <span className="text-white">₦{lateCheckOutCost.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="border-t border-white/10 pt-3 mt-2 flex justify-between text-base font-semibold">
                      <span className="text-white">Estimated Grand Total</span>
                      <span className="text-amber-300">₦{grandTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl text-xs font-semibold uppercase tracking-[0.2em] text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Validating Reservation...</span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Confirm & Reserve Suite</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-400">
                    🔒 No upfront charges • Autonomous Contactless Check-In
                  </p>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0b0d13] flex items-center justify-center text-amber-400 text-sm">
          Loading Booking Suite...
        </div>
      }
    >
      <BookingSuiteContent />
    </Suspense>
  );
}
