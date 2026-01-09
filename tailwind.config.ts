import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Use <alpha-value> so /10 /15 /25 modifiers work in Tailwind v4
        "brand-navy": "rgb(11 27 58 / <alpha-value>)",
        "brand-blue": "rgb(37 99 235 / <alpha-value>)",
        "brand-lavender": "rgb(199 195 255 / <alpha-value>)",
        "brand-mist": "rgb(245 247 255 / <alpha-value>)",
      },
    },
  },
  plugins: [],
};

export default config;
