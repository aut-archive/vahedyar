module.exports = {
  loading: {
    color: '#d9534f'
  },
  build: {
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  manifest: {
    lang: 'fa',
    name: 'واحدیار',
    short_name: 'vahedyar'
  },
  modules: [
    '@nuxtjs/bootstrap-vue',
    '@nuxtjs/axios',
    ['@nuxtjs/pwa', { workbox: false, icon: false }]
  ],
  plugins: [
    '~/plugins/vuelidate.js'
  ],
  css: [
    '~/assets/sass/bootstrap.scss',
    '~/assets/sass/app.scss'
  ],
  serverMiddleware: [
    '~/api'
  ]
}
