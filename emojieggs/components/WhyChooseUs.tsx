"use client";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function WhyChooseUs() {
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
    <section className="py-24 bg-[#FFF8E7]" id="why-choose-us">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <span className="badge" style={{ background: "#FFD1DC", color: "#B3003B" }}>{t.whyChooseUs.badge}</span>
        <h2 className="font-display mt-4 mb-12" style={{ fontSize: "clamp(2rem,4vw,2.5rem)", color: "#1A1A2E" }}>
          {t.whyChooseUs.title}
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {t.whyChooseUs.cards.map((card: any, i: number) => (
            <div
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              className="reveal p-6 rounded-3xl bg-white flex flex-col items-center justify-center text-center shadow-sm"
              style={{
                border: "2px dashed #FFD1DC",
                transitionDelay: `${i * 0.15}s`,
              }}
            >
              <div className="text-5xl mb-4 grayscale opacity-80 transition-all hover:grayscale-0 hover:opacity-100 duration-300">{card.icon}</div>
              <h3 className="font-display text-lg mb-2 text-gray-800">{card.title}</h3>
              <p className="text-sm font-medium text-gray-500 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        <div 
          ref={(el) => { refs.current[3] = el; }} 
          className="reveal bg-white p-8 rounded-3xl mx-auto max-w-3xl shadow-lg relative overflow-hidden"
          style={{ border: "2px solid #FFB800", transitionDelay: "0.5s" }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400"></div>
          <p className="font-display text-2xl md:text-3xl mb-4 text-gray-800 leading-tight">
            "{t.whyChooseUs.highlight}"
          </p>
          <p className="text-gray-600 font-medium">
            {t.whyChooseUs.subtext}
          </p>
          <div className="mt-6 text-4xl animate-bounce">🥚💖</div>
        </div>
      </div>
    </section>
  );
}
