/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        serenity: {
          50: '#f0f0ff', 100: '#e0e0ff', 200: '#c0c0ff', 300: '#a09fff',
          400: '#807fff', 500: '#6c5ce7', 600: '#5a4bd1', 700: '#483abb',
          800: '#362aa5', 900: '#24198f',
        },
        calm: { 400: '#81ecec', 500: '#00cec9', 600: '#00b8b3' },
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'float': 'float 20s ease-in-out infinite',
        'bounce-dot': 'bounceDot 1.4s infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0', transform: 'translateY(10px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        float: { '0%,100%': { transform: 'translate(0,0)' }, '50%': { transform: 'translate(0,-10px)' } },
        bounceDot: { '0%,60%,100%': { transform: 'translateY(0)', opacity: '0.3' }, '30%': { transform: 'translateY(-6px)', opacity: '1' } },
        pulseSoft: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.5' } },
      },
    },
  },
  plugins: [],
}
