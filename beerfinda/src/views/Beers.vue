<template>
  <div class="container">
    <h1 class="text-center text-primary">BEERS</h1>
    <div
      class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-4 d-flex"
    >
      <Card v-for="beer in getBeers" :beer="beer" :key="beer.beer_id"></Card>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Card from "../components/Card.vue";
export default {
  components: { Card },
  name: "Beers",
  computed: {
    ...mapGetters({ getBeers: "getBeers" }),
  },
  methods: {
    ...mapActions({ fetchBeers: "fetchBeers" }),
  },
  created() {
    this.fetchBeers();
  },
};
</script>
<style lang="scss"></style>
