<template>
  <div class="container">
    <Breadcrumbs />
    <Spinner
      v-if="$fetchState.pending || isLoading"
      :loading="$fetchState.pending || isLoading"
    />
    <Error v-else-if="$fetchState.error" :error="$fetchState.error" />
    <BrewerPage v-else :brewer="getBrewer" :beers-in-stock="getBrewer.beers_in_stock" :beers-brewer="getBrewer.beers_brewer" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Brewer',
  asyncData({ route }) {
    return {
      id: route.params.id,
    }
  },
  async fetch() {
    await this.fetchBrewer(this.id)
  },
  head() {
    return {
      title: this.getBrewer.name
        ? `Beerfinda | Brewer | ${this.getBrewer.name}`
        : 'Beerfinda | Brewer',
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
      getBrewer: 'brewer/getBrewer',
      isLoading: 'brewer/isLoading',
    }),
  },

  methods: {
    ...mapActions({ fetchBrewer: 'brewer/fetchBrewer' }),
  },
}
</script>
<style lang="scss" scoped>
.container {
  background-color: white !important;
  min-height: 80vh;
}
</style>
