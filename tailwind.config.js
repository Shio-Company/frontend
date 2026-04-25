/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        shio: {
          white: '#ffffff',
          gray: '#2d2d2d',
          black: '#000000',
        }
      },
      fontFamily: {
        maginia: ['Maginia', 'sans-serif'],
      }
    },
  },
  plugins: [],
}