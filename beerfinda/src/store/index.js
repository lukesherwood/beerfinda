import { createStore } from "vuex";
const baseUrl = 'https://drspgoa.digifern.com/'
const headers = { Accept: "application/json" }

export default createStore({
    state: {
        beers: [],
        pages: { currentPage: 1, firstPage: baseUrl + "beers" },
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
    getters: { getBeers: state => state.beers, getPages: state => state.pages, isLoading: state => state.loading },
})