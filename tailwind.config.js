/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'cloudLeft': 'cloudLeft 2s linear 1s forwards',
        'cloudMid': 'cloudMid 2s linear 1.2s forwards',
        'cloudRight': 'cloudRight 2s linear 1s forwards',
        'slideUp': 'slideUp 0.5s forwards',
      },
      keyframes: {
        cloudLeft: {
          '0%': { top: '17px', left: '220px', opacity: '0' },
          '20%': { top: '33px', left: '188px', opacity: '1' },
          '80%': { top: '81px', left: '92px', opacity: '1' },
          '100%': { top: '97px', left: '60px', opacity: '0' },
        },
        cloudMid: {
          '0%': { top: '10px', left: '420px', opacity: '0' },
          '20%': { top: '40px', left: '360px', opacity: '1' },
          '70%': { top: '130px', left: '180px', opacity: '1' },
          '100%': { top: '160px', left: '120px', opacity: '0' },
        },
        cloudRight: {
          '0%': { top: '100px', left: '500px', opacity: '0' },
          '20%': { top: '120px', left: '460px', opacity: '1' },
          '80%': { top: '180px', left: '340px', opacity: '1' },
          '100%': { top: '200px', left: '300px', opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(60px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}