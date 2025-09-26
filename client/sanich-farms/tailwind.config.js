/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '384px',
        // => @media (min-width: 384px) { ... }
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};