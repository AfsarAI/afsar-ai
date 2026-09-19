/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0b0d11',
        foreground: '#f3f4f6',
        muted: '#949ca8',
        subtle: '#636b79',
        surface: {
          1: '#13161c',
          2: '#1a1e26',
          3: '#242934',
        },
        border: {
          DEFAULT: '#222733',
          subtle: '#191d26',
          hover: '#323846',
        },
        accent: {
          DEFAULT: '#6366f1',
          light: '#818cf8',
          dark: '#4f46e5',
          muted: 'rgba(99, 102, 241, 0.12)',
        },
        emerald: {
          DEFAULT: '#10b981',
          light: '#34d399',
          dark: '#059669',
          muted: 'rgba(16, 185, 129, 0.12)',
        },
        cyan: {
          DEFAULT: '#0ea5e9',
          light: '#38bdf8',
          dark: '#0284c7',
          muted: 'rgba(14, 165, 233, 0.12)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },
    },
  },
  plugins: [],
};
