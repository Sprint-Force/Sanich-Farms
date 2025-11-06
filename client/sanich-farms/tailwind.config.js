/* eslint-env node */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',    // Extra small devices (phones in portrait)
        'sm': '640px',    // Small devices (landscape phones)
        'md': '768px',    // Medium devices (tablets)
        'lg': '1024px',   // Large devices (small laptops)
        'xl': '1280px',   // Extra large devices (large laptops/desktops)
        '2xl': '1536px',  // 2X large devices (large desktops)
        // Custom breakpoints for specific devices
        'mobile': {'max': '767px'}, // Target mobile devices specifically
        'tablet': {'min': '768px', 'max': '1023px'}, // Target tablets specifically
        'desktop': {'min': '1024px'}, // Target desktop and above
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],     // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
      },
      spacing: {
        '18': '4.5rem',   // 72px - useful for touch targets
        '22': '5.5rem',   // 88px
      },
      minHeight: {
        'touch': '44px',  // Minimum touch target size for accessibility
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};