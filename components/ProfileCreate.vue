<template>
  <div role="main" aria-labelledby="signup-heading">
    <h3 id="signup-heading">Sign Up</h3>
    <form @submit.prevent="$emit('profileCreate', form)">
      <div class="float-end">1/2</div>
      <h4>Create Profile</h4>
      <div class="form-group mb-3 pt-3">
        <label id="beers-label"
          >Enter one or more NZ beers that you enjoy</label
        >
        <RegisterBeerSearch
          :beers-like="form.beersLike"
          @beersSave="handleBeersSave"
        />
      </div>
      <div class="form-group mb-3 pt-3">
        <label id="flavour-label">Select one or more beer flavours</label>
        <div
          class="btn-group"
          role="group"
          aria-label="Beer flavours"
          style="display: block"
        >
          <button
            v-for="(flavour, index) in paginatedFlavours"
            :key="index"
            type="button"
            class="btn badge rounded-pill mx-1 my-1"
            :class="{
              'btn-warning': form.characteristics_like.includes(flavour),
              'text-bg-light': !form.characteristics_like.includes(flavour),
            }"
            style="display: inline-block"
            @click="handleFlavourSelect(flavour)"
          >
            {{ flavour }}
          </button>
        </div>
        <div class="pagination">
          <button
            class="btn btn-sm btn-outline-primary mx-1 my-1"
            :disabled="currentPage === 0"
            @click.prevent="prevPage"
          >
            Previous
          </button>
          <button
            class="btn btn-sm btn-outline-primary mx-1 my-1"
            :disabled="
              (currentPage + 1) * itemsPerPage >= form?.flavours?.length
            "
            @click.prevent="nextPage"
          >
            Next
          </button>
        </div>
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
        <label id="email-label">Email address</label>
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
      currentPage: 0,
      itemsPerPage: 10,
    }
  },
  computed: {
    paginatedFlavours() {
      const start = this.currentPage * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.form.flavours.slice(start, end)
    },
  },
  methods: {
    handleBeersSave(beers) {
      this.form.beersLike = beers
    },
    handleFlavourSelect(flavour) {
      if (this.form.characteristics_like.includes(flavour)) {
        this.form.characteristics_like = this.form.characteristics_like.filter(
          (f) => f !== flavour
        )
      } else {
        this.form.characteristics_like.push(flavour)
      }
    },
    nextPage() {
      if (
        (this.currentPage + 1) * this.itemsPerPage <
        this.form?.flavours?.length
      ) {
        this.currentPage++
      }
    },
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--
      }
    },
    validate() {
      return !this.form?.beersLike?.length || !this.form.email
    },
  },
}
</script>

<style></style>
