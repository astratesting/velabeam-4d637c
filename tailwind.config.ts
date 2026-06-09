import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./styles/**/*.{css}",
  ],
  theme: {
    extend: {
      colors: {
        vb: {
          bg: "#FBF7F2",
          surface: "#FFFFFF",
          violet: "#6B4FE0",
          coral: "#FF6B5B",
          honey: "#F5B544",
          ink: "#1B1530",
          mute: "#6B6480",
          line: "#ECE6DE",
        },
      },
      fontFamily: {
        heading: ["Manrope", "sans-serif"],
        body: ["Source Sans 3", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        input: "12px",
        pill: "999px",
      },
      boxShadow: {
        warm: "0 8px 24px rgba(107, 79, 224, 0.08)",
        "warm-lg": "0 16px 48px rgba(107, 79, 224, 0.12)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        confetti: {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(100vh) rotate(720deg)", opacity: "0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-in": "fade-in 0.4s ease-in-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        confetti: "confetti 2s ease-in forwards",
      },
    },
  },
  plugins: [],
};

export default config;
