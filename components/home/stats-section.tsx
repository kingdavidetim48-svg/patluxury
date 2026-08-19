import React from "react";
import { Zap, Wifi, Star, Award, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const STATS = [
  {
    icon: Zap,
    value: "100%",
    label: "24/7 Power Uptime",
    description: "Multi-redundant clean hybrid solar, inverters & silent generators in Uyo",
  },
  {
    icon: Wifi,
    value: "500+",
    suffix: "Mbps",
    label: "Dedicated Fiber Wi-Fi",
    description: "Enterprise gigabit mesh connectivity across all suites",
  },
  {
    icon: Star,
    value: "4.98",
    suffix: "/5",
    label: "Guest Satisfaction",
    description: "Verified reviews from business executives and international travelers",
  },
  {
    icon: Award,
    value: "240+",
    label: "VIP Stays Completed",
    description: "Trusted by corporate leaders, diplomats, and discerning families",
  },
];

export function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#0e111a] via-[#121624] to-[#0e111a] border-y border-amber-500/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <ScrollReveal
                key={idx}
                animation="fade-up"
                delay={idx * 100}
              >
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center relative overflow-hidden group hover:border-amber-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/60 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="font-serif text-3xl sm:text-4xl font-light text-white mb-1 tracking-tight">
                      <span>{stat.value}</span>
                      {stat.suffix && (
                        <span className="text-amber-400 text-2xl font-sans ml-0.5">
                          {stat.suffix}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xs uppercase tracking-[0.15em] font-semibold text-amber-300/90 mb-2">
                      {stat.label}
                    </h3>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed font-light mt-2">
                    {stat.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
