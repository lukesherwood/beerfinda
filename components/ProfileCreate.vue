<template>
  <div>
    <form @submit.prevent="$emit('userCreate', form)">
      <h3>Sign Up 1/2</h3>
      <h4>Create Profile</h4>
      <div class="form-group mb-3">
        <RegisterBeerSearch />
      </div>

      <div class="form-group mb-3">
        <label>Describe the type of beer that you like</label>
        <input
          v-model="form.description"
          type="text"
          name="description"
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
      <div class="form-group">
        <button type="submit" class="btn btn-primary btn-lg btn-block">
          Next
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
        beers_like: '',
        description: '',
        email: '',
      },
    }
  },
}
</script>

<style></style>
