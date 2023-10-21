<template>
  <div class="content">
    <Header :header="brewer.name">
      <template #subheader>
        <h4 v-if="brewer.established" class="brewer-est py-1">
          <em class="text-primary">Established {{ brewer.established }}</em>
        </h4>
      </template>
    </Header>
    <nuxt-img
      loading="lazy"
      placeholder="/brewer.jpg"
      format="webp"
      class="img-fluid beer-image"
      :src="image"
      alt="default-beer"
    />
    <div class="d-flex justify-content-between py-3">
      <div class="brewer-location">
        <h6>{{ brewer.location }}</h6>
      </div>
      <div class="spacer"></div>
      <div class="brewer-type">
        <h6>{{ brewer.type }}</h6>
      </div>
    </div>

    <div class="py-1 text-center">
      <div>
        <h5>
          Beer Count:
          <nuxt-link
            :to="'/beers?&inStock=false&search=' + brewer.name"
            class="text-secondary"
          >
            {{ brewer.numberbeers }}</nuxt-link
          >
        </h5>
      </div>
    </div>
    <div v-if="brewer.description" class="brewer-desc py-4">
      {{ brewer.description }}
    </div>

    <div class="py-2 border-top border-bottom">
      <div class="d-flex justify-content-between">
        <div v-if="brewer.website" class="p-2">
          Visit:
          <a :href="brewer.website" target="_blank">
            <b-icon icon="box-arrow-up-right"></b-icon>
          </a>
        </div>
        <div v-if="brewer.email" class="p-2">
          Email:
          <a :href="`mailto:${brewer.email}`">
            <b-icon icon="envelope"></b-icon>
          </a>
        </div>
        <div v-if="brewer.twitter" class="p-2">
          <a :href="brewer.twitter" target="_blank">
            <b-icon icon="twitter"></b-icon>
          </a>
        </div>
        <div v-if="brewer.facebook" class="p-2">
          <a :href="brewer.facebook" target="_blank">
            <b-icon icon="facebook"></b-icon>
          </a>
        </div>
        <div v-if="brewer.instagram" class="p-2" target="_blank">
          <a :href="brewer.instagram" target="_blank">
            <b-icon icon="instagram"></b-icon>
          </a>
        </div>
        <div v-if="brewer.phone" class="p-2">
          Call:
          <a :href="'tel:' + brewer.phone">
            <b-icon icon="telephone"></b-icon> {{ brewer.phone }}</a
          >
        </div>
      </div>
      <div v-if="brewer.address" class="p-2">
        Address:
        <b-icon icon="mailbox2"></b-icon>
        {{ brewer.address }}
      </div>
      <div class="clearfix"></div>
    </div>

    <div v-if="beers?.length" class="container py-3">
      <h3 class="pt-3">Beers for sale</h3>
      <div
        class="pt-3 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-4 d-flex"
      >
        <Card
          v-for="beer in beersToDisplay()"
          :key="'merchant-page-card' + beer.beer_id + '-' + Math.random(10)"
          :title="beer.title"
          :image="beer.image_pre_link + beer.image_link"
          :link="`beers/${beer.beer_id}`"
          footer="true"
        >
          <template #text>
            <div class="price">{{ priceToString(beer.price) }}</div>
          </template>
        </Card>
      </div>
      <Pagination
        class="p-5"
        :pages="{ currentPage, totalPages }"
        @pageChange="handlePageChange"
      />
    </div>
  </div>
</template>
<script>
import { priceToString } from '../helpers/beer.js'
export default {
  name: 'BrewerPage',
  props: ['brewer', 'beers'],
  data() {
    return {
      image: this.imageUrl(),
      currentPage: 1,
      totalPages: Math.ceil(this.beers.length / 20),
    }
  },
  methods: {
    imageUrl() {
      return this.brewer.image_pre_link + this.brewer.image || 'brewer.jpg'
    },
    priceToString,
    beersToDisplay() {
      const firstN = 20 * parseInt(this.currentPage) - 20
      const secondN = 20 * parseInt(this.currentPage)
      return this.beers.slice(firstN, secondN)
    },
    handlePageChange(page) {
      this.currentPage = page
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
