/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'graphite': {
          100: '#1a1a1a',
          200: '#212121',
          300: '#2a2a2a',
          400: '#333333',
          500: '#0d0d0d',
          800: '#1f1f1f',
          900: '#171717',
          950: '#0f0f0f',
        },
        'gray': {
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
        },
        'blue': {
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
        },
        'telegram': '#0088cc',
        'discord': '#5865F2',
      },
      fontFamily: {
        zed: ['Science Gothic', 'sans-serif'],
        raleway: ['Science Gothic', 'sans-serif'],
        display: ['Science Gothic', 'sans-serif'],
        science: ['Science Gothic', 'sans-serif'],
      },
      animation: {
        'smooth': 'smooth 0.3s ease-in-out',
      },
      keyframes: {
        smooth: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

