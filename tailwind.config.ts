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
        // LifeSignal brand palette
        "brand-navy": "#0B1B3A",
        "brand-blue": "#2563EB",
        "brand-lavender": "#C7C3FF",
        "brand-mist": "#F5F7FF",
      },
    },
  },
  plugins: [],
};

export default config;
