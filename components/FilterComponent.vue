<template>
  <div class="container pt-4">
    <div class="filter-buttons text-center w-100">
      <button
        id="dropdownMenuButton"
        type="button"
        class="btn btn-outline-primary dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span v-if="!filters.order">Sort</span>
        <span v-else>{{ getKeyByValue(orderingTypes, filters.order) }}</span>
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li v-for="type in Object.keys(orderingTypes)" :key="'ordering' + type">
          <div
            role="button"
            class="dropdown-item"
            @click="filters.order = orderingTypes[type]"
          >
            {{ type }}
          </div>
        </li>
      </ul>
      <button
        v-if="filters.order"
        class="btn btn-outline-danger clear-button"
        @click="handleClear"
      >
        Clear
        <b-icon icon="x-circle"></b-icon>
      </button>
      <button class="btn btn-primary" @click="onFilter">Filter</button>
    </div>
  </div>
</template>
<script>
import { debounce } from 'lodash'
export default {
  name: 'FilterComponent',
  props: ['ordering'],
  data() {
    return {
      orderingTypes: this.ordering,
      filters: {
        order: '',
      },
    }
  },
  watch: {
    'filters.order'() {
      if (!this.filters.order) return
      this.debounceFilter()
    },
  },
  created() {
    this.debounceFilter = debounce(this.onFilter, 2000)
  },
  methods: {
    handleClear() {
      this.filters.order = ''
      this.$emit('clear')
    },
    onFilter() {
      this.$emit('filter', this.filters)
    },
    getKeyByValue(object, value) {
      return Object.keys(object).find((key) => object[key] === value)
    },
  },
}
</script>
<style lang="scss" scoped>
.type-filter {
  height: 200px;
  width: 210px;
  overflow-y: auto;
  overflow-x: hidden;
}
.container {
  width: 80%;
}

@media only screen and (max-width: 500px) {
  .container {
    width: 100%;
  }
}

@media only screen and (max-width: 1000px) {
  .filter-buttons button {
    min-width: 160px;
  }
}

@media only screen and (max-width: 800px) {
  .filter-buttons button {
    min-width: 60px;
    padding: 5px;
  }
}
</style>
