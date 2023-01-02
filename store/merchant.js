import Vue from 'vue'

export const state = () => ({
  merchants: [],
  merchant: {},
  pages: { currentPage: 1 },
  loading: false,
  filters: {
    searchTerm: '',
    order: '',
  },
})

export const mutations = {
  addMerchants(state, payload) {
    state.merchants = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  addMerchant(state, payload) {
    state.merchant = payload
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
  async fetchMerchants(state, { query }) {
    state.commit('setLoading', true)
    try {
      const res = await this.$axios.$get('merchant', { params: query })
      state.commit('addMerchants', res.results)
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
        title: 'Merchant',
        text: `Error fetching merchants - ${error.message}`,
        type: 'error',
      })
      throw new Error('Merchants not found')
    }
  },
  async fetchMerchant(state, slug) {
    state.commit('setLoading', true)
    try {
      const fetchUrl = `merchant/${slug}`
      const res = await this.$axios.$get(fetchUrl)
      state.commit('addMerchant', res)
      state.commit('setLoading', false)
    } catch (error) {
      state.commit('setLoading', false)
      Vue.notify({
        title: 'Merchant',
        text: `Error fetching merchant - ${error.message}`,
        type: 'error',
      })
      throw new Error('Merchant not found')
    }
  },
}

export const getters = {
  getMerchants: (state) => state.merchants,
  isLoading: (state) => state.loading,
  getMerchant: (state) => state.merchant,
  getFilters: (state) => state.filters,
  getPages: (state) => state.pages,
}
