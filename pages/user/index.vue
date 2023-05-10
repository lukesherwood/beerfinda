<template>
  <div class="vertical-center">
    <div class="pt-5"></div>
    <div class="inner-block">
      <div class="vue-template">
        <h3>User Page</h3>
        <form @submit.prevent="handleUserUpdate">
          <div class="form-group mb-3 pt-3">
            <label>First Name *</label>
            <input
              v-model="form.firstName"
              type="text"
              name="name"
              class="form-control form-control-lg"
              required
            />
          </div>
          <div class="form-group mb-3">
            <label>Last Name *</label>
            <input
              v-model="form.lastName"
              type="text"
              name="name"
              class="form-control form-control-lg"
              required
            />
          </div>
          <div class="form-group mb-3">
            <label>Email *</label>
            <input
              v-model="form.email"
              type="email"
              name="name"
              class="form-control form-control-lg"
              required
            />
          </div>
          <div class="form-group mb-3">
            <label>Describe the type of beer that you like *</label>
            <input
              v-model="form.description"
              type="text"
              name="name"
              class="form-control form-control-lg"
              required
            />
          </div>
          <div class="form-group mb-3">
            <RegisterBeerSearch
              :beers-like="form.beersLike"
              @beersSave="handleBeersSave"
            />
          </div>
          <div class="py-3">* Required</div>
          <!-- tooltip not working but its straight from bootstrap docs-->
          <div class="form-group">
            <span
              class="d-flex"
              tabindex="0"
              data-bs-toggle="tooltip"
              data-bs-title="Please Fill Required Fields"
            >
              <button
                :disabled="validate()"
                type="submit"
                class="btn btn-primary btn-lg"
              >
                Update
              </button>
            </span>
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
        beersLike: this.$auth.user.beers_like,
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
        // if the data has been changed in the form add it to the data in the correct format (snakecase)
        if (form[key] !== this.$auth.user[snakeCase(key)]) {
          newForm[snakeCase(key)] = form[key]
        }
      }
      return newForm
    },
    validate() {
      return (
        !this.form.beersLike.length ||
        !this.form.description ||
        !this.form.email
      )
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
