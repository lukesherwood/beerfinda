<template>
  <div>
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
          'btn-warning': characteristics_like.includes(flavour),
          'text-bg-light': !characteristics_like.includes(flavour),
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
        :disabled="(currentPage + 1) * itemsPerPage >= flavours?.length"
        @click.prevent="nextPage"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { beerCharacteristics } from '../helpers/beer.js'
export default {
  props: ['flavoursLike'],
  data() {
    return {
      flavours: beerCharacteristics,
      characteristics_like: this.flavoursLike || [],
      currentPage: 0,
      itemsPerPage: 10,
    }
  },
  computed: {
    paginatedFlavours() {
      const start = this.currentPage * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.flavours.slice(start, end)
    },
  },
  watch: {
    characteristics_like() {
      this.submitHandler()
    },
  },
  methods: {
    handleFlavourSelect(flavour) {
      if (this.characteristics_like.includes(flavour)) {
        this.characteristics_like = this.characteristics_like.filter(
          (f) => f !== flavour
        )
      } else {
        this.characteristics_like.push(flavour)
      }
    },
    submitHandler() {
      this.$emit('flavourSave', this.characteristics_like)
    },
    nextPage() {
      if ((this.currentPage + 1) * this.itemsPerPage < this.flavours?.length) {
        this.currentPage++
      }
    },
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--
      }
    },
  },
}
</script>
