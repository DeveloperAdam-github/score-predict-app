/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./components/**/*.{vue,js}",
  "./layouts/**/*.vue",
  "./pages/**/*.vue",
  "./plugins/**/*.{js,ts}",
  './nuxt.config.{js,ts}', // Nuxt configuration file
  "./app.vue",
  "app.vue"],
  theme: {
    extend: {
      colors: {
        primary: '#2A2E35',
        secondary: '#D8FB17',
        tertiary: ' #AFAEAE',
      },
      fontFamily: {
        normal: ['Orbitron-Bold'],
        bold: ['Orbitron-ExtraBold']
      },
      width: {
        '45%': '45%',
      },
      fontSize: {
        xxs: '0.60rem',
      },
      animation: {
        'ping-once': 'ping 1s linear',
      },
      transitionProperty: {
        'height': 'height',
        'maxHeight': 'maxHeight',
        'spacing': 'margin, padding',
      },
      backdropBlur: {
        xs: '1px',
      },
      backgroundImage: {
        'home-bg': 'linear-gradient(to bottom, rgba(000, 000, 000,0.2), rgb(28, 28, 30))',
        'upcoming-bg':
        "linear-gradient(to bottom right, rgba(000, 000, 000, 0.1), rgba(000, 000, 000, 0.5)), url('https://assets-webp.khelnow.com/d7293de2fa93b29528da214253f1d8d0/640x360/news/uploads/2023/12/UEFA-Euro-2024.jpeg.webp')",
        'live-bg':
        "linear-gradient(to bottom right, rgba(000, 000, 000, 0.3), rgba(000, 000, 000, 0.9)), url('https://st5.depositphotos.com/3886483/62025/i/450/depositphotos_620255122-stock-photo-berlin-october-2022-flag-uefa.jpg')",
        'gamestats': 
        "linear-gradient(to bottom right, rgba(000, 000, 000, 0.4), rgba(000, 000, 000, 0.5)), url('https://assets-webp.khelnow.com/d7293de2fa93b29528da214253f1d8d0/640x360/news/uploads/2023/12/UEFA-Euro-2024.jpeg.webp')",
        // 'live-bg':
        // "linear-gradient(to bottom right, rgba(000, 000, 000, 0.3), rgba(000, 000, 000, 0.9)), url('https://editorial.uefa.com/resources/026e-1367bda70e37-d38ed1953ac2-1000/official_uefa_euro_2024_logo_and_brand_launch.jpeg')",
        // 'live-bg':
        // "linear-gradient(to bottom right, rgba(000, 000, 000, 0.3), rgba(000, 000, 000, 0.9)), url('https://media.istockphoto.com/id/2000838209/vector/the-european-football-championship-2024-in-germany-colorful-stripes-background.jpg?s=612x612&w=0&k=20&c=zJ9MAMmamVYw_eTNYAOP7nWnascoF-baOlzb596HY3E=')",
      },
    },
  },
  plugins: [require("daisyui")],
}

