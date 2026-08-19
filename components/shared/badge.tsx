import React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LuxuryBadgeProps {
  children: React.ReactNode;
  icon?: boolean;
  className?: string;
  variant?: "gold" | "subtle" | "dark";
}

export function LuxuryBadge({
  children,
  icon = true,
  className,
  variant = "gold",
}: LuxuryBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300",
        variant === "gold" &&
          "bg-gradient-to-r from-amber-500/15 via-amber-400/20 to-amber-500/15 border border-amber-500/30 text-amber-300 shadow-sm shadow-amber-500/10",
        variant === "subtle" &&
          "bg-white/5 border border-white/10 text-slate-300",
        variant === "dark" &&
          "bg-black/60 border border-amber-500/20 text-amber-400 backdrop-blur-md",
        className
      )}
    >
      {icon && <Sparkles className="w-3 h-3 text-amber-400" />}
      <span>{children}</span>
    </div>
  );
}
