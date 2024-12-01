/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  daisyui: {
    themes: ['forest', 'pastel'],
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':body', // The element that receives theme color CSS variables
  },
  darkMode: ['selector', '[data-theme="forest"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Nunito"'],
        serif: ['Open Sans'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
