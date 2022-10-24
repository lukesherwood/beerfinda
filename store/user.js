export const state = () => ({
  beerResults: [],
  loading: false,
})

export const mutations = {
  addBeerResults(state, payload) {
    state.beerResults = payload
  },
  setLoading(state, payload) {
    state.loading = payload
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
  async fetchBeerResults(state, { keyword }) {
    state.commit('setLoading', true)
    try {
      const res = await this.$axios.$get(`/beer/?search=${keyword}`)
      state.commit('addBeerResults', res.results)
    } catch (error) {
      console.error(error)
    }
    state.commit('setLoading', false)
  },
  async postRegisterProfile(state, data) {
    try {
      await this.$axios.$post('/ProfileCreate/', data)
    } catch (error) {
      console.error(error)
    }
  },

  async postRegisterUser(state, data) {
    try {
      await this.$axios.$post('/UserCreate/', data)
    } catch (error) {
      console.error(error)
    }
  },
}

export const getters = {
  getBeerResults: (state) => state.beerResults,
  isLoading: (state) => state.loading,
}
