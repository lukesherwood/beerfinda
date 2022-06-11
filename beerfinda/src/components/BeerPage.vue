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
      <div class="card-body">
        <img class="img-fluid float-end" width="400" v-lazy="this.imageUrl" />
        <h5>{{ beer.type }}</h5>
        <h6 v-if="beer.percentage != 'unknown'">{{ beer.percentage }}</h6>
        <div class="card-text">
          <p>{{ beer.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BeerPage",
  props: ["beer"],
  data() {
    return {
      imageUrl:
        this.$hostname +
        "img/beer/" +
        (this.beer.imagefound[0]?.image || this.beer.imagefound),
    };
  },
};
</script>
<style lang="scss" scoped>
@media only screen and (max-width: 500px) {
  .card {
    box-shadow: none;
    border: none;
  }
}
</style>
