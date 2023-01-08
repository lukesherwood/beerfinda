export const actions = {
  async nuxtServerInit({ commit }) {
    await this.$auth.loginWith('local2')
  },
}
