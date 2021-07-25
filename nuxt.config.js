import colors from 'vuetify/es5/util/colors'

export default {
  target: 'static',
  ssr: false,
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - Coffee-Make',
    title: 'Coffee-Make',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/Logo_white_.png' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/styles.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/api.js',
    '~/plugins/auth.js',
    '~/plugins/directives.js',
    '~/plugins/nuxt-client-init.client.js',
    { src: '~/plugins/ymapPlugin.js', mode: 'client' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: {
    dirs: [
      '~/components',
      '~/components/admin',
      '~/components/cart',
      '~/components/catalog',
      '~/components/commons',
      '~/components/product',
    ],
  },

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://github.com/nuxt-community/device-module
    '@nuxtjs/device',
    // https://github.com/microcipcip/cookie-universal/tree/master/packages/cookie-universal-nuxt
    ['cookie-universal-nuxt', { parseJSON: false }],
    '@nuxtjs/toast',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: `${process.env.baseURL}`,
  },

  // loading: '~/components/LoadingBar.vue',

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  pwa: {
    meta: {
      title: 'Coffee Make',
      author: 'CM inc.',
    },
    manifest: {
      name: 'Coffee Make',
      lang: 'ru',
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    publicPath: '/nuxt/',
  },
}
