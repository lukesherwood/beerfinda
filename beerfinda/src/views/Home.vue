<template>
  <main class="container">
    <h3>Featured Beers</h3>
    <Spinner v-if="isLoading" />
    <div v-else>
      <CardCarousel :beers="getFeaturedBeers" />
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
<style lang=""></style>
