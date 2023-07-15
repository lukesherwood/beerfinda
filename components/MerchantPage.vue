<template>
  <div class="p-5">
    <div class="header">
      <h1 class="display-2">
        <a :href="merchant.website" target="_blank"> {{ merchant.name }}</a>
      </h1>
    </div>
    <div class="p-3">
      <div class="w-50 float-end">
        <nuxt-img
          loading="lazy"
          placeholder="/index.png"
          format="webp"
          class="img-fluid beer-image"
          :src="image"
          alt="default-beer"
        />
      </div>
      <div class="merchant-desc">
        {{ merchant.description.substring(1, merchant.description.length - 1) }}
      </div>

      <div>
        <h4>Contact</h4>
        <div v-if="merchant.email" class="float-start p-2">
          <a :href="merchant.email"> <b-icon icon="envelope"></b-icon> </a>
        </div>
        <div v-if="merchant.twitter" class="float-start p-2">
          <a :href="merchant.twitter" target="_blank">
            <b-icon icon="twitter"></b-icon>
          </a>
        </div>
        <div v-if="merchant.facebook" class="float-start p-2">
          <a :href="merchant.facebook" target="_blank">
            <b-icon icon="facebook"></b-icon>
          </a>
        </div>
        <div v-if="merchant.instagram" class="float-start p-2" target="_blank">
          <a :href="merchant.instagram" target="_blank">
            <b-icon icon="instagram"></b-icon>
          </a>
        </div>
        <div v-if="merchant.phone" class="float-start p-2">
          <a :href="'tel:' + merchant.phone">
            <b-icon icon="telephone"></b-icon
          ></a>
        </div>
        <div v-if="merchant.address" class="float-start p-2">
          <b-icon icon="mailbox2"></b-icon>
          {{ merchant.address }}
        </div>
      </div>
      <div v-if="merchant.merchantdetails.length">
        <div class="clearfix"></div>
        <h3>Beers for sale</h3>
        <div
          class="pt-5 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-4 d-flex"
        >
          <Card
            v-for="beer in merchant.merchantdetails"
            :key="'merchant-page-card' + beer.beer_id"
            :title="beer.title"
            :image="beer.image_pre_link + beer.image_link"
            footer="true"
          >
            <template #text>
              <div class="price">{{ priceToString(beer.price) }}</div>
              <div v-if="beer.stock === 1">Currently In Stock</div>
              <div v-else>Currently Out of Stock</div>
            </template>
            <template #footer>
              <a class="btn btn-secondary w-100" :href="beer.link" target="_blank"
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
import { priceToString } from '../helpers/beer.js'
export default {
  name: 'MerchantPage',
  props: ['merchant'],
  data() {
    return {
      image: this.imageUrl(),
    }
  },
  methods: {
    imageUrl() {
      return this.merchant.image_pre_link + this.merchant.image || 'index.png'
    },
    formatString(string) {
      return string.replace(/.+?[.?!](\s|$)/g, function (a) {
        return a.charAt(0).toUpperCase() + a.slice(1)
      })
    },
    priceToString,
  },
}
</script>
<style lang="scss" scoped>
.beer-image {
  max-height: 100vh;
  width: 100%;
  object-fit: contain;
}
</style>
