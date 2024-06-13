// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', "@nuxt/image", "@pinia/nuxt", '@nuxtjs/supabase'],
  devtools: { enabled: false },
  css: ['~/assets/css/tailwind.css',  '@fortawesome/fontawesome-svg-core/styles.css'],
  plugins: ['~/plugins/fontawesome.js'],
  ssr: true,
  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
    ],
  },
  runtimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL,
    supbaseKey: process.env.SUPABASE_KEY,
  },
  app: {
    head: {
      title: 'My Nuxt 3 App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        { name: 'description', content: 'My amazing Nuxt 3 project' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})