module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        right: '0px 10px 10px #808080',
      },
      backgroundPosition: {
        'left-1': '1rem',
      },
      backgroundImage: {
        search: "url('/src/components/img/search.svg')",
      },
    },
  },
  plugins: [],
};
