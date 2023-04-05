<template>
  <div class="vertical-center">
    <div class="pt-5"></div>
    <div class="inner-block">
      <div class="vue-template">
        <form @submit.prevent="handleSubmit">
          <h3>Contact</h3>
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
export default {
  name: 'Contact',
  data() {
    return {
      form: {
        email: '',
        message: '',
      },
    }
  },
  methods: {
    handleSubmit() {
      // this.postContact(this.form)
      this.$axios.$post('/api/contact/', this.form)
    },
  },
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
html,
.App,
.vue-template,
.vertical-center {
  width: 100%;
  height: 100%;
}
.navbar-light {
  background-color: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
}
.vertical-center {
  display: flex;
  text-align: left;
  justify-content: center;
  flex-direction: column;
}
.inner-block {
  width: 450px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s;
}
.vertical-center .form-control:focus {
  border-color: #2554ff;
  box-shadow: none;
}
.vertical-center h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}
label {
  font-weight: 500;
}
</style>
