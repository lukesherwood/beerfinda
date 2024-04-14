<template>
  <div class="container">
    <Breadcrumbs />
    <Spinner
      v-if="$fetchState.pending || isLoading"
      :loading="$fetchState.pending || isLoading"
    />
    <Error v-else-if="$fetchState.error" :error="$fetchState.error" />
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
    try {
      await this.fetchBeer(this.id)
    } catch (error) {
      throw new Error(error)
    }
  },
  head() {
    return {
      title: this.getBeer.name
        ? `Beerfinda | Beers | ${this.getBeer.name}`
        : 'Beerfinda | Beers',
      script: [
        {
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4030304334636114',
          async: true,
          crossorigin: 'anonymous',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      getBeer: 'beer/getBeer',
      isLoading: 'beer/isLoading',
    }),
  },

  methods: {
    ...mapActions({ fetchBeer: 'beer/fetchBeer' }),
  },
}
</script>
<style lang="scss" scoped>
.container {
  background-color: white !important;
  min-height: 80vh;
}
</style>
