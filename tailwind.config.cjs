/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './resources/views/**/*.blade.php',
    './resources/js/**/*.{js,jsx,ts,tsx}',
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
  ],
  darkMode: 'class', // optional, if you want dark mode
  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f4f8fd',
          100: '#e9f2fc',
          200: '#c7def7',
          300: '#a5cbf2',
          400: '#62a3e9',
          500: '#1f7bdf',
          600: '#1c6fc9',
          700: '#175ca7',
          800: '#124986',
          900: '#0f3c6d',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // form plugin
  ],
};
