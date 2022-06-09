<template>
  <div class="col">
    <div class="card h-100 mb-3">
      <router-link
        class="stretched-link"
        :to="{ name: 'beer', params: { id: beer.beer_id } }"
      />
      <img
        v-lazy="this.$hostname + 'img/beer/' + this.imageUrl"
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
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Card",
  props: ["beer"],
  data() {
    return {
      imageUrl: this.beer.imagefound[0]?.image || this.beer.imagefound,
      beerCategoryColors: {
        Cider: "khaki",
        "Sour Beer": "DarkGrey",
        Lagers: "gold",
        Pilsener: "NavajoWhite",
        "Wheat Beer": "wheat",
        "Pale Ales": "sandybrown",
        "India Pale Ales": "goldenrod",
        "Anglo-American Ales": "rosybrown",
        "Hybrid Beer": "peru",
        "Strong Ales": "chocolate",
        "Brown Ales": "saddlebrown",
        "Dark Lager": "sienna",
        "Belgian Style": "brown",
        "Belgian-Style Ales": "maroon",
        Porter: "dimgray",
        Stout: "black",
        "Stout and Porter": "darkslategray",
        Speciality: "purple",
        "Other Styles": "coral",
      },
    };
  },
};
</script>
<style lang="scss" scoped>
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
.beer-category {
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translate(-50%, 0);
  -webkit-transform: translate(-50%, 0);
}
.card-body {
  padding-top: 0px;
}
.card-text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
