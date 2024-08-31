/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-', // Add this to prefix all Tailwind classes
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        '9/16': '9 / 16',
      },
    },
  },
  plugins: [],
}
