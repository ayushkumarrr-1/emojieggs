const fs = require('fs');
let code = fs.readFileSync('components/FaceEmoji.tsx', 'utf8');

const emojis = {
  teary_smile: '🥹', love_hearts: '🥰', happy: '😊', laugh: '😄', sad: '😔', cry: '😢', wink: '😉', love: '😍', surprised: '😮', sleepy: '😪', angry: '😠', cool: '😎', nervous: '😬', smirk: '😏', shocked: '😱', yawning: '🥱', determined: '😤', bored: '😑', exhausted: '😫', dead_inside: '💀', tongue_out: '😛', nerd: '🤓', blushing: '😳', drooling: '🤤', flex: '💪', rofl: '🤣', kiss: '😘', star_eyes: '🤩', pleading: '🥺', mischievous: '😈', mind_blown: '🤯', dizzy: '😵', zen: '😌', proud: '😤', confused: '😕', grimace: '😬', eye_roll: '🙄', hugging: '🤗', money_eyes: '🤑', silly: '🤪', sweating: '😅', skeptical: '🤨'
};

code = code.replace(/export const FACES: Record<string, { svg: string; label: string }> = {/, 'export const FACES: Record<string, { svg: string; label: string; emoji?: string }> = {');

for (const [key, emoji] of Object.entries(emojis)) {
  const regex = new RegExp('(\\b' + key + '\\s*:\\s*\\{[^}]*?label:\\s*"[^"]+")');
  code = code.replace(regex, '$1, emoji: "' + emoji + '"');
}

fs.writeFileSync('components/FaceEmoji.tsx', code);
console.log('Modified FaceEmoji.tsx');
