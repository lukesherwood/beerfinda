<template>
  <div class="container">
    <Spinner
      v-if="$fetchState.pending || isLoading"
      :loading="$fetchState.pending || isLoading"
    />
    <p v-else-if="$fetchState.error" class="alert alert-danger">
      Error: {{ $fetchState.error.message }}
    </p>
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
<style lang="scss" scoped>
.container {
  background-color: white !important;
  min-height: 100vh;
}
</style>
