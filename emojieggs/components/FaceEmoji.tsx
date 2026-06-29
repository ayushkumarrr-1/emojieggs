"use client";

// All faces: black & white, only eyes + mouth, drawn as SVG
export const FACES: Record<string, { svg: string; label: string }> = {
  happy: {
    label: "Happy",
    svg: `
      <circle cx="35" cy="42" r="5" fill="black"/>
      <circle cx="65" cy="42" r="5" fill="black"/>
      <path d="M30 60 Q50 78 70 60" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
  },
  laugh: {
    label: "Laughing",
    svg: `
      <path d="M28 38 Q35 32 42 38" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M58 38 Q65 32 72 38" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M28 60 Q50 82 72 60" stroke="black" stroke-width="3.5" fill="black" stroke-linecap="round"/>`,
  },
  sad: {
    label: "Sad",
    svg: `
      <circle cx="35" cy="42" r="5" fill="black"/>
      <circle cx="65" cy="42" r="5" fill="black"/>
      <path d="M30 70 Q50 55 70 70" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
  },
  cry: {
    label: "Crying",
    svg: `
      <circle cx="35" cy="40" r="5" fill="black"/>
      <circle cx="65" cy="40" r="5" fill="black"/>
      <path d="M32 68 Q50 55 68 68" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M33 46 Q29 54 33 62" stroke="black" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M67 46 Q71 54 67 62" stroke="black" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
  },
  wink: {
    label: "Wink",
    svg: `
      <circle cx="35" cy="42" r="5" fill="black"/>
      <path d="M58 38 Q65 44 72 38" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M30 60 Q50 78 70 60" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
  },
  love: {
    label: "In Love",
    svg: `
      <path d="M28 35 Q28 27 35 27 Q39 27 42 31 Q45 27 49 27 Q56 27 56 35 Q56 42 42 52 Q28 42 28 35Z" fill="black"/>
      <path d="M56 35 Q56 27 63 27 Q67 27 70 31 Q73 27 77 27 Q84 27 84 35 Q84 42 70 52 Q56 42 56 35Z" fill="black"/>
      <path d="M30 64 Q50 78 70 64" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
  },
  surprised: {
    label: "Surprised",
    svg: `
      <circle cx="35" cy="40" r="6" fill="none" stroke="black" stroke-width="3"/>
      <circle cx="65" cy="40" r="6" fill="none" stroke="black" stroke-width="3"/>
      <ellipse cx="50" cy="66" rx="10" ry="12" fill="none" stroke="black" stroke-width="3"/>`,
  },
  sleepy: {
    label: "Sleepy",
    svg: `
      <path d="M26 42 Q35 36 44 42" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M56 42 Q65 36 74 42" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M35 63 Q50 71 65 63" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  },
  angry: {
    label: "Angry",
    svg: `
      <path d="M26 36 Q35 44 44 36" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M56 36 Q65 44 74 36" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <circle cx="35" cy="46" r="5" fill="black"/>
      <circle cx="65" cy="46" r="5" fill="black"/>
      <path d="M32 68 Q50 58 68 68" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
  },
  cool: {
    label: "Cool",
    svg: `
      <rect x="22" y="34" width="56" height="18" rx="9" fill="black"/>
      <rect x="24" y="36" width="22" height="14" rx="7" fill="white"/>
      <rect x="54" y="36" width="22" height="14" rx="7" fill="white"/>
      <circle cx="35" cy="43" r="4" fill="black"/>
      <circle cx="65" cy="43" r="4" fill="black"/>
      <path d="M33 63 Q50 75 67 63" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
  },
  nervous: {
    label: "Nervous",
    svg: `
      <circle cx="35" cy="40" r="5" fill="black"/>
      <circle cx="65" cy="40" r="5" fill="black"/>
      <path d="M32 64 Q38 58 44 64 Q50 70 56 64 Q62 58 68 64" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  },
  smirk: {
    label: "Smirk",
    svg: `
      <circle cx="35" cy="42" r="5" fill="black"/>
      <circle cx="65" cy="42" r="5" fill="black"/>
      <path d="M35 63 Q50 58 65 68" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
  },
  shocked: {
    label: "Shocked",
    svg: `
      <path d="M26 34 Q35 28 44 34" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M56 34 Q65 28 74 34" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="35" cy="42" r="6" fill="black"/>
      <circle cx="65" cy="42" r="6" fill="black"/>
      <ellipse cx="50" cy="66" rx="12" ry="10" fill="black"/>`,
  },
  yawn: {
    label: "Yawning",
    svg: `
      <path d="M28 38 Q35 32 42 38" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M58 38 Q65 32 72 38" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="50" cy="65" rx="14" ry="11" fill="black" stroke="black" stroke-width="2"/>`,
  },
  determined: {
    label: "Determined",
    svg: `
      <path d="M26 38 L44 42" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M56 42 L74 38" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="35" cy="44" r="4.5" fill="black"/>
      <circle cx="65" cy="44" r="4.5" fill="black"/>
      <path d="M33 63 L67 63" stroke="black" stroke-width="3.5" stroke-linecap="round"/>`,
  },
  bored: {
    label: "Bored",
    svg: `
      <path d="M28 42 L44 42" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M56 42 L72 42" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M33 64 Q50 64 67 64" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  },
  // New faces for occasion-specific contexts
  exhausted: {
    label: "Exhausted",
    svg: `
      <path d="M26 40 Q35 46 44 40" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M56 40 Q65 46 74 40" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M35 62 Q50 68 65 62" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M72 30 L78 26" stroke="black" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M78 26 L82 30" stroke="black" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M80 30 L84 26" stroke="black" stroke-width="2.5" stroke-linecap="round"/>`,
  },
  dead_inside: {
    label: "Dead Inside",
    svg: `
      <path d="M28 36 L42 48" stroke="black" stroke-width="3" stroke-linecap="round"/>
      <path d="M42 36 L28 48" stroke="black" stroke-width="3" stroke-linecap="round"/>
      <path d="M58 36 L72 48" stroke="black" stroke-width="3" stroke-linecap="round"/>
      <path d="M72 36 L58 48" stroke="black" stroke-width="3" stroke-linecap="round"/>
      <path d="M33 66 Q50 66 67 66" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  },
  tongue_out: {
    label: "Tongue Out",
    svg: `
      <circle cx="35" cy="40" r="5" fill="black"/>
      <circle cx="65" cy="40" r="5" fill="black"/>
      <path d="M30 60 Q50 74 70 60" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>
      <ellipse cx="50" cy="72" rx="8" ry="6" fill="black" stroke="black" stroke-width="2"/>`,
  },
  nerd: {
    label: "Nerd",
    svg: `
      <circle cx="35" cy="40" r="10" fill="none" stroke="black" stroke-width="2.5"/>
      <circle cx="65" cy="40" r="10" fill="none" stroke="black" stroke-width="2.5"/>
      <line x1="45" y1="40" x2="55" y2="40" stroke="black" stroke-width="2.5"/>
      <circle cx="35" cy="40" r="4" fill="black"/>
      <circle cx="65" cy="40" r="4" fill="black"/>
      <path d="M38 62 Q50 70 62 62" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  },
  blush: {
    label: "Blushing",
    svg: `
      <circle cx="35" cy="40" r="5" fill="black"/>
      <circle cx="65" cy="40" r="5" fill="black"/>
      <ellipse cx="24" cy="52" rx="8" ry="5" fill="none" stroke="black" stroke-width="1.5" stroke-dasharray="2,2"/>
      <ellipse cx="76" cy="52" rx="8" ry="5" fill="none" stroke="black" stroke-width="1.5" stroke-dasharray="2,2"/>
      <path d="M35 62 Q50 74 65 62" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  },
  drool: {
    label: "Drooling",
    svg: `
      <path d="M26 42 Q35 36 44 42" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M56 42 Q65 36 74 42" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M30 62 Q50 72 70 62" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M62 66 Q64 78 60 82" stroke="black" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
  },
  flex: {
    label: "Flexing",
    svg: `
      <path d="M26 38 L44 34" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M56 34 L74 38" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="35" cy="42" r="5" fill="black"/>
      <circle cx="65" cy="42" r="5" fill="black"/>
      <path d="M30 60 Q50 78 70 60" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
  },
  rofl: {
    label: "ROFL",
    svg: `
      <path d="M26 36 Q35 30 44 36" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M56 36 Q65 30 72 36" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M26 58 Q50 84 74 58" stroke="black" stroke-width="3.5" fill="black" stroke-linecap="round"/>
      <path d="M33 46 Q29 50 33 54" stroke="black" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M67 46 Q71 50 67 54" stroke="black" stroke-width="2" fill="none" stroke-linecap="round"/>`,
  },
  kiss: {
    label: "Kissing",
    svg: `
      <circle cx="35" cy="40" r="5" fill="black"/>
      <circle cx="65" cy="40" r="5" fill="black"/>
      <circle cx="50" cy="65" r="7" fill="none" stroke="black" stroke-width="3"/>`,
  },
  star_eyes: {
    label: "Star Eyes",
    svg: `
      <polygon points="35,30 37,38 45,38 39,43 41,51 35,47 29,51 31,43 25,38 33,38" fill="black"/>
      <polygon points="65,30 67,38 75,38 69,43 71,51 65,47 59,51 61,43 55,38 63,38" fill="black"/>
      <path d="M30 64 Q50 78 70 64" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
  },
  pleading: {
    label: "Pleading",
    svg: `
      <circle cx="35" cy="38" r="8" fill="none" stroke="black" stroke-width="2.5"/>
      <circle cx="65" cy="38" r="8" fill="none" stroke="black" stroke-width="2.5"/>
      <circle cx="35" cy="40" r="4" fill="black"/>
      <circle cx="65" cy="40" r="4" fill="black"/>
      <circle cx="40" cy="34" r="2" fill="white" stroke="black" stroke-width="1"/>
      <circle cx="70" cy="34" r="2" fill="white" stroke="black" stroke-width="1"/>
      <path d="M38 66 Q50 72 62 66" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  },
  mischievous: {
    label: "Mischievous",
    svg: `
      <path d="M26 38 L44 42" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M56 42 L74 38" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="35" cy="44" r="4.5" fill="black"/>
      <circle cx="65" cy="44" r="4.5" fill="black"/>
      <path d="M30 60 Q50 74 70 60" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
  },
  mind_blown: {
    label: "Mind Blown",
    svg: `
      <circle cx="35" cy="40" r="7" fill="none" stroke="black" stroke-width="3"/>
      <circle cx="65" cy="40" r="7" fill="none" stroke="black" stroke-width="3"/>
      <circle cx="35" cy="40" r="3" fill="black"/>
      <circle cx="65" cy="40" r="3" fill="black"/>
      <ellipse cx="50" cy="66" rx="10" ry="10" fill="black"/>
      <path d="M30 22 L26 14" stroke="black" stroke-width="2" stroke-linecap="round"/>
      <path d="M50 20 L50 12" stroke="black" stroke-width="2" stroke-linecap="round"/>
      <path d="M70 22 L74 14" stroke="black" stroke-width="2" stroke-linecap="round"/>`,
  },
  dizzy: {
    label: "Dizzy",
    svg: `
      <path d="M28 36 Q35 44 42 36 Q35 28 28 36" stroke="black" stroke-width="2.5" fill="none"/>
      <path d="M58 36 Q65 44 72 36 Q65 28 58 36" stroke="black" stroke-width="2.5" fill="none"/>
      <path d="M35 65 Q50 72 65 65" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  },
  zen: {
    label: "Zen",
    svg: `
      <path d="M26 42 Q35 36 44 42" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M56 42 Q65 36 74 42" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M35 62 Q50 68 65 62" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="50" cy="24" r="3" fill="none" stroke="black" stroke-width="2"/>`,
  },
  proud: {
    label: "Proud",
    svg: `
      <path d="M28 42 Q35 36 42 42" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M58 42 Q65 36 72 42" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M28 60 Q50 78 72 60" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
  },
  confused: {
    label: "Confused",
    svg: `
      <circle cx="35" cy="42" r="5" fill="black"/>
      <circle cx="65" cy="42" r="5" fill="black"/>
      <path d="M26 36 L44 40" stroke="black" stroke-width="3" stroke-linecap="round"/>
      <path d="M74 36 L56 40" stroke="black" stroke-width="3" stroke-linecap="round"/>
      <path d="M35 66 Q50 60 65 66" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  },
  grimace: {
    label: "Grimace",
    svg: `
      <circle cx="35" cy="40" r="5" fill="black"/>
      <circle cx="65" cy="40" r="5" fill="black"/>
      <rect x="30" y="58" width="40" height="14" rx="4" fill="none" stroke="black" stroke-width="2.5"/>
      <line x1="40" y1="58" x2="40" y2="72" stroke="black" stroke-width="2"/>
      <line x1="50" y1="58" x2="50" y2="72" stroke="black" stroke-width="2"/>
      <line x1="60" y1="58" x2="60" y2="72" stroke="black" stroke-width="2"/>`,
  },
  eye_roll: {
    label: "Eye Roll",
    svg: `
      <circle cx="35" cy="40" r="7" fill="none" stroke="black" stroke-width="2.5"/>
      <circle cx="65" cy="40" r="7" fill="none" stroke="black" stroke-width="2.5"/>
      <circle cx="35" cy="36" r="3.5" fill="black"/>
      <circle cx="65" cy="36" r="3.5" fill="black"/>
      <path d="M35 64 Q50 64 65 64" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  },
  hug: {
    label: "Hugging",
    svg: `
      <circle cx="35" cy="40" r="5" fill="black"/>
      <circle cx="65" cy="40" r="5" fill="black"/>
      <path d="M35 62 Q50 74 65 62" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M18 50 Q14 65 24 72" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M82 50 Q86 65 76 72" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  },
  money_eyes: {
    label: "Money Eyes",
    svg: `
      <text x="27" y="48" font-size="22" font-weight="bold" font-family="monospace" fill="black">$</text>
      <text x="57" y="48" font-size="22" font-weight="bold" font-family="monospace" fill="black">$</text>
      <path d="M30 64 Q50 78 70 64" stroke="black" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
  },
  silly: {
    label: "Silly",
    svg: `
      <circle cx="30" cy="40" r="6" fill="black"/>
      <circle cx="70" cy="36" r="6" fill="black"/>
      <path d="M30 62 Q50 78 70 62" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>
      <ellipse cx="55" cy="74" rx="7" ry="5" fill="black"/>`,
  },
  sweat: {
    label: "Sweating",
    svg: `
      <circle cx="35" cy="42" r="5" fill="black"/>
      <circle cx="65" cy="42" r="5" fill="black"/>
      <path d="M35 64 Q50 70 65 64" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M76 30 Q80 40 76 48" stroke="black" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <circle cx="76" cy="50" r="2.5" fill="black"/>`,
  },
  skeptical: {
    label: "Skeptical",
    svg: `
      <circle cx="35" cy="42" r="5" fill="black"/>
      <circle cx="65" cy="42" r="5" fill="black"/>
      <path d="M26 36 L44 36" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M56 32 L74 38" stroke="black" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M35 66 Q50 62 65 66" stroke="black" stroke-width="3" fill="none" stroke-linecap="round"/>`,
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
}

export function EggWithFace({ faceId, eggWidth, eggHeight }: EggFaceProps) {
  const face = FACES[faceId];
  const faceSize = eggWidth * 0.7;
  return (
    <div style={{ position: "relative", width: eggWidth, height: eggHeight, flexShrink: 0 }}>
      {/* Egg shape */}
      <div
        style={{
          width: eggWidth,
          height: eggHeight,
          background: "radial-gradient(ellipse at 35% 30%, #fff9e6 0%, #FFD84D 35%, #FFB800 65%, #CC8800 100%)",
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          boxShadow: "inset -8px -12px 20px rgba(0,0,0,0.15), inset 6px 8px 15px rgba(255,255,255,0.6), 0 8px 30px rgba(255,184,0,0.4)",
          position: "absolute",
          inset: 0,
        }}
      />
      {/* Gloss */}
      <div style={{
        position: "absolute",
        top: "12%", left: "20%",
        width: "28%", height: "22%",
        background: "rgba(255,255,255,0.75)",
        borderRadius: "50%",
        filter: "blur(3px)",
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
          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15)) grayscale(100%) contrast(0) brightness(0.2)",
        }}>
          {faceId}
        </div>
      )}
    </div>
  );
}
