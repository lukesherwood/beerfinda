<template>
  <div class="vertical-center">
    <div class="pt-5"></div>
    <div class="inner-block">
      <div class="vue-template">
        <form @submit.prevent="handleSubmit">
          <h3>Reset Password</h3>
          <div class="form-group pb-3">
            <label>New Password</label>
            <input
              v-model="form.password"
              type="password"
              name="password"
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
import Vue from 'vue'
export default {
  asyncData({ route }) {
    return {
      id: route.params.id,
      token: route.params.token,
      redirectUrl: route.query.redirect_url,
    }
  },
  data() {
    return {
      form: {
        password: '',
      },
    }
  },
  methods: {
    ...mapActions({ updatePassword: 'user/updatePassword' }),
    handleSubmit() {
      if (this.token && this.id) {
        const data = { ...this.form, token: this.token, uidb64: this.id }
        this.updatePassword(data).then(() => {
          this.$router.push('/login')
        })
      } else {
        Vue.notify({
          type: 'error',
          text: 'Something went wrong, please click the link provided in email and try again',
        })
      }
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
