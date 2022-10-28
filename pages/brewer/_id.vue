<template>
  <div class="container">
    <h1 class="text-center text-primary">BREWER</h1>
    <Spinner v-if="isLoading" />
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
<style lang="scss"></style>
