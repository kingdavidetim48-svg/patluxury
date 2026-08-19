import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { roomsData } from "@/data/rooms";
import { RoomGallery } from "@/components/rooms/room-gallery";
import { BookingCard } from "@/components/rooms/booking-card";
import { SimilarRooms } from "@/components/rooms/similar-rooms";
import { LuxuryBadge } from "@/components/shared/badge";
import {
  Bed,
  Bath,
  Users,
  Maximize,
  Building,
  Star,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Ban,
  Sparkles,
  Award,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return roomsData.map((room) => ({
    slug: room.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = roomsData.find((r) => r.slug === slug);

  if (!room) {
    return {
      title: "Suite Not Found",
    };
  }

  return {
    title: `${room.name} | Luxury Suites & Penthouses`,
    description: room.description,
    openGraph: {
      title: room.name,
      description: room.description,
      images: [{ url: room.featuredImage }],
    },
  };
}

export default async function RoomDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const room = roomsData.find((r) => r.slug === slug);

  if (!room) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0b0d13] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Suite Title */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3">
            <LuxuryBadge>{room.category}</LuxuryBadge>
            <div className="flex items-center gap-1 text-xs text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-semibold">{room.rating.toFixed(2)}</span>
              <span className="text-slate-400">({room.reviewCount} reviews)</span>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
            {room.name}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light max-w-3xl leading-relaxed">
            {room.tagline}
          </p>
        </div>

        {/* Gallery Section */}
        <div className="mb-12">
          <RoomGallery images={room.galleryImages} roomName={room.name} />
        </div>

        {/* Property Quick Specifications Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 p-6 rounded-2xl bg-[#121624] border border-amber-500/20 mb-12 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400">
              <Bed className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Bedrooms</p>
              <p className="text-xs font-semibold text-white">{room.bedrooms} {room.bedrooms > 1 ? "Beds" : "Bed"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400">
              <Bath className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Bathrooms</p>
              <p className="text-xs font-semibold text-white">{room.bathrooms} Luxury Baths</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Capacity</p>
              <p className="text-xs font-semibold text-white">Up to {room.maxGuests} Guests</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400">
              <Maximize className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Property Size</p>
              <p className="text-xs font-semibold text-white">{room.sizeSqM} m²</p>
            </div>
          </div>

          <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Location</p>
              <p className="text-xs font-semibold text-white">{room.floor}</p>
            </div>
          </div>
        </div>

        {/* Main Content Layout (Left Details, Right Booking Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview / Story */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-light">
                Architectural Overview
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed font-light">
                <p>{room.description}</p>
                {room.longDescription.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Highlights Section */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl text-white font-light flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Suite Highlights</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {room.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-[#121624] border border-white/5 flex items-start gap-3 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Included Amenities Grid */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl text-white font-light">
                Included Luxury Amenities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {room.amenities.map((amenity, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2.5 text-xs text-slate-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* House Rules & Policies */}
            <div className="space-y-4 p-6 rounded-2xl bg-[#121624] border border-white/10">
              <h2 className="font-serif text-xl text-white font-light flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span>House Policies & Residence Guidelines</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300 pt-2 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span><strong>Check-in:</strong> {room.houseRules.checkInTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span><strong>Check-out:</strong> {room.houseRules.checkOutTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ban className="w-4 h-4 text-rose-400" />
                  <span>No Indoor Smoking Permitted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ban className="w-4 h-4 text-rose-400" />
                  <span>No Unregistered Parties / Events</span>
                </div>
              </div>

              {room.houseRules.additionalPolicies.length > 0 && (
                <ul className="space-y-1.5 text-xs text-slate-400 pt-3 border-t border-white/5">
                  {room.houseRules.additionalPolicies.map((pol, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-amber-400">•</span>
                      <span>{pol}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Right Column (4 cols) Sticky Booking Widget */}
          <div className="lg:col-span-4">
            <BookingCard room={room} />
          </div>
        </div>

        {/* Similar Rooms Section */}
        <SimilarRooms currentRoom={room} />
      </div>
    </div>
  );
}
