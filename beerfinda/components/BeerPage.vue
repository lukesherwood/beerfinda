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
      <div class="card-body p-3">
        <div class="w-50 float-end">
          <img
            class="img-fluid"
            style="height: 100%; width: 100%; object-fit: contain"
            v-src="this.image"
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
            <MerchantsCard
              v-for="merchant in beer.merchantsellsfound"
              :key="merchant.merchant_id"
              :merchant="merchant"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MerchantsCard from './MerchantsCard.vue'
export default {
  name: 'BeerPage',
  components: { MerchantsCard },
  props: ['beer'],
  data() {
    return {
      image: this.imageUrl(),
    }
  },
  methods: {
    imageUrl() {
      if (this.beer.merchantsellsfound[0]?.image_link) {
        return (
          'https://drspgoa.digifern.com/img/beer/' +
          this.beer.merchantsellsfound[0].image_link
        )
      }
      if (!this.beer.imagefound.length) {
        return '../static/index.png'
      }
      return (
        'https://drspgoa.digifern.com/' +
        'img/beer/' +
        (this.beer.imagefound[0]?.image || this.beer.imagefound)
      )
    },
    formatString(string) {
      return string.replace(/.+?[\.\?\!](\s|$)/g, function (a) {
        return a.charAt(0).toUpperCase() + a.slice(1)
      })
    },
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
