import React from "react";
import Link from "next/link";
import { Compass, ArrowRight, Home } from "lucide-react";
import { LuxuryBadge } from "@/components/shared/badge";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0b0d13] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-32 text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto space-y-6">
        <LuxuryBadge>Page Not Found</LuxuryBadge>

        <h1 className="font-serif text-6xl sm:text-8xl font-light text-amber-400 tracking-tight">
          404 
        </h1>

        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-white">
          A Sanctuary Yet to be Discovered
        </h2>

        <p className="text-sm text-slate-300 font-light leading-relaxed">
          The residence or page you are seeking is unavailable or has moved to an exclusive new location. Let us guide you back to our curated collection.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/rooms"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-white hover:text-amber-300 bg-white/5 hover:bg-white/10 border border-white/15 flex items-center justify-center gap-2 transition-colors"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Explore All Suites</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
