/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          50: '#FAF6F1',
          100: '#F0E6D7',
          200: '#E2D1BB',
          300: '#D4BC9F',
          400: '#C6A783',
          500: '#B89267',
          600: '#8B7355', // main brand color
          700: '#6E5C44',
          800: '#514533',
          900: '#342D22',
        },
        sand: {
          50: '#FDFCFA',
          100: '#F7F3EA',
          200: '#F0E6D4',
          300: '#E8D9BE',
          400: '#E1CCA8',
          500: '#D9BF92',
        }
      },
      fontFamily: {
        sans: ['Spectral', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'smooth': '0 4px 6px -1px rgba(139, 115, 85, 0.05), 0 2px 4px -1px rgba(139, 115, 85, 0.03)',
        'smooth-lg': '0 10px 15px -3px rgba(139, 115, 85, 0.05), 0 4px 6px -2px rgba(139, 115, 85, 0.03)',
        'button': '0 2px 4px rgba(139, 115, 85, 0.1), 0 1px 2px rgba(139, 115, 85, 0.06)',
      },
      maxWidth: {
        'survey': '42rem',
      },
    },
  },
  plugins: [],
}