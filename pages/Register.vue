<template>
  <div class="vertical-center">
    <div class="pt-5"></div>
    <div class="inner-block">
      <div class="vue-template">
        <form @submit.prevent="handleSubmit">
          <h3>Sign Up</h3>
          <div class="form-group mb-3">
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
            <button type="submit" class="btn btn-primary btn-lg btn-block">
              Sign Up
            </button>
          </div>
          <p class="forgot-password text-right">
            Already registered?
            <nuxtLink to="/login">Login</nuxtLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { snakeCase } from 'lodash'

export default {
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async handleSubmit() {
      const form = this.transformForm(this.form)
      await axios
        .post('https://drspgoa.digifern.com/UserCreate/', form)
        .then((res) => {
          // redirect to sign in
        })
        .catch((e) => {
          // redirect to same page, show error message if has one.
        })
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
  width: 450px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s;
}
.forgot-password {
  text-align: right;
  font-size: 13px;
  padding-top: 10px;
  color: #7a7a7a;
  margin: 0;
}
.forgot-password a {
  color: #2554ff;
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
.social-icons {
  text-align: center;
  font-family: 'Open Sans';
  font-weight: 300;
  font-size: 1.5em;
  color: #222222;
}
.social-icons ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.social-icons ul li {
  display: inline-block;
  zoom: 1;
  width: 65px;
  vertical-align: middle;
  border: 1px solid #e3e8f9;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  margin-right: 5px;
  background: #f4f6ff;
}
.social-icons ul li a {
  display: block;
  font-size: 1.4em;
  margin: 0 5px;
  text-decoration: none;
}
.social-icons ul li a i {
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -ms-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}
.social-icons ul li a:focus i,
.social-icons ul li a:active i {
  transition: none;
  color: #222222;
}
</style>
