<template>
  <div class="container">
    <h1 class="text-center text-primary">BEER</h1>
    <Spinner v-if="isLoading" />
    <BeerPage v-else :beer="getBeer" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import BeerPage from '../../components/BeerPage.vue'
import Spinner from '../../components/Spinner.vue'
export default {
  name: 'Beer',
  components: { BeerPage, Spinner },
  data() {
    return {
      id: this.$route.params.id,
    }
  },
  computed: {
    ...mapGetters({
      getBeer: 'getBeer',
      isLoading: 'isLoading',
    }),
  },

  created() {
    this.fetchBeer(this.id)
  },
  methods: {
    ...mapActions({ fetchBeer: 'fetchBeer' }),
  },
}
</script>
<style lang="scss"></style>
