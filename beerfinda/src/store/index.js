import { createStore } from "vuex";
const url = 'https://drspgoa.digifern.com/'
const headers = { Accept: "application/json" }

export default createStore({
    state: {
        beers: []
    },
    mutations: {
        addBeers(state, payload) {
            state.beers = payload
        }
    },
    actions: {
        async fetchBeers(state) {
            const beers = await fetch(url + 'beer', { headers })
            const res = await beers.json()
            state.commit("addBeers", res.results)
        }
    },
    modules: {
    },
    getters: { getBeers: state => state.beers },
})