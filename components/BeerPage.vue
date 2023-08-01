<template>
  <div class="p-4">
    <div class="header">
      <h1 class="display-2">
        <strong>{{ beer.name }} </strong>
      </h1>
      <h2 class="display-6">
        <nuxtLink :to="`/brewer/${titleize(beer.brewer_name)}`"
          ><em>{{ beer.brewer_name }}</em></nuxtLink
        >
      </h2>
    </div>
    <div>
      <div class="row py-2">
        <div class="col-sm-6 col-xs-12 pb-5 d-flex justify-content-center">
          <nuxt-img
            loading="lazy"
            placeholder="/blank.jpg"
            format="webp"
            class="img-fluid beer-image"
            :src="beerImageUrl(beer)"
            alt="default-beer"
          />
        </div>
        <div class="col-sm-6 col-xs-12">
          <h5>
            {{ beer.type }}
            <span v-if="beer.percentage != 'unknown'"
              >- <em>{{ beer.percentage }} </em></span
            >
          </h5>
          <div>
            <p>{{ beer.description }}</p>
          </div>
        </div>
      </div>
      <div v-if="beer.merchantsellsfound.length">
        <div class="clearfix"></div>
        <h3>Where to Buy</h3>
        <div
          class="row row-cols-1 row-cols-md-2 row-cols-lg-4 gy-4 d-flex pt-3"
        >
          <Card
            v-for="merchant in beer.merchantsellsfound"
            :key="'beerPage-merchant' + merchant.merchant_id"
            :title="merchant.title"
            :image="merchant.image_pre_link + merchant.image_link"
          >
            <template #text>
              <div>
                {{ merchant.merchant_name[0]?.name }}
              </div>
              <div class="">
                {{ priceToString(merchant.price) }}
              </div>
            </template>
            <template #footer>
              <a
                class="btn btn-secondary float-end stretched-link"
                :href="merchant.link"
                target="_blank"
                >Buy Now</a
              >
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { priceToString, beerImageUrl } from '../helpers/beer.js'

export default {
  name: 'BeerPage',
  props: ['beer'],
  methods: {
    priceToString,
    beerImageUrl,
    titleize(str) {
      return str.toLowerCase().replace(/\s+/g, '-')
    },
  },
}
</script>

<style lang="scss" scoped>
.beer-image {
  max-height: 50vh;
  width: 100%;
  object-fit: contain;
}
</style>
