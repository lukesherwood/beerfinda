<template>
  <ul v-for="beer in getBeers" :key="beer.beer_id">
    <li>
      <div>{{ beer.beer_id }}. {{ beer.name }}</div>
      <div class="small">
        <em>{{ beer.brewer_name }}</em>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  created() {
    this.$store.dispatch("fetchBeers").then(() => {
      console.log(this.$store.state.beers);
    });
  },
  computed: {
    getBeers() {
      return this.$store.getters.getBeers;
    },
  },
};
</script>
<style lang="scss"></style>
