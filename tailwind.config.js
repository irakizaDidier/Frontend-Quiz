/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  corePlugins: {
    preflight: false,
  },
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
