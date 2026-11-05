import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        oxblood: {
          DEFAULT: '#5a0c1a',
          dark: '#420712',
          light: '#741224',
        },
        wine: {
          DEFAULT: '#741224',
          dark: '#5a0c1a',
          light: '#911b32',
        },
        charcoal: {
          DEFAULT: '#111827',
          dark: '#0a0e17',
          light: '#1f2937',
          muted: '#4b5563',
        },
        bone: {
          DEFAULT: '#fbf9f5',
          dark: '#ece7dc',
          light: '#ffffff',
          muted: '#dcd5c7',
        },
        brass: {
          DEFAULT: '#c59b3f',
          dark: '#a67f2e',
          light: '#dfba65',
        },
        // Admin and backwards compatibility aliases
        gold: {
          DEFAULT: '#c59b3f',
          dark: '#a67f2e',
          light: '#dfba65',
        },
        navy: {
          DEFAULT: '#1e293b',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
        },
        ivory: {
          DEFAULT: '#fbf9f5',
          light: '#ffffff',
          dark: '#ece7dc',
        },
      },
      fontFamily: {
        serif: ['var(--font-cinzel)', 'Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        display: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Inter', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 1px 4px rgba(17, 24, 39, 0.05)',
        card: '0 4px 20px -2px rgba(17, 24, 39, 0.06)',
        'card-hover': '0 16px 36px -4px rgba(90, 12, 26, 0.12)',
        modal: '0 25px 50px -12px rgba(10, 14, 23, 0.35)',
        brass: '0 4px 20px rgba(197, 155, 63, 0.25)',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
};

export default config;
