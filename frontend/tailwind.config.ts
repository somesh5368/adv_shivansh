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
        oxblood: {
          DEFAULT: '#4a0e1a',
          dark: '#350912',
          light: '#5d1222',
        },
        wine: {
          DEFAULT: '#6b1426',
          dark: '#520e1c',
          light: '#831930',
        },
        charcoal: {
          DEFAULT: '#1a1214',
          dark: '#0e090a',
          light: '#281c20',
          muted: '#3d2f33',
        },
        bone: {
          DEFAULT: '#efe9df',
          dark: '#dfd7c9',
          light: '#fbf9f5',
          muted: '#cbc2b2',
        },
        brass: {
          DEFAULT: '#c9a24b',
          dark: '#a88334',
          light: '#dec073',
        },
        // Backwards compatibility mappings for admin components
        gold: {
          DEFAULT: '#c9a24b',
          dark: '#a88334',
          light: '#dec073',
        },
        navy: {
          DEFAULT: '#4a0e1a',
          900: '#1a1214',
          800: '#281c20',
          700: '#350912',
        },
        ivory: {
          DEFAULT: '#efe9df',
          light: '#fbf9f5',
          dark: '#dfd7c9',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-worksans)', 'Work Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-.075em',
        tighter: '-.05em',
        tight: '-.025em',
        normal: '0',
        wide: '.025em',
        wider: '.05em',
        widest: '.15em',
        editorial: '.22em',
      },
      boxShadow: {
        subtle: '0 2px 10px rgba(26, 18, 20, 0.05)',
        card: '0 4px 24px -2px rgba(26, 18, 20, 0.08)',
        'card-hover': '0 16px 36px -4px rgba(74, 14, 26, 0.16)',
        modal: '0 25px 60px -12px rgba(14, 9, 10, 0.45)',
        brass: '0 0 25px rgba(201, 162, 75, 0.25)',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
};

export default config;
