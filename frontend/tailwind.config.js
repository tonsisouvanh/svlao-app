/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        color: {
          1: '#4379F2',
        },
      },
      backgroundImage: {
        'login-background': "url('/consule.jpg')",
      },
      fontFamily: {
        notosanslao: ['notosanslao', 'sans-serif'],
        fontDancing: ['Dancing Script', 'cursive'],
        fontOswald: ['Oswald', 'sans-serif'],
      },
    },
  },

  plugins: [require('daisyui')],
  daisyui: {
    themes: ['winter'],
  },
};
