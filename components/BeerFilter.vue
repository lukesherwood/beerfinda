<template>
  <div class="container pt-4">
    <div class="filter-buttons d-flex justify-content-evenly w-100">
      <button
        id="filterButton"
        type="button"
        class="btn btn-outline-primary dropdown-toggle btn-sm"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
      >
        Filter by Type
        <span v-if="getFilterCount > 0">({{ getFilterCount }})</span>
      </button>
      <ul class="dropdown-menu" aria-labelledby="filterButton">
        <li v-for="type in beerTypes" :key="type">
          <div class="dropdown-item">
            <label :for="type" class="w-100">{{ type }} </label>
            <input
              :id="type"
              v-model="beerTypeKeywords"
              class="pull-right"
              type="checkbox"
              :value="type"
            />
          </div>
        </li>
      </ul>

      <button
        type="button"
        class="btn btn-outline-primary btn-sm"
        @click="inStockHandler()"
      >
        <b-icon v-if="isInStockSet" icon="check2-square" class="pe-1"></b-icon>
        <b-icon v-else icon="square" class="pe-1"></b-icon>
        In Stock
      </button>

      <button
        id="orderButton"
        type="button"
        class="btn btn-outline-primary dropdown-toggle btn-sm"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span v-if="!getFilters.order">Sort</span>
        <span v-else>{{ getKeyByValue(orderingTypes, getFilters.order) }}</span>
      </button>
      <ul class="dropdown-menu" aria-labelledby="orderButton">
        <li v-for="type in Object.keys(orderingTypes)" :key="type">
          <a href="#" class="dropdown-item" @click="orderHandler(type)">{{
            type
          }}</a>
        </li>
      </ul>
      <button
        v-if="getFilterCount > 0 || getFilters.order"
        class="btn btn-sm btn-outline-danger clear-button"
        @click="clearHandler"
      >
        Clear
        <b-icon icon="x-circle"></b-icon>
      </button>
      <button class="btn btn-sm btn-primary" @click="submitHandler">
        Filter
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import { debounce } from 'lodash'
import { beerTypes, orderingTypes } from '../helpers/beerHelpers.js'
export default {
  name: 'BeerFilter',
  data() {
    return {
      beerTypes,
      orderingTypes,
    }
  },
  computed: {
    ...mapGetters({
      getBeers: 'getBeers',
      getFilters: 'getFilters',
      getFilterCount: 'getFilterCount',
      isInStockSet: 'isInStockSet',
    }),
    beerTypeKeywords: {
      get() {
        return (
          this.getFilters.filter?.find((filter) => {
            return filter.filterType === 'type_upper__in'
          })?.keywords || []
        )
      },
      set(value) {
        // makes a clean copy of the router query
        const queries = JSON.parse(JSON.stringify(this.$route.query))
        delete queries.page
        queries.filter = `type_upper__in=${value}`
        this.$router.push({
          path: 'beers',
          query: queries,
        })
        this.setFilter({
          filterType: 'type_upper__in',
          keyword: value,
        })
        this.debounceFilter()
      },
    },
  },
  created() {
    this.debounceFilter = debounce(this.submitHandler, 2000)
  },
  methods: {
    ...mapMutations(['setFilter', 'setOrder', 'clearFilters', 'setInStock']),
    inStockHandler() {
      // !!! ensures its a strict boolean and toggles to the opposite
      // eslint-disable-next-line no-extra-boolean-cast
      this.setInStock(!!!this.isInStockSet)
      const queries = JSON.parse(JSON.stringify(this.$route.query))
      queries.inStock = this.isInStockSet
      delete queries.page
      this.$router.push({
        path: 'beers',
        query: queries,
      })
      this.submitHandler()
    },
    orderHandler(keyword) {
      this.setOrder(this.orderingTypes[keyword])
      const queries = JSON.parse(JSON.stringify(this.$route.query))
      queries.ordering = this.orderingTypes[keyword]
      delete queries.page
      this.$router.push({
        path: 'beers',
        query: queries,
      })
      this.submitHandler()
    },
    clearHandler() {
      this.clearFilters()
      this.$router.replace({ path: 'beers', query: {} })
      this.submitHandler()
    },
    submitHandler() {
      this.$emit('filter')
    },
    getKeyByValue(object, value) {
      return Object.keys(object).find((key) => object[key] === value)
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.dropdown-menu {
  height: 200px;
  width: 210px;
  overflow-y: auto;
  overflow-x: hidden;
}
.container {
  width: 80%;
  padding-bottom: 15px;
}
.filter-buttons button {
  border-radius: 50px;
  padding: 5px 25px 5px 25px;
}

.set {
  background: $success;
  color: $primary;
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
