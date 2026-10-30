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
        background: {
          DEFAULT: "#05070B",
          secondary: "#0A1018",
        },
        navy: {
          deep: "#0B1929",
          surface: "#0E1E32",
        },
        phoenix: {
          blue: "#147DFF",
          cyan: "#49D8FF",
          orange: "#FF7138",
          red: "#E64B45",
        },
        primary: "#F5F7FA",
        secondary: "#929EAD",
        muted: "#5B6876",
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
          accent: "rgba(20, 125, 255, 0.25)",
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow-blue': '0 0 50px -10px rgba(20, 125, 255, 0.45)',
        'glow-cyan': '0 0 40px -10px rgba(73, 216, 255, 0.35)',
        'glow-orange': '0 0 40px -10px rgba(255, 113, 56, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'noise-glow': 'radial-gradient(ellipse at 50% 0%, rgba(20, 125, 255, 0.12) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
};
