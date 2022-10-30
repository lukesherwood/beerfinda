<template>
  <main class="container text-center">
    <Banner text="Featured Beers"> </Banner>
    <Spinner v-if="isLoading" />
    <div v-else>
      <CardCarousel :beers="getFeaturedBeers" />
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
          <nuxt-img
            loading="lazy"
            placeholder="400"
            src="https://drs-pgo-image.s3.ap-southeast-2.amazonaws.com/brand/how-it-works-step-1.png"
            alt="how-to1"
          />
        </div>
        <div class="p-1">
          <nuxt-img
            loading="lazy"
            placeholder="400"
            src="https://drs-pgo-image.s3.ap-southeast-2.amazonaws.com/brand/how-it-works-step-2.png"
            alt="how-to2"
          />
        </div>
        <div class="p-1">
          <nuxt-img
            loading="lazy"
            placeholder="400"
            src="https://drs-pgo-image.s3.ap-southeast-2.amazonaws.com/brand/how-it-works-step-3.png"
            alt="how-to3"
          />
        </div>
      </div>
      <div class="card mt-3">
        <nuxtLink
          class="btn btn-outline-primary border-0 w-100 p-3"
          to="/register"
        >
          <h5>Sign Up</h5>
        </nuxtLink>
      </div>
    </div>
  </main>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Index',
  async fetch() {
    try {
      await this.$store.dispatch('fetchFeaturedBeers')
    } catch (error) {
      console.error(error)
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
      getFeaturedBeers: 'getFeaturedBeers',
    }),
  },
}
</script>
<style lang="scss" scoped>
.container {
  width: 90%;
}
</style>
