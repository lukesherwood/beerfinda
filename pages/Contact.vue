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
      },
    }
  },
  methods: {
    ...mapActions({ postContact: 'user/postContact' }),
    async handleSubmit() {
      try {
        const token = await this.$recaptcha.getResponse()
        console.log('ReCaptcha token:')

        // send token to server alongside your form data
        this.postContact(this.form).then(() => {
          this.$router.push('/')
        })

        // at the end you need to reset recaptcha
        await this.$recaptcha.reset()
      } catch (error) {
        console.log('Login error:', error)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
