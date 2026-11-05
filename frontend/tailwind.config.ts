import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0B121C',
          DEFAULT: '#111C2B', // Primary midnight navy
          800: '#172538',
          700: '#202B38', // Charcoal
        },
        ivory: {
          DEFAULT: '#F5F1E8', // Warm ivory
          light: '#FAF8F3',
          dark: '#EAE4D5',
        },
        gold: {
          DEFAULT: '#C5A35A', // Muted gold
          light: '#D4B979',
          dark: '#A98740',
        },
        charcoal: {
          DEFAULT: '#202B38',
          light: '#354355',
          dark: '#141C25',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-.075em',
        tighter: '-.05em',
        tight: '-.025em',
        normal: '0',
        wide: '.025em',
        wider: '.05em',
        widest: '.15em',
        editorial: '.2em',
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(17, 28, 43, 0.04)',
        'card': '0 4px 20px -2px rgba(17, 28, 43, 0.06)',
        'card-hover': '0 12px 30px -4px rgba(17, 28, 43, 0.12)',
        'modal': '0 20px 50px -10px rgba(17, 28, 43, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;

