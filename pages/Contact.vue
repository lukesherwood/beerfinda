<template>
  <div class="d-flex justify-content-center flex-column py-5">
    <div class="inner-block bg-white">
      <form @submit.prevent="handleSubmit">
        <h3 class="text-center">Contact</h3>
        <div class="form-group">
          <label for="name">Name</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            name="name"
            class="form-control form-control-lg"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            name="email"
            class="form-control form-control-lg"
            required
          />
        </div>
        <div class="form-group">
          <label for="message">Send a message</label>
          <textarea
            id="message"
            v-model="form.message"
            class="w-100 form-control form-control-lg"
            name="text"
            rows="10"
            required
          ></textarea>
        </div>
        <recaptcha />
        <div class="form-group pt-3">
          <button type="submit" class="btn btn-primary btn-lg btn-block">
            Submit
          </button>
        </div>
        <div class="text-center pt-3">
          <small
            >This site is protected by reCAPTCHA and the Google
            <a href="https://policies.google.com/privacy">Privacy Policy</a> and
            <a href="https://policies.google.com/terms">Terms of Service</a>
            apply.
          </small>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Contact',
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
        recaptcha: '',
      },
    }
  },
  async mounted() {
    try {
      await this.$recaptcha.init()
    } catch (e) {
      console.log(e)
    }
  },
  beforeDestroy() {
    this.$recaptcha.destroy()
  },
  methods: {
    ...mapActions({ postContact: 'user/postContact' }),
    async handleSubmit() {
      try {
        const token = await this.$recaptcha.execute('login')
        if (!token) {
          this.$recaptcha.reset()
          return
        }
        this.form.recaptcha = token
        this.postContact(this.form).then(() => {
          this.$router.push('/')
        })
        await this.$recaptcha.reset()
      } catch (error) {
        console.log('error:', error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
