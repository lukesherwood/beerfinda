import { createStore } from "vuex";
const baseUrl = 'https://drspgoa.digifern.com/'
const headers = { Accept: "application/json" }
const defaultState = { searchTerm: "", filter: [], order: "", filterCount: 0 }

export default createStore({
  state: {
    beers: [],
    pages: { currentPage: 1, firstPage: baseUrl + "beers" },
    filters: defaultState,
    loading: false
  },
  mutations: {
    addBeers(state, payload) {
      state.beers = payload
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
    setFilter(state, { filterType, keyword }) {
      const newFilters = state.filters.filter
      const hasFilterType = newFilters.find((filter) => {
        return filter.filterType == filterType
      }
      )
      // if there are no filters or this is a new filterType add a new one.
      if (!newFilters.length || !hasFilterType) {
        newFilters.push({ filterType, keywords: [keyword] })
        state.filters.filterCount += 1
      }
      else {
        // if filterType and keyword is already set, then remove the keyword
        newFilters.map((filter) => {
          if (filter.filterType == filterType && filter.keywords.includes(keyword)) {
            filter.keywords = filter.keywords.filter((el) => {
              return el !== keyword
            })
            state.filters.filterCount -= 1
          }
          // if filterType already exists and the keyword isn't already there add the keyword.
          else {
            filter.keywords = [...filter.keywords, keyword]
            state.filters.filterCount += 1
          }
          return filter
        })
      }
      state.filters.filter = newFilters
    },
    clearFilters(state) {
      state.filters = defaultState
    }

  },
  actions: {
    async fetchBeers(state, { url, nextPage } = {}) {
      state.commit("setLoading", true)
      if (nextPage) {
        state.commit("setCurrentPage", nextPage)
      }
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
    }
  },
  modules: {
  },
  getters: { getBeers: state => state.beers, getPages: state => state.pages, isLoading: state => state.loading, getFilters: state => state.filters, getFilterCount: state => state.filters.filterCount },
})