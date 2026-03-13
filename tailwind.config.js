/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        aionNavy: "#111827",
        aionBlue: "#06b6d4",
        aionWhite: "#FFFFFF",
        aionGray: "#9ca3af",
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        aurora: "aurora 15s ease-in-out infinite",
        hubOrbitRotate: "hubOrbitRotate 20s linear infinite",
        hubElementPulse: "hubElementPulse 3s ease-in-out infinite",
        hubCenterPulse: "hubCenterPulse 2s ease-in-out infinite alternate",
        hubTorusPulse: "hubTorusPulse 4s ease-in-out infinite",
        hubSubtleGlow: "hubSubtleGlow 3s ease-in-out infinite",
      },
      keyframes: {
        aurora: {
          "0%": { backgroundPosition: "50% 50%, 50% 50%" },
          "50%": { backgroundPosition: "90% 10%, 10% 90%" },
          "100%": { backgroundPosition: "50% 50%, 50% 50%" },
        },
        hubOrbitRotate: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        hubElementPulse: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(0.92)" },
        },
        hubCenterPulse: {
          "0%": { opacity: "0.6", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1.1)" },
        },
        hubTorusPulse: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.5" },
        },
        hubSubtleGlow: {
          "0%, 100%": { filter: "drop-shadow(0 0 4px rgba(34, 211, 238, 0.2))" },
          "50%": { filter: "drop-shadow(0 0 8px rgba(34, 211, 238, 0.35))" },
        },
      },
    },
  },
  plugins: [],
};
