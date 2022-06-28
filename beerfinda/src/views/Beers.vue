<template>
  <div class="container">
    <h1 class="text-center text-primary">BEERS</h1>
    <Search @search="getBeerResults" />
    <Filter @filter="getBeerResults" @order="getBeerResults" />
    <Spinner v-if="isLoading" />
    <div v-else>
      <h4 v-if="getBeers.length == 0" class="text-center pt-3">
        <i class="bi bi-search"></i>
        Sorry, we couldn't find
        <span v-if="this.getFilters.searchTerm">
          : '{{ this.getFilters.searchTerm }}'
        </span>
      </h4>
      <div v-else>
        <div
          class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-4 d-flex"
        >
          <BeerCard
            v-for="beer in getBeers"
            :beer="beer"
            :key="beer.beer_id"
          ></BeerCard>
        </div>
        <Pagination
          class="p-5"
          :pages="getPages"
          @pageChange="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import BeerCard from "../components/BeerCard.vue";
import Filter from "../components/Filter.vue";
import Pagination from "../components/Pagination.vue";
import Search from "../components/Search.vue";
import Spinner from "../components/Spinner.vue";
export default {
  components: { BeerCard, Pagination, Search, Spinner, Filter },
  name: "Beers",
  computed: {
    ...mapGetters({
      getBeers: "getBeers",
      getPages: "getPages",
      isLoading: "isLoading",
      getFilters: "getFilters",
      isInStockSet: "isInStockSet",
    }),
  },
  methods: {
    ...mapActions({ fetchBeers: "fetchBeers" }),
    ...mapMutations(["setCurrentPage"]),
    getBeerResults() {
      this.setCurrentPage(1);
      this.fetchBeers({ url: this.createUrl() });
    },
    handlePageChange() {
      const page = this.getPages.currentPage;
      const limit = 100;
      const offset = (page - 1) * 100;
      const url = this.createUrl() + `limit=${limit}&offset=${offset}&`;
      this.fetchBeers({ url });
    },
    createUrl() {
      let url = this.$hostname + "beer/?";
      const filters = this.getFilters.filter;
      const order = this.getFilters.order;
      const searchTerm = this.getFilters.searchTerm;
      const isInStockSet = this.isInStockSet;
      if (filters.length) {
        filters.forEach((filter) => {
          url += `${filter.filterType}=${filter.keywords.join(", ")}&`;
        });
      }
      if (order) {
        url += `ordering=${order}&`;
      }
      if (isInStockSet) {
        url += `merchantsellsfound__isnull=${!isInStockSet}&`;
      }
      if (searchTerm) {
        url += `search=${searchTerm}&`;
      }
      return url;
    },
  },
  created() {
    this.getBeerResults();
  },
};
</script>
<style lang="scss"></style>
