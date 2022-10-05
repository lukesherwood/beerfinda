import axios from 'axios'

const baseUrl = 'https://drspgoa.digifern.com/'
// const headers = { Accept: 'application/json' }

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
    await axios
      // const beers = await fetch(fetchUrl, { headers })
      // const res = await beers.json()
      .post(baseUrl + 'api/token/', form)
      .then((res) => {
        state.commit('login', res.data)
        // redirect to sign
      })
      .catch((e) => {
        console.log(e)
        // redirect to same page, show error message if has one.
      })
  },
}
export const getters = {
  getLoggedIn: (state) => state.loggedIn,
  getAccessToken: (state) => state.accessToken,
  getRefreshToken: (state) => state.refreshToken,
}
