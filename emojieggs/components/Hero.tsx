"use client";
import { useEffect, useRef } from "react";
import { EggWithFace } from "./FaceEmoji";
import { useLanguage } from "@/context/LanguageContext";

const floatingFaces = [
  { faceId: "laugh", size: 90, left: "8%", top: "20%", delay: "0s" },
  { faceId: "love",  size: 70, left: "82%", top: "15%", delay: "0.8s" },
  { faceId: "cool",  size: 80, left: "70%", top: "60%", delay: "1.5s" },
  { faceId: "sad",   size: 65, left: "15%", top: "65%", delay: "0.4s" },
  { faceId: "wink",  size: 75, left: "50%", top: "75%", delay: "1.1s" },
];

const orbitFaces = ["laugh","love","cool","wink","sad"];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="hero-bg min-h-screen relative overflow-hidden flex items-center" id="home">
      {/* Floating decorative eggs */}
      {floatingFaces.map((e, i) => (
        <div
          key={i}
          className="absolute hidden md:block"
          style={{ left: e.left, top: e.top, animation: `float 4s ease-in-out ${e.delay} infinite`, opacity: 0.4 }}
        >
          <EggWithFace faceId={e.faceId} eggWidth={e.size} eggHeight={e.size * 1.25} />
        </div>
      ))}

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-20 md:py-32 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center text-center md:text-left mt-8 md:mt-0">
        {/* Text */}
        <div ref={ref} className="reveal">
          <span className="badge font-bold text-lg animate-bounce" style={{ background: "#FF3333", color: "#FFFFFF", marginBottom: 16, display: "inline-block", padding: "8px 24px", boxShadow: "0 8px 25px rgba(255,51,51,0.5)", border: "2px solid white", textTransform: "uppercase", letterSpacing: "1px" }}>
            {t.hero.badge}
          </span>
          <h1 className="font-display leading-tight" style={{ fontSize: "clamp(2.8rem,6vw,4.5rem)", color: "#1A1A2E", marginBottom: 20 }}>
            {t.hero.title1}<br />
            <span style={{ color: "#FFB800" }}>{t.hero.title2}</span>
          </h1>
          <p className="text-lg font-semibold" style={{ color: "#555", maxWidth: 440, lineHeight: 1.7, marginBottom: 32 }}>
            {t.hero.subtitle}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <a
              href="#order"
              className="font-display px-8 py-4 rounded-full text-white text-lg shadow-lg transition-transform hover:scale-105"
              style={{ background: "linear-gradient(135deg, #FFB800, #FF6B6B)", boxShadow: "0 8px 25px rgba(255,184,0,0.4)" }}
            >
              {t.hero.btnPrimary}
            </a>
            <a
              href="#how-it-works"
              className="font-display px-8 py-4 rounded-full text-lg border-2 transition-all hover:bg-yellow-50"
              style={{ borderColor: "#FFB800", color: "#1A1A2E" }}
            >
              {t.hero.btnSecondary}
            </a>
          </div>
          <div className="flex justify-center md:justify-start gap-8 mt-12">
            {[["16+", t.hero.stats.expr], ["8", t.hero.stats.occ], ["⭐ 4.9", t.hero.stats.cust]].map(([val, label]) => (
              <div key={label}>
                <div className="font-display text-2xl" style={{ color: "#FFB800" }}>{val}</div>
                <div className="text-xs font-semibold" style={{ color: "#888" }}>{label}</div>
              </div>
            ))}
          </div>

        </div>

        {/* Hero egg showcase */}
        <div className="flex justify-center">
          <div className="relative" style={{ width: 300, height: 340 }}>
            <div style={{ animation: "float 3.5s ease-in-out infinite", display: "inline-block" }}>
              <EggWithFace faceId="happy" eggWidth={130} eggHeight={162} />
            </div>
            {orbitFaces.map((faceId, i) => {
              const rad = (i * 72 * Math.PI) / 180;
              const r = 130;
              const x = 85 + r * Math.cos(rad);
              const y = 110 + r * Math.sin(rad) * 0.55;
              return (
                <div key={i} className="absolute" style={{ left: x, top: y, animation: `float 4s ease-in-out ${i * 0.6}s infinite` }}>
                  <EggWithFace faceId={faceId} eggWidth={58} eggHeight={72} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block" }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
