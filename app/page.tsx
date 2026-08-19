import React from "react";
import { Hero } from "@/components/home/hero";
import { ValueProposition } from "@/components/home/value-proposition";
import { FeaturedRooms } from "@/components/home/featured-rooms";
import { ExperienceBanner } from "@/components/home/experience-banner";
import { AmenitiesGrid } from "@/components/home/amenities-grid";
import { ServicesPreview } from "@/components/home/services-preview";
import { StatsSection } from "@/components/home/stats-section";
import { Testimonials } from "@/components/home/testimonials";
import { GalleryTeaser } from "@/components/home/gallery-teaser";
import { CtaBanner } from "@/components/home/cta-banner";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Cinematic Hero with Search Bar */}
      <Hero />

      {/* 2. Value Proposition (The Pat Luxury Standard) */}
      <ValueProposition />

      {/* 3. Featured Suites & Residences */}
      <FeaturedRooms />

      {/* 4. Luxury Experience & Story Banner */}
      <ExperienceBanner />

      {/* 5. Amenities & Facilities Grid */}
      <AmenitiesGrid />

      {/* 6. VIP Services Preview */}
      <ServicesPreview />

      {/* 7. Property Stats & Milestones */}
      <StatsSection />

      {/* 8. Guest Testimonials */}
      <Testimonials />

      {/* 9. Visual Gallery Preview */}
      <GalleryTeaser />

      {/* 10. High-Converting CTA Banner */}
      <CtaBanner />
    </div>
  );
}
