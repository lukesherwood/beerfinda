<template>
  <div class="d-flex justify-content-center flex-column py-5">
    <div class="inner-block bg-white">
        <form @submit.prevent="handleSubmit">
          <h3 class="text-center">Contact</h3>
          <div class="form-group">
            <label>Name</label>
            <input
              v-model="form.name"
              type="text"
              name="name"
              class="form-control form-control-lg"
              required
            />
          </div>
          <div class="form-group">
            <label>Email address</label>
            <input
              v-model="form.email"
              type="email"
              name="email"
              class="form-control form-control-lg"
              required
            />
          </div>
          <div class="form-group">
            <label for="text">Send a message</label>
            <textarea
              v-model="form.message"
              class="w-100 form-control form-control-lg"
              name="text"
              rows="10"
              required
            ></textarea>
          </div>
          <div class="form-group pt-3">
            <button type="submit" class="btn btn-primary btn-lg btn-block">
              Submit
            </button>
          </div>
        </form>
      </div>
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
    handleSubmit() {
      this.postContact(this.form).then(() => {
        this.$router.push('/')
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
