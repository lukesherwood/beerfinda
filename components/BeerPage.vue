<template>
  <div class="container">
    <div class="card" style="width: 90%">
      <div class="card-header bg-warning">
        <h3 class="pt-2">
          {{ beer.name }}
        </h3>
        <h5>
          <em>{{ beer.brewer_name }}</em>
        </h5>
      </div>
      <div class="p-3">
        <div class="w-50 float-end">
          <nuxt-img
            loading="lazy"
            placeholder="/index.png"
            format="webp"
            class="img-fluid"
            style="height: 100%; width: 100%; object-fit: contain"
            :src="beerImageUrl(beer)"
            alt="default-beer"
          />
        </div>
        <h5>{{ beer.type }}</h5>
        <h6 v-if="beer.percentage != 'unknown'">{{ beer.percentage }}</h6>
        <div class="card-text">
          <p>{{ beer.description }}</p>
        </div>
        <div v-if="beer.merchantsellsfound.length">
          <div class="clearfix"></div>
          <h3>Where to Buy</h3>
          <div
            class="row row-cols-2 row-cols-md-2 row-cols-lg-4 gy-4 d-flex p-4"
          >
            <Card
              v-for="merchant in beer.merchantsellsfound"
              :key="merchant.merchant_id"
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
                  class="btn btn-primary float-end"
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
  },
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 500px) {
  .card {
    box-shadow: none;
    border: none;
  }
}
.card img {
  max-height: 400px;
}
</style>
