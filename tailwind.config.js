/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width:{
        '1100':'1100px'
      },
      backgroundColor:{
        primary:"#f5f5f5",
        secondary:"#3961fb",
        secondary2:"#f73859",
        'overlay-30': 'rgba(0,0,0,0.3)',
        'overlay-70': 'rgba(0,0,0,0.7)',
      },
      maxWidth:{
        "600":"600px",
        "1100":"1100px"
      },
      minWidth:{
        "500":"500px"
      },
      minHeight:{
        "500":"500px"
      }
    },
  },
  plugins: [],
}