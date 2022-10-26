export const state = () => ({
  breweries: [],
  brewer: {},
  pages: { currentPage: 1 },
  loading: false,
  filters: {
    searchTerm: '',
  },
})

export const mutations = {
  addBreweries(state, payload) {
    state.breweries = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  addBrewer(state, payload) {
    state.brewer = payload
  },
  setupPages(state, payload) {
    state.pages = { ...state.pages, ...payload }
  },
  setCurrentPage(state, payload) {
    state.pages.currentPage = payload
  },
}
export const actions = {
  async fetchBreweries(state) {
    state.commit('setLoading', true)
    const res = await this.$axios.$get('brewer')
    state.commit('addBreweries', res.results)
    const perPage = 100
    const pages = {
      loading: false,

      perPage,
      nextPage: res.next,
      previousPage: res.previous,
      totalPages: Math.ceil(res.count / perPage),
    }
    state.commit('setupPages', pages)
    state.commit('setLoading', false)
  },
  async fetchBrewer(state, id) {
    state.commit('setLoading', true)
    const fetchUrl = `brewer/${id}`
    const res = await this.$axios.$get(fetchUrl)
    state.commit('addBrewer', res)
    state.commit('setLoading', false)
  },
}

export const getters = {
  getBreweries: (state) => state.breweries,
  isLoading: (state) => state.loading,
  getBrewer: (state) => state.brewer,
  getFilters: (state) => state.filters,
  getPages: (state) => state.pages,
}
