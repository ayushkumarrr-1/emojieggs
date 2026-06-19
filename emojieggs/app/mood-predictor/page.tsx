"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import "./mood-predictor.css";

/* ───────── Mood Data ───────── */
const MOODS = [
  {
    emoji: "😄",
    label: "Super Happy",
    color: "#FFD700",
    gradient: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
    message: "The universe says today is YOUR day! Spread those golden vibes everywhere you go. ✨",
    tip: "Share your energy — buy a Happy Emoji Egg for someone special!",
    bgGlow: "rgba(255, 215, 0, 0.3)",
  },
  {
    emoji: "😌",
    label: "Calm & Peaceful",
    color: "#7EC8E3",
    gradient: "linear-gradient(135deg, #7EC8E3 0%, #58A6C4 100%)",
    message: "Inner peace detected! The universe is giving you a gentle hug today. Take it slow. 🌊",
    tip: "Pair this mood with our Zen Egg Pack — serenity on a shell.",
    bgGlow: "rgba(126, 200, 227, 0.3)",
  },
  {
    emoji: "🥰",
    label: "Feeling Loved",
    color: "#FF6B9D",
    gradient: "linear-gradient(135deg, #FF6B9D 0%, #FF4081 100%)",
    message: "Love is in the air! The universe sees someone who deserves all the affection today. 💕",
    tip: "Gift an Emoji Egg to your loved one — because love tastes better on eggs!",
    bgGlow: "rgba(255, 107, 157, 0.3)",
  },
  {
    emoji: "🔥",
    label: "On Fire!",
    color: "#FF6B6B",
    gradient: "linear-gradient(135deg, #FF6B6B 0%, #EE4B2B 100%)",
    message: "Unstoppable energy! The universe just handed you rocket fuel. Go conquer the world! 🚀",
    tip: "Fuel that fire — our Spicy Emoji Egg Pack matches your vibe!",
    bgGlow: "rgba(255, 107, 107, 0.3)",
  },
  {
    emoji: "🤔",
    label: "Deep Thinker",
    color: "#A78BFA",
    gradient: "linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)",
    message: "The universe sees a philosopher today. Your ideas might just change everything. 🧠",
    tip: "Think while eating — our Emoji Eggs give the best 'egg-speriences'!",
    bgGlow: "rgba(167, 139, 250, 0.3)",
  },
  {
    emoji: "😴",
    label: "Sleepy Head",
    color: "#94A3B8",
    gradient: "linear-gradient(135deg, #94A3B8 0%, #64748B 100%)",
    message: "The universe prescribes rest! Take a cozy nap and recharge your soul. 💤",
    tip: "Wake up with our Sunrise Emoji Egg — breakfast motivation at its finest!",
    bgGlow: "rgba(148, 163, 184, 0.3)",
  },
  {
    emoji: "🤩",
    label: "Star-Struck",
    color: "#FBBF24",
    gradient: "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)",
    message: "Celebrity energy! The universe says all eyes should be on you today. Own it! ⭐",
    tip: "You deserve the VIP Egg Pack — limited edition, just like you!",
    bgGlow: "rgba(251, 191, 36, 0.3)",
  },
  {
    emoji: "😎",
    label: "Cool & Confident",
    color: "#34D399",
    gradient: "linear-gradient(135deg, #34D399 0%, #10B981 100%)",
    message: "Main character energy activated! The universe gave you the cool card today. 😎",
    tip: "Stay cool, eat cool — try our Chill Emoji Egg Pack!",
    bgGlow: "rgba(52, 211, 153, 0.3)",
  },
  {
    emoji: "🥳",
    label: "Party Mode",
    color: "#F472B6",
    gradient: "linear-gradient(135deg, #F472B6 0%, #EC4899 100%)",
    message: "Celebration vibes! The universe says today is a party — no invitation needed! 🎉",
    tip: "Party harder with our Birthday Emoji Egg Pack!",
    bgGlow: "rgba(244, 114, 182, 0.3)",
  },
  {
    emoji: "🌈",
    label: "Colorful Dreamer",
    color: "#E879F9",
    gradient: "linear-gradient(135deg, #E879F9 0%, #A855F7 100%)",
    message: "The universe painted your day with all the colors! Dream big and dream wild. 🦄",
    tip: "Match your rainbow mood with our Rainbow Emoji Egg Pack!",
    bgGlow: "rgba(232, 121, 249, 0.3)",
  },
];

/* ───────── Floating Particle ───────── */
function Particle({ delay, size, left, duration }: { delay: number; size: number; left: number; duration: number }) {
  return (
    <div
      className="mood-particle"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  );
}

/* ───────── Main Page ───────── */
export default function MoodPredictor() {
  const [phase, setPhase] = useState<"intro" | "focusing" | "reveal">("intro");
  const [mood, setMood] = useState<(typeof MOODS)[0] | null>(null);
  const [eggCracked, setEggCracked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);
  const [history, setHistory] = useState<typeof MOODS>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const focusTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate particles only once on mount
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      delay: Math.random() * 8,
      size: Math.random() * 6 + 3,
      left: Math.random() * 100,
      duration: Math.random() * 6 + 8,
    }))
  );

  // Pulse counter during focusing
  useEffect(() => {
    if (phase === "focusing") {
      timerRef.current = setInterval(() => {
        setPulseCount((p) => p + 1);
      }, 600);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [phase]);

  const startFocusing = useCallback(() => {
    setPhase("focusing");
    setPulseCount(0);
    setEggCracked(false);
    setShowResult(false);

    // Auto-reveal after 3 seconds
    focusTimerRef.current = setTimeout(() => {
      revealMood();
    }, 3000);
  }, []);

  const revealMood = useCallback(() => {
    if (focusTimerRef.current) clearTimeout(focusTimerRef.current);

    const randomMood = MOODS[Math.floor(Math.random() * MOODS.length)];
    setMood(randomMood);
    setEggCracked(true);
    setPhase("reveal");

    setTimeout(() => {
      setShowResult(true);
      setHistory((prev) => [randomMood, ...prev].slice(0, 5));
    }, 800);
  }, []);

  const tryAgain = () => {
    setPhase("intro");
    setMood(null);
    setEggCracked(false);
    setShowResult(false);
    setPulseCount(0);
  };

  return (
    <div className="mood-page" style={{ background: mood && phase === "reveal" ? undefined : "#0F0A1E" }}>
      {/* Animated background glow based on mood */}
      {mood && phase === "reveal" && (
        <div
          className="mood-bg-glow"
          style={{
            background: `radial-gradient(ellipse at 50% 30%, ${mood.bgGlow} 0%, #0F0A1E 70%)`,
          }}
        />
      )}

      {/* Floating particles */}
      <div className="particles-container">
        {particles.map((p) => (
          <Particle key={p.id} {...p} />
        ))}
      </div>

      {/* Navigation */}
      <nav className="mood-nav">
        <Link href="/" className="mood-back-link">
          <span style={{ fontSize: "1.2rem" }}>←</span>
          <span>Back to EmojiEggs</span>
        </Link>
        <div className="mood-nav-brand">
          <span className="font-display" style={{ color: "#FFB800", fontSize: "1.1rem" }}>
            EmojiEggs
          </span>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", fontWeight: 700 }}>
            MOOD PREDICTOR
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mood-main">
        {/* ─── INTRO PHASE ─── */}
        {phase === "intro" && (
          <div className="mood-intro-container">
            <div className="mood-mystical-badge">
              <span>🔮</span> Universe&apos;s Mood Oracle <span>🔮</span>
            </div>

            <h1 className="mood-title font-display">
              What&apos;s Your
              <br />
              <span className="mood-title-gradient">Mood Today?</span>
            </h1>

            <p className="mood-subtitle">
              Close your eyes. Take a deep breath.
              <br />
              Tap the cosmic egg and let the <strong>universe decide</strong> your mood.
            </p>

            {/* The Cosmic Egg Button */}
            <button className="cosmic-egg-btn" onClick={startFocusing} aria-label="Start mood prediction">
              <div className="cosmic-egg-rings">
                <div className="cosmic-ring ring-1" />
                <div className="cosmic-ring ring-2" />
                <div className="cosmic-ring ring-3" />
              </div>
              <div className="cosmic-egg-shape">
                <span className="cosmic-egg-emoji">🥚</span>
              </div>
              <span className="cosmic-egg-label font-display">Tap to Begin</span>
            </button>

            <p className="mood-hint">
              ✨ Pro tip: Close your eyes before tapping for the most authentic cosmic reading!
            </p>
          </div>
        )}

        {/* ─── FOCUSING PHASE ─── */}
        {phase === "focusing" && (
          <div className="mood-focusing-container">
            <div className="focusing-text font-display">
              Reading the cosmos
              <span className="focusing-dots">
                {".".repeat((pulseCount % 3) + 1)}
              </span>
            </div>

            <div className="cosmic-egg-focusing" onClick={revealMood}>
              <div className="focus-ring focus-ring-1" />
              <div className="focus-ring focus-ring-2" />
              <div className="focus-ring focus-ring-3" />
              <div className="cosmic-egg-shape focusing-egg">
                <span className="cosmic-egg-emoji" style={{ fontSize: "4rem" }}>🥚</span>
              </div>
            </div>

            <p className="focusing-sub" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>
              Tap the egg to reveal early, or wait for the universe...
            </p>
          </div>
        )}

        {/* ─── REVEAL PHASE ─── */}
        {phase === "reveal" && mood && (
          <div className="mood-reveal-container">
            {/* Cracked Egg Animation */}
            <div className={`cracked-egg-wrapper ${eggCracked ? "cracked" : ""}`}>
              <div className="cracked-egg-left">🥚</div>
              <div className="cracked-egg-right">🥚</div>
              <div className={`revealed-mood-emoji ${showResult ? "visible" : ""}`}>
                {mood.emoji}
              </div>
            </div>

            {/* Mood Result Card */}
            <div className={`mood-result-card ${showResult ? "visible" : ""}`}>
              <div className="mood-result-badge" style={{ background: mood.gradient }}>
                {mood.label}
              </div>

              <p className="mood-result-message">{mood.message}</p>

              <div className="mood-result-tip">
                <span className="mood-tip-icon">🥚</span>
                <span>{mood.tip}</span>
              </div>

              <div className="mood-result-actions">
                <button className="mood-btn-primary font-display" onClick={tryAgain}>
                  🔄 Try Again
                </button>
                <Link href="/#order" className="mood-btn-secondary font-display">
                  🛒 Order Emoji Eggs
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ─── History Section ─── */}
        {history.length > 0 && phase !== "focusing" && (
          <div className={`mood-history ${phase === "reveal" && showResult ? "visible" : phase === "intro" ? "visible" : ""}`}>
            <h3 className="mood-history-title font-display">Your Recent Moods</h3>
            <div className="mood-history-list">
              {history.map((m, i) => (
                <div
                  key={i}
                  className="mood-history-item"
                  style={{ borderColor: m.color, animationDelay: `${i * 0.1}s` }}
                >
                  <span style={{ fontSize: "1.5rem" }}>{m.emoji}</span>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: m.color }}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
