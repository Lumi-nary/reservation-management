/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        29: '7.25rem', // 29 * 0.25rem = 7.25rem
        26: '6.5rem', // 26 * 0.25rem = 6.5rem
      },
    }
  },
  plugins: [],
}
