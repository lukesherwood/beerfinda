<template>
  <div class="container">
    <h1 class="text-center text-primary">BEER</h1>
    <Spinner v-if="isLoading" />
    <BeerPage v-else :beer="getBeer" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Beer',
  asyncData({ route }) {
    return {
      id: route.params.id,
    }
  },
  async fetch() {
    await this.fetchBeer(this.id)
  },
  head() {
    return {
      title: `Beerfinda | Beers | ${this.getBeer.name}`,
    }
  },
  computed: {
    ...mapGetters({
      getBeer: 'getBeer',
      isLoading: 'isLoading',
    }),
  },

  methods: {
    ...mapActions({ fetchBeer: 'fetchBeer' }),
  },
}
</script>
<style lang="scss"></style>
