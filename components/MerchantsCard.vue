<template>
  <div class="col">
    <div class="card h-100 mb-3">
      <nuxt-img
        loading="lazy"
        placeholder="/index.png"
        :src="image"
        class="card-img-top"
        alt="default-beer"
      />
      <div class="card-body pt-2">
        <div>
          Need to add a fetch to get merchant by id
          {{ merchant.merchant_id }} so we can display merchant name
        </div>
        <div>{{ merchant.title }}</div>
        <div class="text-primary">{{ priceToString(merchant.price) }}</div>
      </div>
      <div class="card-footer">
        <a
          class="btn btn-primary float-end"
          :href="merchant.link"
          target="_blank"
          >Buy Now</a
        >
      </div>
    </div>
  </div>
</template>
<script>
import { priceToString } from '../helpers/beer.js'
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['merchant'],
  data() {
    return {
      image: this.imageUrl(),
    }
  },
  methods: {
    imageUrl() {
      if (this.merchant.image_link) {
        return `${this.merchant.image_pre_link}${this.merchant.image_link}`
      }
      return 'index.png'
    },
    priceToString,
  },
}
</script>
<style lang="scss" scoped></style>
