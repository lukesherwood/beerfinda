<template>
  <div class="container">
    <div class="filter-buttons d-flex justify-content-evenly w-100">
      <button
        id="filterButton"
        type="button"
        class="btn btn-outline-primary dropdown-toggle btn-sm"
        :class="{ active: getFilterCount > 0 }"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Filter by Type
        <span v-if="getFilterCount > 0">({{ getFilterCount }})</span>
      </button>
      <ul class="dropdown-menu" aria-labelledby="filterButton">
        <li v-for="type in beer_types" :key="type">
          <div class="dropdown-item">
            <label :for="type" class="w-100">{{ type }} </label>
            <input
              class="pull-right"
              :id="type"
              type="checkbox"
              @click="filterHandler(`type_upper__in`, type)"
              :value="type"
            />
          </div>
        </li>
      </ul>

      <button
        id="filterButton"
        type="button"
        class="btn btn-outline-primary btn-sm"
        :class="{ active: isInStockSet }"
        @click="inStockHandler()"
      >
        In Stock
      </button>

      <button
        id="orderButton"
        type="button"
        class="btn btn-outline-primary dropdown-toggle btn-sm"
        :class="{ active: this.getFilters.order }"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span v-if="!this.getFilters.order">Sort</span>
        <span v-else>{{
          getKeyByValue(this.ordering_types, this.getFilters.order)
        }}</span>
      </button>
      <ul class="dropdown-menu" aria-labelledby="orderButton">
        <li v-for="type in Object.keys(ordering_types)" :key="type">
          <a @click="orderHandler(type)" href="#" class="dropdown-item">{{
            type
          }}</a>
        </li>
      </ul>
      <button
        class="btn btn-sm btn-outline-danger clear-button"
        @click="clearHandler"
        v-if="getFilterCount > 0 || this.getFilters.order"
      >
        Clear
        <i class="bi bi-x-circle"></i>
      </button>
      <button class="btn btn-sm btn-primary" @click="submitHandler">
        Filter
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { beer_types, ordering_types } from "../helpers/beerHelpers.js";
export default {
  name: "Filter",
  computed: {
    ...mapGetters({
      getBeers: "getBeers",
      getFilters: "getFilters",
      getFilterCount: "getFilterCount",
      isInStockSet: "isInStockSet",
    }),
  },
  methods: {
    ...mapMutations(["setFilter", "setOrder", "clearFilters", "setInStock"]),
    filterHandler(filterType, keyword) {
      this.setFilter({ filterType, keyword });
    },
    inStockHandler() {
      this.setInStock(!this.isInStockSet);
      this.$emit("filter");
    },
    orderHandler(keyword) {
      this.setOrder(this.ordering_types[keyword]);
    },
    clearHandler() {
      this.clearFilters();
      this.$emit("filter");
    },
    submitHandler() {
      this.$emit("filter");
    },
    getKeyByValue(object, value) {
      return Object.keys(object).find((key) => object[key] === value);
    },
  },
  data() {
    return {
      beer_types,
      ordering_types,
      // inStock: getFilters.filter.filterType.merchantsellsfound__isnull,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/variables.scss";

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
  min-width: 200px;
}

.active {
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
    min-width: 150px;
  }
}

@media only screen and (max-width: 800px) {
  .filter-buttons button {
    min-width: 60px;
  }
}
</style>
