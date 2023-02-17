<template>
  <div class="vertical-center">
    <div class="pt-5"></div>
    <div class="inner-block">
      <div class="vue-template">
        <h3>User Page</h3>
        <form @submit.prevent="handleUserUpdate">
          <div class="form-group mb-3 pt-3">
            <label>First Name</label>
            <input
              v-model="form.firstName"
              type="text"
              name="name"
              class="form-control form-control-lg"
              required
            />
          </div>
          <div class="form-group mb-3">
            <label>Last Name</label>
            <input
              v-model="form.lastName"
              type="text"
              name="name"
              class="form-control form-control-lg"
              required
            />
          </div>
          <div class="form-group mb-3">
            <label>Email</label>
            <input
              v-model="form.email"
              type="email"
              name="name"
              class="form-control form-control-lg"
              required
            />
          </div>
          <div class="form-group mb-3">
            <label>Describe the type of beer that you like</label>
            <input
              v-model="form.description"
              type="text"
              name="name"
              class="form-control form-control-lg"
              required
            />
          </div>
          <div class="form-group mb-3">
            <!-- would be cool to have icons/badges with the selected beers above or below, x's to remove, search to add new ones. -->
            <RegisterBeerSearch @beersSave="handleBeersSave" />
          </div>
          <!-- need a way to reset password safely -->
          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-lg btn-block">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { snakeCase } from 'lodash'
import { mapActions } from 'vuex'

export default {
  name: 'UserUpdate',
  middleware: 'authenticated',
  data() {
    return {
      form: {
        firstName: this.$auth.user.first_name,
        lastName: this.$auth.user.last_name,
        email: this.$auth.user.email,
        description: this.$auth.user.description,
        beersLike: [],
      },
    }
  },
  methods: {
    handleBeersSave(beers) {
      this.form.beersLike = beers
    },
    ...mapActions({
      userUpdate: 'user/userUpdate',
    }),
    handleUserUpdate() {
      this.userUpdate(this.transformForm(this.form))
    },
    transformForm(form) {
      const newForm = {}
      for (const key in form) {
        newForm[snakeCase(key)] = form[key]
      }
      return newForm
    },
  },
}
</script>

<style scoped>
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
.vertical-center {
  display: flex;
  text-align: left;
  justify-content: center;
  flex-direction: column;
}
.inner-block {
  width: 50%;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s;
}
.vertical-center .form-control:focus {
  border-color: #23a8ea;
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
