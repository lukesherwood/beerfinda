<template>
  <div class="col">
    <div class="card h-100 mb-3" :style="{ width: width }">
      <nuxtLink class="stretched-link" :to="`/beer/${beer.beer_id}`" />
      <nuxt-img
        loading="lazy"
        :src="image"
        placeholder="/index.png"
        class="card-img-top"
        alt="default-beer"
      />
      <div class="card-body d-flex flex-column">
        <div
          class="beer-category badge rounded-pill"
          :style="{ 'background-color': beerCategoryColors[beer.type_upper] }"
        >
          {{ beer.type_upper }}
        </div>
        <h5 class="card-title">{{ beer.name }}</h5>
        <div class="card-text">
          <div class="brewer-name">
            <em>
              {{ beer.brewer_name }}
            </em>
          </div>
          <div class="beer-type">
            <small>{{ beer.type }}</small>
          </div>
          <div v-if="featured" class="badge rounded-pill bg-danger featured">
            Featured
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { beerCategoryColors } from '../helpers/beerHelpers.js'
export default {
  name: 'BeerCard',
  // eslint-disable-next-line vue/require-prop-types
  props: ['beer', 'width', 'featured'],
  data() {
    return {
      image: this.imageUrl(),
      beerCategoryColors,
    }
  },
  computed: {
    ...mapGetters({
      imgUrl: 'imgUrl',
    }),
  },
  methods: {
    imageUrl() {
      if (this.beer.merchantsellsfound?.length) {
        return `${this.beer.merchantsellsfound[0].image_pre_link}${this.beer.merchantsellsfound[0].image_link}`
      }
      if (this.beer.image){
        return this.imgUrl + 'beer/' + this.beer.image
      }
      return 'index.png'
    },
  },
}
</script>
<style lang="scss" scoped>
.beer-category {
  position: absolute;

  top: 5px;
  left: 50%;
  transform: translate(-50%, 0);
  -webkit-transform: translate(-50%, 0);
}

.featured {
  position: absolute;
  top: 5px;
  left: 5px;
}

.card img {
  object-fit: contain;
  height: 30rem;
}
</style>
