import React from "react";
import Image from "next/image";
import { LuxuryBadge } from "./badge";

interface PageHeaderProps {
  badgeText?: string;
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  badgeText,
  title,
  subtitle,
  backgroundImage = "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=85",
  children,
}: PageHeaderProps) {
  return (
    <div className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#0b0d13] border-b border-amber-500/15">
      {/* Background Image with Dark Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-25 scale-105 transform animate-pulse-subtle"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d13] via-[#0b0d13]/85 to-[#0b0d13]/60" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0b0d13]/60 to-[#0b0d13]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {badgeText && (
          <div className="mb-4">
            <LuxuryBadge>{badgeText}</LuxuryBadge>
          </div>
        )}

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-wide text-white max-w-4xl mx-auto leading-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            {subtitle}
          </p>
        )}

        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  );
}
