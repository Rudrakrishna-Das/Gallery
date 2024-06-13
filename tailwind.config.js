/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "white-1": "rgb(255,255,255,0.3)",
        "white-2": "rgb(255,255,255,0.7)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
