import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Fredoka One'", "cursive"],
        body: ["'Nunito'", "sans-serif"],
      },
      colors: {
        yolk: "#FFB800",
        yolkDark: "#E09000",
        shell: "#FFF8E7",
        shellDeep: "#FFF0C8",
        pop: "#FF6B6B",
        mint: "#4ECDC4",
        lavender: "#A78BFA",
        ink: "#1A1A2E",
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        wiggle: "wiggle 0.5s ease-in-out",
        pulse2: "pulse2 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px) rotate(-3deg)" },
          "50%": { transform: "translateY(-18px) rotate(3deg)" },
        },
        wiggle: {
          "0%,100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-8deg)" },
          "75%": { transform: "rotate(8deg)" },
        },
        pulse2: {
          "0%,100%": { boxShadow: "0 0 20px rgba(255,184,0,0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(255,184,0,0.8)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
