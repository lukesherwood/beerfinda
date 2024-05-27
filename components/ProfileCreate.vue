<template>
  <div role="main" aria-labelledby="signup-heading">
    <h3 id="signup-heading">Sign Up</h3>
    <form @submit.prevent="$emit('profileCreate', form)">
      <div class="float-end">1/2</div>
      <h4>Create Profile</h4>
      <div class="form-group mb-3 border p-2 rounded">
        <label id="beers-label"
          >Enter one or more NZ beers that you enjoy *</label
        >
        <RegisterBeerSearch
          :beers-like="form.beersLike"
          @beersSave="handleBeersSave"
        />
      </div>
      <div class="form-group mb-3 border p-2 rounded">
        <CharacteristicsSelector @flavourSave="handleFlavourSave" />
      </div>
      <div class="form-group mb-3 pt-3">
        <label id="description-label"
          >Describe the type of beer that you like</label
        >
        <input
          v-model="form.description"
          type="text"
          name="description"
          class="form-control form-control-lg"
          aria-labelledby="description-label"
        />
      </div>
      <div class="form-group mb-3">
        <label id="email-label">Email address *</label>
        <ValidationProvider v-slot="{ errors }" name="Email" rules="email">
          <input
            v-model="form.email"
            type="email"
            name="email"
            class="form-control form-control-lg"
            required
            aria-labelledby="email-label"
          />
          <span class="text-danger">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <Error v-if="errorMessage" :error="errorMessage" />
      <div class="form-group">
        <button
          :disabled="validate()"
          type="submit"
          class="btn btn-primary btn-lg btn-block"
        >
          Next
        </button>
      </div>
      <div>* Required fields</div>
    </form>
  </div>
</template>

<script>
import { beerCharacteristics } from '../helpers/beer.js'
export default {
  name: 'ProfileCreate',
  props: ['error', 'formData'],
  data() {
    return {
      form: this.formData || {
        beersLike: [],
        description: '',
        email: '',
        flavours: beerCharacteristics,
        characteristics_like: [],
      },
      errorMessage: this.error,
    }
  },
  methods: {
    handleBeersSave(beers) {
      this.form.beersLike = beers
    },
    handleFlavourSave(flavours) {
      this.form.characteristics_like = flavours
    },
    validate() {
      return !this.form?.beersLike?.length || !this.form.email
    },
  },
}
</script>

<style></style>
