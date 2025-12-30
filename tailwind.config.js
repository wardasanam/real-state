/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom Keyframes matching the GlobalStyles in RealEstateApp.jsx
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        shine: {
          '0%': { left: '-100%', opacity: '0' },
          '20%': { left: '100%', opacity: '0.6' },
          '100%': { left: '100%', opacity: '0' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(40px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'gradient-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      },
      // Custom Animation Utilities
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 7s ease-in-out infinite 1s',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'gradient-flow': 'gradient-flow 4s linear infinite',
        // Note: The 'shine' animation is usually applied to an ::after pseudo-element
        // via a custom plugin or utility class in CSS, as configured in index.css below.
      },
    },
  },
  plugins: [],
}