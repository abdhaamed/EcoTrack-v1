import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "deep-forest": "var(--primary-700)",
        "veridian-leaf": "var(--primary-500)",
        "sapling-green": "var(--primary-100)",
        parchment: "var(--surface)",
        bone: "var(--surface-container)",
        charcoal: "var(--on-surface)",
        mist: "var(--neutral-500)",
        "feedback-success": "var(--primary-500)",
        "feedback-error": "var(--color-error)",
        "feedback-link": "var(--primary-700)",
        primary: "var(--primary-700)",
        secondary: "var(--primary-500)",
        background: "var(--surface)",
        faint: "var(--primary-100)",
        surface: "var(--surface)",
        container: "var(--surface-container)",
        text: "var(--on-surface)",
        muted: "var(--neutral-500)",
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
