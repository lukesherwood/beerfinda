import Vue from 'vue'

export const state = () => ({
  beerResults: [],
  loading: false,
})

export const mutations = {
  addBeerResults(state, payload) {
    state.beerResults = payload
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
        text: `Error logging in - ${error.message}`,
        type: 'error',
      })
      throw new Error(`User unable to login - ${error.message}`)
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
      await this.$axios.$post('/api/UserCreate/', data)
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
      await this.$axios.$post('/api/UserUpdate/', data)
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
}
