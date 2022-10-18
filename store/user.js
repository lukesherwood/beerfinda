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
  async fetchBeerResults(state, { keyword }) {
    try {
      const res = await axios.get(`/beer/?search=${keyword}`)
      state.commit('addBeerResults', res.data.results)
    } catch (error) {
      console.error(error)
    }
  },
}

export const getters = {
  getBeerResults: (state) => state.beerResults,
}
