/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgdark: '#121212',
        carddark: '#1E1E1E',
        accentblue: '#3B82F6',
        actionred: '#EF4444',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}