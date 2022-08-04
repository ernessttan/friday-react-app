/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'orange-500': '#CC7551',
        'orange-400': '#D38B6E',
        'orange-300': '#DEAA96',
        'orange-200': '#EACBBF',
        'orange-100': '#F1E9E7',
        'grey-500': '#BDBDBD',
        'grey-400': '#E0E0E0',
        'grey-300': '#EEEEEE',
        'grey-200': '#F5F5F5',
        'grey-100': '#FAFAFA',
        'red-100': '#FFB2B2',
        'yellow-100': '#FCF3CA',
        'green-100': '#C5EDCE',
      },
    },
  },
  plugins: [],
};
