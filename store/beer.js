import Vue from 'vue'

export const state = () => ({
  beers: [],
  featuredBeers: [],
  beer: {},
  pages: { currentPage: 1, firstPage: 'beers' },
  // abstracting this out to its own defaultState variable seemed to cause a pointer issue when trying to clear state.
  filters: {
    searchTerm: '',
    filter: [],
    order: '',
    filterCount: 0,
    isInStockSet: true,
  },
  loading: false,
})
export const mutations = {
  addBeers(state, payload) {
    state.beers = payload
  },
  addFeaturedBeers(state, payload) {
    state.featuredBeers = payload
  },
  addBeer(state, payload) {
    state.beer = payload
  },
  setupPages(state, payload) {
    state.pages = { ...state.pages, ...payload }
  },
  setCurrentPage(state, payload) {
    state.pages.currentPage = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  setSearchTerm(state, payload) {
    state.filters.searchTerm = payload
  },
  setOrder(state, payload) {
    state.filters.order = payload
  },
  setInStock(state, payload) {
    state.filters.isInStockSet = payload
  },
  setFilter(state, { filterType, keyword }) {
    const newFilters = state.filters.filter
    const hasFilterType = newFilters.find((filter) => {
      return filter.filterType === filterType
    })
    // if there are no filters or this is a new filterType add a new one.
    if (!newFilters.length || !hasFilterType) {
      newFilters.push({ filterType, keywords: keyword })
    } else {
      // if filterType and keyword is already set, then set to new values
      newFilters.map((filter) => {
        if (filter.filterType === filterType) {
          filter.keywords = keyword
        }
        return filter
      })
    }
    state.filters.filterCount = keyword.length
    state.filters.filter = newFilters
  },
  clearFilters(state) {
    state.filters = {
      searchTerm: '',
      filter: [],
      order: '',
      filterCount: 0,
      isInStockSet: true,
    }
  },
}
export const actions = {
  async fetchBeers(state, { query }) {
    state.commit('setLoading', true)
    try {
      await fetchBeers(state, this.$axios, query)
    } catch (error) {
      try {
        // refresh token and try again
        await loginOrRefreshToken(this.$auth)
        await fetchBeers(state, this.$axios, query)
      } catch {
        state.commit('setLoading', false)
        Vue.notify({
          title: 'Beer',
          text: `Error fetching beers - ${error.message}`,
          type: 'error',
        })
        throw new Error('Beers not found')
      }
    }
  },
  async fetchBeer(state, id) {
    state.commit('setLoading', true)
    try {
      await fetchBeer(state, this.$axios, id)
    } catch (error) {
      try {
        // refresh token and try again
        await loginOrRefreshToken(this.$auth)
        await fetchBeer(state, this.$axios, id)
      } catch {
        state.commit('setLoading', false)
        Vue.notify({
          title: 'Beer',
          text: `Error fetching beer - ${error.message}`,
          type: 'error',
        })
        throw new Error('Beer not found')
      }
    }
  },
  async fetchFeaturedBeers(state) {
    state.commit('setLoading', true)
    try {
      await fetchFeaturedBeers(state, this.$axios)
    } catch (error) {
      try {
        // refresh token and try again
        await loginOrRefreshToken(this.$auth)
        await fetchFeaturedBeers(state, this.$axios)
      } catch {
        state.commit('setLoading', false)
        Vue.notify({
          title: 'Beer',
          text: `Error fetching featured beers - ${error.message}`,
          type: 'error',
        })
        throw new Error('Unable to reach server, please try again later')
      }
    }
  },
}

export const getters = {
  getBeers: (state) => state.beers,
  getFeaturedBeers: (state) => state.featuredBeers,
  getBeer: (state) => state.beer,
  getPages: (state) => state.pages,
  isLoading: (state) => state.loading,
  getFilters: (state) => state.filters,
  getFilterCount: (state) => state.filters.filterCount,
  isInStockSet: (state) => state.filters.isInStockSet,
  beerTypeKeywords: (state) => state.filters.filter[0]?.keywords,
}

// Private Functions
async function fetchBeers(state, axios, query) {
  const res = await axios.$get('/api/beer/', { params: query })
  state.commit('addBeers', res.results)
  const perPage = 100
  const pages = {
    perPage,
    nextPage: res.next,
    previousPage: res.previous,
    totalPages: Math.ceil(res.count / perPage),
  }
  state.commit('setupPages', pages)
  state.commit('setLoading', false)
}

async function fetchBeer(state, axios, id) {
  const fetchUrl = `/api/beer/${id}/`
  const res = await axios.$get(fetchUrl)
  state.commit('addBeer', res)
  state.commit('setLoading', false)
}

async function fetchFeaturedBeers(state, axios) {
  const fetchUrl = '/api/beerfeatured/'
  const res = await axios.$get(fetchUrl)
  state.commit('addFeaturedBeers', res.results)
  state.commit('setLoading', false)
}

async function loginOrRefreshToken(auth) {
  if (auth.loggedIn && auth.strategy === 'user') {
    await auth.refreshTokens()
  } else {
    await auth.loginWith('basicRequestCookie')
  }
}
