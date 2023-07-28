<template>
  <div class="vertical-center">
    <div class="pt-5"></div>
    <div class="inner-block">
      <div class="vue-template">
        <ProfileCreate
          v-if="!showUserCreate"
          :form-data="rawProfileData"
          :error="getError"
          @profileCreate="handleProfileCreate($event)"
        />
        <UserCreate
          v-if="showUserCreate"
          @userCreate="handleUserCreate($event)"
        />
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
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Register',
  middleware: 'loggedIn',
  data() {
    return {
      profileData: undefined,
      showUserCreate: false,
      rawProfileData: undefined,
    }
  },
  computed: {
    ...mapGetters({
      getError: 'user/getError',
    }),
  },
  methods: {
    ...mapActions({
      postRegisterUser: 'user/postRegisterUser',
      postRegisterProfile: 'user/postRegisterProfile',
    }),
    handleUserCreate(userData) {
      const form = this.transformForm(userData)
      form.email = this.profileData.email
      this.postRegisterUser(form)
        .then(() => {
          this.postRegisterProfile(this.profileData).then(() => {
            // return state to normal
            this.profileData = undefined
            this.showUserCreate = false
            this.rawProfileData = undefined
            this.$router.push('/login')
          })
        })
        .catch((e) => {
          // return to profile create so they can try another email and error shows
          this.showUserCreate = false
        })
    },
    handleProfileCreate(profileData) {
      this.showUserCreate = true
      this.rawProfileData = profileData
      const form = this.transformForm(profileData)
      this.profileData = form
    },
    transformForm(form) {
      const newForm = {}
      for (const key in form) {
        if (key !== 'confirmPassword') {
          newForm[snakeCase(key)] = form[key]
        }
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
  width: 650px;
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
