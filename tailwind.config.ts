import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "fem-orange": "#FF7E35",
        "fem-soft-orange": "#FFF1E9",
        "fem-green": "#2FD887",
        "fem-soft-green": "#E0FDEF",
        "fem-blue": "#306AFF",
        "fem-soft-blue": "#EBF0FF",
        "fem-purple": "#A729F5", // This is the bright purple color
        "fem-soft-purple": "#F6E7FF",
        "fem-pure-white": "#FFFFFF", // Pure white
        "fem-dark-navy": "#313E51", // A very dark blue-grey, black
        "fem-grey-navy": "#626C7F", // A lighter shade of blue-grey
        "fem-light-grey": "#F4F6FA", // A very light grey, nearly white
        "fem-navy": "#3B4D66", // A medium dark blue-grey
        "fem-light-bluish": "#ABC1E1", // A very pale, soft blue
        "fem-translucent-blue": "#F4F6FA",
        green: "#26D782", // A bright, vivid green
        red: "#EE5454", // A bright salmon red
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        rubik: ["var(--font-rubik)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
