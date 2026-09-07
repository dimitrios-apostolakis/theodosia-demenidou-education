import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        banana: {
          50: "#FEFCE8",
          100: "#FEF9C3",
          200: "#FEF08A",
          300: "#FDE047",
          400: "#FACC15",
          500: "#EAB308",
          600: "#CA8A04",
          700: "#A16207",
        },
        kid: {
          blue: "#38BDF8",
          sky: "#7DD3FC",
          indigo: "#6366F1",
          purple: "#A855F7",
          pink: "#EC4899",
          coral: "#FB7185",
          orange: "#FB923C",
          yellow: "#FBBF24",
          green: "#4ADE80",
          emerald: "#10B981",
          mint: "#6EE7B7",
        },
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "'Comic Neue'", "'Fredoka'", "'Segoe UI'", "Roboto", "sans-serif"],
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "float-delayed": "float 3s ease-in-out 1.5s infinite",
        "float-slow": "float 5s ease-in-out infinite",
        "wiggle": "wiggle 1s ease-in-out infinite",
        "bounce-soft": "bounceSoft 2s infinite",
        "pulse-glow": "pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 12s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 15px rgba(250, 204, 21, 0.6))" },
          "50%": { opacity: ".85", filter: "drop-shadow(0 0 5px rgba(250, 204, 21, 0.3))" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
