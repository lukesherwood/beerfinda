<template>
  <div class="container">
    <h1 class="text-center text-primary">BEER</h1>
    <Spinner v-if="isLoading" />
    <BeerPage v-else :beer="getBeer" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import BeerPage from "../components/BeerPage.vue";
import Spinner from "../components/Spinner.vue";
export default {
  name: "Beer",
  components: { BeerPage, Spinner },
  computed: {
    ...mapGetters({
      getBeer: "getBeer",
      isLoading: "isLoading",
    }),
  },
  data() {
    return {
      id: this.$route.params.id,
    };
  },

  methods: {
    ...mapActions({ fetchBeer: "fetchBeer" }),
  },
  created() {
    this.fetchBeer(this.id);
  },
};
</script>
<style lang="scss" scoped></style>
