import Vue from 'vue'

export const state = () => ({
  breweries: [],
  brewer: {},
  pages: { currentPage: 1 },
  loading: false,
  filters: {
    searchTerm: '',
    order: '',
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
  setSearchTerm(state, payload) {
    state.filters.searchTerm = payload
  },
  setOrder(state, payload) {
    state.filters.order = payload
  },
}
export const actions = {
  async fetchBreweries(state, { url } = {}) {
    state.commit('setLoading', true)
    try {
      const fetchUrl = url || 'brewer'
      const res = await this.$axios.$get(fetchUrl)
      state.commit('addBreweries', res.results)
      const perPage = 100
      const pages = {
        perPage,
        nextPage: res.next,
        previousPage: res.previous,
        totalPages: Math.ceil(res.count / perPage),
      }
      state.commit('setupPages', pages)
      state.commit('setLoading', false)
    } catch (error) {
      state.commit('setLoading', false)
      Vue.notify({
        title: 'Brewer',
        text: `Error fetching breweries - ${error.message}`,
        type: 'error',
      })
      throw new Error('Breweries not found')
    }
  },
  async fetchBrewer(state, slug) {
    state.commit('setLoading', true)
    try {
      const fetchUrl = `brewer/${slug}`
      const res = await this.$axios.$get(fetchUrl)
      state.commit('addBrewer', res)
      state.commit('setLoading', false)
    } catch (error) {
      state.commit('setLoading', false)
      Vue.notify({
        title: 'Brewer',
        text: `Error fetching brewer - ${error.message}`,
        type: 'error',
      })
      throw new Error('Brewer not found')
    }
  },
}

export const getters = {
  getBreweries: (state) => state.breweries,
  isLoading: (state) => state.loading,
  getBrewer: (state) => state.brewer,
  getFilters: (state) => state.filters,
  getPages: (state) => state.pages,
}
