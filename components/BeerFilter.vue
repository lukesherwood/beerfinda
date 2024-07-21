<template>
  <div class="container">
    <div class="filter-buttons text-center w-100">
      <!-- Beer Type Dropdown -->
      <button
        id="dropdownMenuButton"
        type="button"
        class="dropdown-toggle btn btn-outline-primary"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
      >
        Beer Type
        <span v-if="calculateBeerTypeCount() > 0"
          >({{ calculateBeerTypeCount() }})</span
        >
      </button>
      <ul
        class="dropdown-menu type-filter"
        aria-labelledby="dropdownMenuButton"
      >
        <li v-for="type in beerTypes" :key="'beerTypes' + type">
          <div class="dropdown-item">
            <label role="button" class="w-100"
              >{{ type }}
              <input
                :id="type"
                v-model="beerTypeKeywords"
                class="float-end"
                type="checkbox"
                :value="type"
              />
            </label>
          </div>
        </li>
      </ul>

      <!-- In Stock Button -->
      <button
        type="button"
        class="btn btn-outline-primary"
        @click="inStockHandler()"
      >
        <b-icon v-if="isInStockSet" icon="check2-square" class="pe-1"></b-icon>
        <b-icon v-else icon="square" class="pe-1"></b-icon>
        In Stock
      </button>

      <!-- Order Dropdown -->
      <button
        id="orderButton"
        type="button"
        class="btn btn-outline-primary dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span v-if="!getFilters.order">Sort</span>
        <span v-else>{{
          getKeyByValue(calculateOrderingTypes(), getFilters.order)
        }}</span>
      </button>
      <ul class="dropdown-menu" aria-labelledby="orderButton">
        <li
          v-for="type in Object.keys(orderingTypes)"
          :key="'ordering-types' + type"
        >
          <div role="button" class="dropdown-item" @click="orderHandler(type)">
            {{ type }}
          </div>
        </li>
      </ul>

      <!-- Range Filter -->
      <button
        id="rangeButton"
        type="button"
        class="btn btn-outline-primary dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span
          v-if="
            getFilters?.filter?.find(
              (filter) => filter.filterType === 'percentage__range'
            )
          "
        >
          {{ ABVRange[0] }}% - {{ ABVRange[1] }}% ABV
        </span>
        <span v-else>Alcohol Percentage</span>
      </button>
      <ul class="dropdown-menu" aria-labelledby="rangeButton">
        <li>
          <div class="dropdown-item">
            <label role="button" class="w-50 form-label">
              <input
                v-model="ABVRange[0]"
                class="form-range"
                type="range"
                min="0"
                max="20"
                step="1"
              />
              <input
                v-model="ABVRange[1]"
                class="form-range"
                type="range"
                min="0"
                max="20"
                step="1"
              />
            </label>
            <div class="text-center">
              {{ ABVRange[0] }}% - {{ ABVRange[1] }}%
            </div>
          </div>
          <div class="dropdown-item text-center">
            <button class="btn btn-primary w-100" @click="applyRangeFilter">
              Apply
            </button>
          </div>
        </li>
      </ul>

      <!-- Clear and Filter Buttons -->
      <button
        v-if="getFilters.filter.length > 0 || getFilters.order"
        class="btn btn-outline-danger clear-button"
        @click="clearHandler"
      >
        Clear
        <b-icon icon="x-circle"></b-icon>
      </button>
      <button class="btn btn-primary" @click="submitHandler">Filter</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { debounce } from 'lodash'
import { beerTypes, orderingTypes, userOrderingTypes } from '../helpers/beer.js'

export default {
  name: 'BeerFilter',
  props: ['loggedIn'],
  data() {
    return {
      beerTypes,
      userOrderingTypes,
      orderingTypes,
      ABVRange: [0, 20],
    }
  },
  computed: {
    ...mapGetters({
      getBeers: 'beer/getBeers',
      getFilters: 'beer/getFilters',
      isInStockSet: 'beer/isInStockSet',
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
    ...mapMutations({
      setFilter: 'beer/setFilter',
      setOrder: 'beer/setOrder',
      clearFilters: 'beer/clearFilters',
      setInStock: 'beer/setInStock',
    }),
    inStockHandler() {
      this.setInStock(Boolean(!this.isInStockSet))
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
      const queries = JSON.parse(JSON.stringify(this.$route.query))
      this.setOrder(this.calculateOrderingTypes()[keyword])
      queries.ordering = this.calculateOrderingTypes()[keyword]
      delete queries.page
      this.$router.push({
        path: 'beers',
        query: queries,
      })
      this.submitHandler()
    },
    calculateOrderingTypes() {
      return this.loggedIn
        ? {
            ...this.userOrderingTypes,
            'Rating (Low-High)': `ratings__cluster${this.$auth.$state.user?.cluster}`,
            'Rating (High-Low)': `-ratings__cluster${this.$auth.$state.user?.cluster}`,
          }
        : this.orderingTypes
    },
    calculateBeerTypeCount() {
      return this.getFilters?.filter?.find(
        (filter) => filter.filterType === 'type_upper__in'
      )?.keywords?.length
    },
    applyRangeFilter() {
      const [min, max] = this.ABVRange
      const queries = JSON.parse(JSON.stringify(this.$route.query))
      queries.filter = `percentage__range=${min},${max}`
      delete queries.page
      this.$router.push({
        path: 'beers',
        query: queries,
      })
      this.setFilter({
        filterType: 'percentage__range',
        keyword: [min, max],
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
.type-filter {
  height: 200px;
  width: 210px;
  overflow-y: auto;
  overflow-x: hidden;
}

@media only screen and (max-width: 770px) {
  .filter-buttons {
    -ms-overflow-style: none;
    scrollbar-width: none;
    display: flex;
    flex-direction: row;
    grid-gap: 8px;
    gap: 8px;
    overflow-x: scroll;
    justify-content: flex-start;
    white-space: nowrap;
  }
  .filter-buttons::-webkit-scrollbar {
    display: none;
  }
}

@media only screen and (min-width: 1000px) {
  .container {
    width: 80%;
  }
}
</style>
