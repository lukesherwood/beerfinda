<template>
  <main class="text-center">
    <HomeBanner>
      <div class="text-start header-content">
        <h2 class="text-white">Lets get straight to the pint:</h2>
        <h5 class="text-white">You want to find beer</h5>
        <h5 class="text-white">We want to help</h5>
        <div class="text-white pt-3 pb-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
          tempore saepe, dignissimos quae hic error corporis facilis magnam
          voluptate aut neque provident deserunt quia dolorem iure at sit
          perferendis quo? Lorem ipsum dolor sit amet consectetur adipisicing.
        </div>
        <nuxt-link to="/beers" class="btn btn-secondary text-white"
          >Find My Beer</nuxt-link
        >
      </div>
      <img
        style="z-index: 1; position: absolute; right: -50px; top: 30px"
        src="beer-hand.png"
        alt="default-beer"
        class="beer-hand"
      />
    </HomeBanner>
    <div class="container">
      <Spinner v-if="isLoading" />
      <div v-else>
        <h1 class="text-start title">Featured Beers</h1>
        <CardCarousel :beers="getFeaturedBeers" />
        <nuxtLink
          class="btn btn-outline-primary border border-primary border-2 py-3 px-5 rounded-pill"
          to="/beers"
        >
          <h5>View All Beers</h5>
        </nuxtLink>
        <div class="section-wrapper">
          <div class="section mt-3">
            <h2 class="pb-5">How We Work:</h2>
            <Carousel :images="howWeWorkImages" />
          </div>
        </div>
        <div class="sign-up-content">
          <h2>Tell Us Your Taste</h2>
          <div class="sign-up-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
            enim tempora eius blanditiis doloribus officia quibusdam? Nam culpa
            vel numquam aspernatur sit commodi maiores. Rerum recusandae dicta
            corrupti tempore ut.
          </div>
          <img
            style="
              z-index: 2;
              width: 250px;
              position: absolute;
              right: 150px;
              bottom: 0px;
            "
            src="can1.png"
            alt="default-beer"
            class="beer-pictures"
          />
          <img
            style="
              z-index: 1;
              width: 280px;
              position: absolute;
              right: -20px;
              bottom: 40px;
              opacity: 0.6;
            "
            src="bottle.png"
            alt="default-beer"
            class="beer-pictures"
          />
          <img
            style="
              z-index: 1;
              width: 235px;
              position: absolute;
              right: 325px;
              bottom: 50px;
              opacity: 0.6;
            "
            src="bottles.png"
            alt="default-beer"
            class="beer-pictures"
          />
          <div class="py-5">
            <nuxtLink
              class="btn btn-outline-primary border border-primary border-2 py-3 px-5 rounded-pill"
              to="/register"
            >
              <h5>Sign Up</h5>
            </nuxtLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Index',
  data() {
    return {
      howWeWorkImages: [
        {
          src: 'https://drs-pgo-image.s3.ap-southeast-2.amazonaws.com/brand/how-it-works-step-1.png',
        },
        {
          src: 'https://drs-pgo-image.s3.ap-southeast-2.amazonaws.com/brand/how-it-works-step-2.png',
        },
        {
          src: 'https://drs-pgo-image.s3.ap-southeast-2.amazonaws.com/brand/how-it-works-step-3.png',
        },
      ],
    }
  },
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
.title {
  margin-top: -40px;
  padding-left: 20px;
}
.header-content {
  width: 65%;
}
.sign-up-content {
  text-align: left;
  width: 100%;
  position: relative;
  padding-bottom: 100px;
  padding-left: 20px;
  padding-right: 20px;
}
.section-wrapper {
  padding-top: 80px;
  padding-bottom: 80px;
}
.section {
  padding-bottom: 150px;
  padding-top: 50px;
}
.sign-up-text {
  width: 40%;
}
.text-start {
  padding: 50px;
}
@media screen and (max-width: 992px) {
  .header-content .sign-up-content {
    width: 100%;
  }
  .sign-up-text {
    width: 100%;
  }
  .beer-pictures {
    display: none;
  }
}

@media screen and (max-width: 800px) {
  .beer-hand {
    scale: 90%;
    right: -100px !important;
    top: 50px !important;
  }
  .text-start {
    padding: 20px !important;
  }
}
@media screen and (max-width: 630px) {
  .header-content {
    padding: 5px !important;
    font-size: 70%;
  }
  .beer-hand {
    scale: 60%;
    right: -140px !important;
    top: 90px !important;
  }
}

@media screen and (max-width: 350px) {
  .header-content {
    padding: 5px !important;
    font-size: 50%;
  }
  .beer-hand {
    scale: 50%;
    top: 130px !important;
  }
}
</style>
