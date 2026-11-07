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
        facility: {
          bg: '#171B19',
          primary: '#E9E7DD',
          secondary: '#B5B8AF',
          sage: '#A7B7A1',
          cyan: '#24BFEA',
          border: '#343B35',
        },
        graphite: {
          DEFAULT: '#171B1C',
          deep: '#121516',
          light: '#1d2223',
          void: '#0D1011',
        },
        charcoal: {
          DEFAULT: '#222828',
          subtle: '#293030',
          dark: '#1b2020',
          carbon: '#15191A',
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
        signal: {
          green: '#22C55E',
          amber: '#F59E0B',
          red: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['var(--font-space)', 'var(--font-inter)', 'Space Grotesk', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        display: ['var(--font-syne)', 'var(--font-space)', 'var(--font-archivo)', 'Syne', 'Space Grotesk', 'Archivo', 'sans-serif'],
        syne: ['var(--font-syne)', 'Syne', 'sans-serif'],
        space: ['var(--font-space)', 'Space Grotesk', 'sans-serif'],
        archivo: ['var(--font-syne)', 'var(--font-archivo)', 'Syne', 'Archivo', 'sans-serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.035em',
        tighter: '-0.025em',
        tight: '-0.015em',
      },
      borderColor: {
        hairline: 'rgba(255, 255, 255, 0.08)',
        subtle: 'rgba(255, 255, 255, 0.04)',
        strong: 'rgba(255, 255, 255, 0.14)',
      },
      boxShadow: {
        'glass-panel': '0 4px 20px 0 rgba(0, 0, 0, 0.28)',
        'sage-glow': '0 0 15px -3px rgba(162, 178, 159, 0.25)',
        'tactile': '0 2px 6px -1px rgba(0, 0, 0, 0.4)',
        'tactile-active': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
