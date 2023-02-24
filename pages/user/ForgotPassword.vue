<template>
  <div class="vertical-center">
    <div class="pt-5"></div>
    <div class="inner-block">
      <div class="vue-template">
        <form @submit.prevent="handleSubmit">
          <h3>Forgot Password</h3>
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
</style>
