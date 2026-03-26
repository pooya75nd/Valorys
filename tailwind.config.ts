/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Important pour le mode sombre/clair
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          deep: '#0a0a0f',
        },
        gold: {
          300: '#f0d68a',
          400: '#e8c46a',
          500: '#d4a017',
          600: '#b8860b',
          700: '#9a7230',
        },
      },
    },
  },
  plugins: [],
}
