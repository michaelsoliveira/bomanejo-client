
module.exports = {
  // mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
      '~assets/styles/app.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: "@/plugins/vue2-google-maps",
      ssr: false
    }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // 'leaflet'
    '@nuxtjs/pwa'
  ],

  server: {
    port: 3333,
    host: '0.0.0.0'
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth/',
    ['vue-wait/nuxt', { useVuex: true }]
    // ['nuxt-gmaps', {
    //   key: 'AIzaSyD1VOzuwFMWS_i6D1d-JF7NNni9hJww7gk'
    // }]
    // 'nuxt-leaflet'
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/me', method: 'get', propertyName: 'data' }
        }
      }
    },
    redirect: {
      login: '/auth/login',
      home: '/'
    }
  },
  axios: {
    baseURL: 'http://127.0.0.1:8001/api'
  },
  /*
  ** Build configuration
  */
 build: {

  postcss: {
    plugins: {
      'postcss-custom-properties': false
    }
  },

  /*
  ** Run ESLint on save
  */
  extend (config, { isDev }) {
    // transpile: [/^vue2-google-maps($|\/)/]
    // config.node = {
    //   console: true,
    //   'fs': 'empty',
    //   'net': 'empty',
    //   'tls': 'empty'
    // }
    // if (isDev && process.client) {
    //   config.module.rules.push({
    //     target: 'node',
    //     enforce: 'pre',
    //     test: /\.(js|vue)$/,
    //     loader: 'eslint-loader',
    //     exclude: /(node_modules)/
    //   })
    // }
  }
}
}
