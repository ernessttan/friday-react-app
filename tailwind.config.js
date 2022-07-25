/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "orange-400": "#D38B6E",
        "orange-300": "#DEAA96",
        "grey-500": "#BDBDBD",
        "grey-200": "#F5F5F5",

      }
    },
  },
  plugins: [],
}
