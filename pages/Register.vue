<template>
  <div class="d-flex justify-content-center flex-column py-5">
    <div class="inner-block bg-white">
      <ProfileCreate
        v-if="!showUserCreate"
        :form-data="rawProfileData"
        :error="getError"
        @profileCreate="handleProfileCreate($event)"
      />
      <UserCreate
        v-if="showUserCreate"
        @userCreate="handleUserCreate($event)"
      />
      <h6 class="py-3">
        Already registered?
        <nuxtLink to="/login">Login</nuxtLink>
      </h6>
      <small class="text-center fw-lighter text-muted">
        By continuing to use BeerFinda, you agree to our
        <nuxt-link to="/legal/terms">Terms of Service</nuxt-link> and
        <nuxt-link to="/legal/privacy">Privacy Policy</nuxt-link>
      </small>
    </div>
  </div>
</template>
<script>
import { snakeCase } from 'lodash'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Register',
  middleware: 'loggedIn',
  data() {
    return {
      profileData: undefined,
      showUserCreate: false,
      rawProfileData: undefined,
    }
  },
  computed: {
    ...mapGetters({
      getError: 'user/getError',
    }),
  },
  methods: {
    ...mapActions({
      postRegisterUser: 'user/postRegisterUser',
      postRegisterProfile: 'user/postRegisterProfile',
    }),
    handleUserCreate(userData) {
      const form = this.transformForm(userData)
      form.email = this.profileData.email
      this.postRegisterUser(form)
        .then(() => {
          this.postRegisterProfile(this.profileData).then(() => {
            // return state to normal
            this.profileData = undefined
            this.showUserCreate = false
            this.rawProfileData = undefined
            this.$router.push('/login')
          })
        })
        .catch((e) => {
          // return to profile create so they can try another email and error shows
          this.showUserCreate = false
        })
    },
    handleProfileCreate(profileData) {
      this.showUserCreate = true
      this.rawProfileData = profileData
      const form = this.transformForm(profileData)
      this.profileData = form
    },
    transformForm(form) {
      const newForm = {}
      for (const key in form) {
        if (key !== 'confirmPassword') {
          newForm[snakeCase(key)] = form[key]
        }
      }
      return newForm
    },
  },
}
</script>
<style lang="scss" scoped>
</style>
