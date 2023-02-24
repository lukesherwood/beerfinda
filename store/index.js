export const actions = {
  async nuxtServerInit({ commit }) {
    // if there isn't a token then login with the basicRequestCookie strategy
    if (!this.$auth.user && !this.$auth.strategy.token.status().valid()) {
      await this.$auth.loginWith('basicRequestCookie')
    }
  },
}
