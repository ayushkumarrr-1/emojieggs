"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function Testimonials() {
  const { t } = useLanguage();
  return (
    <section className="py-16 md:py-24" style={{ background: "#FFF8E7" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-14">
          <span className="badge" style={{ background: "#FFB800", color: "#1A1A2E" }}>{t.testimonials.badge}</span>
          <h2 className="font-display mt-3" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#1A1A2E" }}>
            {t.testimonials.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.testimonials.reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-7 relative"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}
            >
              <div className="text-4xl mb-1">{'"'}</div>
              <p className="font-semibold mb-5 leading-relaxed" style={{ color: "#444" }}>{r.review}</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                  style={{ background: "#FFF0C8" }}
                >
                  {r.emoji}
                </div>
                <div>
                  <div className="font-bold" style={{ color: "#1A1A2E" }}>{r.name}</div>
                  <div className="text-sm font-semibold" style={{ color: "#888" }}>{r.city}</div>
                </div>
                <div className="ml-auto text-yellow-400 text-lg">
                  {"⭐".repeat(r.stars)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

