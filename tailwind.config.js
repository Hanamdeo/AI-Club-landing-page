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
        graphite: {
          DEFAULT: '#171B1C',
          deep: '#121516',
          light: '#1d2223',
        },
        charcoal: {
          DEFAULT: '#222828',
          subtle: '#293030',
          dark: '#1b2020',
        },
        slate: {
          struct: '#343D3C',
          beam: '#3F4A49',
          hairline: '#4A5655',
        },
        sage: {
          DEFAULT: '#A2B29F',
          muted: '#8D9E8A',
          glow: '#B6C4B4',
          dim: '#5E6B5D',
        },
        ivory: {
          DEFAULT: '#E6E2D8',
          warm: '#F2EFE8',
          dim: '#C4C0B6',
        },
        warmwhite: '#FFF8EE',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'glass-panel': '0 8px 32px 0 rgba(0, 0, 0, 0.35)',
        'sage-glow': '0 0 25px -5px rgba(162, 178, 159, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
