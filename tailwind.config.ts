import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "deep-forest": "#154232",
        "veridian-leaf": "#3C6A09",
        "sapling-green": "#BCF1AE",
        parchment: "#F5F5F0",
        bone: "#EEEEE9",
        charcoal: "#1C1C1B",
        mist: "#A7A799",
        "feedback-success": "#3C6A09",
        "feedback-error": "#CC3300",
        "feedback-link": "#154232",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        background: "var(--color-surface)",
        faint: "var(--color-faint)",
        surface: "var(--color-surface)",
        container: "var(--color-container)",
        text: "var(--color-text)",
        muted: "var(--color-muted)",
        error: "var(--color-error)",
      },
      borderRadius: {
        card: "16px",
        input: "10px",
        btn: "999px",
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)", "sans-serif"],
        serif: ["var(--font-merriweather)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
