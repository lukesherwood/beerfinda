export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Beerfinda',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/custom.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/vue-agile'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxt/image',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],
  axios: {
    proxy: true,
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  env: {
    baseUrl: 'https://drspgoa.digifern.com/',
  },

  proxy: {
    '/api': 'http://localhost:3000',
  },
  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access',
          global: false, // This determines if the authentication token is automatically included in all custom axios requests.
          maxAge: 1800,
          // name: 'Token',
        },
        refreshToken: {
          property: 'refresh',
          data: 'refresh',
          maxAge: 60 * 60 * 24 * 30,
        },
        user: {
          property: false,
        },
        endpoints: {
          login: {
            url: 'https://drspgoa.digifern.com/api/token/',
            method: 'post',
          },
          user: {
            url: 'https://drspgoa.digifern.com/UserView/',
            method: 'get',
            withCredentials: true,
          },
          refresh: {
            url: 'https://drspgoa.digifern.com/api/token/refresh/',
            method: 'post',
          },
        },
      },
    },
  },

  image: {
    alias: { imgUrl: 'https://drs-pgo-image.s3.ap-southeast-2.amazonaws.com' },
    domains: ['https://drs-pgo-image.s3.ap-southeast-2.amazonaws.com'],
  },

  bootstrapVue: {
    bootstrapCSS: false,
    icons: true,
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: { transpile: ['vue-agile'], postcss: null },
}
