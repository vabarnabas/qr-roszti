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
        "soft-green": "#00b581",
        "darker-soft-green": "#16a378",
        "soft-yellow": "#fccc04"
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}
