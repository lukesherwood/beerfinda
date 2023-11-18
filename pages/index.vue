<template>
  <main class="text-center">
    <HomeBanner>
      <section class="text-start header-content">
        <h1 class="text-white pt-4">Find the best beer for you</h1>
        <h6 class="text-white pt-3 pb-3">
          BeerFinda searches the internet for the best beer to match your
          preferences. We combine beers from brewers and merchants across New
          Zealand into one platform where you can find the best price, merchant
          and a personalised rating for every beer.
        </h6>
        <nuxtLink to="/beers" class="btn btn-secondary shadow text-white"
          >Find My Beer</nuxtLink
        >
      </section>
      <nuxt-img
        src="beer-glass-edit.png"
        loading="lazy"
        format="webp"
        alt="Hand holding a beer"
        class="beer-hand d-none d-md-block"
      />
    </HomeBanner>
    <div class="container">
      <Spinner
        v-if="$fetchState.pending || isLoading"
        :loading="$fetchState.pending || isLoading"
        aria-label="Loading beers"
      />
      <Error v-else-if="$fetchState.error" :error="$fetchState.error" />
      <div v-else>
        <section v-if="getFeaturedBeers.length > 0">
          <h1 class="title text-center">Featured Beers</h1>
          <CardCarousel :beers="getFeaturedBeers" />
          <div class="pt-5">
            <nuxtLink
              class="btn btn-outline-primary shadow border border-primary border-2 py-3 px-5 rounded-pill"
              to="/beers"
            >
              <h2>View All Beers</h2>
            </nuxtLink>
          </div>
        </section>
        <div class="section-wrapper container py-5">
          <div class="section how-we-work row pb-5 overflow-hidden">
            <h2 class="py-5">How We Work</h2>
            <div class="col col-sm-12 col-xl-4">
              <nuxt-img
                loading="lazy"
                format="webp"
                src="https://drs-pgo-image.s3.ap-southeast-2.amazonaws.com/brand/how-it-works-step-1.png"
                alt="Step 1 of how it works"
              />
            </div>
            <div class="col col-sm-12 col-xl-4">
              <nuxt-img
                loading="lazy"
                format="webp"
                src="https://drs-pgo-image.s3.ap-southeast-2.amazonaws.com/brand/how-it-works-step-2.png"
                alt="Step 2 of how it works"
              />
            </div>
            <div class="col col-sm-12 col-xl-4">
              <nuxt-img
                loading="lazy"
                format="webp"
                src="https://drs-pgo-image.s3.ap-southeast-2.amazonaws.com/brand/how-it-works-step-3.png"
                alt="Step 3 of how it works"
              />
            </div>
          </div>
        </div>
        <section class="sign-up-content container">
          <div class="row">
            <div class="col-md-6">
              <h2>Tell Us Your Taste</h2>
              <p class="sign-up-text">
                Signing up for BeerFinda is easy and free, all you need is an
                email address. Once you sign up, you can start rating and
                reviewing beers, creating your taste profile, and getting
                personalized recommendations. BeerFinda is more than just a
                website, it’s a lifestyle. Don’t miss this opportunity to join
                the best beer club in New Zealand. Sign up for BeerFinda today
                and cheers to a better beer experience!
              </p>
              <div
                class="d-flex justify-content-center align-items-center pt-5"
              >
                <nuxtLink
                  class="btn btn-outline-primary shadow border border-primary border-2 py-3 px-5 rounded-pill"
                  to="/register"
                >
                  <h2>Sign Up</h2>
                </nuxtLink>
              </div>
            </div>
            <div class="col-md-6">
              <nuxt-img
                style="width: 100%; max-width: 480px"
                src="beers.png"
                loading="lazy"
                format="webp"
                alt="Can of beer"
                class="beer-pictures pt-2"
              />
            </div>
          </div>
        </section>
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
      await this.$store.dispatch('beer/fetchFeaturedBeers')
    } catch (error) {
      throw new Error(error)
    }
  },
  head() {
    return {
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
      isLoading: 'beer/isLoading',
      getFeaturedBeers: 'beer/getFeaturedBeers',
    }),
  },
}
</script>
<style lang="scss" scoped>
.title {
  margin-top: -40px;
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
.text-start {
  padding: 5px;
}
.beer-hand {
  z-index: 1;
  width: 350px;
  position: absolute;
  right: 0px;
  top: 0px;
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.8)
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.8)
  );
}
@media screen and (max-width: 992px) {
  .header-content .sign-up-content {
    width: 100%;
  }
  .sign-up-text {
    width: 100%;
  }
  .sign-up-link {
    text-align: center;
  }
}

@media screen and (max-width: 766px) {
  .title {
    padding-top: 50px;
  }
  .header-content {
    padding: 20px !important;
    font-size: 70%;
    width: 100%;
    text-align: center !important;
  }
  .beer-pictures {
    display: none;
  }
}

@media screen and (max-width: 375px) {
  .header-content {
    padding: 5px !important;
    font-size: 50%;
  }
}
</style>
