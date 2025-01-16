/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(calc(-100% - var(--gap)))' },
          '100%': { transform: 'translateX(0)' },
        },
        shine: {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        },
        'shiny-text': {
          '0%, 90%, 100%': {
            'background-position': 'calc(-100% - var(--shiny-width)) 0',
          },
          '30%, 60%': {
            'background-position': 'calc(100% + var(--shiny-width)) 0',
          },
        },
        orbit: {
          '0%': {
            transform: 'rotate(calc(var(--angle) * 1deg)) translateY(calc(var(--radius) * 1px)) rotate(calc(var(--angle) * -1deg))',
          },
          '100%': {
            transform: 'rotate(calc(var(--angle) * 1deg + 360deg)) translateY(calc(var(--radius) * 1px)) rotate(calc((var(--angle) * -1deg) - 360deg))',
          },
        },
        'countdown-flip': {
          '0%': { transform: 'rotateX(0deg)' },
          '100%': { transform: 'rotateX(360deg)' },
        },
        'button-shine': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        'spin-around': {
          '0%': {
            transform: 'translateZ(0) rotate(0)',
          },
          '15%, 35%': {
            transform: 'translateZ(0) rotate(90deg)',
          },
          '65%, 85%': {
            transform: 'translateZ(0) rotate(270deg)',
          },
          '100%': {
            transform: 'translateZ(0) rotate(360deg)',
          },
        },
        'shimmer-slide': {
          to: {
            transform: 'translate(calc(100cqw - 100%), 0)',
          },
        },
        gradient: {
          to: {
            backgroundPosition: "var(--bg-size) 0",
          },
        },
      },
      animation: {
        marquee: 'marquee var(--duration, 40s) linear infinite',
        'marquee-reverse': 'marquee-reverse var(--duration, 40s) linear infinite',
        shine: 'shine 8s ease-in-out infinite',
        'shiny-text': 'shiny-text 8s ease-in-out infinite',
        orbit: 'orbit calc(var(--duration)*1s) linear infinite',
        'countdown-flip': 'countdown-flip 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955)',
        'button-shine': 'button-shine 3s linear infinite',
        'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear',
        'shimmer-slide': 'shimmer-slide var(--speed) ease-in-out infinite alternate',
        gradient: 'gradient 8s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'button-gradient': 'linear-gradient(to right, #3b82f6, #8b5cf6, #3b82f6)',
      },
    },
  },
  plugins: [],
} 