<template>
  <div class="container">
    <h1 class="text-center text-primary">BEERS</h1>
    <Search @search="handleFilter" />
    <Filter @filter="handleFilter" @order="handleFilter" />
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
          <Card
            v-for="beer in getBeers"
            :beer="beer"
            :key="beer.beer_id"
          ></Card>
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
import { mapActions, mapGetters } from "vuex";
import Card from "../components/Card.vue";
import Filter from "../components/Filter.vue";
import Pagination from "../components/Pagination.vue";
import Search from "../components/Search.vue";
import Spinner from "../components/Spinner.vue";
export default {
  components: { Card, Pagination, Search, Spinner, Filter },
  name: "Beers",
  computed: {
    ...mapGetters({
      getBeers: "getBeers",
      getPages: "getPages",
      isLoading: "isLoading",
      getFilters: "getFilters",
    }),
  },
  methods: {
    ...mapActions({ fetchBeers: "fetchBeers" }),
    handlePageChange(nextPage) {
      const limit = 100;
      const offset = (nextPage - 1) * 100;
      const url = `https://drspgoa.digifern.com/beer/?limit=${limit}&offset=${offset}`;
      this.fetchBeers({ url, nextPage });
    },
    handleFilter() {
      const filters = this.getFilters.filter;
      const order = this.getFilters.order;
      const searchTerm = this.getFilters.searchTerm;
      let url = `https://drspgoa.digifern.com/beer/?`;
      if (filters.length) {
        filters.forEach((filter) => {
          url = url + `${filter.filterType}=${filter.keywords.join(", ")}&`;
        });
      }
      if (order) {
        url = url + `ordering=${order}&`;
      }
      if (searchTerm) {
        url = url + `search=${searchTerm}&`;
      }
      this.fetchBeers({ url }).then(() => {
        this.searchDone = true;
      });
    },
  },
  created() {
    this.handleFilter();
  },
};
</script>
<style lang="scss"></style>
