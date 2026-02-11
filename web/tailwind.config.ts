import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        wow: {
          dark: '#0a0c0f',
          card: '#12161c',
          'card-hover': '#1a1f28',
          border: '#2a3140',
          gold: '#d4af37',
          'gold-dim': '#b8962e',
          'gold-light': '#e8c547',
        },
      },
      fontFamily: {
        display: ['var(--font-cinzel)', 'Cinzel', 'Georgia', 'serif'],
        body: ['var(--font-crimson)', 'Crimson Text', 'Georgia', 'serif'],
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      backgroundImage: {
        'wow-gradient': 'linear-gradient(135deg, rgba(212, 175, 55, 0.12) 0%, transparent 50%)',
        'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(212, 175, 55, 0.15), transparent 50%)',
      },
      boxShadow: {
        'wow-gold': '0 0 32px rgba(212, 175, 55, 0.2)',
        'wow-card': '0 4px 24px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
}

export default config
