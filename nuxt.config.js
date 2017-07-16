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
    short_name: 'واحدیار',
    description: 'دانشکده مهندسی کامپیوتر و فناوری اطلاعت',
    theme_color: '#2780e3'
  },
  modules: [
    '@nuxtjs/bootstrap-vue',
    '@nuxtjs/axios',
    ['@nuxtjs/pwa', { workbox: false, icon: { sizes: [ 64, 128 ] } }]
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
