"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  CalendarCheck,
  ChevronRight,
  Phone,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Suites", href: "/rooms" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Journal", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-[#0b0d13]/95 backdrop-blur-xl border-b border-amber-500/20 shadow-2xl shadow-black/60"
            : "bg-gradient-to-b from-black/90 via-black/50 to-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* 1. Left: Brand Logo */}
            <Link
              href="/"
              className="group flex flex-col items-start justify-center focus:outline-none shrink-0"
              aria-label="Pat Luxury Home"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl sm:text-2xl font-normal tracking-[0.18em] text-white group-hover:text-amber-300 transition-colors duration-300">
                  PAT LUXURY
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              </div>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.32em] text-amber-300/80 font-medium -mt-0.5">
                Suites & Residences
              </span>
            </Link>

            {/* 2. Center: Desktop Navigation Links (All in One Straight Line) */}
            <nav className="hidden lg:flex items-center justify-center space-x-1 xl:space-x-2">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3 py-1.5 text-xs xl:text-[13px] uppercase tracking-[0.14em] font-medium transition-all duration-300 rounded-full relative whitespace-nowrap",
                      isActive
                        ? "text-amber-300 bg-amber-500/10 font-semibold"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* 3. Right: Quick Actions & Reservation CTA (Desktop) */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {/* WhatsApp Quick Icon */}
              <a
                href="https://wa.me/2347030968954?text=Hello%20Pat%20Luxury%20Concierge!%20I'd%20like%20to%20make%20an%20enquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 flex items-center justify-center text-slate-300 hover:text-emerald-400 transition-all"
                title="Chat on WhatsApp"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              {/* Call Hotline Icon */}
              <a
                href="tel:+2347030968954"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-400/40 flex items-center justify-center text-slate-300 hover:text-amber-300 transition-all"
                title="Call 24/7 Front Desk"
                aria-label="Call 24/7 Front Desk"
              >
                <Phone className="w-4 h-4" />
              </a>

              {/* Gold Reservation CTA Button */}
              <Link
                href="/book"
                id="nav-book-now-desktop"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.16em] text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-lg shadow-amber-500/25 transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>Reserve</span>
              </Link>
            </div>

            {/* Mobile Controls (Right on mobile) */}
            <div className="flex lg:hidden items-center gap-2.5">
              <Link
                href="/book"
                id="nav-book-now-mobile"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 transition-all shadow-md shadow-amber-500/20 active:scale-95"
              >
                <CalendarCheck className="w-3 h-3" />
                <span>Book</span>
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white hover:bg-white/20 hover:border-amber-400/30 transition-all active:scale-95"
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#0b0d13]/98 backdrop-blur-2xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col transition-transform duration-300 ease-out",
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-4"
          )}
        >
          {/* Top Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/10">
            <Link
              href="/"
              className="flex flex-col items-start"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl font-normal tracking-[0.18em] text-white">
                  PAT LUXURY
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.3em] text-amber-300/80 font-medium -mt-0.5">
                Suites & Residences
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Links List */}
          <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-1.5">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between py-3.5 px-4 rounded-xl border transition-all duration-200",
                    isActive
                      ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
                      : "border-transparent hover:border-white/10 hover:bg-white/[0.04] text-slate-200 hover:text-white"
                  )}
                >
                  <span className="text-sm font-medium tracking-wide">
                    {link.name}
                  </span>
                  <ChevronRight
                    className={cn(
                      "w-4 h-4 transition-transform",
                      isActive
                        ? "text-amber-400"
                        : "text-slate-500 group-hover:text-amber-400"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="px-6 pb-8 pt-4 space-y-3 border-t border-white/10">
            <Link
              href="/book"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-xl text-xs font-semibold uppercase tracking-[0.15em] text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Reserve Your Suite</span>
            </Link>

            <div className="flex items-center gap-3">
              <a
                href="tel:+2347030968954"
                className="flex-1 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Hotline</span>
              </a>
              <a
                href="https://wa.me/2347030968954?text=Hello%20Pat%20Luxury%20Concierge!%20I'd%20like%20to%20make%20an%20enquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
