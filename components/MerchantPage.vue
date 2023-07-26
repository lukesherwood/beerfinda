<template>
  <div class="">
    <Banner>
      <div class="w-100 d-flex justify-content-center">
        <a :href="merchant.website" target="_blank">
          <nuxt-img
            loading="lazy"
            placeholder="/brewer.jpg"
            format="webp"
            class="img-fluid beer-image w-100"
            :src="image"
            alt="default-beer"
          />
        </a>
      </div>
    </Banner>
    <div class="container">
      <div class="header">
        <h1 class="display-2">
          <a :href="merchant.website" target="_blank"> {{ merchant.name }}</a>
        </h1>
        <div v-if="merchant.website" class="p-2">
          <a :href="merchant.website"
            >Website:
            <b-icon icon="box-arrow-up-right"></b-icon>
          </a>
        </div>
        <div v-if="merchant.email" class="p-2">
          <a :href="'mailto:' + merchant.email"
            >Email:
            <b-icon icon="envelope"></b-icon>
          </a>
        </div>
        <div v-if="merchant.twitter" class="p-2">
          <a :href="merchant.twitter" target="_blank">
            Twitter: <b-icon icon="twitter"></b-icon>
          </a>
        </div>
        <div v-if="merchant.facebook" class="p-2">
          <a :href="merchant.facebook" target="_blank">
            Facebook: <b-icon icon="facebook"></b-icon>
          </a>
        </div>
        <div v-if="merchant.instagram" class="p-2" target="_blank">
          <a :href="merchant.instagram" target="_blank">
            Instagram: <b-icon icon="instagram"></b-icon>
          </a>
        </div>
        <div v-if="merchant.phone" class="p-2">
          <a :href="'tel:' + merchant.phone">
            Phone: <b-icon icon="telephone"></b-icon
          ></a>
        </div>
        <div v-if="merchant.address" class="p-2">
          <b-icon icon="mailbox2"></b-icon>
          Address: {{ merchant.address }}
        </div>
      </div>
      <div class="p-3">
        <div class="merchant-desc">
          {{
            merchant.description.substring(1, merchant.description.length - 1)
          }}
        </div>

        <div v-if="merchant.merchantdetails.length">
          <div class="clearfix"></div>
          <h3 class="pt-3">Beers for sale</h3>
          <div
            class="pt-3 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-4 d-flex"
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
                <a
                  class="btn btn-secondary w-100 stretched-link"
                  :href="beer.link"
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
      return this.merchant.image_pre_link + this.merchant.image || 'brewer.jpg'
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
  max-height: 28vh;
  width: 100%;
  object-fit: contain;
}

a:link {
  text-decoration: none;
}
</style>
