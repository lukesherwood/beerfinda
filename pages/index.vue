<template>
  <main class="text-center">
    <HomeBanner>
      <div class="text-start header-content">
        <h1 class="text-white pt-4">Find the best beer for you</h1>
        <h6 class="text-white pt-3 pb-3">
          BeerFinda searches the internet for the best beer to match your
          preferences. We combine beers from brewers and merchants across New
          Zealand into one platform where you can find the best price, merchant
          and a personalised rating for every beer.
        </h6>
        <nuxtLink to="/beers" class="btn btn-secondary text-white"
          >Find My Beer</nuxtLink
        >
      </div>
      <nuxt-img
        style="z-index: 1; position: absolute; right: -50px; top: 30px"
        src="beer-hand.png"
        loading="lazy"
        format="webp"
        alt="default-beer"
        class="beer-hand"
      />
    </HomeBanner>
    <div class="container">
      <Spinner
        v-if="$fetchState.pending || isLoading"
        :loading="$fetchState.pending || isLoading"
      />
      <Error v-else-if="$fetchState.error" :error="$fetchState.error" />
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
          <div class="section mt-3 row">
            <h2 class="pb-5">How We Work:</h2>
            <div class="col col-sm-12 col-xl-4">
              <nuxt-img
                loading="lazy"
                format="webp"
                src="https://drs-pgo-image.s3.ap-southeast-2.amazonaws.com/brand/how-it-works-step-1.png"
                alt="how-to1"
              />
            </div>
            <div class="col col-sm-12 col-xl-4">
              <nuxt-img
                loading="lazy"
                format="webp"
                src="https://drs-pgo-image.s3.ap-southeast-2.amazonaws.com/brand/how-it-works-step-2.png"
                alt="how-to2"
              />
            </div>
            <div class="col col-sm-12 col-xl-4">
              <nuxt-img
                loading="lazy"
                format="webp"
                src="https://drs-pgo-image.s3.ap-southeast-2.amazonaws.com/brand/how-it-works-step-3.png"
                alt="how-to3"
              />
            </div>
          </div>
        </div>
        <div class="sign-up-content">
          <h2>Tell Us Your Taste</h2>
          <div class="sign-up-text">
            Signing up for BeerFinda is easy and free, all you need is an email
            address. Once you sign up, you can start rating and reviewing beers,
            creating your taste profile, and getting personalized
            recommendations. BeerFinda is more than just a website, it’s a
            lifestyle. Don’t miss this opportunity to join the best beer club in
            New Zealand. Sign up for BeerFinda today and cheers to a better beer
            experience!
          </div>
          
          <div class="py-5 sign-up-link">
            <nuxtLink
              class="btn btn-outline-primary border border-primary border-2 py-3 px-5 rounded-pill"
              to="/register"
            >
              <h5>Sign Up</h5>
            </nuxtLink>
            <nuxt-img
            style="
              z-index: 2;
              width: 250px;
              position: absolute;
              right: 150px;
              bottom: 0px;
            "
            src="can1.png"
            loading="lazy"
            format="webp"
            alt="default-beer"
            class="beer-pictures"
          />
          <nuxt-img
            style="
              z-index: 1;
              width: 280px;
              position: absolute;
              right: -20px;
              bottom: 40px;
              opacity: 0.6;
            "
            src="bottle.png"
            loading="lazy"
            format="webp"
            alt="default-beer"
            class="beer-pictures"
          />
          <nuxt-img
            style="
              z-index: 1;
              width: 235px;
              position: absolute;
              right: 325px;
              bottom: 50px;
              opacity: 0.6;
            "
            src="bottles.png"
            loading="lazy"
            format="webp"
            alt="default-beer"
            class="beer-pictures"
          />
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
  async fetch() {
    try {
      if (!this.$auth.strategy.token.status().valid()) {
        await this.$auth.loginWith('basicRequestCookie')
      }
      await this.$store.dispatch('beer/fetchFeaturedBeers')
    } catch (error) {
      throw new Error(error)
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'beer/isLoading',
      getFeaturedBeers: 'beer/getFeaturedBeers',
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
  padding: 40px;
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
  .sign-up-link{
    text-align: center;
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
