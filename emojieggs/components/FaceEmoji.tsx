"use client";
import { useState, useRef, useEffect } from "react";

// All faces: black & white, only eyes + mouth, drawn as SVG
export const FACES: Record<string, { svg: string; label: string; emoji?: string }> = {
  teary_smile: {
    label: "Teary Smile", emoji: "🥹",
    svg: `
      <path d="M23 30 Q32 22 41 25" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M77 30 Q68 22 59 25" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="35" cy="42" r="9" fill="black"/>
      <circle cx="65" cy="42" r="9" fill="black"/>
      <circle cx="32" cy="38" r="3" fill="white"/>
      <circle cx="62" cy="38" r="3" fill="white"/>
      <circle cx="38" cy="45" r="1.5" fill="white"/>
      <circle cx="68" cy="45" r="1.5" fill="white"/>
      <path d="M30 64 Q50 78 70 64" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M33 48 Q29 56 33 64" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M67 48 Q71 56 67 64" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
  },
  love_hearts: {
    label: "Lots of Love", emoji: "🥰",
    svg: `
      <path d="M22 30 Q22 22 29 22 Q33 22 36 26 Q39 22 43 22 Q50 22 50 30 Q50 37 36 47 Q22 37 22 30Z" fill="black"/>
      <path d="M50 30 Q50 22 57 22 Q61 22 64 26 Q67 22 71 22 Q78 22 78 30 Q78 37 64 47 Q50 37 50 30Z" fill="black"/>
      <path d="M40 70 Q50 82 60 70" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>`,
  },

  happy: {
    label: "Happy", emoji: "😊",
    svg: `
      <circle cx="35" cy="42" r="7" fill="black"/>
      <circle cx="65" cy="42" r="7" fill="black"/>
      <path d="M30 60 Q50 78 70 60" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>`,
  },
  laugh: {
    label: "Laughing", emoji: "😄",
    svg: `
      <path d="M28 38 Q35 32 42 38" stroke="black" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M58 38 Q65 32 72 38" stroke="black" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M28 60 Q50 82 72 60" stroke="black" stroke-width="4.5" fill="black" stroke-linecap="round"/>`,
  },
  sad: {
    label: "Sad", emoji: "😔",
    svg: `
      <circle cx="35" cy="42" r="7" fill="black"/>
      <circle cx="65" cy="42" r="7" fill="black"/>
      <path d="M30 70 Q50 55 70 70" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>`,
  },
  cry: {
    label: "Crying", emoji: "😢",
    svg: `
      <circle cx="35" cy="40" r="7" fill="black"/>
      <circle cx="65" cy="40" r="7" fill="black"/>
      <path d="M32 68 Q50 55 68 68" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M33 46 Q29 54 33 62" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M67 46 Q71 54 67 62" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
  },
  wink: {
    label: "Wink", emoji: "😉",
    svg: `
      <circle cx="35" cy="42" r="7" fill="black"/>
      <path d="M58 38 Q65 44 72 38" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M30 60 Q50 78 70 60" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>`,
  },
  love: {
    label: "In Love", emoji: "😍",
    svg: `
      <path d="M28 35 Q28 27 35 27 Q39 27 42 31 Q45 27 49 27 Q56 27 56 35 Q56 42 42 52 Q28 42 28 35Z" fill="black"/>
      <path d="M56 35 Q56 27 63 27 Q67 27 70 31 Q73 27 77 27 Q84 27 84 35 Q84 42 70 52 Q56 42 56 35Z" fill="black"/>
      <path d="M30 64 Q50 78 70 64" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>`,
  },
  surprised: {
    label: "Surprised", emoji: "😮",
    svg: `
      <circle cx="35" cy="40" r="10" fill="none" stroke="black" stroke-width="4"/>
      <circle cx="65" cy="40" r="10" fill="none" stroke="black" stroke-width="4"/>
      <ellipse cx="50" cy="66" rx="12" ry="14" fill="none" stroke="black" stroke-width="4"/>`,
  },
  sleepy: {
    label: "Sleepy", emoji: "😪",
    svg: `
      <path d="M26 42 Q35 36 44 42" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M56 42 Q65 36 74 42" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M35 63 Q50 71 65 63" stroke="black" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  },
  angry: {
    label: "Angry", emoji: "😠",
    svg: `
      <path d="M26 36 Q35 44 44 36" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M56 36 Q65 44 74 36" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <circle cx="35" cy="46" r="7" fill="black"/>
      <circle cx="65" cy="46" r="7" fill="black"/>
      <path d="M32 68 Q50 58 68 68" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>`,
  },
  cool: {
    label: "Cool", emoji: "😎",
    svg: `
      <rect x="22" y="34" width="56" height="18" rx="9" fill="black"/>
      <rect x="24" y="36" width="22" height="14" rx="7" fill="white"/>
      <rect x="54" y="36" width="22" height="14" rx="7" fill="white"/>
      <circle cx="35" cy="43" r="6" fill="black"/>
      <circle cx="65" cy="43" r="6" fill="black"/>
      <path d="M33 63 Q50 75 67 63" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>`,
  },
  nervous: {
    label: "Nervous", emoji: "😬",
    svg: `
      <circle cx="35" cy="40" r="7" fill="black"/>
      <circle cx="65" cy="40" r="7" fill="black"/>
      <path d="M32 64 Q38 58 44 64 Q50 70 56 64 Q62 58 68 64" stroke="black" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  },
  smirk: {
    label: "Smirk", emoji: "😏",
    svg: `
      <circle cx="35" cy="42" r="7" fill="black"/>
      <circle cx="65" cy="42" r="7" fill="black"/>
      <path d="M35 63 Q50 58 65 68" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>`,
  },
  shocked: {
    label: "Shocked", emoji: "😱",
    svg: `
      <path d="M26 34 Q35 28 44 34" stroke="black" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M56 34 Q65 28 74 34" stroke="black" stroke-width="4" fill="none" stroke-linecap="round"/>
      <circle cx="35" cy="42" r="8" fill="black"/>
      <circle cx="65" cy="42" r="8" fill="black"/>
      <ellipse cx="50" cy="66" rx="12" ry="10" fill="black"/>`,
  },
  yawn: {
    label: "Yawning",
    svg: `
      <path d="M28 38 Q35 32 42 38" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M58 38 Q65 32 72 38" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="50" cy="65" rx="14" ry="11" fill="black" stroke="black" stroke-width="2"/>`,
  },
  determined: {
    label: "Determined", emoji: "😤",
    svg: `
      <path d="M26 38 L44 42" stroke="black" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M56 42 L74 38" stroke="black" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="35" cy="44" r="6.5" fill="black"/>
      <circle cx="65" cy="44" r="6.5" fill="black"/>
      <path d="M33 63 L67 63" stroke="black" stroke-width="4.5" stroke-linecap="round"/>`,
  },
  bored: {
    label: "Bored", emoji: "😑",
    svg: `
      <path d="M28 42 L44 42" stroke="black" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M56 42 L72 42" stroke="black" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M33 64 Q50 64 67 64" stroke="black" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  },
  // New faces for occasion-specific contexts
  exhausted: {
    label: "Exhausted", emoji: "😫",
    svg: `
      <path d="M26 40 Q35 46 44 40" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M56 40 Q65 46 74 40" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M35 62 Q50 68 65 62" stroke="black" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M72 30 L78 26" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M78 26 L82 30" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M80 30 L84 26" stroke="black" stroke-width="3.5" stroke-linecap="round"/>`,
  },
  dead_inside: {
    label: "Dead Inside", emoji: "💀",
    svg: `
      <path d="M28 36 L42 48" stroke="black" stroke-width="4" stroke-linecap="round"/>
      <path d="M42 36 L28 48" stroke="black" stroke-width="4" stroke-linecap="round"/>
      <path d="M58 36 L72 48" stroke="black" stroke-width="4" stroke-linecap="round"/>
      <path d="M72 36 L58 48" stroke="black" stroke-width="4" stroke-linecap="round"/>
      <path d="M33 66 Q50 66 67 66" stroke="black" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  },
  tongue_out: {
    label: "Tongue Out", emoji: "😛",
    svg: `
      <circle cx="35" cy="40" r="7" fill="black"/>
      <circle cx="65" cy="40" r="7" fill="black"/>
      <path d="M30 60 Q50 74 70 60" stroke="black" stroke-width="4" fill="none" stroke-linecap="round"/>
      <ellipse cx="50" cy="72" rx="8" ry="6" fill="black" stroke="black" stroke-width="2"/>`,
  },
  nerd: {
    label: "Nerd", emoji: "🤓",
    svg: `
      <circle cx="35" cy="40" r="12" fill="none" stroke="black" stroke-width="3.5"/>
      <circle cx="65" cy="40" r="12" fill="none" stroke="black" stroke-width="3.5"/>
      <line x1="45" y1="40" x2="55" y2="40" stroke="black" stroke-width="3.5"/>
      <circle cx="35" cy="40" r="6" fill="black"/>
      <circle cx="65" cy="40" r="6" fill="black"/>
      <path d="M38 62 Q50 70 62 62" stroke="black" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  },
  blush: {
    label: "Blushing",
    svg: `
      <circle cx="35" cy="40" r="7" fill="black"/>
      <circle cx="65" cy="40" r="7" fill="black"/>
      <ellipse cx="24" cy="52" rx="8" ry="5" fill="none" stroke="black" stroke-width="1.5" stroke-dasharray="2,2"/>
      <ellipse cx="76" cy="52" rx="8" ry="5" fill="none" stroke="black" stroke-width="1.5" stroke-dasharray="2,2"/>
      <path d="M35 62 Q50 74 65 62" stroke="black" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  },
  drool: {
    label: "Drooling",
    svg: `
      <path d="M26 42 Q35 36 44 42" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M56 42 Q65 36 74 42" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M30 62 Q50 72 70 62" stroke="black" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M62 66 Q64 78 60 82" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
  },
  flex: {
    label: "Flexing", emoji: "💪",
    svg: `
      <path d="M26 38 L44 34" stroke="black" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M56 34 L74 38" stroke="black" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="35" cy="42" r="7" fill="black"/>
      <circle cx="65" cy="42" r="7" fill="black"/>
      <path d="M30 60 Q50 78 70 60" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>`,
  },
  rofl: {
    label: "ROFL", emoji: "🤣",
    svg: `
      <path d="M26 36 Q35 30 44 36" stroke="black" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M56 36 Q65 30 72 36" stroke="black" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M26 58 Q50 84 74 58" stroke="black" stroke-width="4.5" fill="black" stroke-linecap="round"/>
      <path d="M33 46 Q29 50 33 54" stroke="black" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M67 46 Q71 50 67 54" stroke="black" stroke-width="2" fill="none" stroke-linecap="round"/>`,
  },
  kiss: {
    label: "Kissing", emoji: "😘",
    svg: `
      <circle cx="35" cy="40" r="7" fill="black"/>
      <circle cx="65" cy="40" r="7" fill="black"/>
      <circle cx="50" cy="65" r="9" fill="none" stroke="black" stroke-width="4"/>`,
  },
  star_eyes: {
    label: "Star Eyes", emoji: "🤩",
    svg: `
      <polygon points="35,30 37,38 45,38 39,43 41,51 35,47 29,51 31,43 25,38 33,38" fill="black"/>
      <polygon points="65,30 67,38 75,38 69,43 71,51 65,47 59,51 61,43 55,38 63,38" fill="black"/>
      <path d="M30 64 Q50 78 70 64" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>`,
  },
  pleading: {
    label: "Pleading", emoji: "🥺",
    svg: `
      <path d="M23 26 Q32 18 41 21" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M77 26 Q68 18 59 21" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="35" cy="38" r="10" fill="black"/>
      <circle cx="65" cy="38" r="10" fill="black"/>
      <circle cx="32" cy="34" r="3.5" fill="white"/>
      <circle cx="62" cy="34" r="3.5" fill="white"/>
      <circle cx="39" cy="42" r="1.8" fill="white"/>
      <circle cx="69" cy="42" r="1.8" fill="white"/>
      <path d="M38 66 Q50 72 62 66" stroke="black" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  },
  mischievous: {
    label: "Mischievous", emoji: "😈",
    svg: `
      <path d="M26 38 L44 42" stroke="black" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M56 42 L74 38" stroke="black" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="35" cy="44" r="6.5" fill="black"/>
      <circle cx="65" cy="44" r="6.5" fill="black"/>
      <path d="M30 60 Q50 74 70 60" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>`,
  },
  mind_blown: {
    label: "Mind Blown", emoji: "🤯",
    svg: `
      <circle cx="35" cy="40" r="9" fill="none" stroke="black" stroke-width="4"/>
      <circle cx="65" cy="40" r="9" fill="none" stroke="black" stroke-width="4"/>
      <circle cx="35" cy="40" r="4.5" fill="black"/>
      <circle cx="65" cy="40" r="4.5" fill="black"/>
      <ellipse cx="50" cy="66" rx="10" ry="10" fill="black"/>
      <path d="M30 22 L26 14" stroke="black" stroke-width="2" stroke-linecap="round"/>
      <path d="M50 20 L50 12" stroke="black" stroke-width="2" stroke-linecap="round"/>
      <path d="M70 22 L74 14" stroke="black" stroke-width="2" stroke-linecap="round"/>`,
  },
  dizzy: {
    label: "Dizzy", emoji: "😵",
    svg: `
      <path d="M28 36 Q35 44 42 36 Q35 28 28 36" stroke="black" stroke-width="3.5" fill="none"/>
      <path d="M58 36 Q65 44 72 36 Q65 28 58 36" stroke="black" stroke-width="3.5" fill="none"/>
      <path d="M35 65 Q50 72 65 65" stroke="black" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  },
  zen: {
    label: "Zen", emoji: "😌",
    svg: `
      <path d="M26 42 Q35 36 44 42" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M56 42 Q65 36 74 42" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M35 62 Q50 68 65 62" stroke="black" stroke-width="4" fill="none" stroke-linecap="round"/>
      <circle cx="50" cy="24" r="4.5" fill="none" stroke="black" stroke-width="2"/>`,
  },
  proud: {
    label: "Proud", emoji: "😤",
    svg: `
      <path d="M28 42 Q35 36 42 42" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M58 42 Q65 36 72 42" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M28 60 Q50 78 72 60" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>`,
  },
  confused: {
    label: "Confused", emoji: "😕",
    svg: `
      <circle cx="35" cy="42" r="7" fill="black"/>
      <circle cx="65" cy="42" r="7" fill="black"/>
      <path d="M26 36 L44 40" stroke="black" stroke-width="4" stroke-linecap="round"/>
      <path d="M74 36 L56 40" stroke="black" stroke-width="4" stroke-linecap="round"/>
      <path d="M35 66 Q50 60 65 66" stroke="black" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  },
  grimace: {
    label: "Grimace", emoji: "😬",
    svg: `
      <circle cx="35" cy="40" r="7" fill="black"/>
      <circle cx="65" cy="40" r="7" fill="black"/>
      <rect x="30" y="58" width="40" height="14" rx="4" fill="none" stroke="black" stroke-width="3.5"/>
      <line x1="40" y1="58" x2="40" y2="72" stroke="black" stroke-width="2"/>
      <line x1="50" y1="58" x2="50" y2="72" stroke="black" stroke-width="2"/>
      <line x1="60" y1="58" x2="60" y2="72" stroke="black" stroke-width="2"/>`,
  },
  eye_roll: {
    label: "Eye Roll", emoji: "🙄",
    svg: `
      <circle cx="35" cy="40" r="9" fill="none" stroke="black" stroke-width="3.5"/>
      <circle cx="65" cy="40" r="9" fill="none" stroke="black" stroke-width="3.5"/>
      <circle cx="35" cy="36" r="5" fill="black"/>
      <circle cx="65" cy="36" r="5" fill="black"/>
      <path d="M35 64 Q50 64 65 64" stroke="black" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  },
  hug: {
    label: "Hugging",
    svg: `
      <circle cx="35" cy="40" r="7" fill="black"/>
      <circle cx="65" cy="40" r="7" fill="black"/>
      <path d="M35 62 Q50 74 65 62" stroke="black" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M18 50 Q14 65 24 72" stroke="black" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M82 50 Q86 65 76 72" stroke="black" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  },
  money_eyes: {
    label: "Money Eyes", emoji: "🤑",
    svg: `
      <text x="27" y="48" font-size="22" font-weight="bold" font-family="monospace" fill="black">$</text>
      <text x="57" y="48" font-size="22" font-weight="bold" font-family="monospace" fill="black">$</text>
      <path d="M30 64 Q50 78 70 64" stroke="black" stroke-width="4.5" fill="none" stroke-linecap="round"/>`,
  },
  silly: {
    label: "Silly", emoji: "🤪",
    svg: `
      <circle cx="30" cy="40" r="8" fill="black"/>
      <circle cx="70" cy="36" r="8" fill="black"/>
      <path d="M30 62 Q50 78 70 62" stroke="black" stroke-width="4" fill="none" stroke-linecap="round"/>
      <ellipse cx="55" cy="74" rx="7" ry="5" fill="black"/>`,
  },
  sweat: {
    label: "Sweating",
    svg: `
      <circle cx="35" cy="42" r="7" fill="black"/>
      <circle cx="65" cy="42" r="7" fill="black"/>
      <path d="M35 64 Q50 70 65 64" stroke="black" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M76 30 Q80 40 76 48" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <circle cx="76" cy="50" r="2.5" fill="black"/>`,
  },
  skeptical: {
    label: "Skeptical", emoji: "🤨",
    svg: `
      <circle cx="35" cy="42" r="7" fill="black"/>
      <circle cx="65" cy="42" r="7" fill="black"/>
      <path d="M26 36 L44 36" stroke="black" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M56 32 L74 38" stroke="black" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M35 66 Q50 62 65 66" stroke="black" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  },
};

export const OCCASION_FACES: Record<string, string[]> = {
  // 🎂 Birthday — celebratory, excited, joyful, surprised
  birthday: [
    "happy", "laugh", "star_eyes", "surprised", "wink", "tongue_out", "cool", "love", "rofl", "blush",
    "kiss", "proud", "hug", "mischievous", "money_eyes", "silly", "shocked", "drool", "smirk", "flex",
    "mind_blown", "nervous", "pleading", "determined", "nerd", "dizzy", "grimace", "eye_roll", "zen", "sleepy",
  ],
  // 💕 Love & Romance — romantic, shy, dreamy, passionate
  love: [
    "love", "kiss", "blush", "wink", "happy", "star_eyes", "smirk", "hug", "pleading", "proud",
    "nervous", "cry", "laugh", "zen", "silly", "tongue_out", "mischievous", "surprised", "sleepy", "cool",
    "rofl", "sad", "determined", "drool", "dizzy", "grimace", "shocked", "eye_roll", "bored", "flex",
  ],
  // 😩 Monday Blues — miserable, tired, dead inside, hopeless
  monday: [
    "dead_inside", "exhausted", "sleepy", "yawn", "sad", "bored", "cry", "angry", "drool", "nervous",
    "grimace", "eye_roll", "dizzy", "sweat", "skeptical", "confused", "pleading", "shocked", "determined", "zen",
    "nerd", "surprised", "tongue_out", "silly", "smirk", "cool", "happy", "laugh", "wink", "love",
  ],
  // 📚 Exam Day — nervous, stressed, studious, panicking
  exam: [
    "nervous", "nerd", "shocked", "exhausted", "determined", "cry", "dead_inside", "sad", "bored", "surprised",
    "sweat", "confused", "grimace", "pleading", "dizzy", "mind_blown", "eye_roll", "skeptical", "angry", "sleepy",
    "yawn", "zen", "drool", "cool", "proud", "happy", "laugh", "wink", "smirk", "love",
  ],
  // 🎊 Party Time — wild, fun, crazy, energetic
  party: [
    "rofl", "tongue_out", "laugh", "cool", "star_eyes", "wink", "happy", "surprised", "love", "shocked",
    "silly", "mischievous", "dizzy", "money_eyes", "mind_blown", "kiss", "proud", "hug", "blush", "flex",
    "drool", "smirk", "nervous", "grimace", "eye_roll", "zen", "pleading", "yawn", "determined", "sleepy",
  ],
  // ☀️ Good Morning — sleepy, waking up, yawning, groggy
  morning: [
    "sleepy", "yawn", "drool", "exhausted", "bored", "happy", "wink", "determined", "blush", "cool",
    "zen", "confused", "dizzy", "eye_roll", "grimace", "sweat", "proud", "hug", "skeptical", "tongue_out",
    "nerd", "silly", "laugh", "surprised", "love", "smirk", "rofl", "nervous", "star_eyes", "kiss",
  ],
  // 💪 Fitness & Health — strong, motivated, powerful, energetic
  health: [
    "flex", "determined", "cool", "happy", "star_eyes", "wink", "rofl", "exhausted", "smirk", "tongue_out",
    "proud", "sweat", "zen", "mind_blown", "mischievous", "hug", "surprised", "laugh", "love", "nerd",
    "silly", "money_eyes", "dizzy", "blush", "grimace", "eye_roll", "nervous", "shocked", "sleepy", "yawn",
  ],
  // 😂 Funny Vibes — hilarious, silly, goofy, absurd
  funny: [
    "rofl", "tongue_out", "laugh", "wink", "smirk", "shocked", "dead_inside", "cool", "surprised", "nervous",
    "silly", "mischievous", "dizzy", "eye_roll", "grimace", "confused", "mind_blown", "money_eyes", "skeptical", "drool",
    "happy", "love", "nerd", "blush", "proud", "hug", "pleading", "star_eyes", "zen", "flex",
  ],
  // 💼 Employees — tired, overworked, stressed, corporate burnout
  employees: [
    "exhausted", "dead_inside", "bored", "sleepy", "yawn", "nervous", "sad", "angry", "cry", "determined",
    "sweat", "eye_roll", "grimace", "confused", "skeptical", "drool", "dizzy", "pleading", "shocked", "zen",
    "nerd", "mind_blown", "smirk", "cool", "happy", "laugh", "proud", "wink", "love", "flex",
  ],
};


interface FaceProps {
  faceId: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function FaceIcon({ faceId, size = 40, className = "", style = {} }: FaceProps) {
  const face = FACES[faceId];
  if (!face) {
    return (
      <div 
        style={{ fontSize: size * 0.7, width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }} 
        className={className}
        title={faceId}
      >
        {faceId}
      </div>
    );
  }
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      dangerouslySetInnerHTML={{ __html: face.svg }}
    />
  );
}

// Face printed ON the egg — overlaid as SVG or text
interface EggFaceProps {
  faceId: string;
  eggWidth: number;
  eggHeight: number;
  isWhite?: boolean;
}

export function EggWithFace({ faceId, eggWidth, eggHeight, isWhite = false }: EggFaceProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isDraggingState, setIsDraggingState] = useState(false);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    setIsDraggingState(true);
    setAutoRotate(false);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    startX.current = clientX;
    startY.current = clientY;
  };
  
  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - startX.current;
    const deltaY = clientY - startY.current;
    
    setRotationY(prev => prev + deltaX * 0.6);
    setRotationX(prev => Math.max(-40, Math.min(40, prev - deltaY * 0.6)));
    
    startX.current = clientX;
    startY.current = clientY;
  };

  const handleEnd = () => {
    isDragging.current = false;
    setIsDraggingState(false);
  };

  useEffect(() => {
    if (isOpen) {
      const onMove = (e: MouseEvent | TouchEvent) => handleMove(e);
      const onEnd = () => handleEnd();
      
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchmove', onMove);
      window.addEventListener('touchend', onEnd);
      
      return () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onEnd);
        window.removeEventListener('touchmove', onMove);
        window.removeEventListener('touchend', onEnd);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && autoRotate) {
      let animId: number;
      const tick = () => {
        setRotationY(prev => (prev + 0.8) % 360);
        animId = requestAnimationFrame(tick);
      };
      animId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(animId);
    }
  }, [isOpen, autoRotate]);

  const face = FACES[faceId];
  const faceSize = eggWidth * 0.7;
  
  const modalEggWidth = 220;
  const modalEggHeight = 275;
  const modalFaceSize = modalEggWidth * 0.7;

  // Fake 3D math for the face
  const normY = ((rotationY % 360) + 360) % 360;
  const isFaceVisible = normY < 90 || normY > 270;
  // Use 2.1 to keep it slightly inside the edge
  const faceOffsetX = Math.sin(normY * Math.PI / 180) * (modalEggWidth / 2.1);
  const faceScaleX = Math.abs(Math.cos(normY * Math.PI / 180));

  // Custom styling for golden vs white egg
  const eggBackground = isWhite
    ? "radial-gradient(ellipse at 35% 30%, #ffffff 0%, #faf9f5 25%, #eae5d7 60%, #d5cfbf 85%, #bebaa8 100%)"
    : "radial-gradient(ellipse at 35% 30%, #fff9e6 0%, #FFD84D 35%, #FFB800 65%, #CC8800 100%)";
    
  const eggBoxShadow = isWhite
    ? "inset -6px -8px 15px rgba(135,125,105,0.22), inset 4px 5px 8px rgba(255,255,255,1), 0 6px 15px rgba(0,0,0,0.08)"
    : "inset -8px -12px 20px rgba(0,0,0,0.15), inset 6px 8px 15px rgba(255,255,255,0.6), 0 8px 30px rgba(255,184,0,0.4)";
    
  const eggGlossFilter = isWhite ? "blur(2px)" : "blur(3px)";

  return (
    <>
      {isWhite && (
        <style dangerouslySetInnerHTML={{ __html: `
          .egg-interactive-container {
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease;
          }
          .egg-interactive-container:hover {
            transform: scale(1.15) translateY(-4px);
            z-index: 10;
          }
        `}} />
      )}
      
      <div 
        onClick={isWhite ? () => setIsOpen(true) : undefined}
        className={isWhite ? "egg-interactive-container" : ""}
        style={{ 
          position: "relative", 
          width: eggWidth, 
          height: eggHeight, 
          flexShrink: 0,
          cursor: isWhite ? "pointer" : "default",
        }}
      >
        {/* Egg shape */}
        <div
          style={{
            width: eggWidth,
            height: eggHeight,
            background: eggBackground,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            boxShadow: eggBoxShadow,
            position: "absolute",
            inset: 0,
          }}
        />
        {/* Gloss */}
        <div style={{
          position: "absolute",
          top: "12%", left: "20%",
          width: "28%", height: "22%",
          background: "rgba(255,255,255,0.85)",
          borderRadius: "50%",
          filter: eggGlossFilter,
          transform: "rotate(-30deg)",
          pointerEvents: "none",
          zIndex: 3,
        }}/>
        {/* B&W face SVG or text */}
        {face ? (
          <svg
            viewBox="0 0 100 100"
            width={faceSize}
            height={faceSize}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -46%)",
              zIndex: 2,
              filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15))",
            }}
            xmlns="http://www.w3.org/2000/svg"
            dangerouslySetInnerHTML={{ __html: face.svg }}
          />
        ) : (
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            fontSize: faceSize * 0.8,
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15)) grayscale(100%) contrast(1.2) brightness(0.9)",
          }}>
            {faceId}
          </div>
        )}
      </div>

      {/* 3D Egg Viewer Modal */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10, 10, 15, 0.4)",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
          }}
        >
          {/* Modal Content Card */}
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#ffffff",
              borderRadius: "28px",
              padding: "40px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              maxWidth: "380px",
              width: "90%",
              border: "1px solid rgba(255,255,255,0.8)",
            }}
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "#f3f4f6",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "1.2rem",
                color: "#666",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#e5e7eb"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#f3f4f6"}
            >
              ×
            </button>

            {/* Instruction Badge */}
            <div style={{
              background: "#F9F6EF",
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "#FFB800",
              marginBottom: "24px",
              border: "1px solid #FFE57F",
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}>
              <span>🔄 Drag to rotate 3D</span>
            </div>

            {/* Interactive 3D Egg Area */}
            <div 
              onMouseDown={handleStart}
              onTouchStart={handleStart}
              style={{
                position: "relative",
                width: modalEggWidth,
                height: modalEggHeight,
                perspective: "800px",
                transformStyle: "preserve-3d",
                cursor: isDraggingState ? "grabbing" : "grab",
                userSelect: "none",
              }}
            >
              {/* Shadow under the egg (remains unrotated on the ground) */}
              <div style={{
                position: "absolute",
                bottom: "-25px",
                left: "10%",
                width: "80%",
                height: "15px",
                background: "rgba(0,0,0,0.1)",
                borderRadius: "50%",
                filter: "blur(6px)",
                transform: "translateZ(-30px)",
              }} />
              
              {/* 3D Rotating Container (tilts up/down with rotateX only) */}
              <div style={{
                position: "absolute",
                inset: 0,
                transform: \`rotateX(\${rotationX}deg)\`,
                transformStyle: "preserve-3d",
                transition: isDraggingState ? "none" : "transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
              }}>
                {/* Base Egg Body - Always facing camera to preserve width and look 3D */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(ellipse at 35% 30%, #ffffff 0%, #faf9f5 25%, #eae5d7 60%, #d5cfbf 85%, #bebaa8 100%)",
                    borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                    boxShadow: "inset -12px -18px 30px rgba(135,125,105,0.25), inset 8px 10px 15px rgba(255,255,255,1), 0 15px 35px rgba(0,0,0,0.15)",
                    zIndex: 2,
                  }}
                />
                
                {/* Gloss Highlight (front side) */}
                <div style={{
                  position: "absolute",
                  top: "12%", left: "20%",
                  width: "28%", height: "22%",
                  background: "rgba(255,255,255,0.85)",
                  borderRadius: "50%",
                  filter: "blur(4px)",
                  transform: "rotate(-30deg) translateZ(8px)",
                  pointerEvents: "none",
                  zIndex: 4,
                }}/>

                {/* Spherical face mapping wrapper */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                  overflow: "hidden",
                  zIndex: 3,
                }}>
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: isFaceVisible ? 1 : 0,
                    transform: \`translateX(\${faceOffsetX}px) scaleX(\${faceScaleX})\`,
                    transition: isDraggingState ? "none" : "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                  }}>
                    {face ? (
                      <svg
                        viewBox="0 0 100 100"
                        width={modalFaceSize}
                        height={modalFaceSize}
                        style={{
                          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        dangerouslySetInnerHTML={{ __html: face.svg }}
                      />
                    ) : (
                      <div style={{
                        fontSize: modalFaceSize * 0.8,
                        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15)) grayscale(100%) contrast(1.2)",
                      }}>
                        {faceId}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "10px", marginTop: "32px" }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setRotationX(0);
                  setRotationY(0);
                  setAutoRotate(true);
                }}
                style={{
                  padding: "10px 20px",
                  background: "#1A1A2E",
                  color: "#fff",
                  border: "none",
                  borderRadius: "20px",
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                🔄 Reset Spin
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
