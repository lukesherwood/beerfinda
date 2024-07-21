<template>
  <div class="content">
    <div class="row row-cols-1 row-cols-md-2">
      <Header :header="beer.name">
        <template #subheader>
          <h2 class="display-6">
            <nuxtLink :to="`/breweries/${beer.brewer_link}`"
              ><em>{{ beer.brewer_name }}</em></nuxtLink
            >
          </h2>
        </template>
      </Header>
      <div class="py-2 d-flex justify-content-center">
        <nuxt-img
          loading="lazy"
          placeholder="/blank.jpg"
          format="webp"
          class="img-fluid beer-image"
          :src="beerImageUrl(beer)"
          alt="default-beer"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 my-4">
        <div class="border rounded p-3 bg-light">
          <div class="my-3">
            <h5>
              <span
                class="badge rounded-pill"
                :style="{
                  'background-color': beerRatingColor(
                    Math.round(beer.rating * 10) / 10
                  ),
                }"
              >
                <b-icon icon="star-fill"></b-icon>
                {{ Math.round(beer.rating * 10) / 10 }}
              </span>
            </h5>
          </div>
          <div class="mb-3">
            <h5>
              <em>{{ beer.type }}</em>
            </h5>
          </div>
          <div class="mb-3">
            <h5>
              <em>{{ beer.percentage }}% ABV</em>
            </h5>
          </div>
          <div v-if="beer.session_savour_scale" class="mb-3">
            <h5>Sessionability</h5>
            <div class="progress" style="height: 30px">
              <div
                class="progress-bar bg-secondary"
                role="progressbar"
                :style="{ width: (beer.session_savour_scale / 10) * 100 + '%' }"
                :aria-valuenow="beer.session_savour_scale"
                aria-valuemin="0"
                aria-valuemax="5"
              >
                {{ beer.session_savour_scale }}/10
              </div>
            </div>
          </div>
          <div v-if="beer.characteristics" class="mb-3">
            <h5>Characteristics</h5>
            <small>
              {{ beer.characteristics.join(', ') }}
            </small>
          </div>
        </div>
      </div>

      <div class="col-md-8">
        <div v-if="beer.bfdescription" class="text-start">
          <p class="" style="white-space: pre-wrap">
            {{ beer.bfdescription }}
          </p>
        </div>
      </div>
    </div>

    <div v-if="beer.merchantsellsfound?.length" class="py-3 mb-4">
      <h3 class="px-3">Where to Buy</h3>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 gy-4 d-flex p-2">
        <Card
          v-for="merchant in beer.merchantsellsfound"
          :key="'beerPage-merchant' + merchant.merchant_id"
          :image="merchant.image_pre_link + merchant.image_link"
        >
          <template #text>
            <div class="py-2">
              <div>{{ merchant.size }}</div>
              <div>{{ priceToString(merchant.price) }}</div>
            </div>
          </template>
          <template #footer>
            <a
              class="btn btn-secondary stretched-link"
              :href="merchant.link"
              target="_blank"
              >Buy Now</a
            >
          </template>
        </Card>
      </div>
      <div class="px-3">
        <small
          ><em
            >* BeerFinda is not responsible for merchants having stock. Check
            with merchant for stock availability</em
          ></small
        >
      </div>
    </div>
    <div v-else class="py-3">
      <h3>Where to buy</h3>
      <p>No merchants found</p>
      <nuxt-link to="/beers?inStock=true"
        >Click here to see in-stock beers</nuxt-link
      >
    </div>

    <div v-if="beer.pairing" class="text-start mb-4">
      <h5 class="px-3">Pairing</h5>
      <ul>
        <li
          v-for="pairing in beer.pairing_list"
          :key="pairing + Math.random(10)"
          class="p-3"
          style="white-space: pre-wrap"
        >
          {{ pairing }}
        </li>
      </ul>
    </div>

    <div v-if="beer.similar_beers_in_stock?.length" class="py-3">
      <h3 class="px-3">Similar Beers</h3>
      <div
        class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gy-4 d-flex p-2"
      >
        <Card
          v-for="similarBeer in beer.similar_beers_in_stock"
          :key="'beer-card' + similarBeer.beer_id + '-' + Math.random(10)"
          :title="similarBeer.name"
          :link="`beers/${similarBeer.beer_id}`"
          :image="beerImageUrl(similarBeer)"
          width="200px"
        >
          <template #badge>
            <div
              class="beer-category badge rounded-pill"
              :style="{
                'background-color': beerCategoryColors[similarBeer.type_upper],
              }"
            >
              {{ similarBeer.type_upper }}
            </div>
          </template>
          <template #text>
            <div class="brewer-name">
              <em>{{ similarBeer.brewer_name }}</em>
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
  max-height: 35vh;
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