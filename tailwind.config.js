/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
    },
    colors: {
      primary: '#f76808',
      black: '#000000',
      white: '#ededed',
      gray: '#707070',
      dark: '#2e2e2e',
    },
  },
  plugins: [],
}
