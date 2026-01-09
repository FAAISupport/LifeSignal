/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tailwind v4: define colors with <alpha-value> so /10 /15 /25 works
        "brand-navy": "rgb(11 27 58 / <alpha-value>)",
        "brand-blue": "rgb(37 99 235 / <alpha-value>)",
        "brand-lavender": "rgb(199 195 255 / <alpha-value>)",
        "brand-mist": "rgb(245 247 255 / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
