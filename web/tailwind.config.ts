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
        landing: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
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
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh': 'radial-gradient(at 40% 20%, rgba(99, 102, 241, 0.18) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(168, 85, 247, 0.08) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(59, 130, 246, 0.06) 0px, transparent 50%)',
      },
      boxShadow: {
        'wow-gold': '0 0 32px rgba(212, 175, 55, 0.2)',
        'wow-card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.25)',
        'soft': '0 4px 24px rgba(0, 0, 0, 0.12)',
        'glow': '0 0 60px rgba(99, 102, 241, 0.15)',
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
