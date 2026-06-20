"use client";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function HowItWorks() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    refs.current.forEach((r) => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-24 bg-white" id="how-it-works">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="badge" style={{ background: "#FFF0C8", color: "#CC8800" }}>{t.howItWorks.badge}</span>
          <h2 className="font-display mt-3" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#1A1A2E" }}>
            {t.howItWorks.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {t.howItWorks.steps.map((s, i) => (
            <div
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              className="reveal text-center p-8 rounded-3xl relative"
              style={{
                background: i % 2 === 0 ? "#FFF8E7" : "white",
                border: "2px solid #FFF0C8",
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              {/* Step number */}
              <div
                className="font-display absolute -top-4 -right-2 w-9 h-9 rounded-full flex items-center justify-center text-sm text-white"
                style={{ background: "#FFB800" }}
              >
                {i + 1}
              </div>
              <div className="text-5xl mb-4">{s.icon}</div>
              <h3 className="font-display text-xl mb-2" style={{ color: "#1A1A2E" }}>{s.title}</h3>
              <p className="text-sm font-semibold leading-relaxed" style={{ color: "#666" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

