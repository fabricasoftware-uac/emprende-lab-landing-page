"use client";

import { useEffect, useState } from "react";

interface ElementProps {
  left: number;
  top: number;
  delay: number;
  duration: number;
}

export default function FloatingElements() {
  const [stars, setStars] = useState<ElementProps[]>([]);
  const [shootingStars, setShootingStars] = useState<ElementProps[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Generate static/twinkling stars (reduced from 50)
    setStars(
      [...Array(25)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 4,
      })),
    );

    // Generate shooting stars (reduced from 6)
    setShootingStars(
      [...Array(2)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 50, // Start higher up
        delay: Math.random() * 15, // Longer delays between them
        duration: 2 + Math.random() * 2,
      })),
    );

    setMounted(true);
  }, []);

  // Server-side fallback pattern
  if (!mounted) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)",
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Desktop: animated particles */}
      <div className="hidden md:block">
        {/* Dense Starfield */}
        {stars.map((star, i) => (
          <div
            key={`star-${i}`}
            className={`absolute rounded-full bg-white ${i % 3 === 0 ? "w-1.5 h-1.5 twinkle" : "w-1 h-1 float opacity-30"} ${i % 5 === 0 ? "bg-blue-100" : ""}`}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          ></div>
        ))}

        {/* Shooting Stars */}
        {shootingStars.map((star, i) => (
          <div
            key={`shooting-star-${i}`}
            className="absolute h-px w-32 bg-linear-to-r from-transparent via-white to-transparent opacity-0 shooting-star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_2px_white]"></div>
          </div>
        ))}

        {/* Orbs (reduced from 4 to 2) */}
        <div className="absolute -top-[10%] -left-[10%] w-[40rem] h-[40rem] rounded-full blur-[100px] pointer-events-none opacity-10 bg-purple-600 float-slow mix-blend-screen" style={{ animationDelay: "0s", animationDuration: "10s" }}></div>
        <div className="absolute -right-[5%] top-[50%] w-[30rem] h-[30rem] rounded-full blur-[100px] pointer-events-none opacity-[0.08] bg-blue-600 float-slow mix-blend-screen" style={{ animationDelay: "1.5s", animationDuration: "12s" }}></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .5) 25%, rgba(255, 255, 255, .5) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .5) 75%, rgba(255, 255, 255, .5) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .5) 25%, rgba(255, 255, 255, .5) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .5) 75%, rgba(255, 255, 255, .5) 76%, transparent 77%, transparent)",
              backgroundSize: "100px 100px",
            }}
          ></div>
        </div>
      </div>

      {/* Mobile: static gradient only — zero animations */}
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
