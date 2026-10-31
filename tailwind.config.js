/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Strict Color Palette Extracted from Logo
        background: {
          DEFAULT: "#050507", // Void Black
          primary: "#050507",
          elevated: "#0C0F14", // Surface Card
          card: "#0C0F14",
          glass: "rgba(12, 15, 20, 0.72)",
        },
        surface: {
          DEFAULT: "#0C0F14",
          card: "#0C0F14",
          elevated: "#11151C",
          glass: "rgba(12, 15, 20, 0.72)",
        },
        circuit: {
          cyan: "#48BDE8", // Primary Accent (AI text & inner circuits)
          amber: "#E6A12E", // Secondary Accent (Eagle eye & upper beak)
          gold: "#E6A12E",
          copper: "#D97236", // Tertiary Accent (Lower beak circuit trace)
        },
        text: {
          primary: "#F4F6F8", // Crisp White (CLUB text & feathers)
          muted: "#8A99AD", // Steel Grey
          dim: "#5B6876",
        },
        border: {
          DEFAULT: "rgba(72, 189, 232, 0.14)",
          hairline: "rgba(72, 189, 232, 0.14)", // Default hairline
          active: "rgba(230, 161, 46, 0.45)", // Active/Focus (Beak Gold)
          cyan: "rgba(72, 189, 232, 0.28)",
          amber: "rgba(230, 161, 46, 0.35)",
        },
        // Legacy aliases mapped to new strict brand palette
        phoenix: {
          blue: "#48BDE8",
          cyan: "#48BDE8",
          orange: "#E6A12E",
          red: "#D97236",
        },
        navy: {
          deep: "#0C0F14",
          surface: "#11151C",
        },
        primary: "#F4F6F8",
        secondary: "#8A99AD",
        muted: "#5B6876",
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Syne"', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
      boxShadow: {
        'circuit-cyan': '0 0 24px -2px rgba(72, 189, 232, 0.35)',
        'circuit-gold': '0 0 24px -2px rgba(230, 161, 46, 0.35)',
        'circuit-btn': '0 4px 20px -2px rgba(72, 189, 232, 0.4)',
        'glow-blue': '0 0 35px -5px rgba(72, 189, 232, 0.35)',
        'glow-cyan': '0 0 30px -5px rgba(72, 189, 232, 0.4)',
        'glow-orange': '0 0 30px -5px rgba(230, 161, 46, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.72)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
