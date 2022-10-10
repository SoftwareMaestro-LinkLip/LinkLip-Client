const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        signiture: '#00FF7F',
        bg_gray: '#F9FAFA',
      },
      spacing: {
        1000: '78rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar-hide')],
};
