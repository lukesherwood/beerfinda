<template>
  <div class="vertical-center">
    <div class="pt-5"></div>
    <div class="inner-block">
      <div class="vue-template">
        <ProfileCreate
          v-if="!profileData"
          :form="profileData"
          @profileCreate="handleProfileCreate($event)"
        />
        <UserCreate v-if="profileData" @userCreate="handleUserCreate($event)" />
        <p class="forgot-password text-right">
          Already registered?
          <nuxtLink to="/login">Login</nuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { snakeCase } from 'lodash'
import { mapActions } from 'vuex'

export default {
  name: 'Register',
  data() {
    return {
      profileData: undefined,
    }
  },
  methods: {
    ...mapActions({
      postRegisterUser: 'user/postRegisterUser',
      postRegisterProfile: 'user/postRegisterProfile',
    }),
    handleUserCreate(userData) {
      const form = this.transformForm(userData)
      form.email = this.profileData.email
      this.postRegisterUser(form).then((res) => {
        this.postRegisterProfile(this.profileData).then((res) => {
          this.$router.push('/login')
        })
      })
    },
    handleProfileCreate(profileData) {
      const form = this.transformForm(profileData)
      this.profileData = form
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
.vertical-center h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}
label {
  font-weight: 500;
}
@media only screen and (max-width: 500px) {
  .inner-block {
    width: 100%;
    padding: 20px;
  }
}
</style>
