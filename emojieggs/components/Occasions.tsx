"use client";
import { useEffect, useRef } from "react";
import { EggWithFace } from "./FaceEmoji";

const occasions = [
  { faceId: "star_eyes",    label: "Birthdays",     color: "#FF6B6B", bg: "#FFF0F0" },
  { faceId: "kiss",         label: "Romance",        color: "#E91E8C", bg: "#FFF0F8" },
  { faceId: "nerd",         label: "Exam Day",       color: "#8B5CF6", bg: "#F5F0FF" },
  { faceId: "flex",         label: "Fitness",        color: "#10B981", bg: "#F0FFF8" },
  { faceId: "rofl",         label: "Just for Fun",   color: "#F59E0B", bg: "#FFFBEB" },
  { faceId: "dead_inside",  label: "Monday Mood",    color: "#6B7280", bg: "#F9FAFB" },
  { faceId: "exhausted",    label: "Employees",      color: "#FF8C42", bg: "#FFF5EB" },
  { faceId: "tongue_out",   label: "Party Time",     color: "#4ECDC4", bg: "#F0FFFE" },
];

export default function Occasions() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    refs.current.forEach((r) => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-24 bg-white" id="occasions">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="badge" style={{ background: "#FFF0C8", color: "#CC8800" }}>Every Mood</span>
          <h2 className="font-display mt-3" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#1A1A2E" }}>
            A Face for Every Occasion
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {occasions.map((occ, i) => (
            <div
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              className="reveal rounded-3xl p-6 text-center cursor-pointer transition-all hover:-translate-y-2"
              style={{ background: occ.bg, transitionDelay: `${i * 0.08}s`, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <EggWithFace faceId={occ.faceId} eggWidth={72} eggHeight={90} />
              </div>
              <div className="font-display mt-4 text-lg" style={{ color: occ.color }}>{occ.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#order"
            className="font-display px-8 py-4 rounded-full text-white text-lg inline-block transition-transform hover:scale-105"
            style={{ background: "linear-gradient(135deg, #FFB800, #FF6B6B)", boxShadow: "0 8px 25px rgba(255,184,0,0.3)" }}
          >
            Customise Mine Now 🎨
          </a>
        </div>
      </div>
    </section>
  );
}
