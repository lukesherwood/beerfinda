<template>
  <div class="container">
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
        type="button"
        class="btn btn-outline-primary btn-sm"
        @click="inStockHandler()"
      >
        <i v-if="isInStockSet" class="bi bi-check2-square pe-1"></i>
        <i v-else class="bi bi-square pe-1"></i>
        In Stock
      </button>

      <button
        id="orderButton"
        type="button"
        class="btn btn-outline-primary dropdown-toggle btn-sm"
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
import { debounce } from "lodash";
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
      this.debounceFilter();
    },
    inStockHandler() {
      this.setInStock(!this.isInStockSet);
      this.$emit("filter");
    },
    orderHandler(keyword) {
      this.setOrder(this.ordering_types[keyword]);
      this.debounceFilter();
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
  created() {
    this.debounceFilter = debounce(this.submitHandler, 2000);
  },
  data() {
    return {
      beer_types,
      ordering_types,
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
