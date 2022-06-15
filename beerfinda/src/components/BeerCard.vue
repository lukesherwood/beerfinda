<template>
  <div class="col">
    <div class="card h-100 mb-3">
      <router-link
        class="stretched-link"
        :to="{ name: 'beer', params: { id: beer.beer_id } }"
      />
      <img v-lazy="this.image" class="card-img-top" alt="default-beer" />
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
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { beerCategoryColors } from "../helpers/beerHelpers";
export default {
  name: "Card",
  props: ["beer"],
  data() {
    return {
      image: this.imageUrl(),
      beerCategoryColors,
    };
  },
  methods: {
    imageUrl() {
      if (!this.beer.imagefound.length) {
        return "/index.png";
      }
      return (
        this.$hostname +
        "img/beer/" +
        (this.beer.imagefound[0]?.image || this.beer.imagefound)
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.beer-category {
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translate(-50%, 0);
  -webkit-transform: translate(-50%, 0);
}

.card img {
  height: 15rem;
}
</style>
