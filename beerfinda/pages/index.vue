<template>
  <main class="container text-center">
    <h3 class="">Featured Beers</h3>
    <Spinner v-if="isLoading" />
    <div v-else>
      <!-- <CardCarousel :beers="getFeaturedBeers" /> -->
      <div class="card mt-3">
        <nuxtLink
          class="btn btn-outline-primary border-0 w-100 p-3"
          to="/beers"
        >
          <h5>View All Beers</h5>
        </nuxtLink>
      </div>
      <div class="card mt-3">
        <h4>How it Works:</h4>
        <div class="p-1">
          <img
            src="
              'https://drspgoa.digifern.com/img/brand/how-it-works-step-1.png'
            "
            alt="how-to1"
          />
        </div>
        <div class="p-1">
          <img
            src="
              'https://drspgoa.digifern.com/img/brand/how-it-works-step-2.png'
            "
            alt="how-to2"
          />
        </div>
        <div class="p-1">
          <img
            src="
              'https://drspgoa.digifern.com/img/brand/how-it-works-step-3.png'
            "
            alt="how-to3"
          />
        </div>
      </div>
      <div class="card mt-3">
        <nuxtLink
          class="btn btn-outline-primary border-0 w-100 p-3"
          to="/users"
        >
          <h5>Sign Up</h5>
        </nuxtLink>
      </div>
    </div>
  </main>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
// import CardCarousel from '../components/CardCarousel.vue'
import Spinner from '../components/Spinner.vue'
export default {
  name: 'index',
  components: {
    // CardCarousel,
    Spinner,
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
      getFeaturedBeers: 'getFeaturedBeers',
    }),
  },
  created() {
    this.fetchFeaturedBeers()
  },
  methods: {
    ...mapActions({ fetchFeaturedBeers: 'fetchFeaturedBeers' }),
  },
}
</script>
<style lang="scss">
.container {
  width: 95%;
}
</style>
