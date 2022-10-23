import axios from '~/plugins/axios'

export const state = () => ({
  beerResults: [],
})

export const mutations = {
  addBeerResults(state, payload) {
    state.beerResults = payload
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
    try {
      const res = await axios.get(`/beer/?search=${keyword}`)
      state.commit('addBeerResults', res.data.results)
    } catch (error) {
      console.error(error)
    }
  },
  async postRegisterProfile(state, data) {
    try {
      await axios.post('/ProfileCreate/', data)
    } catch (error) {
      console.error(error)
    }
  },

  async postRegisterUser(state, data) {
    try {
      await axios.post('/UserCreate/', data)
    } catch (error) {
      console.error(error)
    }
  },
}

export const getters = {
  getBeerResults: (state) => state.beerResults,
}
