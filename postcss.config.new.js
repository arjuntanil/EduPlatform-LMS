/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: {
    'tailwindcss/nesting': {},   // nesting support
    '@tailwindcss/postcss': {},  // new correct Tailwind PostCSS plugin
    autoprefixer: {},            // autoprefixer
  },
};
