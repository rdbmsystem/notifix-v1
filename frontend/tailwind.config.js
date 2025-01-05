/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        sides:
          "4px 0px 8px rgba(0, 0, 0, 0.1), -4px 0px 8px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        notifix: {
          primary: "#057642", // Dark Green (for success messages)
          secondary: "#FFFFFF", // White
          accent: "#7FC15E", //  Green (for accents)
          neutral: "#000000", // Black (for text)
          info: "#5E5E5E", // Dark Gray (for secondary text)
          success: "#0A66C2", // Blue
          warning: "#ED7B58", // Yellow (for warnings)
          error: "#CC1016", // Red (for errors)
          tertiary: "#F5C75D", // Burnt sianna (for warnings)

          "base-0": "#fff",
          "base-50": "#f9fafb",
          "base-100": "#f3f4f6", // Light Grey (background)
          "base-200": "#e5e7eb",
          "base-300": "#d1d5db",
          "base-400": "#9ca3af",
          "base-500": "#6b7280",
          "base-600": "#4b5563",
          "base-700": "#374151",
          "base-800": "#1f2937",
          "base-900": "#111827",
        },
      },
    ],
  },
};
