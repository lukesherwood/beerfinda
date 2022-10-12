import axios from '~/plugins/axios'

export const state = () => ({
  refreshToken: '',
  accessToken: '',
  loggedIn: false,
})

export const mutations = {
  login(state, tokens) {
    state.refreshToken = tokens.refresh
    state.accessToken = tokens.access
    state.loggedIn = true
  },
  logout(state) {
    state.refreshToken = ''
    state.accessToken = ''
    state.loggedIn = false
  },
}

export const actions = {
  async postLogin(state, form) {
    try {
      await this.$auth.loginWith('local', { data: form })
    } catch (err) {
      console.log(err)
    }
  },
  async postRegisterProfile(state, form) {
    try {
      await axios.post('ProfileCreate/', form)
    } catch (e) {
      console.log(e)
    }
  },
  async postRegisterUser(state, form) {
    try {
      await axios.post('UserCreate/', form)
      this.$router.push('/login')
    } catch (e) {
      console.log(e)
    }
  },
}
export const getters = {
  getLoggedIn: (state) => state.loggedIn,
  getAccessToken: (state) => state.accessToken,
  getRefreshToken: (state) => state.refreshToken,
}
