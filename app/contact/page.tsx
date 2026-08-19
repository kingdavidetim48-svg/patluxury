"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { LuxuryBadge } from "@/components/shared/badge";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

const FAQS = [
  {
    q: "How does check-in and suite access work?",
    a: "We utilize encrypted biometric and smart digital locks. Once your reservation is confirmed, your unique access code and digital check-in guide are sent directly to your email and WhatsApp for contactless arrival at any hour.",
  },
  {
    q: "Is 24/7 electricity guaranteed throughout my stay?",
    a: "Yes. Pat Luxury operates an industrial-grade multi-redundant power infrastructure combining hybrid solar arrays, high-capacity inverters, and automated soundproof generators ensuring 100% uninterrupted power.",
  },
  {
    q: "Can I book a private chef or airport chauffeur?",
    a: "Absolutely. You can request our Michelin-partner private in-suite chefs or VIP Mercedes/Range Rover airport transfers during booking or by messaging our 24/7 concierge anytime.",
  },
  {
    q: "What is the cancellation and refund policy?",
    a: "Reservations cancelled up to 48 hours prior to check-in receive a full refund or complimentary date reschedule. Please contact concierge for corporate group terms.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Suite Enquiry",
    message: "",
    _honey: "", // Bot honeypot trap
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Bot detection via honeypot
    if (formData._honey) {
      // Silently finish for bots
      setIsSubmitting(false);
      setIsSubmitted(true);
      return;
    }

    // Input sanitization & checks
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.message.trim()
    ) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);

    // Simulate clean client-side submission & preparation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0b0d13] pb-24">
      {/* Header */}
      <PageHeader
        badgeText="24/7 VIP Concierge & Enquiries"
        title="Connect with Pat Luxury Concierge"
        subtitle="Our dedicated hospitality team is available around the clock to assist with bespoke reservations, corporate bookings, and special requests."
        backgroundImage="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=85"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info & WhatsApp Card (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Quick Contact Information Card */}
            <div className="p-8 rounded-3xl bg-[#121624] border border-amber-500/25 shadow-2xl space-y-6">
              <div>
                <LuxuryBadge>Immediate Contact</LuxuryBadge>
                <h2 className="font-serif text-2xl text-white font-light mt-3">
                  Residence Address & Lines
                </h2>
              </div>

              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-semibold tracking-wider text-slate-400">
                      Address
                    </p>
                    <p className="text-white font-medium">
                      Plot 18, Prime Residential Boulevard, Diplomatic Zone, Uyo,
                      Akwa Ibom State, Nigeria
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-semibold tracking-wider text-slate-400">
                      24/7 Hotline
                    </p>
                    <a
                      href="tel:+2347030968954"
                      className="text-white font-medium hover:text-amber-300 transition-colors"
                    >
                      +234 703 096 8954
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-semibold tracking-wider text-slate-400">
                      Direct Email
                    </p>
                    <a
                      href="mailto:reservations@patluxury.com"
                      className="text-white font-medium hover:text-amber-300 transition-colors"
                    >
                      reservations@patluxury.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-semibold tracking-wider text-slate-400">
                      Operating Hours
                    </p>
                    <p className="text-emerald-400 font-medium">
                      Concierge Desk: Open 24 Hours / 7 Days
                    </p>
                  </div>
                </li>
              </ul>

              {/* Instant WhatsApp Connect Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-transparent border border-emerald-500/30 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Instant Concierge Chat</span>
                </div>
                <p className="text-xs text-slate-300">
                  Prefer instant messaging? Connect directly with our on-duty front
                  desk manager on WhatsApp.
                </p>
                <a
                  href="https://wa.me/2347030968954?text=Hello%20Pat%20Luxury%20Concierge!%20I'd%20like%20to%20make%20an%20enquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open WhatsApp Direct</span>
                </a>
              </div>
            </div>

            {/* Interactive FAQs Accordion */}
            <div className="p-6 rounded-3xl bg-[#121624] border border-white/10 space-y-4">
              <h3 className="font-serif text-xl text-white font-light flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <span>Frequently Asked Questions</span>
              </h3>

              <div className="space-y-2">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl bg-black/40 border border-white/5 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-3.5 text-left text-xs font-medium text-white flex items-center justify-between gap-2 hover:text-amber-300 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-amber-400 transition-transform ${
                          openFaq === idx ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="p-3.5 pt-0 text-xs text-slate-400 leading-relaxed font-light border-t border-white/5">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#121624] border border-amber-500/25 shadow-2xl">
              <div className="space-y-2 mb-8">
                <LuxuryBadge>Enquiry Form</LuxuryBadge>
                <h2 className="font-serif text-2xl sm:text-3xl text-white font-light">
                  Send an Enquiry or Booking Request
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 font-light">
                  Complete the form below and our guest relations concierge will
                  respond within 15 minutes.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 animate-in fade-in zoom-in-95">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl text-white font-medium">
                    Thank You, {formData.name || "Distinguished Guest"}
                  </h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Your enquiry has been securely received by our executive
                    concierge. A guest officer will review your dates and reach out
                    to you shortly via email and WhatsApp.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <a
                      href={`https://wa.me/2347030968954?text=${encodeURIComponent(
                        `Hello Pat Luxury Concierge! I just sent an enquiry:\nName: ${formData.name}\nSubject: ${formData.subject}\nMessage: ${formData.message}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 transition-colors flex items-center gap-2"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Speed Up on WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          subject: "Suite Enquiry",
                          message: "",
                          _honey: "",
                        });
                      }}
                      className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Honeypot Bot Trap (Invisible to humans) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="company_website_trap">Leave this blank</label>
                    <input
                      id="company_website_trap"
                      type="text"
                      name="website_url"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData._honey}
                      onChange={(e) =>
                        setFormData({ ...formData, _honey: e.target.value })
                      }
                    />
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        Full Name <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={100}
                        placeholder="e.g. Dr. Charles Bassey"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full bg-black/40 border border-white/10 focus:border-amber-400 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        Email Address <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        maxLength={120}
                        placeholder="charles@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full bg-black/40 border border-white/10 focus:border-amber-400 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        Phone Number (WhatsApp Preferred){" "}
                        <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={30}
                        placeholder="+234 800 000 0000"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full bg-black/40 border border-white/10 focus:border-amber-400 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        Enquiry Type
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="w-full bg-black/40 border border-white/10 focus:border-amber-400 rounded-xl px-4 py-3 text-xs text-white focus:outline-none cursor-pointer"
                      >
                        <option value="Suite Reservation">Suite Reservation</option>
                        <option value="Corporate Extended Stay">
                          Corporate Extended Stay
                        </option>
                        <option value="Private In-Suite Chef">
                          Private In-Suite Chef
                        </option>
                        <option value="Airport Transfer Chauffeur">
                          Airport Transfer Chauffeur
                        </option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-medium text-slate-300">
                        Your Message / Preferred Dates & Special Requests{" "}
                        <span className="text-amber-400">*</span>
                      </label>
                      <span className="text-[10px] text-slate-500">
                        {formData.message.length}/1500
                      </span>
                    </div>
                    <textarea
                      required
                      rows={5}
                      maxLength={1500}
                      placeholder="Please let us know your intended check-in dates, number of guests, or any dietary and lifestyle preferences..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full bg-black/40 border border-white/10 focus:border-amber-400 rounded-xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl text-xs font-semibold uppercase tracking-[0.2em] text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Secure Enquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Dispatch VIP Enquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
