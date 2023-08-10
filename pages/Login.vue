<template>
  <div class="d-flex justify-content-center flex-column py-5">
    <div class="inner-block bg-white">
      <form @submit.prevent="handleSubmit">
        <h3 class="text-center">Login</h3>
        <div class="form-group mb-3">
          <label>Email address</label>
          <input
            v-model="form.email"
            type="email"
            name="email"
            class="form-control form-control-lg"
            required
          />
        </div>
        <div class="form-group mb-3">
          <label>Password</label>
          <input
            v-model="form.password"
            type="password"
            name="name"
            class="form-control form-control-lg"
            required
          />
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-lg btn-block w-100">
            Sign In
          </button>
        </div>
        <div class="text-center py-3">
          <h6>
            <nuxtLink to="/user/forgotPassword">Forgot Password?</nuxtLink>
          </h6>
          <div class="py-3">
            <button class="btn btn-light btn-lg btn-block w-100">
              <b-icon icon="google"></b-icon> Continue with Google
            </button>
            <button class="btn btn-light btn-lg btn-block w-100">
              <b-icon icon="facebook"></b-icon> Continue with Facebook
            </button>
            <button class="btn btn-light btn-lg btn-block w-100">
              <b-icon icon="twitter"></b-icon> Continue with Twitter
            </button>
          </div>
          <h6 class="py-3">
            Don't have an account?
            <nuxtLink to="/register">Register Here</nuxtLink>
          </h6>
        </div>
        <small class="text-center fw-lighter text-muted">
          By continuing to use BeerFinda, you agree to our
          <nuxt-link to="/legal/terms">Terms of Service</nuxt-link> and
          <nuxt-link to="/legal/privacy">Privacy Policy</nuxt-link>
        </small>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    ...mapActions({ postLogin: 'user/postLogin' }),
    async handleSubmit() {
      await this.postLogin(this.form)
        .then(() => {
          this.$router.back()
        })
        .catch(() => {})
    },
  },
}
</script>
<style lang="scss" scoped>
</style>
