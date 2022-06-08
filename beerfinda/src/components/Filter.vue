<template>
  <div>
    <div class="btn-group" role="group">
      <button
        id="filterButton"
        type="button"
        class="btn btn-primary dropdown-toggle btn-sm"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Filter by Type
        <span v-if="getFilterCount > 0">({{ getFilterCount }})</span>
      </button>
      <ul class="dropdown-menu" aria-labelledby="filterButton">
        <li v-for="type in type_upper" :key="type">
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
        class="btn btn-primary dropdown-toggle btn-sm"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span v-if="!this.getFilters.order">Sort</span>
        <span v-else>{{ this.getFilters.order }}</span>
      </button>
      <ul class="dropdown-menu" aria-labelledby="orderButton">
        <li v-for="type in Object.keys(ordering)" :key="type">
          <a @click="orderHandler(type)" href="#" class="dropdown-item">{{
            type
          }}</a>
        </li>
      </ul>
    </div>
    <div class="btn-group">
      <button
        class="btn btn-sm btn-danger"
        @click="clearHandler"
        v-if="getFilterCount > 0 || this.getFilters.order"
      >
        Clear (X)
      </button>
      <button class="btn btn-sm btn-primary" @click="submitHandler">
        Filter
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
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
      this.setOrder(this.ordering[keyword]);
    },
    clearHandler() {
      this.clearFilters();
    },
    submitHandler() {
      this.$emit("filter");
    },
  },
  data() {
    return {
      type_upper: [
        "Pale Ales",
        "Lagers",
        "India Pale Ales",
        "Belgian Style",
        "Stout",
        "Strong Ales",
        "Brown Ales",
        "Porter",
        "Wheat Beer",
        "Speciality",
        "Hybrid Beer",
        "Dark Lager",
        "Cider",
        "Pilsener",
        "Sour Beer",
        "Belgian-Style Ales",
        "Anglo-American Ales",
        "Stout and Porter",
        "Other Styles",
      ],
      ordering: {
        "Name A-Z": "+name",
        "Name Z-A": "-name",
        "Price (Low-High)": "+merchantsellsfound__price",
        "Price (High-Low)": "-merchantsellsfound__price",
        "Rating (High-Low)": "-rating",
        "Rating (Low-High)": "+rating",
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.btn-group {
  padding-bottom: 15px;
}
.dropdown-menu {
  height: 200px;
  width: 210px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
