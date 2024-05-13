const { fontFamily } = require('tailwindcss/defaultTheme');
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-outfit)', ...fontFamily.sans],
      },
      backgroundImage: {
        "sparkel-button-bg": "linear-gradient(180deg, #14F3C5 0%, #00B390 100%)"
      },
      colors: {
        'aqua': {
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
        'black': {
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
      }
    },
  },
  plugins: [
    require('@gradin/tailwindcss-scrollbar')({
      size: '5px', // width or height, default '5px'
      track: {
        background: 'transparent', // default '#f1f1f1'
        // add other css attributes here,
        // will be merged to ::-webkit-scrollbar-track
      },
      thumb: {
        background: '#334155', // default '#c1c1c1'
        borderRadius: '40px',

        // add other css attributes here,
        // will be merged to ::-webkit-scrollbar-thumb
      },
      hover: {
        background: '#64748B', // default '#a8a8a8'
        borderRadius: '40px',
        // add other css attributes here,
        // will be merged to ::-webkit-scrollbar-thumb:hover
      },
    }),
    require('@tailwindcss/typography'),
    nextui()
  ],
}
