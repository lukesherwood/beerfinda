<template>
  <main class="container">
    <h3 class="text-center">Featured Beers</h3>
    <Spinner v-if="isLoading" />
    <div v-else>
      <CardCarousel :beers="getFeaturedBeers" />
    </div>
    <div class="text-center">
      <router-link class="btn btn-primary view-beers" :to="{ name: 'beers' }"
        ><b>Click Here To View All Beers</b></router-link
      >
    </div>
  </main>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import CardCarousel from "../components/CardCarousel.vue";
import Spinner from "../components/Spinner.vue";
export default {
  components: {
    CardCarousel,
    Spinner,
  },
  name: "Home",
  computed: {
    ...mapGetters({
      isLoading: "isLoading",
      getFeaturedBeers: "getFeaturedBeers",
    }),
  },
  methods: {
    ...mapActions({ fetchFeaturedBeers: "fetchFeaturedBeers" }),
  },
  created() {
    this.fetchFeaturedBeers();
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 95%;
}
.view-beers {
  width: 50%;
}
@media only screen and (max-width: 500px) {
  .view-beers {
    width: 100%;
  }
}
</style>
