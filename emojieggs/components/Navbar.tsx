"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,248,231,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
        padding: scrolled ? "12px 24px" : "20px 24px",
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="egg-wrapper" style={{ display: "inline-block" }}>
            <div className="egg-3d" style={{ width: 36, height: 46 }} />
            <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-48%)", fontSize: "1.1rem", pointerEvents: "none", zIndex: 2 }}>😊</span>
          </div>
          <div>
            <span className="font-display text-xl" style={{ color: "#1A1A2E" }}>EmojiEggs</span>
            <span className="block text-xs font-semibold" style={{ color: "#FFB800", marginTop: -3 }}>We Value Your Happiness</span>
          </div>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6">
          {["Home", "How It Works", "Occasions", "Order"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/ /g, "-")}`}
              className="font-semibold text-sm transition-colors hover:text-yellow-500"
              style={{ color: "#1A1A2E" }}
            >
              {l}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/mood-predictor"
            className="font-semibold text-sm px-4 py-1.5 rounded-full transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #E879F9, #A855F7)",
              color: "white",
            }}
          >
            🔮 Mood Game
          </Link>
          <a
            href="#order"
            className="font-display text-sm px-5 py-2 rounded-full text-white transition-transform hover:scale-105"
            style={{ background: "linear-gradient(135deg, #FFB800, #FF6B6B)" }}
          >
            Order Now 🥚
          </a>
        </div>
    </nav>
  );
}
