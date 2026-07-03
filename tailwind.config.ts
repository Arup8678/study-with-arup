import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background-rgb) / <alpha-value>)",
        foreground: "rgb(var(--foreground-rgb) / <alpha-value>)",
        brand: {
          primary: "var(--primary-hex)",
          dark: "var(--dark-blue-hex)",
          accent: "var(--accent-orange-hex)",
          success: "var(--success-green-hex)",
        },
        card: {
          DEFAULT: "var(--card-bg)",
          foreground: "var(--card-fg)",
        },
        border: "var(--border-color)",
      },
      borderRadius: {
        xl: "24px",
        lg: "16px",
        md: "12px",
        sm: "8px",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        premium: "0 10px 30px -10px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.02)",
        'premium-hover': "0 20px 40px -15px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.06)",
        'glass-dark': "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
    },
  },
  plugins: [],
};
export default config;
