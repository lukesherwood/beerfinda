export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'server',

  head: {
    title: 'Beerfinda',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'BeerFinda: You want to find beer, we want to help',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    script: [
      {
        src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js',
        integrity:
          'sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3',
        crossorigin: 'anonymous',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Michroma&display=swap',
      },
    ],
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/custom.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-agile',
    { src: '~/plugins/notifications-ssr', ssr: true },
    { src: '~/plugins/notifications-client', ssr: false },
  ],

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
    '@nuxtjs/proxy',
    '@nuxtjs/auth-next',
  ],
  axios: {
    credentials: true,
    proxy: true,
  },

  privateRuntimeConfig: { baseURL: process.env.BASE_URL },

  proxy: {
    '/api/': {
      target: process.env.baseUrl,
      pathRewrite: { '^/api/': '' },
    },
  },

  router: {
    middleware: [],
  },

  auth: {
    strategies: {
      user: {
        scheme: 'refresh',
        cookie: {
          cookie: {
            // we check this cookie existence for loggedIn check
            name: 'XSRF-TOKEN',
            secure: true,
          },
        },
        token: {
          property: 'access',
          global: true, // This determines if the authentication token is automatically included in all custom axios requests.
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
            url: process.env.baseUrl + 'api/token/',
            method: 'post',
          },
          user: {
            url: process.env.baseUrl + 'UserView/',
            method: 'get',
            withCredentials: true,
          },
          refresh: {
            url: process.env.baseUrl + 'api/token/refresh/',
            method: 'post',
          },
          logout: false,
        },
      },
      basicRequestCookie: {
        cookie: {
          cookie: {
            name: 'XSRF-TOKEN',
            secure: true,
          },
        },
        scheme: 'local',
        token: {
          property: 'Token', // this is the place it gets the token from in the json response
          global: true, // this determines if the authentication token is automatically included in all custom axios requests.
          name: 'AToken', // this is the name of the key that is sent with the request in headers
          type: false, // this sets the prefix of the token key
        },
        endpoints: {
          login: {
            url: process.env.baseUrl + 'setAuthToken/',
            method: 'get',
          },
          logout: false,
          user: false,
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
  build: {
    transpile: ['vue-agile'],
    postcss: null,
    babel: {
      compact: true,
    },
  },
}
