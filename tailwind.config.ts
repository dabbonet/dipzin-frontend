import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#14F3C5',
          foreground: '#00342E',
        },
        secondary: {
          DEFAULT: '#00342E',
          foreground: '#14F3C5',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        aqua: {
          50: '#e9fff8',
          100: '#c9ffed',
          200: '#98ffe1',
          300: '#37ffcf',
          400: '#14f3c5',
          500: '#00dbae',
          600: '#00b390',
          700: '#008f77',
          800: '#007160',
          900: '#005c50',
          950: '#00342e',
        },
        black: {
          50: '#f4f5f7',
          100: '#e2e4eb',
          200: '#c9ccd8',
          300: '#a3a7bd',
          400: '#767c9a',
          500: '#5a5f80',
          600: '#4e516c',
          700: '#43455b',
          800: '#3c3d4e',
          900: '#363743',
          950: '#030304',
        },
        danger: {
          400: "#D9214E",
          500: "#EF4444"
        },
        'slate-950': '#020617'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;

export default config;
