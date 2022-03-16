module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-gray": "#111111",
        "medium-gray": "#222222",
        "light-gray": "#333333",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}
