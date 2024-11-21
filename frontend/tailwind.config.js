/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      backgroundColor: {
        'black/50': 'rgba(0, 0, 0, 0.5)',
      },
      maxWidth: {
        '7xl': '80rem',
      },
      keyframes: {
        rotate: {
          '100%': { transform: 'rotateY(360deg) rotateX(360deg)' }
        }
      },
      animation: {
        rotate: 'rotate 14s infinite linear'
      }
    }
  },
  plugins: [],
}
