/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        neon:
          '0 0 0 1px rgba(34,197,94,0.35), 0 0 22px rgba(34,197,94,0.22), 0 0 46px rgba(239,68,68,0.12)',
        neonLg:
          '0 0 0 1px rgba(34,197,94,0.35), 0 0 34px rgba(34,197,94,0.28), 0 0 70px rgba(239,68,68,0.14)',
      },
      backgroundImage: {
        cyberGrid:
          'linear-gradient(to right, rgba(34,197,94,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(239,68,68,0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        cyberGrid: '28px 28px',
      },
      keyframes: {
        glitchShift: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '20%': { transform: 'translate(-1px, 1px)' },
          '40%': { transform: 'translate(1px, -1px)' },
          '60%': { transform: 'translate(-1px, -1px)' },
          '80%': { transform: 'translate(1px, 1px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-120%)' },
          '100%': { transform: 'translateY(120%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        glitch: 'glitchShift 1.15s infinite steps(2, end)',
        scan: 'scan 4.6s linear infinite',
        pulseSoft: 'pulseSoft 2.4s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.75s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
