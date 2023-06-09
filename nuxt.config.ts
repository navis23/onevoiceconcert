// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            charset: 'utf-16',
            viewport: 'width=device-width, initial-scale=1',
            title: 'One Voice Spensabaya Concert',
            meta: [
            // <meta name="description" content="My amazing site">
                { name: 'description', content: 'Tempat pemesanan tiket' }
            ],
        },
        pageTransition: { name: 'slide-fade', mode: 'out-in' }
    },
    css: ['~/assets/css/main.css'],
    modules: [
        'nuxt-icon',
        '@sidebase/nuxt-pdf',
        '@pinia/nuxt',
        '@formkit/nuxt'
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    pinia: {
      autoImports: [
        // automatically imports `defineStore`
        'defineStore', // import { defineStore } from 'pinia'
        ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        'storeToRefs',
      ],
    },
    
})
