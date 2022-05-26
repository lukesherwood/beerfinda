<template>
  <div class="container">
    <h1 class="text-center text-primary">BEERS</h1>
    <Search />
    <div
      class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-4 d-flex"
    >
      <Card v-for="beer in getBeers" :beer="beer" :key="beer.beer_id"></Card>
    </div>
    <Pagination class="p-5" :pages="getPages" @pageChange="handlePageChange" />
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Card from "../components/Card.vue";
import Pagination from "../components/Pagination.vue";
import Search from "../components/Search.vue";
export default {
  components: { Card, Pagination, Search },
  name: "Beers",
  computed: {
    ...mapGetters({ getBeers: "getBeers", getPages: "getPages" }),
  },
  methods: {
    ...mapActions({ fetchBeers: "fetchBeers" }),
    ...mapMutations(["setCurrentPage"]),
    // this function cannot find the store
    handlePageChange(nextPage) {
      const limit = 100;
      const offset = (nextPage - 1) * 100;
      const nextUrl = `https://drspgoa.digifern.com/beer/?limit=${limit}&offset=${offset}`;
      this.fetchBeers({ nextUrl, nextPage });
    },
  },
  created() {
    this.fetchBeers();
  },
};
</script>
<style lang="scss"></style>
