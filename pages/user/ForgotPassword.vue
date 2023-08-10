<template>
  <div class="d-flex justify-content-center flex-column py-5">
    <div class="inner-block bg-white">
      <form @submit.prevent="handleSubmit">
        <h3 class="text-center">Forgot Password</h3>
        <div class="form-group pb-3">
          <label>Email address</label>
          <input
            v-model="form.email"
            type="email"
            name="email"
            class="form-control form-control-lg"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary btn-lg btn-block">
          Reset password
        </button>
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
      },
    }
  },
  methods: {
    ...mapActions({ requestResetPassword: 'user/requestResetPassword' }),
    handleSubmit() {
      this.requestResetPassword(this.form).then(() => {
        this.$router.push('/login')
      })
    },
  },
}
</script>
<style scoped>
</style>
