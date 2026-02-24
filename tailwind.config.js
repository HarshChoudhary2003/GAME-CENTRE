/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          deep: "var(--bg-deep)",
          surface: "var(--bg-surface)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          glow: "var(--primary-glow)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          glow: "var(--secondary-glow)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          glow: "var(--accent-glow)",
        },
        text: {
          DEFAULT: "var(--text)",
          dim: "var(--text-dim)",
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow-primary': '0 0 15px var(--primary-glow)',
        'glow-secondary': '0 0 15px var(--secondary-glow)',
        'glow-accent': '0 0 15px var(--accent-glow)',
      },
    },
  },
  plugins: [],
}
