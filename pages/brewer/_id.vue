<template>
  <div class="container">
    <Spinner
      v-if="$fetchState.pending || isLoading"
      :loading="$fetchState.pending || isLoading"
    />
    <Error v-else-if="$fetchState.error" :error="$fetchState.error" />
    <BrewerPage v-else :brewer="getBrewer" />
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
      title: `Beerfinda | Brewer | ${this.getBrewer.name}`,
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
  min-height: 100vh;
}
</style>
