import Vue from 'vue'

export const state = () => ({
  beerResults: [],
  loading: false,
  beersSelectedInfo: [],
})

export const mutations = {
  addBeerResults(state, payload) {
    state.beerResults = payload
  },
  addBeerInfo(state, payload) {
    // if there is not already the beer in the store, add it. Avoids duplicates being added.
    if (
      !state.beersSelectedInfo.find((beer) => beer.beer_id === payload.beer_id)
    ) {
      state.beersSelectedInfo = [...state.beersSelectedInfo, payload]
    }
  },
  setLoading(state, payload) {
    state.loading = payload
  },
}

export const actions = {
  async postLogin(state, form) {
    try {
      await this.$auth.loginWith('user', { data: form })
      Vue.notify({
        title: 'Authorization',
        text: 'You have been logged in!',
        type: 'success',
      })
    } catch (error) {
      Vue.notify({
        title: 'Authorization',
        text: `Error logging in - ${error.response.data.detail}`,
        type: 'error',
      })
      throw new Error(`User unable to login - ${error.response.data.detail}`)
    }
  },
  async postContact(state, form) {
    try {
      await this.$axios.$post('/api/contact/', form)
      Vue.notify({
        title: 'Contact',
        text: 'Successfully sent contact message',
        type: 'success',
      })
    } catch (error) {
      Vue.notify({
        title: 'Contact',
        text: `Error sending contact message - ${error.message}`,
        type: 'error',
      })
      throw new Error(`Contact message unsuccessful - ${error.message}`)
    }
  },
  async fetchBeerResults(state, { keyword }) {
    state.commit('setLoading', true)
    try {
      const res = await this.$axios.$get(`/api/beer/?search=${keyword}`)
      state.commit('addBeerResults', res.results)
      state.commit('setLoading', false)
    } catch (error) {
      Vue.notify({
        title: 'Authorization',
        text: `Error fetching beer results - ${error.message}`,
        type: 'error',
      })
      state.commit('setLoading', false)
    }
  },
  async fetchBeerInfo(state, id) {
    state.commit('setLoading', true)
    try {
      const fetchUrl = `/api/beer/${id}/`
      const res = await this.$axios.$get(fetchUrl)
      state.commit('addBeerInfo', res)
      state.commit('setLoading', false)
    } catch (error) {
      state.commit('setLoading', false)
      Vue.notify({
        title: 'Beer',
        text: `Error fetching beer - ${error.message}`,
        type: 'error',
      })
      throw new Error('Beer not found')
    }
  },
  async postRegisterProfile(state, data) {
    try {
      await this.$axios.$post('/api/ProfileCreate/', data)
    } catch (error) {
      Vue.notify({
        title: 'Authorization',
        text: `Error registering profile - ${error.message}`,
        type: 'error',
      })
      throw new Error(`User unable to register profile - ${error.message}`)
    }
  },

  async postRegisterUser(state, data) {
    try {
      await this.$axios.$post('/api/UserCreate/', data).then((resp) => {
        if (resp.AuthUser === 'exists') {
          throw new Error(
            `User unable to register user - this email is already is use, please sign in or try another email`
          )
        }
        Vue.notify({
          title: 'User',
          text: `Successfully created`,
          type: 'success',
        })
      })
    } catch (error) {
      Vue.notify({
        title: 'Authorization',
        text: `Error registering user - ${error.message}`,
        type: 'error',
      })
      throw new Error(`User unable to register user - ${error.message}`)
    }
  },

  async userUpdate(state, data) {
    try {
      await this.$axios.$post('/api/UserUpdate/', data).then((resp) => {
        Vue.notify({
          title: 'User',
          text: `Successfully updated`,
          type: 'success',
        })
      })
    } catch (error) {
      Vue.notify({
        title: 'Authorization',
        text: `Error updating user - ${error.message}`,
        type: 'error',
      })
      throw new Error(`User unable to update user - ${error.message}`)
    }
  },

  async requestResetPassword(state, data) {
    try {
      await this.$axios
        .$post('/api/request-reset-email/', data)
        .then((resp) => {
          if (resp.success) {
            Vue.notify({
              title: 'Authorization',
              text: `${resp.success}`,
              type: 'success',
            })
          }
        })
    } catch (error) {
      Vue.notify({
        title: 'Authorization',
        text: `Error resetting password - ${error.message}`,
        type: 'error',
      })
      throw new Error(`User unable to reset password - ${error.message}`)
    }
  },

  async updatePassword(state, data) {
    try {
      await this.$axios
        .$patch('/api/password-reset-complete/', data)
        .then((resp) => {
          if (resp.success) {
            Vue.notify({
              title: 'Authorization',
              text: `Successfully reset password, please log in with the new password`,
              type: 'success',
            })
          }
        })
    } catch (error) {
      Vue.notify({
        title: 'Authorization',
        text: `Error resetting password - ${error.message}`,
        type: 'error',
      })
      throw new Error(`User unable to reset password - ${error.message}`)
    }
  },
}

export const getters = {
  getBeerResults: (state) => state.beerResults,
  isLoading: (state) => state.loading,
  beersSelectedInfo: (state) => state.beersSelectedInfo,
}
