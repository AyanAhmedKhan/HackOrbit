import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // All color variants for text
    {
      pattern:
        /text-(purple|blue|indigo|emerald|cyan|orange|teal|yellow|pink|green|violet|red|sky|rose)-(100|200|300|400)/,
    },
    {
      pattern:
        /text-(purple|blue|indigo|emerald|cyan|orange|teal|yellow|pink|green|violet|red|sky|rose)-(100|200|300|400)\/80/,
    },
    {
      pattern:
        /text-(purple|blue|indigo|emerald|cyan|orange|teal|yellow|pink|green|violet|red|sky|rose)-(100|200|300|400)\/60/,
    },

    // All color variants for borders
    {
      pattern:
        /border-(purple|blue|indigo|emerald|cyan|orange|teal|yellow|pink|green|violet|red|sky|rose)-(300|400|500)/,
    },
    {
      pattern:
        /border-(purple|blue|indigo|emerald|cyan|orange|teal|yellow|pink|green|violet|red|sky|rose)-(300|400|500)\/30/,
    },
    {
      pattern:
        /border-(purple|blue|indigo|emerald|cyan|orange|teal|yellow|pink|green|violet|red|sky|rose)-(300|400|500)\/50/,
    },
    {
      pattern:
        /border-(purple|blue|indigo|emerald|cyan|orange|teal|yellow|pink|green|violet|red|sky|rose)-(300|400|500)\/60/,
    },

    // All color variants for backgrounds
    {
      pattern: /bg-(purple|blue|indigo|emerald|cyan|orange|teal|yellow|pink|green|violet|red|sky|rose)-(400|500)/,
    },
    {
      pattern: /bg-(purple|blue|indigo|emerald|cyan|orange|teal|yellow|pink|green|violet|red|sky|rose)-(400|500)\/10/,
    },
    {
      pattern: /bg-(purple|blue|indigo|emerald|cyan|orange|teal|yellow|pink|green|violet|red|sky|rose)-(400|500)\/20/,
    },

    // Gradient from colors
    {
      pattern: /from-(purple|blue|indigo|emerald|cyan|orange|teal|yellow|pink|green|violet|red|sky|rose)-(300|400|500)/,
    },

    // Gradient to colors
    {
      pattern: /to-(purple|blue|indigo|emerald|cyan|orange|teal|yellow|pink|green|violet|red|sky|rose)-(300|400|500)/,
    },

    // Hover states for text
    {
      pattern:
        /hover:text-(purple|blue|indigo|emerald|cyan|orange|teal|yellow|pink|green|violet|red|sky|rose)-(200|300|400)/,
    },

    // Hover states for borders
    {
      pattern:
        /hover:border-(purple|blue|indigo|emerald|cyan|orange|teal|yellow|pink|green|violet|red|sky|rose)-(300|400|500)\/60/,
    },

    // Hover states for backgrounds
    {
      pattern:
        /hover:bg-(purple|blue|indigo|emerald|cyan|orange|teal|yellow|pink|green|violet|red|sky|rose)-(400|500)\/20/,
    },

    // Hover states for gradients
    {
      pattern:
        /hover:from-(purple|blue|indigo|emerald|cyan|orange|teal|yellow|pink|green|violet|red|sky|rose)-(300|400|500)/,
    },
    {
      pattern:
        /hover:to-(purple|blue|indigo|emerald|cyan|orange|teal|yellow|pink|green|violet|red|sky|rose)-(300|400|500)/,
    },

    // Group hover states
    {
      pattern:
        /group-hover:text-(purple|blue|indigo|emerald|cyan|orange|teal|yellow|pink|green|violet|red|sky|rose)-(200|300)/,
    },

    // Shadow colors
    {
      pattern: /shadow-(purple|blue|indigo|emerald|cyan|orange|teal|yellow|pink|green|violet|red|sky|rose)-(500)\/20/,
    },
    {
      pattern: /shadow-(purple|blue|indigo|emerald|cyan|orange|teal|yellow|pink|green|violet|red|sky|rose)-(500)\/25/,
    },
    {
      pattern:
        /hover:shadow-(purple|blue|indigo|emerald|cyan|orange|teal|yellow|pink|green|violet|red|sky|rose)-(500)\/20/,
    },
    {
      pattern:
        /hover:shadow-(purple|blue|indigo|emerald|cyan|orange|teal|yellow|pink|green|violet|red|sky|rose)-(500)\/30/,
    },

    // Ring colors for special member
    "ring-2",
    "ring-yellow-400/30",
    "ring-yellow-400/50",

    // Special yellow variants
    "to-yellow-500",
    "to-yellow-400",
    "hover:to-yellow-400",
    "hover:to-yellow-500",
    "to-yellow-500/20",

    // Common utility classes
    "animate-pulse",
    "animate-spin",
    "animate-bounce",
    "backdrop-blur-sm",
    "backdrop-blur-xl",
    "transition-all",
    "duration-100",
    "duration-300",
    "duration-500",
    "duration-700",
    "ease-out",
    "hover:scale-105",
    "hover:scale-110",
    "hover:scale-125",
    "hover:-translate-y-1",
    "hover:-translate-y-2",
    "hover:-translate-y-4",
    "hover:rotate-1",
    "hover:rotate-2",
    "hover:rotate-12",
    "hover:rotate-45",
    "group-hover:scale-110",
    "group-hover:scale-125",
    "group-hover:rotate-12",
    "transform",
    "scale-x-0",
    "scale-y-0",
    "group-hover:scale-x-100",
    "group-hover:scale-y-100",
    "opacity-0",
    "group-hover:opacity-100",
    "translate-x-[-100%]",
    "group-hover:translate-x-[100%]",

    // Flexbox utilities
    "flex",
    "flex-col",
    "flex-grow",
    "flex-shrink-0",
    "items-center",
    "justify-center",
    "h-full",
    "h-8",
    "h-12",

    // Grid utilities
    "grid",
    "grid-cols-1",
    "grid-cols-2",
    "sm:grid-cols-2",
    "md:grid-cols-3",
    "lg:grid-cols-3",
    "xl:grid-cols-5",
    "xl:grid-cols-6",
    "gap-4",
    "gap-6",
    "gap-8",
    "gap-10",

    // Spacing utilities
    "p-2",
    "p-4",
    "p-6",
    "p-8",
    "px-2",
    "py-1",
    "mb-1",
    "mb-2",
    "mb-3",
    "mb-4",
    "mb-8",
    "mb-12",
    "mb-16",
    "mb-24",
    "mt-8",

    // Size utilities
    "w-3",
    "h-3",
    "w-4",
    "h-4",
    "w-6",
    "h-6",
    "w-8",
    "h-8",
    "w-12",
    "h-12",
    "w-16",
    "h-16",
    "w-full",
    "max-w-xs",
    "max-w-sm",
    "max-w-4xl",
    "max-w-7xl",

    // Position utilities
    "relative",
    "absolute",
    "fixed",
    "inset-0",
    "top-0",
    "bottom-0",
    "left-0",
    "right-0",
    "-top-2",
    "-right-2",
    "z-10",

    // Text utilities
    "text-xs",
    "text-sm",
    "text-lg",
    "text-xl",
    "text-center",
    "font-bold",
    "font-mono",
    "font-semibold",
    "leading-tight",

    // Border utilities
    "border",
    "border-2",
    "rounded",
    "rounded-lg",
    "rounded-xl",
    "rounded-2xl",
    "rounded-full",
    "overflow-hidden",

    // Background utilities
    "bg-black",
    "bg-black/40",
    "bg-black/60",
    "bg-gradient-to-r",
    "bg-gradient-to-b",
    "bg-gradient-to-br",

    // Layout utilities
    "mx-auto",
    "text-center",
    "justify-items-center",
    "cursor-pointer",
    "pointer-events-none",

    // Animation delays and custom animations
    "animate-slide-up",
    "animate-fade-in-up",
    "animate-slide-down",
    "animate-slide-in",
    "animate-gradient-x",
    "scroll-animate",

    // Blur effects
    "blur-xl",
    "backdrop-blur-sm",
    "backdrop-blur-xl",

    // Object fit
    "object-cover",
    "object-contain",

    // Loading and crossOrigin
    "loading-lazy",

    // Specific component classes
    "no-underline",
    "break-all",
    "break-words",
    "list-none",
    "sr-only",
    "focus:not-sr-only",
    "focus:absolute",
    "focus:top-4",
    "focus:left-4",
    "mix-blend-difference",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
