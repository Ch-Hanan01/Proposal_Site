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
        midnight: '#0f051d',
        deepRose: '#1f0a1e',
        romanticWine: '#3a0c27',
        roseGold: '#e0a96d',
        champagne: '#f7e7ce',
        velvetRed: '#d90429',
        glassBorder: 'rgba(255, 255, 255, 0.12)',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        handwritten: ['var(--font-great-vibes)', 'cursive'],
        sans: ['var(--font-plus-jakarta)', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'sparkle': 'sparkle 2s infinite ease-in-out',
        'music-note': 'floatNote 3s ease-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'blur(20px)' },
          '50%': { opacity: '0.8', filter: 'blur(30px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        floatNote: {
          '0%': { opacity: '1', transform: 'translateY(0) scale(0.8)' },
          '100%': { opacity: '0', transform: 'translateY(-40px) scale(1.2)' },
        },
      },
      backgroundImage: {
        'romantic-gradient': 'radial-gradient(ellipse at top, #2b0b28 0%, #0d0414 100%)',
        'gold-gradient': 'linear-gradient(135deg, #e0a96d 0%, #f7e7ce 50%, #c48b4b 100%)',
      },
    },
  },
  plugins: [],
};
