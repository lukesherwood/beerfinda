<template>
  <div class="row row-cols-1 gy-4 d-flex">
    <carousel :settings="settings" :breakpoints="breakpoints">
      <slide v-for="beer in beers" :key="beer.beer_id">
        <BeerCard :beer="beer" width="16rem" />
      </slide>
      <template #addons="{ maxSlide, currentSlide }">
        <navigation
          :class="{
            'is-first-slide': !currentSlide,
            'is-last-slide': currentSlide === maxSlide,
          }"
        />
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
  data: () => ({
    settings: {
      itemsToShow: 1,
      snapAlign: "center",
    },
    breakpoints: {
      500: {
        itemsToShow: 1.5,
        snapAlign: "start",
      },
      770: {
        itemsToShow: 2,
        snapAlign: "start",
      },
      1024: {
        itemsToShow: 3,
        snapAlign: "start",
      },
    },
  }),
};
</script>
<style lang="scss">
.carousel__prev,
.carousel__next {
  border: 5px solid white;
  background-color: rgb(220, 217, 217);
}
.carousel__pagination-button {
  background-color: rgb(220, 217, 217);
}
.carousel__pagination-button--active {
  background-color: black;
}

.carousel__prev.is-first-slide {
  display: none;
}
.carousel__next.is-last-slide {
  display: none;
}
</style>
