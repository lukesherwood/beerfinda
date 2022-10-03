module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  rules: {
    semi: 'off',
    'trailing-comma': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/require-prop-types': 'off',
  },
}
