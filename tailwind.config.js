/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        alfaSlabOne: ['Alfa Slab One', 'serif'],
        arvo: ['Arvo', 'serif'],
        slabo: ['Slabo 27px', 'serif'],
      },
      aspectRatio: {
        '3/4': '3 / 4',
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}