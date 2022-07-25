/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "orange-500": "#CC7551",
        "orange-400": "#D38B6E",
        "orange-300": "#DEAA96",
        "orange-200": "#EACBBF",
        "grey-500": "#BDBDBD",
        "grey-400": "#E0E0E0",
        "grey-300": "#EEEEEE",
        "grey-200": "#F5F5F5",
      },
    },
  },
  plugins: [],
};
