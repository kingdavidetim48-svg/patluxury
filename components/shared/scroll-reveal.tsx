"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: "fade-up" | "fade-in" | "scale-up" | "slide-left" | "slide-right";
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

export function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  threshold = 0.15,
  className,
  once = true,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once]);

  // Initial hidden vs visible transformation styles
  const getAnimationStyles = (): React.CSSProperties => {
    const baseTransition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter ${duration}ms ease ${delay}ms`;

    if (!isVisible) {
      switch (animation) {
        case "fade-up":
          return {
            opacity: 0,
            transform: "translateY(36px)",
            filter: "blur(4px)",
            transition: baseTransition,
          };
        case "fade-in":
          return {
            opacity: 0,
            filter: "blur(6px)",
            transition: baseTransition,
          };
        case "scale-up":
          return {
            opacity: 0,
            transform: "scale(0.94)",
            filter: "blur(4px)",
            transition: baseTransition,
          };
        case "slide-left":
          return {
            opacity: 0,
            transform: "translateX(40px)",
            filter: "blur(4px)",
            transition: baseTransition,
          };
        case "slide-right":
          return {
            opacity: 0,
            transform: "translateX(-40px)",
            filter: "blur(4px)",
            transition: baseTransition,
          };
        default:
          return {
            opacity: 0,
            transform: "translateY(36px)",
            transition: baseTransition,
          };
      }
    }

    return {
      opacity: 1,
      transform: "translateY(0) translateX(0) scale(1)",
      filter: "blur(0px)",
      transition: baseTransition,
    };
  };

  return (
    <div
      ref={ref}
      style={getAnimationStyles()}
      className={cn("will-change-transform", className)}
    >
      {children}
    </div>
  );
}
