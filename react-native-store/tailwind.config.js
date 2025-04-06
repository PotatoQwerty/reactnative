/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        QuicksandBold: ["QuicksandBold", "sans-serif"],
        QuicksandMedium: ["QuicksandMedium", "sans-serif"],
        QuicksandRegular: ["QuicksandRegular", "sans-serif"],
        QuicksandLight: ["QuicksandLight", "sans-serif"],
      },
      colors: {
        primary: "#7b789f",
        secondary: "#c9beab",
        accent: "#a3b78f",
        background: "#f6f5f9",
        text: "#050315",
        gray: "#6B7280",
      },
    },
  },
  plugins: [],
};
