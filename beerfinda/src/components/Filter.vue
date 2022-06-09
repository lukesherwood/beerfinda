<template>
  <div class="container">
    <div class="d-flex justify-content-evenly">
      <button
        id="filterButton"
        type="button"
        class="btn btn-outline-primary dropdown-toggle btn-sm rounded-pill"
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
        id="orderButton"
        type="button"
        class="btn btn-outline-primary rounded-pill dropdown-toggle btn-sm"
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
        class="btn btn-sm btn-outline-danger rounded-pill clear-button"
        @click="clearHandler"
        v-if="getFilterCount > 0 || this.getFilters.order"
      >
        Clear
        <i class="bi bi-x-circle"></i>
      </button>
      <button
        class="btn btn-sm btn-primary rounded-pill"
        @click="submitHandler"
      >
        Submit Filter
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { beer_types } from "../helpers/beerTypeMaps";
import { ordering_types } from "../helpers/apiTransformMaps";
export default {
  name: "Filter",
  computed: {
    ...mapGetters({
      getBeers: "getBeers",
      getFilters: "getFilters",
      getFilterCount: "getFilterCount",
    }),
  },
  methods: {
    ...mapMutations(["setFilter", "setOrder", "clearFilters"]),
    filterHandler(filterType, keyword) {
      this.setFilter({ filterType, keyword });
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
    };
  },
};
</script>
<style lang="scss" scoped>
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
.btn {
  min-width: 180px;
}
.clear-button {
  min-width: 10px;
}
</style>
