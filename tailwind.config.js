/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#07080A',
          900: '#0B0C0E',
          850: '#111317',
          800: '#171A20',
          700: '#222730',
          600: '#323946',
        },
        smoke: {
          300: '#A4B8C8',
          400: '#8AA3B6',
          500: '#7C93A6',
          600: '#647A8D',
          700: '#4D6173',
        },
        paper: {
          50: '#FFFFFF',
          100: '#F9F9F8',
          200: '#F4F4F2',
          300: '#E4E5E2',
          400: '#C8CCC9',
        }
      },
      fontFamily: {
        serif: ['"SuisseWorks"', 'Georgia', 'serif'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
        widest: '0.18em',
      }
    },
  },
  plugins: [],
}
