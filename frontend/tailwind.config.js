/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "login-background": "url('/consule.jpg')",
      },
      fontFamily: {
        notosanslao: ["notosanslao", "sans-serif"],
        fontDancing: ["Dancing Script", "cursive"],
        fontOswald: ["Oswald", "sans-serif"],
      },
    },
  },

  plugins: [require("daisyui")],
  daisyui: {
    themes: ["winter"],
  },
};
