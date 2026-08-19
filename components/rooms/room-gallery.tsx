"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Maximize2, X, ChevronLeft, ChevronRight, Camera } from "lucide-react";

interface RoomGalleryProps {
  images: string[];
  roomName: string;
}

export function RoomGallery({ images, roomName }: RoomGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowRight")
        setActiveImageIndex((prev) => (prev + 1) % images.length);
      if (e.key === "ArrowLeft")
        setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, images.length]);

  return (
    <div className="space-y-4">
      {/* Main Large Display Image */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-3xl overflow-hidden bg-black/60 border border-amber-500/20 shadow-2xl group">
        <Image
          src={images[activeImageIndex] || images[0]}
          alt={`${roomName} - View ${activeImageIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 70vw"
          className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Fullscreen Trigger Button */}
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg hover:scale-105"
        >
          <Camera className="w-3.5 h-3.5 text-amber-400" />
          <span>View All Photos ({images.length})</span>
        </button>

        {/* Image index badge */}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-amber-300 text-xs font-medium">
          {activeImageIndex + 1} / {images.length}
        </span>
      </div>

      {/* Thumbnails Navigation Strip */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveImageIndex(idx)}
            className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
              activeImageIndex === idx
                ? "border-amber-400 scale-105 shadow-md shadow-amber-400/20"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={img}
              alt={`${roomName} thumbnail ${idx + 1}`}
              fill
              sizes="120px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-300">
          {/* Top Bar */}
          <div className="flex items-center justify-between z-10 text-white">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-medium">
                {roomName}
              </h3>
              <p className="text-xs text-amber-300">
                Photo {activeImageIndex + 1} of {images.length}
              </p>
            </div>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close fullscreen lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Central Active Image with Arrows */}
          <div className="relative flex-grow flex items-center justify-center my-4 max-h-[75vh]">
            <button
              type="button"
              onClick={() =>
                setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length)
              }
              className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white hover:text-amber-300 transition-all hover:scale-110"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative w-full h-full max-w-5xl aspect-[16/10] max-h-[70vh]">
              <Image
                src={images[activeImageIndex]}
                alt={`${roomName} fullscreen view ${activeImageIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <button
              type="button"
              onClick={() =>
                setActiveImageIndex((prev) => (prev + 1) % images.length)
              }
              className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white hover:text-amber-300 transition-all hover:scale-110"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnails */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                  activeImageIndex === idx
                    ? "border-amber-400 scale-105"
                    : "border-transparent opacity-40 hover:opacity-80"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
