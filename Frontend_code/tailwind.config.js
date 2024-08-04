/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'goldenrod': '#C49F09',
        'goldenrod-darker': '#A98308'
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover'], 
    },
  },
  plugins: [],
}
