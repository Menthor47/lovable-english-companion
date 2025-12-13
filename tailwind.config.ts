import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        heading: ["Outfit", "sans-serif"],
        body: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        border: "hsl(from var(--border) h s l / <alpha-value>)",
        input: "hsl(from var(--input) h s l / <alpha-value>)",
        ring: "hsl(from var(--ring) h s l / <alpha-value>)",
        background: "hsl(from var(--background) h s l / <alpha-value>)",
        foreground: "hsl(from var(--foreground) h s l / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(from var(--primary) h s l / <alpha-value>)",
          foreground: "hsl(from var(--primary-foreground) h s l / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(from var(--secondary) h s l / <alpha-value>)",
          foreground: "hsl(from var(--secondary-foreground) h s l / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(from var(--destructive) h s l / <alpha-value>)",
          foreground: "hsl(from var(--destructive-foreground) h s l / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(from var(--muted) h s l / <alpha-value>)",
          foreground: "hsl(from var(--muted-foreground) h s l / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(from var(--accent) h s l / <alpha-value>)",
          foreground: "hsl(from var(--accent-foreground) h s l / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(from var(--popover) h s l / <alpha-value>)",
          foreground: "hsl(from var(--popover-foreground) h s l / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(from var(--card) h s l / <alpha-value>)",
          foreground: "hsl(from var(--card-foreground) h s l / <alpha-value>)",
        },
        glow: {
          primary: "hsl(from var(--glow-primary) h s l / <alpha-value>)",
          secondary: "hsl(from var(--glow-secondary) h s l / <alpha-value>)",
        },
        surface: {
          glass: "hsl(from var(--surface-glass) h s l / <alpha-value>)",
        },
        sidebar: {
          DEFAULT: "hsl(from var(--sidebar-background) h s l / <alpha-value>)",
          foreground: "hsl(from var(--sidebar-foreground) h s l / <alpha-value>)",
          primary: "hsl(from var(--sidebar-primary) h s l / <alpha-value>)",
          "primary-foreground": "hsl(from var(--sidebar-primary-foreground) h s l / <alpha-value>)",
          accent: "hsl(from var(--sidebar-accent) h s l / <alpha-value>)",
          "accent-foreground": "hsl(from var(--sidebar-accent-foreground) h s l / <alpha-value>)",
          border: "hsl(from var(--sidebar-border) h s l / <alpha-value>)",
          ring: "hsl(from var(--sidebar-ring) h s l / <alpha-value>)",
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
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(var(--primary) / 0.3)" },
          "50%": { boxShadow: "0 0 40px hsl(var(--primary) / 0.6)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-in-up": "slide-in-up 0.5s ease-out forwards",
        "slide-in-left": "slide-in-left 0.5s ease-out forwards",
        "slide-in-right": "slide-in-right 0.5s ease-out forwards",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        marquee: "marquee 25s linear infinite",
        "marquee-reverse": "marquee-reverse 25s linear infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
