<template>
  <div class="vertical-center">
    <div class="pt-5"></div>
    <div class="inner-block">
      <div class="vue-template">
        <form @submit.prevent="handleSubmit">
          <h3>Login</h3>
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
              Sign In
            </button>
          </div>
          <div class="forgot-password text-right mt-2 mb-4">
            <div>
              <nuxtLink to="/register">Register</nuxtLink>
            </div>
            <div>
              <nuxtLink to="/user/forgotPassword">Forgot Password?</nuxtLink>
            </div>
          </div>
          <div class="social-icons">
            <ul>
              <li>
                <div role="button"><b-icon icon="google"></b-icon></div>
              </li>
              <li>
                <div role="button"><b-icon icon="facebook"></b-icon></div>
              </li>
              <li>
                <div role="button"><b-icon icon="twitter"></b-icon></div>
              </li>
            </ul>
          </div>
        </form>
      </div>
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
    handleSubmit() {
      this.postLogin(this.form)
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
.vertical-center h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}
label {
  font-weight: 500;
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
.social-icons {
  text-align: center;
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

@media only screen and (max-width: 500px) {
  .inner-block {
    width: 100%;
    padding: 20px;
  }
}
</style>
