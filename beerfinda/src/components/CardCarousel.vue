<template>
  <div class="row row-cols-3 row-cols-md-3 row-cols-lg-3 gy-4 d-flex p-4">
    <carousel :items-to-show="3">
      <slide v-for="beer in beers" :key="beer.beer_id">
        <BeerCard :beer="beer" width="300px" />
      </slide>
      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
  </div>
</template>
<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import BeerCard from "./BeerCard.vue";
export default {
  components: { BeerCard, Carousel, Slide, Pagination, Navigation },
  props: ["beers"],
};
</script>
<style lang="scss">
.carousel__prev,
.carousel__next {
  border: 5px solid white;
  background-color: rgb(220, 217, 217);
}
.carousel__pagination-button {
  //   border: 5px solid white;
  background-color: rgb(220, 217, 217);
}
.carousel__pagination-button--active {
  background-color: black;
}
</style>
