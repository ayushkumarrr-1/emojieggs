"use client";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function SmileFund() {
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
    <section className="py-16 md:py-24 bg-[#FFFAFA]" id="smile-fund">
      <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
        <span className="badge" style={{ background: "#E6F7FF", color: "#007BFF" }}>{t.smileFund.badge}</span>
        <h2 className="font-display mt-4 mb-8" style={{ fontSize: "clamp(2rem,4vw,2.5rem)", color: "#1A1A2E" }}>
          {t.smileFund.title}
        </h2>

        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-lg md:text-xl font-medium text-gray-700 leading-relaxed mb-4">
            {t.smileFund.desc1}<strong style={{ color: "#FFB800" }}>{t.smileFund.descHighlight}</strong>{t.smileFund.desc2}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Card 1 */}
          <div
            ref={(el) => { refs.current[0] = el; }}
            className="reveal p-8 rounded-3xl bg-white flex flex-col items-center justify-center text-center shadow-md relative overflow-hidden"
            style={{
              border: "2px dashed #90CDF4",
              transitionDelay: "0s",
            }}
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-blue-400"></div>
            <div className="text-5xl mb-4 transition-transform hover:scale-110 duration-300">💊</div>
            <h3 className="font-display text-xl mb-3 text-gray-800">{t.smileFund.medTitle}</h3>
            <p className="text-base font-medium text-gray-600 leading-relaxed">
              {t.smileFund.medDesc}
            </p>
          </div>

          {/* Card 2 */}
          <div
            ref={(el) => { refs.current[1] = el; }}
            className="reveal p-8 rounded-3xl bg-white flex flex-col items-center justify-center text-center shadow-md relative overflow-hidden"
            style={{
              border: "2px dashed #F6E05E",
              transitionDelay: "0.15s",
            }}
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400"></div>
            <div className="text-5xl mb-4 transition-transform hover:scale-110 duration-300">📚</div>
            <h3 className="font-display text-xl mb-3 text-gray-800">{t.smileFund.studyTitle}</h3>
            <p className="text-base font-medium text-gray-600 leading-relaxed">
              {t.smileFund.studyDesc}
            </p>
          </div>
        </div>

        <div 
          ref={(el) => { refs.current[2] = el; }} 
          className="reveal bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-3xl mx-auto max-w-3xl shadow-lg relative overflow-hidden"
          style={{ border: "2px solid #68D391", transitionDelay: "0.3s" }}
        >
          <p className="font-display text-2xl md:text-3xl mb-4 text-gray-800 leading-tight">
            {t.smileFund.quote}
          </p>
          <div className="mt-6 text-4xl animate-bounce">🇮🇳 😊</div>
        </div>
      </div>
    </section>
  );
}
