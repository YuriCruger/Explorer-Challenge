/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-400": "rgba(0,10,15,1)",
        "dark-600": "rgba(0,17,26,1)",
        "dark-700": "rgba(0,17,25,1)",
        "dark-900": "rgba(13,29,37,1)",
        "dark-1000": "rgba(25,34,39,1)",
        "light-100": "rgba(255,255,255,1)",
        "light-200": "rgba(255,250,241,1)",
        "light-400": "rgba(196,196,204,1)",
        "light-500": "rgba(124,124,138,1)",
        "tomato-100": "rgba(117,3,16,1)",
        "tomato-200": "rgba(146,0,14,1)",
        "cake-200": "rgba(130,243,255,1)",
      },
    },
  },
  plugins: [],
};
