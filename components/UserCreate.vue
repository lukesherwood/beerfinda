<template>
  <div>
    <form @submit.prevent="$emit('userCreate', form)">
      <h3>Sign Up 2/2</h3>
      <h4>Create User</h4>

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
    </form>
  </div>
</template>

<script>
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
}
</script>

<style></style>
