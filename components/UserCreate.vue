<template>
  <div>
    <ValidationObserver v-slot="{ invalid, handleSubmit }">
      <form
        novalidate="true"
        @submit.prevent="handleSubmit($emit('userCreate', form))"
      >
        <div class="float-end">2/2</div>

        <h3>Sign Up</h3>
        <h4>Create User</h4>

        <div class="form-group mb-3 pt-3">
          <label>First Name</label>
          <ValidationProvider
            v-slot="{ errors }"
            name="First Name"
            rules="required"
          >
            <input
              v-model="form.firstName"
              type="text"
              name="First Name"
              class="form-control form-control-lg"
            />
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group mb-3">
          <label>Last Name</label>
          <ValidationProvider
            v-slot="{ errors }"
            name="Last Name"
            rules="required"
          >
            <input
              v-model="form.lastName"
              type="text"
              name="Last Name"
              class="form-control form-control-lg"
            />
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group mb-3">
          <label>Password</label>
          <ValidationProvider
            v-slot="{ errors }"
            name="Password"
            rules="required|min:6"
            vid="password"
          >
            <input
              v-model="form.password"
              type="password"
              name="password"
              class="form-control form-control-lg"
            />
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group mb-3">
          <label>Confirm Password</label>
          <ValidationProvider
            v-slot="{ errors }"
            name="Password Confirm"
            rules="required|min:6|confirmed:password"
          >
            <input
              v-model="form.confirmPassword"
              type="password"
              name="Password Confirm"
              class="form-control form-control-lg"
            />
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
          <button
            type="submit"
            :disabled="invalid"
            class="btn btn-primary btn-lg btn-block"
          >
            Sign Up
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  name: 'UserCreate',
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    }
  },
}
</script>

<style></style>
