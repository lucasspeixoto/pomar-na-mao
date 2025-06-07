/** @type {import('tailwindcss').Config} */
import PrimeUI from 'tailwindcss-primeui';

export default {
  darkMode: ['selector', '[class="app-dark"]'],
  content: ['./src/**/*.{html,ts,scss,css}', './index.html'],
  plugins: [PrimeUI],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1920px',
    },
    extend: {
      keyframes: {
        borderWalk: {
          '0%': { clipPath: 'inset(0 100% 100% 0)' },
          '25%': { clipPath: 'inset(0 0 100% 0)' },
          '50%': { clipPath: 'inset(0 0 0 0)' },
          '75%': { clipPath: 'inset(0 0 0 100%)' },
          '100%': { clipPath: 'inset(100% 100% 0 100%)' },
        },
      },
      animation: {
        borderWalk: 'borderWalk 1.5s linear infinite',
      },
    },
  },
};
