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
        background: "#07090D",
        surface: {
          50: "#1A202C",
          100: "#141A24",
          200: "#0F141D",
          300: "#0A0D14",
          DEFAULT: "#0D1117",
        },
        phoenix: {
          cyan: "#00F0FF",
          blue: "#0070F3",
          cobalt: "#1E40AF",
          ice: "#A5F3FC",
          ember: "#FF4500",
          flame: "#FF6B00",
          crimson: "#DC2626",
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        display: [
          'Cabinet Grotesk',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'ui-monospace',
          'SFMono-Regular',
          'monospace',
        ],
      },
      boxShadow: {
        'glow-cyan': '0 0 35px -5px rgba(0, 240, 255, 0.35)',
        'glow-blue': '0 0 35px -5px rgba(0, 112, 243, 0.4)',
        'glow-ember': '0 0 35px -5px rgba(255, 69, 0, 0.35)',
        'inner-glow': 'inset 0 0 20px 0 rgba(0, 240, 255, 0.1)',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'grid-pattern': 'radial-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 6s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
      },
    },
  },
  plugins: [],
};
