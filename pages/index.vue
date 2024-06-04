<template>
  <main class="text-center">
    <HomeBanner>
      <section class="text-center header-content">
        <h1 class="text-white pt-3 fs-1 fw-bold">
          All New Zealand Beers In One Place Curated To You
        </h1>
        <p class="text-white pt-3 pb-5 fs-6">
          BeerFinda searches the internet for the best beer to match your
          preferences. We combine beers from brewers and merchants across New
          Zealand into one platform where you can find the best price, merchant
          and a personalised rating for every beer.
        </p>
        <nuxtLink
          to="/register"
          class="btn btn-primary shadow border border-primary border-2 py-3 px-5 rounded-pill"
          ><h3>Find My Beer</h3></nuxtLink
        >
      </section>
    </HomeBanner>
    <div class="container">
      <Spinner
        v-if="$fetchState.pending || isLoading"
        :loading="$fetchState.pending || isLoading"
        aria-label="Loading beers"
      />
      <Error v-else-if="$fetchState.error" :error="$fetchState.error" />
      <div v-else>
        <section v-if="getFeaturedBeers?.length > 0">
          <h2 class="title text-center fs-1 pt-5">Featured Beers</h2>
          <div
            class="row row-cols-1 row-cols-lg-3 g-4 justify-content-center m-1"
          >
            <Card
              v-for="beer in getFeaturedBeers"
              :key="beer.beer_id"
              :title="beer.name"
              :link="`beers/${beer.beer_id}`"
              :image="beerImageUrl(beer)"
              width="350px"
            >
              <template #text>
                <div class="brewer-name">
                  <em>
                    {{ beer.brewer_name }}
                  </em>
                </div>
                <div class="badge rounded-pill bg-danger featured">
                  Featured
                </div>
              </template>
            </Card>
          </div>
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
          <div class="section how-we-work row pb-5">
            <h2 class="py-5 fs-1">How We Work</h2>
            <div class="col col-sm-12 col-xl-4 px-0 py-2">
              <nuxt-img
                loading="lazy"
                format="webp"
                src="https://drs-pgo-image.s3.ap-southeast-2.amazonaws.com/brand/how-it-works-step-1.png"
                alt="Step 1 of how it works"
                class="work-image"
              />
            </div>
            <div class="col col-sm-12 col-xl-4 px-0 py-2">
              <nuxt-img
                loading="lazy"
                format="webp"
                src="https://drs-pgo-image.s3.ap-southeast-2.amazonaws.com/brand/how-it-works-step-2.png"
                alt="Step 2 of how it works"
                class="work-image"
              />
            </div>
            <div class="col col-sm-12 col-xl-4 px-0 py-2">
              <nuxt-img
                loading="lazy"
                format="webp"
                src="https://drs-pgo-image.s3.ap-southeast-2.amazonaws.com/brand/how-it-works-step-3.png"
                alt="Step 3 of how it works"
                class="work-image"
              />
            </div>
          </div>
        </div>
        <section class="sign-up-content container">
          <div class="row justify-content-evenly">
            <div class="col-lg-6 col-sm-12 py-2">
              <h2 class="fs-1">Tell Us Your Taste</h2>
              <p class="sign-up-text fs-6">
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
            <div class="col-lg-6 col-sm-12">
              <nuxt-img
                src="beers.png"
                loading="lazy"
                format="webp"
                alt="Can of beer"
                class="beer-pictures w-100"
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
import { beerImageUrl } from '../helpers/beer'

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

  methods: {
    beerImageUrl,
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
.featured {
  position: absolute;
  top: 5px;
  left: 5px;
}

.work-image {
  width: 350px;
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
    padding-top: 30px;
  }
  .header-content {
    padding: 20px !important;
    font-size: 70%;
    width: 100%;
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
  .work-image {
    width: 300px;
  }
}
</style>
