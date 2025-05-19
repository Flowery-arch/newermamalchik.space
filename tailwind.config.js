/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0a0a0a',
        'card-bg': 'rgba(32, 32, 32, 0.5)',
        'card-border': 'rgba(255, 255, 255, 0.1)',
        'status-online': '#4ade80',
        'status-offline': '#ef4444',
      },
      width: {
        '60': '15rem', // 240px
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'themeTransition': 'themeTransition 500ms ease-in-out',
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink .75s step-end infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        float: {
          '0%, 100%': { 
            transform: 'translateY(0) scale(1)',
            boxShadow: '0 0 0 rgba(0,0,0,0)'
          },
          '50%': { 
            transform: 'translateY(-5px) scale(1.02)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
          },
        },
        themeTransition: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 }
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' }
        },
        blink: {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: 'currentColor' }
        }
      },
      gridTemplateColumns: {
        'portfolio': '23% 50% 23%',
      },
      scale: {
        '101': '1.01',
        '98': '0.98',
        '95': '0.95',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      transitionDuration: {
        '600': '600ms',
      },
      ringWidth: {
        '2': '2px',
      },
      ringOpacity: {
        '20': '0.2',
        '10': '0.1',
      },
    },
  },
  plugins: [],
} 