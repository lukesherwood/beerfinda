import { createStore } from "vuex";
import { uniq } from "lodash";
const baseUrl = 'https://drspgoa.digifern.com/'
const headers = { Accept: "application/json" }

export default createStore({
  state: {
    beers: [],
    featuredBeers: [],
    beer: {},
    pages: { currentPage: 1, firstPage: baseUrl + "beers" },
    // abstracting this out to its own defaultState variable seemed to cause a pointer issue when trying to clear state.
    filters: { searchTerm: "", filter: [], order: "", filterCount: 0, isInStockSet: true },
    loading: false,
  },
  mutations: {
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
        return filter.filterType == filterType
      }
      )
      // if there are no filters or this is a new filterType add a new one.
      if (!newFilters.length || !hasFilterType) {
        newFilters.push({ filterType, keywords: keyword })
      }
      else {
        // if filterType and keyword is already set, then set to new values
        newFilters.map((filter) => {
          if (filter.filterType == filterType) {
            filter.keywords = keyword
          }
          return filter
        })
      }
      state.filters.filterCount = keyword.length
      state.filters.filter = newFilters
    },
    clearFilters(state) {
      state.filters = { searchTerm: "", filter: [], order: "", filterCount: 0, isInStockSet: true }
    },
  },
  actions: {
    async fetchBeers(state, { url } = {}) {
      state.commit("setLoading", true)
      const fetchUrl = url || baseUrl + 'beer'
      const beers = await fetch(fetchUrl, { headers })
      const res = await beers.json()
      state.commit("addBeers", res.results)
      const perPage = 100
      const pages = {
        perPage,
        nextPage: res.next,
        previousPage: res.previous,
        totalPages: Math.ceil(res.count / perPage),
      }
      state.commit("setupPages", pages)
      state.commit("setLoading", false)
    },
    async fetchBeer(state, id) {
      state.commit("setLoading", true)
      const fetchUrl = baseUrl + `beer/${id}`
      const beer = await fetch(fetchUrl, { headers })
      const res = await beer.json()
      state.commit("addBeer", res)
      state.commit("setLoading", false)
    },
    async fetchFeaturedBeers(state) {
      state.commit("setLoading", true)
      const fetchUrl = baseUrl + 'beerfeatured'
      const beers = await fetch(fetchUrl, { headers })
      const res = await beers.json()
      state.commit("addFeaturedBeers", res.results)
      state.commit("setLoading", false)
    }
  },
  modules: {
  },
  getters: {
    getBeers: state => state.beers,
    getFeaturedBeers: state => state.featuredBeers,
    getBeer: state => state.beer,
    getPages: state => state.pages,
    isLoading: state => state.loading,
    getFilters: state => state.filters,
    getFilterCount: state => state.filters.filterCount,
    isInStockSet: state => state.filters.isInStockSet,
    beerTypeKeywords: state => state.filters.filter[0]?.keywords,
  },
})