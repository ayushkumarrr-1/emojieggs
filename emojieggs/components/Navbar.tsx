"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

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
          <a href="#home" className="font-semibold text-sm transition-colors hover:text-yellow-500" style={{ color: "#1A1A2E" }}>{t.nav.home}</a>
          <a href="#how-it-works" className="font-semibold text-sm transition-colors hover:text-yellow-500" style={{ color: "#1A1A2E" }}>{t.nav.howItWorks}</a>
          <a href="#occasions" className="font-semibold text-sm transition-colors hover:text-yellow-500" style={{ color: "#1A1A2E" }}>{t.nav.occasions}</a>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <div className="flex bg-gray-100 rounded-full p-1 border border-gray-200">
            <button
              onClick={() => setLanguage("en")}
              className={`text-xs font-bold px-3 py-1 rounded-full transition-all ${language === "en" ? "bg-white shadow-sm text-yellow-600" : "text-gray-500 hover:text-gray-800"}`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("hi")}
              className={`text-xs font-bold px-3 py-1 rounded-full transition-all ${language === "hi" ? "bg-white shadow-sm text-yellow-600" : "text-gray-500 hover:text-gray-800"}`}
            >
              हिंदी
            </button>
          </div>
          
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
            {t.nav.orderNow}
          </a>
        </div>
      </div>
    </nav>
  );
}

