<template>
  <div class="col">
    <div class="card h-100 mb-3">
      <img v-lazy="this.image" class="card-img-top" alt="default-beer" />
      <div class="card-body pt-2">
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
import { priceToString } from "../helpers/beerHelpers.js";
export default {
  props: ["merchant"],
  methods: {
    priceToString,
  },
  data() {
    return {
      image: "/index.png",
    };
  },
};
</script>
<style lang="scss" scoped></style>
