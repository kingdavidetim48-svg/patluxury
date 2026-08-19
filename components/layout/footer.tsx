import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  ShieldCheck,
  Zap,
  Award,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#07090d] text-slate-400 border-t border-amber-500/15 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Feature Bar */}
      <div className="border-b border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-medium text-sm tracking-wide">
                  100% Guaranteed 24/7 Power
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Multi-redundant clean solar & generator backbone
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-medium text-sm tracking-wide">
                  Guarded & Biometric Access
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  CCTV monitored perimeter with keyless entry
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-medium text-sm tracking-wide">
                  Five-Star Bespoke Hospitality
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Private chefs, chauffeur, and 24/7 concierge
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-light tracking-[0.25em] text-white">
                PAT LUXURY
              </span>
              <span className="block text-[9px] uppercase tracking-[0.35em] text-amber-300 font-medium mt-0.5">
                Luxury Suites & Residences
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Curated short-let penthouses and luxury suites designed for
              discerning travelers, executives, and families seeking undisturbed
              privacy, exquisite comfort, and elite hospitality.
            </p>

            <div className="pt-2">
              <p className="text-xs uppercase tracking-widest text-slate-300 font-medium mb-3">
                Follow The Pat Luxury Experience
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-amber-400/20 border border-white/10 hover:border-amber-400/40 flex items-center justify-center text-slate-300 hover:text-amber-300 transition-all"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-amber-400/20 border border-white/10 hover:border-amber-400/40 flex items-center justify-center text-slate-300 hover:text-amber-300 transition-all"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-amber-400/20 border border-white/10 hover:border-amber-400/40 flex items-center justify-center text-slate-300 hover:text-amber-300 transition-all"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Discover
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/rooms"
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>All Suites & Rooms</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/rooms/presidential-penthouse"
                  className="hover:text-amber-300 transition-colors"
                >
                  Presidential Penthouse
                </Link>
              </li>
              <li>
                <Link
                  href="/rooms/posh-pavilion-suite"
                  className="hover:text-amber-300 transition-colors"
                >
                  Posh Pavilion (2-Bed)
                </Link>
              </li>
              <li>
                <Link
                  href="/rooms/aurora-penthouse"
                  className="hover:text-amber-300 transition-colors"
                >
                  Aurora Sky Penthouse
                </Link>
              </li>
              <li>
                <Link
                  href="/rooms/lavender-luxury-suite"
                  className="hover:text-amber-300 transition-colors"
                >
                  Lavender Sanctuary
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-amber-300 transition-colors"
                >
                  Visual Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Hospitality & Experiences */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Hospitality
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/services"
                  className="hover:text-amber-300 transition-colors"
                >
                  Private In-Suite Chef
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-amber-300 transition-colors"
                >
                  VIP Chauffeur & Transfers
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-amber-300 transition-colors"
                >
                  24/7 Lifestyle Concierge
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-amber-300 transition-colors"
                >
                  The Pat Luxury Standard
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-amber-300 transition-colors"
                >
                  Pat Luxury Journal & Insights
                </Link>
              </li>
              <li>
                <Link
                  href="/book"
                  className="text-amber-300 hover:text-amber-200 font-medium transition-colors flex items-center gap-1"
                >
                  <span>Online Reservation</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
              Concierge
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span className="text-slate-300">
                  Plot 18, Prime Residential Boulevard, Diplomatic Zone, Uyo, Akwa Ibom State, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href="tel:+2347030968954"
                  className="text-slate-300 hover:text-amber-300 transition-colors"
                >
                  +234 703 096 8954
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href="mailto:reservations@patluxury.com"
                  className="text-slate-300 hover:text-amber-300 transition-colors"
                >
                  reservations@patluxury.com
                </a>
              </li>
              <li className="pt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>24/7 Reservations Active</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Pat Luxury Suites & Residences. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Residence
            </Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Guest Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
