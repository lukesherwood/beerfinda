<template>
  <div class="content">
    <div class="row row-cols-1 row-cols-md-2">
      <Header :header="brewer.name">
        <template #subheader>
          <h4 v-if="brewer.established" class="py-1">
            <em>Established {{ brewer.established }}</em>
          </h4>
          <h4 class="py-1">{{ brewer.location }}</h4>
          <h4 class="py-1">
            Beer Count:
            <nuxt-link
              :to="'/beers?&inStock=false&search=' + brewer.name"
              class="text-secondary"
            >
              {{ brewer.numberbeers }}</nuxt-link
            >
          </h4>
          <h4 class="py-1">{{ brewer.type }}</h4>
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
    </div>
    <div
      v-if="brewer.description"
      class="brewer-desc py-4"
      style="white-space: pre-wrap"
    >
      {{ brewer.description }}
    </div>

    <div class="py-3 border-top border-bottom">
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

    <div v-if="beersInStock?.length" class="container py-3">
      <h3 class="pt-3">Beers Currently In Stock</h3>
      <div
        class="pt-3 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-4 d-flex"
      >
        <Card
          v-for="beer in beersInStock"
          :key="'merchant-page-card' + beer.beer_id + '-' + Math.random(10)"
          :title="beer.name"
          :link="`beers/${beer.beer_id}`"
          :image="beerImageUrl(beer)"
          footer="true"
        >
        </Card>
      </div>
    </div>

    <div v-if="beersBrewer?.length" class="container py-3">
      <div id="accordionBeers" class="accordion">
        <div class="accordion-item">
          <h2 id="headingBeers" class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseBeers"
              aria-expanded="false"
              aria-controls="collapseBeers"
            >
              <h3>Other Beers</h3>
            </button>
          </h2>
          <div
            id="collapseBeers"
            class="accordion-collapse collapse"
            aria-labelledby="headingBeers"
            data-bs-parent="#accordionBeers"
          >
            <div class="accordion-body">
              <p class="fst-italic fw-light">
                *Check merchant for availability
              </p>
              <div
                class="pt-3 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-4 d-flex"
              >
                <Card
                  v-for="brewerBeer in beersToDisplay(beersBrewer)"
                  :key="
                    'merchant-page-card' +
                    brewerBeer.beer_id +
                    '-' +
                    Math.random(10)
                  "
                  :title="brewerBeer.name"
                  :link="`beers/${brewerBeer.beer_id}`"
                  :image="beerImageUrl(brewerBeer)"
                  footer="true"
                >
                </Card>
              </div>
              <Pagination
                class="p-5"
                :pages="{ currentPage, totalPages: totalPages(beersBrewer) }"
                @pageChange="handlePageChange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { priceToString } from '../helpers/beer.js'
export default {
  name: 'BrewerPage',
  props: ['brewer', 'beersInStock', 'beersBrewer'],
  data() {
    return {
      image: this.imageUrl(),
      currentPage: 1,
    }
  },
  methods: {
    imageUrl() {
      return this.brewer.image_pre_link + this.brewer.image || 'brewer.jpg'
    },
    beerImageUrl(beer) {
      if (!beer.imagefound?.length) return 'beer.jpg'
      return (
        beer.imagefound[0].image_pre_link + beer.imagefound[0].image ||
        'brewer.jpg'
      )
    },
    priceToString,
    beersToDisplay(beers) {
      const firstN = 20 * parseInt(this.currentPage) - 20
      const secondN = 20 * parseInt(this.currentPage)
      return beers.slice(firstN, secondN)
    },
    totalPages(beers) {
      return Math.ceil(beers?.length / 20)
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
  object-fit: contain;
}
</style>
