import NuxtConfiguration from '@nuxt/config'
import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
const config: NuxtConfiguration = {
  mode: 'spa',
  server: {
    port: process.env.PORT || 9000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  axios: {
    proxy: true, // Can be also an object with default options
    port: process.env.PORT || 9000
  },
  proxy: {
    '/api/': {
      target: process.env.API_URL || 'http://localhost:3333',
      pathRewrite: {
        '^/api/': ''
      }
    }
  },
  styleResources: {
    scss: ['~assets/style/variables.scss']
  },
  head: {
    title: process.env.TITLE || 'پنل ادمین',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          process.env.DESCRIPTION ||
          'برای ورود به پنل ادمین ابتدا باید وارد شوید'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  loading: { color: '#fff' },
  css: [
    '~/assets/style/app.styl',
    '~/assets/style/main.scss',
    '~@vrwebdesign/nuxt/assets/style/main.scss'
  ],
  plugins: ['@/plugins/vuetify.js'],
  modules: ['@nuxtjs/style-resources', '@nuxtjs/axios'],
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
export default config
