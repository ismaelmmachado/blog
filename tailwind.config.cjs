/**
 * Tailwind CSS Configuration
 * Blog similar to superbash.ai patterns
 */
module.exports = {
  // Content paths - Astro resolves these from the src directory
  content: [
    "./src/**/*.{astro,html,js,ts,svelte,vue}",
    "./pages/**/*.{astro,html,js,ts,svelte,vue}",
    "./components/**/*.{astro,html,js,ts,svelte,vue}",
  ],
  // Theme configuration
  theme: {
    // Extend default theme
    extend: {
      // Custom colors matching superbash.ai branding
      colors: {
        // Primary brand colors
        brand: {
          50: "#f0f4f8",
          100: "#e4e8f0",
          200: "#c8d0db",
          300: "#a8b8cc",
          400: "#889ab0",
          500: "#687898",
          600: "#485870",
          700: "#283848",
          800: "#182830",
          900: "#081820",
        },
        // Neutral colors
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e7e7e7",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#3f3f3f",
          800: "#262626",
          900: "#171717",
        },
      },
      // Custom font family
      fontFamily: {
        // Primary font for UI
        sans: ["Inter", "system-ui", "sans-serif"],
        // Display/headline font
        display: ["Geist", "Inter", "sans-serif"],
        // Monospace for code blocks
        mono: ["Fira Code", "monospace"],
      },
      // Custom spacing scale
      spacing: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
      },
      // Border radius
      borderRadius: {
        sm: "0.125rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
      },
      // Box shadow
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  // Variants for arbitrary values
  variants: {
    extend: {
      // Ensure tailwind works with Astro components
    },
  },
  // Plugins
  plugins: [],
};