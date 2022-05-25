<template>
  <div class="col">
    <div class="card h-100 mb-3">
      <img :src="this.$hostname + '/img/beer/' + beer.imagefound" class="card-img-top" alt="default-beer" />
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">{{ beer.name }}</h5>
        <p class="card-text">
          {{beer.beer_id}}. {{beer.brewer_name}}
        </p>
        <a href="#" class="btn btn-primary mt-auto mx-auto">Click Me</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Card",
  props: ["beer"],
  created() {
    // console.log(this.beer);
  },
};
</script>
<style lang="scss">
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 12px;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.card img {
  border-radius: 12px;
  height: 15rem;
  object-fit: cover;
}

@media only screen and (max-width: 500px) {
  .container {
    padding: 0px;
  }
  .card {
    width: 100%;
  }
  .row {
    margin-right: 0px;
    margin-left: 0px;
  }
}
</style>
