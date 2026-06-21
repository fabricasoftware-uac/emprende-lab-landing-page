"use client";

import { useEffect, useState } from "react";

export default function FloatingElements() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR fallback: lightweight static background
  if (!mounted) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, rgba(120,50,255,0.15), transparent 70%)",
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Ambient glow — no animation, just static gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] opacity-[0.06] bg-linear-to-b from-purple-500 to-transparent blur-[120px]" />

      {/* Desktop-only animated stars */}
      <div className="hidden md:block" aria-hidden="true">
        {/* Starfield — reduced count, will-change */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`star-${i}`}
            className={`absolute rounded-full ${i % 3 === 0 ? "w-1.5 h-1.5 twinkle" : "w-1 h-1 float opacity-30"} ${i % 5 === 0 ? "bg-blue-100" : "bg-white/80"}`}
            style={{
              left: `${(i * 17 + 3) % 100}%`,
              top: `${(i * 23 + 7) % 100}%`,
              animationDelay: `${(i * 0.7) % 5}s`,
              animationDuration: `${2 + (i % 4)}s`,
              willChange: "transform, opacity",
            }}
          />
        ))}

        {/* Shooting stars — reduced to 2 */}
        {[
          { left: 20, top: 10, delay: 4, duration: 3 },
          { left: 60, top: 5, delay: 11, duration: 2.5 },
        ].map((star, i) => (
          <div
            key={`shooting-${i}`}
            className="absolute h-px w-24 bg-linear-to-r from-transparent via-white to-transparent opacity-0 shooting-star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              willChange: "transform, opacity",
            }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_2px_white]" />
          </div>
        ))}

        {/* Orbs — reduced to 2, static class names */}
        <div className="absolute -top-[10%] -left-[10%] w-[40rem] h-[40rem] rounded-full blur-[120px] opacity-[0.08] bg-purple-600 mix-blend-screen float-slow" />
        <div className="absolute top-[50%] -right-[5%] w-[30rem] h-[30rem] rounded-full blur-[100px] opacity-[0.06] bg-blue-600 mix-blend-screen float-slow" />
      </div>

      {/* Mobile: static gradient only — zero animation */}
      <div className="md:hidden absolute inset-0 opacity-[0.04]">
        <div
          className="w-full h-full"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(120,50,255,0.3), transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(59,130,246,0.15), transparent 50%)",
          }}
        />
      </div>
    </div>
  );
}
