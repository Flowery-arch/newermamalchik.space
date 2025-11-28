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
      fontFamily: {
        'neue-bold': ['var(--font-neue-bold)', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      screens: {
        sm: '640px', // Small devices
        md: '768px', // Medium devices
        lg: '1024px', // Large devices
        xl: '1280px', // Extra large devices
        '2xl': '1536px', // 2K (1440p)
        '3xl': '1920px', // Full HD (1080p)
        '4xl': '2560px', // 2.5K (1440p)
        '5xl': '3440px', // Ultra-wide 2K
        '6xl': '3840px', // 4K (2160p)
        '7xl': '5120px', // 5K
        '8xl': '7680px', // 8K
      },
      colors: {
        // Custom color palette
        'dark-bg': '#0a0a0a',
        'card-bg': 'rgba(32, 32, 32, 0.5)',
        'card-border': 'rgba(255, 255, 255, 0.1)',
        'status-online': '#4ade80',
        'status-offline': '#ef4444',

        // Glass effect colors
        glass: {
          50: 'rgba(255, 255, 255, 0.05)',
          100: 'rgba(255, 255, 255, 0.1)',
          200: 'rgba(255, 255, 255, 0.2)',
          300: 'rgba(255, 255, 255, 0.3)',
          400: 'rgba(255, 255, 255, 0.4)',
          500: 'rgba(255, 255, 255, 0.5)',
        },

        // Brand colors
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

        // Gradient colors
        gradient: {
          'blue-purple': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          'pink-orange': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          'green-teal': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          'purple-pink': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        },
      },
      width: {
        60: '15rem', // 240px
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        themeTransition: 'themeTransition 500ms ease-in-out',
        typing: 'typing 3.5s steps(40, end)',
        blink: 'blink .75s step-end infinite',
        'fade-in-out': 'fadeInOut 3s ease-in-out forwards',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
        'gradient-shift': 'gradient-shift 6s ease-in-out infinite',
        'scale-up': 'scale-up 0.3s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'zoom-in': 'zoom-in 0.3s ease-out',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0) scale(1)',
            boxShadow: '0 0 0 rgba(0,0,0,0)',
          },
          '50%': {
            transform: 'translateY(-10px) scale(1.02)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          },
        },
        themeTransition: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        blink: {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: 'currentColor' },
        },
        fadeInOut: {
          '0%': {
            opacity: 0,
            transform: 'translate(-50%, 20px)',
          },
          '20%': {
            opacity: 1,
            transform: 'translate(-50%, 0)',
          },
          '80%': {
            opacity: 1,
            transform: 'translate(-50%, 0)',
          },
          '100%': {
            opacity: 0,
            transform: 'translate(-50%, -20px)',
          },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'scale-up': {
          '0%': { transform: 'scale(0.95)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'zoom-in': {
          '0%': { transform: 'scale(0.8)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
      gridTemplateColumns: {
        portfolio: '23% 50% 23%',
        'auto-fit': 'repeat(auto-fit, minmax(250px, 1fr))',
        'auto-fill': 'repeat(auto-fill, minmax(300px, 1fr))',
      },
      scale: {
        101: '1.01',
        102: '1.02',
        98: '0.98',
        95: '0.95',
        90: '0.9',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-mesh':
          'radial-gradient(at 40% 20%, rgb(120, 119, 198) 0px, transparent 50%), radial-gradient(at 80% 0%, rgb(255, 119, 198) 0px, transparent 50%), radial-gradient(at 0% 50%, rgb(255, 0, 128) 0px, transparent 50%)',
        'gradient-aurora': 'linear-gradient(45deg, #1e3c72 0%, #2a5298 50%, #1e3c72 100%)',
      },
      transitionDuration: {
        600: '600ms',
        800: '800ms',
        1200: '1200ms',
      },
      ringWidth: {
        2: '2px',
      },
      ringOpacity: {
        20: '0.2',
        10: '0.1',
        5: '0.05',
      },
      backdropBlur: {
        xs: '2px',
        '3xl': '64px',
      },
      boxShadow: {
        glow: '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.4)',
        'glow-purple': '0 0 20px rgba(147, 51, 234, 0.3)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.3)',
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.3)',
        'inner-glow': 'inset 0 0 20px rgba(59, 130, 246, 0.1)',
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [
    // Add custom utilities
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.glass-effect': {
          'backdrop-filter': 'blur(20px) saturate(180%)',
          'background-color': 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-effect-dark': {
          'backdrop-filter': 'blur(20px) saturate(180%)',
          'background-color': 'rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.text-shadow': {
          'text-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow-lg': {
          'text-shadow': '0 4px 8px rgba(0, 0, 0, 0.2)',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}
