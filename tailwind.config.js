/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{jsx,js}',
    './components/**/*.{jsx,js}',
    './hooks/**/*.{jsx,js}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        black: '#000000',
        transparent: 'transparent',
        'light-green': '#141414',
        'strong-green': '#2d885f',
        gray: '#ccc',
        'nus-gray-900': '#C7C7C7 !important',
        'nus-gray-200': '#EAEAEA',
        'nus-gray-300': '#D6D6D6',
        'nus-gray-400': '#b5afaf',
        'nus-gray-800': '#707070',
        'nus-yellow-100': '#F4EFE8',
        'nus-yellow-200': '#F0E8DF',
        'nus-green-100': '#D9FFD9',
        'nus-green-300': '#59C959',
        'nus-blue-100': '#CAE0EB',
        'nus-blue-200': '#DFE8F0',
        'nus-blue-300': '#EDF6FA',
        'nus-blue-800': '#003D7C',
        'nus-red-200': '#F0E0DF',
        'nus-orange-400': '#EF7D06',
        'nus-black-200': '#4A4A49',
      },
      spacing: {},
      width: {
        43: '43px',
        45: '45px',
      },
      height: {
        43: '43px',
        45: '45px',
      },
      inset: {
        10: '10px',
      },
      fontSize: {
        '2.5xl': '1.75rem',
        26: '26px',
      },
      lineHeight: {
        17: '17px',
        31: '31px',
      },
      maxWidth: {
        150: '150px',
        318: '318px',
        1456: '1456px',
      },
      minWidth: {
        220: '220px',
      },
    },
  },
  plugins: [],
};
