<template>
  <div class="container">
    <h1 class="text-center text-primary">BEERS</h1>
    <Search @search="handleSearch" />
    <Filter @filter="handleFilter" />
    <Spinner v-if="isLoading" />
    <div v-else>
      <div v-if="getBeers.length == 0">
        Sorry, no beers match: '{{ this.currentTerm }}'
      </div>
      <div v-else>
        <h6 v-if="this.currentTerm">
          Search results for: '{{ this.currentTerm }}'
        </h6>
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
import { mapActions, mapGetters, mapMutations } from "vuex";
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
    }),
  },
  data() {
    return {
      currentTerm: "",
    };
  },
  methods: {
    ...mapActions({ fetchBeers: "fetchBeers" }),
    ...mapMutations(["setCurrentPage"]),
    handlePageChange(nextPage) {
      const limit = 100;
      const offset = (nextPage - 1) * 100;
      const url = `https://drspgoa.digifern.com/beer/?limit=${limit}&offset=${offset}`;
      this.fetchBeers({ url, nextPage });
    },
    handleSearch(searchTerm) {
      this.currentTerm = searchTerm;
      const url = `https://drspgoa.digifern.com/beer/?search=${searchTerm}`;
      this.fetchBeers({ url }).then(() => {
        this.searchDone = true;
      });
    },
    handleFilter({ filterType, keyword }) {
      // this.currentTerm = filterTerm;
      // const fakeUrl = "?type_upper__in=Pale+Ales";
      const url = `https://drspgoa.digifern.com/beer/?${filterType}__in=${keyword}`;
      this.fetchBeers({ url }).then(() => {
        this.searchDone = true;
      });
    },
  },
  created() {
    this.fetchBeers();
  },
};
</script>
<style lang="scss"></style>
