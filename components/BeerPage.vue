<template>
  <div class="content">
    <Header :header="beer.name">
      <template #subheader>
        <h2 class="display-6">
          <nuxtLink :to="`/breweries/${titleize(beer.brewer_name)}`"
            ><em>{{ beer.brewer_name }}</em></nuxtLink
          >
        </h2>
      </template>
    </Header>
    <div>
      <div class="py-2">
        <nuxt-img
          loading="lazy"
          placeholder="/blank.jpg"
          format="webp"
          class="img-fluid beer-image"
          :src="beerImageUrl(beer)"
          alt="default-beer"
        />
      </div>
      <div class="py-2">
        <h5 class="d-flex justify-content-between">
          <span>
            <strong>
              {{ beer.type }}
            </strong>
          </span>
          <span
            ><em>{{ beer.percentage }} ABV</em></span
          >
        </h5>
        <div class="text-start">
          <p>{{ beer.description }}</p>
        </div>
      </div>
      <div v-if="beer.merchantsellsfound.length" class="py-3">
        <h3>Where to Buy</h3>
        <div
          class="row row-cols-1 row-cols-md-2 row-cols-lg-3 gy-4 d-flex py-2"
        >
          <Card
            v-for="merchant in beer.merchantsellsfound"
            :key="'beerPage-merchant' + merchant.merchant_id"
            :title="merchant.title"
            :image="merchant.image_pre_link + merchant.image_link"
          >
            <template #text>
              <div>
                {{ merchant.brewer }}
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
        <small
          ><em>
            * BeerFinda is not responsible for merchants having stock. Check
            with merchant for stock availability</em
          >
        </small>
      </div>
      <div v-if="beer.similar_beers_in_stock.length" class="py-3">
        <h3>Similar Beers</h3>
        <div
          class="row row-cols-1 row-cols-md-2 row-cols-lg-3 gy-4 d-flex pt-3"
        >
          <Card
            v-for="similarBeer in beer.similar_beers_in_stock"
            :key="'beer-card' + similarBeer.beer_id + '-' + Math.random(10)"
            :title="similarBeer.name"
            :link="`beers/${similarBeer.beer_id}`"
            :image="beerImageUrl(similarBeer)"
          >
            <template #badge>
              <div
                class="beer-category badge rounded-pill"
                :style="{
                  'background-color':
                    beerCategoryColors[similarBeer.type_upper],
                }"
              >
                {{ similarBeer.type_upper }}
              </div>
            </template>
            <template #text>
              <div class="brewer-name">
                <em>
                  {{ similarBeer.brewer_name }}
                </em>
              </div>
              <div class="beer-type">
                <small>{{ similarBeer.type }}</small>
              </div>
            </template>
            <template #rating>
              <div
                class="beer-rating badge rounded-pill"
                :style="{
                  'background-color': beerRatingColor(
                    Math.round(similarBeer.rating * 10) / 10
                  ),
                }"
              >
                <b-icon icon="star-fill"></b-icon>
                {{ Math.round(similarBeer.rating * 10) / 10 }}
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  priceToString,
  beerImageUrl,
  beerCategoryColors,
  beerRatingColor,
} from '../helpers/beer.js'

export default {
  name: 'BeerPage',
  props: ['beer'],
  data() {
    return {
      beerCategoryColors,
    }
  },
  methods: {
    priceToString,
    beerImageUrl,
    titleize(str) {
      return str.toLowerCase().replace(/\s+/g, '-')
    },
    beerRatingColor,
  },
}
</script>

<style lang="scss" scoped>
.beer-image {
  max-height: 50vh;
  width: 100%;
  object-fit: contain;
}

.beer-category {
  position: absolute;
  top: 5px;
  left: 5px;
  font-size: 1rem;
}

.beer-rating {
  position: absolute;
  top: 5px;
  right: 5px;
  background: red;
  font-size: 1rem;
}
</style>
