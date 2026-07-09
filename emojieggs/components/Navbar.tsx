"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const h = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled || menuOpen ? "rgba(255,248,231,0.95)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
        padding: scrolled ? "12px 16px" : "20px 16px",
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div>
            <span className="font-display text-xl inline-flex items-center" style={{ color: "#1A1A2E" }}>
              FaciEggs
              <div className="egg-wrapper ml-[4px]" style={{ width: 18, height: 24 }}>
                <div className="egg-3d" style={{ width: '100%', height: '100%' }} />
                <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-48%)", fontSize: "0.65rem", pointerEvents: "none", zIndex: 2 }}>😊</span>
              </div>
            </span>
            <span className="block text-xs font-semibold" style={{ color: "#FFB800", marginTop: -3 }}>We Value Your Happiness</span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#home" className="font-semibold text-sm transition-colors hover:text-yellow-500" style={{ color: "#1A1A2E" }}>{t.nav.home}</a>
          <a href="#how-it-works" className="font-semibold text-sm transition-colors hover:text-yellow-500" style={{ color: "#1A1A2E" }}>{t.nav.howItWorks}</a>
          <a href="#occasions" className="font-semibold text-sm transition-colors hover:text-yellow-500" style={{ color: "#1A1A2E" }}>{t.nav.occasions}</a>
          <a href="#smile-fund" className="font-semibold text-sm transition-colors hover:text-yellow-500" style={{ color: "#1A1A2E" }}>Smile Fund</a>
        </div>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-3">
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

        {/* Mobile: language toggle + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <div className="flex bg-gray-100 rounded-full p-1 border border-gray-200">
            <button
              onClick={() => setLanguage("en")}
              className={`text-xs font-bold px-2 py-0.5 rounded-full transition-all ${language === "en" ? "bg-white shadow-sm text-yellow-600" : "text-gray-500"}`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("hi")}
              className={`text-xs font-bold px-2 py-0.5 rounded-full transition-all ${language === "hi" ? "bg-white shadow-sm text-yellow-600" : "text-gray-500"}`}
            >
              हिंदी
            </button>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[2.5px] rounded-full bg-gray-800 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7.5px]" : ""}`} />
            <span className={`block w-5 h-[2.5px] rounded-full bg-gray-800 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[2.5px] rounded-full bg-gray-800 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7.5px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-80 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"}`}
      >
        <div className="flex flex-col gap-3 pb-4 px-2">
          <a href="#home" onClick={() => setMenuOpen(false)} className="font-semibold text-sm py-2 px-3 rounded-xl transition-colors hover:bg-yellow-50" style={{ color: "#1A1A2E" }}>{t.nav.home}</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="font-semibold text-sm py-2 px-3 rounded-xl transition-colors hover:bg-yellow-50" style={{ color: "#1A1A2E" }}>{t.nav.howItWorks}</a>
          <a href="#occasions" onClick={() => setMenuOpen(false)} className="font-semibold text-sm py-2 px-3 rounded-xl transition-colors hover:bg-yellow-50" style={{ color: "#1A1A2E" }}>{t.nav.occasions}</a>
          <a href="#smile-fund" onClick={() => setMenuOpen(false)} className="font-semibold text-sm py-2 px-3 rounded-xl transition-colors hover:bg-yellow-50" style={{ color: "#1A1A2E" }}>Smile Fund</a>
          <div className="flex gap-3 mt-1">
            <Link
              href="/mood-predictor"
              onClick={() => setMenuOpen(false)}
              className="font-semibold text-sm px-4 py-2.5 rounded-full transition-all hover:scale-105 text-center flex-1"
              style={{
                background: "linear-gradient(135deg, #E879F9, #A855F7)",
                color: "white",
              }}
            >
              🔮 Mood Game
            </Link>
            <a
              href="#order"
              onClick={() => setMenuOpen(false)}
              className="font-display text-sm px-4 py-2.5 rounded-full text-white transition-transform hover:scale-105 text-center flex-1"
              style={{ background: "linear-gradient(135deg, #FFB800, #FF6B6B)" }}
            >
              {t.nav.orderNow}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
