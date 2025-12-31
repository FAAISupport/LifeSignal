import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#2F6FED",
          navy: "#0B1B3A",
          lavender: "#B9A7E6",
          mist: "#EAF2FF",
          fog: "#F6F7FB"
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(11,27,58,0.10)",
        glow: "0 10px 30px rgba(47,111,237,0.18)"
      }
    }
  },
  plugins: []
} satisfies Config;
