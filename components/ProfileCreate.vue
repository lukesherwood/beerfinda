<template>
  <div>
    <form @submit.prevent="$emit('profileCreate', form)">
      <h3>Sign Up 1/2</h3>
      <h4>Create Profile</h4>
      <div class="form-group mb-3 pt-3">
        <label>Enter one or more NZ beers that you enjoy</label>
        <RegisterBeerSearch @beersSave="handleBeersSave" />
      </div>

      <div class="form-group mb-3 pt-3">
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
        <ValidationProvider v-slot="{ errors }" name="Email" rules="email">
          <input
            v-model="form.email"
            type="email"
            name="email"
            class="form-control form-control-lg"
            required
          />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="form-group">
        <button
          :disabled="validate()"
          type="submit"
          class="btn btn-primary btn-lg btn-block"
        >
          Next
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ProfileCreate',
  data() {
    return {
      form: { beersLike: [], description: '', email: '' },
    }
  },
  methods: {
    handleBeersSave(beers) {
      this.form.beersLike = beers
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

<style></style>
